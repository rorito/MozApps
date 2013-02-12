Handlebars.registerHelper('templateListViewHelper', function(items, options) {
  var out = "";
  var count = 0;
  var tempImgUrl = "styles/temp/template_icon_store.png";
  var initItemString = " checked";
  
  for (var key in items) {
    count++;
    if(count > 1) {
      initItemString = "";
    }

    out += "<li><input id='item-" + count + "' type='radio' name='radio' " + initItemString + ">"
    + "<label for='item-" + count + "' class='list-item'>"+ key + "</label>";
    out += "<div id='" + key.toString().replace(" ","") + "Body' class='list-item-body'><ul class='horizontal-list'>";
    var templatesCategories = items[key];
    templatesCategories.forEach(function(element, index, array){
      out += "<li class='list-item'><a href='#templates/" + element.id + "'>" + 
      "<img src=" + tempImgUrl + " class='template-thumbnail'><span>"
      + element.name + "</span></a></li>";  
    });
    out += "</ul></div></li>";
  }
  return out;
});

Handlebars.registerHelper('themeSelectHelper', function(themes, selectedTheme, options) {   
    var out = "<ul>";

    themes.forEach(function(element, index, array){
        if(element.themeID == selectedTheme){
            out += "<li><label><input type='radio' name='themeRadioGroup' value='"+element.themeID+"' checked='checked'><img src='" + element.themeImg + "' />"+element.themeName+"</label></li>";
        } else {
            out += "<li><label><input type='radio' name='themeRadioGroup' value='"+element.themeID+"'><img src='" + element.themeImg + "' />"+element.themeName+"</label></li>";
        }
    });
    out += "</ul>";

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






/* Handlebars Helpers - Dan Harper (http://github.com/danharper) */

/* This program is free software. It comes without any warranty, to
 * the extent permitted by applicable law. You can redistribute it
 * and/or modify it under the terms of the Do What The Fuck You Want
 * To Public License, Version 2, as published by Sam Hocevar. See
 * http://sam.zoy.org/wtfpl/COPYING for more details. */


/*

Equals
If x Equals y

{{#if_eq x compare=y}} ... {{/if_eq}}

Unless x Equals y

{{#unless_eq x compare=y}} ... {{/unless_eq}}

Greater Than
If x > y

{{#if_gt x compare=y}} ... {{/if_gt}}

Unless x > y

{{#unless_gt x compare=y}} ... {{/unless_gt}}

Greater Than or Equal To
If x >= y

{{#if_gteq x compare=y}} ... {{/if_gteq}}

Unless x >= y

{{#unless_gteq x compare=y}} ... {{/unless_gteq}}

Less Than
If x < y

{{#if_lt x compare=y}} ... {{/if_lt}}

Unless x < y

{{#unless_lt x compare=y}} ... {{/unless_lt}}

Less Than or Equal To
If x <= y

{{#if_lteq x compare=y}} ... {{/if_lteq}}

Unless x <= y

{{#unless_lteq x compare=y}} ... {{/unless_lteq}}

nl2br
Convert new lines (\r\n, \n\r, \r, \n) to line breaks

{{nl2br description}}

*/


/**
 * If Equals
 * if_eq this compare=that
 */
Handlebars.registerHelper('if_eq', function(context, options) {
  if (context == options.hash.compare)
    return options.fn(this);
  return options.inverse(this);
});

/**
 * Unless Equals
 * unless_eq this compare=that
 */
Handlebars.registerHelper('unless_eq', function(context, options) {
  if (context == options.hash.compare)
    return options.inverse(this);
  return options.fn(this);
});


/**
 * If Greater Than
 * if_gt this compare=that
 */
Handlebars.registerHelper('if_gt', function(context, options) {
  if (context > options.hash.compare)
    return options.fn(this);
  return options.inverse(this);
});

/**
 * Unless Greater Than
 * unless_gt this compare=that
 */
Handlebars.registerHelper('unless_gt', function(context, options) {
  if (context > options.hash.compare)
    return options.inverse(this);
  return options.fn(this);
});


/**
 * If Less Than
 * if_lt this compare=that
 */
Handlebars.registerHelper('if_lt', function(context, options) {
  if (context < options.hash.compare)
    return options.fn(this);
  return options.inverse(this);
});

/**
 * Unless Less Than
 * unless_lt this compare=that
 */
Handlebars.registerHelper('unless_lt', function(context, options) {
  if (context < options.hash.compare)
    return options.inverse(this);
  return options.fn(this);
});


/**
 * If Greater Than or Equal To
 * if_gteq this compare=that
 */
Handlebars.registerHelper('if_gteq', function(context, options) {
  if (context >= options.hash.compare)
    return options.fn(this);
  return options.inverse(this);
});

/**
 * Unless Greater Than or Equal To
 * unless_gteq this compare=that
 */
Handlebars.registerHelper('unless_gteq', function(context, options) {
  if (context >= options.hash.compare)
    return options.inverse(this);
  return options.fn(this);
});


/**
 * If Less Than or Equal To
 * if_lteq this compare=that
 */
Handlebars.registerHelper('if_lteq', function(context, options) {
  if (context <= options.hash.compare)
    return options.fn(this);
  return options.inverse(this);
});

/**
 * Unless Less Than or Equal To
 * unless_lteq this compare=that
 */
Handlebars.registerHelper('unless_lteq', function(context, options) {
  if (context <= options.hash.compare)
    return options.inverse(this);
  return options.fn(this);
});

/**
 * Convert new line (\n\r) to <br>
 * from http://phpjs.org/functions/nl2br:480
 */
Handlebars.registerHelper('nl2br', function(text) {
  var nl2br = (text + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + '<br>' + '$2');
  return new Handlebars.SafeString(nl2br);
});