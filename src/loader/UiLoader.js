/**
 * @Author: Caven
 * @Date: 2020-12-24 20:50:42
 */

import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import { ElColorPicker } from 'element-plus'

class UiLoader {
  install(app) {
    app.use(Antd)
    app.component(ElColorPicker.name, ElColorPicker)
  }
}

const uiLoader = new UiLoader()

export default uiLoader
