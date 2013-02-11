mozapps.Routers.ApplicationRouter = Backbone.Router.extend({
routes:{
        "":"templates",
        "templates/:id":"templateDetails",
        "apps/:id":"appBuilder",
        "apps/:id/name":"appBuilderName",
        "apps/:id/about":"appBuilderAbout",
        "apps/:id/theme":"appBuilderTheme",
        "apps/:id/icon":"appBuilderIcon",
        "apps/:id/preview":"preview",
        "apps/:id/preview/product/:productID/":"previewProductDetail",
        "apps/:id/publish":"publish",
        "apps/:id/product-list":"ProductList",
        "apps/:id/product-list/:productID":"ProductListDetailEdit",
        "apps/:id/ecommerce":"appBuilderECommerce",
        "apps/:id/publish":"appBuilderPublishDestination",
        "apps/:id/publish/marketplace":"appBuilderPublishMarketplace",
        "apps/:id/publish/marketplace/submit":"appBuilderPublishSubmit",
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
        this.slidePage(mozapps.appBuilderView.render());  
    },
    //TODO should we do new on everypage instead of having several views for life of app (template list, template detail)
    //TODO use switch statement to dispatch app component routes
    appBuilderName: function(id){
        var namePage = new mozapps.Views.appBuilderNameView({model: mozapps.appCollection.get(id)});
        mozapps.currentPage = namePage.viewName;
        namePage.appID = id;
        this.slidePage(namePage.render());  
    },
    appBuilderAbout: function(id){
        var aboutPage = new mozapps.Views.appBuilderAboutView({model: mozapps.appCollection.get(id)});
        mozapps.currentPage = aboutPage.viewName;
        aboutPage.appID = id;
        this.slidePage(aboutPage.render());  
    },
    appBuilderTheme: function(id){
        var theme = new mozapps.Views.appBuilderTheme({model: mozapps.appCollection.get(id)});
        theme.appID = id;
        mozapps.currentPage = theme.viewName;
        
        this.slidePage(theme.render());  
    },
    ProductList: function(id){
        var pl = new mozapps.Views.productList({ model: mozapps.appCollection.get(id) });
        pl.appID = id;
        mozapps.currentPage = pl.viewName;
        this.slidePage(
            pl.render()
        );  
    },
    ProductListDetailEdit: function(id, productID){
        var plde = new mozapps.Views.productListDetailEdit();
        if(productID != "add"){
            plde.model = mozapps.productCollection.get(productID);
        }
        plde.appID = id;
        plde.productID = productID;
        mozapps.currentPage = plde.viewName;
        this.slidePage(
            plde.render()
        );  
    },
    preview: function(id){
        var prev = new mozapps.Views.preview({ model: mozapps.appCollection.get(id) });
        prev.appID = id;
        mozapps.currentPage = prev.viewName;
        this.slidePage(
            prev.render()
        );  
    },
    previewProductDetail: function(id, productID){
        var prevProductDetail = new mozapps.Views.previewProductDetailView({ model: mozapps.appCollection.get(id) });
        prevProductDetail.appID = id;
        prevProductDetail.productID = productID;
        mozapps.currentPage = prevProductDetail.viewName;
        this.slidePage(
            prevProductDetail.render()
        );  
    },
    publish: function(id){
        var pub = new mozapps.Views.publish({ model: mozapps.appCollection.get(id) });
        pub.appID = id;
        mozapps.currentPage = pub.viewName;
        this.slidePage(
            pub.render()
        );  
    },
    appBuilderPublishDestination: function(id){
        var publishDestination = new mozapps.Views.appBuilderPublishDestinationView({appID: id, model: mozapps.appCollection.get(id)});
        mozapps.currentPage = publishDestination.viewName;
        publishDestination.appID = id;
        this.slidePage(publishDestination.render());  
    },
    appBuilderPublishMarketplace: function(id){
        var publishMarketplace = new mozapps.Views.appBuilderPublishMarketplaceView({appID: id, model: mozapps.appCollection.get(id)});
        mozapps.currentPage = publishMarketplace.viewName;
        publishMarketplace.appID = id;
        this.slidePage(publishMarketplace.render());  
    },
    appBuilderPublishSubmit: function(id){
        var publishSubmit = new mozapps.Views.appBuilderPublishSubmitView({appID: id, model: mozapps.appCollection.get(id)});
        mozapps.currentPage = publishSubmit.viewName;
        publishSubmit.appID = id;
        this.slidePage(publishSubmit.render());  
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
                    stageLeftObj.addClass('stage-hidden');
                }
                var stageRightObj = $('.stage-right');
                if (stageRightObj.length > 0) {
                    stageRightObj.addClass('stage-hidden');
                }
            }, 375);  // 375 is harcoded css transition time, transitionend event handler finicky
        });
    }
});