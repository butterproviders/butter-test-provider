var path = require('path');
var tape = require('tape');
var Provider = require('butter-provider');
var debug = require('debug')('butter-provider:tests');

var pkg = require(path.join(process.cwd(), 'package.json'));

var config = {
    args: {},
    timeout: 1000
};

if (pkg.butter && pkg.butter.testArgs) {
    config.args = Object.assign({}, config.args, Provider.prototype.parseArgs(pkg.butter.testArgs).args);
}

function load() {
    return require(process.cwd());
}

tape.onFinish(function() {
    process.exit(0);
});

tape('loads', function (t) {
    var P = load();

    t.ok(P, 'we were able to load');

    var I = new P(config.args);

    t.ok(I, 'we were able to instanciate');

    t.ok(I.config.name, 'we have a name');
    t.ok(I.config.uniqueId, 'we have a uniqueId');
    t.ok(I.config.tabName, 'we have a tabName');
    t.ok(I.config.type, 'we have a type');

    t.ok(I.args, 'we have an args object');

    t.end();
});

tape('fetch', function (t) {
    debug('fetch, timeout', config.timeout);
    t.timeoutAfter(config.timeout);

    var P = load();
    var I = new P(config.args);

    I.fetch().then(function (r) {
        debug ('fetch', r);
        t.ok(r, 'we were able to fetch');
        t.ok(r.hasMore===true || r.hasMore===false, 'we have a hasMore field that is a boolean: ');
        t.ok(r.results, 'we have a results field');
        t.ok(r.results.length > 0, 'we have at least 1 result');

        var uniqueIds = I.extractIds(r);
        t.ok(uniqueIds, 'extractIds');
        I.detail(uniqueIds[0], r.results[0]).then(function (d) {
            debug ('detail', d);
            t.ok(d, 'we were able to get details');
            t.ok(d[I.config.uniqueId] || d.id, 'we have an unique id');
            t.ok(d.title, 'we have a title');
            t.ok(d.year, 'we have a year');
            t.ok(d.genre, 'we have a genre field');
            t.ok(d.genre.length > 0, 'we have at least 1 genre');
            t.ok(d.rating, 'we have a rating');
            t.ok(d.poster, 'we have a poster');
            t.ok(d.backdrop, 'we have a backdrop');
            t.ok(d.torrents, 'we have a torrents field');
            t.ok(d.subtitle, 'we have a subtitle');
            t.ok(d.trailer, 'we have a trailer');
            t.ok(d.synopsis, 'we have a synopsis');
            t.ok(d.type===Provider.TabType.MOVIE || d.type===Provider.TabType.TVSHOW || d.type===Provider.TabType.ANIME, 'we have a type field which is a tab type');
        });

        t.end();
    }).catch(function (e) {
        t.notOk(e, 'failed fetch');
    });
});

tape('random', function (t) {
    debug('random, timeout', config.timeout);
    t.timeoutAfter(config.timeout);

    var P = load();
    var I = new P(config.args);

    I.random().then(function (r) {
        debug ('random', r);
        t.ok(r, 'we were able to get a random');
        t.ok(r[I.config.uniqueId] || d.id, 'we have an unique id');
        t.ok(r.title, 'we have a title');
        t.ok(r.year, 'we have a year');
        t.ok(r.genre, 'we have a genre field');
        t.ok(r.genre.length > 0, 'we have at least 1 genre');
        t.ok(r.rating, 'we have a rating');
        t.ok(r.poster, 'we have a poster');
        t.ok(r.backdrop, 'we have a backdrop');
        t.ok(r.torrents, 'we have a torrents field');
        t.ok(r.subtitle, 'we have a subtitle');
        t.ok(r.trailer, 'we have a trailer');
        t.ok(r.synopsis, 'we have a synopsis');
        t.ok(r.type===Provider.TabType.MOVIE || r.type===Provider.TabType.TVSHOW || r.type===Provider.TabType.ANIME, 'we have a type field which is a tab type');
        t.end();
    }).catch(function (e) {
        t.notOk(e, 'failed fetch');
    });
});
