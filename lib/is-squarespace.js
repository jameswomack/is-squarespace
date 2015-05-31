var request = require('request');

/* TLDR: SquareSpace sites have a 'SS_MID' cookie &
   the headers 'x-servedby' & 'x-via' */
function isSquarespace(URL, ready) {
  request({
    url: URL,
    // Performance, duh
    method: 'head',
    // SquareSpace will return a 403 without a legit-looking User-Agent
    headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_3) ' +
                    'AppleWebKit/537.36 (KHTML, like Gecko) ' +
                    'Chrome/43.0.2357.65 Safari/537.36'
    }
  }, function checkForSquarespaceHTML (error, response) {
      var headers = response.headers;
      /* Some servers (especially Nginx in my testing) don't serve
         this header on head */
      var cookies = headers['set-cookie'] || [];
      var hasSSCookie = cookies.some(function (cookieString) {
        return cookieString.indexOf('SS_MID') !== -1;
      });
      var hasSSCacheHeaders = ['x-servedby', 'x-via'].every(function (headerName) {
        return !!headers[headerName];
      });
      ready(error, hasSSCookie && hasSSCacheHeaders);
    });
}

module.exports = isSquarespace;
