/***************/
/* Models */
/***************/

mozapps.Models.TemplateModel = Backbone.Model.extend({
initialize: function(options){
        this.listenTo(this, "change", this.changeModel);
    },
    changeModel: function(data){
        console.log("********** template model - change model");
    }
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
  model: mozapps.Models.TemplateModel,
  initialize: function(options) {
      this.listenTo(this, "add", this.addedToCollection);
      this.listenTo(this, "remove", this.removedFromCollection);
      this.listenTo(this, "reset", this.checkReset);
  },
  addedToCollection: function(data){
    //mozapps.Utils.addToCollection(data,mozapps.appsDB);
    console.log("******* template collection add");
  },
  removedFromCollection: function(data){
    //mozapps.Utils.removeFromCollection(data,mozapps.appsDB);
    console.log("******* template collection remove");
  },
  checkReset: function(data){
    console.log("******* template collection reset");
  } 
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
    "id": UUID.genV4().toString(),//"124f391c-f74a-40af-bdbd-c10deef3dab3",
    "name": "Filmstrip",
    "isEnabled": false,
    "app_components": [
      {
        "component_name": "App Name",
        "component_id": "name",
        "completed": false,
        "description": "Name your application",
        "is_enabled": true
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
        },
        "is_enabled": true
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
                "themeImg": "imgs/themes/theme_01.png"
            },
            {
                "themeName": "Light",
                "themeID": "theme-02",
                "themeImg": "imgs/themes/theme_02.png"
            }
          ],
          "selectedTheme": "theme-01"
        },
        "is_enabled": true
      },
      {
        "component_name": "App Icon",
        "component_id": "icon",
        "completed": false,
        "description": "Set the icon for your app",
        "properties": {
          "iconFilenames": ["icon-01.png", "icon-02.png"],
          "selectedIcon": ""
        },
        "is_enabled": false
      }
    ],
    "description": "Swipe through multiple galleries of your images. Tap to enlarge to full detail with text.",
    "categories": [
      "Featured",
      "Photo & Video"
    ],
    "imgLargePath": "imgs/templates/filmstrip_lg.jpg",
    "imgSmallPath": "imgs/templates/filmstrip_sm.jpg"
  },
  {
    "id": UUID.genV4().toString(),//"0736dd0d-6f0d-4b6f-98bb-9307d61c2fc4",
    "name": "Large Store",
    "isEnabled": false,
    "app_components": [
      {
        "component_name": "App Name",
        "component_id": "name",
        "completed": false,
        "description": "Name your application",
        "is_enabled": true
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
        },
        "is_enabled": true
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
        },
        "is_enabled": true
      },
      {
        "component_name": "Product List",
        "component_id": "product-list",
        "completed": false,
        "description": "Add products to your store",
        "properties": {
          "productIDs": []
        },
        "is_enabled": true
      },
      {
        "component_name": "App Icon",
        "component_id": "icon",
        "completed": false,
        "description": "Set the icon for your app",
        "properties": {
          "iconFilenames": ["images/60x60.jpg", "images/60x60.jpg"],
          "selectedIcon": ""
        },
        "is_enabled": false
      }
    ],
    "description": "Large Store is an e-commerce app that features large images and many product categories.",
    "categories": [
      "Commerce"
    ],
    "imgLargePath": "imgs/templates/large_store_lg.jpg",
    "imgSmallPath": "imgs/templates/large_store_sm.jpg"
  },
  {
    "id": UUID.genV4().toString(),//"124f391c-f74a-40af-bdbd-c10deef3dab3",
    "name": "Small Store",
    "isEnabled": true,
    "app_components": [
      {
        "component_name": "App Name",
        "component_id": "name",
        "completed": false,
        "description": "Name your application",
        "is_enabled": true
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
        },
        "is_enabled": true
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
                "themeImg": "imgs/themes/theme_01.png"
            },
            {
                "themeName": "Light",
                "themeID": "theme-02",
                "themeImg": "imgs/themes/theme_02.png"
            }
          ],
          "selectedTheme": "theme-01"
        },
        "is_enabled": true
      },
      {
          "component_name": "Product List",
          "component_id": "product-list",
          "completed": false,
          "description": "Add products to your store",
          "properties": {
            "productIDs": []
          },
          "is_enabled": true
      },
      {
        "component_name": "App Icon",
        "component_id": "icon",
        "completed": false,
        "description": "Set the icon for your app",
        "properties": {
          "iconFilenames": ["icon-01.png", "icon-02.png"],
          "selectedIcon": ""
        },
        "is_enabled": false
      },
      {
        "component_name": "Product Display",
        "component_id": "product-display",
        "completed": false,
        "description": "Choose a display style",
        "properties": {},
        "is_enabled": false
      },
      {
        "component_name": "Menu Creation",
        "component_id": "menu-creation",
        "completed": false,
        "description": "Choose a menu style",
        "properties": {},
        "is_enabled": false
      },
      {
        "component_name": "Template",
        "component_id": "template-view-details",
        "completed": false,
        "description": "SMALL STORE",
        "properties": {},
        "is_enabled": false
      },
      {
        "component_name": "Shopping Cart",
        "component_id": "shopping-cart",
        "completed": false,
        "description": "Set up your store",
        "properties": {},
        "is_enabled": false
      },
      {
        "component_name": "Social Sharing",
        "component_id": "social-sharing",
        "completed": false,
        "description": "Add your favorite services",
        "properties": {},
        "is_enabled": false
      }
    ],
    "description": "Small Store features a customizable catalog of product photos and an e-commerce service.",
    "categories": [
      "Featured", 
      "Commerce"
    ],
    "imgLargePath": "imgs/templates/small_store_lg.jpg",
    "imgSmallPath": "imgs/templates/small_store_sm.jpg"
  },
  {
    "id": UUID.genV4().toString(),//"124f391c-f74a-40af-bdbd-c10deef3dab3",
    "name": "Front Page",
    "isEnabled": false,
    "app_components": [
      {
        "component_name": "App Name",
        "component_id": "name",
        "completed": false,
        "description": "Name your application",
        "is_enabled": true
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
        },
        "is_enabled": true
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
                "themeImg": "imgs/themes/theme_01.png"
            },
            {
                "themeName": "Light",
                "themeID": "theme-02",
                "themeImg": "imgs/themes/theme_02.png"
            }
          ],
          "selectedTheme": "theme-01"
        },
        "is_enabled": true
      },
      {
        "component_name": "App Icon",
        "component_id": "icon",
        "completed": false,
        "description": "Set the icon for your app",
        "properties": {
          "iconFilenames": ["icon-01.png", "icon-02.png"],
          "selectedIcon": ""
        },
        "is_enabled": false
      }
    ],
    "description": "Front Page is a great template to give equal weight to your iimages and words.",
    "categories": [
      "Magazine",
      "Blogging"
    ],
    "imgLargePath": "imgs/templates/front_page_lg.jpg",
    "imgSmallPath": "imgs/templates/front_page_sm.jpg"
  },
  {
    "id": UUID.genV4().toString(),//"124f391c-f74a-40af-bdbd-c10deef3dab3",
    "name": "Reader",
    "isEnabled": false,
    "app_components": [
      {
        "component_name": "App Name",
        "component_id": "name",
        "completed": false,
        "description": "Name your application",
        "is_enabled": true
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
        },
        "is_enabled": true
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
                "themeImg": "imgs/themes/theme_01.png"
            },
            {
                "themeName": "Light",
                "themeID": "theme-02",
                "themeImg": "imgs/themes/theme_02.png"
            }
          ],
          "selectedTheme": "theme-01"
        },
        "is_enabled": true
      },
      {
        "component_name": "App Icon",
        "component_id": "icon",
        "completed": false,
        "description": "Set the icon for your app",
        "properties": {
          "iconFilenames": ["icon-01.png", "icon-02.png"],
          "selectedIcon": ""
        },
        "is_enabled": false
      }
    ],
    "description": "Reader allows you to publish a list of articles to the front page of you app. Include video and audio as well.",
    "categories": [
      "Magazine",
      "Blogging"
    ],
    "imgLargePath": "imgs/templates/reader_lg.jpg",
    "imgSmallPath": "imgs/templates/reader_sm.jpg"
  },
  {
    "id": UUID.genV4().toString(),//"124f391c-f74a-40af-bdbd-c10deef3dab3",
    "name": "Triad",
    "isEnabled": false,
    "app_components": [
      {
        "component_name": "App Name",
        "component_id": "name",
        "completed": false,
        "description": "Name your application",
        "is_enabled": true
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
        },
        "is_enabled": true
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
                "themeImg": "imgs/themes/theme_01.png"
            },
            {
                "themeName": "Light",
                "themeID": "theme-02",
                "themeImg": "imgs/themes/theme_02.png"
            }
          ],
          "selectedTheme": "theme-01"
        },
        "is_enabled": true
      },
      {
        "component_name": "App Icon",
        "component_id": "icon",
        "completed": false,
        "description": "Set the icon for your app",
        "properties": {
          "iconFilenames": ["icon-01.png", "icon-02.png"],
          "selectedIcon": ""
        },
        "is_enabled": false
      }
    ],
    "description": "The Triad template presents three bold images as links to your top entries.",
    "categories": [
      "Featured",
      "Magazine",
      "Blogging",
      "Photo & Video"
    ],
    "imgLargePath": "imgs/templates/triad_lg.jpg",
    "imgSmallPath": "imgs/templates/triad_sm.jpg"
  },
  {
    "id": UUID.genV4().toString(),//"124f391c-f74a-40af-bdbd-c10deef3dab3",
    "name": "Squares",
    "isEnabled": false,
    "app_components": [
      {
        "component_name": "App Name",
        "component_id": "name",
        "completed": false,
        "description": "Name your application",
        "is_enabled": true
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
        },
        "is_enabled": true
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
                "themeImg": "imgs/themes/theme_01.png"
            },
            {
                "themeName": "Light",
                "themeID": "theme-02",
                "themeImg": "imgs/themes/theme_02.png"
            }
          ],
          "selectedTheme": "theme-01"
        },
        "is_enabled": true
      },
      {
        "component_name": "App Icon",
        "component_id": "icon",
        "completed": false,
        "description": "Set the icon for your app",
        "properties": {
          "iconFilenames": ["icon-01.png", "icon-02.png"],
          "selectedIcon": ""
        },
        "is_enabled": false
      }
    ],
    "description": "Feature your photos on the front page of your app. Perfect for portfolio use.",
    "categories": [
      "Featured",
      "Blogging",
      "Photo & Video"
    ],
    "imgLargePath": "imgs/templates/squares_lg.jpg",
    "imgSmallPath": "imgs/templates/squares_sm.jpg"
  },
  {
    "id": UUID.genV4().toString(),//"124f391c-f74a-40af-bdbd-c10deef3dab3",
    "name": "Lightbox",
    "isEnabled": false,
    "app_components": [
      {
        "component_name": "App Name",
        "component_id": "name",
        "completed": false,
        "description": "Name your application",
        "is_enabled": true
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
        },
        "is_enabled": true
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
                "themeImg": "imgs/themes/theme_01.png"
            },
            {
                "themeName": "Light",
                "themeID": "theme-02",
                "themeImg": "imgs/themes/theme_02.png"
            }
          ],
          "selectedTheme": "theme-01"
        },
        "is_enabled": true
      },
      {
        "component_name": "App Icon",
        "component_id": "icon",
        "completed": false,
        "description": "Set the icon for your app",
        "properties": {
          "iconFilenames": ["icon-01.png", "icon-02.png"],
          "selectedIcon": ""
        },
        "is_enabled": false
      }
    ],
    "description": "Show your pictures in an automatic slideshow, or jump to your favorites, with Lightbox.",
    "categories": [
      "Photo & Video"
    ],
    "imgLargePath": "imgs/templates/lightbox_lg.jpg",
    "imgSmallPath": "imgs/templates/lightbox_sm.jpg"
  },
  {
    "id": UUID.genV4().toString(),//"124f391c-f74a-40af-bdbd-c10deef3dab3",
    "name": "Hot Shot",
    "isEnabled": false,
    "app_components": [
      {
        "component_name": "App Name",
        "component_id": "name",
        "completed": false,
        "description": "Name your application",
        "is_enabled": true
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
        },
        "is_enabled": true
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
                "themeImg": "imgs/themes/theme_01.png"
            },
            {
                "themeName": "Light",
                "themeID": "theme-02",
                "themeImg": "imgs/themes/theme_02.png"
            }
          ],
          "selectedTheme": "theme-01"
        },
        "is_enabled": true
      },
      {
        "component_name": "App Icon",
        "component_id": "icon",
        "completed": false,
        "description": "Set the icon for your app",
        "properties": {
          "iconFilenames": ["icon-01.png", "icon-02.png"],
          "selectedIcon": ""
        },
        "is_enabled": false
      }
    ],
    "description": "Feature your best images in a big, bold display with Hot Shot. Play a slideshow or swipe to browse.",
    "categories": [
      "Featured",
      "Photo & Video"
    ],
    "imgLargePath": "imgs/templates/hot_shot_lg.jpg",
    "imgSmallPath": "imgs/templates/hot_shot_sm.jpg"
  }
];

