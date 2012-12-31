/*jshint laxcomma:true strict:false*/
/*globals describe it module require*/

var assert = require("chai").assert
  , http = require("http")
  , key = (require("fs")).readFileSync("./api.key", "UTF-8")
  , smugmug = require("../smugmug.api");

describe("SmugmugAPI", function () {
  it("should be a function.", function () {
    assert.isFunction(smugmug);
  });

  it("should require arguments", function () {
    assert.throws(smugmug, "No passed arguments is not valid.");

    assert.throws(function () {
      smugmug("12345");
    }, "An API version must be supplied.");
    
    assert.throws(function () {
      smugmug("12345", "1");
    }, "The version passed must be valid.");
  });

  it("should not throw an error", function () {
    assert.doesNotThrow(function () {
      smugmug("1234", "1.3.0");
    }, "The version is valid even though the API key hasn't been tested.");
  });

  describe("Methods", function () {
    it("should have API version 1.3.0 methods defined.", function() {
      var api = smugmug("1234", "1.3.0");
      assert(api.accounts.browse, "Smugmug.accounts.browse should exist");
      assert(api.sharegroups.albums.remove, "Smugmug.sharegroups.albums.remove should exist");
      assert(api.coupons.restrictions.albums.add, "Smugmug.coupons.restrictions.albums.add should exist");
    });

    it("should have API version 1.2.2 methods defined.", function() {
      var api = smugmug("1234", "1.2.2");
      assert(api.albums.applyWatermark, "Smugmug.albums.applyWatermark should exist");
      assert(api.coupons.create, "Smugmug.coupons.create should exist");
      assert(api.login.anonymously, "Smugmug.login.anonymously should exist");
    });
  });

  console.log(key);

  // describe("Requests", function () {
  //   it("should get a response from a url.", function (done) {
  //     function complete (response) {
  //       var m = '';

  //       response.on("data", function (chunk) {
  //         m += chunk;
  //       });

  //       response.on("end", function () {
  //         console.log(m);
  //         done();
  //       });
  //     }

  //     http
  //       .request({
  //         host: "api.smugmug.com"
  //         ,path: "/services/api/json/1.2.2/?method=smugmug.login.anonymously&APIKey=6C3JkTZdWzQjswrYpAMOUgBAhIkpJtTx&JSONCallback=?"
  //       }, complete)
  //       .end();
  //   });
  // });
});