import tableSVG from '@plone/volto/icons/table.svg';

import { AbFabView, AbFabEdit } from './AbFab';

export default (config) => {
  config.blocks.blocksConfig.AbFab = {
    id: 'AbFab',
    title: 'AbFab component',
    icon: tableSVG,
    group: 'common',
    view: AbFabView,
    edit: AbFabEdit,
    restricted: false,
    mostUsed: true,
    sidebarTab: 1,
    security: {
      addPermission: [],
      view: [],
    },
  };
  return config;
};
