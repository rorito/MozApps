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
        mozapps.appsDB.put(data.toJSON(), 
            function(){
                console.log("model changed - DB save success");
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
    console.log("&&&& added to collection");

//TODO test that these batch puts work with arrays of data

    mozapps.appsDB.batch([ {type: "put", value: data.toJSON()} ], 
      function(){ console.log("batch add apps IDB - success"); }, 
      function(){ console.log("batch add apps IDB - fail"); }
    );
  },
  removedFromCollection: function(data){
    console.log("removed from collection");
    mozapps.appsDB.batch([ {type: "remove", value: data.toJSON()} ], 
      function(){ console.log("batch remove apps IDB - success"); }, 
      function(){ console.log("batch remove apps IDB - fail"); }
    );
  },
  checkReset: function(data){
    console.log("app collection reset");
  } 
});

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
          "theme-name": ""
        }
      },
      {
        "component_name": "App Icon",
        "component_id": "icon",
        "completed": false,
        "description": "Set the icon for your app",
        "properties": {
          "icon-filename": ""
        }
      },
      {
        "component_name": "Product List",
        "component_id": "product-list",
        "completed": false,
        "description": "Add products to your store",
        "properties": {
          "product-ids": []
        }
      },
      {
        "component_name": "E-Commerce",
        "component_id": "ecommerce",
        "completed": false,
        "description": "Add PayPal and other E-Commerce features",
        "properties": {
          "paypal_user": "",
          "paypal_key": "",
          "shopify_user": "",
          "shopify_key": ""
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
          "theme-name": ""
        }
      },
      {
        "component_name": "App Icon",
        "component_id": "icon",
        "completed": false,
        "description": "Set the icon for your app",
        "properties": {
          "icon-filename": ""
        }
      },
      {
        "component_name": "Product List",
        "component_id": "product-list",
        "completed": false,
        "description": "Introduce yourself",
        "properties": {
          "product-ids": []
        }
      },
      {
        "component_name": "E-Commerce",
        "component_id": "ecommerce",
        "completed": false,
        "description": "Introduce yourself",
        "properties": {
          "paypal_user": "",
          "paypal_key": "",
          "shopify_user": "",
          "shopify_key": ""
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