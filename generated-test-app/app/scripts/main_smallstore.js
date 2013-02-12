Deferred.installInto(Zepto);

window.mozapps = window.mozapps || {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  Templates: {},
  Utils: {},
  currentPage: {}
}

window.smallstore = window.smallstore || {
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
  initAppDB: function(){
    var deferred = Deferred();

    mozapps.appsDB = new IDBStore({
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
        mozapps.appsDB.count(
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
                    console.log(mozapps.defaultAppData)

                    _.each(mozapps.defaultAppData, function(element, index, list){
                        //TODO don't add to collection as json, make models first
                         console.log("***** put app in db");
                        mozapps.appsDB.put(element, function(){}, function(){});
                    });

                    console.log("*create appCollection with fixture json");
                    mozapps.appCollection = new mozapps.Collections.AppCollection(mozapps.defaultAppData);
                    

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
                        _.each(mozapps.defaultProductData, function(element, index, list){
                            //TODO don't add to collection as json, make models first
                            mozapps.productsDB.put(element, function(){}, function(){});
                        });
                        console.log("product default data");
                        mozapps.productCollection = new mozapps.Collections.ProductCollection(mozapps.defaultProductData);
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
	init: function() {
    	if (window.navigator.mozSetMessageHandler) { 
			console.log("moz set message");
		    window.navigator.mozSetMessageHandler('activity', 
		    	function handleActivity(activity) { 
		      		console.log("handle activity callback");
					var data = activity.source.data; 
					console.log(dump(data));
		    	}
		  	); 
  		}	
	}
};
    

$(document).ready(function(){
	window.smallstore.init();
});