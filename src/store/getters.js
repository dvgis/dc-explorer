/**
 * @Author: Caven
 * @Date: 2021-01-22 17:39:44
 */

const getters = {
  proCount: (state) => state.User.proCount,
  proList: (state) => state.User.proList,
  selectedIndex: (state) => state.User.selectedIndex,
  currentMenu: (state) => state.Menu.currentMenu,
  currentToolPanel: (state) => state.Menu.currentToolPanel,
  currentBaseLayer: (state) => state.BaseLayer.currentBaseLayer,
  selectedBaseLayer: (state) => state.BaseLayer.selectedBaseLayer,
  selectedKey: (state) => state.Pro.selectedKey,
  proName: (state) => state.Pro.name,
  layers: (state) => state.Pro.layers,
  baseLayers: (state) => state.Pro.baseLayers,
  viewPositions: (state) => state.Pro.viewPositions,
  terrain: (state) => state.Pro.terrain,
  effect: (state) => state.Pro.effect,
  widgets: (state) => state.Pro.widgets,
  setting: (state) => state.Pro.setting,
  selectedLayer: (state) => state.Layer.selectedLayer,
}

export default getters
