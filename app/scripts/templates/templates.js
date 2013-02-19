(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['appBuilderAboutTemplate'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers; data = data || {};
  var stack1, stack2, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  
  return "\n    <h1>Loading...</h1>\n";}

function program3(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n    <!-- represents application screen APP BUILDER NAME -->\n    <div id=\"appBuilderAbout\" role=\"window\">\n        <!-- title bar region -->\n        <section role=\"region\" data-type=\"header\">\n            <header>\n                <button id=\"back\"><span class=\"icon icon-back\">back</span></button>\n                <menu type=\"toolbar\">\n                <button id=\"aboutFormDone\">Done</button>\n                </menu>\n                <h1>About Me</h1>\n            </header>\n        </section>\n\n        <!-- content region -->\n        <section role=\"region\" data-type=\"content\" class=\"box-padded-small\">\n            <div class=\"grey-box\">\n                <form id=\"aboutForm\">\n                    <p>\n                        <label class=\"label-padded label-upper\">Description</label>\n                        <textarea rows=\"4\" id=\"description\">";
  foundHelper = helpers.description;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.description; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "</textarea>\n                    </p>\n                    <p>\n                        <label class=\"label-padded label-upper\">Address</label>\n                        <input type=\"text\" id=\"address\" value=\"";
  foundHelper = helpers.address;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.address; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "\">\n                    </p>\n                    <p>\n                        <label class=\"label-padded label-upper\">Phone Number</label>\n                        <input type=\"text\" id=\"phone\" value=\"";
  foundHelper = helpers.phone;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.phone; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "\">\n                    </p>\n                    <p>\n                        <label class=\"label-padded label-upper\">Email</label>\n                        <input type=\"text\" id=\"email\" value=\"";
  foundHelper = helpers.email;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.email; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "\">\n                    </p>\n                </form>\n            </div>\n        </section>\n\n        <!-- footer region -->\n        <section role=\"region\" data-type=\"footer\">\n            <footer></footer>\n        </section>\n    </div>\n";
  return buffer;}

  stack1 = depth0.loading;
  stack2 = {};
  stack1 = helpers['if'].call(depth0, stack1, {hash:stack2,inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }});
templates['appBuilderNameViewTemplate'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers; data = data || {};
  var stack1, stack2, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  
  return "\n    <h1>Loading...</h1>\n";}

function program3(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n    <!-- represents application screen APP BUILDER NAME -->\n    <div id=\"appBuilderName\" role=\"window\">\n        <!-- title bar region -->\n        <section role=\"region\" data-type=\"header\">\n            <header>\n                <button id=\"back\"><span class=\"icon icon-back\">back</span></button>\n                <menu type=\"toolbar\">\n                    <button id=\"nameFormDone\">Done</button>\n                </menu>\n                <h1>Name Your App</h1>\n            </header>\n        </section>\n\n        <!-- content region -->\n        <section role=\"region\" data-type=\"content\" class=\"box-padded-small\">\n\n            <div class=\"grey-box\">\n                <form id=\"nameForm\">\n                    <label for=\"nameField\" class=\"label-padded label-upper\">App Name</label>\n                    <input id=\"nameField\" name=\"nameField\" type=\"text\" value=\"";
  foundHelper = helpers.name;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "\" />\n                </form>\n            </div>\n\n        </section>\n\n        <!-- footer region -->\n        <section role=\"region\" data-type=\"footer\">\n            <footer></footer>\n        </section>\n    </div>\n";
  return buffer;}

  stack1 = depth0.loading;
  stack2 = {};
  stack1 = helpers['if'].call(depth0, stack1, {hash:stack2,inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }});
templates['appBuilderPublishDestinationTemplate'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers; data = data || {};
  var stack1, stack2, self=this;

function program1(depth0,data) {
  
  
  return "\n                <h1>Loading...</h1>\n            ";}

function program3(depth0,data) {
  
  
  return "\n                <!-- represents application screen APP PUBLISH DESTINATION -->\n                <div id=\"appBuilderPublishDestination\" role=\"window\">\n                    <!-- title bar region -->\n                    <section role=\"region\" data-type=\"header\">\n                        <header>\n                            <button id=\"back\"><span class=\"icon icon-back\">back</span></button>\n                            <h1>Publish</h1>\n                        </header>\n                    </section>\n\n                    <!-- content region -->\n                    <section role=\"region\" data-type=\"content\" class=\"box-padded\">\n                        <h2>Where do you want to publish you app?</h2>\n                        <div>\n                            <button id=\"publishMarketplace\">Firefox Marketplace</button>\n                        </div>\n                        <div>\n                            <button id=\"publishServer\" disabled=\"\">On a different server</button>\n                        </div>\n                    </section>\n\n                    <!-- footer region -->\n                    <section role=\"region\" data-type=\"footer\">\n                    <footer></footer>\n                    </section>\n                </div>\n            ";}

  stack1 = depth0.loading;
  stack2 = {};
  stack1 = helpers['if'].call(depth0, stack1, {hash:stack2,inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }});
templates['appBuilderPublishMarketplaceTemplate'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers; data = data || {};
  var stack1, stack2, self=this;

function program1(depth0,data) {
  
  
  return "\n                <h1>Loading...</h1>\n            ";}

function program3(depth0,data) {
  
  
  return "\n                <!-- represents application screen APP PUBLISH MARKETPLACE LOGIN -->\n                <div id=\"appBuilderPublishMarketplace\" role=\"window\">\n                    <!-- title bar region -->\n                    <section role=\"region\" data-type=\"header\">\n                        <header>\n                            <button id=\"back\"><span class=\"icon icon-back\">back</span></button>\n                            <h1>Publish</h1>\n                        </header>\n                    </section>\n\n                    <!-- content region -->\n                    <section role=\"region\" data-type=\"content\" class=\"box-padded\">\n                        <h2>Log into Firefox Marketplace</h2>\n                        <p>\n                            <label class=\"label-dark\">User name</label>\n                            <input type=\"text\" id=\"username\" value=\"Thatsmyname22\">\n                        </p>\n                        <p>\n                            <label class=\"label-dark\">Password</label>\n                            <input type=\"password\" id=\"password\" value=\"\">\n                        </p>\n                        <p>\n                            <a href=\"#\">I forgot my user name or password</>\n                        </p>\n                        <p>\n                            <button id=\"publishLogIn\">Log in</button>\n                        </p>\n                        <p>\n                            <a href=\"#\">Register</a> for Firefox Marketplace\n                        </p>\n                    </section>\n\n                    <!-- footer region -->\n                    <section role=\"region\" data-type=\"footer\">\n                    <footer></footer>\n                    </section>\n                </div>\n            ";}

  stack1 = depth0.loading;
  stack2 = {};
  stack1 = helpers['if'].call(depth0, stack1, {hash:stack2,inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }});
templates['appBuilderPublishSumbitTemplate'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers; data = data || {};
  var stack1, stack2, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  
  return "\n    <h1>Loading...</h1>\n";}

function program3(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n    <!-- represents application publish uploading screen\n    APPLICATION BUILDER PUBLISH SUBMIT -->\n    <div id=\"appBuilderPublishSubmit\" class=\"dark-bg\" role=\"window\">\n        <!-- content region -->\n        <section role=\"region\" data-type=\"content\" class=\"box-padded-small\">\n            <section role=\"region\" data-type=\"header\" class=\"medium-bg round-corners box-padded\">\n                <div class=\"load-status\">\n                <h2>Publishing</h2>\n                <h3>";
  foundHelper = helpers.name;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "</h3>    \n                </div>\n            </section>\n            <section role=\"region\" data-type=\"detail\" class=\"box-padded\">\n                <h4>Building in html...</h4>\n                <div class=\"scroll-window\">\n                    <pre id=\"publishMarkupContainer\">\n                    </pre>\n                </div>\n            </section>\n        </section>\n    </div>\n";
  return buffer;}

  stack1 = depth0.loading;
  stack2 = {};
  stack1 = helpers['if'].call(depth0, stack1, {hash:stack2,inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }});
templates['appBuilderThemeTemplate'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers; data = data || {};
  var stack1, stack2, functionType="function", escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  
  return "\n    <h1>Loading...</h1>\n";}

