// (function(window, Kinvey) {
//   // Export, so declarations can be accessed outside this files’ scope.
//   var App = window.MozAppsKinvey = {};

//   // Configure conflict policy prior to init, since that will trigger
//   // synchronization. Prioritize client over server.
//   Kinvey.Sync.configure({ conflict: Kinvey.Sync.clientAlwaysWins });

//   // Configure.
//   Kinvey.init({
//     appKey: 'kid_TP1JdLipB5',
//     appSecret: '5e6cab36e3a948c7b1a30585fa308c16',
//     sync: true// Enable offline saving.
//   });

//   /**
//    * Define application-domain entities and collections.
//    */
//   // Define the MozApp entity.
//   var MozApp = Kinvey.Entity.extend({
//     // Override constructor to preset the collection and store.
//     constructor: function(attributes) {
//       Kinvey.Entity.prototype.constructor.call(this, attributes, 'apps', {
//         //store: Kinvey.Store.OFFLINE// Enable offline saving.
//         store: 'offline'
//       });
//     },

//     // Shortcut to return attributes.
//     getName: function() {
//       return this.get('name');
//     },
//     getBaseTemplateName: function() {
//       return this.get('baseTemplateName');
//     },
//     getProperties: function() {
//       return this.get('properties');
//     },
//     isPublished: function() {
//       return this.get('published');
//     },
//     getVersion: function() {
//       return this.get('version');
//     }
//   });

//   var MozAppTemplate = Kinvey.Entity.extend({
//     // Override constructor to preset the collection and store.
//     constructor: function(attributes) {
//       Kinvey.Entity.prototype.constructor.call(this, attributes, 'templates', {
//         //store: Kinvey.Store.OFFLINE// Enable offline saving.
//         store: 'offline'
//       });
//     },

//     // Shortcut to return attributes.
//     getName: function() {
//       return this.get('name');
//     }
//   });

//   var MozAppCollection = Kinvey.Collection.extend({
//     entity: MozApp,
//     constructor: function(query) {
//       // Override constructor to preset the collection and store.
//       Kinvey.Collection.prototype.constructor.call(this, 'apps', {
//         query: query,
//         //store: Kinvey.Store.OFFLINE// Enable offline saving.
//         store: 'offline'
//       });
//     }
//   });

//   var MozAppTemplateCollection = Kinvey.Collection.extend({
//     entity: MozAppTemplate,
//     constructor: function(query) {
//       // Override constructor to preset the collection and store.
//       Kinvey.Collection.prototype.constructor.call(this, 'templates', {
//         query: query,
//         //store: Kinvey.Store.OFFLINE// Enable offline saving.
//         store:'offline'
//       });
//     }
//   });

//   // Export class declaration and collection instance.
//   App.MozApp = MozApp;
//   App.MozAppTemplate = MozAppTemplate;
//   App.MozAppCollection = new MozAppCollection();
//   App.MozAppTemplateCollection = new MozAppTemplateCollection();
// }(window, window.Kinvey));


// mozapps.Models.TemplateModel = Backbone.Model.extend({

// });

// mozapps.Models.AppModel = Backbone.Model.extend({

// });

//TODO wire up events to save new models added to collection back to IDB
mozapps.Collections.TemplateCollection = Backbone.Collection.extend({
  initialize: function(options) {
      // var self = this;
      
      // mozapps.templatesDB.getAll(function(data){
      //   self.reset(data);
      //   deferred.resolve();
      //   }, function(){
      // });
  }
});

//TODO use UUIDs for id?
//TODO wire up events to save new models added to collection back to IDB
//TODO handle multiple add to collection?
mozapps.Collections.AppCollection = Backbone.Collection.extend({
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