mozapps.Routers.ApplicationRouter = Backbone.Router.extend({
routes:{
        "":"templates",
        "templates/:id":"templateDetails",
        "apps/:id":"appBuilder",
        "apps/:id/name":"appBuilderName",
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
    appBuilderName: function(id){
        var namePage = new mozapps.Views.appBuilderNameView({appID: id, model: mozapps.appCollection.get(id)});
        mozapps.currentPage = namePage.viewName;
        this.slidePage(namePage.render());  
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
        });
    }

});