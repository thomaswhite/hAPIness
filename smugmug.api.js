/*jshint laxcomma:true*/
/*global module*/
(function (ajax, param) {
  "use strict";

  function SmugmugAPI (key, version, endpoint) {
    if (!key || !version) {
      throw "An API key and valid version must be supplied to use the Smugmug API.";
    }

    if (versions[version]) {
      versions[version]
        .reduce(function (acc, fn) {
          var namespace = fn.split(".")
            , last = namespace.pop();

          namespace.reduce(function (acc, part) {
            return (acc[part] = acc[part] || {});
          }, acc)[last] = callAPI.bind(this, "" + fn);

          return acc;
        }, this);
    } else {
      throw "Version '{version}' not available in [{keys}]."
        .replace("{version}", version)
        .replace("{keys}", Object.keys(versions).join(","));
    }

    this.endpoint = endpoint || "json";
    this.key = key;
    this.version = version;

    this.url = "http{secure}://api.smugmug.com/services/api/{endpoint}/{version}/?{params}&JSONCallback=?"
      .replace("{endpoint}", this.endpoint)
      .replace("{version}", this.version);
  }

  function callAPI (method, params, callback, https) {
    /*jshint validthis:true */
    params.method = method;
    params.APIKey = params.APIKey || this.APIKey;
    params.SessionID = params.SessionID || this.SessionID;
    
    ajax({
      "data": null
      ,"dataType": "jsonp"
      ,"success": callback
      ,"url": this.url
        .replace("{secure}", (!!https ? "s" : ""))
        .replace("{params}", param(params))
    });
  }

  function Smugmug (key, version) {
    return new SmugmugAPI(key, version);
  }

  var versions = {
    "1.2.2": [
      "albums.applyWatermark"
      ,"albums.changeSettings"
      ,"albums.comments.add"
      ,"albums.comments.get"
      ,"albums.create"
      ,"albums.delete"
      ,"albums.get"
      ,"albums.getInfo"
      ,"albums.getStats"
      ,"albums.removeWatermark"
      ,"albums.reSort"
      ,"albumtemplates.changeSettings"
      ,"albumtemplates.create"
      ,"albumtemplates.delete"
      ,"albumtemplates.get"
      ,"auth.checkAccessToken"
      ,"auth.getAccessToken"
      ,"auth.getRequestToken"
      ,"categories.create"
      ,"categories.delete"
      ,"categories.get"
      ,"categories.rename"
      ,"communities.get"
      ,"coupons.create"
      ,"coupons.get"
      ,"coupons.getInfo"
      ,"coupons.modify"
      ,"coupons.restrictions.albums.add"
      ,"coupons.restrictions.albums.remove"
      ,"family.add"
      ,"family.get"
      ,"family.remove"
      ,"family.removeAll"
      ,"fans.get"
      ,"featured.albums.get"
      ,"friends.add"
      ,"friends.get"
      ,"friends.remove"
      ,"friends.removeAll"
      ,"images.applyWatermark"
      ,"images.changePosition"
      ,"images.changeSettings"
      ,"images.collect"
      ,"images.comments.add"
      ,"images.comments.get"
      ,"images.crop"
      ,"images.delete"
      ,"images.get"
      ,"images.getEXIF"
      ,"images.getInfo"
      ,"images.getStats"
      ,"images.getURLs"
      ,"images.removeWatermark"
      ,"images.rotate"
      ,"images.uploadFromURL"
      ,"images.zoomThumbnail"
      ,"login.anonymously"
      ,"login.withHash"
      ,"login.withPassword"
      ,"logout"
      ,"printmarks.create"
      ,"printmarks.delete"
      ,"printmarks.get"
      ,"printmarks.getInfo"
      ,"printmarks.modify"
      ,"products.get  deprecated"
      ,"service.ping"
      ,"sharegroups.albums.add"
      ,"sharegroups.albums.get"
      ,"sharegroups.albums.remove"
      ,"sharegroups.create"
      ,"sharegroups.delete"
      ,"sharegroups.get"
      ,"sharegroups.getInfo"
      ,"sharegroups.modify"
      ,"styles.getTemplates"
      ,"subcategories.create"
      ,"subcategories.delete"
      ,"subcategories.get"
      ,"subcategories.getAll"
      ,"subcategories.rename"
      ,"themes.get"
      ,"users.getInfo"
      ,"users.getStats"
      ,"users.getTree"
      ,"watermarks.changeSettings"
      ,"watermarks.create"
      ,"watermarks.delete"
      ,"watermarks.get"
      ,"watermarks.getInfo"
    ]
    ,"1.3.0": [
      "accounts.browse"
      ,"albums.applyWatermark"
      ,"albums.browse"
      ,"albums.changeSettings"
      ,"albums.comments.add"
      ,"albums.comments.get"
      ,"albums.create"
      ,"albums.delete"
      ,"albums.get"
      ,"albums.getInfo"
      ,"albums.getStats"
      ,"albums.removeWatermark"
      ,"albums.reSort"
      ,"albumtemplates.changeSettings"
      ,"albumtemplates.create"
      ,"albumtemplates.delete"
      ,"albumtemplates.get"
      ,"auth.checkAccessToken"
      ,"auth.getAccessToken"
      ,"auth.getRequestToken"
      ,"categories.create"
      ,"categories.delete"
      ,"categories.get"
      ,"categories.rename"
      ,"communities.get"
      ,"coupons.create"
      ,"coupons.get"
      ,"coupons.getInfo"
      ,"coupons.modify"
      ,"coupons.restrictions.albums.add"
      ,"coupons.restrictions.albums.remove"
      ,"family.add"
      ,"family.get"
      ,"family.remove"
      ,"family.removeAll"
      ,"fans.get"
      ,"featured.albums.get"
      ,"friends.add"
      ,"friends.get"
      ,"friends.remove"
      ,"friends.removeAll"
      ,"images.applyWatermark"
      ,"images.changePosition"
      ,"images.changeSettings"
      ,"images.collect"
      ,"images.comments.add"
      ,"images.comments.get"
      ,"images.crop"
      ,"images.delete"
      ,"images.get"
      ,"images.getEXIF"
      ,"images.getInfo"
      ,"images.getStats"
      ,"images.getURLs"
      ,"images.removeWatermark"
      ,"images.rotate"
      ,"images.uploadFromURL"
      ,"images.zoomThumbnail"
      ,"printmarks.create"
      ,"printmarks.delete"
      ,"printmarks.get"
      ,"printmarks.getInfo"
      ,"printmarks.modify"
      ,"service.ping"
      ,"sharegroups.albums.add"
      ,"sharegroups.albums.get"
      ,"sharegroups.albums.remove"
      ,"sharegroups.browse"
      ,"sharegroups.create"
      ,"sharegroups.delete"
      ,"sharegroups.get"
      ,"sharegroups.getInfo"
      ,"sharegroups.modify"
      ,"styles.getTemplates"
      ,"subcategories.create"
      ,"subcategories.delete"
      ,"subcategories.get"
      ,"subcategories.getAll"
      ,"subcategories.rename"
      ,"themes.get"
      ,"users.getInfo"
      ,"users.getStats"
      ,"users.getTree"
      ,"watermarks.changeSettings"
      ,"watermarks.create"
      ,"watermarks.delete"
      ,"watermarks.get"
      ,"watermarks.getInfo"]
    };

  typeof module === "undefined" ? this.Smugmug = Smugmug : module.exports = Smugmug;
}());