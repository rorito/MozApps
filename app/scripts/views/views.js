//TODO don't store kinveyData arrays in views, access arrays form window.MozAppKinvey, only store single record as model
//TODO figure out better Handlebars pre-render

mozapps.Views.appSubView = Backbone.View.extend({
    template: Handlebars.compile($("#myAppsSubViewTemplate").html()),
    iscrollObjects: new Array(),
    initialize: function(){
        var self = this;
        Object.observe(window.MozAppsKinvey.MozAppCollection, function(){
            self.collection = _.pluck(window.MozAppsKinvey.MozAppCollection.list,'attr');
            self.render();
        });

        // SK - this may be a hack?, problem with back button render
        this.render();
    },
    render: function(){
        if(mozapps.currentPage == "templatesListView"){
            if(!this.collection){
                this.$el.html(this.template( { loading: true } ));    
            } else {
                console.log("RENDER: templatesListView SubView: myAppsSubViewTemplate");
                this.$el.html(this.template( { myApps: this.collection } ));
            }
            this.delegateEvents();

            // set viewport (UL) width
            _.each(this.$el.find('.list-item-body'), function(element){
                
            }, this);

            return this;
        }
    }
});

mozapps.Views.templateSubView = Backbone.View.extend({
    template: Handlebars.compile($("#templatesSubViewTemplate").html()),
    iscrollObjects: new Array(),
    initialize: function(){
        console.log("XXX INIT");
        this.listenTo(this.collection, "reset", this.render);
        // SK - this may be a hack?, problem with back button render
        this.render();
    },
    render: function(){
        if(mozapps.currentPage == "templatesListView"){
            if(this.collection.length < 1){
                this.$el.html(this.template( { loading: true } ));
            } else {
                console.log("RENDER: templatesListView SubView: templatesSubViewTemplate");
                var tmplByCategory = {};
                //hack - use categories property in Template collection instead of having seperate category table and using their IDs
                tmplByCategory.categories = [];
                _.each(this.collection.toJSON(), function(element, index, list){
                    _.each(element.categories, function(elem, idx, l){
                        if(!tmplByCategory.categories[elem.toString()]){
                            tmplByCategory.categories[elem.toString()] = [];
                        }
                        tmplByCategory.categories[elem.toString()].push(this);
                    }, element);
                });
                this.$el.html(this.template( { mozTemplates: tmplByCategory } ));
                this.delegateEvents();

                // set viewport (UL) width
                _.each(this.$el.find('.list-item-body'), function(element){
                    var elementObject = $(element).find('ul');
                    elementObject.css('width', (200 + (elementObject.find('li').length * $(elementObject.find('li')[0]).width())) + "px");
                    
                }, this);

                return this;
            }
        }
    }
});


mozapps.Views.templatesListView = Backbone.View.extend({
    //TODO pre-compile templates and make sure compile only happens during init
    viewName: "templatesListView",
    template: Handlebars.compile($("#screenViewTemplate").html()),
    initialize: function() {
    },
    render: function(eventName) {
        console.log("Current Page: " + mozapps.currentPage);
        if(mozapps.currentPage == "templatesListView"){
            console.log("RENDER: templatesListView");
            this.$el.html(this.template);
            this.myAppsSubView = new mozapps.Views.appSubView({el: this.$el.find('#appList')});
            this.myTemplatesSubView = new mozapps.Views.templateSubView({el: this.$el.find('#templatelist'),collection: mozapps.tmplCollection});
        }
        return this;
    }
});


mozapps.Views.templateDetailView = Backbone.View.extend({
    viewName: "templateDetailView",
    template: Handlebars.compile($("#templateDetailViewTemplate").html()),
    templateID: "",
    initialize: function() {
        var self = this;  
        this.listenTo(this.collection, "reset", this.render);
    },
    events: {
        'click #useButton' : 'createApp',
        'click .previous' : 'move',
        'click .next' : 'move',
        'click button#back' : "back"
    },
    move: function(event) {
        var button = $(event.currentTarget);
        window.location = "#templates/" + button.data('id');
    },
    back : function() {
        window.history.back();
    },
    createApp: function(){
        var self = this;        

        //TODO do we really need this check if the template ID being passed in via URL is valid?
        // may be safe but also unnecessary
        var tmpl = _.find(mozapps.tmplCollection.toJSON(), function(elem){
            return elem._id = self.templateID;
        });
        if(tmpl){
            mozapps.newMozApp = new window.MozAppsKinvey.MozApp({
                name:     '',
                published: false,
                version: "1.0",
                app_components: tmpl.app_components,
                templateID: self.templateID
            }, 'apps');

            mozapps.newMozApp.save({
                success: function(newMozApp) {
                    console.log("createapp - success");
                    //mozapps.fetchAppCollection();
                    //mozapps.appCollection.add(newMozApp.attr);
                    
                },
                error: function(e) {
                    console.log("ERROR: createApp");
                },
                complete: function(){
                    console.log(mozapps.newMozApp.attr)
                    //mozapps.router.navigate("#apps/" + mozapps.newMozApp.attr._id, true);
                }
            });
        } else {
            console.log("didn't find template in template collection");
            //TODO throw up modal error dialog here
        }
    },
    render: function(eventName) {
        console.log("RENDER: templateDetailView");
        var self = this;
        if(mozapps.currentPage == "templateDetailView"){
            if(!mozapps.tmplCollection || mozapps.tmplCollection.length < 1){
                this.$el.html(this.template( { loading: true } ));    
            } else {
                mozapps.tmplCollection.toJSON().forEach(function(element, index, array){
                    if(element._id == self.templateID){
                        if((index-1) > -1) { element.prevTemplateId = array[index-1]._id; }
                        if((index+1) <= array.length-1) { element.nextTemplateId = array[index+1]._id; }
                        element.index = index+1;
                        element.count = array.length;
                        self.model = element;
                    }
                });
                this.$el.html(this.template(this.model));
            }
        }
        return this;
    }
});

mozapps.Views.appBuilderView = Backbone.View.extend({
    //TODO pre-compile templates and make sure compile only happens during init
    //TODO better handling if app_id isn't found
    template: Handlebars.compile($("#appBuilderViewTemplate").html()),
    viewName: "appBuilderView",
    appID: "",
    initialize: function() {       
        var self = this;
        Object.observe(window.MozAppsKinvey.MozAppCollection, function(){
            console.log("appbuilder view callback");
            self.appData = _.find(_.pluck(window.MozAppsKinvey.MozAppCollection.list,'attr'), function(elem){
                return elem._id == self.appID;
            });
            console.log(self.appData);
            self.render();
        });
    },
    events: {
        'click button#back' : "back"
    },
    back : function() {
        window.history.back();
    },
    render: function(eventName) {
        if(mozapps.currentPage == "appBuilderView"){
            if(!this.appData){
                this.$el.html(this.template( { loading: true } ));
            } else {
                console.log("app builder - this.appData");
                this.$el.html(this.template(this.appData));
            }
        }
        return this;
    }
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