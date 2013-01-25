window.mozapps = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  init: function() {
    console.log('Hello from Backbone!');
  }
};

$(document).ready(function(){
  mozapps.init();
  // temp will move to view render
  var myScroll = new iScroll('iscroll', { hScroll: true, vScroll: false, hScrollbar: false, vScrollbar: false });

});