// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Juicebox Docs',
  tagline: 'Welcome to the juiciest repository of knowledge',
  url: 'https://info.juicebox.money',
  baseUrl: '/',
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.svg',
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
          routeBasePath: '/',
          // editUrl: 'https://github.com/jbx-protocol/juice-docs-v2/blob/main',
        },
        blog: {
          showReadingTime: true,
          // editUrl: 'https://github.com/jbx-protocol/juice-docs-v2/blob/main',
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
    locales: ['en', 'zh'],
  },
  themeConfig: {
    image: 'img/apple.png',
    metadata: [{ name: 'keywords', content: 'Juicebox, juicebox, crypto, cryptocurrency, ethereum, Ethereum, fundraising, treasury, treasury management, Juicebox DAO, JuiceboxDAO, juiceboxdao, juicebox dao, dao tooling, dao, daos, erc20, nft, decentralized, funding, web3, Web3' }],
    docs: {
      sidebar: {
        autoCollapseCategories: true,
      },
    },
    colorMode: {
      defaultMode: 'dark',
      respectPrefersColorScheme: true,
    },
    tableOfContents: {
      minHeadingLevel: 2,
      maxHeadingLevel: 5,
    },
    navbar: {
      title: 'Juicebox Docs',
      logo: {
        alt: 'Juicebox Logo',
        src: 'img/favicon.svg',
      },
      items: [
        {
          type: 'docSidebar',
          position: 'left',
          sidebarId: 'dev',
          label: 'Developers',
        },
        {
          type: 'docSidebar',
          position: 'left',
          sidebarId: 'user',
          label: 'Users',
        },
        {
          type: 'docSidebar',
          position: 'left',
          sidebarId: 'dao',
          label: 'DAO',
        },
        {
            type: 'localeDropdown',
            position: 'right',
        },
        { to: '/blog', label: 'Blog', position: 'left' },
        {
          href: 'https://juicebox.money/',
          label: 'Juicebox',
          position: 'right',
        },
      ],
    },
    prism: {
      theme: lightCodeTheme,
      darkTheme: darkCodeTheme,
      defaultLanguage: 'solidity',
      additionalLanguages: ['solidity'],
    },
    metadata: [
      {
        name: "google-site-verification",
        content: "0Jp7zERBL5i76DiM-bODvBGgbjuVMEQGSuwOchP_ZnE",
      },
    ],
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
