var _ = require('underscore');

module.exports = {
    process: function (request, email, callback) {
        if(!callback || typeof callback != 'function') {
            return null;
        }
        console.log(typeof email)
        if(typeof email != 'string' || !request) {
            callback(undefined, null);
        }
        var uri = 'https://apis.google.com/u/0/_/socialgraph/lookup/hovercards/?rt=j';
        email = encodeURIComponent("[[[" + email + "]]]");
        request.post({
            url: uri,
            body: "m=" + email,
            headers: {
                'content-type': 'application/x-www-form-urlencoded'
            }
        }, function (error, response, body) {
            var parsed = '' + body;
            // Fix corrupt JSON coming from the service
            parsed = parsed.replace(')]}\'\n\n', '');
            // Parse JSON
            parsed = JSON.parse(parsed);
            // Extract scalar values from all nested arrays
            parsed = _.flatten(parsed);
            // Remove empty values
            parsed = parsed.filter(function (item) {
                return item != null;
            });
            // Look for known values
            for (var i = 0; i < parsed.length; i++) {
                var value = parsed[i];
                if (/^\/\/plus.google.com\/u/.test(value)) {
                    callback(undefined, value);
                    return;
                }
            }
            // No known data found
            callback(undefined, null);
        });
    }
};
