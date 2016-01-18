var common = {
    parse_url: function(str, component) {
        var php_js = {},
            query,
            ini = (php_js && php_js.ini) || {},
            mode = (ini['phpjs.parse_url.mode'] && ini['phpjs.parse_url.mode'].local_value) || 'php',
            key = [
                'source',
                'scheme',
                'authority',
                'userInfo',
                'user',
                'pass',
                'host',
                'port',
                'relative',
                'path',
                'directory',
                'file',
                'query',
                'fragment'
            ],
            parser = {
                php: /^(?:([^:\/?#]+):)?(?:\/\/()(?:(?:()(?:([^:@\/]*):?([^:@\/]*))?@)?([^:\/?#]*)(?::(\d*))?))?()(?:(()(?:(?:[^?#\/]*\/)*)()(?:[^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
                strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@\/]*):?([^:@\/]*))?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
                loose : /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/\/?)?((?:(([^:@\/]*):?([^:@\/]*))?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/ // Added one optional slash to post-scheme to catch file:/// (should restrict this)
            },
            m = parser[mode].exec(str),
            uri = {},
            i = 14;

        while (i--) {
            if (m[i]) {
                uri[key[i]] = m[i];
            }
        }

        if (component) {
            return uri[component.replace('PHP_URL_', '').toLowerCase()];
        }

        if (mode !== 'php') {
            var name = (ini['phpjs.parse_url.queryKey'] && ini['phpjs.parse_url.queryKey'].local_value) || 'queryKey';
            parser = /(?:^|&)([^&=]*)=?([^&]*)/g;
            uri[name] = {};
            query = uri[key[12]] || '';
            query.replace(parser, function($0, $1, $2) {
                if ($1) {
                    uri[name][$1] = $2;
                }
            });
        }

        delete uri.source;
        return uri;
    },
    getLinkReg: function(str) {
        return str.replace(/user\./g, '').replace(/page\./g, '').replace(/\//g, '\\/').replace(/\./g, '\\.').replace(/\?/g, '\\?');
    },
    trim: function(str) {
        // return str.replace(/^\s*|\s*$/g, '');
        return str.trim();
    },
    getHost: function(str) {
        return str.replace(/https?:\/\/([^\/]*)\/.*/i, '$1');
    },
    capitalize: function(str) {
        return str.replace(/^[a-z]{1}/,function($1){return $1.toLocaleUpperCase()});
    },
    stripTags: function(str) {
        return str.replace(/(<([^>]+)>)/ig, '');
    },
    registerDestruction: function(host, type, value) {
        var destruction, args;
        if (arguments.length != 3) return;
        if (typeof browser.params.destruction == 'undefined') browser.params.destruction = {};
        destruction = browser.params.destruction;

        args = [host, type];
        args.forEach(
            function(e, idx) {
                if (!destruction[e]) destruction[e] = (!idx) ? {} : [];
                destruction = destruction[e];
            }
        );
        if (destruction.indexOf(value) == -1) destruction.push(value);
        // console.log(browser.params.destruction)
    },
    getTestData: function(type, layer) {
    	var data;

        switch (type) {
            case 'item':
                //shadow
                data = browser.params.shadow;
                for (var i=-1,l=layer.length;++i<l;) data = data[layer[i]];

                if (typeof data == 'undefined') {
                    // data = testData;
                    data = browser.params.face;
                    for (var i=-1,l=layer.length;++i<l;) data = data[layer[i]];
                }//end for
                break;
            default:
                data = (typeof browser.params[type] != 'undefined') ? browser.params[type] : {};
                break;
        }//end switch

    	return data;
    }
};

module.exports = common;
