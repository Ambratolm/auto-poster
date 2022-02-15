# 🐦 Auto-Poster

[![Web](https://img.shields.io/badge/web-blue?logo=w3c)](https://github.com/topics/web)
[![JavaScript](https://img.shields.io/badge/javascript-blue?logo=javascript)](https://github.com/topics/javascript)
[![NodeJS](https://img.shields.io/badge/node-blue?logo=node.js)](https://github.com/topics/node)

A tool for auto-posting on social media networks.

## ✈️ Deployment

> 💡 The **environment variables** are automatically retrieved from the `.env` file and registred to the `process.env` object for access during development. Use `.env-tmp` file as reference to make own personal `.env` file.

> 💡 It is [**advised**](https://github.com/motdotla/dotenv#should-i-commit-my-env-file) to not push the `.env` file in production repository, because it contains sensible and confidential data. either delete it or add it to `.gitignore`.

To deploy the project in a node environment:

1. Push the **repository** to a **node production server** using a service like [Heroku](https://heroku.com).

2. Manually register the **environment variables** in the **node production server**.

3. Install the **dependencies**:

```bash
npm i
```

4. **Start** server for production:

```bash
npm start
```

## 🚀 Development

### 🏭 Environment

- Runtime: [**NodeJS**](https://github.com/nodejs)
- Package Manager: [**NPM**](https://github.com/npm)
- Editor: [**Sublime Text**](https://www.sublimetext.com)

### 🌑 Backend

- ⚛️ Core: [**NodeJS**](https://github.com/nodejs/node)

## 📃 License

[&copy; 2022 Ambratolm](./LICENSE)
