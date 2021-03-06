'use strict';

var q = require('q'),
    looksSame = require('looks-same'),
    PngImg = require('png-img'),
    inherit = require('inherit');

module.exports = inherit({
    __constructor: function(buffer) {
        this._img = new PngImg(buffer);
    },

    crop: function crop(rect) {
        this._img.crop(rect.left, rect.top, rect.width, rect.height);
        return q.resolve(this);
    },

    getSize: function() {
        return this._img.size();
    },

    save: function save(file) {
        return q.ninvoke(this._img, 'save', file);
    }
}, {
    compare: function(path1, path2, options) {
        options = options || {};
        return q.nfcall(looksSame, path1, path2, {
            strict: options.strictComparison,
            ignoreCaret: options.canHaveCaret
        });
    },

    buildDiff: function(opts) {
        return q.nfcall(looksSame.createDiff, {
            reference: opts.reference,
            current: opts.current,
            diff: opts.diff,
            highlightColor: opts.diffColor,
            strict: opts.strictComparison
        });
    }
});
