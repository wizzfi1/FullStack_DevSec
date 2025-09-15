// lint-staged.config.js
module.exports = {
  "src/**/*.{js,jsx}": ["eslint --fix", "prettier --write"],
  "tests/**/*.{js,jsx}": ["eslint --fix", "prettier --write"],
  "*.json": ["prettier --write"],
};
