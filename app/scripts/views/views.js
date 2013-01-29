//TODO don't store kinveyData arrays in views, access arrays form window.MozAppKinvey, only store single record as model

mozapps.Views.templatesListView = Backbone.View.extend({
    //TODO pre-compile templates and make sure compile only happens during init
    template: Handlebars.compile($("#templateListViewTemplate").html()),
    MozTemplateCollection: [],
    mozAppsCollection: [],

    initialize: function() {       
        var self = this;
        //this.listenTo(this.collection, "reset", this.render);

        Object.observe(window.MozAppsKinvey.MozAppTemplateCollection, function(){
            self.MozTemplateCollection = _.pluck(window.MozAppsKinvey.MozAppTemplateCollection.list,'attr');
            self.render();
        });

        Object.observe(window.MozAppsKinvey.MozAppCollection, function(){
            self.MozAppsCollection = _.pluck(window.MozAppsKinvey.MozAppCollection.list,'attr');
            self.render();
        });
    },
    
    render: function(eventName) {
        if(mozapps.currentPage == this){
            if(!this.MozTemplateCollection || this.MozTemplateCollection.length == 0){
                this.$el.html(this.template( { loading: true } ));    
            } else {
                //note: if we switch back to using backbone models, need to call .toJSON() when passing to templates

                //hack use categories property in Template collection instead of having seperate category table and using their IDs
                var tmplByCategory = {
                    //"n": function() {
                    //     var self = this;
                    //     var n = "";
                    //     Object.keys(self).forEach(function(k, v) {
                    //         if (typeof self[k] == "object") {
                    //             if(!n) n = self[k]["name"];
                    //         }
                    //     });
                    //     return n;
                    // }
                };

                tmplByCategory.categories = [];
                _.each(this.MozTemplateCollection, function(element, index, list){
                    _.each(element.categories, function(elem, idx, l){
                        if(!tmplByCategory.categories[elem.toString()]){
                            tmplByCategory.categories[elem.toString()] = [];
                        }
                        tmplByCategory.categories[elem.toString()].push(this);
                    }, element);
                });

                this.$el.html(this.template( { mozTemplates: tmplByCategory, myApps: this.mozAppsCollection } ));
            }
        }
        return this;
    }
});

mozapps.Views.templateDetailView = Backbone.View.extend({
    template: Handlebars.compile($("#templateDetailViewTemplate").html()),
    templateID: "",
    kinveyDataArray: [],
    initialize: function() {
        var self = this;  
        //this.listenTo(this.collection, "reset", this.render);

        Object.observe(window.MozAppsKinvey.MozAppTemplateCollection, function(){
            self.kinveyDataArray = _.pluck(window.MozAppsKinvey.MozAppTemplateCollection.list,'attr');
            self.render();
        });

        // window.MozAppsKinvey.MozAppTemplateCollection.watch("list", function (id, oldval, newval) {
        //     console.log("watch - template detail view");
        //     console.log(window.MozAppsKinvey.MozAppTemplateCollection.list);
        //     this.collection = window.MozAppsKinvey.MozAppTemplateCollection.list;
        //     //this.render();
        //     return newval;
        // });
    },
    render: function(eventName) {
        var self = this;
        if(mozapps.currentPage == this){
            if(!this.kinveyDataArray || this.kinveyDataArray.length == 0){
                this.$el.html(this.template( { loading: true } ));    
            } else {
                this.kinveyDataArray.forEach(function(element, index, array){
                    //if(element.toJSON()._id == self.templateID){      //save this if we go back to BB collections
                    if(element._id == self.templateID){
                        /* //save this if we go back to BB collections
                        if((index-1) > -1) { element.set("prevTemplateId", array[index-1].toJSON()._id); }
                        if((index+1) <= array.length-1) { element.set("nextTemplateId",array[index+1].toJSON()._id); }
                        element.set("index", index+1);
                        element.set("count", array.length); */

                        if((index-1) > -1) { element.prevTemplateId = array[index-1]._id; }
                        if((index+1) <= array.length-1) { element.nextTemplateId = array[index+1]._id; }
                        element.index = index+1;
                        element.count = array.length;
                        self.model = element;
                    }
                });
                //this.$el.html(this.template(this.model.toJSON()));
                this.$el.html(this.template(this.model));
            }
        } else {
            //console.log("tried to render template detail view but not current page");
        }
        return this;
    }
});

mozapps.Views.appBuilderCreateView = Backbone.View.extend({
    //TODO check that we came previously from the template detail page, if not error
    templateID: "",
    kinveyDataArray: [],
    initialize: function() {       
        var self = this;
        Object.observe(window.MozAppsKinvey.MozAppTemplateCollection, function(){
            self.kinveyDataArray = _.pluck(window.MozAppsKinvey.MozAppTemplateCollection.list,'attr');
            self.processAppCreation();
        });
    },

    processAppCreation : function(){
        var self = this;        
        if(mozapps.currentPage == this){
            if(this.kinveyDataArray){
                var tmpl = _.find(_.pluck(window.MozAppsKinvey.MozAppTemplateCollection.list,'attr'), function(elem){
                    return elem._id == self.templateID;
                });
                if(tmpl){
                    var newMozApp = new Kinvey.Entity({
                        name:     '',
                        published: false,
                        version: "1.0",
                        app_components: tmpl.app_components,
                        templateID: self.templateID
                    }, 'apps');

                    newMozApp.save({
                        success: function(newMozApp) {
                            mozapps.router.navigate("#apps/" + newMozApp.attr._id);
                        },
                        error: function(e) {
                            // Failed to save myBirthdayParty.
                            // e holds information about the nature of the error.
                        }
                    });
                } else {
                    console.log("didn't find template in template collection");
                    //TODO throw up modal error dialog here
                }
            }
        }
    }
});

mozapps.Views.appBuilderView = Backbone.View.extend({
    //TODO pre-compile templates and make sure compile only happens during init
    template: Handlebars.compile($("#appBuilderViewTemplate").html()),
    appID: "",
    initialize: function() {       
        var self = this;
        Object.observe(window.MozAppsKinvey.MozAppCollection, function(){
            self.render();
        });
    },
    
    render: function(eventName) {
        var self = this;
        if(mozapps.currentPage == this){
            if(!this.appID){
                //TODO loading not working
                this.$el.html(this.template( { loading: true } ));    
            } else {
                console.log("app builder view - render");
                    //TODO check if Entity.load() works offline
                    var theApp = new Kinvey.Entity({}, 'apps');
                    theApp.load(this.appID, {
                        success: function(theApp) {
                            self.$el.html(self.template(theApp.attr));
                        },
                        error: function(e) {
                        }
                    });
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
