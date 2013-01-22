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
        store: Kinvey.Store.OFFLINE// Enable offline saving.
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
        store: Kinvey.Store.OFFLINE// Enable offline saving.
      });
    },

    // Shortcut to return attributes.
    getName: function() {
      return this.get('name');
    },
    getProperties: function() {
      return this.get('properties');
    }
  });

  // Define the Book collection.
  var MozAppCollection = Kinvey.Collection.extend({
    entity: MozApp,
    constructor: function(query) {
      // Override constructor to preset the collection and store.
      Kinvey.Collection.prototype.constructor.call(this, 'apps', {
        query: query,
        store: Kinvey.Store.OFFLINE// Enable offline saving.
      });
    }
  });

  var MozAppTemplateCollection = Kinvey.Collection.extend({
    entity: MozAppTemplate,
    constructor: function(query) {
      // Override constructor to preset the collection and store.
      Kinvey.Collection.prototype.constructor.call(this, 'templates', {
        query: query,
        store: Kinvey.Store.OFFLINE// Enable offline saving.
      });
    }
  });

  // Export class declaration and collection instance.
  App.MozApp = MozApp;
  App.MozAppTemplate = MozAppTemplate;
  App.MozAppCollection = new MozAppCollection();
  App.MozAppTemplateCollection = new MozAppTemplateCollection();
}(window, window.Kinvey));

// mozapps.Models.ApplicationModel = Backbone.Model.extend({

// });
