/**
 * @Author: Caven
 * @Date: 2021-02-09 09:47:52
 */

const fs = require('fs')
const fse = require('fs-extra')
const HOME_PATH = process.env.HOME || process.env.USERPROFILE

const BASE_PATH = `${HOME_PATH}/.dc-lab`

class FileUtil {
  /**
   *
   * @param name
   */
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

  /**
   *
   * @param fileName
   * @param filePath
   */
  static createFile(fileName, filePath) {
    try {
      let file = filePath
        ? `${filePath}/${fileName}`
        : `${BASE_PATH}/${fileName}`
      fse.ensureFileSync(file)
    } catch (e) {}
  }

  /**
   *
   * @param fileName
   * @param filePath
   * @returns {any}
   */
  static readFile(fileName, filePath) {
    let content = undefined
    try {
      let file = filePath
        ? `${filePath}/${fileName}`
        : `${BASE_PATH}/${fileName}`
      let butter = fs.readFileSync(file)
      content = butter.toString('utf-8')
    } catch (e) {}
    return content
  }

  /**
   *
   * @param fileName
   * @param content
   * @param filePath
   */
  static writeFile(fileName, content, filePath) {
    try {
      let file = filePath
        ? `${filePath}/${fileName}`
        : `${BASE_PATH}/${fileName}`
      fs.writeFile(file, content, (err) => {})
    } catch (e) {}
  }

  /**
   *
   * @param filePath
   * @param content
   */
  static writeFileByPath(filePath, content) {
    try {
      fs.writeFile(filePath, content, (err) => {})
    } catch (e) {}
  }

  /**
   *
   * @param fileName
   * @param filePath
   */
  static removeFile(fileName, filePath) {
    try {
      let file = filePath
        ? `${filePath}/${fileName}`
        : `${BASE_PATH}/${fileName}`
      fse.removeSync(file)
    } catch (e) {}
  }
}

export default FileUtil
