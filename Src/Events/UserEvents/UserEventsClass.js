import { response } from "express";

class UserEvents {
  /**
   *
   * @param {response} res
   * @param {String} lang
   */
  constructor(res, lang) {
    this.res = res;
    this.lang = lang;
  }
}

export default UserEvents;
