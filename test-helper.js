// Set chai globals
// From https://github.com/xdissent/karma-chai/blob/master/adapter.js
var should;

(function(window) {
  window.should = window.chai.should();
  window.expect = window.chai.expect;
  window.assert = window.chai.assert;
})(window);

window.chai.Assertion.addMethod('truthy', function() {
  new window.chai.Assertion(this._obj).to.be.ok();
});

window.chai.Assertion.addMethod('falsy', function() {
  new window.chai.Assertion(this._obj).to.not.be.ok();
});
