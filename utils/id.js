function generateId() {
  const timestamp = Date.now();
  const randomStr = Math.random().toString(36).substring(2, 11);
  return `${timestamp}-${randomStr}`;
}

module.exports = {
  generateId
};
