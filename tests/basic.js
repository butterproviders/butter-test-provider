var path = require('path');
var tape = require('tape');
var Provider = require('butter-provider');

var pkg = require(path.join(process.cwd(), 'package.json'));
var timeout = pkg.butter.timeout || 10000;

var config = Provider.prototype.parseArgs(pkg.butter.testArgs);

function load() {
    return require(process.cwd());
}

tape('loads', function (t) {
    var P = load();

    t.ok(P, 'we were able to load')

    var I = new P(config.args);

    t.ok(I, 'we were able to instanciate')

    t.ok(I.config.name, 'we have a name')
    t.ok(I.config.uniqueId, 'we have a uniqueId')
    t.ok(I.config.tabName, 'we have a tabName')
    t.ok(I.config.type, 'we have a type')

    t.end();
})

tape('fetch', function (t) {
    t.timeoutAfter(timeout);

    var P = load();
    var I = new P(config.args);

    I.fetch().then(function (r) {
        t.ok(r, 'we were able to fetch')
        t.ok(I.extractIds(r), 'extractIds')
        t.end();
    }).catch(function (e) {
        t.notOk(e, 'failed fetch')
    })
})
