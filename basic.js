var tape = require('tape');
var Provider = require('butter-provider');

var config = Provider.prototype.parseArgs('stremio?auth={"url":"http://api8.herokuapp.com","key":"423f59935153f2f5d2db0f6c9b812592b61b3737"}&url=http://localhost:9005');

function load() {
    return require('../');
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
    t.timeoutAfter(1000);

    var P = load();
    var I = new P(config.args);

    I.fetch().then(function (r) {
        t.ok(r, 'we were able to get')
        t.end();
    })
})
