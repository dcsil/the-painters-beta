import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'oversight',
  tagline: 'Trust, but verify.',
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
      defaultMode: 'light',
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'oversight',
      items: [
        {to: '/docs/demo', label: 'Demo', position: 'left'},
        {to: '/docs/setup', label: 'Setup Guide', position: 'left'},
        {to: '/docs/how-it-works', label: 'Workflow Infographics', position: 'left'},
        {to: '/docs/architecture', label: 'Architecture', position: 'left'},
        {to: '/docs/contribute', label: 'Contributing', position: 'left'},
        {
          to: '/docs/getting-started',
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
            {label: 'System Status', href: 'https://stats.uptimerobot.com/SESeBZRKbf'},
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
      copyright: `Copyright © ${new Date().getFullYear()} The pAInters — CSC491, University of Toronto.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
