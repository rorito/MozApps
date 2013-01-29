//Deferred.installInto(Zepto);

window.mozapps = window.mozapps || {
  Models: {},
  Collections: {},
  Views: {},
  Routers: { /*mozRouter : new ApplicationRouter() */ },
  Utils: {},
  currentPage: {},
  // dataComplete: {
  //     templatesComplete: false,
  //     appsComplete: false,
  //     complete: false
  // },

  fetchKinveyData: function(){
    //console.log("kinvey fetch - start");

    window.MozAppsKinvey.MozAppTemplateCollection.fetch({
        success: function(data) {
            //console.log("kinvey template collection fetch - success");
        },
        error: function(e) {
        },
        complete: function(data){
          //mozapps.dataComplete.templatesComplete = true;
          //TODO handle offline case and load fixture data
        }
    });

    window.MozAppsKinvey.MozAppCollection.fetch({
        success: function(data) {
            //console.log("kinvey app collection fetch - success");
        },
        error: function(e) {
        },
        complete: function(data){
          //mozapps.dataComplete.appsComplete = true;
        }
    });

      // Object.observe(mozapps.dataComplete, function(){
      //   if(mozapps.dataComplete.templatesComplete && mozapps.dataComplete.appsComplete){
      //     mozapps.dataComplete.complete = true;
      //   }
      // });

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

    //var myScroll = new iScroll('iscroll', { hScroll: true, vScroll: false, hScrollbar: false, vScrollbar: false });

  }
};

$(document).ready(function(){
  window.mozapps.init();
});

Handlebars.registerHelper('templateListViewHelper', function(items, options) {
  var out = "";
  var tempImgUrl = "styles/temp/template_icon_store.png";
  for (var key in items) {
    console.log("I am a key: " + key);
    out += "<li><h3 class='list-item'>"+ key + "</h3>";
    out += "<div class='list-item-body'><ul class='horizontal-list'>";
    var templatesCategories = items[key];
    templatesCategories.forEach(function(element, index, array){
      //console.log(element.name);
      out += "<li class='list-item'>" + 
      "<img src=" + tempImgUrl + " class='template-thumbnail'><span>"
      + element.name + "<span></li>";  
    });
    out += "</ul></div></li>";
  }
  return out;
});


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

