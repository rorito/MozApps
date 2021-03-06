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
//TODO
// 1. replace console.log
// 2. add refresh button to main page
//TODO - disallow horiz. scroll on templaet detail view
//TODO - long press to go home
//TODO - my apps accordian
//TODO - disable horiz scrolling
//TODO - header gets stuck under status bar
//TODO - albert figure out sonny
// elementObject.css('width', (800 + (elementObject.find('li').length * $(elementObject.find('li')[0]).width())) + "px");
//TODO - albert fix flex issues in css

// Handlebars.getTemplate = function(name) {
//     if (Handlebars.templates === undefined || Handlebars.templates[name] === undefined) {
//         $.ajax({
//             mimeType: 'text/plain; charset=x-user-defined',
//             url : '/scripts/templates/' + name + '.handlebars',
//             datatype: 'text',
//             success : function(response, status, jqXHR) {
//                 if (Handlebars.templates === undefined) {
//                     Handlebars.templates = {};
//                 }
//                 Handlebars.templates[name] = Handlebars.compile(jqXHR.responseText);
//             },
//             async : false
//         });
//     }
//     return Handlebars.templates[name];
// };

mozapps.Views.imageSubView = Backbone.View.extend({
    template: Handlebars.templates['imageSubView'],
    initialize: function(){
        this.listenTo(this.model, "change", this.render);
        this.render();
    },
    render: function(){
        this.$el.html(this.template(this.model));
        mozapps.Utils.getImageFromDeviceStorage2(element.imgSmallPath, element.imgSmallPath, 153);
        return this;
    }
});

mozapps.Views.appSubView = Backbone.View.extend({
    //template: Handlebars.compile($("#myAppsSubViewTemplate").html()),
    //template: Handlebars.getTemplate("myAppsSubViewTemplate"),
    template: Handlebars.templates['myAppsSubViewTemplate'],
    iscrollObjects: new Array(),
    radioClickCallback:null,
    initialize: function(){
        radioClickCallback = null;

        this.listenTo(this.collection, "reset", this.render);
        this.listenTo(this.collection, "add", this.render);
        this.listenTo(this.collection, "remove", this.render);

        // SK - this may be a hack?, problem with back button render
        this.render();
    },
    events: {
        'click input[type="radio"]' : 'onRadioClick'
    },
    onRadioClick: function(event) {
        var targetEl = $(event.currentTarget);
        if (null != radioClickCallback) {
            radioClickCallback(targetEl);
        }
    },
    setRadioClickCallback: function(callbackHandler) {
        //console.log('set radio handler');
        radioClickCallback = callbackHandler;
    },
    render: function(){
        if(mozapps.currentPage == "templatesListView"){
            //TODO fix the double render
            //console.log("app subview - outer render");
            if(!this.collection){
                this.$el.html(this.template( { loading: true } ));    
            } else {
                this.$el.html(this.template( { myApps: this.collection.toJSON() } ));
            }
            this.delegateEvents();

            // set viewport (UL) width
            /*
            _.each(this.$el.find('.list-item-body'), function(element){
            }, this);
            */

            _.each(this.$el.find('.list-item-body'), function(element){
                var elementObject = $(element).find('ul');

                var ulLeftPadding = 30;
                var itemWidth = 130;
                //TODO BUG in setting the width of the accordian, selector not working
                //try width = auto?
                //height of accordian rows hard coded in css
                //elementObject.css('width', (800 + (elementObject.find('li').length * $(elementObject.find('li')[0]).width())) + "px");
                //console.log("horz scroll")
                //console.log($(".list-item"))
                //console.log(elementObject)
                // console.log(elementObject.find('.list-item').length)
                // console.log($(elementObject.find('list-item')))
                // console.log($(elementObject.find('list-item')).width())
                //elementObject.css('width', (150 + (elementObject.find('li').length * $(elementObject.find('.horizontal-list > li')).width())) + "px");
                var newWidth = ulLeftPadding + (elementObject.find('li').length * itemWidth);
                console.log("**************** render My Apps new width: " + newWidth);
                elementObject.css('width', newWidth + 'px');
                //elementObject.css('width', (50 + (elementObject.find('li').length * 140) + "px"));
                
            }, this);

            return this;
        }
    }
});

