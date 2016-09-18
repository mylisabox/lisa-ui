export const Globals = {
  baseUrl: 'http://localhost:3000/api/v1',
  tokenKey: 'token',
  getUrl: function (path) {
    return Globals.baseUrl + path;
  }
}