function program3(depth0,data) {
  
  var buffer = "", stack1, stack2, stack3, foundHelper;
  buffer += "\n    <!-- represents application screen APP PUBLISH DESTINATION -->\n    <div id=\"appBuilderThemePicker\" role=\"window\">\n        <!-- title bar region -->\n        <section role=\"region\" data-type=\"header\">\n            <header>\n                <button id=\"back\"><span class=\"icon icon-back\">back</span></button>\n                <menu type=\"toolbar\">\n                    <button id=\"themeFormDone\">Done</button>\n                </menu>\n                <h1>Choose Theme</h1>\n            </header>\n        </section>\n        <!-- content region -->\n        <section role=\"region\" data-type=\"content\">\n            <section role=\"region\" data-type=\"detail\" class=\"template-detail box-padded-small\">\n                <h1>Personalize your colors.</h1>\n                <div class=\"light-bg round-corners box-padded-super-thin\">\n                <h2>THEMES</h2>\n                ";
  stack1 = depth0.selectedTheme;
  stack2 = depth0.themes;
  stack3 = {};
  foundHelper = helpers.themeSelectHelper;
  stack1 = foundHelper ? foundHelper.call(depth0, stack2, stack1, {hash:stack3,inverse:self.noop,fn:self.program(4, program4, data),data:data}) : helperMissing.call(depth0, "themeSelectHelper", stack2, stack1, {hash:stack3,inverse:self.noop,fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                </div>\n            </section>\n        </section>\n    </div>\n";
  return buffer;}
function program4(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                    ";
  stack1 = typeof depth0 === functionType ? depth0.apply(depth0) : depth0;
  buffer += escapeExpression(stack1) + "\n                ";
  return buffer;}

  stack1 = depth0.loading;
  stack2 = {};
  stack1 = helpers['if'].call(depth0, stack1, {hash:stack2,inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }});
templates['appBuilderViewTemplate'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, stack2, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  
  return "\n    <h1>Loading...</h1>\n";}

function program3(depth0,data) {
  
  var buffer = "", stack1, stack2, foundHelper;
  buffer += "\n    <!-- represents application screen\n    APP BUILDER -->\n    <div id=\"appBuilder\" role=\"window\">\n        <!-- title bar region -->\n        <section role=\"region\" data-type=\"header\">\n            <header>\n                <button id=\"back\"><span class=\"icon icon-back\">back</span></button>\n                <h1>App Builder</h1>\n            </header>\n        </section>\n\n        <!-- content region -->\n        <section role=\"region\" data-type=\"content\">\n            <section role=\"region\" data-type=\"detail\" class=\"template-detail cf box-padded-small-custom\">\n                <h1>";
  foundHelper = helpers.name;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "</h1>\n                <div><img src=\"";
  foundHelper = helpers.imgSmallPath;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.imgSmallPath; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "\" class=\"template-thumbnail-small\"></div>\n                <div>\n                    <button id=\"appBuilderPreview\" class=\"\">Preview</button>\n                    <button id=\"appBuilderPublish\" class=\"recommend\">Publish</button>\n                </div>\n            </section>\n            <section role=\"region\" data-type=\"list\">\n                <header class=\"list-header\">Edit components</header>\n                <ul data-type=\"edit\" class=\"components-list\">\n                ";
  stack1 = depth0.app_components;
  stack2 = {};
  stack1 = helpers.each.call(depth0, stack1, {hash:stack2,inverse:self.noop,fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                </ul>\n            </section>\n        </section>\n\n        <!-- footer region -->\n        <section role=\"region\" data-type=\"footer\">\n            <footer></footer>\n        </section>\n    </div>\n";
  return buffer;}
function program4(depth0,data) {
  
  var buffer = "", stack1, stack2, foundHelper;
  buffer += "\n                    <li>\n                    ";
  stack1 = depth0.is_enabled;
  stack2 = {};
  stack1 = helpers['if'].call(depth0, stack1, {hash:stack2,inverse:self.program(7, program7, data),fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                        <p>";
  stack1 = depth0.description;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "</p>\n                        <button id=\"";
  foundHelper = helpers.component_id;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.component_id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "\" ";
  stack1 = depth0.completed;
  stack2 = {};
  stack1 = helpers['if'].call(depth0, stack1, {hash:stack2,inverse:self.noop,fn:self.program(9, program9, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "></button>\n                    </li>\n                ";
  return buffer;}
function program5(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                        <p>";
  stack1 = depth0.component_name;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "</p>\n                    ";
  return buffer;}

function program7(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                        <p class=\"disabled-text\">";
  stack1 = depth0.component_name;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "</p>\n                    ";
  return buffer;}

function program9(depth0,data) {
  
  
  return "class=\"complete\"";}

  stack1 = depth0.loading;
  stack2 = {};
  stack1 = helpers['if'].call(depth0, stack1, {hash:stack2,inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  return buffer;});
templates['appViewProductDetailTemplate'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers; data = data || {};
  var stack1, stack2, functionType="function", escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  
  return "\n    <h1>Loading...</h1>\n";}

function program3(depth0,data) {
  
  var buffer = "", stack1, stack2, foundHelper;
  buffer += "\n    <!-- represents application template screen, prefixed appTmpl\n    APPLICATION PRODUCT DETAIL with PREVIEW -->\n    <div id=\"appViewProductDetail\" role=\"window\" class=\"";
  foundHelper = helpers.theme;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.theme; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "\">\n        ";
  stack1 = depth0.dontShowBackButton;
  stack2 = {};
  stack1 = helpers['if'].call(depth0, stack1, {hash:stack2,inverse:self.program(6, program6, data),fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        <!-- title bar region -->\n        <section role=\"region\" data-type=\"header\">\n            <header>\n                <button id=\"back\"><span class=\"icon icon-back\">back</span></button>\n                <menu type=\"toolbar\">\n                  <button><span class=\"icon icon-cart\">cart</span></button>\n                </menu>\n                <h1>";
  stack1 = depth0.model;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.name;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "</h1>\n            </header>\n        </section>\n\n        <!-- content region -->\n        <section role=\"region\" data-type=\"content\" class=\"fade\">\n            <section role=\"region\" data-type=\"detail\" class=\"template-detail\">\n            ";
  stack1 = depth0.product;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.attributes;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.imgStorageType;
  stack2 = {};
  stack2['compare'] = "devicestorage";
  foundHelper = helpers.if_eq;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, {hash:stack2,inverse:self.program(10, program10, data),fn:self.program(8, program8, data),data:data}) : helperMissing.call(depth0, "if_eq", stack1, {hash:stack2,inverse:self.program(10, program10, data),fn:self.program(8, program8, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            </section>\n            <footer>\n            <h2>\n                <span>";
  stack1 = depth0.product;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.attributes;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.name;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "</span>\n                <button class=\"buy\">Add to cart</button>\n            </h2>\n            <h2>";
  stack1 = depth0.product;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.attributes;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.price;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "</h2>\n            <p>";
  stack1 = depth0.product;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.attributes;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.description;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "</p>\n            </footer>\n        </section>\n\n        <!-- footer region -->\n        <section role=\"region\" data-type=\"footer\">\n            <footer></footer>\n        </section>\n    </div>\n\n";
  return buffer;}
function program4(depth0,data) {
  
  
  return "\n        ";}

function program6(depth0,data) {
  
  
  return "\n            <section role=\"region\" data-type=\"outer-chrome\" class=\"outer-chrome\">\n                <button id=\"exitPreview\">Exit Preview</button>\n            </section>\n        ";}

function program8(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                <div id=\"img-container-";
  stack1 = depth0.product;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.attributes;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.id;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\"></div>\n            ";
  return buffer;}

function program10(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                <img src=\"";
  stack1 = depth0.product;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.attributes;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.imgLargePath;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "\" class=\"img-detail\"/>\n            ";
  return buffer;}

  stack1 = depth0.loading;
  stack2 = {};
  stack1 = helpers['if'].call(depth0, stack1, {hash:stack2,inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }});
templates['appViewTemplate'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers; data = data || {};
  var stack1, stack2, functionType="function", escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing, blockHelperMissing=helpers.blockHelperMissing;

function program1(depth0,data) {
  
  
  return "\n    <h1>Loading...</h1>\n";}

function program3(depth0,data) {
  
  var buffer = "", stack1, stack2, foundHelper;
  buffer += "\n    <!-- represents application template screen, prefixed appTmpl APPLICATION with PREVIEW -->\n    <div id=\"appView\" role=\"window\" class=\"";
  foundHelper = helpers.theme;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.theme; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "\">\n        ";
  stack1 = depth0.dontShowBackButton;
  stack2 = {};
  stack1 = helpers['if'].call(depth0, stack1, {hash:stack2,inverse:self.program(6, program6, data),fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        <!-- title bar region -->\n        <section role=\"region\" data-type=\"header\">\n            <header>\n                <menu type=\"toolbar\">\n                    <button><span class=\"icon icon-cart\">cart</span></button>\n                </menu>\n                <h1>";
  stack1 = depth0.model;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.name;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "</h1>\n            </header>\n        </section>\n\n        <!-- content region -->\n        <section role=\"region\" data-type=\"content\" class=\"fade\">\n            <section role=\"region\" data-type=\"detail\" class=\"template-detail box-padded\">\n                <!-- TODO: check if id needs to be unique on app level -->\n                <div id=\"productCarousel\" class=\"carousel\">\n                    <div>\n\n                        <ul>\n                        ";
  foundHelper = helpers.products;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},inverse:self.noop,fn:self.program(8, program8, data),data:data}); }
  else { stack1 = depth0.products; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  stack2 = {};
  if (!helpers.products) { stack1 = blockHelperMissing.call(depth0, stack1, {hash:stack2,inverse:self.noop,fn:self.program(8, program8, data),data:data}); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                        </ul>\n                    </div>\n                </div>\n                <div>\n                    <h2 id=\"product-name\">";
  stack1 = depth0.selectedProduct;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.name;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "</h2>\n                    <h3 id=\"product-price\">";
  stack1 = depth0.selectedProduct;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.price;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "</h3>\n                </div>\n                <div><button class=\"buy\">Add to cart</button></div>\n            </section>\n            <footer>\n            ";
  stack1 = depth0.about;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.completed;
  stack2 = {};
  stack1 = helpers['if'].call(depth0, stack1, {hash:stack2,inverse:self.noop,fn:self.program(11, program11, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            </footer>\n        </section>\n\n        <!-- footer region -->\n        <section role=\"region\" data-type=\"footer\">\n            <footer></footer>\n        </section>\n    </div>\n\n";
  return buffer;}
function program4(depth0,data) {
  
  
  return "\n        ";}

function program6(depth0,data) {
  
  
  return "\n            <section role=\"region\" data-type=\"outer-chrome\" class=\"outer-chrome\">\n                <button id=\"back\">Exit Preview</button>\n            </section>\n        ";}

function program8(depth0,data) {
  
  var buffer = "", stack1, stack2, foundHelper;
  buffer += "\n                           <li productID=\"";
  stack1 = depth0.id;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "\" class=\"";
  stack1 = depth0.className;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "\">\n                                <label id=\"label-";
  stack1 = depth0.id;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "\">\n                                    <input type=\"radio\" name=\"carousel-group\" />\n                                ";
  stack1 = depth0.imgStorageType;
  stack2 = {};
  stack2['compare'] = "package";
  foundHelper = helpers.if_eq;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, {hash:stack2,inverse:self.noop,fn:self.program(9, program9, data),data:data}) : helperMissing.call(depth0, "if_eq", stack1, {hash:stack2,inverse:self.noop,fn:self.program(9, program9, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                                </label>\n                            </li>\n                        ";
  return buffer;}
function program9(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                                    <img src=\"";
  stack1 = depth0.imgSmallPath;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "\" />\n                                ";
  return buffer;}

function program11(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                <h2>About ";
  stack1 = depth0.model;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.name;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "</h2>\n                <p>";
  stack1 = depth0.about;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.properties;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.description;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "</p>\n                <p>";
  stack1 = depth0.about;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.properties;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.address;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "</p>\n                <!-- always the same image -->\n                <p><img src=\"imgs/products/productDetailMap.jpg\" /></p>\n                <p>";
  stack1 = depth0.about;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.properties;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.email;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "</p>\n                <p>";
  stack1 = depth0.about;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.properties;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.phone;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "</p>\n                <!-- TODO: add social icon -->\n            ";
  return buffer;}

  stack1 = depth0.loading;
  stack2 = {};
  stack1 = helpers['if'].call(depth0, stack1, {hash:stack2,inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }});
templates['fake-markup'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers; data = data || {};
  


  return "&lt;html&gt;\n\n'&lt;head&gt;\n  &lt;meta charset='utf-8'&gt;\n  &lt;meta http-equiv='X-UA-Compatible' content='IE=edge,chrome=1'&gt;\n  &lt;title&gt;&lt;/title&gt;\n  &lt;meta name='description' content=''&gt;\n  &lt;meta name='viewport' content='width=device-width, initial-scale=1.0, maximum-scale=1.0'&gt;\n  &lt;meta name='apple-mobile-web-app-capable' content='yes'&gt;\n  &lt;link rel='stylesheet' href='styles/main.css'&gt;\n  &lt;!-- temp, for live refresh dev --&gt;\n  &lt;style&gt;\n    #templateList, #templateDetail, #appBuilderEditIcon, #appBuilder, #productList, #productListEdit, #productAddImage, #productDetailView, #productDetailEdit, #appView, appBuilderPublishSubmit, #leftNav{\n      display: none;\n    }\n  &lt;/style&gt;\n\n&lt;style type='text/css' charset='utf-8'&gt;/* See license.txt for terms of usage */\n/** reset styling **/\n.firebugResetStyles {\n    z-index: 2147483646 !important;\n    top: 0 !important;\n    left: 0 !important;\n    display: block !important;\n    border: 0 none !important;\n    margin: 0 !important;\n    padding: 0 !important;\n    outline: 0 !important;\n    min-width: 0 !important;\n    max-width: none !important;\n    min-height: 0 !important;\n    max-height: none !important;\n    position: fixed !important;\n    transform: rotate(0deg) !important;\n    transform-origin: 50% 50% !important;\n    border-radius: 0 !important;\n    box-shadow: none !important;\n    background: transparent none !important;\n    pointer-events: none !important;\n    white-space: normal !important;\n}\n\n.firebugBlockBackgroundColor {\n    background-color: transparent !important;\n}\n\n.firebugResetStyles:before, .firebugResetStyles:after {\n    content: '' !important;\n}\n/**actual styling to be modified by firebug theme**/\n.firebugCanvas {\n    display: none !important;\n}\n\n/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */\n.firebugLayoutBox {\n    width: auto !important;\n    position: static !important;\n}\n\n.firebugLayoutBoxOffset {\n    opacity: 0.8 !important;\n    position: fixed !important;\n}\n\n.firebugLayoutLine {\n    opacity: 0.4 !important;\n    background-color: #000000 !important;\n}\n\n.firebugLayoutLineLeft, .firebugLayoutLineRight {\n    width: 1px !important;\n    height: 100% !important;\n}\n\n.firebugLayoutLineTop, .firebugLayoutLineBottom {\n    width: 100% !important;\n    height: 1px !important;\n}\n\n.firebugLayoutLineTop {\n    margin-top: -1px !important;\n    border-top: 1px solid #999999 !important;\n}\n\n.firebugLayoutLineRight {\n    border-right: 1px solid #999999 !important;\n}\n\n.firebugLayoutLineBottom {\n    border-bottom: 1px solid #999999 !important;\n}\n\n.firebugLayoutLineLeft {\n    margin-left: -1px !important;\n    border-left: 1px solid #999999 !important;\n}\n\n/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */\n.firebugLayoutBoxParent {\n    border-top: 0 none !important;\n    border-right: 1px dashed #E00 !important;\n    border-bottom: 1px dashed #E00 !important;\n    border-left: 0 none !important;\n    position: fixed !important;\n    width: auto !important;\n}\n\n.firebugRuler{\n    position: absolute !important;\n}\n\n.firebugRulerH {\n    top: -15px !important;\n    left: 0 !important;\n    width: 100% !important;\n    height: 14px !important;\n    background: url('data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%13%88%00%00%00%0E%08%02%00%00%00L%25a%0A%00%00%00%04gAMA%00%00%D6%D8%D4OX2%00%00%00%19tEXtSoftware%00Adobe%20ImageReadyq%C9e%3C%00%00%04%F8IDATx%DA%EC%DD%D1n%E2%3A%00E%D1%80%F8%FF%EF%E2%AF2%95%D0D4%0E%C1%14%B0%8Fa-%E9%3E%CC%9C%87n%B9%81%A6W0%1C%A6i%9A%E7y%0As8%1CT%A9R%A5J%95*U%AAT%A9R%A5J%95*U%AAT%A9R%A5J%95*U%AAT%A9R%A5J%95*U%AAT%A9R%A5J%95*U%AAT%A9R%A5J%95*U%AAT%A9R%A5J%95*U%AATE9%FE%FCw%3E%9F%AF%2B%2F%BA%97%FDT%1D~K(%5C%9D%D5%EA%1B%5C%86%B5%A9%BDU%B5y%80%ED%AB*%03%FAV9%AB%E1%CEj%E7%82%EF%FB%18%BC%AEJ8%AB%FA'%D2%BEU9%D7U%ECc0%E1%A2r%5DynwVi%CFW%7F%BB%17%7Dy%EACU%CD%0E%F0%FA%3BX%FEbV%FEM%9B%2B%AD%BE%AA%E5%95v%AB%AA%E3E5%DCu%15rV9%07%B5%7F%B5w%FCm%BA%BE%AA%FBY%3D%14%F0%EE%C7%60%0EU%AAT%A9R%A5J%95*U%AAT%A9R%A5J%95*U%AAT%A9R%A5J%95*U%AAT%A9R%A5J%95*U%AAT%A9R%A5JU%88%D3%F5%1F%AE%DF%3B%1B%F2%3E%DAUCNa%F92%D02%AC%7Dm%F9%3A%D4%F2%8B6%AE*%BF%5C%C2Ym~9g5%D0Y%95%17%7C%C8c%B0%7C%18%26%9CU%CD%13i%F7%AA%90%B3Z%7D%95%B4%C7%60%E6E%B5%BC%05%B4%FBY%95U%9E%DB%FD%1C%FC%E0%9F%83%7F%BE%17%7DkjMU%E3%03%AC%7CWj%DF%83%9An%BCG%AE%F1%95%96yQ%0Dq%5Dy%00%3Et%B5'%FC6%5DS%95pV%95%01%81%FF'%07%00%00%00%00%00%00%00%00%00%F8x%C7%F0%BE%9COp%5D%C9%7C%AD%E7%E6%EBV%FB%1E%E0(%07%E5%AC%C6%3A%ABi%9C%8F%C6%0E9%AB%C0'%D2%8E%9F%F99%D0E%B5%99%14%F5%0D%CD%7F%24%C6%DEH%B8%E9rV%DFs%DB%D0%F7%00k%FE%1D%84%84%83J%B8%E3%BA%FB%EF%20%84%1C%D7%AD%B0%8E%D7U%C8Y%05%1E%D4t%EF%AD%95Q%BF8w%BF%E9%0A%BF%EB%03%00%00%00%00%00%00%00%00%00%B8vJ%8E%BB%F5%B1u%8Cx%80%E1o%5E%CA9%AB%CB%CB%8E%03%DF%1D%B7T%25%9C%D5(%EFJM8%AB%CC'%D2%B2*%A4s%E7c6%FB%3E%FA%A2%1E%80~%0E%3E%DA%10x%5D%95Uig%15u%15%ED%7C%14%B6%87%A1%3B%FCo8%A8%D8o%D3%ADO%01%EDx%83%1A~%1B%9FpP%A3%DC%C6'%9C%95gK%00%00%00%00%00%00%00%00%00%20%D9%C9%11%D0%C0%40%AF%3F%EE%EE%92%94%D6%16X%B5%BCMH%15%2F%BF%D4%A7%C87%F1%8E%F2%81%AE%AAvzr%DA2%ABV%17%7C%E63%83%E7I%DC%C6%0Bs%1B%EF6%1E%00%00%00%00%00%00%00%00%00%80cr%9CW%FF%7F%C6%01%0E%F1%CE%A5%84%B3%CA%BC%E0%CB%AA%84%CE%F9%BF)%EC%13%08WU%AE%AB%B1%AE%2BO%EC%8E%CBYe%FE%8CN%ABr%5Dy%60~%CFA%0D%F4%AE%D4%BE%C75%CA%EDVB%EA(%B7%F1%09g%E5%D9%12%00%00%00%00%00%00%00%00%00H%F6%EB%13S%E7y%5E%5E%FB%98%F0%22%D1%B2'%A7%F0%92%B1%BC%24z3%AC%7Dm%60%D5%92%B4%7CEUO%5E%F0%AA*%3BU%B9%AE%3E%A0j%94%07%A0%C7%A0%AB%FD%B5%3F%A0%F7%03T%3Dy%D7%F7%D6%D4%C0%AAU%D2%E6%DFt%3F%A8%CC%AA%F2%86%B9%D7%F5%1F%18%E6%01%F8%CC%D5%9E%F0%F3z%88%AA%90%EF%20%00%00%00%00%00%00%00%00%00%C0%A6%D3%EA%CFi%AFb%2C%7BB%0A%2B%C3%1A%D7%06V%D5%07%A8r%5D%3D%D9%A6%CAu%F5%25%CF%A2%99%97zNX%60%95%AB%5DUZ%D5%FBR%03%AB%1C%D4k%9F%3F%BB%5C%FF%81a%AE%AB'%7F%F3%EA%FE%F3z%94%AA%D8%DF%5B%01%00%00%00%00%00%00%00%00%00%8E%FB%F3%F2%B1%1B%8DWU%AAT%A9R%A5J%95*U%AAT%A9R%A5J%95*U%AAT%A9R%A5J%95*U%AAT%A9R%A5J%95*U%AAT%A9R%A5J%95*U%AAT%A9R%A5J%95*U%AAT%A9R%A5J%95*UiU%C7%BBe%E7%F3%B9%CB%AAJ%95*U%AAT%A9R%A5J%95*U%AAT%A9R%A5J%95*U%AAT%A9R%A5J%95*U%AAT%A9R%A5J%95*U%AAT%A9R%A5J%95*U%AAT%A9R%A5J%95*U%AAT%A9R%A5*%AAj%FD%C6%D4%5Eo%90%B5Z%ADV%AB%D5j%B5Z%ADV%AB%D5j%B5Z%ADV%AB%D5j%B5Z%ADV%AB%D5j%B5Z%ADV%AB%D5j%B5Z%ADV%AB%D5j%B5Z%ADV%AB%D5j%B5%86%AF%1B%9F%98%DA%EBm%BBV%AB%D5j%B5Z%ADV%AB%D5j%B5Z%ADV%AB%D5j%B5Z%ADV%AB%D5j%B5Z%ADV%AB%D5j%B5Z%ADV%AB%D5j%B5Z%ADV%AB%D5j%B5Z%AD%D6%E4%F58%01%00%00%00%00%00%00%00%00%00%00%00%00%00%40%85%7F%02%0C%008%C2%D0H%16j%8FX%00%00%00%00IEND%AEB%60%82') repeat-x !important;\n    border-top: 1px solid #BBBBBB !important;\n    border-right: 1px dashed #BBBBBB !important;\n    border-bottom: 1px solid #000000 !important;\n}\n\n.firebugRulerV {\n    top: 0 !important;\n    left: -15px !important;\n    width: 14px !important;\n    height: 100% !important;\n    background: url('data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%0E%00%00%13%88%08%02%00%00%00%0E%F5%CB%10%00%00%00%04gAMA%00%00%D6%D8%D4OX2%00%00%00%19tEXtSoftware%00Adobe%20ImageReadyq%C9e%3C%00%00%06~IDATx%DA%EC%DD%D1v%A20%14%40Qt%F1%FF%FF%E4%97%D9%07%3BT%19%92%DC%40(%90%EEy%9A5%CB%B6%E8%F6%9Ac%A4%CC0%84%FF%DC%9E%CF%E7%E3%F1%88%DE4%F8%5D%C7%9F%2F%BA%DD%5E%7FI%7D%F18%DDn%BA%C5%FB%DF%97%BFk%F2%10%FF%FD%B4%F2M%A7%FB%FD%FD%B3%22%07p%8F%3F%AE%E3%F4S%8A%8F%40%EEq%9D%BE8D%F0%0EY%A1Uq%B7%EA%1F%81%88V%E8X%3F%B4%CEy%B7h%D1%A2E%EBohU%FC%D9%AF2fO%8BBeD%BE%F7X%0C%97%A4%D6b7%2Ck%A5%12%E3%9B%60v%B7r%C7%1AI%8C%BD%2B%23r%00c0%B2v%9B%AD%CA%26%0C%1Ek%05A%FD%93%D0%2B%A1u%8B%16-%95q%5Ce%DCSO%8E%E4M%23%8B%F7%C2%FE%40%BB%BD%8C%FC%8A%B5V%EBu%40%F9%3B%A72%FA%AE%8C%D4%01%CC%B5%DA%13%9CB%AB%E2I%18%24%B0n%A9%0CZ*Ce%9C%A22%8E%D8NJ%1E%EB%FF%8F%AE%CAP%19*%C3%BAEKe%AC%D1%AAX%8C*%DEH%8F%C5W%A1e%AD%D4%B7%5C%5B%19%C5%DB%0D%EF%9F%19%1D%7B%5E%86%BD%0C%95%A12%AC%5B*%83%96%CAP%19%F62T%86%CAP%19*%83%96%CA%B8Xe%BC%FE)T%19%A1%17xg%7F%DA%CBP%19*%C3%BA%A52T%86%CAP%19%F62T%86%CA%B0n%A9%0CZ%1DV%C6%3D%F3%FCH%DE%B4%B8~%7F%5CZc%F1%D6%1F%AF%84%F9%0F6%E6%EBVt9%0E~%BEr%AF%23%B0%97%A12T%86%CAP%19%B4T%86%CA%B8Re%D8%CBP%19*%C3%BA%A52huX%19%AE%CA%E5%BC%0C%7B%19*CeX%B7h%A9%0C%95%E1%BC%0C%7B%19*CeX%B7T%06%AD%CB%5E%95%2B%BF.%8F%C5%97%D5%E4%7B%EE%82%D6%FB%CF-%9C%FD%B9%CF%3By%7B%19%F62T%86%CA%B0n%D1R%19*%A3%D3%CA%B0%97%A12T%86uKe%D0%EA%B02*%3F1%99%5DB%2B%A4%B5%F8%3A%7C%BA%2B%8Co%7D%5C%EDe%A8%0C%95a%DDR%19%B4T%C66%82fA%B2%ED%DA%9FC%FC%17GZ%06%C9%E1%B3%E5%2C%1A%9FoiB%EB%96%CA%A0%D5qe4%7B%7D%FD%85%F7%5B%ED_%E0s%07%F0k%951%ECr%0D%B5C%D7-g%D1%A8%0C%EB%96%CA%A0%A52T%C6)*%C3%5E%86%CAP%19%D6-%95A%EB*%95q%F8%BB%E3%F9%AB%F6%E21%ACZ%B7%22%B7%9B%3F%02%85%CB%A2%5B%B7%BA%5E%B7%9C%97%E1%BC%0C%EB%16-%95%A12z%AC%0C%BFc%A22T%86uKe%D0%EA%B02V%DD%AD%8A%2B%8CWhe%5E%AF%CF%F5%3B%26%CE%CBh%5C%19%CE%CB%B0%F3%A4%095%A1%CAP%19*Ce%A8%0C%3BO*Ce%A8%0C%95%A12%3A%AD%8C%0A%82%7B%F0v%1F%2FD%A9%5B%9F%EE%EA%26%AF%03%CA%DF9%7B%19*Ce%A8%0C%95%A12T%86%CA%B8Ze%D8%CBP%19*Ce%A8%0C%95%D1ae%EC%F7%89I%E1%B4%D7M%D7P%8BjU%5C%BB%3E%F2%20%D8%CBP%19*Ce%A8%0C%95%A12T%C6%D5*%C3%5E%86%CAP%19*Ce%B4O%07%7B%F0W%7Bw%1C%7C%1A%8C%B3%3B%D1%EE%AA%5C%D6-%EBV%83%80%5E%D0%CA%10%5CU%2BD%E07YU%86%CAP%19*%E3%9A%95%91%D9%A0%C8%AD%5B%EDv%9E%82%FFKOee%E4%8FUe%A8%0C%95%A12T%C6%1F%A9%8C%C8%3D%5B%A5%15%FD%14%22r%E7B%9F%17l%F8%BF%ED%EAf%2B%7F%CF%ECe%D8%CBP%19*Ce%A8%0C%95%E1%93~%7B%19%F62T%86%CAP%19*Ce%A8%0C%E7%13%DA%CBP%19*Ce%A8%0CZf%8B%16-Z%B4h%D1R%19f%8B%16-Z%B4h%D1R%19%B4%CC%16-Z%B4h%D1R%19%B4%CC%16-Z%B4h%D1%A2%A52%CC%16-Z%B4h%D1%A2%A52h%99-Z%B4h%D1%A2%A52h%99-Z%B4h%D1%A2EKe%98-Z%B4h%D1%A2EKe%D02%5B%B4h%D1%A2EKe%D02%5B%B4h%D1%A2E%8B%96%CA0%5B%B4h%D1%A2E%8B%96%CA%A0e%B6h%D1%A2E%8B%96%CA%A0e%B6h%D1%A2E%8B%16-%95a%B6h%D1%A2E%8B%16-%95A%CBl%D1%A2E%8B%16-%95A%CBl%D1%A2E%8B%16-Z*%C3l%D1%A2E%8B%16-Z*%83%96%D9%A2E%8B%16-Z*%83%96%D9%A2E%8B%16-Z%B4T%86%D9%A2E%8B%16-Z%B4T%06-%B3E%8B%16-Z%B4T%06-%B3E%8B%16-Z%B4h%A9%0C%B3E%8B%16-Z%B4h%A9%0CZf%8B%16-Z%B4h%A9%0CZf%8B%16-Z%B4h%D1R%19f%8B%16-Z%B4h%D1R%19%B4%CC%16-Z%B4h%D1R%19%B4%CC%16-Z%B4h%D1%A2%A52%CC%16-Z%B4h%D1%A2%A52h%99-Z%B4h%D1%A2%A52h%99-Z%B4h%D1%A2EKe%98-Z%B4h%D1%A2EKe%D02%5B%B4h%D1%A2EKe%D02%5B%B4h%D1%A2E%8B%96%CA0%5B%B4h%D1%A2E%8B%96%CA%A0e%B6h%D1%A2E%8B%96%CA%A0e%B6h%D1%A2E%8B%16-%95a%B6h%D1%A2E%8B%16-%95A%CBl%D1%A2E%8B%16-%95A%CBl%D1%A2E%8B%16-Z*%C3l%D1%A2E%8B%16-Z*%83%96%D9%A2E%8B%16-Z*%83%96%D9%A2E%8B%16-Z%B4T%86%D9%A2E%8B%16-Z%B4T%06-%B3E%8B%16-Z%B4T%06-%B3E%8B%16-Z%B4h%A9%0C%B3E%8B%16-Z%B4h%A9%0CZf%8B%16-Z%B4h%A9%0CZf%8B%16-Z%B4h%D1R%19f%8B%16-Z%B4h%D1R%19%B4%CC%16-Z%B4h%D1R%19%B4%CC%16-Z%B4h%D1%A2%A52%CC%16-Z%B4h%D1%A2%A52h%99-Z%B4h%D1%A2%A52h%99-Z%B4h%D1%A2EKe%98-Z%B4h%D1%A2EKe%D02%5B%B4h%D1%A2EKe%D02%5B%B4h%D1%A2E%8B%96%CA0%5B%B4h%D1%A2E%8B%96%CA%A0e%B6h%D1%A2E%8B%96%CA%A0e%B6h%D1%A2E%8B%16-%95a%B6h%D1%A2E%8B%16-%95A%CBl%D1%A2E%8B%16-%95A%CBl%D1%A2E%8B%16-Z*%C3l%D1%A2E%8B%16-Z*%83%96%D9%A2E%8B%16-Z*%83%96%D9%A2E%8B%16-Z%B4T%86%D9%A2E%8B%16-Z%B4T%06-%B3E%8B%16-Z%B4%AE%A4%F5%25%C0%00%DE%BF%5C'%0F%DA%B8q%00%00%00%00IEND%AEB%60%82') repeat-y !important;\n    border-left: 1px solid #BBBBBB !important;\n    border-right: 1px solid #000000 !important;\n    border-bottom: 1px dashed #BBBBBB !important;\n}\n\n.overflowRulerX &gt; .firebugRulerV {\n    left: 0 !important;\n}\n\n.overflowRulerY &gt; .firebugRulerH {\n    top: 0 !important;\n}\n\n/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */\n.fbProxyElement {\n    position: fixed !important;\n    pointer-events: auto !important;\n}\n&lt;/style&gt;&lt;/head&gt;\n&lt;body role='application'&gt;\n\n  &lt;!-- represents application screen\n       TEMPLATE LIST --&gt;\n  &lt;div id='templateList' role='window'&gt;\n\n    &lt;!-- title bar region --&gt;\n    &lt;section role='region'&gt;\n      &lt;header&gt;\n        &lt;button&gt;&lt;span class='icon icon-menu'&gt;menu&lt;/span&gt;&lt;/button&gt;\n        &lt;menu type='toolbar'&gt;\n          &lt;a href='#'&gt;&lt;span class='icon icon-info'&gt;info&lt;/span&gt;&lt;/a&gt;\n        &lt;/menu&gt;\n        &lt;h1&gt;Mozillapps&lt;/h1&gt;\n      &lt;/header&gt;\n    &lt;/section&gt;\n\n    &lt;!-- content region --&gt;\n    &lt;section role='region' data-type='accordion'&gt;\n      &lt;ul class='list'&gt;\n        &lt;li&gt;\n          &lt;div class='header'&gt;\n            &lt;h2 class='title'&gt;Please choose an app template to get started.&lt;/h2&gt;\n          &lt;/div&gt;\n        &lt;/li&gt;\n        &lt;li&gt;\n          &lt;input id='item-1' name='radio' type='radio'&gt;\n          &lt;label for='item-1' class='list-item open'&gt;Featured Templates&lt;/label&gt;\n          &lt;div id='iscroll' class='list-item-body'&gt;\n            &lt;ul class='horizontal-list'&gt;\n              &lt;li class='list-item'&gt;\n                &lt;img src='styles/temp/template_icon_store.png' class='template-thumbnail'&gt;&lt;span&gt;Small Store&lt;/span&gt;\n              &lt;/li&gt;\n              &lt;li class='list-item'&gt;\n                &lt;img src='styles/temp/template_icon_store.png' class='template-thumbnail'&gt;&lt;span&gt;Small Store&lt;/span&gt;\n              &lt;/li&gt;\n              &lt;li class='list-item'&gt;\n                &lt;img src='styles/temp/template_icon_store.png' class='template-thumbnail'&gt;&lt;span&gt;Small Store&lt;/span&gt;\n              &lt;/li&gt;\n            &lt;/ul&gt;\n          &lt;/div&gt;\n        &lt;/li&gt;\n        &lt;li&gt;\n          &lt;input id='item-2' name='radio' type='radio'&gt;\n          &lt;label for='item-2' class='list-item'&gt;User Submitted Templates&lt;/label&gt;\n          &lt;div id='iscroll' class='list-item-body'&gt;\n            &lt;ul class='horizontal-list'&gt;\n              &lt;li class='list-item'&gt;\n                &lt;img src='styles/temp/template_icon_store.png' class='template-thumbnail'&gt;&lt;span&gt;Small Store&lt;/span&gt;\n              &lt;/li&gt;\n              &lt;li class='list-item'&gt;\n                &lt;img src='styles/temp/template_icon_store.png' class='template-thumbnail'&gt;&lt;span&gt;Small Store&lt;/span&gt;\n              &lt;/li&gt;\n              &lt;li class='list-item'&gt;\n                &lt;img src='styles/temp/template_icon_store.png' class='template-thumbnail'&gt;&lt;span&gt;Small Store&lt;/span&gt;\n              &lt;/li&gt;\n            &lt;/ul&gt;\n          &lt;/div&gt;\n        &lt;/li&gt;\n        &lt;li&gt;\n          &lt;input id='item-3' name='radio' type='radio'&gt;\n          &lt;label for='item-3' class='list-item'&gt;Other Templates&lt;/label&gt;\n          &lt;div id='iscroll' class='list-item-body'&gt;\n            &lt;ul class='horizontal-list'&gt;\n              &lt;li class='list-item'&gt;\n                &lt;img src='styles/temp/template_icon_store.png' class='template-thumbnail'&gt;&lt;span&gt;Small Store&lt;/span&gt;\n              &lt;/li&gt;\n              &lt;li class='list-item'&gt;\n                &lt;img src='styles/temp/template_icon_store.png' class='template-thumbnail'&gt;&lt;span&gt;Small Store&lt;/span&gt;\n              &lt;/li&gt;\n              &lt;li class='list-item'&gt;\n                &lt;img src='styles/temp/template_icon_store.png' class='template-thumbnail'&gt;&lt;span&gt;Small Store&lt;/span&gt;\n              &lt;/li&gt;\n            &lt;/ul&gt;\n          &lt;/div&gt;\n        &lt;/li&gt;\n      &lt;/ul&gt;\n    &lt;/section&gt;\n\n    &lt;!-- footer region --&gt;\n    &lt;section role='region' data-type='footer'&gt;\n      &lt;footer&gt;&lt;/footer&gt;\n    &lt;/section&gt;\n  &lt;/div&gt;\n\n  &lt;!-- represents application screen\n       TEMPLATE DETAIL --&gt;\n  &lt;div id='templateDetail' role='window'&gt;\n\n    &lt;!-- title bar region --&gt;\n    &lt;section role='region' data-type='header'&gt;\n      &lt;header&gt;\n        &lt;button&gt;&lt;span class='icon icon-back'&gt;back&lt;/span&gt;&lt;/button&gt;\n        &lt;menu type='toolbar'&gt;\n          &lt;a href='#'&gt;&lt;span class='icon icon-info'&gt;info&lt;/span&gt;&lt;/a&gt;\n        &lt;/menu&gt;\n        &lt;h1&gt;Featured Templates&lt;/h1&gt;\n      &lt;/header&gt;\n    &lt;/section&gt;\n\n    &lt;!-- content region --&gt;\n    &lt;section role='region' data-type='content'&gt;\n      &lt;section role='region' data-type='header' class='template-detail-header'&gt;\n        &lt;button class='previous'&gt;&lt;span class='hidden'&gt;<&lt;/span&gt;&lt;/button&gt;\n        &lt;button class='next'&gt;&lt;span class='hidden'&gt;>&lt;/span&gt;&lt;/button&gt;\n        &lt;div id='templateNameList'&gt;\n          &lt;ul&gt;\n            &lt;li&gt;Small Store&lt;/li&gt;\n            &lt;li&gt;Blog&lt;/li&gt;\n            &lt;li&gt;Other&lt;/li&gt;\n          &lt;/ul&gt;\n        &lt;/div&gt;\n        &lt;p class='template-index'&gt;4 of 15&lt;/p&gt;\n      &lt;/section&gt;\n      &lt;section role='region' data-type='detail' class='template-detail'&gt;\n        &lt;img src='styles/temp/template_icon_large_store.png' alt=''&gt;\n        &lt;div&gt;\n          &lt;p&gt;Small Store features a customizable catalog of product photos and lightweight e-commerce services&lt;/p&gt;\n          &lt;button class='recommend'&gt;Choose&lt;/button&gt;\n        &lt;/div&gt;\n      &lt;/section&gt;\n      &lt;section role='region' data-type='list'&gt;\n        &lt;header&gt;Included Components&lt;/header&gt;\n        &lt;ul&gt;\n          &lt;li&gt;\n            &lt;p&gt;Carousel&lt;/p&gt;\n            &lt;p&gt;Displays a series of images&lt;/p&gt;\n          &lt;/li&gt;\n          &lt;li&gt;\n            &lt;p&gt;About me&lt;/p&gt;\n            &lt;p&gt;Displays a series of images&lt;/p&gt;\n          &lt;/li&gt;\n        &lt;/ul&gt;\n      &lt;/section&gt;\n    &lt;/section&gt;\n\n    &lt;!-- footer region --&gt;\n    &lt;section role='region' data-type='footer'&gt;\n      &lt;footer&gt;&lt;/footer&gt;\n    &lt;/section&gt;\n  &lt;/div&gt;\n\n\n&lt;!-- represents application screen\n       APP BUILDER --&gt;\n  &lt;div id='appBuilder' role='window'&gt;\n\n    &lt;!-- title bar region --&gt;\n    &lt;section role='region' data-type='header'&gt;\n      &lt;header&gt;\n        &lt;button&gt;&lt;span class='icon icon-back'&gt;back&lt;/span&gt;&lt;/button&gt;\n        &lt;menu type='toolbar'&gt;\n          &lt;a href='#'&gt;&lt;span class='icon icon-info'&gt;info&lt;/span&gt;&lt;/a&gt;\n        &lt;/menu&gt;\n        &lt;h1&gt;App Builder&lt;/h1&gt;\n      &lt;/header&gt;\n    &lt;/section&gt;\n\n    &lt;!-- content region --&gt;\n    &lt;section role='region' data-type='content'&gt;\n      &lt;header&gt;Your template&lt;/header&gt;\n      &lt;section role='region' data-type='detail' class='template-detail'&gt;\n        &lt;div&gt;&lt;img src='styles/temp/template_icon_store.png' class='template-thumbnail-small'&gt;&lt;/div&gt;\n        &lt;div&gt;\n          &lt;h1&gt;Small Store&lt;/h1&gt;\n          &lt;button class='recommend'&gt;Publish&lt;/button&gt;\n          &lt;button class='preview'&gt;&lt;/button&gt;\n        &lt;/div&gt;\n      &lt;/section&gt;\n      &lt;section role='region' data-type='list'&gt;\n        &lt;header&gt;Edit your app components&lt;/header&gt;\n        &lt;ul data-type='edit'&gt;\n          &lt;li&gt;\n            &lt;label class='danger'&gt;\n              &lt;input checked='' type='checkbox'&gt;\n              &lt;div&gt;&lt;/div&gt;\n            &lt;/label&gt;\n            &lt;a href='#'&gt;\n              &lt;p&gt;Name your App&lt;/p&gt;\n              &lt;p&gt;Personalize your app&lt;/p&gt;\n              &lt;button&gt;&lt;/button&gt;\n            &lt;/a&gt;\n          &lt;/li&gt;\n          &lt;li&gt;\n            &lt;label class='danger'&gt;\n              &lt;input checked='' type='checkbox'&gt;\n              &lt;div&gt;&lt;/div&gt;\n            &lt;/label&gt;\n            &lt;a href='#'&gt;\n              &lt;p&gt;Carousel&lt;/p&gt;\n              &lt;p&gt;Displays series of images&lt;/p&gt;\n              &lt;button&gt;&lt;/button&gt;\n            &lt;/a&gt;\n          &lt;/li&gt;\n          &lt;li&gt;\n            &lt;label class='danger'&gt;\n              &lt;input checked='' type='checkbox'&gt;\n              &lt;div&gt;&lt;/div&gt;\n            &lt;/label&gt;\n            &lt;a href='#'&gt;\n              &lt;p&gt;About me&lt;/p&gt;\n              &lt;p&gt;Blah de da blah blah blah&lt;/p&gt;\n              &lt;button&gt;&lt;/button&gt;\n            &lt;/a&gt;\n          &lt;/li&gt;\n        &lt;/ul&gt;\n      &lt;/section&gt;\n    &lt;/section&gt;\n\n    &lt;!-- footer region --&gt;\n    &lt;section role='region' data-type='footer'&gt;\n      &lt;footer&gt;&lt;/footer&gt;\n    &lt;/section&gt;\n  &lt;/div&gt;\n\n  &lt;!-- represents application screen\n       APP BUILDER &gt; EDIT ICON --&gt;\n  &lt;div id='appBuilderEditIcon' role='window'&gt;\n\n    &lt;!-- title bar region --&gt;\n    &lt;section role='region' data-type='header'&gt;\n      &lt;header&gt;\n        &lt;button&gt;&lt;span class='icon icon-back'&gt;back&lt;/span&gt;&lt;/button&gt;\n        &lt;menu type='toolbar'&gt;\n          &lt;a href='#'&gt;&lt;span class='icon icon-info'&gt;info&lt;/span&gt;&lt;/a&gt;\n        &lt;/menu&gt;\n        &lt;h1&gt;Choose Your Icon&lt;/h1&gt;\n      &lt;/header&gt;\n    &lt;/section&gt;\n\n    &lt;!-- content region --&gt;\n    &lt;section role='region' data-type='content'&gt;\n      &lt;section role='region' data-type='detail' class='template-icon'&gt;\n        &lt;div&gt;\n          &lt;div class='app-icon'&gt;\n            &lt;img src='styles/temp/app_icon.png'&gt;\n            Funnel Cat\n          &lt;/div&gt;\n        &lt;/div&gt;\n        &lt;div&gt;\n          &lt;ol&gt;\n            &lt;li&gt;Choose icon below&lt;/li&gt;\n            &lt;li&gt;Tap to edit icon name&lt;/li&gt;\n          &lt;/ol&gt;\n        &lt;/div&gt;\n      &lt;/section&gt;\n      &lt;section role='region' data-type='icon-list'&gt;\n        icons\n        &lt;ul class='cf'&gt;\n          &lt;li&gt;&lt;img src='styles/temp/app_icon_blue.png'&gt;&lt;/li&gt;\n          &lt;li&gt;&lt;img src='styles/temp/app_icon_pink.png'&gt;&lt;/li&gt;\n          &lt;li&gt;&lt;img src='styles/temp/app_icon_black.png'&gt;&lt;/li&gt;\n          &lt;li&gt;&lt;img src='styles/temp/app_icon.png'&gt;&lt;/li&gt;\n          &lt;li&gt;&lt;img src='styles/temp/app_icon_orange.png'&gt;&lt;/li&gt;\n          &lt;li&gt;&lt;img src='styles/temp/app_icon_green.png'&gt;&lt;/li&gt;\n        &lt;/ul&gt;\n      &lt;/section&gt;\n    &lt;/section&gt;\n\n    &lt;!-- footer region --&gt;\n    &lt;section role='region' data-type='footer'&gt;\n      &lt;footer&gt;&lt;/footer&gt;\n    &lt;/section&gt;\n  &lt;/div&gt;\n\n  &lt;!-- represents application screen\n       PRODUCT LIST --&gt;\n  &lt;div id='productList' role='window'&gt;\n\n    &lt;!-- title bar region --&gt;\n    &lt;section role='region' data-type='header'&gt;\n      &lt;header&gt;\n        &lt;button&gt;&lt;span class='icon icon-back'&gt;back&lt;/span&gt;&lt;/button&gt;\n        &lt;menu type='toolbar'&gt;\n          &lt;!-- TODO: make this an add icon --&gt;\n          &lt;a href='#'&gt;&lt;span class='icon icon-info'&gt;info&lt;/span&gt;&lt;/a&gt;\n          &lt;!-- TODO: make this an edit icon where the list is populated --&gt;\n          &lt;a href='#' id='link-add-product'&gt;&lt;span class=''&gt;+&lt;/span&gt;&lt;/a&gt;\n        &lt;/menu&gt;\n        &lt;h1&gt;Product List&lt;/h1&gt;\n      &lt;/header&gt;\n    &lt;/section&gt;\n\n    &lt;!-- content region --&gt;\n    &lt;section role='region' data-type='content'&gt;\n      &lt;header&gt;Products&lt;/header&gt;\n      &lt;section role='region' data-type='detail' class='template-detail'&gt;\n        &lt;!-- uncomment out to show unpopulated view --&gt;\n        &lt;div class='product-empty'&gt;\n          &lt;p&gt;To add products, tap the + button&lt;/p&gt;\n        &lt;/div&gt;\n        &lt;!-- this is for testing phone image api --&gt;\n        &lt;div id='image-presenter'&gt;\n        &lt;/div&gt;\n        &lt;p&gt;\n          &lt;img id='thumbnail-photo' alt='' style='background-image: url(); background-color: transparent;display:inline-block;padding:40px 40px;background-repeat:no-repeat;'&gt;\n        &lt;/p&gt;\n        &lt;!-- comment this out to hide populated view --&gt;\n        &lt;!--\n        &lt;ul data-type='list'&gt;\n          &lt;li&gt;\n            &lt;a href='#'&gt;\n              &lt;figure&gt;\n              &lt;img src='styles/temp/product_list_thumb.png' /&gt;\n              &lt;/figure&gt;\n              &lt;figcaption&gt;\n                &lt;p&gt;Nomadic One Necklace&lt;/p&gt;\n                &lt;p&gt;This piece of jewelry is made from brass and braided&lt;/p&gt;\n                &lt;p&gt;$29.99&lt;/p&gt;\n              &lt;/figcaption&gt;\n              &lt;span class='preview-visual'&gt;preview&lt;/span&gt;\n            &lt;/a&gt;\n          &lt;/li&gt;\n          &lt;li&gt;\n            &lt;a href='#'&gt;\n              &lt;figure&gt;\n              &lt;img src='styles/temp/product_list_thumb.png' /&gt;\n              &lt;/figure&gt;\n              &lt;figcaption&gt;\n                &lt;p&gt;Nomadic One Necklace&lt;/p&gt;\n                &lt;p&gt;This piece of jewelry is made from brass and braided&lt;/p&gt;\n                &lt;p&gt;$29.99&lt;/p&gt;\n              &lt;/figcaption&gt;\n              &lt;span class='preview-visual'&gt;preview&lt;/span&gt;\n            &lt;/a&gt;\n          &lt;/li&gt;\n        &lt;/ul&gt;\n        --&gt;\n      &lt;/section&gt;\n    &lt;/section&gt;\n\n    &lt;!-- footer region --&gt;\n    &lt;section role='region' data-type='footer'&gt;\n      &lt;footer&gt;&lt;/footer&gt;\n    &lt;/section&gt;\n  &lt;/div&gt;\n\n  &lt;!-- represents application screen\n       PRODUCT LIST EDIT --&gt;\n  &lt;div id='productListEdit' role='window'&gt;\n\n    &lt;!-- title bar region --&gt;\n    &lt;section role='region' data-type='header'&gt;\n      &lt;header&gt;\n        &lt;button&gt;&lt;span class='icon icon-back'&gt;back&lt;/span&gt;&lt;/button&gt;\n        &lt;menu type='toolbar'&gt;\n          &lt;!-- TODO: make this a done icon where the list is populated --&gt;\n          &lt;button&gt;Done&lt;/button&gt;\n        &lt;/menu&gt;\n        &lt;h1&gt;Edit Product List&lt;/h1&gt;\n      &lt;/header&gt;\n    &lt;/section&gt;\n\n    &lt;!-- content region --&gt;\n    &lt;section role='region' data-type='content'&gt;\n      &lt;header&gt;Products&lt;/header&gt;\n      &lt;section role='region' data-type='list' class='template-detail'&gt;\n        &lt;ul data-type='edit' class='no-transform'&gt;\n          &lt;li&gt;\n            &lt;label&gt;\n              &lt;input checked='' type='checkbox'&gt;\n              &lt;div&gt;&lt;/div&gt;\n            &lt;/label&gt;\n            &lt;figure&gt;\n              &lt;img src='styles/temp/product_list_thumb.png'&gt;\n            &lt;/figure&gt;\n            &lt;figcaption&gt;\n              &lt;p&gt;Nomadic One Necklace&lt;/p&gt;\n              &lt;p&gt;This piece of jewelry is made from brass and braided&lt;/p&gt;\n              &lt;p&gt;$29.99&lt;/p&gt;\n            &lt;/figcaption&gt;\n          &lt;/li&gt;\n          &lt;li&gt;\n              &lt;label&gt;\n                &lt;input checked='' type='checkbox'&gt;\n                &lt;div&gt;&lt;/div&gt;\n              &lt;/label&gt;\n              &lt;figure&gt;\n                &lt;img src='styles/temp/product_list_thumb.png'&gt;\n              &lt;/figure&gt;\n              &lt;figcaption&gt;\n                &lt;p&gt;Nomadic One Necklace&lt;/p&gt;\n                &lt;p&gt;This piece of jewelry is made from brass and braided&lt;/p&gt;\n                &lt;p&gt;$29.99&lt;/p&gt;\n              &lt;/figcaption&gt;\n          &lt;/li&gt;\n        &lt;/ul&gt;\n      &lt;/section&gt;\n      &lt;section role='region' class='outer-chrome chrome-fixed-bottom'&gt;\n        &lt;button&gt;Delete Selected&lt;/button&gt;\n      &lt;/section&gt;\n    &lt;/section&gt;\n\n    &lt;!-- footer region --&gt;\n    &lt;section role='region' data-type='footer'&gt;\n      &lt;footer&gt;&lt;/footer&gt;\n    &lt;/section&gt;\n  &lt;/div&gt;\n\n  &lt;!-- represents application screen\n       PRODUCT ADD IMAGE --&gt;\n  &lt;div id='productAddImage' role='window'&gt;\n\n    &lt;!-- title bar region --&gt;\n    &lt;section role='region' data-type='header'&gt;\n      &lt;header&gt;\n        &lt;button&gt;&lt;span class='icon icon-back'&gt;back&lt;/span&gt;&lt;/button&gt;\n        &lt;menu type='toolbar'&gt;\n          &lt;!-- TODO: make this an add icon --&gt;\n          &lt;a href='#'&gt;&lt;span class='icon icon-info'&gt;info&lt;/span&gt;&lt;/a&gt;\n          &lt;!-- TODO: make this an edit icon where the list is populated --&gt;\n          &lt;a href='#'&gt;&lt;span class='icon icon-info'&gt;info&lt;/span&gt;&lt;/a&gt;\n        &lt;/menu&gt;\n        &lt;h1&gt;Product List&lt;/h1&gt;\n      &lt;/header&gt;\n    &lt;/section&gt;\n\n    &lt;!-- content region --&gt;\n    &lt;section role='region' data-type='content'&gt;\n      &lt;header&gt;Products&lt;/header&gt;\n      &lt;section role='region' data-type='detail' class='template-detail'&gt;\n        &lt;div&gt;\n          &lt;p&gt;\n            &lt;img src='styles/temp/product_detail.png'&gt;\n          &lt;/p&gt;\n        &lt;/div&gt;\n        &lt;div class='chrome-fixed-bottom'&gt;\n          &lt;ul&gt;\n            &lt;li&gt;&lt;button&gt;Cancel&lt;/button&gt;&lt;/li&gt;\n            &lt;li&gt;&lt;button class='recommend'&gt;Next&lt;/button&gt;&lt;/li&gt;\n          &lt;/ul&gt;\n        &lt;/div&gt;\n      &lt;/section&gt;\n    &lt;/section&gt;\n\n    &lt;!-- footer region --&gt;\n    &lt;section role='region' data-type='footer'&gt;\n      &lt;footer&gt;&lt;/footer&gt;\n    &lt;/section&gt;\n  &lt;/div&gt;\n\n  &lt;!-- represents application screen\n       PRODUCT DETAIL VIEW --&gt;\n  &lt;div id='productDetailView' role='window'&gt;\n\n    &lt;!-- title bar region --&gt;\n    &lt;section role='region' data-type='header'&gt;\n      &lt;header&gt;\n        &lt;button&gt;&lt;span class='icon icon-back'&gt;back&lt;/span&gt;&lt;/button&gt;\n        &lt;menu type='toolbar'&gt;\n          &lt;!-- TODO: make this an edit icon where the list is populated --&gt;\n          &lt;a href='#'&gt;&lt;span class='icon icon-info'&gt;info&lt;/span&gt;&lt;/a&gt;\n        &lt;/menu&gt;\n        &lt;h1&gt;Nomadic One Necklace&lt;/h1&gt;\n      &lt;/header&gt;\n    &lt;/section&gt;\n\n    &lt;!-- content region --&gt;\n    &lt;section role='region' data-type='content'&gt;\n      &lt;header&gt;&lt;/header&gt;\n      &lt;section role='region' data-type='detail' class='template-detail box-padded'&gt;\n        &lt;p class='box-unpadded'&gt;\n          &lt;img src='styles/temp/product_list_thumb.png'&gt;\n        &lt;/p&gt;\n        &lt;h2&gt;Item Name&lt;/h2&gt;\n        &lt;p class='box-unpadded'&gt;\n          Nomadic One Necklace\n        &lt;/p&gt;\n        &lt;h2&gt;Description&lt;/h2&gt;\n        &lt;p class='box-unpadded'&gt;\n          This piece of jewelry is made from brass and braided rope in New York.  Handmade by the designer and each one is completely unique.  Part of a series of work.\n        &lt;/p&gt;\n        &lt;h2&gt;Price&lt;/h2&gt;\n        &lt;p class='box-unpadded'&gt;\n          $29.99\n        &lt;/p&gt;\n      &lt;/section&gt;\n    &lt;/section&gt;\n\n    &lt;!-- footer region --&gt;\n    &lt;section role='region' data-type='footer'&gt;\n      &lt;footer&gt;&lt;/footer&gt;\n    &lt;/section&gt;\n  &lt;/div&gt;\n\n  &lt;!-- represents application screen\n       PRODUCT DETAIL EDIT --&gt;\n  &lt;div id='productDetailEdit' role='window'&gt;\n\n    &lt;!-- title bar region --&gt;\n    &lt;section role='region' data-type='header'&gt;\n      &lt;header&gt;\n        &lt;button&gt;&lt;span class='icon icon-back'&gt;back&lt;/span&gt;&lt;/button&gt;\n        &lt;menu type='toolbar'&gt;\n          &lt;!-- TODO: skin this button properly --&gt;\n          &lt;button&gt;Done&lt;/button&gt;\n        &lt;/menu&gt;\n        &lt;h1&gt;Nomadic One Necklace&lt;/h1&gt;\n      &lt;/header&gt;\n    &lt;/section&gt;\n\n    &lt;!-- content region --&gt;\n    &lt;section role='region' data-type='content'&gt;\n      &lt;header&gt;&lt;/header&gt;\n      &lt;section role='region' data-type='detail' class='template-detail box-padded'&gt;\n        &lt;p class='box-unpadded'&gt;\n          &lt;img src='styles/temp/product_list_thumb.png'&gt;\n        &lt;/p&gt;\n        &lt;h2&gt;Item Name&lt;/h2&gt;\n        &lt;p class='box-unpadded'&gt;\n          &lt;input value='Nomadic One Necklace' type='text'&gt;\n        &lt;/p&gt;\n        &lt;h2&gt;Description&lt;/h2&gt;\n        &lt;p class='box-unpadded'&gt;\n          &lt;textarea&gt;This piece of jewelry is made from brass and braided rope in New York.  Handmade by the designer and each one is completely unique.  Part of a series of work.&lt;/textarea&gt;\n        &lt;/p&gt;\n        &lt;h2&gt;Price&lt;/h2&gt;\n        &lt;p class='box-unpadded'&gt;\n          &lt;input value='$29.99' type='text'&gt;\n        &lt;/p&gt;\n        &lt;p class='box-margin-top box-unpadded'&gt;\n          &lt;button&gt;Delete&lt;/button&gt;\n        &lt;/p&gt;\n      &lt;/section&gt;\n    &lt;/section&gt;\n\n    &lt;!-- footer region --&gt;\n    &lt;section role='region' data-type='footer'&gt;\n      &lt;footer&gt;&lt;/footer&gt;\n    &lt;/section&gt;\n  &lt;/div&gt;\n\n  &lt;!-- represents application screen\n       LEFT NAV --&gt;\n\n  &lt;nav id='leftNav'&gt;\n    &lt;header&gt;\n      &lt;h1&gt;Categories&lt;/h1&gt;\n    &lt;/header&gt;\n    &lt;div class='inner'&gt;\n      &lt;ul&gt;\n        &lt;li&gt;\n          &lt;a href='#'&gt;Jewelry&lt;/a&gt;\n          &lt;button&gt;&lt;/button&gt;\n        &lt;/li&gt;\n        &lt;li&gt;\n          &lt;a href='#'&gt;Handbags&lt;/a&gt;\n          &lt;button&gt;&lt;/button&gt;\n        &lt;/li&gt;\n        &lt;li&gt;\n          &lt;a href='#'&gt;Other Items&lt;/a&gt;\n          &lt;button&gt;&lt;/button&gt;\n        &lt;/li&gt;\n        &lt;li&gt;&lt;a href='#'&gt;Search&lt;/a&gt;&lt;/li&gt;\n        &lt;li&gt;&lt;a href='#'&gt;Contact Proprietor&lt;/a&gt;&lt;/li&gt;\n      &lt;/ul&gt;\n    &lt;/div&gt;\n  &lt;/nav&gt;\n\n  &lt;!-- represents application template screen, prefixed appTmpl\n       APPLICATION PRODUCT DETAIL with PREVIEW --&gt;\n  &lt;div id='appView' role='window' class='theme-01'&gt;\n    &lt;section role='region' data-type='outer-chrome' class='outer-chrome'&gt;\n        &lt;button&gt;Back&lt;/button&gt;\n    &lt;/section&gt;\n    &lt;!-- title bar region --&gt;\n    &lt;section role='region' data-type='header'&gt;\n      &lt;header&gt;\n        &lt;button&gt;&lt;span class='icon icon-menu'&gt;menu&lt;/span&gt;&lt;/button&gt;\n        &lt;menu type='toolbar'&gt;\n          &lt;button&gt;&lt;span class='icon icon-cart'&gt;cart&lt;/span&gt;&lt;/button&gt;\n        &lt;/menu&gt;\n        &lt;h1&gt;Maria's Fine Crafts&lt;/h1&gt;\n      &lt;/header&gt;\n    &lt;/section&gt;\n\n    &lt;!-- content region --&gt;\n    &lt;section role='region' data-type='content' class='fade'&gt;\n      &lt;section role='region' data-type='detail' class='template-detail box-padded'&gt;\n        &lt;div class='carousel'&gt;\n          carousel\n        &lt;/div&gt;\n        &lt;div&gt;Nomad One Necklace&lt;/div&gt;\n        &lt;div&gt;&lt;button class='buy'&gt;$29.99&lt;/button&gt;&lt;/div&gt;\n      &lt;/section&gt;\n      &lt;footer&gt;\n        &lt;h2&gt;About Maria's Fine Crafts&lt;/h2&gt;\n        &lt;p&gt;Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at orci est. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at orci est.&lt;/p&gt;\n      &lt;/footer&gt;\n    &lt;/section&gt;\n\n    &lt;!-- footer region --&gt;\n    &lt;section role='region' data-type='footer'&gt;\n      &lt;footer&gt;&lt;/footer&gt;\n    &lt;/section&gt;\n  &lt;/div&gt;\n\n\n  &lt;!-- represents application publish uploading screen\n       APPLICATION BUILDER PUBLISH SUBMIT --&gt;\n  &lt;div id='appBuilderPublishSubmit' class='dark-bg' role='window'&gt;\n        &lt;!-- content region --&gt;\n        &lt;section role='region' data-type='content' class='box-padded'&gt;\n            &lt;section role='region' data-type='header' class='medium-bg round-corners box-padded'&gt;\n                &lt;h2&gt;Publishing&lt;/h2&gt;\n                &lt;h3&gt;Small Store&lt;/h3&gt;    \n            &lt;/section&gt;\n            &lt;section role='region' data-type='detail' class='box-padded scroll-window'&gt;\n                &lt;h4&gt;Building in html...&lt;/h4&gt;\n                &lt;pre&gt;<html>&lt;/pre&gt;\n                &lt;hr&gt;\n            &lt;/section&gt;\n\n        \n        &lt;p&gt;\n        &lt;button id='cancel' onclick='console.log(window.utils.escapeHTML('&lt;html&gt;'))'&gt;Cancel&lt;/button&gt;\n        &lt;/p&gt;\n        \n        &lt;/section&gt;\n\n        &lt;!-- footer region --&gt;\n        &lt;section data-type='footer' role='region'&gt;\n            &lt;footer&gt;&lt;/footer&gt;\n        &lt;/section&gt;\n  &lt;/div&gt;\n\n  &lt;script type='text/javascript' src='scripts/temp/utils.js'&gt;&lt;/script&gt;\n  &lt;script type='text/javascript' src='scripts/temp/sandbox.js'&gt;&lt;/script&gt;\n\n&lt;!--\n  &lt;script src='http://debug.phonegap.com/target/target-script-min.js#mozmoz'&gt;&lt;/script&gt;\n  &lt;script type='text/javascript' src='scripts/temp/mediadb.js'&gt;&lt;/script&gt;\n  &lt;script type='text/javascript' src='scripts/temp/MetadataParser.js'&gt;&lt;/script&gt;\n  \n --&gt; \n\n  &lt;!-- build:js scripts/scripts.js --&gt;\n  \n  &lt;!--script type='text/javascript' src='scripts/temp/media/jpeg_metadata_parser.js'&gt;&lt;/script--&gt;\n  \n  &lt;!--script src='http://tools.code-eleven.com:8080/target/target-script-min.js#anonymous'&gt;&lt;/script--&gt;\n\n  \n\n  &lt;!-- endbuild --&gt;\n&lt;!-- yeoman livereload snippet --&gt;\n&lt;script&gt;document.write('&lt;script src='http://'\n + (location.host || 'localhost').split(':')[0]\n + ':3501/livereload.js?snipver=1'&gt;&lt;\\/script&gt;')\n&lt;/script&gt;&lt;script src='http://localhost:3501/livereload.js?snipver=1'&gt;&lt;/script&gt;\n\n\n&lt;/body&gt;'&lt;/html&gt;";});
templates['imageSubView'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, foundHelper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div id=";
  foundHelper = helpers.imgSmallPath;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.imgSmallPath; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "></div>";
  return buffer;});
templates['myAppsSubViewTemplate'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers; data = data || {};
  var stack1, stack2, functionType="function", escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  
  return "\n    <h1>Loading...</h1>\n";}

function program3(depth0,data) {
  
  var buffer = "", stack1, stack2, foundHelper;
  buffer += "\n    ";
  stack1 = depth0.myApps;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.length;
  stack2 = {};
  stack2['compare'] = 1;
  foundHelper = helpers.if_lt;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, {hash:stack2,inverse:self.program(6, program6, data),fn:self.program(4, program4, data),data:data}) : helperMissing.call(depth0, "if_lt", stack1, {hash:stack2,inverse:self.program(6, program6, data),fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  return buffer;}
function program4(depth0,data) {
  
  
  return "\n        <li class=\"header\">\n            <h2 class=\"title\">Please choose an app template to get started.</h2>\n        </li>  \n    ";}

function program6(depth0,data) {
  
  var buffer = "", stack1, stack2;
  buffer += "\n        <li>\n        <input id=\"item-0\" type=\"radio\" name=\"radio\" checked>\n          <label for=\"item-0\" class=\"list-item label-dark open\">My Apps</label>\n          <div id=\"myAppsBody\" class=\"list-item-body show-scroll\">\n            <ul class=\"horizontal-list\">\n            ";
  stack1 = depth0.myApps;
  stack2 = {};
  stack1 = helpers.each.call(depth0, stack1, {hash:stack2,inverse:self.noop,fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            </ul>\n          </div>\n        </li>\n    ";
  return buffer;}
function program7(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n                <li class=\"list-item\">\n                    <a href=\"#apps/";
  foundHelper = helpers.id;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "\"><img src=\"";
  foundHelper = helpers.imgSmallPath;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.imgSmallPath; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "\" class=\"template-thumbnail\"><span>";
  foundHelper = helpers.name;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "</span></a>\n                </li>\n            ";
  return buffer;}

  stack1 = depth0.loading;
  stack2 = {};
  stack1 = helpers['if'].call(depth0, stack1, {hash:stack2,inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }});
templates['openApp'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, foundHelper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "\n<!-- represents application publish uploading screen\nAPPLICATION BUILDER PUBLISH SUBMIT -->\n<div id=\"appBuilderOpenApp\" role=\"window\">\n    <!-- content region -->\n    <section role=\"region\" data-type=\"content\" class=\"box-padded\">\n    	<h2 class=\"half-top\">";
  foundHelper = helpers.name;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "</h2>\n    	<!-- left/right padding not working on device, so put in <br/> tag to wrap text-->\n    	<p class=\"box-no-margin large-content-text\">\n    		has been published to the \n    		<br/> \n    		Firefox Marketplace.\n    	</p>\n    	<p class=\"box-no-margin container-bottom\">\n			<button id=\"openAppButton\">Open App</button>\n			<button id=\"backButton\">Back to App Builder</button>\n		</p>\n    </section>\n</div>";
  return buffer;});
templates['productDetailEditTemplate'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers; data = data || {};
  var stack1, stack2, functionType="function", escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  
  return "\n    <h1>Loading...</h1>\n";}

function program3(depth0,data) {
  
  var buffer = "", stack1, stack2, foundHelper;
  buffer += "\n    <!-- represents application screen PRODUCT DETAIL EDIT -->\n    <div id=\"productDetailEdit\" role=\"window\">\n\n        <!-- title bar region -->\n        <section role=\"region\" data-type=\"header\">\n            <header>\n                <button id=\"back\"><span class=\"icon icon-back\">back</span></button>\n                <menu type=\"toolbar\">\n                    <!-- TODO: skin this button properly -->\n                    <button id=\"productDetailEditDone\">Done</button>\n                </menu>\n            ";
  stack1 = depth0.name;
  stack2 = {};
  stack1 = helpers['if'].call(depth0, stack1, {hash:stack2,inverse:self.program(6, program6, data),fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            </header>\n        </section>\n        <!-- content region -->\n        <section role=\"region\" data-type=\"content\">\n            <section role=\"region\" data-type=\"detail\" class=\"template-detail box-padded-small\">\n                <div class=\"box-left-padded\">\n                    ";
  stack1 = depth0.imgStorageType;
  stack2 = {};
  stack2['compare'] = "package";
  foundHelper = helpers.if_eq;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, {hash:stack2,inverse:self.program(10, program10, data),fn:self.program(8, program8, data),data:data}) : helperMissing.call(depth0, "if_eq", stack1, {hash:stack2,inverse:self.program(10, program10, data),fn:self.program(8, program8, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                </div>\n                <div class=\"grey-box\">\n                    <p class=\"box-unpadded\">\n                        <label class=\"label-padded label-upper\">Item Name</label>\n                        <input id=\"name\" name=\"name\" type=\"text\" value=\"";
  foundHelper = helpers.name;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "\" />\n                    </p>\n                    <p class=\"box-unpadded\">\n                        <label class=\"label-padded label-upper\">Description</label>\n                        <textarea id=\"description\" name=\"description\">";
  foundHelper = helpers.description;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.description; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "</textarea>\n                    </p>\n                    <p class=\"box-unpadded\">\n                        <label class=\"label-padded\">Price</label>\n                        <input id=\"price\" name=\"price\" type=\"text\" value=\"";
  foundHelper = helpers.price;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.price; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "\" />\n                    </p>\n                ";
  stack1 = depth0.add;
  stack2 = {};
  stack1 = helpers['if'].call(depth0, stack1, {hash:stack2,inverse:self.program(17, program17, data),fn:self.program(15, program15, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                </div>\n\n            </section>\n        </section>\n        <!-- footer region -->\n        <section role=\"region\" data-type=\"footer\">\n            <footer></footer>\n        </section>\n    </div>\n";
  return buffer;}
function program4(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n                <h1>";
  foundHelper = helpers.name;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "</h1>\n            ";
  return buffer;}

function program6(depth0,data) {
  
  
  return "\n                <h1>Add Details</h1>\n            ";}

function program8(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n                        <p class=\"box-unpadded\" id=\"productDetailImage\"><img src=\"";
  foundHelper = helpers.imgSmallPath;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.imgSmallPath; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "\"></p>\n                    ";
  return buffer;}

function program10(depth0,data) {
  
  var buffer = "", stack1, stack2;
  buffer += "\n                        ";
  stack1 = depth0.add;
  stack2 = {};
  stack1 = helpers['if'].call(depth0, stack1, {hash:stack2,inverse:self.program(13, program13, data),fn:self.program(11, program11, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "                            \n                    ";
  return buffer;}
function program11(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n                        <!-- <a href=\"#apps/";
  foundHelper = helpers.appID;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.appID; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "/cameraGallery\"> //-->\n                            <p class=\"box-unpadded\" id=\"productDetailImage\"></p>\n                        <!-- </a>//-->\n                        ";
  return buffer;}

function program13(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n                        <!-- <a href=\"#apps/";
  foundHelper = helpers.appID;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.appID; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "/cameraGallery/";
  foundHelper = helpers.id;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "\"> //-->\n                            <p class=\"box-unpadded\" id=\"productDetailImage\"></p>\n                        <!-- </a>//-->\n                        ";
  return buffer;}

function program15(depth0,data) {
  
  
  return "\n                ";}

function program17(depth0,data) {
  
  
  return "\n                    <p class=\"box-unpadded box-button-footer\">\n                        <button id=\"deleteProductDetail\" class=\"danger\">Delete</button>\n                    </p>\n                ";}

  stack1 = depth0.loading;
  stack2 = {};
  stack1 = helpers['if'].call(depth0, stack1, {hash:stack2,inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }});
templates['productListViewTemplate'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, stack2, foundHelper, functionType="function", escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  
  return "\n                            <div class=\"product-empty\">\n                              <p>To add products, tap the + button</p>\n                            </div>\n                        ";}

function program3(depth0,data) {
  
  var buffer = "", stack1, stack2;
  buffer += "\n                            <ul data-type=\"list\">\n                                ";
  stack1 = depth0.products;
  stack2 = {};
  stack1 = helpers.each.call(depth0, stack1, {hash:stack2,inverse:self.noop,fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                            </ul>\n                        ";
  return buffer;}
function program4(depth0,data) {
  
  var buffer = "", stack1, stack2, foundHelper;
  buffer += "\n                                    <li>\n                                        <a href=\"#apps/";
  foundHelper = helpers.appID;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.appID; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "/product-list/";
  stack1 = depth0.id;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "\">\n                                            ";
  stack1 = depth0.imgStorageType;
  stack2 = {};
  stack2['compare'] = "devicestorage";
  foundHelper = helpers.if_eq;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, {hash:stack2,inverse:self.program(7, program7, data),fn:self.program(5, program5, data),data:data}) : helperMissing.call(depth0, "if_eq", stack1, {hash:stack2,inverse:self.program(7, program7, data),fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n                                            <figcaption>\n                                                <p>";
  stack1 = depth0.name;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "</p>\n                                                <p>";
  stack1 = depth0.description;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "</p>\n                                                <p>";
  stack1 = depth0.price;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "</p>\n                                            </figcaption>\n                                            <!-- take out arrow for now -->\n                                            <!--\n                                            <span class=\"preview-visual\">preview</span>\n                                            -->\n                                        </a>\n                                    </li>\n                                ";
  return buffer;}
function program5(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                                                <figure id=\"";
  stack1 = depth0.id;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "\"></figure>   <!-- this.imgSmallPath //-->\n                                            ";
  return buffer;}

function program7(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                                                <figure><img src=\"";
  stack1 = depth0.imgSmallPath;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "\"></figure>\n                                            ";
  return buffer;}

  buffer += "<div id=\"productList\" role=\"window\">\n                <!-- title bar region -->\n                <section role=\"region\" data-type=\"header\">\n                <header>\n                    <button id=\"back\"><span class=\"icon icon-back\">back</span></button>\n                    <menu type=\"toolbar\">\n                        <!-- TODO: make this an add icon -->\n                        <!-- TODO: make this an edit icon where the list is populated -->\n                        <a id=\"link-add-product\"><span class=\"\">+</span></a>\n                    </menu>\n                    <h1>Product List</h1>\n                </header>\n                </section>\n\n                <!-- content region -->\n                <section role=\"region\" data-type=\"content\">\n                    <header>Products</header>\n                    <section role=\"region\" data-type=\"detail\" class=\"template-detail\">\n                        ";
  stack1 = depth0.products;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.length;
  stack2 = {};
  stack2['compare'] = 1;
  foundHelper = helpers.if_lt;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, {hash:stack2,inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data}) : helperMissing.call(depth0, "if_lt", stack1, {hash:stack2,inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                    </section>\n                </section>\n            </div>";
  return buffer;});
templates['screenViewTemplate'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers; data = data || {};
  


  return "<div id=\"templateList\" role=\"window\">\n\n<!-- title bar region -->\n<section role=\"region\">\n  <header>\n    <button id=\"menuButton\"><span class=\"icon icon-menu\">menu</span></button>\n    <h1>Mozillapps</h1>\n  </header>\n</section>\n\n<!-- content region -->\n<section role=\"region\" data-type=\"accordion\">\n    <ul id=\"appList\" class=\"list template-list\">\n\n    </ul>\n    <ul id=\"templateAccordianList\" class=\"list template-list\">\n\n    </ul>\n</section>\n\n<!-- footer region -->\n<section role=\"region\" data-type=\"footer\">\n    <footer></footer>\n</section>\n</div> ";});
templates['templateDetailViewTemplate'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, stack2, foundHelper, functionType="function", escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n            <button class=\"previous\" data-id=\"";
  foundHelper = helpers.prevTemplateId;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.prevTemplateId; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "\"><span class=\"hidden\"><</span></button>\n        ";
  return buffer;}

function program3(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n            <button class=\"next\" data-id=\"";
  foundHelper = helpers.nextTemplateId;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.nextTemplateId; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "\"><span class=\"hidden\">></span></button>\n        ";
  return buffer;}

function program5(depth0,data) {
  
  
  return "\n                <button id=\"useButton\" class=\"recommend\">Choose</button>\n            ";}

function program7(depth0,data) {
  
  
  return "\n                <button id=\"useButton\" disabled>Choose</button>\n            ";}

  buffer += "<div id=\"templateDetail\" role=\"window\">\n\n    <!-- title bar region -->\n    <section role=\"region\" data-type=\"header\">\n        <header>\n            <button id=\"back\"><span class=\"icon icon-back\">back</span></button>\n            <h1>Featured Templates</h1>\n        </header>\n    </section>\n\n    <!-- content region -->\n    <section role=\"region\" data-type=\"content\">\n        <section role=\"region\" data-type=\"header\" class=\"template-detail-header\">\n        ";
  stack1 = depth0.prevTemplateId;
  stack2 = {};
  stack1 = helpers['if'].call(depth0, stack1, {hash:stack2,inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        ";
  stack1 = depth0.nextTemplateId;
  stack2 = {};
  stack1 = helpers['if'].call(depth0, stack1, {hash:stack2,inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            <div id=\"templateNameList\">\n                <ul>\n                    <li>";
  foundHelper = helpers.name;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "</li>\n                </ul>\n            </div>    \n            <p class=\"template-index\">";
  foundHelper = helpers.index;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.index; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + " of ";
  foundHelper = helpers.count;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.count; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "</p>\n        </section>\n        <section role=\"region\" data-type=\"detail\" class=\"template-detail cf\">\n            <img src=\"";
  foundHelper = helpers.imgSmallPath;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.imgSmallPath; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "\" alt=\"\">\n            <div>\n                <p>";
  foundHelper = helpers.description;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.description; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "</p>\n            ";
  stack1 = depth0.isEnabled;
  stack2 = {};
  stack2['compare'] = true;
  foundHelper = helpers.if_eq;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, {hash:stack2,inverse:self.program(7, program7, data),fn:self.program(5, program5, data),data:data}) : helperMissing.call(depth0, "if_eq", stack1, {hash:stack2,inverse:self.program(7, program7, data),fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "    \n            </div>\n        </section>\n\n        <section role=\"region\" data-type=\"content\" class=\"box-padded\">\n            <h2>Customize</h2>\n            <p>Choose a color theme, image display style, application icon and menu style that suits your app.</p>\n            <h2>Add Content</h2>\n            <p>Add images from your phone’s camera or gallery. Tell the world about yourself or your business by adding unique pages to your app.</p>\n            <h2>Socialize</h2>\n            <p>Popularize your app by easily adding links to your favorite social networks.</p>\n            <h2>Sell</h2>\n            <p>Set up a store so you can sell directly from your application.</p>\n        </section>\n    </section>\n    \n    <!-- footer region -->\n    <section role=\"region\" data-type=\"footer\">\n    <footer></footer>\n    </section>\n</div>";
  return buffer;});
templates['templatesSubViewTemplate'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, stack2, functionType="function", escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  
  return "\n            <!-- only want one loading message -->\n          ";}

function program3(depth0,data) {
  
  var buffer = "", stack1, stack2, foundHelper;
  buffer += "\n            ";
  stack1 = depth0.mozTemplates;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.categories;
  stack2 = {};
  foundHelper = helpers.templateListViewHelper;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, {hash:stack2,inverse:self.noop,fn:self.program(4, program4, data),data:data}) : helperMissing.call(depth0, "templateListViewHelper", stack1, {hash:stack2,inverse:self.noop,fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n          ";
  return buffer;}
function program4(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                ";
  stack1 = depth0.name;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "\n            ";
  return buffer;}

  buffer += "          ";
  stack1 = depth0.loading;
  stack2 = {};
  stack1 = helpers['if'].call(depth0, stack1, {hash:stack2,inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  return buffer;});
})();