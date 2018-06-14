const getWindow = function () {
  if (window) {
    return window
  }
  else {
    return {
      location: {
        protocol: 'http:',
        port: 3000,
        hostname: 'localhost'
      }
    }
  }
};
const window = getWindow();

const getPort = function () {
  const defaultPort = window.location.protocol.indexOf('https') === -1 ? "80" : "443";
  return window.location.port == "" ? defaultPort : window.location.port;
};

export const Globals = {
  baseUrl: window.location.hostname + ':' + getPort() + '/api/v1',
  tokenKey: 'token',
  getUrl: function (path) {
    return window.location.protocol + '//' + Globals.baseUrl + path;
  },
  getPluginImageUrl: function (pluginId, path) {
    return window.location.protocol + '//' + Globals.baseUrl + "/plugin/" + pluginId + "/images/" + path;
  },
  getWsUrl: function (path) {
    return (window.location.protocol.indexOf('https') === -1 ? 'ws' : 'wss') + '://' + Globals.baseUrl + path;
  }
}
