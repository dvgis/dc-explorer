export const menuData = [
  {
    key: 'scene',
    label: '场景管理',
    panelTitle: '场景管理',
  },
  {
    key: 'map',
    label: '地图选择',
    panelTitle: '地图配置',
  },
  {
    key: 'terrain',
    label: '地形选择',
  },
  {
    key: 'effect',
    label: '效果选择',
  },
  {
    key: 'widget',
    label: '组件设置',
  },
  {
    key: 'setting',
    label: '场景设置',
  },
]

export const mapData = [
  {
    type: 'tdt',
    name: '天地图矢量',
    style: ['vec'],
    preview: 'assets/images/map/vec.png',
  },
  {
    type: 'tdt',
    style: ['img', 'vca'],
    name: '天地图影像',
    preview: 'assets/images/map/img_bz.png',
  },
  {
    type: 'tdt',
    style: ['img'],
    name: '天地图影像(无标注)',
    preview: 'assets/images/map/img.png',
  },
  {
    type: 'baidu',
    style: ['normal'],
    name: '百度矢量',
    preview: 'assets/images/map/baidu_vec.png',
  },
  {
    type: 'baidu',
    style: ['img'],
    name: '百度影像',
    preview: 'assets/images/map/img.png',
  },
  {
    type: 'baidu',
    style: ['dark'],
    name: '百度黑色',
    preview: 'assets/images/map/dark.png',
  },
  {
    type: 'baidu',
    style: ['midnight'],
    name: '百度午夜蓝',
    preview: 'assets/images/map/midnight.png',
  },
  {
    type: 'amap',
    style: ['elc'],
    name: '高德矢量',
    preview: 'assets/images/map/amap_vec.png',
  },
  {
    type: 'amap',
    style: ['img'],
    name: '高德影像',
    preview: 'assets/images/map/img.png',
  },
  {
    type: 'tencent',
    style: ['elc'],
    name: '腾讯矢量',
    preview: 'assets/images/map/tencent_vec.png',
  },
  {
    type: 'tencent',
    style: ['img'],
    name: '腾讯影像',
    preview: 'assets/images/map/img.png',
  },
]

export const layerTypeData = [
  {
    type: 'vector',
    name: '矢量图层',
  },
  {
    type: 'tileset',
    name: '流式图层',
  },
  {
    type: 'geojson',
    name: 'GeoJson',
  },
]

export const overlayTypeData = [
  {
    type: 'point',
    name: '点',
  },
  {
    type: 'polyline',
    name: '线',
  },
  {
    type: 'polygon',
    name: '面',
  },
]

export const materialTypeData = [
  {
    type: 'color',
    name: '颜色',
  },
  {
    type: 'polylineTrail',
    name: '轨迹线',
  },
  {
    type: 'polylineImageTrail',
    name: '图片轨迹线',
  },
  {
    type: 'polylineFlow',
    name: '流动线',
  },
  {
    type: 'polylineFlicker',
    name: '闪烁线',
  },
  {
    type: 'wallTrail',
    name: '流动墙体',
  },
  {
    type: 'water',
    name: '流水面',
  },
  {
    type: 'ellipsoidElec',
    name: '电弧球',
  },
  {
    type: 'circleScan',
    name: '扫描圆',
  },
]

export const effectTypeData = [
  {
    type: 'base',
    name: '基础效果',
    children: [
      {
        type: 'basic',
        name: '内置效果',
        preview: 'assets/images/effect/basic.png',
        panelType: 'basic',
        panelTitle: '效果设置',
      },
      {
        type: 'weather',
        name: '天气效果',
        preview: 'assets/images/effect/weather.gif',
        panelType: 'weather',
        panelTitle: '天气设置',
      },
    ],
  },
  {
    type: 'primitive',
    name: '图元效果',
    children: [
      {
        type: 'scan_circle',
        name: '扫描圆',
        preview: 'assets/images/effect/scan_circle.gif',
        panelType: 'primitive',
        panelTitle: '图元设置',
      },
      {
        type: 'elec_ellipsoid',
        name: '电弧球',
        preview: 'assets/images/effect/elec_ellipsoid.gif',
        panelType: 'primitive',
        panelTitle: '图元设置',
      },
      {
        type: 'v_flow_line',
        name: '垂直流动线',
        preview: '',
        panelType: 'primitive',
        panelTitle: '图元设置',
      },
      {
        type: 'parabola',
        name: '抛物线',
        preview: '',
        panelType: 'primitive',
        panelTitle: '图元设置',
      },
    ],
  },
  {
    type: 'particle',
    name: '粒子系统',
    children: [],
  },
  {
    type: 'postStage',
    name: '后期特效',
    children: [],
  },
]
