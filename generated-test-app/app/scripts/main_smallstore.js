Deferred.installInto(Zepto);

window.mozapps = window.mozapps || {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  Templates: {},
  Utils: {},
  currentPage: {}
};

window.smallstore = window.smallstore || {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  Templates: {},
  Utils: {},
  currentPage: {},
  reloadData: false,
  appsDBComplete: false,
  productsDBComplete: false,

  initAppDB: function(){
    var deferred = Deferred();

    smallstore.appsDB = new IDBStore({
      dbVersion: 1,
      storePrefix: 'smallstore-',
      storeName: 'apps',
      keyPath: 'id',
      autoIncrement: true,
      onStoreReady: function(){
        console.log('App IDB ObjectStore ready!');

        //TODO revisit this
        //note: we're only doing an IDB count because the first time you load a page and it creates an IDB
        // database, data is returned as Array[0] instead of []. I may revert to just a getAll call later
        // and then check for Array[0] or []
        smallstore.appsDB.count(
            function(count){
                if(smallstore.incomingData && smallstore.incomingData.appData){
                    console.log("loading app from incoming data");
                    //TODO don't add to collection as json, make models first
                    smallstore.appsDB.put(smallstore.incomingData.appData, 
                        function(data){
                            console.log("appDB put from incoming data - success")
                            console.log(data)

                            smallstore.appCollection = new mozapps.Collections.AppCollection(smallstore.incomingData.appData);
                            console.log("resolving app db") 
                            smallstore.appsDBComplete = true;
                            deferred.resolve();
                        }, 
                        function(data){
                            console.log("appDB put from incoming data - fail")
                            console.log(data)
                        }
                    );


                    
                } else {
                    if(count > 0){
                        smallstore.appsDB.getAll(
                            function(data){
                                console.log(">>>>>>>>>>>>>>>>>>> appDB data");
                                smallstore.appCollection = new mozapps.Collections.AppCollection(data);
                                smallstore.appsDBComplete = true;
                                deferred.resolve();
                            }, 
                            function(){
                                console.log("*** ERROR loading appsDB getAll");
                                //TODO throw error?
                            } 
                        );
                    } else {

                            console.log(">>>>>> add default apps(s)");

                            _.each(mozapps.defaultAppData, function(element, index, list){
                                //TODO don't add to collection as json, make models first
                                 //console.log("***** put app in db");
                                smallstore.appsDB.put(element, function(){}, function(){});
                            });

                            console.log("*create appCollection with fixture json");
                            smallstore.appCollection = new mozapps.Collections.AppCollection(mozapps.defaultAppData);

                            console.log("resolving app db")
                            smallstore.appsDBComplete = true;
                            deferred.resolve();

                    }

                    
                    
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
    smallstore.productsDB = new IDBStore({
      dbVersion: 1,
      storePrefix: 'smallstore-',
      storeName: 'products',
      keyPath: 'id',
      autoIncrement: true,
      onStoreReady: function(){
        console.log('Products IDB ObjectStore ready!');

        //TODO revisit this
        //note: we're only doing an IDB count because the first time you load a page and it creates an IDB
        // database, data is returned as Array[0] instead of []. I may revert to just a getAll call later
        // and then check for Array[0] or []
        smallstore.productsDB.count(
            function(count){

                console.log(">>>>>>>>>> in smallstore.productsDB.count");

                if(smallstore.incomingData && smallstore.incomingData.productData && smallstore.incomingData.productData.length > 0){
                    var totalProducts = smallstore.incomingData.productData.length;
                    var productCounter = 0;
                    console.log("loading products from incoming data");

                    //console.log(dumpObj(smallstore.incomingData.productData))

                    _.each(smallstore.incomingData.productData, function(element, index, list){
                        //TODO don't add to collection as json, make models first
                        console.log("adding product: " + element.name)
                        smallstore.productsDB.put(element, 
                            function(){
                                productCounter++;
                                if (productCounter >= totalProducts) {
                                    console.log("may be resolving too soon here * * * * resolving products")
                                    smallstore.productsDBComplete = true;
                                    deferred.resolve();
                                }
                            }, 
                            function(){
                                console.log("*** ERROR adding products from incoming");
                            }
                        );
                    });
                    console.log(">>> try to create product collection");
                    smallstore.productCollection = new mozapps.Collections.ProductCollection(smallstore.incomingData.productData);
                } else {
                    if(count > 0){
                        smallstore.productsDB.getAll(
                            function(data){
                                smallstore.productCollection = new mozapps.Collections.ProductCollection(data);
                                smallstore.productsDBComplete = true;
                                deferred.resolve();
                            }, 
                            function(){
                                console.log("*** ERROR loading products getAll");
                                //TODO throw error?
                            } 
                        );
                    } else {
                        if(mozapps.defaultProductData){
                            _.each(mozapps.defaultProductData, function(element, index, list){
                                //TODO don't add to collection as json, make models first
                                smallstore.productsDB.put(element, function(){}, function(){});
                            });
                            console.log("product default data");
                            smallstore.productCollection = new mozapps.Collections.ProductCollection(mozapps.defaultProductData); 
                        } else {
                            smallstore.productCollection = new mozapps.Collections.ProductCollection(); 

                            console.log("resolving products")
                            console.log(smallstore.productCollection);
                            smallstore.productsDBComplete = true;
                            deferred.resolve();
                        }
                    }


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
  handleIncomingData: function(activity){
    console.log("handle activity callback");
    smallstore.reloadData = true;
  	smallstore.incomingData = activity.source.data;

    console.log("db state")
    console.log(smallstore.appsDBComplete)
    console.log(smallstore.productsDBComplete)

    if(smallstore.appsDBComplete && smallstore.productsDBComplete){
        console.log("%%%%%%% DBs exist")
        
        //console.log(dumpObj(smallstore.incomingData));

        $("#appContainer").empty();

        smallstore.appsDB.clear();
        smallstore.productsDB.clear();

        smallstore.loadIncomingData();
    } 
  },
  loadIncomingData: function(){
        console.log("&&&&&&&&&&&&&&&&&&& load incoming app")
        smallstore.appsDB.put(smallstore.incomingData.appData, function(){}, function(){});

        console.log("&&&&&&&&&&&&&&&&&&&& load incoming products")
        _.each(smallstore.incomingData.productData, function(element, index, list){
            smallstore.productsDB.put(element, function(){}, function(){});
        });

        smallstore.incomingData = null;
        window.location.href = "/index.html";
  },
	init: function() {
      console.log("init")
    	if (window.navigator.mozSetMessageHandler) {
    		window.navigator.mozSetMessageHandler('activity',
		      function handleActivity(activity) {
		      	smallstore.handleIncomingData(activity);
		    });
  		}
	},
    initDB: function(){
        $.when(smallstore.initAppDB(), smallstore.initProductDB())
        .done(function(){            
            console.log("############### done with DB loading in small store");


            //destroy the views, try w/ only reouter
            smallstore.homeView = new smallstore.Views.homeView({ model: smallstore.appCollection.at(0) });
            smallstore.homeView.appID = smallstore.homeView.model.toJSON().id;

            smallstore.productDetailView = new smallstore.Views.productDetailView({ model: smallstore.appCollection.at(0) });
            smallstore.productDetailView.appID = smallstore.productDetailView.model.toJSON().id;

            smallstore.router = smallstore.router || new smallstore.Routers.ApplicationRouter();

            // backbone history breaking in chrome
            if (!Backbone.History.started) {
                Backbone.history.start();
            }
        }); 
    }
};
    

$(document).ready(function(){
	console.log("document ready smallstore");
	window.smallstore.init();
  window.smallstore.initDB();
});



var MAX_DUMP_DEPTH = 10;
      
function dumpObj(obj, name, indent, depth) {
      if (depth > MAX_DUMP_DEPTH) {
             return indent + name + ": <Maximum Depth Reached>\n";
      }
      if (typeof obj == "object") {
             var child = null;
             var output = indent + name + "\n";
             indent += "\t";
             for (var item in obj)
             {
                   try {
                          child = obj[item];
                   } catch (e) {
                          child = "<Unable to Evaluate>";
                   }
                   if (typeof child == "object") {
                          output += dumpObj(child, item, indent, depth + 1);
                   } else {
                          output += indent + item + ": " + child + "\n";
                   }
             }
             return output;
      } else {
             return obj;
      }
}
