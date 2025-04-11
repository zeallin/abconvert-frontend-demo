export class LocalStoreageMgr {
  static getItems = <T>(key: string): T[] => {
    let item: T[] = [];
    try {
      const value = window.localStorage.getItem(key);
      // Check if the local storage already has any values,
      // otherwise initialize it with the passed initialValue
      item = value ? (JSON.parse(value) as T[]) : [];
    } catch (error) {
      console.log(error);
    }
    return item;
  };

  static setItems = <T>(key: string, items: T[]) => {
    try {
      window.localStorage.setItem(key, JSON.stringify(items));
    } catch (error) {
      console.log(error);
    }
    return items;
  };
}
