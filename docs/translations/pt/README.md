# extension-whatsapp

📞 Extensão de demonstração para WhatsApp, utilizando SvelteKit

<p align="left">
  <a href="/LICENSE" title="Mostrar a Licença MIT">
    <img src="https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge" alt="Licença MIT">
  </a>
  <a href="https://kit.svelte.dev" title="Abrir o site do SvelteKit">
    <img src="https://img.shields.io/badge/SvelteKit-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00" alt="Feito com SvelteKit" />
  </a>
  <a href="https://www.typescriptlang.org/docs" title="Abrir o site do TypeScript">
    <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="Feito com TypeScript" />
  </a>
  <a href="https://tailwindcss.com" title="Abrir o site do Tailwind">
    <img src="https://img.shields.io/badge/Tailwind-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Feito com Tailwind" />
  </a>
</p>

## 🌎 Traduções

<kbd>[<img title="Inglês" alt="Inglês" src="https://flagicons.lipis.dev/flags/4x3/us.svg" width="22">](/docs/translations/en/README.md)</kbd>
<kbd>[<img title="Português Brasileiro" alt="Português Brasileiro" src="https://flagicons.lipis.dev/flags/4x3/br.svg" width="22">](/docs/translations/pt/README.md)</kbd>

## 📖 Introdução

Este projeto é uma extensão de demonstração para WhatsApp, utilizando SvelteKit. É um projeto simples que demonstra como criar uma extensão para WhatsApp usando SvelteKit.

Veja as funções utilitárias do WhatsApp na pasta [`src/lib/utils`](/src/lib/utils). Existem três funções utilitárias:

- [`decrypt-media.util.ts`](/src/lib/utils/decrypt-media.util.ts): Descriptografa os dados de mídia de uma mensagem.
- [`scripting.util.ts`](/src/lib/utils/scripting.util.ts): Executa um script na página atual.
- [`whatsapp.util.ts`](/src/lib/utils/whatsapp.util.ts): Obtém os dados, processa a mídia e envia mensagens da página atual.

Para que a extensão funcione corretamente, use toda a pasta de extensão [`static/extension`](/static/extension) e configure a extensão no arquivo [`manifest.json`](/static/manifest.json).

