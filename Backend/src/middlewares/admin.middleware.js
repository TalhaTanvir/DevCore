const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const DEFAULT_TOKEN_TTL_SECONDS = 60 * 60 * 12;

const normalizeEmail = (value) => String(value || "").trim().toLowerCase();

const getAdminEmail = () => normalizeEmail(process.env.ADMIN_EMAIL || "");
const getAdminPasswordHash = () => process.env.ADMIN_PASSWORD_HASH || "";
const getLegacyAdminPassword = () => process.env.ADMIN_PASSWORD || "";

const getAuthSecret = () => process.env.ADMIN_AUTH_SECRET || process.env.ADMIN_API_KEY || "";

const getTokenTtlSeconds = () => {
  const parsed = Number(process.env.ADMIN_TOKEN_TTL_SECONDS);

  if (!Number.isFinite(parsed) || parsed <= 0) {
    return DEFAULT_TOKEN_TTL_SECONDS;
  }

  return Math.floor(parsed);
};

const issueAdminToken = () => {
  const email = getAdminEmail();
  const secret = getAuthSecret();

  if (!email || !secret) {
    throw new Error("ADMIN_EMAIL and ADMIN_AUTH_SECRET are required");
  }

  return jwt.sign({ sub: "admin", email, role: "admin" }, secret, {
    expiresIn: getTokenTtlSeconds(),
  });
};

const verifyAdminToken = (token) => {
  const secret = getAuthSecret();
  if (!secret) {
    return { valid: false, reason: "ADMIN_AUTH_SECRET is not configured" };
  }

  try {
    const payload = jwt.verify(String(token || ""), secret);
    if (payload.sub !== "admin" || payload.email !== getAdminEmail()) {
      return { valid: false, reason: "Invalid token subject" };
    }
    return { valid: true, payload };
  } catch (error) {
    return { valid: false, reason: error.message };
  }
};

const verifyAdminCredentials = async (email, password) => {
  const adminEmail = getAdminEmail();
  if (!adminEmail || normalizeEmail(email) !== adminEmail) {
    return false;
  }

  const passwordHash = getAdminPasswordHash();
  if (passwordHash) {
    return bcrypt.compare(password, passwordHash);
  }

  const legacyPassword = getLegacyAdminPassword();
  if (!legacyPassword) {
    return false;
  }

  if (legacyPassword.startsWith("$2a$") || legacyPassword.startsWith("$2b$")) {
    return bcrypt.compare(password, legacyPassword);
  }

  return password === legacyPassword;
};

const getAdminPublicIdentity = () => {
  return {
    email: getAdminEmail(),
    role: "admin",
  };
};

const getTokenFromRequest = (req) => {
  const authHeader = req.header("authorization");

  if (authHeader && authHeader.startsWith("Bearer ")) {
    return authHeader.slice("Bearer ".length).trim();
  }

  if (req.cookies?.admin_token) {
    return String(req.cookies.admin_token).trim();
  }

  return "";
};

const requireAdmin = (req, res, next) => {
  const token = getTokenFromRequest(req);
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized admin access",
      error: "Missing admin token",
    });
  }

  const tokenCheck = verifyAdminToken(token);

  if (!tokenCheck.valid) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized admin access",
      error: tokenCheck.reason,
    });
  }

  req.admin = tokenCheck.payload;
  return next();
};

module.exports = {
  requireAdmin,
  issueAdminToken,
  verifyAdminCredentials,
  getAdminPublicIdentity,
  getTokenTtlSeconds,
};
