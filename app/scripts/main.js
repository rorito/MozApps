//Deferred.installInto(Zepto);

window.mozapps = window.mozapps || {
  Models: {},
  Collections: {},
  Views: {},
  Routers: { /*mozRouter : new ApplicationRouter() */ },
  Utils: {},
  currentPage: {},
  fetchKinveyData: function(){
    console.log("kinvey fetch - start");
    window.MozAppsKinvey.MozAppTemplateCollection.fetch({
        success: function(data) {
            console.log("kinvey template collection fetch - success");
        },
        error: function(e) {
        },
        complete: function(data){
        }
    });

    window.MozAppsKinvey.MozAppCollection.fetch({
        success: function(data) {
            console.log("kinvey app collection fetch - success");
        },
        error: function(e) {
        },
        complete: function(data){
        }
    });

  },
  init: function() {
    //mozapps.tmplCollection = new mozapps.Collections.TemplateCollection();

    mozapps.fetchKinveyData();

    //mozapps.tmplListView = new mozapps.Views.templatesListView({ collection: mozapps.tmplCollection });
    //mozapps.tmplDetailView = new mozapps.Views.templateDetailView({ collection: mozapps.tmplCollection });

    mozapps.tmplListView = new mozapps.Views.templatesListView();
    mozapps.tmplDetailView = new mozapps.Views.templateDetailView();
    mozapps.appBuilderCreateView = new mozapps.Views.appBuilderCreateView();
    mozapps.appBuilderView = new mozapps.Views.appBuilderView();
    mozapps.router = new mozapps.Routers.ApplicationRouter(); 
    Backbone.history.start(); //{ pushState: true, root: mozapps.root }
  }
};

$(document).ready(function(){
  window.mozapps.init();
});

function isVis(ele) {
    if(ele.css('display')!='hidden' && ele.css('visibility')!='hidden' && ele.height()>0) {
        return(true);
    } else {
        return(false);
    }
}

Handlebars.registerHelper("debug", function(optionalValue) { 
  console.log("Current Context"); 
  console.log("===================="); 
  console.log(this);   
  if (optionalValue) {
    console.log("Value"); 
    console.log("===================="); 
    console.log(optionalValue); 
  } 
});

