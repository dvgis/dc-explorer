/**
 * @Author: Caven
 * @Date: 2021-02-08 16:11:49
 */

import FileUtil from '@/utils/FileUtil'
import CryptoUtil from '@/utils/CryptoUtil'

class UserApi {
  /**
   *
   */
  static initUserInfo() {
    let token = CryptoUtil.encrypt({
      proCount: 2,
    })
    let userInfo = {
      token,
      proCount: 2,
      proList: [],
    }
    try {
      FileUtil.writeFile('user.dc', CryptoUtil.encrypt(userInfo))
    } catch (e) {
      throw new Error(e.message)
    }
    return token
  }

  /**
   *
   * @returns {any}
   */
  static getUserInfo() {
    let userInfo = undefined
    try {
      const data = FileUtil.readFile('user.dc')
      if (data) {
        userInfo = CryptoUtil.decrypt(data)
      }
    } catch (e) {
      throw new Error(e.message)
    }
    return userInfo
  }

  /**
   *
   * @param userInfo
   */
  static saveUserInfo(userInfo) {
    if (!userInfo) {
      return
    }
    try {
      FileUtil.writeFile('user.dc', CryptoUtil.encrypt(userInfo))
    } catch (e) {
      throw new Error(e.message)
    }
  }
}

export default UserApi