> [!IMPORTANTE]
> As funções utilitárias do WhatsApp utilizam módulos do Node.js, então você precisará resolvê-los no contexto do navegador. Para isso, você pode usar as opções [`define`](https://vitejs.dev/config/shared-options.html#define) e [`resolve.alias`](https://vitejs.dev/config/shared-options.html#resolve-alias) do Vite no arquivo [`vite.config.ts`](/vite.config.ts).

## 🌟 Funcionalidades

- **Obter Dados**: Obter os dados da página atual.
  - **Chat**: Obter os dados do chat da página atual.
  - **ID do Chat**: Obter o ID do chat da página atual.
  - **Contato**: Obter os dados do contato da página atual.
  - **Mensagens**: Obter os dados das mensagens da página atual.
  - **Número de Telefone**: Obter o número de telefone da página atual.
- **Processar Mídia**: Processar os dados de mídia da página atual.
- **Enviar Mensagem**: Enviar uma mensagem para o chat atual.

## ⚙ Pilha de Tecnologia

| Ferramenta/Serviço                                                                                       | Categoria                         | Descrição                                                                                                          |
| -------------------------------------------------------------------------------------------------------- | --------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| [sveltekit-adapter-chrome-extension](https://github.com/michmich112/sveltekit-adapter-chrome-extension/) | Ferramentas de Build              | Um adaptador Vite para criar extensões do Chrome com SvelteKit.                                                    |
| [vite](https://vitejs.dev/)                                                                              | Ferramentas de Build              | Uma ferramenta de build que proporciona uma experiência de desenvolvimento mais rápida para projetos web modernos. |
| [postcss](https://postcss.org/)                                                                          | CSS                               | Uma ferramenta para transformar CSS com JavaScript.                                                                |
| [tailwindcss](https://tailwindcss.com/)                                                                  | CSS                               | Um framework CSS baseado em utilitários.                                                                           |
| [eslint](https://eslint.org/)                                                                            | Ferramentas JavaScript/TypeScript | Uma ferramenta para identificar e relatar padrões em código ECMAScript/JavaScript.                                 |
| [prettier](https://prettier.io/)                                                                         | Ferramentas JavaScript/TypeScript | Um formatador de código opinativo.                                                                                 |
| [typescript](https://www.typescriptlang.org/)                                                            | Ferramentas JavaScript/TypeScript | Um superconjunto tipado de JavaScript que compila para JavaScript puro.                                            |
| [pnpm](https://pnpm.io/)                                                                                 | Gerenciador de Pacotes            | Um gerenciador de pacotes rápido e eficiente em termos de espaço em disco.                                         |
| [futoin-hkdf](https://github.com/futoin/util-js-hkdf/)                                                   | Dependências Externas             | Uma implementação Node.js do HKDF (Função Derivadora de Chave HMAC).                                               |
| [mime-types](https://github.com/jshttp/mime-types/)                                                      | Dependências Externas             | Uma biblioteca abrangente para mapeamento de tipos MIME.                                                           |
| [buffer](https://github.com/feross/buffer/)                                                              | Polyfill                          | O módulo buffer do Node.js, para o navegador.                                                                      |
| [crypto-browserify](https://www.npmjs.com/package/crypto-browserify/)                                    | Polyfill                          | Um port do módulo `crypto` do Node.js para o navegador.                                                            |
| [path-browserify](https://github.com/browserify/path-browserify/)                                        | Polyfill                          | Módulo `path` do Node.js para navegadores.                                                                         |
| [readable-stream](https://github.com/nodejs/readable-stream/)                                            | Polyfill                          | Streams principais do Node.js para o userland.                                                                     |
| [shadcn-svelte](https://www.shadcn-svelte.com/)                                                          | Componentes de UI                 | Componentes acessíveis e personalizáveis que você pode copiar e colar em seus apps.                                |
| [sveltekit](https://kit.svelte.dev/)                                                                     | Frameworks Web                    | Um framework para construir aplicativos web de alto desempenho.                                                    |

## 🚀 Primeiros Passos

Essas instruções te ajudarão a obter uma cópia do projeto e colocá-la em funcionamento em sua máquina local para desenvolvimento e testes.

### Pré-requisitos

- [Node.js](https://nodejs.org/) (v20.x ou mais recente)
- [pnpm](https://pnpm.io/) (v9.x ou mais recente)
- [Visual Studio Code](https://code.visualstudio.com/) (ou outro editor de código)
- [Google Chrome](https://www.google.com/chrome/) (ou outro navegador)
- [WhatsApp Web](https://web.whatsapp.com/)

### Instalando

1. Clone o repositório:

   ```bash
   git clone https://github.com/gustavomorinaga/extension-whatsapp.git
   cd extension-whatsapp
   ```

2. Instale as dependências:

   ```bash
   pnpm install
   ```

3. Inicie o servidor de desenvolvimento:

   ```bash
   pnpm build:watch
   ```

4. Carregue a extensão no Google Chrome:

   - Abra o Google Chrome e vá para `chrome://extensions/`.
   - Habilite o **Modo do Desenvolvedor**.
   - Clique em **Carregar sem compactação**.
   - Selecione a pasta `build`.

5. Abra o WhatsApp Web e use a extensão.

## 🤖 Comandos

| Comando              | Descrição                                                       |
| -------------------- | --------------------------------------------------------------- |
| `pnpm dev`           | Inicia o servidor de desenvolvimento.                           |
| `pnpm build`         | Constrói a extensão.                                            |
| `pnpm serve`         | Serve a extensão.                                               |
| `pnpm build:watch`   | Constrói a extensão e observa mudanças.                         |
| `pnpm preview`       | Previsualiza a extensão.                                        |
| `pnpm sync`          | Sincroniza `tsconfig.json` e todos os tipos gerados.            |
| `pnpm check`         | Sincroniza e verifica `tsconfig.json` e todos os tipos gerados. |
| `pnpm check:watch`   | Sincroniza, verifica e observa mudanças.                        |
| `pnpm lint`          | Verifica o código.                                              |
| `pnpm format`        | Formata o código.                                               |
| `pnpm format:check`  | Verifica se o código está formatado.                            |
| `pnpm format:staged` | Formata os arquivos em estágio.                                 |
| `pnpm ui:add`        | Adiciona um novo componente`shadcn-svelte`.                     |
| `pnpm clean`         | Exclui as pastas`node_modules`e`.svelte-kit`.                   |
| `pnpm preinstall`    | Permite apenas o uso de`pnpm`.                                  |
| `pnpm postinstall`   | Executa o script`sync`.                                         |

## 📜 Licença

Este projeto está licenciado sob a **Licença MIT** - veja a página [LICENSE](/LICENSE) para mais detalhes.

<p align="center">
 ❤️ Obrigado pela sua atenção!
</p>
