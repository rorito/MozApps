//Deferred.installInto(Zepto);


//TODO
// 1. replace console.log
// 2. add refresh button to main page


window.mozapps = window.mozapps || {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  Utils: {},
  currentPage: {},

  fetchAppCollection: function(){
    //Note: we're using a backbone collection for the template collection which is backed by a Kinvey Collection
    // so that we can fall back to fixture data for the templates if we're offline on our first fetch attempt.
    // With the My Apps collection, it's initial state is empty, so we don't need fixutre data. Even if we start
    // with created apps on the server and an empty app, it is fine because when apps get created they get a GUID
    // and the locally created app won't collide with ones on the server that will be eventually downloaded
    window.MozAppsKinvey.MozAppCollection.fetch({
        success: function(data) {
        },
        error: function(e) {
        },
        complete: function(data){
        }
    });
  },
  init: function() {
    mozapps.tmplCollection = new mozapps.Collections.TemplateCollection();
    mozapps.fetchAppCollection();

    mozapps.tmplListView = new mozapps.Views.templatesListView();
    mozapps.tmplDetailView = new mozapps.Views.templateDetailView({collection: mozapps.tmplCollection});
    mozapps.appBuilderView = new mozapps.Views.appBuilderView();
    mozapps.router = new mozapps.Routers.ApplicationRouter(); 
    Backbone.history.start(); //{ pushState: true, root: mozapps.root }
  }
};

$(document).ready(function(){

  // TEMP INSTALL



  var request = navigator.mozApps.getSelf();
  request.onsuccess = function() {
    if (request.result) {
      // we're installed
    } else {
      navigator.mozApps.install("http://10.118.118.171:3501/manifest.webapp");
    }
  };
  request.onerror = function() {
    alert('Error checking installation status: ' + this.error.message);
  };

   window.mozapps.init();

});

Handlebars.registerHelper('templateListViewHelper', function(items, options) {
  var out = "";
  var count = 0;
  var tempImgUrl = "styles/temp/template_icon_store.png";
  var initItemString = " checked";
  for (var key in items) {
    count++;
    if(count > 1) {
      initItemString = "";
    }
    out += "<li><input id='item-" + count + "' type='radio' name='radio' " + initItemString + ">"
    + "<label for='item-" + count + "' class='list-item'>"+ key + "</label>";
    out += "<div id='" + key.toString().replace(" ","") + "Body' class='list-item-body'><ul class='horizontal-list'>";
    var templatesCategories = items[key];
    templatesCategories.forEach(function(element, index, array){
      //console.log(element.name);
      out += "<li class='list-item'><a href='#templates/" + element._id + "'>" + 
      "<img src=" + tempImgUrl + " class='template-thumbnail'><span>"
      + element.name + "</span></a></li>";  
    });
    out += "</ul></div></li>";
  }
  return out;
});


Handlebars.registerHelper("debug", function(optionalValue) { 
  console.log("Current Context"); 
  console.log("===================="); 
  console.log(this);   
  if (optionalValue) {
    console.log("Value"); 
    console.log("===================="); 
    console.log(optionalValue); 
  } 
});

