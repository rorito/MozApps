Deferred.installInto(Zepto);


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

  initAppDB: function(){
    var deferred = Deferred();

    mozapps.appsDB = new IDBStore({
      dbVersion: 1,
      storePrefix: 'mozapps-',
      storeName: 'apps',
      keyPath: 'id',
      autoIncrement: true,
      onStoreReady: function(){
        console.log('App IDB ObjectStore ready!');
        deferred.resolve();
      },
      onError: function(error){ alert("There was a problem opening the MozApps database. Please restart the app."); }
    });

    return deferred.promise();
  },

  initTemplateDB: function(){
    var deferred = Deferred();

    mozapps.templatesDB = new IDBStore({
      dbVersion: 1,
      storePrefix: 'mozapps-',
      storeName: 'templates',
      keyPath: 'id',
      autoIncrement: true,
      onStoreReady: function(){
        console.log('Templates IDB ObjectStore ready!');

        //check to see if we need to load fixture data
        mozapps.templatesDB.count(
          function(data){
            if(data < 1){
              _.each(mozapps.templateFixtureData, function(element, index, list){
                  mozapps.templatesDB.put(element, function(id){ }, function(error){  } );
              });
            }
          },
          function(error){
            console.log(error);
          }
        );

        deferred.resolve();
      },
      onError: function(error){ alert("There was a problem opening the MozApps database. Please restart the app."); } 
    });

    return deferred.promise();
  },
  init: function() {
  
    $.when(mozapps.initAppDB(), mozapps.initTemplateDB()).done(function(){

      mozapps.tmplModel = new mozapps.Models.TemplateModel();
      mozapps.appModel = new mozapps.Models.AppModel();
      
      mozapps.tmplCollection = new mozapps.Collections.TemplateCollection();
      mozapps.appCollection = new mozapps.Collections.AppCollection();

      mozapps.tmplListView = new mozapps.Views.templatesListView();
      mozapps.tmplDetailView = new mozapps.Views.templateDetailView({collection: mozapps.tmplCollection});
      mozapps.appBuilderView = new mozapps.Views.appBuilderView({collection: mozapps.appCollection});
      mozapps.router = new mozapps.Routers.ApplicationRouter(); 
      Backbone.history.start(); //{ pushState: true, root: mozapps.root }
    });
  }
};

$(document).ready(function(){

  // TEMP INSTALL


  /*
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
  }; */

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
      console.log(element);
      out += "<li class='list-item'><a href='#templates/" + element.id + "'>" + 
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

