# Google API Social Graph Hover Card Lookup
Checks whether an account identified by the given e-mail is available in Google+.
## Sample code
```
var lookup = require(...);
var request = require('request');
lookup.process(request, 'a.vinogradov@videal.net', function (error, googlePlusUri) {
    console.log(googlePlusUri);
});
```