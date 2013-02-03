//TODO - BUG - delete DB then doesn't load first time
//TODO - BUG - UUID doesn't work on phone
//TODO figure out better Handlebars pre-render
//TODO - loading issues if you go straight to an interior page
//TODO - when you are in an accordian and click on a my app or template, make sure you come back to that accordian when you click BACK
//TODO - back from appbuilder to details or home?
//TODO - should accordians toggle close?
//TODO - accordian arrows should go right and down
//TODO - app Collection fixture data (pre-set products, etc)
//TODO - handle #apps/undefined
//TODO - app name change should put focus in input once the view is animated on

mozapps.Views.appSubView = Backbone.View.extend({
    template: Handlebars.compile($("#myAppsSubViewTemplate").html()),
    iscrollObjects: new Array(),
    initialize: function(){
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
            var newMozApp = new mozapps.Models.AppModel({
                id: UUID.genV4().toString(),
                name: tmpl.toJSON().name,
                published: false,
                version: "1.0",
                app_components: tmpl.toJSON().app_components,
                templateID: self.templateID
            });
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
    },
    events: {
        'click button#back' : "back",
        'click button#nameFormDone': "changeName"
    },
    back : function() {
        window.history.back();
    },
    changeName: function(event){
        var self = this;
        event.preventDefault();
        
        //get the form value
        //mozapps.appCollection.get(this.appID).set("name", $('#nameField').val());
        // need to go deeper to update completed field
        /* TODO: Make util function to do deeper and return JSON when done */
        /* Can also check if we are completed from before and do the quick model.set in that case */
        var nameJSON = mozapps.appCollection.get(this.appID).toJSON();

        nameJSON.name = $('#nameField').val();
        
        nameJSON.app_components.forEach(function(element, index, array){
            if(element.component_id == "name"){
                element.completed = true;
            }
        });

        self.model.set(nameJSON);

        // //TODO fix this so that the model change event does the save instead of having to explicitly do it here
        mozapps.appsDB.put(nameJSON, 
            function(){ console.log("saved name");},
            function(){}
        );

        mozapps.router.navigate("#apps/"+this.appID,true);
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

mozapps.Views.appBuilderAboutView = Backbone.View.extend({
    template: Handlebars.compile($("#appBuilderAboutTemplate").html()),
    viewName: "appBuilderAboutView",
    events: {
        'click button#back' : "back",
        'click button#aboutFormDone' : "saveAbout"
    },
    back : function() {
        window.history.back();
    },
    saveAbout: function(event){
        var self = this;
        event.preventDefault();

        var aboutJSON = mozapps.appCollection.get(this.appID).toJSON();

        aboutJSON.app_components.forEach(function(element, index, array){
            if(element.component_id == "about"){
                element.completed = true;
                element.properties.description = $('#aboutForm #description').val();
                element.properties.address = $('#aboutForm #address').val();
                element.properties.phone = $('#aboutForm #phone').val();
                element.properties.email = $('#aboutForm #email').val();
            }
        });

        self.model.set(aboutJSON);

        // //TODO fix this so that the model change event does the save instead of having to explicitly do it here
        mozapps.appsDB.put(aboutJSON, 
            function(){ console.log("saved about");},
            function(){}
        );

        mozapps.router.navigate("#apps/"+self.appID,true);
    },
    render: function(eventName) {
        if(mozapps.currentPage == this.viewName){
            if(!this.model){
                this.$el.html(this.template( { loading: true } ));
            } else {
                var about = _.find(this.model.toJSON().app_components, function(elem){
                    return elem.component_id == "about";
                });
                this.$el.html(this.template(about.properties));
            }
        }
        return this;
    }
});




