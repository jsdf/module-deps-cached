var mdeps = require('../');
var test = require('tape');
var JSONStream = require('JSONStream');
var packer = require('browser-pack');


test('transform', function (t) {
    t.plan(6);
    run(t);
    run(t);
});


function run(t) {
    var mtimes = {};
    var cache = {};
    var packageCache = {};
    var p = mdeps(__dirname + '/files/tr_2dep_module/main.js', {
        mtimes: mtimes,
        cache: cache,
        packageCache: packageCache,
        transform: [ 'insert-aaa', 'insert-bbb' ],
        transformKey: [ 'browserify', 'transform' ]
    });
    var pack = packer();
    
    p.pipe(JSONStream.stringify()).pipe(pack);
    
    var src = '';
    pack.on('data', function (buf) { src += buf });
    pack.on('end', function () {
        Function('t', src)(t);
    });
}