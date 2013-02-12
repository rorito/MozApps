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
    //template: Handlebars.compile($("#templatesSubViewTemplate").html()),
    //template: Handlebars.getTemplate("templatesSubViewTemplate"),
    template: Handlebars.templates['templatesSubViewTemplate'],
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
                    elementObject.css('width', (800 + (elementObject.find('li').length * $(elementObject.find('li')[0]).width())) + "px");
                    
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
    initialize: function() {
    },
    events: {
        'click button#menuButton' : 'showMenu'
    },
    showMenu: function() {
        mozapps.toggleSideMenu();
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
    //template: Handlebars.compile($("#appBuilderViewTemplate").html()),
    //template: Handlebars.getTemplate("appBuilderViewTemplate"),
    template: Handlebars.templates['appBuilderViewTemplate'],
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
    back : function(event) {
        console.log(event);
        //event.preventDefault();
        //window.history.back();
        // TODO: make this smarter so it knows to go to template chooses or main view
        console.log(">>>>>>>>>>>>>>>>>>>>>>> route to home")
        mozapps.router.navigate("#home", true);
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
        console.log("render app builder view");
        console.log(mozapps.currentPage);
        if(mozapps.currentPage == "appBuilderView" && this.collection){
            this.model = this.collection.get(this.appID);
            if(!this.model){
                this.$el.html(this.template( { loading: true } ));
            } else {
                console.log(this.model.toJSON());
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
        'click button#back' : "back"
        //'click #link-add-product' : "addProduct"
    },
    back : function() {
        mozapps.router.navigate("#apps/"+this.appID,true);
    },
    addProduct: function(event){
        console.log("add Product");
        mozapps.router.navigate("#apps/"+this.appID+"/cameraGallery",true);
        //mozapps.router.navigate("#apps/"+this.appID+"/product-list/add",true);
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

                productList.forEach(function(element, index, array){
                    if(element.imgStorageType == "devicestorage" && element.imgSmallPath){
                        //will async append an image from device storage to the given HTMLElement id (second arg)
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
        'click button#deleteProductDetail' : "deleteProduct"
    },
    back : function() {
        mozapps.router.navigate("#apps/"+this.appID+"/product-list",true);
    },
    deleteProduct: function(event){
        mozapps.productCollection.remove(this.model);
        mozapps.router.navigate("#apps/"+this.appID+"/product-list",true);
    },
    saveProduct: function(event){
        var self = this;
        event.preventDefault();

        console.log("save Product")
        console.log(mozapps.productID)

        if(mozapps.productID == "add"){
                //new product
                var prodName = $('#name').val();
                if(!prodName || prodName == ""){
                    prodName = "New Product";
                }
                console.log("create new product")
                var newProduct = new mozapps.Models.ProductModel({
                    id: UUID.genV4().toString(),
                    appID: this.appID,
                    name: prodName,
                    description: $('#description').val(),
                    price: $('#price').val(),
                    imgLargePath: mozapps.productImage156.originalFilename,
                    imgSmallPath: mozapps.productImage156.resizedFilename,
                    imgStorageType: "devicestorage"
                });
                mozapps.productCollection.add(newProduct);
        } else {
            //update existing product
            console.log("updating existing product");
            this.model.set({
                name: $('#name').val(),
                description: $('#description').val(),
                price: $('#price').val(),
                imgLargePath: mozapps.productImage156.originalFilename,
                imgSmallPath: mozapps.productImage156.resizedFilename,
                imgStorageType: "devicestorage"
            });
        }


        mozapps.router.navigate("#apps/"+mozapps.appID+"/product-list",true);
    },
    render: function(eventName) {
        console.log("product detail edit render");
        if(mozapps.currentPage == this.viewName){
            if(!this.model || this.model == "add"){
                console.log("product detail - add new product");
                console.log("resized filename: " + mozapps.productImage156.resizedFilename);
                
                //render template first so we have DOM element to inject image into on callback
                this.$el.html(this.template({add: true, appID: this.appID}));
                window.mozapps.Utils.getImageFromDeviceStorage2(mozapps.productImage156.resizedFilename, 'productDetailImage', 156);
                // var imgObj = {
                //     filename: mozapps.productImage156.resizedFilename,
                //     size: 156,
                //     url: ""
                // };
                // $.when(window.mozapps.Utils.getImageFromDeviceStorage(imgObj))
                // .done(function(imgObj){         
                //     console.log("deferred done - new")
                //     console.log(imgObj)            
                //     this.$el.html(this.template({ model: this.model.toJSON(), imageURL: imgObj.url}));    
                // });

            } else {
                console.log("edit existing product");
                console.log(this.model.toJSON());
                
                // var imgObj = {
                //     filename: this.model.toJSON().imgSmallPath,
                //     size: 156,
                //     url: ""
                // };

                // $.when(window.mozapps.Utils.getImageFromDeviceStorage(imgObj))
                // .done(function(imgObj){
                //     var self = this;
                //     console.log("deferred done - existing")            
                //     console.log(imgObj)
                //     this.$el.html(this.template({ model: this.model.toJSON(), imageURL: imgObj.url}));    
                // });

                this.$el.html(this.template(this.model.toJSON()));
                window.mozapps.Utils.getImageFromDeviceStorage2(this.model.toJSON().imgSmallPath, 'productDetailImage', 156);
            }

            //this.imageSubView = new mozapps.Views.imageSubView({el: this.$el.find('#imageSubView'), model: this.model});
        }
        return this;
    }
});

mozapps.Views.preview = Backbone.View.extend({
    //template: Handlebars.compile($("#appViewTemplate").html()),
    //template: Handlebars.getTemplate("appViewTemplate"),
    template: Handlebars.templates['appViewTemplate'],
    viewName: "preview",
    classNames: window.widgets.carouselClassNames,
    productCarousel:null,
    productList: [],
    events: {
        'click button#back' : "back",
        'click a.link-product-temp' : "showProductDetail"
    },
    back : function() {
        mozapps.router.navigate("#apps/"+this.appID,true);
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
            //console.log('on swipe done: ' + targetIndex);
            //console.log('on swipe done: ' + targetEl);

            // get product info based on app id and product id
            if (targetIndex < productList.length) {
                var newSelectedProduct = productList[targetIndex];
                // update the dom
                $('#product-name').html(newSelectedProduct.name);
                $('#product-price').html('$' + newSelectedProduct.price);
            }
        }).bind(this);
        
        productCarousel.onMainItemClicked = (function(targetIndex, targetEl) {
            console.log('on main item clicked: ' + targetIndex);   
            console.log('on main item clicked: ' + targetEl);
            if (targetEl) {
                var productID = targetEl.getAttribute("productID");
                //console.log(this.appID);
                //console.log(productID);
                mozapps.router.navigate("#apps/"+this.appID+"/preview/product/"+productID+"/",true);
            }
        }).bind(this);
    }
});

mozapps.Views.previewProductDetailView = Backbone.View.extend({
    //template: Handlebars.compile($("#appViewProductDetailTemplate").html()),
    //template: Handlebars.getTemplate("appViewProductDetailTemplate"),
    template: Handlebars.templates['appViewProductDetailTemplate'],
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

            console.log('appID: ' + this.appID);

            var themeJSON = _.find(mozapps.appCollection.get(this.appID).toJSON().app_components, function(elem){
                return elem.component_id == "theme";
            });
            

            this.$el.html(this.template({ model: this.model.toJSON(), product: productJSON, theme: themeJSON.properties.selectedTheme }));


            // TODO: use imgLargePath
            var imgPath = productJSON.attributes.imgSmallPath;
            var productID = productJSON.attributes.id;
            var containerID = "img-container-" + productID;
            //console.log('>>>>>> try to get product ID: ' + productID);
            //console.log('containerID: ' + containerID);
            ///console.log('container exists?');
            //console.log($('#' + containerID));
            window.mozapps.Utils.getImageFromDeviceStorage2(imgPath, containerID, 320);
        }
        return this;
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
    maxCounter: 5,
    counter: 0,
    intervalID: -1,
    intervalTime: 500,
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
                console.log('create sub view');
                console.log(this.appID);
                //console.log(this.$el.find('#publishMarkupContainer'));
                //console.log(window.document.getElementById("publishMarkupContainer"));
                // create and render sub view
                this.mySubView = new mozapps.Views.appBuilderPublishSubmitSubView({appID: this.appID, el: this.$el.find('#publishMarkupContainer')});

                // start interval
                this.intervalID = window.setInterval(this.handleInterval, this.intervalTime, this);
            }
        }
        return this;
    },
    handleInterval: function(self) {
        console.log("handle interval: animate scroll");
        //console.log(self);
        
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
        var sharing = new MozActivity({
                name: "share",
                data: {
                    //type: "url", // Possibly text/html in future versions,
                    type: "foo",
                    number: 1,
                    url: "http://www.mozapps.com"
                }
            });
            
            sharing.onerror = function() { 
                console.log('Failed to launch generated app with activity.'); 
            };
            sharing.onsuccess = function() { 
                console.log('Launched generated app with activity.'); 
            };

    },
    render: function(eventName) {
        if(mozapps.currentPage == this.viewName){
            console.log("open view render - current")
            this.$el.html(this.template());
        }
        return this;
    }
});
