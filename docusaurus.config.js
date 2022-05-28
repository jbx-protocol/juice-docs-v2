// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Juicebox High',
  tagline: 'Welcome to the juiciest repository of higher knowledge',
  url: 'https://info.juicebox.money',
  baseUrl: '/',
  onBrokenLinks: 'ignore',
  onBrokenMarkdownLinks: 'ignore',
  favicon: 'img/favicon.ico',
  organizationName: 'Juicebox', // Usually your GitHub org/user name.
  projectName: 'Juicebox Protocol', // Usually your repo name.

  plugins: [require.resolve('docusaurus-lunr-search')],

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl: 'https://github.com/jbx-protocol/juice-docs-v2/blob/main',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            'https://github.com/jbx-protocol/juice-docs-v2/blob/main',
          blogSidebarTitle: 'All posts',
          blogSidebarCount: 'ALL',
          feedOptions: {
            type: 'all',
            copyright: `Licensed under the MIT License`,
          },
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'zh', 'ru', 'pt', 'es', 'tr', 'fr', 'ja'],
  },
  themeConfig: {
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
      docs: {
        sidebar: {
          hideable: true,
          autoCollapseCategories: true,
        },
      },
      colorMode: {
        defaultMode: 'dark',
        respectPrefersColorScheme: true,
      },
      announcementBar: {
        id: 'support_us',
        content: 'A bug in Juicebox v2 was identified on 2022-05-24. View the postmortem and original contracts <a href="/docs/2022-05-24/">here</a> and live updates <a href="https://juicebox.money/#/v2-bug-updates/">here</a>.',
        backgroundColor: '#18B4C7',
        textColor: '#FBF9F6',
        isCloseable: true,
      },
      tableOfContents: {
        minHeadingLevel: 2,
        maxHeadingLevel: 5,
      },
      navbar: {
        logo: {
          alt: 'Juicebox Logo',
          src: 'img/logo.svg',
        },
        items: [
          /*{
            type: 'doc',
            docId: 'intro',
            position: 'left',
            label: 'Docs',
          },*/
          {
            type: 'docSidebar',
            position: 'left',
            sidebarId: 'protocol',
            label: 'Docs',
          },
          {
            type: 'docSidebar',
            position: 'left',
            sidebarId: 'resources',
            label: 'Resources',
          },
          {
            type: 'localeDropdown',
            position: 'right',
          },
          { to: '/blog', label: 'Blog', position: 'left' },
          {
            href: 'https://discord.gg/juicebox',
            label: 'Discord',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Links',
            items: [
              {
                label: 'juicebox.money',
                to: 'https://juicebox.money/',
              },
              {
                label: 'GitHub',
                to: 'https://github.com/jbx-protocol',
              },
              {
                label: 'Notion',
                to: 'https://juicebox.notion.site/Juicebox-Notion-7b2436cec0c145c88b3efa0376c6dba3'
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Discord',
                href: 'https://discord.gg/juicebox',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/juiceboxETH',
              },
              {
                label: 'Cryptovoxels Lounge',
                href: 'https://www.cryptovoxels.com/parcels/6188',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Blog',
                to: '/blog',
              },
              {
                label: 'Governance',
                href: 'https://snapshot.org/#/jbdao.eth',
              },
            ],
          },
        ],
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        defaultLanguage: 'solidity',
        additionalLanguages: ['solidity'],
      },
    },
    scripts: [
      {
        src: "https://energetic-unwavering.juicebox.money/script.js",
        defer: true,
        "data-site": "UMYOVGDG",
      },
    ],
};
module.exports = config;
