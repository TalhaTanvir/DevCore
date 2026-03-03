const {
  issueAdminToken,
  verifyAdminCredentials,
  getAdminPublicIdentity,
  getTokenTtlSeconds,
} = require("../middlewares/admin.middleware");

const parseBooleanEnv = (value) => {
  if (typeof value !== "string") return null;

  const normalized = value.trim().toLowerCase();
  if (["1", "true", "yes", "on"].includes(normalized)) return true;
  if (["0", "false", "no", "off"].includes(normalized)) return false;
  return null;
};

const resolveCookieOptions = (req, tokenTtlSeconds) => {
  const forwardedProto = req.headers["x-forwarded-proto"];
  const requestIsHttps = req.secure || forwardedProto === "https";
  const secureFromEnv = parseBooleanEnv(process.env.ADMIN_COOKIE_SECURE);
  const secure = secureFromEnv ?? requestIsHttps ?? process.env.NODE_ENV === "production";

  const configuredSameSite = String(process.env.ADMIN_COOKIE_SAMESITE || "")
    .trim()
    .toLowerCase();
  let sameSite = configuredSameSite || (secure ? "none" : "lax");

  // Browsers reject SameSite=None without Secure.
  if (sameSite === "none" && !secure) {
    sameSite = "lax";
  }

  return {
    httpOnly: true,
    secure,
    sameSite,
    path: "/",
    maxAge: tokenTtlSeconds * 1000,
  };
};

const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body || {};
    const normalizedEmail = String(email || "").trim().toLowerCase();

    if (!normalizedEmail || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const isValid = await verifyAdminCredentials(normalizedEmail, password);

    if (!isValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid admin credentials",
      });
    }

    const token = issueAdminToken();
    const tokenTtlSeconds = getTokenTtlSeconds();

    res.cookie("admin_token", token, resolveCookieOptions(req, tokenTtlSeconds));

    return res.status(200).json({
      success: true,
      message: "Admin login successful",
      data: {
        admin: getAdminPublicIdentity(),
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to login admin",
      error: error.message,
    });
  }
};

const getAdminProfile = async (req, res) => {
  return res.status(200).json({
    success: true,
    data: {
      admin: getAdminPublicIdentity(),
      tokenPayload: req.admin,
    },
  });
};

const logoutAdmin = async (req, res) => {
  const tokenTtlSeconds = getTokenTtlSeconds();
  const cookieOptions = resolveCookieOptions(req, tokenTtlSeconds);

  delete cookieOptions.maxAge;
  res.clearCookie("admin_token", {
    ...cookieOptions,
  });

  return res.status(200).json({
    success: true,
    message: "Admin logout successful",
  });
};

module.exports = {
  loginAdmin,
  getAdminProfile,
  logoutAdmin,
};
