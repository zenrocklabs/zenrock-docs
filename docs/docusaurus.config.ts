import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Zenrock',
  tagline: 'Zenrock',
  favicon: 'img/zenrock.png',

  // Set the production url of your site here
  url: 'https://zenrocklabs.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'zenrocklabs', // Usually your GitHub org/user name.
  projectName: 'zenrock', // Usually your repo name.

  onBrokenLinks: 'throw',

  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  themes: [
    [
      '@easyops-cn/docusaurus-search-local',
      {
        hashed: true,
        docsRouteBasePath: '/',
        indexBlog: false,
      },
    ],
  ],

  plugins: [
    'docusaurus-markdown-source-plugin',
    [
      '@docusaurus/plugin-client-redirects',
      {
        redirects: [
          // Old category index pages
          { from: '/category/zrchain', to: '/zrChain' },
          { from: '/category/dct-framework', to: '/DCT' },
          { from: '/category/zenbtc', to: '/zenBTC' },
          { from: '/category/zenzec', to: '/zenZEC' },
          { from: '/category/hush-protocol', to: '/Hush' },
          { from: '/category/rock-token', to: '/rock-token' },
          { from: '/category/build-on-zrchain', to: '/build' },
          { from: '/category/zentp', to: '/zenTP' },
          // Old subpage URLs
          { from: '/zrChain/introduction', to: '/zrChain' },
          { from: '/zrChain/dmpc-enclaves', to: '/zrChain' },
          { from: '/zrChain/technical-architecture', to: '/zrChain' },
          { from: '/DCT/introduction', to: '/DCT' },
          { from: '/DCT/technical-architecture', to: '/DCT' },
          { from: '/zenBTC/introduction', to: '/zenBTC' },
          { from: '/zenZEC/introduction', to: '/zenZEC' },
          { from: '/Hush/introduction', to: '/Hush' },
          { from: '/Hush/technical-architecture', to: '/Hush' },
          { from: '/rock-token/introduction', to: '/rock-token' },
          { from: '/rock-token/protocol-revenue', to: '/rock-token' },
          { from: '/rock-token/tokenomics', to: '/rock-token' },
          { from: '/rock-token/allocation', to: '/rock-token' },
          { from: '/rock-token/staking', to: '/rock-token' },
          { from: '/rock-token/offchain-revenues', to: '/rock-token' },
          { from: '/rock-token/zenrock-labs', to: '/rock-token' },
          { from: '/build/introduction', to: '/build' },
          { from: '/zenTP/introduction', to: '/zenTP' },
          { from: '/introduction/introduction', to: '/' },
        ],
      },
    ],
  ],

  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: '/',
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/zenrocklabs/zenrock-docs/tree/main/',
          includeCurrentVersion: true,
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    colorMode: {
      defaultMode: 'dark',
    },
    image: 'img/zenrock.png',
    navbar: {
      logo: {
        alt: 'Zenrock',
        srcDark: 'img/zenrock_logo_white_transp.svg',
        src: 'img/zenrock_logo_dark_transp.svg',
        href: 'https://zenrocklabs.io/',
      },
      items: [
        {
          label: 'zrChain',
          position: 'left',
          to: 'zrChain',
        },
        {
          label: 'DCT',
          position: 'left',
          to: 'DCT',
        },
        {
          label: 'Hush',
          position: 'left',
          to: 'Hush',
        },
        {
          label: '$ROCK',
          position: 'left',
          to: 'rock-token',
        },
        {
          label: 'Litepaper',
          href: 'pathname:///zenrock-litepaper.pdf',
          position: 'right',
        },
        {
          href: 'https://github.com/zenrocklabs/zenrock-docs',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Overview',
              to: '/',
            },
          ],
        },
        {
          title: 'Developers',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/zenrocklabs/',
            },
          ],
        },
        {
          title: 'Socials',
          items: [
            {
              label: 'Discord',
              href: 'https://discord.gg/zenrock',
            },
            {
              label: 'Twitter',
              href: 'https://x.com/zenrock'
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Zenrock Labs, Inc.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['solidity'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
