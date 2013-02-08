/***************/
/* Models */
/***************/

mozapps.Models.TemplateModel = Backbone.Model.extend({

});

mozapps.Models.AppModel = Backbone.Model.extend({
    initialize: function(options){
        this.listenTo(this, "change", this.changeModel);
    },
    changeModel: function(data){
        console.log("app model - change model");
        mozapps.appsDB.put(data.toJSON(), 
            function(){
                console.log("app model changed - DB save success");
            }, 
            function(){}
        );
    }
});

mozapps.Models.ProductModel = Backbone.Model.extend({
    initialize: function(options){
        this.listenTo(this, "change", this.changeModel);
    },
    changeModel: function(data){
        console.log("product model - change model");
        mozapps.productsDB.put(data.toJSON(), 
            function(){
                console.log("product model changed - DB save success");
            }, 
            function(){}
        );
    }
});

/***************/
/* Collections */
/***************/

//TODO wire up events to save new models added to collection back to IDB
mozapps.Collections.TemplateCollection = Backbone.Collection.extend({
  model: mozapps.Models.TemplateModel
});

//TODO use UUIDs for id?
//TODO wire up events to save new models added to collection back to IDB
//TODO handle multiple add to collection?
mozapps.Collections.AppCollection = Backbone.Collection.extend({
  model: mozapps.Models.AppModel,
  initialize: function(options) {
      this.listenTo(this, "add", this.addedToCollection);
      this.listenTo(this, "remove", this.removedFromCollection);
      this.listenTo(this, "reset", this.checkReset);
  },
  addedToCollection: function(data){
    mozapps.Utils.addToCollection(data,mozapps.appsDB);
  },
  removedFromCollection: function(data){
    mozapps.Utils.removeFromCollection(data,mozapps.appsDB);
  },
  checkReset: function(data){
    console.log("app collection reset");
  } 
});

mozapps.Collections.ProductCollection = Backbone.Collection.extend({
  model: mozapps.Models.ProductModel,
  initialize: function(options) {
      this.listenTo(this, "add", this.addedToCollection);
      this.listenTo(this, "remove", this.removedFromCollection);
      this.listenTo(this, "reset", this.checkReset);
  },
  addedToCollection: function(data){
    mozapps.Utils.addToCollection(data,mozapps.productsDB);
  },
  removedFromCollection: function(data){
    mozapps.Utils.removeFromCollection(data,mozapps.productsDB);
  },
  checkReset: function(data){
    console.log("products collection reset");
  } 
});

window.mozapps.Utils = window.mozapps.Utils || {}
window.mozapps.Utils.addToCollection = function(data,db) {
    if (data instanceof Array) {
            console.log("adding array of products to " + db.dbName);
            data.forEach(function(element, index, array){
                db.put(element.toJSON());
            });
    } else {
        console.log("adding single product to "+ db.dbName);
        db.put(data.toJSON());
    }
}

window.mozapps.Utils.removeFromCollection = function(data,db) {
    if (data instanceof Array) {
        console.log("removing array of products from DB");
        data.forEach(function(element, index, array){
            db.remove(element.toJSON().id);
        });
    } else {
        console.log("removing single product from DB");
        db.remove(data.toJSON().id);
    }
}

mozapps.templateFixtureData = [
  {
    "id": "0736dd0d-6f0d-4b6f-98bb-9307d61c2fc4",
    "name": "Small Store",
    "app_components": [
      {
        "component_name": "App Name",
        "component_id": "name",
        "completed": false,
        "description": "Name your application"
      },
      {
        "component_name": "About Me",
        "component_id": "about",
        "completed": false,
        "description": "Introduce yourself",
        "properties": {
          "description": "",
          "address": "",
          "phone": "",
          "email": ""
        }
      },
      {
        "component_name": "Theme",
        "component_id": "theme",
        "completed": false,
        "description": "Change Themes",
        "properties": {
          "themes": [
            {
                "themeName": "Espresso",
                "themeID": "theme-01",
                "themeImg": "imgs/themes/theme_01.png"
            },
            {
                "themeName": "Cream",
                "themeID": "theme-02",
                "themeImg": "imgs/themes/theme_02.png"
            }
          ],
          "selectedTheme": "theme-01"
        }
      },
      {
        "component_name": "App Icon",
        "component_id": "icon",
        "completed": false,
        "description": "Set the icon for your app",
        "properties": {
          "iconFilenames": ["images/60x60.jpg", "images/60x60.jpg"],
          "selectedIcon": ""
        }
      },
      {
        "component_name": "Product List",
        "component_id": "product-list",
        "completed": false,
        "description": "Add products to your store",
        "properties": {
          "productIDs": []
        }
      }
    ],
    "description": "description of small store template",
    "categories": [
      "Featured Templates",
      "User Submitted Templates",
      "Popular Templates"
    ]
  },
  {
    "id": "124f391c-f74a-40af-bdbd-c10deef3dab3",
    "name": "Portfolio",
    "app_components": [
      {
        "component_name": "App Name",
        "component_id": "name",
        "completed": false,
        "description": "Name your application"
      },
      {
        "component_name": "About Me",
        "component_id": "about",
        "completed": false,
        "description": "Introduce yourself",
        "properties": {
          "description": "",
          "address": "",
          "phone": "",
          "email": ""
        }
      },
      {
        "component_name": "Theme",
        "component_id": "theme",
        "completed": false,
        "description": "Change Themes",
        "properties": {
          "themes": [
            {
                "themeName": "Dark",
                "themeID": "theme-01",
                "themeImg": "images/130x200.jpg"
            },
            {
                "themeName": "Light",
                "themeID": "theme-02",
                "themeImg": "images/130x200.jpg"
            }
          ],
          "selectedTheme": "theme-01"
        }
      },
      {
        "component_name": "App Icon",
        "component_id": "icon",
        "completed": false,
        "description": "Set the icon for your app",
        "properties": {
          "iconFilenames": ["icon-01.png", "icon-02.png"],
          "selectedIcon": ""
        }
      }
    ],
    "description": "description of portfolio template",
    "categories": [
      "Featured Templates",
      "User Submitted Templates",
      "Popular Templates"
    ]
  }
];

mozapps.defaultAppData = [
    {
        "id": UUID.genV4().toString(),
        "name": "Maria's Fine Crafts",
        "published": false,
        "version": "1.0",
        "app_components": mozapps.templateFixtureData[0].app_components,
        "templateID": mozapps.templateFixtureData[0].id
    }
];



      // {
      //   "component_name": "E-Commerce",
      //   "component_id": "ecommerce",
      //   "completed": false,
      //   "description": "Add PayPal and other E-Commerce features",
      //   "properties": {
      //     "paypal_user": "",
      //     "paypal_key": "",
      //     "shopify_user": "",
      //     "shopify_key": ""
      //   }
      // }



/*
{
    "themeName": "Ocean",
    "themeID": "theme-03",
    "themeImg": "imgs/themes/theme_03.png"
} 
*/     
