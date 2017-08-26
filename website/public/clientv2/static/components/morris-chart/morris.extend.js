window.Morris.Donut.prototype.setData = function(data, redraw) {
    if (redraw == null) {
        redraw = true;
    }
    this.data = data;
    this.values = (function() {
    var _i, _len, _ref, _results;
    _ref = this.data;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        row = _ref[_i];
        _results.push(parseFloat(row.value));
    }
    return _results;
    }).call(this);
    this.dirty = true;
    if (redraw) {
        return this.redraw();
    }
}

window.Morris.Donut.prototype.resizeHandler = function() {
    if(document.getElementById(this.el[0].id)){
        this.timeoutId = null;
        this.raphael.setSize(this.el.width(), this.el.height());
        return this.redraw();
    }
};