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

        //TODO revisit this
        //note: we're only doing an IDB count because the first time you load a page and it creates an IDB
        // database, data is returned as Array[0] instead of []. I may revert to just a getAll call later
        // and then check for Array[0] or []
        mozapps.appsDB.count(
            function(count){
                if(count > 0){
                    mozapps.appsDB.getAll(
                        function(data){
                            mozapps.appCollection = new mozapps.Collections.AppCollection(data);
                            deferred.resolve();
                        }, 
                        function(){
                            console.log("*** ERROR loading appsDB getAll");
                            //TODO throw error?
                            deferred.resolve();
                        } 
                    );
                } else {
                    mozapps.appCollection = new mozapps.Collections.AppCollection();
                    deferred.resolve();
                }
            },
            function(data){
                console.log("ERROR getting appsDB count");
                //TODO throw error?
                deferred.resolve();
            }
        );
      },
        onError: function(error){ 
            alert("There was a problem opening the MozApps database. Please restart the app."); 
            deferred.resolve();
        }
    });

    return deferred.promise();
  },

  initProductDB: function(){
    var deferred = Deferred();

    mozapps.productsDB = new IDBStore({
      dbVersion: 1,
      storePrefix: 'mozapps-',
      storeName: 'products',
      keyPath: 'id',
      autoIncrement: true,
      onStoreReady: function(){
        console.log('Products IDB ObjectStore ready!');

        //TODO revisit this
        //note: we're only doing an IDB count because the first time you load a page and it creates an IDB
        // database, data is returned as Array[0] instead of []. I may revert to just a getAll call later
        // and then check for Array[0] or []
        mozapps.productsDB.count(
            function(count){
                if(count > 0){
                    mozapps.productsDB.getAll(
                        function(data){
                            mozapps.productCollection = new mozapps.Collections.ProductCollection(data);
                            deferred.resolve();
                        }, 
                        function(){
                            console.log("*** ERROR loading appsDB getAll");
                            //TODO throw error?
                            deferred.resolve();
                        } 
                    );
                } else {
                    mozapps.productCollection = new mozapps.Collections.ProductCollection();
                    deferred.resolve();
                }
            },
            function(data){
                console.log("ERROR getting productsDB count");
                //TODO throw error?
                deferred.resolve();
            }
        );
      },
        onError: function(error){ 
            alert("There was a problem opening the MozApps database. Please restart the app."); 
            deferred.resolve();
        }
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

        mozapps.templatesDB.getAll(
            function(data){
                if(data.length < 1){
                    console.log("loading fixture data");
                    _.each(mozapps.templateFixtureData, function(element, index, list){
                        mozapps.templatesDB.put(element, function(){}, function(){});
                    });

                    mozapps.templateCollection = new mozapps.Collections.TemplateCollection(mozapps.templateFixtureData);
                    deferred.resolve();
                } else {
                    mozapps.templateCollection = new mozapps.Collections.TemplateCollection(data);
                    deferred.resolve();
                }

            }, 
            function(){
                console.log("*** ERROR loading templatesDB getAll");
                //TODO throw error?
                deferred.resolve();
            } 
        );
      },
        onError: function(error){ 
            alert("There was a problem opening the MozApps database. Please restart the app."); 
            deferred.resolve();
        } 
    });

    return deferred.promise();
  },
    init: function() {
        $.when(mozapps.initAppDB(), mozapps.initTemplateDB(), mozapps.initProductDB())
        .done(function(){

            mozapps.tmplListView = new mozapps.Views.templatesListView();
            mozapps.tmplDetailView = new mozapps.Views.templateDetailView({collection: mozapps.templateCollection});
            mozapps.appBuilderView = new mozapps.Views.appBuilderView({collection: mozapps.appCollection});

            mozapps.router = new mozapps.Routers.ApplicationRouter(); 
            Backbone.history.start(); //{ pushState: true, root: mozapps.root }
        });
    },
    initDBJS: function(){
        db.open({
            server: 'mozapps',
            version: 1,
            schema: {
                templates: {
                    key: { keyPath: 'id' , autoIncrement: true }
                },
                apps: {
                    key: { keyPath: 'id' , autoIncrement: true }
                },
                products: {
                    key: { keyPath: 'id' , autoIncrement: true }
                }
            }
        })
        .then(function(s){
            mozapps.db = s;
            mozapps.db.templates.query()
                .filter()
                .execute()
                .done(function (results){
                    if(results.length < 1){
                        _.each(mozapps.templateFixtureData, function(element, index, list){
                            mozapps.db.templates.add(element);
                        });
                        mozapps.templateCollection = new mozapps.Collections.TemplateCollection(mozapps.templateFixtureData);
                    } else {
                        mozapps.templateCollection = new mozapps.Collections.TemplateCollection(results);
                    }
                });
        })
        .done(function (s){
            
        });    
    }
};

$(document).ready(function(){

    // TEMP INSTALL
    // var request = navigator.mozApps.getSelf();
    // request.onsuccess = function() {
    //   if (request.result) {
    //     // we're installed
    //   } else {
    //     navigator.mozApps.install("http://10.118.118.171:3501/manifest.webapp");
    //   }
    // };
    // request.onerror = function() {
    //   alert('Error checking installation status: ' + this.error.message);
    // };

   window.mozapps.init();

});





// Object.observe(mozapps.templateCollection, function(){
//     console.log("templateCollection - observe call back");
// });
