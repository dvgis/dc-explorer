<template>
  <div class="panel setting-panel">
    <a-collapse accordion>
      <a-collapse-panel key="tdt_key" header="天地图key">
        <p>{{}}</p>
      </a-collapse-panel>
      <a-collapse-panel key="globe" header="地球设置">
        <p>{{}}</p>
      </a-collapse-panel>
      <a-collapse-panel key="camera" header="相机设置">
        <p>{{}}</p>
      </a-collapse-panel>
      <a-collapse-panel key="others" header="其他设置">
        <p>{{}}</p>
      </a-collapse-panel>
    </a-collapse>
  </div>
</template>

<script>
export default {
  name: 'SettingPanel',
  data() {
    return {}
  },
  methods: {},
}
</script>
