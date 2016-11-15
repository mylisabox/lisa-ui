export const Globals = {
  baseUrl: 'localhost:3000/api/v1',
  tokenKey: 'token',
  getUrl: function (path) {
    return 'http://' + Globals.baseUrl + path;
  },
  getWsUrl: function (path) {
    return 'ws://' + Globals.baseUrl + path;
  }
}
