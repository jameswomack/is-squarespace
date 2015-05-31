/* global describe: true, it: true */


var Assert = require('assert');
var isSquarespace = require('../lib/is-squarespace');


var HTTP  = 'http',
    HTTPS = HTTP + 's';


function test(protocol, URL, bool) {
  it('should return ' + String(bool) + ' for ' + URL, function (testDone) {
    isSquarespace(protocol + '://' + URL, function (error, itWas) {
      Assert.ok(!error, 'There should be no error');
      Assert.ok(itWas === bool, URL + ' should' + (bool ? '' : ' not') + ' be considered a Squarespace site');
      testDone();
    });
  });
}


describe('is-squarespace', function () {
  test(HTTPS, 'google.com',                 false);
  test(HTTP,  'darrenbooth.com',            true );
  test(HTTP,  'www.mariohugo.com',          true );
  test(HTTP,  'jmcreative.com',             true );
  test(HTTP,  'design-milk.com',            false);
  test(HTTP,  'www.vanbruntstillhouse.com', true );
  test(HTTP,  'www.bonjourberry.com',       true );
  test(HTTP,  'uppercasemagazine.com',      true );
  test(HTTPS, 'blog.newrelic.com',          false);
});
