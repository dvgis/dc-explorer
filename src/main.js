/**
 * @Author: Caven
 * @Date: 2020-11-16 18:12:40
 */

import { createApp } from 'vue'
import FileUtil from '@/utils/FileUtil'
;(async () => {
  await FileUtil.createFold()
  await FileUtil.createFold('preview')
  await FileUtil.createFile('user.dc')
  Promise.all([
    import('./App.vue'),
    import('./router'),
    import('./store'),
    import('./loader'),
  ]).then(
    ([
      { default: App },
      { default: router },
      { default: store },
      { default: appLoader },
    ]) => {
      const app = createApp(App)
      app.config.productionTip = false
      app.use(appLoader)
      app.use(router)
      app.use(store)
      app.use(appLoader)
      app.mount('#app')
    }
  )
})()
