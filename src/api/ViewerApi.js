/**
 * @Author: Caven
 * @Date: 2020-11-17 18:55:35
 */

class ViewerApi {
  constructor(viewer) {
    this._viewer = viewer
  }

  get viewer() {
    return this._viewer
  }

  getCameraPosition() {
    return this.viewer.cameraPosition.toString()
  }

  flyToPosition(position) {
    this.viewer.flyToPosition(position)
    return this
  }

  addBaselayer(options = {}) {
    this.viewer.imageryLayers.removeAll()
    if (options?.style && Array.isArray(options.style)) {
      options.style.forEach((item) => {
        let baselayer = DC.ImageryLayerFactory.createImageryLayer(
          options.type,
          {
            key: options?.key,
            style: item,
          }
        )
        this.viewer.imageryLayers.addImageryProvider(baselayer)
      })
    }
    return this
  }

  setBaseLayer(options = {}) {
    let baselayer = this.viewer.imageryLayers.get(0)
    if (baselayer) {
      DC.Util.merge(baselayer, options)
    }
    return this
  }

  removeBaseLayer() {
    this.viewer.imageryLayers.removeAll()
    return this
  }

  addTerrain(options) {}

  addLayer(layerOption, overlayOption, material) {
    let layer = undefined
    if (layerOption.type === 'vector') {
      layer = new DC.VectorLayer(layerOption.id)
    } else if (layerOption.type === 'tileset') {
      layer = new DC.TilesetLayer(layerOption.id)
    } else if (layerOption.type === 'geojson') {
      layer = new DC.GeoJsonLayer(layerOption.id, layerOption.url)
    } else if (layerOption.type === 'primitive') {
      layer = new DC.PrimitiveLayer(layerOption.id)
    }
    if (layer) {
      layer.attr = {
        name: layerOption.name,
      }
      layer.show = layerOption.show
      layer && layer.addTo(this.viewer)
    }
  }

  removeLayer(layerId) {
    let layer = this.viewer.getLayer(layerId)
    if (layer) {
      layer.clear()
      this.viewer.removeLayer(layer)
    }
    return this
  }

  clearLayer(layerId) {
    let layer = this.viewer.getLayer(layerId)
    if (layer) {
      layer.clear()
    }
    return this
  }

  updateLayer(options = {}) {
    let layer = this.viewer.getLayer(options.id)
    if (layer) {
      layer.attr['name'] = options.name
      layer.show = options.show
    }
    return this
  }

  setLayerVisible(layerId, visible) {
    let layer = this.viewer.getLayer(layerId)
    if (layer) {
      layer.show = visible
    }
    return this
  }

  addTileset(layerId, options) {
    let layer = this.viewer.getLayer(layerId)
    if (layer && options.url) {
      let overlay = new DC.Tileset(options.url)
      if (options.lng && options.lat) {
        overlay.setPosition([
          options.lng,
          options.lat,
          options.alt,
          options.heading,
        ])
      }
      if (options.customShader) {
        overlay.setCustomShader(options.customShader)
      }
      overlay.id = options.id
      layer.addOverlay(overlay)
    }
    return this
  }

  addModel(layerId, options) {
    let layer = this.viewer.getLayer(layerId)
    if (layer && options.url) {
      let overlay = new DC.Model(
        [options.lng, options.lat, options.alt, options.heading],
        options.url
      )
      overlay.id = options.id
      layer.addOverlay(overlay)
    }
    return this
  }

  updateTileset(layerId, overlayId, options) {}

  updateModel() {}

  creatMaterial() {}

  removeOverlay(layerId, overlayId) {
    let layer = this.viewer.getLayer(layerId)
    if (layer) {
      let overlay = layer.getOverlayById(overlayId)
      layer.removeOverlay(overlay)
    }
    return this
  }

  setOverlayVisible(layerId, overlay) {
    let layer = this.viewer.getLayer(layerId)
    if (layer) {
      layer.getOverlayById(overlay.id).show = overlay.show
    }
    return this
  }

  flyTo(layerId, overlayId) {
    let layer = this.viewer.getLayer(layerId)
    if (layer) {
      let target = layer.getOverlayById(overlayId)
      this.viewer.flyTo(target)
    }
    return this
  }

  setBasicEffect(type, options) {
    if (type === 'bloom') {
      this.viewer.effect.bloom.enable = options.enable
      this.viewer.effect.bloom.contrast = Number(options.contrast)
      this.viewer.effect.bloom.brightness = Number(options.brightness)
      this.viewer.effect.bloom.delta = Number(options.delta)
      this.viewer.effect.bloom.sigma = Number(options.sigma)
      this.viewer.effect.bloom.stepSize = Number(options.stepSize)
    } else if (type === 'brightness') {
      this.viewer.effect.brightness.enable = options.enable
      this.viewer.effect.brightness.intensity = Number(options.intensity)
    }
  }

  setWeather(type, options) {
    if (type === 'cloud') {
      this.viewer.weather.cloud.enable = options.enable
      this.viewer.weather.cloud.rotateAmount = Number(options.rotateAmount)
    } else if (type === 'fog') {
      this.viewer.weather.fog.enable = options.enable
      this.viewer.weather.fog.fogByDistance = {
        far: Number(options.far),
      }
      this.viewer.weather.fog.color = DC.Color.fromCssColorString(options.color)
    } else if (type === 'rain') {
      this.viewer.weather.rain.enable = options.enable
      this.viewer.weather.rain.speed = Number(options.speed)
    } else if (type === 'snow') {
      this.viewer.weather.snow.enable = options.enable
      this.viewer.weather.snow.speed = Number(options.speed)
    }
  }
}

export default ViewerApi