mozapps.Views.templateSubView = Backbone.View.extend({
    //template: Handlebars.compile($("#templatesSubViewTemplate").html()),
    //template: Handlebars.getTemplate("templatesSubViewTemplate"),
    template: Handlebars.templates['templatesSubViewTemplate'],
    iscrollObjects: new Array(),
    radioClickCallback:null,
    initialize: function(){
        radioClickCallback = null;

        this.listenTo(this.collection, "reset", this.render);
        this.listenTo(this.collection, "add", this.render);
        this.listenTo(this.collection, "remove", this.render);

        // TODO SK - this may be a hack?, problem with back button render
        this.render();
    },
    events: {
        'click input[type="radio"]' : 'onRadioClick'
    },
    onRadioClick: function(event) {
        console.log(event);
        var targetEl = $(event.currentTarget);
        console.log('click');
        console.log(targetEl);
        if (null != radioClickCallback) {
            radioClickCallback(targetEl);
        }
    },
    setRadioClickCallback: function(callbackHandler) {
        //console.log('set radio handler');
        radioClickCallback = callbackHandler;
    },
    render: function(){
        if(mozapps.currentPage == "templatesListView"){
            //console.log("template subview - outer render");
            if(this.collection.length < 1){
                //console.log("template sub - loading");
                this.$el.html(this.template( { loading: true } ));
            } else {
                //this is a hack - use categories property in Template collection instead of having seperate category table and using their IDs
                var tmplByCategory = {};
                tmplByCategory.categories = {
                    "Featured": [],
                    "Commerce": [],
                    "Magazine": [],
                    "Blogging": [],
                    "Photo & Video": []
                };
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
                // console.log("rory")
                // $.each($(".list-item-body"),function(element){
                //     console.log(element)
                //     console.log(element.$el)
                // });

                _.each(this.$el.find('.list-item-body'), function(element){
                    var elementObject = $(element).find('ul');

                    var ulLeftPadding = 30;
                    var itemWidth = 130;
                    //TODO BUG in setting the width of the accordian, selector not working
                    //try width = auto?
                    //height of accordian rows hard coded in css
                    //elementObject.css('width', (800 + (elementObject.find('li').length * $(elementObject.find('li')[0]).width())) + "px");
                    //console.log("horz scroll")
                    //console.log($(".list-item"))
                    //console.log(elementObject)
                    // console.log(elementObject.find('.list-item').length)
                    // console.log($(elementObject.find('list-item')))
                    // console.log($(elementObject.find('list-item')).width())
                    //elementObject.css('width', (150 + (elementObject.find('li').length * $(elementObject.find('.horizontal-list > li')).width())) + "px");
                    var newWidth = ulLeftPadding + (elementObject.find('li').length * itemWidth);
                    console.log("**************** render new width: " + newWidth);
                    elementObject.css('width', newWidth + 'px');
                    //elementObject.css('width', (50 + (elementObject.find('li').length * 140) + "px"));
                    
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
    //template: Handlebars.compile($("#screenViewTemplate").html()),
    //template: Handlebars.getTemplate("screenViewTemplate"),
    template: Handlebars.templates['screenViewTemplate'],
    selectedID: null,
    initialize: function() {
        selectedID = null;
    },
    events: {
        'click button#menuButton' : 'showMenu'
    },
    showMenu: function() {
        mozapps.toggleSideMenu();
    },
    handleRadioClick:function(targetEl) {
        var targetID = targetEl.attr('id');

        if (selectedID != targetID) {
            if (null != selectedID) {
                var oldSelectedEl = $('#' + selectedID);
                var oldTargetContainer = targetEl.next().next();
                if (oldTargetContainer.length > 0) {
                    oldTargetContainer.removeClass('show-scroll');
                }
            }

            // set the selected id
            selectedID = targetID;

            // wait until animation is done to show the scroll
            setTimeout(function(targetEl){
                // assumes container is two siblings away
                var targetContainer = targetEl.next().next();
                if (targetContainer.length > 0) {
                    targetContainer.addClass('show-scroll');
                }
            }, 
            500, 
            targetEl
            );
        }

        // check if the side menu is still open
        //console.log(">>>>> menu check");
        //console.log(window.mozapps.getIsMenuOpen());
        if (true === window.mozapps.getIsMenuOpen()) {
            // collapse menu if it's open
            window.mozapps.toggleSideMenu();
        }
    },
    render: function(eventName) {
        if(mozapps.currentPage == "templatesListView"){
            // reset none selected for accordian scrollbar tracking
            selectedID = null;

            this.$el.html(this.template);
            this.myAppsSubView = new mozapps.Views.appSubView({el: this.$el.find('#appList'), collection: mozapps.appCollection});
            this.myTemplatesSubView = new mozapps.Views.templateSubView({el: this.$el.find('#templateAccordianList'), collection: mozapps.templateCollection});

            // set callbacks
            this.myAppsSubView.setRadioClickCallback((function(targetEl){
                this.handleRadioClick(targetEl);
            }).bind(this));

            this.myTemplatesSubView.setRadioClickCallback((function(targetEl){
                this.handleRadioClick(targetEl);
            }).bind(this));
        }
        return this;
    }
});


mozapps.Views.templateDetailView = Backbone.View.extend({
    viewName: "templateDetailView",
    //template: Handlebars.compile($("#templateDetailViewTemplate").html()),
    //template: Handlebars.getTemplate("templateDetailViewTemplate"),
    template: Handlebars.templates['templateDetailViewTemplate'],
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
        //window.location = "#templates/" + button.data('id');
        var nextTemplateID = button.data('id');
        mozapps.router.navigate("#templates/" + nextTemplateID, false);
        // reset the template ID
        this.templateID = nextTemplateID;
        // soft render without going through routing and slide page
        this.render();
    },
    back : function() {
        mozapps.router.navigate("#",true);
    },
    createApp: function(){
        var self = this;
        console.log("templateID: " + this.templateID)

        var tmpl = mozapps.templateCollection.get(this.templateID);

        console.log(tmpl.toJSON());
        console.log(tmpl.toJSON().app_components);

        if(tmpl){
            var newMozApp = new mozapps.Models.AppModel({
                id: UUID.genV4().toString(),
                name: tmpl.toJSON().name,
                published: false,
                version: "1.0",
                //app_components: [].concat(tmpl.toJSON().app_components),
                app_components: JSON.parse(JSON.stringify(tmpl.toJSON().app_components)),
                templateID: self.templateID,
                //imgOrigPath: tmpl,toJSON().imgOrigPath,
                imgLargePath: tmpl.toJSON().imgLargePath,
                imgSmallPath: tmpl.toJSON().imgSmallPath
            });
            mozapps.appCollection.add(newMozApp);
            console.log("app collection after add: " + newMozApp.toJSON().id);
            console.log(newMozApp.toJSON());
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
                console.log('re render template');
                //NOTE: don't need toJSON() here because we call it above when we iterate over the template
                this.$el.html(this.template(this.model)); 
        }
        return this;
    }
});

mozapps.Views.appBuilderView = Backbone.View.extend({
    //TODO pre-compile templates and make sure compile only happens during init
    //TODO better handling if app_id isn't found
    //template: Handlebars.compile($("#appBuilderViewTemplate").html()),
    //template: Handlebars.getTemplate("appBuilderViewTemplate"),
    template: Handlebars.templates['appBuilderViewTemplate'],
    viewName: "appBuilderView",
    appID: "",
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
    back : function(event) {
        //console.log(event);
        //event.preventDefault();
        // TODO: make this smarter so it knows to go to template chooses or main view
        //console.log(">>>>>>>>>>>>>>>>>>>>>>> route to home")
        mozapps.router.navigate("#", true);
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
        mozapps.router.navigate("#apps/"+this.appID+"/publish/marketplace/submit",true);
    },
    preview: function(){
        mozapps.router.navigate("#apps/"+this.appID+"/preview",true);
    },
    render: function(eventName) {
        //console.log("render app builder view");
        //console.log(mozapps.currentPage);
        if(mozapps.currentPage == "appBuilderView"){
            this.model = mozapps.appCollection.get(this.appID);
            if(!this.model){
                this.$el.html(this.template( { loading: true } ));
            } else {
                //console.log(this.model.toJSON());
                this.$el.html(this.template(this.model.toJSON()));
            }
        }
        return this;
    }
});

mozapps.Views.appBuilderNameView = Backbone.View.extend({
    //template: Handlebars.compile($("#appBuilderNameViewTemplate").html()),
    //template: Handlebars.getTemplate("appBuilderNameViewTemplate"),
    template: Handlebars.templates['appBuilderNameViewTemplate'],
    viewName: "appBuilderNameView",
    initialize: function(options) {
    },
    events: {
        'click button#back' : "back",
        'click button#nameFormDone': "changeName"
    },
    back : function() {
        mozapps.router.navigate("#apps/"+this.appID,true);
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
        var getModel = mozapps.appCollection.get(this.appID);
        getModel.set(nameJSON);

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
            // once it's in the DOM, set the foucus to name input
            setTimeout(function(){
                var nameField = $('#nameField');
                if (nameField.length > 0) {
                    nameField.bind('focus', function(event){
                        var myValue = this.value;
                        this.value = "";
                        this.value = myValue;
                    });
                    nameField.focus();
                }
            });
        }
        return this;
    }
});

mozapps.Views.appBuilderAboutView = Backbone.View.extend({
    //template: Handlebars.compile($("#appBuilderAboutTemplate").html()),
    //template: Handlebars.getTemplate("appBuilderAboutTemplate"),
    template: Handlebars.templates['appBuilderAboutTemplate'],
    viewName: "appBuilderAboutView",
    events: {
        'click button#back' : "back",
        'click button#aboutFormDone' : "saveAbout"
    },
    back : function() {
        mozapps.router.navigate("#apps/"+this.appID,true);
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
    //template: Handlebars.compile($("#appBuilderThemeTemplate").html()),
    //template: Handlebars.getTemplate("appBuilderThemeTemplate"),
    template: Handlebars.templates['appBuilderThemeTemplate'],
    viewName: "appBuilderTheme",
    events: {
        'click button#back' : "back",
        'click button#themeFormDone' : "saveTheme"
    },
    back : function() {
        mozapps.router.navigate("#apps/"+this.appID,true);
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
    //template: Handlebars.compile($("#appBuilderPublishDestinationTemplate").html()),
    //template: Handlebars.getTemplate("appBuilderPublishDestinationTemplate"),
    template: Handlebars.templates['appBuilderPublishDestinationTemplate'],
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
    //template: Handlebars.compile($("#productListViewTemplate").html()),
    //template: Handlebars.getTemplate("productListViewTemplate"),
    template: Handlebars.templates['productListViewTemplate'],
    viewName: "productList",
    events: {
        'click button#back' : "back",
        'click #link-add-product' : "addProduct"
    },
    back : function() {
        mozapps.router.navigate("#apps/"+this.appID,true);
    },
    addProduct: function(event){
        console.log("add Product");
        //mozapps.router.navigate("#apps/"+this.appID+"/cameraGallery",true);
        mozapps.Utils.cameraGallery();
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

                if(productList.length > 0){
                    //show check mark
                    product.completed = true;
                }

                this.$el.html(this.template({ 
                    products: productList,
                    appID: this.appID
                }));

                productList.forEach(function(element, index, array){
                    if(element.imgStorageType == "devicestorage" && element.imgSmallPath){
                        //will async append an image from device storage to the given HTMLElement id (second arg)
                        //mozapps.Utils.getImageFromDeviceStorage2(element.imgSmallPath, element.id, 83);
                        console.log("******** view - device storage: " + element.imgSmallPath);
                        mozapps.Utils.getImageFromDeviceStorage2(element.imgSmallPath, element.id, 83);
                    }
                });
            }
        }
        return this;
    }
});


mozapps.Views.productListDetailEdit = Backbone.View.extend({
    template: Handlebars.templates['productDetailEditTemplate'],
    viewName: "productListDetailEdit",
    events: {
        'click button#back' : "back",
        'click button#productDetailEditDone' : "saveProduct",
        'click button#deleteProductDetail' : "deleteProduct",
        'click #productDetailImage' : "changeImage"
    },
    back : function() {
        mozapps.router.navigate("#apps/"+this.appID+"/product-list",true);
    },
    deleteProduct: function(event){
        mozapps.productCollection.remove(this.model);
        mozapps.router.navigate("#apps/"+this.appID+"/product-list",true);
    },
    changeImage: function(event){
        mozapps.Utils.cameraGallery(this.model.toJSON().id);
    },
    saveProduct: function(event){
        var self = this;
        event.preventDefault();

        console.log("save Product")
        console.log(mozapps.productID)

        var priceClean = $('#price').val().toString();
        if(priceClean != "" && !priceClean.startsWith("$")){
            priceClean = "$"+priceClean;
        }

        if(mozapps.productID == "add"){
                //new product
                var prodName = $('#name').val();
                if(!prodName || prodName == ""){
                    prodName = "New Product";
                }

                console.log("**** create new product")
                console.log("small: " + mozapps.productImage.imgSmallPath);
                console.log("large: " + mozapps.productImage.imgLargePath);

                var newProduct = new mozapps.Models.ProductModel({
                    id: UUID.genV4().toString(),
                    appID: this.appID,
                    name: prodName,
                    description: $('#description').val(),
                    price: priceClean,
                    //imgOrigPath: mozapps.productImage.imgOrigPath,
                    imgSmallPath: mozapps.productImage.imgSmallPath,
                    imgLargePath: mozapps.productImage.imgLargePath,
                    imgStorageType: "devicestorage"
                });
                mozapps.productCollection.add(newProduct);

                console.log("newProduct id: " + newProduct.id)
                console.log("newProduct imgSmallPath: " + newProduct.toJSON().imgSmallPath)
                console.log("newProduct imgLargePath: " + newProduct.toJSON().imgLargePath)
        } else {
            //update existing product
            console.log("******* updating existing product");

            this.model.set({
                name: $('#name').val(),
                description: $('#description').val(),
                price: priceClean
                // //imgOrigPath: mozapps.productImage.imgOrigPath,
                // imgLargePath: mozapps.productImage.imgLargePath,
                // imgSmallPath: mozapps.productImage.imgSmallPath,
                // imgStorageType: "devicestorage"
            });

                console.log("existing id: " + this.model.toJSON().id)
                console.log("existing imgSmallPath: " + this.model.toJSON().imgSmallPath)
                console.log("existing imgLargePath: " + this.model.toJSON().imgLargePath)
        }


        mozapps.router.navigate("#apps/"+mozapps.appID+"/product-list",true);
    },
    render: function(eventName) {
        if(mozapps.currentPage == this.viewName){
            if(!this.model || this.model == "add"){
                
                //render template first so we have DOM element to inject image into on callback
                console.log("product detail edit app id: " + this.appID);
                
                this.$el.html(this.template({add: true, appID: this.appID, imgSmallPath: mozapps.productImage.imgSmallPath}));

                window.mozapps.Utils.getImageFromDeviceStorage2(mozapps.productImage.imgSmallPath, "productDetailImage", 156);
            } else {
                console.log("edit existing product");
                console.log("product detail edit app id: " + this.appID);
                console.log(this.model.toJSON())
                this.$el.html(this.template(this.model.toJSON()));
                
                if (this.model.attributes.imgStorageType === "devicestorage") {
                    console.log("imgStorage type device storage")
                    window.mozapps.Utils.getImageFromDeviceStorage2(this.model.toJSON().imgSmallPath, "productDetailImage", 156);
                }
            }
        }
        return this;
    }
});

mozapps.Views.preview = Backbone.View.extend({
    template: Handlebars.templates['appViewTemplate'],
    viewName: "preview",
    classNames: window.widgets.carouselClassNames,
    self: null,
    productCarousel:null,
    productList: [],
    targetScroll:null,
    currentScroll:null,
    intervalID:null,
    scrollStartDelay:null,
    scrollIntervalTime:null,
    isScrollComplete: false,
    initialize:function() {
        self = this;
        targetScroll = 52;
        currentScroll = 0;
        intervalID = null;
        scrollStartDelay = 2000;
        scrollIntervalTime = 100;
        isScrollComplete: false;
    },
    events: {
        'click button#back' : "back",
        'click a.link-product-temp' : "showProductDetail"
    },
    back : function() {
        // don't allow events until scroll is done
        if (isScrollComplete) {
            mozapps.router.navigate("#apps/"+this.appID,true);
        }
    },
    showProductDetail: function(event) {
        event.preventDefault();
        // don't allow events until scroll is done
        if (isScrollComplete) {
            console.log(event.currentTarget);
            var targetLink = event.currentTarget;
            var productID = targetLink.getAttribute("productID");

            mozapps.router.navigate("#apps/"+this.appID+"/preview/product/"+productID+"/",true);
        }
    },
    render: function(eventName) {
        if(mozapps.currentPage == this.viewName){
            var counter = 0;
            var selectedProduct = {};
            productList = [];
            mozapps.productCollection.where({appID: this.appID}).forEach(function(element,index,array){
                productList.push(element.toJSON());
                // determine classname based on index
                // blending in some visual markup (className) with the data here
                // TODO: this needs to be smarter if there are less than 5 items in the carousel
                var className = window.widgets.getCarouselClassNameForIndex(counter);
                var lastProductAdded = productList[productList.length - 1];
                lastProductAdded.className = className;
                if (className === "") {
                    // empty classname is the selected one
                    selectedProduct.name = lastProductAdded.name;
                    selectedProduct.price = lastProductAdded.price;
                }
                // update counter
                counter++;
            });

            var aboutJSON = _.find(mozapps.appCollection.get(this.appID).toJSON().app_components, function(elem){
                return elem.component_id == "about";
            });

            var themeJSON = _.find(mozapps.appCollection.get(this.appID).toJSON().app_components, function(elem){
                return elem.component_id == "theme";
            });
            //console.log(selectedProduct);
            this.$el.html(this.template(
                {
                    model: this.model.toJSON(), 
                    products: productList, 
                    about: aboutJSON, 
                    theme: themeJSON.properties.selectedTheme, 
                    selectedProduct: selectedProduct 
                })
            );

            // underscore uses setTimeout under the hood so not sure this will work on device
            _.defer( function( view ){ view.createCarousel();}, this );

            // scroll out of view, only in preview (should not be in published app)
            isScrollComplete = false;
            setTimeout(this.scrollToView, scrollStartDelay);        
        }
        return this;
    },
    createCarousel: function() {
        //console.log('create carousel !!!');
        
        // callback to instantiate carousel
        productCarousel = new window.widgets.carousel();
        // id should be part of view
        productCarousel.init("#productCarousel");
        // set callbacks
        productCarousel.onSwipeDone = (function(targetIndex, targetEl) {
            console.log('on swipe done: ' + targetIndex);
            //console.log('on swipe done: ' + targetEl);

            // get product info based on app id and product id
            if (targetIndex < productList.length) {
                var newSelectedProduct = productList[targetIndex];
                // update the dom
                $('#product-name').html(newSelectedProduct.name);
                $('#product-price').html(newSelectedProduct.price);
            }
        }).bind(this);
        
        productCarousel.onMainItemClicked = (function(targetIndex, targetEl) {
            console.log('on main item clicked: ' + targetIndex);   
            //console.log('on main item clicked: ' + targetEl);
            if ((targetEl) && (isScrollComplete)) {
                var productID = targetEl.getAttribute("productID");
                //console.log(this.appID);
                //console.log(productID);
                mozapps.router.navigate("#apps/"+this.appID+"/preview/product/"+productID+"/",true);
            }
        }).bind(this);


        // add images from device storage async
        // loop through the products
        //console.log('loop through product list');
        //console.log(productList);

        //TODO do sequentially not 

        for (var i=0; i<productList.length; i++) {
            var product = productList[i];
            //console.log("loooping: " + i);
            //console.log(product);
            if (product.imgStorageType === "devicestorage") {
                var imgPath = product.imgSmallPath;
                var containerID = "label-" + product.id;
                //console.log('imgPath: ' + imgPath);
                //console.log('containerID: ' + containerID);
                window.mozapps.Utils.getImageFromDeviceStorage2(imgPath, containerID, 156);        
            }
        }
        
    },
    scrollToView: function() {
        var actualScroll = document.querySelector("#appContainer").scrollTop;
        //console.log(actualScroll);
        //console.log("scroll to view v: " + targetScroll);
        if (actualScroll == currentScroll) {
            //console.log(intervalID);
            //console.log(targetScroll);
            // scrolled at the top, so start the animate off
           // window.setInterval(this.handleInterval, this.intervalTime, this);
            currentScroll += targetScroll / 2;
            intervalID = window.setInterval(self.setScrollTop, scrollIntervalTime);
            //console.log(intervalID);
            //setScrollTop(this);
            //console.log(self);
        } else {
            isScrollComplete = true;
        }
    },
    setScrollTop:function() {
        //console.log('hey: ');
        //console.log(intervalID, currentScroll, targetScroll);
        //self.currentScroll = 25;
        // this works, but doesn't animate
        document.querySelector("#appContainer").scrollTop = currentScroll;
        currentScroll += (targetScroll - currentScroll) / 2;
        //console.log(self.currentScroll, self.targetScroll);
        if (targetScroll - currentScroll <= 0.01) {
            // clear the interval
            window.clearInterval(intervalID);
            isScrollComplete = true;
        }
    }
});

mozapps.Views.previewProductDetailView = Backbone.View.extend({
    template: Handlebars.templates['appViewProductDetailTemplate'],
    viewName: "previewProductDetail",
    self:null,
    targetScroll:null,
    currentScroll:null,
    intervalID:null,
    scrollStartDelay:null,
    scrollIntervalTime:null,
    isScrollComplete: false,
    initialize:function() {
        self = this;
        targetScroll = 52;  // not sure why the target is half of the previous view?
        currentScroll = 0;
        intervalID = null;
        scrollStartDelay = 2000;
        scrollIntervalTime = 100;
        isScrollComplete = false;
    },
    events: {
        'click button#back' : "back",
        'click button#exitPreview': "exitPreview"
    },
    back : function() {
        if (isScrollComplete) {
            mozapps.router.navigate("#apps/"+this.appID+"/preview",true);
        }
    },
    exitPreview : function(){
        if (isScrollComplete) {
            mozapps.router.navigate("#apps/"+this.appID,true);
        }
    },
    render: function(eventName) {
        if(mozapps.currentPage == this.viewName){
            var productJSON = mozapps.productCollection.get({id: this.productID});

            var themeJSON = _.find(mozapps.appCollection.get(this.appID).toJSON().app_components, function(elem){
                return elem.component_id == "theme";
            });
            
            this.$el.html(this.template({ model: this.model.toJSON(), product: productJSON, theme: themeJSON.properties.selectedTheme }));

            console.log("previewProductDetail view")
            console.log(productJSON)
            console.log(productJSON.toJSON())
            console.log(productJSON.toJSON().name)
            console.log(productJSON.toJSON().price)

            // TODO: use imgLargePath
            var imgPath = productJSON.attributes.imgLargePath;
            var productID = productJSON.attributes.id;
            var containerID = "img-container-" + productID;
            //console.log('>>>>>> try to get product ID: ' + productID);
            ///console.log('container exists?');
            //console.log($('#' + containerID));

            
            console.log("imgPath: " + imgPath);
            console.log("productID: " + productID);
            console.log('containerID: ' + containerID);
            console.log("mozapps.productImage.imgSmallPath: " + productJSON.attributes.imgSmallPath);
            console.log("mozapps.productImage.imgLargePath: " + productJSON.attributes.imgLargePath);
            console.log("imgStorageType: " + productJSON.attributes.imgStorageType)

            console.log(themeJSON);
            
            if (productJSON.attributes.imgStorageType == "devicestorage") {
                window.mozapps.Utils.getImageFromDeviceStorage2(imgPath, containerID, 320);
            } else {
                console.log("not devicestorage")
            }

            // scroll out of view, only in preview (should not be in published app)
            isScrollComplete = false;
            setTimeout(this.scrollToView, scrollStartDelay);
        }
        return this;
    },
    scrollToView: function() {
        var actualScroll = document.querySelector("#appContainer").scrollTop;
        //console.log(actualScroll);
        //console.log("scroll to view v: " + targetScroll);
        if (actualScroll == currentScroll) {
            //console.log(intervalID);
            //console.log(targetScroll);
            // scrolled at the top, so start the animate off
           // window.setInterval(this.handleInterval, this.intervalTime, this);
            currentScroll += targetScroll / 2;
            //console.log(scrollIntervalTime);
            intervalID = window.setInterval(self.setScrollTop, scrollIntervalTime);
            //console.log(intervalID);
            //setScrollTop(this);
            //console.log(self);
        } else {
            isScrollComplete = true;
        }
    },
    setScrollTop:function() {
        //console.log('hey: ');
        //console.log(intervalID, currentScroll, targetScroll);
        //self.currentScroll = 25;
        //console.log(currentScroll);
        document.querySelector("#appContainer").scrollTop = currentScroll;
        currentScroll += (targetScroll - currentScroll) / 2;
        //console.log(self.currentScroll, self.targetScroll);
        if (targetScroll - currentScroll <= 0.01) {
            // clear the interval
            window.clearInterval(intervalID);
            isScrollComplete = true;
        }
    }
});

mozapps.Views.appBuilderPublishMarketplaceView = Backbone.View.extend({
    //template: Handlebars.compile($("#appBuilderPublishMarketplaceTemplate").html()),
    //template: Handlebars.getTemplate("appBuilderPublishMarketplaceTemplate"),
    template: Handlebars.templates['appBuilderPublishMarketplaceTemplate'],
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
    //template: Handlebars.compile($("#appBuilderPublishSumbitTemplate").html()),
    //template: Handlebars.getTemplate("appBuilderPublishSumbitTemplate"),
    template: Handlebars.templates['appBuilderPublishSumbitTemplate'],
    viewName: "appBuilderPublishSubmitView",
    self: null,
    maxCounter: 5,
    counter: 0,
    intervalID: -1,
    intervalTime: 500,
    markupContainer: null,
    initialize: function() {
        self = this;
    },
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
                var self = this;

                this.$el.html(this.template(this.model.toJSON()));
                console.log('create sub view');
                console.log(this.appID);
                //console.log(this.$el.find('#publishMarkupContainer'));
                //console.log(window.document.getElementById("publishMarkupContainer"));
                // create and render sub view
                this.mySubView = new mozapps.Views.appBuilderPublishSubmitSubView({appID: this.appID, el: this.$el.find('#publishMarkupContainer')});

                // start interval
                this.intervalID = window.setInterval(this.handleInterval, this.intervalTime, this);

                // 
                setTimeout(function(){
                    self.markupContainer = $("#publishMarkupContainer");
                    //console.log(">>>>>>>>>>> timeout");
                    //console.log(self.markupContainer);
                });
            }
        }
        return this;
    },
    handleInterval: function(self) {
        //console.log("handle interval: animate scroll");
        //console.log(self);
        var offsetTop = parseInt(self.markupContainer.css('top'));
        //console.log(offsetTop);
        var newTop = offsetTop - 320;
        self.markupContainer.css('top', newTop + 'px');
        
        self.counter += 1;
        if ((self.counter > self.maxCounter) && (self.intervalID != -1)) { 
            window.clearInterval(self.intervalID);
            self.intervalID = -1;
            self.counter = 0;

            //do something at end of animation here
            mozapps.router.navigate("#apps/"+self.appID+"/publish/done",true);
        }

    }
});

