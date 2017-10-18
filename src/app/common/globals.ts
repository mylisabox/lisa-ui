export const Globals = {
  baseUrl: window.location.hostname + ':3000/api/v1',
  tokenKey: 'token',
  getUrl: function (path) {
    return window.location.protocol + '//' + Globals.baseUrl + path;
  },
  getWsUrl: function (path) {
    return (window.location.protocol.indexOf('https') !== -1 ? 'wss' : 'ws') + '://' + Globals.baseUrl + path;
  }
}
