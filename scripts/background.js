(function() {
  var init, root;
  root = (typeof exports !== "undefined" && exports !== null) ? exports : this;
  init = function(event) {
    return chrome.extension.onRequest.addListener(function(request, sender, callback) {
      switch (request.operation) {
        case 'checkFilter':
          return callback({
            'result': Config.checkFilter(request.hostname, request.pathname)
          });
      }
    });
  };
  window.addEventListener('load', init, true);
}).call(this);