mozapps.Views.appBuilderPublishSubmitSubView = Backbone.View.extend({
    //template: Handlebars.compile($("#fakeMarkupTemplate").html()),
    //template: Handlebars.getTemplate("fake-markup"),
    template: Handlebars.templates['fake-markup'],
    viewName: "appBuilderPublishSubmitSubView",
    initialize: function(){
        
        // TODO SK - this may be a hack?, problem with back button render
        this.render();
    },
    render: function(eventName) {
        console.log('render subview');
        this.$el.html(this.template);        
        return this;
    }
});

mozapps.Views.appBuilderPublishOpenAppView = Backbone.View.extend({
    template: Handlebars.templates['openApp'],
    viewName: "appBuilderPublishOpenAppView",
    initialize: function(){
    },
    events: {
        'click button#openAppButton' : "openApp",
        'click button#backButton' : "back",
    },
    back : function() {
        mozapps.router.navigate("#apps/"+this.appID,true);
    },
    openApp : function() {

        var productList = [];
        mozapps.productCollection.where({appID: this.appID}).forEach(function(element,index,array){
            productList.push(element.toJSON());
        });
        var sharing = new MozActivity({
                name: "sharemozapps",
                data: {
                    type: "mozapps",
                    appData: mozapps.appCollection.get(this.appID).toJSON(),
                    productData: productList
                    //type: "url", // Possibly text/html in future versions,
                    //url: "http://www.mozapps.com"
                }
            });
            
            sharing.onerror = function() { 
                console.log('********* Failed to launch generated app with activity.'); 
            };
            sharing.onsuccess = function() { 
                console.log('*********  Launched generated app with activity.'); 
            };

    },
    render: function(eventName) {
        if(mozapps.currentPage == this.viewName){
            console.log("open view render - current");
            
            console.log(this.model.toJSON());
            this.$el.html(this.template(this.model.toJSON()));
        }
        return this;
    }
});
