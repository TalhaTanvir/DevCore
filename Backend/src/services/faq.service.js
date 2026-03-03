const mongoose = require("mongoose");
const { Faq } = require("../models/faq.model");

const defaultFaqsSeed = [
  {
    key: "faq-cost",
    question: "How much does a website cost?",
    answer:
      "Pricing depends on scope, timeline, and complexity. After a short discovery call, you will get a clear fixed quote or a phased plan that fits your budget.",
    order: 1,
  },
  {
    key: "faq-subscription",
    question: "How does the subscription work?",
    answer:
      "You pay a monthly fee for ongoing design and development support. Requests are prioritized in a queue and delivered continuously based on your plan.",
    order: 2,
  },
  {
    key: "faq-cancel",
    question: "How do I pause or cancel?",
    answer:
      "You can pause or cancel anytime before your next billing cycle. Your work history and assets remain available so you can resume later without losing progress.",
    order: 3,
  },
  {
    key: "faq-communication",
    question: "How do I communicate with you?",
    answer:
      "Communication happens through your preferred channel such as email, Slack, or scheduled calls. You will get regular updates and clear delivery checkpoints.",
    order: 4,
  },
  {
    key: "faq-design-feedback",
    question: "What if I don't like the design?",
    answer:
      "Revisions are part of the process. Feedback is used to iterate quickly until the design direction matches your goals and brand expectations.",
    order: 5,
  },
];

const sortByOrder = (items) => {
  return [...items].sort((a, b) => a.order - b.order);
};

const seedDefaultsIfEmpty = async () => {
  const count = await Faq.estimatedDocumentCount();

  if (count === 0) {
    await Faq.insertMany(defaultFaqsSeed);
  }
};

const listActiveFaqs = async () => {
  if (mongoose.connection.readyState !== 1) {
    return sortByOrder(defaultFaqsSeed);
  }

  await seedDefaultsIfEmpty();

  return Faq.find({ isActive: true })
    .sort({ order: 1, createdAt: 1 })
    .select("key question answer order")
    .lean();
};

const ensureDatabaseConnected = () => {
  if (mongoose.connection.readyState !== 1) {
    const error = new Error("Database is not connected");
    error.statusCode = 503;
    throw error;
  }
};

const listAllFaqs = async () => {
  ensureDatabaseConnected();

  return Faq.find({})
    .sort({ order: 1, createdAt: 1 })
    .lean();
};

const getFaqById = async (faqId) => {
  ensureDatabaseConnected();

  return Faq.findById(faqId).lean();
};

const createFaq = async (payload) => {
  ensureDatabaseConnected();

  const createdFaq = await Faq.create(payload);
  return createdFaq.toObject();
};

const updateFaq = async (faqId, payload) => {
  ensureDatabaseConnected();

  return Faq.findByIdAndUpdate(faqId, payload, {
    new: true,
    runValidators: true,
  }).lean();
};

const deleteFaq = async (faqId) => {
  ensureDatabaseConnected();

  return Faq.findByIdAndDelete(faqId).lean();
};

module.exports = {
  listActiveFaqs,
  listAllFaqs,
  getFaqById,
  createFaq,
  updateFaq,
  deleteFaq,
  defaultFaqsSeed,
};
