var path = require('path');
var tape = require('tape');
var Provider = require('butter-provider');
var debug = require('debug')('butter-provider:tests')

var pkg = require(path.join(process.cwd(), 'package.json'));

var config = {
    args: {},
    timeout: 1000
};

if (pkg.butter && pkg.butter.testArgs) {
    config.args = Object.assign({}, config.args, Provider.prototype.parseArgs(pkg.butter.testArgs).args)
}

function load() {
    return require(process.cwd());
}

tape.onFinish(function() { 
    process.exit(0)
});

tape('loads', function (t) {
    var P = load();

    t.ok(P, 'we were able to load')

    var I = new P(config.args);

    t.ok(I, 'we were able to instanciate')

    t.ok(I.config.name, 'we have a name')
    t.ok(I.config.uniqueId, 'we have a uniqueId')
    t.ok(I.config.tabName, 'we have a tabName')
    t.ok(I.config.type, 'we have a type')

    t.ok(I.args, 'we have an args object')

    t.end();
})

tape('fetch', function (t) {
    debug('fetch, timeout', config.timeout)
    t.timeoutAfter(config.timeout);

    var P = load();
    var I = new P(config.args);

    I.fetch().then(function (r) {
        debug ('fetch', r)
        t.ok(r, 'we were able to fetch')
        t.ok(r.hasMore===true || r.hasMore===false, 'we have a hasMore field that is a boolean: ')
        t.ok(r.results, 'we have a results field')
        t.ok(r.results.length > 0, 'we have at least 1 result')
        t.ok(I.extractIds(r), 'extractIds')
        t.end();
    }).catch(function (e) {
        t.notOk(e, 'failed fetch')
    })
})
