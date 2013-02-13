smallstore.Routers.ApplicationRouter = Backbone.Router.extend({
routes:{
        "":"home",
        "product/:productID":"productDetail",
        "*path":  "home"
    },
    initialize: function() {
        // Keep track of the history of pages (we only store the page URL). Used to identify the direction
        // (left or right) of the sliding transition between pages.
        this.pageHistory = [];
    },
    home: function(){
        console.log("productDetail")
        console.log(window.location.href);

        this.slidePage(
            smallstore.homeView.render()
        );  
    },
    productDetail: function(productID){
        console.log("productDetail")
        console.log(window.location.href); 
        
        smallstore.productDetailView.productID = productID;

        this.slidePage(
            smallstore.productDetailView.render()
        );  
    },
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

 
