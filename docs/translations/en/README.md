# extension-whatsapp

📞 Demo extension for WhatsApp, using SvelteKit

<p align="left">
  <a href="/LICENSE" title="Show the MIT License">
    <img src="https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge" alt="License MIT">
  </a>
  <a href="https://kit.svelte.dev" title="Open SvelteKit Website">
    <img src="https://img.shields.io/badge/SvelteKit-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00" alt="Made with SvelteKit" />
  </a>
  <a href="https://www.typescriptlang.org/docs" title="Open TypeScript Website">
    <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="Made with TypeScript" />
  </a>
  <a href="https://tailwindcss.com" title="Open Tailwind Website">
    <img src="https://img.shields.io/badge/Tailwind-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Made with Tailwind" />
  </a>
</p>

## 🌎 Translations

<kbd>[<img title="English" alt="English" src="https://flagicons.lipis.dev/flags/4x3/us.svg" width="22">](/docs/translations/en/README.md)</kbd>
<kbd>[<img title="Português Brasileiro" alt="Português Brasileiro" src="https://flagicons.lipis.dev/flags/4x3/br.svg" width="22">](/docs/translations/pt/README.md)</kbd>

## 📖 Introduction

This project is a demo extension for WhatsApp, using SvelteKit. It is a simple project that demonstrates how to create a WhatsApp extension using SvelteKit.

See the WhatsApp utility functions in the [`src/lib/utils`](/src/lib/utils) folder. There are three utility functions:

- [`decrypt-media.util.ts`](/src/lib/utils/decrypt-media.util.ts): Decrypt the media data from a given message.
- [`scripting.util.ts`](/src/lib/utils/scripting.util.ts): Execute a script in the current page.
- [`whatsapp.util.ts`](/src/lib/utils/whatsapp.util.ts): Get the data, process media and write message from the current page.

For the extension to work correctly, use the entire extension [`static/extension`](/static/extension) folder and configure the extension in the [`manifest.json`](/static/manifest.json) file.

> [!IMPORTANT]
> The WhatsApp utility functions use the Node.js modules, so you need to resolve them in the browser context. For this, you can use Vite's [`define`](https://vitejs.dev/config/shared-options.html#define) and [`resolve.alias`](https://vitejs.dev/config/shared-options.html#resolve-alias) options in the [`vite.config.ts`](/vite.config.ts) file.

## 🌟 Features

- **Get Data**: Get the data from the current page.
  - **Chat**: Get the chat data from the current page.
  - **Chat ID**: Get the chat ID from the current page.
  - **Contact**: Get the contact data from the current page.
  - **Messages**: Get the messages data from the current page.
  - **Phone Number**: Get the phone number from the current page.
- **Process Media**: Process the media data from the current page.
- **Send Message**: Send a message to the current chat.

## ⚙ Tech Stack

| Tool/Service                                                                                             | Category                    | Description                                                                         |
| -------------------------------------------------------------------------------------------------------- | --------------------------- | ----------------------------------------------------------------------------------- |
| [sveltekit-adapter-chrome-extension](https://github.com/michmich112/sveltekit-adapter-chrome-extension/) | Build Tools                 | A Vite adapter for building Chrome extensions with SvelteKit.                       |
| [vite](https://vitejs.dev/)                                                                              | Build Tools                 | A build tool that provides a faster development experience for modern web projects. |
| [postcss](https://postcss.org/)                                                                          | CSS                         | A tool for transforming CSS with JavaScript.                                        |
| [tailwindcss](https://tailwindcss.com/)                                                                  | CSS                         | A utility-first CSS framework.                                                      |
| [eslint](https://eslint.org/)                                                                            | JavaScript/TypeScript Tools | A tool for identifying and reporting on patterns in ECMAScript/JavaScript code.     |
| [prettier](https://prettier.io/)                                                                         | JavaScript/TypeScript Tools | An opinionated code formatter.                                                      |
| [typescript](https://www.typescriptlang.org/)                                                            | JavaScript/TypeScript Tools | A typed superset of JavaScript that compiles to plain JavaScript.                   |
| [pnpm](https://pnpm.io/)                                                                                 | Package Manager             | A fast, disk space efficient package manager.                                       |
| [futoin-hkdf](https://github.com/futoin/util-js-hkdf/)                                                   | Peer Dependencies           | A Node.js implementation of HKDF (HMAC Key Derivation Function).                    |
| [mime-types](https://github.com/jshttp/mime-types/)                                                      | Peer Dependencies           | A comprehensive library for mime-type mapping.                                      |
| [buffer](https://github.com/feross/buffer/)                                                              | Polyfill                    | The buffer module from Node.js, for the browser.                                    |
| [crypto-browserify](https://www.npmjs.com/package/crypto-browserify/)                                    | Polyfill                    | A port of node's `crypto` module to the browser.                                    |
| [path-browserify](https://github.com/browserify/path-browserify/)                                        | Polyfill                    | Node.js `path` module for browsers.                                                 |
| [readable-stream](https://github.com/nodejs/readable-stream/)                                            | Polyfill                    | Node.js core streams for userland.                                                  |
| [shadcn-svelte](https://www.shadcn-svelte.com/)                                                          | UI Components               | Accessible and customizable components that you can copy and paste into your apps.  |
| [sveltekit](https://kit.svelte.dev/)                                                                     | Web Frameworks              | A framework for building high-performance web apps.                                 |

## 🚀 Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- [Node.js](https://nodejs.org/) (v20.x or newer)
- [pnpm](https://pnpm.io/) (v9.x or newer)
- [Visual Studio Code](https://code.visualstudio.com/) (or another code editor)
- [Google Chrome](https://www.google.com/chrome/) (or another browser)
- [WhatsApp Web](https://web.whatsapp.com/)

### Installing

1. Clone the repository:

   ```bash
   git clone https://github.com/gustavomorinaga/extension-whatsapp.git
   cd extension-whatsapp
   ```

2. Install the dependencies:

   ```bash
   pnpm install
   ```

3. Start the development server:

   ```bash
   pnpm build:watch
   ```

4. Load the extension in Google Chrome:

   - Open Google Chrome and go to `chrome://extensions/`.
   - Enable the **Developer mode**.
   - Click on **Load unpacked**.
   - Select the `build` folder.

5. Open WhatsApp Web and use the extension.

## 🤖 Commands

| Command              | Description                                             |
| -------------------- | ------------------------------------------------------- |
| `pnpm dev`           | Start the development server.                           |
| `pnpm build`         | Build the extension.                                    |
| `pnpm serve`         | Serve the extension.                                    |
| `pnpm build:watch`   | Build the extension and watch for changes.              |
| `pnpm preview`       | Preview the extension.                                  |
| `pnpm sync`          | Sync `tsconfig.json` and all generated types.           |
| `pnpm check`         | Sync and check `tsconfig.json` and all generated types. |
| `pnpm check:watch`   | Sync, check and watch for changes.                      |
| `pnpm lint`          | Lint the code.                                          |
| `pnpm format`        | Format the code.                                        |
| `pnpm format:check`  | Check if the code is formatted.                         |
| `pnpm format:staged` | Format the staged files.                                |
| `pnpm ui:add`        | Add a new `shadcn-svelte` component.                    |
| `pnpm clean`         | Deletes the `node_modules` and `.svelte-kit` folders.   |
| `pnpm preinstall`    | Only allow `pnpm` to be used.                           |
| `pnpm postinstall`   | Execute the `sync` script.                              |

## 📜 License

This project is licensed under the **MIT License** - see the [LICENSE](/LICENSE) page for details.

<p align="center">
 ❤️ Thanks for your attention!
</p>
```
