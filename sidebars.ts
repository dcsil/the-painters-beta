import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  docsSidebar: [
    {
      type: 'doc',
      id: 'setup',
      label: 'Setup Guide',
    },
    {
      type: 'doc',
      id: 'getting-started',
      label: 'Getting Started',
    },
    {
      type: 'category',
      label: 'Features',
      collapsed: false,
      items: [
        'features/hallucination-detection',
        'features/bias-detection',
        'features/toxicity-detection',
        'features/live-monitoring',
        'features/analysis-modes',
        'features/ground-truth',
        'features/batch-uploads',
        'features/trends',
        'features/email-alerts',
      ],
    },
    {
      type: 'doc',
      id: 'how-it-works',
      label: 'How It Works',
    },
    {
      type: 'doc',
      id: 'architecture',
      label: 'Architecture',
    },
    {
      type: 'category',
      label: 'API Reference',
      items: [
        'api/index',
        'api/authentication',
        'api/uploads',
        'api/batch',
        'api/chat',
        'api/ground-truth',
        'api/settings',
        'api/monitoring',
        'api/system',
      ],
    },
    {
      type: 'doc',
      id: 'deployment',
      label: 'Deployment',
    },
    {
      type: 'doc',
      id: 'troubleshooting',
      label: 'Troubleshooting & FAQ',
    },
    {
      type: 'doc',
      id: 'contribute',
      label: 'Contributing',
    },
  ],
};

export default sidebars;
