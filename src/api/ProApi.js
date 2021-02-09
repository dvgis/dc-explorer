/**
 * @Author: Caven
 * @Date: 2021-02-09 12:34:44
 */
import FileUtil from '@/utils/FileUtil'

class ProApi {
  static createPro(pro) {
    try {
      FileUtil.createFile(pro.fileName)
    } catch (e) {
      throw new Error(e.message)
    }
  }

  static removePro(pro) {
    try {
      FileUtil.removeFile(pro.fileName)
    } catch (e) {
      throw new Error(e.message)
    }
  }
}

export default ProApi
