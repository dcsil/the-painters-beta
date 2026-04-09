import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Oversight',
  tagline: 'AI Chatbot Conversation Quality Assurance — by The pAInters',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  url: 'https://the-painters-beta.vercel.app',
  baseUrl: '/',

  organizationName: 'dcsil',
  projectName: 'the-painters-product',

  onBrokenLinks: 'throw',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
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
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'Oversight',
      items: [
        {to: '/demo', label: 'Demo', position: 'left'},
        {
          type: 'docSidebar',
          sidebarId: 'docsSidebar',
          position: 'left',
          label: 'Docs',
        },
        {
          href: 'https://the-painters-product.vercel.app',
          label: 'Live App',
          position: 'right',
        },
        {
          href: 'https://github.com/dcsil/the-painters-product',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Documentation',
          items: [
            {label: 'Setup Guide', to: '/docs/setup'},
            {label: 'Getting Started', to: '/docs/getting-started'},
            {label: 'API Reference', to: '/docs/api/'},
          ],
        },
        {
          title: 'Product',
          items: [
            {label: 'Live App', href: 'https://the-painters-product.vercel.app'},
            {label: 'GitHub Repository', href: 'https://github.com/dcsil/the-painters-product'},
          ],
        },
        {
          title: 'Community',
          items: [
            {label: 'Contributing', to: '/docs/contribute'},
            {label: 'Report a Bug', href: 'https://github.com/dcsil/the-painters-product/issues/new?template=bug_report.yml'},
            {label: 'Suggest a Feature', href: 'https://github.com/dcsil/the-painters-product/issues/new?template=suggestion.yml'},
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} The pAInters — CSC491, University of Toronto. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
