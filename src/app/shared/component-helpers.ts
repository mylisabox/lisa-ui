export class ComponentHelpers {

  static get(obj: any, path: string, defaultValue: any = undefined) {
    if (path && typeof path !== 'string') return path;
    if (!path) path = "";
    let parts = path.split(".");
    while (parts.length > 1) {
      obj = obj[parts.shift()] || [];
    }
    return obj[parts.shift()] || defaultValue;
  }

}
