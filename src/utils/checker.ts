/* eslint-disable @typescript-eslint/no-explicit-any */
export class Checker {
  static isSetNonNull(param: any): boolean {
    if (typeof param !== "undefined" && param !== null) {
      return true;
    }
    return false;
  }

  static isStr(param: any): boolean {
    return typeof param === "string" || param instanceof String;
  }

  static isNonEmptyStr(param: any): boolean {
    return this.isStr(param) && param.length > 0;
  }

  static isNonEmptyAry(param: any): boolean {
    return Array.isArray(param) && param.length > 0;
  }
}

export default Checker;
