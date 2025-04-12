/* eslint-disable @typescript-eslint/no-explicit-any */
export class DataUtil {
  static parseInt(param: any): number | null {
    const data = parseInt(param, 10);
    if (isNaN(data)) return null;
    return data;
  }
  static ensureParseInt(param: any, defaultVal: number): number {
    const data = this.parseInt(param);
    if (data === null) return defaultVal;
    return data;
  }
}

export default DataUtil;