mozapps.defaultAppData = [
    {
        "id": UUID.genV4().toString(),
        "name": "Mariella's Fine Crafts",
        "published": false,
        "version": "1.0",
        "templateID": mozapps.templateFixtureData[2].id,
        "app_components": [
          {
            "component_name": "App Name",
            "component_id": "name",
            "completed": true,
            "description": "Mariella's Fine Crafts",
            "is_enabled": true
          },
          {
            "component_name": "About Me",
            "component_id": "about",
            "completed": true,
            "description": "Introduce yourself",
            "properties": {
              "description": "My jewelry gravitates towards the native visceral tradition of creating objects of significance and power. It pokes fun at a culture of consumption and cannibalistic appetite and deeply desires to drag the genre of adornment far away from vain decoration. This collection is unisex, vintage, conceptual art for wear.",
              "address": "Mariella's Fine Crafts, 217 Rua Andrade Pinto, Niterói, Rio de Janeiro, Brazil",
              "phone": "(55)(21) 2529 1122",
              "email": "Mariellascrafts@gmail.com"
            },
            "is_enabled": true
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
            },
            "is_enabled": true
          },
          {
            "component_name": "Product List",
            "component_id": "product-list",
            "completed": true,
            "description": "Add products to your store",
            "properties": {
              "productIDs": []
            },
            "is_enabled": true
          },
          {
            "component_name": "App Icon",
            "component_id": "icon",
            "completed": false,
            "description": "Set the icon for your app",
            "properties": {
              "iconFilenames": ["images/60x60.jpg", "images/60x60.jpg"],
              "selectedIcon": ""
            },
            "is_enabled": false
          },
          {
            "component_name": "Product Display",
            "component_id": "product-display",
            "completed": false,
            "description": "Choose a display style",
            "properties": {},
            "is_enabled": false
          },
          {
            "component_name": "Menu Creation",
            "component_id": "menu-creation",
            "completed": false,
            "description": "Choose a menu style",
            "properties": {},
            "is_enabled": false
          },
          {
            "component_name": "Template",
            "component_id": "template-view-details",
            "completed": false,
            "description": "SMALL STORE",
            "properties": {},
            "is_enabled": false
          },
          {
            "component_name": "Shopping Cart",
            "component_id": "shopping-cart",
            "completed": false,
            "description": "Set up your store",
            "properties": {},
            "is_enabled": false
          },
          {
            "component_name": "Social Sharing",
            "component_id": "social-sharing",
            "completed": false,
            "description": "Add your favorite services",
            "properties": {},
            "is_enabled": false
          }
        ],
        "description": "description of small store template",
        "categories": [
          "Featured"
        ],
        "imgLargePath": "imgs/misc/published_app_lg.jpg",
        "imgSmallPath": "imgs/misc/published_app_sm.jpg"
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
        "price": "$200.00",
        "imgLargePath": "imgs/products/product_lg_0.jpg",
        "imgSmallPath": "imgs/products/product_sm_0.jpg",
        "imgStorageType": "package"
    },
    {
        "id": UUID.genV4().toString(),
        "appID": mozapps.defaultAppData[0].id,
        "name": "Charm Pendant",
        "description": "Brass and porcelain charms on a 20 inch brass chain.",
        "price": "$75.00",
        "imgLargePath": "imgs/products/product_lg_1.jpg",
        "imgSmallPath": "imgs/products/product_sm_1.jpg",
        "imgStorageType": "package"
    },
    {
        "id": UUID.genV4().toString(),
        "appID": mozapps.defaultAppData[0].id,
        "name": "Skull Pendant",
        "description": "Bone skull with chained glass beads on an 8 inch silver choker.",
        "price": "$69.00",
        "imgLargePath": "imgs/products/product_lg_2.jpg",
        "imgSmallPath": "imgs/products/product_sm_2.jpg",
        "imgStorageType": "package"
    },
    {
        "id": UUID.genV4().toString(),
        "appID": mozapps.defaultAppData[0].id,
        "name": "Scissor Pendant",
        "description": "4 inch copper pendant on a 20 inch copper chain.",
        "price": "$89.00",
        "imgLargePath": "imgs/products/product_lg_3.jpg",
        "imgSmallPath": "imgs/products/product_sm_3.jpg",
        "imgStorageType": "package"
    },
    {
        "id": UUID.genV4().toString(),
        "appID": mozapps.defaultAppData[0].id,
        "name": "Leather and Brass Pendant",
        "description": "4 inch leather pendant with brass details and fine chain.",
        "price": "$48.00",
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
