import { response } from "express";

class TicketEvents {
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

export default TicketEvents;
