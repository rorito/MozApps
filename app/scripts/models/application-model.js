(function(window, Kinvey) {
  // Export, so declarations can be accessed outside this files’ scope.
  var App = window.MozAppsKinvey = {};

  // Configure conflict policy prior to init, since that will trigger
  // synchronization. Prioritize client over server.
  Kinvey.Sync.configure({ conflict: Kinvey.Sync.clientAlwaysWins });

  // Configure.
  Kinvey.init({
    appKey: 'kid_TP1JdLipB5',
    appSecret: '5e6cab36e3a948c7b1a30585fa308c16',
    sync: true// Enable offline saving.
  });

  /**
   * Define application-domain entities and collections.
   */
  // Define the MozApp entity.
  var MozApp = Kinvey.Entity.extend({
    // Override constructor to preset the collection and store.
    constructor: function(attributes) {
      Kinvey.Entity.prototype.constructor.call(this, attributes, 'apps', {
        //store: Kinvey.Store.OFFLINE// Enable offline saving.
        store: 'offline'
      });
    },

    // Shortcut to return attributes.
    getName: function() {
      return this.get('name');
    },
    getBaseTemplateName: function() {
      return this.get('baseTemplateName');
    },
    getProperties: function() {
      return this.get('properties');
    },
    isPublished: function() {
      return this.get('published');
    },
    getVersion: function() {
      return this.get('version');
    }
  });

  var MozAppTemplate = Kinvey.Entity.extend({
    // Override constructor to preset the collection and store.
    constructor: function(attributes) {
      Kinvey.Entity.prototype.constructor.call(this, attributes, 'templates', {
        //store: Kinvey.Store.OFFLINE// Enable offline saving.
        store: 'offline'
      });
    },

    // Shortcut to return attributes.
    getName: function() {
      return this.get('name');
    }
  });

  var MozAppCollection = Kinvey.Collection.extend({
    entity: MozApp,
    constructor: function(query) {
      // Override constructor to preset the collection and store.
      Kinvey.Collection.prototype.constructor.call(this, 'apps', {
        query: query,
        //store: Kinvey.Store.OFFLINE// Enable offline saving.
        store: 'offline'
      });
    }
  });

  var MozAppTemplateCollection = Kinvey.Collection.extend({
    entity: MozAppTemplate,
    constructor: function(query) {
      // Override constructor to preset the collection and store.
      Kinvey.Collection.prototype.constructor.call(this, 'templates', {
        query: query,
        //store: Kinvey.Store.OFFLINE// Enable offline saving.
        store:'offline'
      });
    }
  });

  // Export class declaration and collection instance.
  App.MozApp = MozApp;
  App.MozAppTemplate = MozAppTemplate;
  App.MozAppCollection = new MozAppCollection();
  App.MozAppTemplateCollection = new MozAppTemplateCollection();
}(window, window.Kinvey));


mozapps.Models.TemplateModel = Backbone.Model.extend({

});

mozapps.Models.AppModel = Backbone.Model.extend({

});

//TODO wire up events to save new models added to collection back to IDB
mozapps.Collections.TemplateCollection = Backbone.Collection.extend({
  resetCollectionData: function(){
    var self = this;
      mozapps.templatesDB.getAll(function(data){
        self.reset(data);
        }, function(){
      });
  },
  initialize: function() {
      var self = this;
      this.listenTo(this, "change", this.resetCollectionData);
      this.resetCollectionData();
  } 
});

//TODO use UUIDs for id?
//TODO wire up events to save new models added to collection back to IDB
mozapps.Collections.AppCollection = Backbone.Collection.extend({
  initialize: function() {
      var self = this;
      mozapps.appsDB.getAll(function(data){
        self.reset(data);
        }, function(){
      });
  }
});

mozapps.templateFixtureData = [
  {
    "_id": "50f53665e3fe9c210501223c",
    "_acl": {
      "creator": "kid_TP1JdLipB5"
    },
    "_kmd": {
      "lmt": "2013-01-15T10:58:45.974Z"
    },
    "name": "Small Store",
    "app_components": [
      {
        "component_name": "About",
        "properties": {
          "description": "",
          "address": "",
          "phone": "",
          "email": ""
        }
      },
      {
        "component_name": "Product List",
        "properties": {
          "product-ids": []
        }
      },
      {
        "component_name": "E-Commerce",
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
    "_id": "50f53657e3fe9c210501223b",
    "_acl": {
      "creator": "kid_TP1JdLipB5"
    },
    "_kmd": {
      "lmt": "2013-01-15T10:58:31.835Z"
    },
    "name": "Portfolio",
    "app_components": [
      {
        "component_name": "About",
        "properties": {
          "description": "",
          "address": "",
          "phone": "",
          "email": ""
        }
      },
      {
        "component_name": "Product List",
        "properties": {
          "product-ids": []
        }
      },
      {
        "component_name": "E-Commerce",
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