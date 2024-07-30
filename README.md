# extension-whatsapp

📞 Demo extension for WhatsApp, using SvelteKit

<p align="left">
  <a href="./LICENSE" title="Show the MIT License">
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

## Introduction

This project is a demo extension for WhatsApp, using SvelteKit. It is a simple project that demonstrates how to create a WhatsApp extension using SvelteKit.

See the WhatsApp utility functions in the [`src/lib/utils/whatsapp.util.ts`](./src/lib/utils/whatsapp.util.ts) file.

For the extension to work correctly, use the entire extension `static/extension` folder and configure the extension in the `manifest.json` file.

## Features

- **Chat**: You can access the current chat as object.
- **Contact**: You can access the current contact as object.
- **Chat ID**: You can access the current chat ID.
- **Phone Number**: You can access the phone number of the current chat.
- **Chat Name**: You can access the name of the current chat.
- **Messages**: You can access the current messages as object.
- **Send Message**: You can send a message to the current chat.
- **Fetch Media**: You can fetch the media from the current chat.

## Tech Stack

| Tool/Service                                                                                             | Category                    | Description                                                                         |
| -------------------------------------------------------------------------------------------------------- | --------------------------- | ----------------------------------------------------------------------------------- |
| [vite](https://vitejs.dev/)                                                                              | Build Tools                 | A build tool that provides a faster development experience for modern web projects. |
| [sveltekit-adapter-chrome-extension](https://github.com/michmich112/sveltekit-adapter-chrome-extension/) | Build Tools                 | A Vite adapter for building Chrome extensions with SvelteKit.                       |
| [postcss](https://postcss.org)                                                                           | CSS                         | A tool for transforming CSS with JavaScript.                                        |
| [tailwindcss](https://tailwindcss.com/)                                                                  | CSS                         | A utility-first CSS framework.                                                      |
| [eslint](https://eslint.org/)                                                                            | JavaScript/TypeScript Tools | A tool for identifying and reporting on patterns in ECMAScript/JavaScript code.     |
| [prettier](https://prettier.io/)                                                                         | JavaScript/TypeScript Tools | An opinionated code formatter.                                                      |
| [typescript](https://www.typescriptlang.org/)                                                            | JavaScript/TypeScript Tools | A typed superset of JavaScript that compiles to plain JavaScript.                   |
| [pnpm](https://pnpm.io/)                                                                                 | Package Manager             | A fast, disk space efficient package manager.                                       |
| [shadcn-svelte](https://www.shadcn-svelte.com/)                                                          | UI Components               | Accessible and customizable components that you can copy and paste into your apps.  |
| [sveltekit](https://kit.svelte.dev/)                                                                     | Web Frameworks              | A framework for building high-performance web apps.                                 |

## 📜 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) page for details.

<p align="center">
 ❤️ Thanks for your attention!
</p>
