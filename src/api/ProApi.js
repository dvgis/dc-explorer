/**
 * @Author: Caven
 * @Date: 2021-02-09 12:34:44
 */
import FileUtil from '@/utils/FileUtil'
import CryptoUtil from '@/utils/CryptoUtil'

class ProApi {
  static createPro(pro) {
    try {
      FileUtil.createFile(pro.fileName)
      FileUtil.writeFile(
        pro.fileName,
        CryptoUtil.encrypt({
          name: pro.name,
        })
      )
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

  static getProContent(fileName) {
    let content = undefined
    try {
      let data = FileUtil.readFile(fileName)
      if (data) {
        content = CryptoUtil.decrypt(data)
      }
    } catch (e) {
      throw new Error(e.message)
    }
    return content
  }

  static downloadFile(path, filename) {
    try {
      let content = FileUtil.readFile(filename)
      FileUtil.writeFileByPath(path, content)
    } catch (e) {
      throw new Error(e.message)
    }
  }

  static writePro(pro, fileName) {
    try {
      FileUtil.writeFile(fileName, CryptoUtil.encrypt(pro))
    } catch (e) {
      throw new Error(e.message)
    }
  }
}

export default ProApi
