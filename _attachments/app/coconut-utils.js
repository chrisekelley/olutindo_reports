function refreshChart(id, name) {
	document.getElementById(id).innerHTML = name;
}

// helper to generate unique ids.
// Taken from hood.ie and hacked slightly for numbers only
var uuid  = function(len, numbersOnly) {
  var chars, i, radix;

  // default uuid length to 7
  if (len === undefined) {
    len = 7;
  }

  // uuids consist of numbers and lowercase letters only.
  // We stick to lowercase letters to prevent confusion
  // and to prevent issues with CouchDB, e.g. database
  // names do wonly allow for lowercase letters.
  chars = '0123456789abcdefghijklmnopqrstuvwxyz'.split('');
  if (numbersOnly != null) {
    chars = '0123456789'.split('');
  }
  radix = chars.length;

  // eehmm, yeah.
  return ((function() {
    var _i, _results = [];

    for (i = _i = 0; 0 <= len ? _i < len : _i > len; i = 0 <= len ? ++_i : --_i) {
      var rand = Math.random() * radix;
      var char = chars[Math.floor(rand)];
      _results.push(chars[0] = String(char).charAt(0));
    }

    return _results;
  })()).join('');
};