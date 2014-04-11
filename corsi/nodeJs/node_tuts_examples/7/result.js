
  obj: function(count, options) {
    var properties = Object.keys(options);
    var data = {};
    properties.forEach(function(item) {
      data[item] = this[item](count);
    }, this);
    var result = [];
    _.times(count, function(i) {
      var item = {};
      Object.keys(data).forEach(function(key) {
        item[key] = data[key][i];
      });
      result.push(item);
    });
    return result;
  }
