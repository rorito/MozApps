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
//TODO - override fetch in model to do db lookup and then bind render to fetch completion?
//TODO - create new product, don't allow save on empty fields

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
        mozapps.router.navigate("#",true);
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
        'click button#appBuilderPublish': "publish",
        'click button#appBuilderPreview': "preview"
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
    publish: function(){
        var a = new Activity({ name: "view", data: { foo: "hi" }});
        a.onerror = function() { alert("Couldn't launch Activity"); };
        //mozapps.router.navigate("#apps/"+this.appID+"/publish",true);
    },
    preview: function(){
        mozapps.router.navigate("#apps/"+this.appID+"/preview",true);
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

mozapps.Views.appBuilderTheme = Backbone.View.extend({
    template: Handlebars.compile($("#appBuilderThemeTemplate").html()),
    viewName: "appBuilderTheme",
    events: {
        'click button#back' : "back",
        'click button#themeFormDone' : "saveTheme"
    },
    back : function() {
        window.history.back();
    },
    saveTheme: function(event){
        event.preventDefault();

        var themeJSON = mozapps.appCollection.get(this.appID).toJSON();

        themeJSON.app_components.forEach(function(element, index, array){
            if(element.component_id == "theme"){
                console.log(element);
                console.log("radio value: " + $('input[name=themeRadioGroup]:checked').val());
                element.completed = true;
                element.properties.selectedTheme = $('input[name=themeRadioGroup]:checked').val();
            }
        });

        console.log(this.model);
        console.log(themeJSON);

        this.model.set(themeJSON);
        // //TODO fix this so that the model change event does the save instead of having to explicitly do it here
        mozapps.appsDB.put(themeJSON, 
            function(){ console.log("saved theme");},
            function(){}
        );

        mozapps.router.navigate("#apps/"+this.appID,true);
    },
    render: function(eventName) {
        if(mozapps.currentPage == this.viewName){
            if(!this.model){
                this.$el.html(this.template( { loading: true } ));
            } else {
                var theme = _.find(this.model.toJSON().app_components, function(elem){
                    return elem.component_id == "theme";
                });
                this.$el.html(this.template(theme.properties));
            }
        }
        return this;
    }
});

mozapps.Views.appBuilderPublishDestinationView = Backbone.View.extend({
    template: Handlebars.compile($("#appBuilderPublishDestinationTemplate").html()),
    viewName: "appBuilderPublishDestinationView",
    events: {
        'click button#back' : "back",
        'click button#publishMarketplace': "publishToMaketplace"
    },
    back : function() {
        window.history.back();
    },
    publishToMaketplace: function(event) {
        event.preventDefault();
        mozapps.router.navigate("#apps/"+this.appID+"/publish/marketplace",true);
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


mozapps.Views.productList = Backbone.View.extend({
    template: Handlebars.compile($("#productListViewTemplate").html()),
    viewName: "productList",
    events: {
        'click button#back' : "back",
        'click button#addProduct' : "addProduct"
    },
    back : function() {
        mozapps.router.navigate("#apps/"+this.appID,true);
    },
    addProduct: function(event){
        mozapps.router.navigate("#apps/"+this.appID+"/product-list/add",true);
    },
    render: function(eventName) {
        if(mozapps.currentPage == this.viewName){
            if(!this.model){
                this.$el.html(this.template( { loading: true } ));
            } else {
                var product = _.find(this.model.toJSON().app_components, function(elem){
                    return elem.component_id == "product-list";
                });

                var productList = [];
                mozapps.productCollection.where({appID: this.appID}).forEach(function(element,index,array){
                    productList.push(element.toJSON());
                });

                this.$el.html(this.template({ 
                    products: productList,
                    appID: this.appID
                }));
            }
        }
        return this;
    }
});

mozapps.Views.productListDetailEdit = Backbone.View.extend({
    template: Handlebars.compile($("#productDetailEditTemplate").html()),
    viewName: "productListDetailEdit",
    events: {
        'click button#back' : "back",
        'click button#productDetailEditDone' : "saveProduct",
        'click button#deleteProductDetail' : "deleteProduct"
    },
    back : function() {
        window.history.back();
    },
    deleteProduct: function(event){
        mozapps.productCollection.remove(this.model);
        mozapps.router.navigate("#apps/"+this.appID+"/product-list",true);
    },
    saveProduct: function(event){
        var self = this;
        event.preventDefault();

        if(this.productID == "add"){
            //new product
            console.log("create new product")
            var newProduct = new mozapps.Models.ProductModel({
                id: UUID.genV4().toString(),
                appID: this.appID,
                name: $('#name').val(),
                description: $('#description').val(),
                price: $('#price').val()
            });
            mozapps.productCollection.add(newProduct);
        } else {
            //update existing product
            console.log("updating existing product");
            this.model.set({
                name: $('#name').val(),
                description: $('#description').val(),
                price: $('#price').val()
            });
        }


        mozapps.router.navigate("#apps/"+this.appID+"/product-list",true);
    },
    render: function(eventName) {
        if(mozapps.currentPage == this.viewName){
            if(!this.model || this.model == "add"){
                this.$el.html(this.template({add: true}));
            } else {
                console.log(this.model.toJSON());
                this.$el.html(this.template(this.model.toJSON()));
            }
        }
        return this;
    }
});

mozapps.Views.preview = Backbone.View.extend({
    template: Handlebars.compile($("#appViewTemplate").html()),
    viewName: "preview",
    events: {
        'click button#back' : "back",
        'click a.link-product-temp' : "showProductDetail"
    },
    back : function() {
        window.history.back();
    },
    showProductDetail: function(event) {
        event.preventDefault();
        console.log(event.currentTarget);
        var targetLink = event.currentTarget;
        var productID = targetLink.getAttribute("productID");

        mozapps.router.navigate("#apps/"+this.appID+"/preview/product/"+productID+"/",true);
    },
    render: function(eventName) {
        if(mozapps.currentPage == this.viewName){
            var productList = [];
            mozapps.productCollection.where({appID: this.appID}).forEach(function(element,index,array){
                productList.push(element.toJSON());
            });

            var aboutJSON = _.find(mozapps.appCollection.get(this.appID).toJSON().app_components, function(elem){
                return elem.component_id == "about";
            });

            var themeJSON = _.find(mozapps.appCollection.get(this.appID).toJSON().app_components, function(elem){
                return elem.component_id == "theme";
            });

            this.$el.html(this.template({model: this.model.toJSON(), products: productList, about: aboutJSON, theme: themeJSON.properties.selectedTheme }));
        }
        return this;
    }
});

mozapps.Views.previewProductDetailView = Backbone.View.extend({
    template: Handlebars.compile($("#appViewProductDetailTemplate").html()),
    viewName: "previewProductDetail",
    events: {
        'click button#back' : "back",
        'click a.link-product-temp' : "showProductDetail"
    },
    back : function() {
        window.history.back();
    },
    showProductDetail: function(event) {
        event.preventDefault();
        console.log(event.currentTarget);
        var targetLink = event.currentTarget;
        var productID = targetLink.getAttribute("productID");

        mozapps.router.navigate("#apps/"+this.appID+"/preview/product/"+productID+"/",true);
    },
    render: function(eventName) {
        if(mozapps.currentPage == this.viewName){
            var productJSON = mozapps.productCollection.get({id: this.productID});

            var themeJSON = _.find(mozapps.appCollection.get(this.appID).toJSON().app_components, function(elem){
                return elem.component_id == "theme";
            });
            

            this.$el.html(this.template({ model: this.model.toJSON(), product: productJSON, theme: themeJSON.properties.selectedTheme }));
        }
        return this;
    }
});

mozapps.Views.appBuilderPublishMarketplaceView = Backbone.View.extend({
    template: Handlebars.compile($("#appBuilderPublishMarketplaceTemplate").html()),
    viewName: "appBuilderPublishMarketplaceView",
    events: {
        'click button#back' : "back",
        'click button#publishLogIn': "publishLogInSubmit"
    },
    back : function() {
        window.history.back();
    },
    publishLogInSubmit: function(event) {
        event.preventDefault();
        console.log('route');
        mozapps.router.navigate("#apps/"+this.appID+"/publish/marketplace/submit",true);
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

mozapps.Views.appBuilderPublishSubmitView = Backbone.View.extend({
    template: Handlebars.compile($("#appBuilderPublishSumbitTemplate").html()),
    viewName: "appBuilderPublishSubmitView",
    events: {
        'click button#cancel' : "cancel",
    },
    cancel : function() {
        window.history.back();
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
