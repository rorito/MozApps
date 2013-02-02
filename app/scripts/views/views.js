//TODO - BUG - delete DB then doesn't load first time
//TODO - BUG - UUID doesn't work on phone
//TODO figure out better Handlebars pre-render
//TODO - loading issues if you go straight to an interior page
//TODO - when you are in an accordian and click on a my app or template, make sure you come back to that accordian when you click BACK
//TODO - back from appbuilder to details or home?
//TODO - should accordians toggle close?
//TODO - accordian arrows should go right and down
//TODO - app Collection fixture data (pre-set products, etc)


mozapps.Views.appSubView = Backbone.View.extend({
    template: Handlebars.compile($("#myAppsSubViewTemplate").html()),
    iscrollObjects: new Array(),
    initialize: function(){
        var self = this;

        this.listenTo(this.collection, "reset", this.render);
        this.listenTo(this.collection, "add", this.render);
        this.listenTo(this.collection, "remove", this.render);

        // SK - this may be a hack?, problem with back button render
        this.render();
    },
    render: function(){
        if(mozapps.currentPage == "templatesListView"){
            //TODO fix the double render
            //console.log("app subview - outer render");
            if(!this.collection){
                console.log("app sub - loading");
                this.$el.html(this.template( { loading: true } ));    
            } else {
                console.log("RENDER: templatesListView SubView: myAppsSubViewTemplate");
                this.$el.html(this.template( { myApps: this.collection.toJSON() } ));
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
        this.listenTo(this.collection, "reset", this.render);
        this.listenTo(this.collection, "add", this.render);
        this.listenTo(this.collection, "remove", this.render);

        // TODO SK - this may be a hack?, problem with back button render
        this.render();
    },
    render: function(){
        if(mozapps.currentPage == "templatesListView"){
            //console.log("template subview - outer render");
            if(this.collection.length < 1){
                //console.log("template sub - loading");
                this.$el.html(this.template( { loading: true } ));
            } else {
                //console.log("RENDER: templatesListView SubView: templatesSubViewTemplate");
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

                // set viewport (UL) width, SK TODO : refactor 
                _.each(this.$el.find('.list-item-body'), function(element){
                    var elementObject = $(element).find('ul');
                    //TODO BUG in setting the width of the accordian, selector not working
                    //try width = auto?
                    //height of accordian rows hard coded in css
                    elementObject.css('width', (500 + (elementObject.find('li').length * $(elementObject.find('li')[0]).width())) + "px");
                    
                }, this);

                return this;
            }
        }
    }
});

//TODO - BUG - if you click back button to home screen, only one template shows in Featured
mozapps.Views.templatesListView = Backbone.View.extend({
    //TODO pre-compile templates and make sure compile only happens during init
    viewName: "templatesListView",
    template: Handlebars.compile($("#screenViewTemplate").html()),
    initialize: function() {
    },
    render: function(eventName) {
        console.log("template list view");
        if(mozapps.currentPage == "templatesListView"){
            this.$el.html(this.template);
            this.myAppsSubView = new mozapps.Views.appSubView({el: this.$el.find('#appList'), collection: mozapps.appCollection});
            this.myTemplatesSubView = new mozapps.Views.templateSubView({el: this.$el.find('#templatelist'), collection: mozapps.templateCollection});
        }
        return this;
    }
});


mozapps.Views.templateDetailView = Backbone.View.extend({
    viewName: "templateDetailView",
    template: Handlebars.compile($("#templateDetailViewTemplate").html()),
    templateID: "",
    collection: mozapps.templateCollection,
    initialize: function() {
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
        var tmpl = this.collection.get(this.templateID);

        if(tmpl){
            var newMozApp = {
                id: UUID.genV4().toString(),
                name: tmpl.toJSON().name,
                published: false,
                version: "1.0",
                app_components: tmpl.toJSON().app_components,
                templateID: self.templateID
            };
            mozapps.appCollection.add(newMozApp);
            console.log("app collection after add");
            mozapps.router.navigate("#apps/"+newMozApp.id,true); 
        } else {
            console.log("didn't find template in template collection");
            //TODO throw up modal error dialog here
        }
    },
    render: function(eventName) {
        var self = this;
        if(mozapps.currentPage == "templateDetailView" && mozapps.templateCollection.length > 0){
                mozapps.templateCollection.toJSON().forEach(function(element, index, array){
                    if(element.id == self.templateID){
                        if((index-1) > -1) { element.prevTemplateId = array[index-1].id; }
                        if((index+1) <= array.length-1) { element.nextTemplateId = array[index+1].id; }
                        element.index = index+1;
                        element.count = array.length;
                        self.model = element;
                    }
                });
                //NOTE: don't need toJSON() here because we call it above when we iterate over the template
                this.$el.html(this.template(this.model)); 
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
    collection: [],
    collection: mozapps.appCollection,
    initialize: function(options) {
        // console.log(mozapps.appCollection);
        // console.log(this.collection);
        this.listenTo(this.collection, "reset", this.render);
    },
    //TODO we should really loop through the JSON struct to wire up events, but we'll hard code for now
    events: {
        'click button#back' : "back",
        'click button#name' : "name",
        'click button#about' : "about",
        'click button#theme' : "theme",
        'click button#icon' : "icon",
        'click button#product-list' : "productlist",
        'click button#ecommerce' : "ecommerce",
    },
    back : function() {
        window.history.back();
    },
    name: function(){
        mozapps.router.navigate("#apps/"+this.appID+"/name",true);
    },
    about: function(){
        mozapps.router.navigate("#apps/"+this.appID+"/about",true);
    },
    theme: function(){
        mozapps.router.navigate("#apps/"+this.appID+"/theme",true);
    },
    icon: function(){
        mozapps.router.navigate("#apps/"+this.appID+"/icon",true);
    },
    productlist: function(){
        mozapps.router.navigate("#apps/"+this.appID+"/product-list",true);
    },
    ecommerce: function(){
        mozapps.router.navigate("#apps/"+this.appID+"/ecommerce",true);
    },
    render: function(eventName) {
        if(mozapps.currentPage == "appBuilderView" && this.collection){
            this.model = this.collection.get(this.appID);
            if(!this.model){
                this.$el.html(this.template( { loading: true } ));
            } else {
                this.$el.html(this.template(this.model.toJSON()));
            }
        }
        return this;
    }
});

mozapps.Views.appBuilderNameView = Backbone.View.extend({
    template: Handlebars.compile($("#appBuilderNameViewTemplate").html()),
    viewName: "appBuilderNameView",
    initialize: function(options) {
        this.listenTo(this.model, "change", this.saveName);
    },
    events: {
        'click button#back' : "back",
        'submit form#nameForm' : "changeName"  //TODO use preventDefault for buttons
    },
    back : function() {
        window.history.back();
    },
    saveName: function(data){
        console.log("save name");
    },
    changeName: function(event){
        event.preventDefault();
        var self = this;
        
        //get the form value
        mozapps.appCollection.get(this.appID).set("name", $('#nameField').val());
        mozapps.router.navigate("#apps/"+self.appID,true);
    },
    render: function(eventName) {
        if(mozapps.currentPage == this.viewName){
            if(!this.model){
                this.$el.html(this.template( { loading: true } ));
            } else {
                this.$el.html(this.template(this.model.toJSON()));
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
