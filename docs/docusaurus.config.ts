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
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

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
        href: 'https://zenrocklabs.io',
      },
      items: [
        {
          label: 'Zenrock Blockchain',
          position: 'left',
          to: 'zrChain/architecture',
        },
        {
          label: 'zenBTC',
          position: 'left',
          to: 'zenBTC/zenbtc-introduction',
        },
        {
          label: 'zenZEC',
          position: 'left',
          to: 'zenZEC/zenzec-introduction',
        },
        {
          label: 'Hush',
          position: 'left',
          to: 'Hush/hush-introduction',
        },
        {
          label: 'zenTP',
          position: 'left',
          to: 'zenTP/zentp-introduction',
        },
        {
          href: 'https://github.com/zenrocklabs/zenrock',
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
              href: 'https://twitter.com/OfficialZenrock'
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
