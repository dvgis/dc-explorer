/**
 * @Author: Caven
 * @Date: 2021-02-09 09:48:20
 */

const AES = require('crypto-js/aes')
const Pkcs7 = require('crypto-js/pad-pkcs7')
const ECB = require('crypto-js/mode-ecb')
const UTF8 = require('crypto-js/enc-utf8')
const PASS = '@dvgis.2019$caven'

class CryptoUtil {
  static encrypt(object) {
    let content = undefined
    try {
      content = AES.encrypt(JSON.stringify(object), PASS, {
        mode: ECB,
        padding: Pkcs7,
      }).toString()
    } catch (e) {}
    return content
  }

  static decrypt(content) {
    let object = undefined
    if (!content) {
      return object
    }
    try {
      let bytes = AES.decrypt(content, PASS, {
        mode: ECB,
        padding: Pkcs7,
      })
      if (bytes) {
        object = JSON.parse(bytes.toString(UTF8))
      }
    } catch (e) {}
    return object
  }
}

export default CryptoUtil
