# is-squarespace
## An NPM Module for doing what the name says


### Background for This Module
SquareSpace sites set an 'SS_MID' cookie and respond with the headers 'x-servedby' & 'x-via'.
In addition, SquareSpace servers reject a non-legit-looking User-Agent with the HTTP code 403.

### Implementation Details
The request sent is a HEAD rather than a GET for obvious performance reasons. Some servers don't
set any cookies, so it's important that an empty 'set-cookie' header is shimmed in on the response.

### Fragility of the is-squarespace Tests
TDD was used to create this module. Unlike most projects, I'm using real HTTP requests to fulfill the 
expectations within the tests. The whole point of this module is to actually determine if a site was
served by SquareSpace or not. If the assumptions made by is-squarespace change and you notice it
first, please be a pal and open a pull request :)

### Getting Started
```
npm i is-squarespace -S
```


```
var isSquarespace = require('is-squarespace');
isSquarespace('http://google.com', function (error, itWas) {
    // itWas === false
});
```
