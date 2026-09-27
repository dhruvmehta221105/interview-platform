const mongoose = require("mongoose");

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const isValidEmail = (value) => typeof value === "string" && emailPattern.test(value.trim());
const isValidObjectId = (value) => mongoose.Types.ObjectId.isValid(value);
const isNonEmptyString = (value, maxLength = 500) =>
  typeof value === "string" && value.trim().length > 0 && value.trim().length <= maxLength;

module.exports = { isValidEmail, isValidObjectId, isNonEmptyString };