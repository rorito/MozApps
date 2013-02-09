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
      "Commerce Templates",
      "Magazine Templates",
      "Blogging Templates",
      "Photo & Video Templates"
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
      "Commerce Templates",
      "Magazine Templates",
      "Blogging Templates",
      "Photo & Video Templates"
    ]
  }
];

mozapps.defaultAppData = [
    {
        "id": UUID.genV4().toString(),
        "name": "Maria's Fine Crafts",
        "published": false,
        "version": "1.0",
        "templateID": mozapps.templateFixtureData[0].id,
        "app_components": [
          {
            "component_name": "App Name",
            "component_id": "name",
            "completed": true,
            "description": "Maria's Fine Crafts"
          },
          {
            "component_name": "About Me",
            "component_id": "about",
            "completed": true,
            "description": "Introduce yourself",
            "properties": {
              "description": "Maria's Fine Crafts gravitates towards the native visceral tradition of creating objects of significance and power.  It pokes fun at a culture of consumption and cannibalistic appetite and deeply desires to drag the genre of adornment far away from vain decoration.  Maria's Fine Crafts is unisex, vintage, conceptual art for wear.",
              "address": "204 20th St, San Francisco, CA 94107",
              "phone": "415-304-2842",
              "email": "info@mariascrafts.com"
            }
          },
          {
            "component_name": "Theme",
            "component_id": "theme",
            "completed": true,
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
            "completed": true,
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
    }
];

// default product data
// imageStorage type can be 
//      "package"       - image is stored with the pacakged app (use relative URL)
//      "deviceStorage" - image is stored in Device Storage (use Device Storage API to get image)
mozapps.defaultProductData = [
    {
        "id": UUID.genV4().toString(),
        "appID": mozapps.defaultAppData[0].id,
        "name": "Woven Bone and Brass Body Art",
        "description": "14 inch woven brass links and bone beads with leather fringe.",
        "price": "200.00",
        "imgLargePath": "imgs/products/product_lg_0.jpg",
        "imgSmallPath": "imgs/products/product_sm_0.jpg",
        "imgStorageType": "package"
    },
    {
        "id": UUID.genV4().toString(),
        "appID": mozapps.defaultAppData[0].id,
        "name": "Charm Pendant",
        "description": "Brass and porcelain charms on a 20 inch brass chain.",
        "price": "75.00",
        "imgLargePath": "imgs/products/product_lg_1.jpg",
        "imgSmallPath": "imgs/products/product_sm_1.jpg",
        "imgStorageType": "package"
    },
    {
        "id": UUID.genV4().toString(),
        "appID": mozapps.defaultAppData[0].id,
        "name": "Skull Pendant",
        "description": "Bone skull with chained glass beads on an 8 inch silver choker.",
        "price": "69.00",
        "imgLargePath": "imgs/products/product_lg_2.jpg",
        "imgSmallPath": "imgs/products/product_sm_2.jpg",
        "imgStorageType": "package"
    },
    {
        "id": UUID.genV4().toString(),
        "appID": mozapps.defaultAppData[0].id,
        "name": "Scissor Pendant",
        "description": "4 inch copper pendant on a 20 inch copper chain.",
        "price": "89.00",
        "imgLargePath": "imgs/products/product_lg_3.jpg",
        "imgSmallPath": "imgs/products/product_sm_3.jpg",
        "imgStorageType": "package"
    },
    {
        "id": UUID.genV4().toString(),
        "appID": mozapps.defaultAppData[0].id,
        "name": "Leather and Brass Pendant",
        "description": "4 inch leather pendant with brass details and fine chain.",
        "price": "48.00",
        "imgLargePath": "imgs/products/product_lg_4.jpg",
        "imgSmallPath": "imgs/products/product_sm_4.jpg",
        "imgStorageType": "package"
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
