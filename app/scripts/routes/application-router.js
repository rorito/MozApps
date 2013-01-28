mozapps.Routers.ApplicationRouter = Backbone.Router.extend({
routes:{
        "":"templates",
        "templates/:id":"templateDetails",
        "apps/:id":"appBuilder",
        "apps/create/:id":"appBuilderCreate",
        "*path":  "templates"
    },
    initialize: function() {
        var self = this;

        // Keep track of the history of pages (we only store the page URL). Used to identify the direction
        // (left or right) of the sliding transition between pages.
        this.pageHistory = [];

        // Check of browser supports touch events...
        if (document.documentElement.hasOwnProperty('ontouchstart')) {
            // ... if yes: register touch event listener to change the "selected" state of the item
            $('#content').on('touchstart', 'a', function(event) {
                self.selectItem(event);
            });
            $('#content').on('touchend', 'a', function(event) {
                self.deselectItem(event);
            });
        } else {
            // ... if not: register mouse events instead
            $('#content').on('mousedown', 'a', function(event) {
                self.selectItem(event);
            });
            $('#content').on('mouseup', 'a', function(event) {
                self.deselectItem(event);
            });
        }
    },

    selectItem: function(event) {
        $(event.target).addClass('tappable-active');
    },

    deselectItem: function(event) {
        $(event.target).removeClass('tappable-active');
    },

    templates: function(){
        var self = this;

        mozapps.currentPage = mozapps.tmplListView;
        self.slidePage(
            mozapps.tmplListView.render()
        );
    },

    templateDetails: function(id){
        var self = this;
        mozapps.currentPage = mozapps.tmplDetailView;
        mozapps.tmplDetailView.templateID = id;
        self.slidePage(mozapps.tmplDetailView.render());
    },

    appBuilder: function(id){
        console.log("app builder");
        var self = this;
        mozapps.currentPage = mozapps.appBuilderView;
        mozapps.appID = id;
        self.slidePage(mozapps.appBuilderView.render());  
    },

    appBuilderCreate: function(id){
        var self = this;
        mozapps.currentPage = mozapps.appBuilderCreateView;
        mozapps.appBuilderCreateView.templateID = id;

        //TODO will calling this new each time create more unbound Observers?
        mozapps.appBuilderCreateView.processAppCreation();
    },

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
        });
    }

});