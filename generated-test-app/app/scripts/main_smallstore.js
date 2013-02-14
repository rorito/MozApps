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
                if(count > 0){
                    smallstore.appsDB.getAll(
                        function(data){
                            console.log(">>>>>>>>>>>>>>>>>>> appDB data");
                            smallstore.appCollection = new mozapps.Collections.AppCollection(data);
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

                    _.each(mozapps.defaultAppData, function(element, index, list){
                        //TODO don't add to collection as json, make models first
                         console.log("***** put app in db");
                        smallstore.appsDB.put(element, function(){}, function(){});
                    });

                    console.log("*create appCollection with fixture json");
                    smallstore.appCollection = new mozapps.Collections.AppCollection(mozapps.defaultAppData);

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
                if(count > 0){
                    smallstore.productsDB.getAll(
                        function(data){
                            console.log("product indexeddb data");
                            smallstore.productCollection = new mozapps.Collections.ProductCollection(data);
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
                    if (smallstore.appCollection.length > 0) {
                        _.each(mozapps.defaultProductData, function(element, index, list){
                            //TODO don't add to collection as json, make models first
                            smallstore.productsDB.put(element, function(){}, function(){});
                        });
                        console.log("product default data");
                        smallstore.productCollection = new mozapps.Collections.ProductCollection(mozapps.defaultProductData);
                    } else {
                        console.log("empty collection no data");
                        smallstore.productCollection = new mozapps.Collections.ProductCollection();    
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
  handleIncomingData: function(activity){
    console.log("handle activity callback");
    smallstore.reloadData = true;
  	var data = activity.source.data; 
  	
    console.log(dump(data));

    $("#appContainer").empty();

    smallstore.appsDB.clear();
    smallstore.productsDB.clear();

    //put the new data in the DB so initDB will pick it up and put it in backbone collections
    console.log("add the app to DB")
    smallstore.appsDB.put(data.appData, function(){}, function(){});

    console.log("add the products to the DB")
    _.each(data.productData, function(element, index, list){
        smallstore.productsDB.put(element, function(){}, function(){});
        console.log(element.imgSmallPath);
    });

    console.log("re-init the databases")
    smallstore.initDB();
  },
	init: function() {
    	if (window.navigator.mozSetMessageHandler) {
    		window.navigator.mozSetMessageHandler('activity',
		      function handleActivity(activity) {
		      	smallstore.handleIncomingData(activity);
		    });
  		}

        smallstore.initDB();
	},
    initDB: function(){
        $.when(smallstore.initAppDB(), smallstore.initProductDB())
        .done(function(){            
            console.log("done with DB loading in small store");


            //destroy the views, try w/ only reouter
            smallstore.homeView = new smallstore.Views.homeView({ model: smallstore.appCollection.at(0) });
            smallstore.homeView.appID = smallstore.homeView.model.toJSON().id;

            smallstore.productDetailView = new smallstore.Views.productDetailView({ model: smallstore.appCollection.at(0) });
            smallstore.productDetailView.appID = smallstore.productDetailView.model.toJSON().id;

            console.log("after views");
            smallstore.router = smallstore.router || new smallstore.Routers.ApplicationRouter();

            console.log("after router")
            // backbone history breaking in chrome
            if (!Backbone.History.started) {
                Backbone.history.start();
            }

            if(smallstore.reloadData) {
                console.log("reload page")
                smallstore.dataReload = false;
                document.location.reload(true);
            }
        }); 
    }
};
    

$(document).ready(function(){
	console.log("document ready smallstore");
	window.smallstore.init();
});

/**
 * Function : dump()
 * Arguments: The data - array,hash(associative array),object
 *    The level - OPTIONAL
 * Returns  : The textual representation of the array.
 * This function was inspired by the print_r function of PHP.
 * This will accept some data as the argument and return a
 * text that will be a more readable version of the
 * array/hash/object that is given.
 * Docs: http://www.openjs.com/scripts/others/dump_function_php_print_r.php
 */
function dump(arr,level) {
	var dumped_text = "";
	if(!level) level = 0;
	
	//The padding given at the beginning of the line.
	var level_padding = "";
	for(var j=0;j<level+1;j++) level_padding += "    ";
	
	if(typeof(arr) == 'object') { //Array/Hashes/Objects 
		for(var item in arr) {
			var value = arr[item];
			
			if(typeof(value) == 'object') { //If it is an array,
				dumped_text += level_padding + "'" + item + "' ...\n";
				dumped_text += dump(value,level+1);
			} else {
				dumped_text += level_padding + "'" + item + "' => \"" + value + "\"\n";
			}
		}
	} else { //Stings/Chars/Numbers etc.
		dumped_text = "===>"+arr+"<===("+typeof(arr)+")";
	}
	return dumped_text;
}