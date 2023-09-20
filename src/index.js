import tableSVG from '@plone/volto/icons/table.svg';

import { AbFabView, AbFabEdit } from './AbFab';

// const AbFabEditor = () => {
//   return (
//     <div>
//       <h1>AbFab</h1>
//       <p>
//         <a href="/++api++/~/abfab/@edit">AbFab Editor</a>
//       </p>
//     </div>
//   );
// };

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
  // config.addonRoutes = [
  //   ...(config.addonRoutes || []),
  //   {
  //     path: '/controlpanel/abfab-editor',
  //     component: AbFabEditor,
  //   },
  // ];

  // // Add manage view to controlpanel
  // config.settings.controlpanels = [
  //   ...(config.settings.controlpanels || []),
  //   {
  //     '@id': '/abfab-editor',
  //     group: 'Add-on Configuration',
  //     title: 'AbFab Editor',
  //   },
  // ];
  // config.settings.controlPanelsIcons['abfab-editor'] = tableSVG;

  return config;
};
