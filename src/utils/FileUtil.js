/**
 * @Author: Caven
 * @Date: 2021-02-09 09:47:52
 */

const fs = require('fs')
const fse = require('fs-extra')

const HOME_PATH = process.env.HOME || process.env.USERPROFILE

const BASE_PATH = `${HOME_PATH}/.dc-lab`

class FileUtil {
  static createFold(name) {
    try {
      if (!name) {
        fse.exists(`${BASE_PATH}`, (exists) => {
          !exists && fse.mkdirSync(`${BASE_PATH}`)
        })
      } else {
        fse.exists(`${BASE_PATH}/${name}`, (exists) => {
          !exists && fse.mkdirSync(`${BASE_PATH}/${name}`)
        })
      }
    } catch (e) {}
  }

  static createFile(fileName) {
    try {
      let file = `${BASE_PATH}/${fileName}`
      fse.ensureFileSync(file)
    } catch (e) {}
  }

  static readFile(fileName) {
    let content = undefined
    try {
      let file = `${BASE_PATH}/${fileName}`
      let butter = fs.readFileSync(file)
      content = butter.toString('utf-8')
    } catch (e) {}
    return content
  }

  static writeFile(fileName, content) {
    try {
      let file = `${BASE_PATH}/${fileName}`
      fs.writeFile(file, content, (err) => {})
    } catch (e) {}
  }

  static removeFile(fileName) {
    try {
      let file = `${BASE_PATH}/${fileName}`
      fse.removeSync(file)
    } catch (e) {}
  }
}

export default FileUtil
