(function() {
  var init, root;
  root = (typeof exports !== "undefined" && exports !== null) ? exports : this;
  init = function() {
    return chrome.extension.sendRequest({
      'operation': 'checkFilter',
      'hostname': window.location.hostname,
      'pathname': window.location.pathname
    }, function(response) {
      var hostname, href, newUrl, pathname;
      if (response.result === true) {
        return null;
      }
      window.stop();
      href = encodeURIComponent(window.location.href);
      hostname = encodeURIComponent(window.location.hostname);
      pathname = encodeURIComponent(window.location.pathname);
      newUrl = ("warning.html?href=" + (href) + "&hostname=" + (hostname) + "&pathname=" + (pathname));
      return window.location.replace(chrome.extension.getURL(newUrl));
    });
  };
  init();
}).call(this);
