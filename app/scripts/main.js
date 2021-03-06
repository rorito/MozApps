Deferred.installInto(Zepto);


window.mozapps = window.mozapps || {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  Templates: {},
  Utils: {},
  currentPage: {},
  isMenuOpen: false,
  appEl: null,
  navEl:null,
  accordianScrollItems: [],
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
                            console.log(">>>>>>>>>>>>>>>>>>> appDB data");
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
                    console.log(">>>>>> add default product(s)");
                    //console.log(mozapps.defaultAppData)
                    mozapps.appCollection = new mozapps.Collections.AppCollection();

                    _.each(mozapps.defaultAppData, function(element, index, list){
                        //TODO don't add to collection as json, make models first
                        console.log("***** put app in db");
                        mozapps.appsDB.put(element, function(){}, function(){});

                        var newMozApp = new mozapps.Models.AppModel({
                            id: element.id,
                            name: element.name,
                            published: false,
                            version: "1.0",
                            app_components: element.app_components,
                            templateID: element.templateID,
                            //imgOrigPath: tmpl,toJSON().imgOrigPath,
                            imgLargePath: element.imgLargePath,
                            imgSmallPath: element.imgSmallPath
                        });
                        mozapps.appCollection.add(newMozApp);
                    });

                    //mozapps.appCollection = new mozapps.Collections.AppCollection(mozapps.defaultAppData);

                    console.log("*create appCollection with fixture json");
                    
                    

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
    console.log('initProductDB');
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
                            console.log("product indexeddb data");
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
                    // prepopulate with product data if we have an app already prepopulated
                    if (mozapps.appCollection.length > 0) {
                        console.log("product fixture");

                        mozapps.productCollection = new mozapps.Collections.ProductCollection();

                        _.each(mozapps.defaultProductData, function(element, index, list){
                            //TODO don't add to collection as json, make models first
                            mozapps.productsDB.put(element, function(){}, function(){});

                            var newProduct = new mozapps.Models.ProductModel({
                                id: element.id,
                                appID: element.appID,
                                name: element.name,
                                description: element.description,
                                price: element.price,
                                imgOrigPath: element.imgOrigPath,
                                imgSmallPath: element.imgSmallPath,
                                imgLargePath: element.imgLargePath,
                                imgStorageType: element.imgStorageType
                            });
                            mozapps.productCollection.add(newProduct);
                        });

                        //mozapps.productCollection = new mozapps.Collections.ProductCollection(mozapps.defaultProductData);
                    } else {
                        console.log("empty collection no data");
                        mozapps.productCollection = new mozapps.Collections.ProductCollection();    
                    }
                    
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
                    mozapps.templateCollection = new mozapps.Collections.TemplateCollection();
                    _.each(mozapps.templateFixtureData, function(element, index, list){
                        //TODO don't add to collection as json, make models first
                        mozapps.templatesDB.put(element, function(){}, function(){});

                            var newTemplate = new mozapps.Models.TemplateModel({
                                id: element.id,
                                name: element.name,
                                isEnabled: element.isEnabled,
                                description: element.description,
                                app_components: element.app_components,
                                categories: element.categories,
                                imgSmallPath: element.imgSmallPath,
                                imgLargePath: element.imgLargePath
                            });
                            mozapps.templateCollection.add(newTemplate);
                    });

                    //mozapps.templateCollection = new mozapps.Collections.TemplateCollection(mozapps.templateFixtureData);
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


            // backbone history breaking in chrome
            Backbone.history.start(); //{ pushState: true, root: mozapps.root }

            // menu init
            appEl = document.querySelector("#appContainer");
            navEl = document.querySelector("#leftNav");
            isMenuOpen = false;
            $('#resetAppLink').click(function(event){
                event.preventDefault();
                console.log('reset the app here');
                // clear the products
                mozapps.productsDB.clear(
                    function() {
                        console.log('cler okay');
                        mozapps.appsDB.clear(
                            function() {
                                console.log('clear app ok');

                                // have to call index.html, because pacakged app on the
                                // phone cannot route to default location from "/"
                                window.location.href = "/index.html";
                                
                            },
                            function() {
                                alert("There was a reset error, please close the app by holding the home button.");
                            }
                        );
                    },
                    function() {
                        alert("There was a reset error, please close the app by holding the home button.");
                    }
                );
                
                /*
                productsClear.onsuccess = function(event) {
                    // clear the apps
                    var appClear = mozapps.appsDB.clear();
                    appClear.onsuccess = function() {
                        $.when(mozapps.initAppDB(), mozapps.initProductDB())
                        .done(function(){
                            //window.indexedDB.deleteDatabase("mozapps-a");
                            console.log('app reset????');
                            window.location.href = "/";
                        });    
                    };
                    appClear.onerror = function() {
                        alert("There was a reset error, please close the app by holding the home button.");
                    };
                }
                productsClear.onerror = function(event) {
                    alert("There was a reset error, please close the app by holding the home button.");
                };
                */

                
            });
            
            // disable touch horizontal scroll in side menu
            window.mozapps.disableMenuHorizontalScroll();
            

        });
    },
    toggleSideMenu:function() {
        if (isMenuOpen) {
            $(appEl).removeClass('app-slide-right');
            //TODO: replace with callback
            setTimeout(function() {
                $(leftNav).addClass('nav-hidden');
                if (accordianScrollItems.length > 0) {
                    accordianScrollItems.addClass("show-scroll");
                }
            }, 250);
        } else {
            $(appEl).addClass('app-slide-right');    
            $(leftNav).removeClass('nav-hidden');
            accordianScrollItems = $(".show-scroll");
            accordianScrollItems.removeClass("show-scroll");
        }
        isMenuOpen = !isMenuOpen;
    },
    disableMenuHorizontalScroll:function() {
        console.log('disable h scroll');
        var container = document.querySelector("#leftNav");
        //alert(container);
        // capture the swipe gesture
        new GestureDetector(container).startDetecting();
        // disable scroll by adding empty handler
        container.addEventListener('swipe', function(event) { return ;});
    },
    getIsMenuOpen:function() {
        return isMenuOpen;
    }

    // ,
    // initDBJS: function(){
    //     db.open({
    //         server: 'mozapps',
    //         version: 1,
    //         schema: {
    //             templates: {
    //                 key: { keyPath: 'id' , autoIncrement: true }
    //             },
    //             apps: {
    //                 key: { keyPath: 'id' , autoIncrement: true }
    //             },
    //             products: {
    //                 key: { keyPath: 'id' , autoIncrement: true }
    //             }
    //         }
    //     })
    //     .then(function(s){
    //         mozapps.db = s;
    //         mozapps.db.templates.query()
    //             .filter()
    //             .execute()
    //             .done(function (results){
    //                 if(results.length < 1){
    //                     _.each(mozapps.templateFixtureData, function(element, index, list){
    //                         mozapps.db.templates.add(element);
    //                     });
    //                     mozapps.templateCollection = new mozapps.Collections.TemplateCollection(mozapps.templateFixtureData);
    //                 } else {
    //                     mozapps.templateCollection = new mozapps.Collections.TemplateCollection(results);
    //                 }
    //             });
    //     })
    //     .done(function (s){
            
    //     });    
    // }
};

$(document).ready(function(){
   window.mozapps.init();
});