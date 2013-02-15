mozapps.Routers.ApplicationRouter = Backbone.Router.extend({
routes:{
        "":"templates",
        "home":"templates",
        "templates/:id":"templateDetails",
        "apps/:id":"appBuilder",
        "apps/:id/name":"appBuilderName",
        "apps/:id/about":"appBuilderAbout",
        "apps/:id/theme":"appBuilderTheme",
        "apps/:id/icon":"appBuilderIcon",
        "apps/:id/preview":"preview",
        "apps/:id/preview/product/:productID/":"previewProductDetail",
        "apps/:id/publish":"publish",
        "apps/:id/cameraGallery":"cameraGalleryNoProduct",
        "apps/:id/cameraGallery/:productID":"cameraGallery",
        "apps/:id/product-list":"ProductList",
        "apps/:id/product-list/:productID":"ProductListDetailEdit",
        "apps/:id/ecommerce":"appBuilderECommerce",
        "apps/:id/publish":"appBuilderPublishDestination",
        "apps/:id/publish/marketplace":"appBuilderPublishMarketplace",
        "apps/:id/publish/marketplace/submit":"appBuilderPublishSubmit",
        "apps/:id/publish/done":"appBuilderOpenApp",
        "*path":  "templates"
    },
    initialize: function() {
        var self = this;

        // Keep track of the history of pages (we only store the page URL). Used to identify the direction
        // (left or right) of the sliding transition between pages.
        this.pageHistory = [];
    },

    selectItem: function(event) {
        $(event.target).addClass('tappable-active');
    },

    deselectItem: function(event) {
        $(event.target).removeClass('tappable-active');
    },

    templateHomeWrapper: function() {
        console.log("home wrapper");
        templates();
    },

    templates: function(){
        mozapps.currentPage = mozapps.tmplListView.viewName;
        this.slidePage(
            mozapps.tmplListView.render()
        );
    },

    templateDetails: function(id){
        mozapps.currentPage = mozapps.tmplDetailView.viewName;
        mozapps.tmplDetailView.templateID = id;
        this.slidePage(mozapps.tmplDetailView.render());
    },

    appBuilder: function(id){
        mozapps.currentPage = mozapps.appBuilderView.viewName;
        mozapps.appBuilderView.appID = id;
        mozapps.appID = id;
        this.slidePage(mozapps.appBuilderView.render());  
    },
    //TODO should we do new on everypage instead of having several views for life of app (template list, template detail)
    //TODO use switch statement to dispatch app component routes
    appBuilderName: function(id){
        var namePage = new mozapps.Views.appBuilderNameView({model: mozapps.appCollection.get(id)});
        mozapps.currentPage = namePage.viewName;
        namePage.appID = id;
        mozapps.appID = id;
        this.slidePage(namePage.render());  
    },
    appBuilderAbout: function(id){
        var aboutPage = new mozapps.Views.appBuilderAboutView({model: mozapps.appCollection.get(id)});
        mozapps.currentPage = aboutPage.viewName;
        aboutPage.appID = id;
        mozapps.appID = id;
        this.slidePage(aboutPage.render());  
    },
    appBuilderTheme: function(id){
        var theme = new mozapps.Views.appBuilderTheme({model: mozapps.appCollection.get(id)});
        theme.appID = id;
        mozapps.appID = id;
        mozapps.currentPage = theme.viewName;
        
        this.slidePage(theme.render());  
    },
    cameraGalleryNoProduct: function(id){
        console.log("camera gallery no product");
        console.log(window.location.href);
        mozapps.router.cameraGallery(id,"");
    },
    cameraGallery: function(id, productID){
        console.log(window.location.href)
        console.log("camera gallery")
        console.log("id: " + id);
        console.log("product id: " + productID);

        mozapps.appID = id;
        mozapps.productID = productID;

        var pick = new MozActivity({
             name: "pick",
             data: {
                type: ["image/jpg", "image/jpeg"]
              }
         });

        pick.onsuccess = function () { 
            var self = this;
            mozapps.productImage = {};

            // console.log('PICK SUCCESS');
            // console.log('result: ' + this.result);
            // console.log('result.type: ' + this.result.type);
            // console.log('result.blob: ' + this.result.blob);
            // console.log('blob.type: ' + this.result.blob.type);
            // console.log('blob.name: ' + this.result.blob.name);
            // console.log('blob.size: ' + this.result.blob.size);

            //set original filename
            mozapps.productImage.imgOrigPath = this.result.blob.name;

            $.when(
                mozapps.Utils.cropResizeSave(this.result.blob, 156, 156),
                mozapps.Utils.cropResizeSave(this.result.blob, 320, 320)
            )
            .done(function(filename156){

                console.log("done - resizing 156");
                console.log(filename156);
                mozapps.productImage.imgSmallPath = filename156;
            })
            .done(function(filename320){
                console.log("done - resizing 320");
                console.log(filename320);
                mozapps.productImage.imgLargePath = filename320;               

                if(mozapps.productID && mozapps.productID != ""){
                    console.log("camera gallery - existing product");

                    //update the model
                    var model = mozapps.productCollection.get(mozapps.productID);
                    model.set({ 
                        imgOrigPath: mozapps.productImage.imgOrigPath,
                        imgSmallPath: mozapps.productImage.imgSmallPath,
                        imgLargePath: mozapps.productImage.imgLargePath
                    });

                    mozapps.router.navigate("#apps/"+mozapps.appID+"/product-list/"+mozapps.productID,true);
                } else {
                    console.log("camera gallery - new product");
                    mozapps.router.navigate("#apps/"+mozapps.appID+"/product-list/add",true);
                }
            });

            // mozapps.productImage156.image = new Image();
            // mozapps.productImage156.image.onload = function resizeImg() {
            //     var self = this;
            //   var canvas = document.createElement('canvas');
            //   canvas.width = 156;
            //   canvas.height = 156;
            //   var ctx = canvas.getContext('2d');
              

            //     var size = Math.min(self.width,self.height);

            //     var originX = self.width / 2 - size / 2;
            //     var originY = self.height / 2 - size / 2;

            //   ctx.drawImage(mozapps.productImage156.image, originX, originY, originX + size, originY + size, 0, 0, 156, 156);

            //   //ctx.drawImage(mozapps.productImage156.image, 0, 0, 156, 156);
            //   canvas.toBlob(function toBlobSuccess(resized_blob) {
            //     console.log("resized blob");
            //     var domRequest = navigator.getDeviceStorage("pictures").addNamed(resized_blob, "mozapps-"+UUID.genV4().toString()+".jpg");

            //     domRequest.onsuccess = function(){
            //         var self = this;
            //         console.log("file name");
            //         console.log(this.result);

            //         //set the file path for the resized image
            //         mozapps.productImage156.resizedFilename = this.result;

            //         if(mozapps.productID && mozapps.productID != ""){
            //             console.log("camera gallery - existing product");

            //             //update the model
            //             var model = mozapps.productCollection.get(mozapps.productID);
            //             model.set({ 
            //                 imgLargePath: mozapps.productImage156.originalFilename,
            //                 imgSmallPath: mozapps.productImage156.resizedFilename
            //             });

            //             mozapps.router.navigate("#apps/"+mozapps.appID+"/product-list/"+mozapps.productID,true);
            //         } else {
            //             console.log("camera gallery - new product");
            //             mozapps.router.navigate("#apps/"+mozapps.appID+"/product-list/add",true);
            //         }
                    
            //     };
            //     domRequest.onerror = function(){
            //         console.log("devicestorage addNamed error");
            //         console.log(domRequest.error);
            //         console.log(domRequest.error.name);
            //         alert("Error saving camera image");
            //         mozapps.router.navigate("#apps/"+mozapps.appID+"/product-list",true);
            //     };
            //   }, 'image/jpeg');
            // };
            // //TODO figure out if we need this
            // mozapps.productImage156.image.src = window.URL.createObjectURL(this.result.blob);



            // mozapps.productImage320 = {};
            // mozapps.productImage156 = {};

            // $.when(mozapps.Utils.canvasImageResize(mozapps.productImage320, 320, 320), mozapps.Utils.canvasImageResize(mozapps.productImage156, 156, 156))
            // .done(function(){            
            //     mozapps.router.navigate("#apps/"+id+"/product-list/add",true);
            // });
        };

        pick.onerror = function () { 
            // console.log("Can't view the image!");
            // console.log(this.error.name + ': ' + this.error);
            // mozapps.router.navigate("#apps/"+id+"/product-list",true);
        };
    },
    ProductList: function(id){
        // console.log(window.location.href)
        var pl = new mozapps.Views.productList({ model: mozapps.appCollection.get(id) });
        pl.appID = id;
        mozapps.appID = id;
        mozapps.currentPage = pl.viewName;
        this.slidePage(
            pl.render()
        );  
    },
    ProductListDetailEdit: function(id, productID){
        // console.log(window.location.href)
        // console.log("product detail edit");
        // console.log(id);
        // console.log(productID);

        mozapps.productID = productID;
        mozapps.appID = id;
        
        var plde = new mozapps.Views.productListDetailEdit();
        plde.appID = id;    //TODO set appID up front, don't set in every view
        mozapps.currentPage = plde.viewName;

        if(productID != "add"){
            console.log(" edit existing");
            plde.model = mozapps.productCollection.get(productID);
            plde.productID = productID;
        }

        this.slidePage(
            plde.render()
        );  
    },
    preview: function(id){
        // console.log(window.location.href)
        var prev = new mozapps.Views.preview({ model: mozapps.appCollection.get(id) });
        prev.appID = id;
        mozapps.appID = id;
        mozapps.currentPage = prev.viewName;

        prev.appCollection = mozapps.appCollection;
        prev.productCollection = mozapps.productCollection;

        this.slidePage(
            prev.render()
        );  
    },
    previewProductDetail: function(id, productID){
        mozapps.productID = productID;
        mozapps.appID = id;

        var prevProductDetail = new mozapps.Views.previewProductDetailView({ model: mozapps.appCollection.get(id) });
        prevProductDetail.appID = id;
        prevProductDetail.productID = productID;
        mozapps.currentPage = prevProductDetail.viewName;

        prevProductDetail.appCollection = mozapps.appCollection;
        prevProductDetail.productCollection = mozapps.productCollection;

        this.slidePage(
            prevProductDetail.render()
        );  
    },
    appBuilderPublishDestination: function(id){
        var publishDestination = new mozapps.Views.appBuilderPublishDestinationView({appID: id, model: mozapps.appCollection.get(id)});
        mozapps.currentPage = publishDestination.viewName;
        publishDestination.appID = id;
        mozapps.appID = id;
        this.slidePage(publishDestination.render());  
    },
    appBuilderPublishMarketplace: function(id){
        var publishMarketplace = new mozapps.Views.appBuilderPublishMarketplaceView({appID: id, model: mozapps.appCollection.get(id)});
        mozapps.currentPage = publishMarketplace.viewName;
        publishMarketplace.appID = id;
        mozapps.appID = id;
        this.slidePage(publishMarketplace.render());  
    },
    appBuilderPublishSubmit: function(id){
        var publishSubmit = new mozapps.Views.appBuilderPublishSubmitView({model: mozapps.appCollection.get(id)});
        mozapps.currentPage = publishSubmit.viewName;
        publishSubmit.appID = id;
        mozapps.appID = id;
        this.slidePage(publishSubmit.render());  
    },
    appBuilderOpenApp: function(id){
        console.log("router open app " + id);
        var openApp = new mozapps.Views.appBuilderPublishOpenAppView({model: mozapps.appCollection.get(id)});
        mozapps.currentPage = openApp.viewName;
        openApp.appID = id;
        mozapps.appID = id;
        this.slidePage(openApp.render());  
    },
    //TODO have sonny look at
    //TODO disable swipe left and right to prevent seeing off center stage pages
    slidePage: function(page) {
        var slideFrom,
            self = this;

        if (!this.currentPage) {
            // If there is no current page (app just started) -> No transition: Position new page in the view port
            $(page.el).attr('class', 'page stage-center');
            $('#appContainer').append(page.el);
            this.pageHistory = [window.location.hash];
            this.currentPage = page;
            return;
        }

        // Cleaning up: remove old pages that were moved out of the viewport
        $('.stage-right, .stage-left').remove();

        if (this.pageHistory.length > 1 && window.location.hash === this.pageHistory[this.pageHistory.length - 2]) {
            // The new page is the same as the previous page -> Back transition
            slideFrom = "left";
            $(page.el).attr('class', 'page stage-left');
            this.pageHistory.pop();
        } else {
            // Forward transition (slide from right)
            slideFrom = "right";
            $(page.el).attr('class', 'page stage-right');
            this.pageHistory.push(window.location.hash);
        }

        $('#appContainer').append(page.el);

        // Wait until the new page has been added to the DOM...
        setTimeout(function() {
            // Slide out the current page: If new page slides from the right -> slide current page to the left, and vice versa
            $(self.currentPage.el).attr('class', 'page transition ' + (slideFrom === "right" ? 'stage-left' : 'stage-right'));
             
         
         
            // Slide in the new page
            $(page.el).attr('class', 'page stage-center transition');
            self.currentPage = page;

            setTimeout(function() {
                var stageLeftObj = $('.stage-left');
                if (stageLeftObj.length > 0) { 
                    //stageLeftObj.addClass('stage-hidden');
                    stageLeftObj.remove();
                }
                var stageRightObj = $('.stage-right');
                if (stageRightObj.length > 0) {  //TODO just call remove on zepto obj
                    //stageRightObj.addClass('stage-hidden');
                    stageRightObj.remove();
                }
            }, 375);  // 375 is harcoded css transition time, transitionend event handler finicky
        });
    }

});

 
