(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['appBuilderAboutTemplate'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers; data = data || {};
  var stack1, stack2, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  
  return "\n    <h1>Loading...</h1>\n";}

function program3(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n    <!-- represents application screen APP BUILDER NAME -->\n    <div id=\"appBuilderAbout\" role=\"window\">\n        <!-- title bar region -->\n        <section role=\"region\" data-type=\"header\">\n            <header>\n                <button id=\"back\"><span class=\"icon icon-back\">back</span></button>\n                <menu type=\"toolbar\">\n                <button id=\"aboutFormDone\">Done</button>\n                </menu>\n                <h1>About Me</h1>\n            </header>\n        </section>\n\n        <!-- content region -->\n        <section role=\"region\" data-type=\"content\" class=\"box-padded-small\">\n            <div class=\"grey-box\">\n                <form id=\"aboutForm\">\n                    <p>\n                        <label class=\"label-padded\">Description</label>\n                        <textarea rows=\"4\" id=\"description\">";
  foundHelper = helpers.description;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.description; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "</textarea>\n                    </p>\n                    <p>\n                        <label class=\"label-padded\">Address</label>\n                        <input type=\"text\" id=\"address\" value=\"";
  foundHelper = helpers.address;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.address; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "\">\n                    </p>\n                    <p>\n                        <label class=\"label-padded\">Phone Number</label>\n                        <input type=\"text\" id=\"phone\" value=\"";
  foundHelper = helpers.phone;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.phone; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "\">\n                    </p>\n                    <p>\n                        <label class=\"label-padded\">Email</label>\n                        <input type=\"text\" id=\"email\" value=\"";
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
  buffer += "\n    <!-- represents application screen APP BUILDER NAME -->\n    <div id=\"appBuilderName\" role=\"window\">\n        <!-- title bar region -->\n        <section role=\"region\" data-type=\"header\">\n            <header>\n                <button id=\"back\"><span class=\"icon icon-back\">back</span></button>\n                <menu type=\"toolbar\">\n                    <button id=\"nameFormDone\">Done</button>\n                </menu>\n                <h1>Name Your App</h1>\n            </header>\n        </section>\n\n        <!-- content region -->\n        <section role=\"region\" data-type=\"content\" class=\"box-padded-small\">\n\n            <div class=\"grey-box\">\n                <form id=\"nameForm\">\n                    <label for=\"nameField\" class=\"label-padded\">App Name</label>\n                    <input id=\"nameField\" name=\"nameField\" type=\"text\" value=\"";
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
  var stack1, stack2, self=this;

function program1(depth0,data) {
  
  
  return "\n                <h1>Loading...</h1>\n            ";}

function program3(depth0,data) {
  
  
  return "\n                <!-- represents application publish uploading screen\n                APPLICATION BUILDER PUBLISH SUBMIT -->\n                <div id=\"appBuilderPublishSubmit\" class=\"dark-bg\" role=\"window\">\n                    <!-- content region -->\n                    <section role=\"region\" data-type=\"content\" class=\"box-padded\">\n                        <section role=\"region\" data-type=\"header\" class=\"medium-bg round-corners box-padded\">\n                            <div class=\"load-status\">\n                            <h2>Publishing</h2>\n                            <h3>Small Store</h3>    \n                            </div>\n                        </section>\n                        <section role=\"region\" data-type=\"detail\" class=\"box-padded\">\n                            <div class=\"scroll-window\">\n                            <h4>Building in html...</h4>\n                            <pre id=\"publishMarkupContainer\">\n                            </pre>\n                        </section>\n                    </section>\n                </div>\n            ";}

  stack1 = depth0.loading;
  stack2 = {};
  stack1 = helpers['if'].call(depth0, stack1, {hash:stack2,inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }});
templates['appBuilderThemeTemplate'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers; data = data || {};
  var stack1, stack2, functionType="function", escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  
  return "\n                <h1>Loading...</h1>\n            ";}

function program3(depth0,data) {
  
  var buffer = "", stack1, stack2, stack3, foundHelper;
  buffer += "\n                <!-- represents application screen APP PUBLISH DESTINATION -->\n                <div id=\"appBuilderThemePicker\" role=\"window\">\n                    <!-- title bar region -->\n                    <section role=\"region\" data-type=\"header\">\n                        <header>\n                            <button id=\"back\"><span class=\"icon icon-back\">back</span></button>\n                            <menu type=\"toolbar\">\n                                <button id=\"themeFormDone\">Done</button>\n                            </menu>\n                            <h1>Choose Theme</h1>\n                        </header>\n                    </section>\n                    <!-- content region -->\n                    <section role=\"region\" data-type=\"content\">\n                        <section role=\"region\" data-type=\"detail\" class=\"template-detail cf\">\n                            <h1>Personalize your colors.</h1>\n                            <div class=\"light-bg round-corners box-padded-thin\">\n                                <h2>THEMES</h2>\n                                ";
  stack1 = depth0.selectedTheme;
  stack2 = depth0.themes;
  stack3 = {};
  foundHelper = helpers.themeSelectHelper;
  stack1 = foundHelper ? foundHelper.call(depth0, stack2, stack1, {hash:stack3,inverse:self.noop,fn:self.program(4, program4, data),data:data}) : helperMissing.call(depth0, "themeSelectHelper", stack2, stack1, {hash:stack3,inverse:self.noop,fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                            </div>\n                        </section>\n                    </section>\n                    \n                    \n                </div>\n            ";
  return buffer;}
function program4(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                                    ";
  stack1 = typeof depth0 === functionType ? depth0.apply(depth0) : depth0;
  buffer += escapeExpression(stack1) + "\n                                ";
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
  
  
  return "\n                <h1>Loading...</h1>\n            ";}

function program3(depth0,data) {
  
  var buffer = "", stack1, stack2, foundHelper;
  buffer += "\n                  <!-- represents application screen\n                     APP BUILDER -->\n                <div id=\"appBuilder\" role=\"window\">\n                  <!-- title bar region -->\n                  <section role=\"region\" data-type=\"header\">\n                    <header>\n                      <button id=\"back\"><span class=\"icon icon-back\">back</span></button>\n                      <h1>App Builder</h1>\n                    </header>\n                  </section>\n\n                  <!-- content region -->\n                  <section role=\"region\" data-type=\"content\">\n                    <section role=\"region\" data-type=\"detail\" class=\"template-detail cf\">\n                      <h1>";
  foundHelper = helpers.name;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "</h1>\n                      <div><img src=\"";
  foundHelper = helpers.imgSmallPath;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.imgSmallPath; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "\" class=\"template-thumbnail-small\"></div>\n                      <div>\n                        <button id=\"appBuilderPreview\" class=\"\">Preview</button>\n                        <button id=\"appBuilderPublish\" class=\"\">Publish</button>\n                      </div>\n                    </section>\n                    <section role=\"region\" data-type=\"list\">\n                      <header class=\"list-header\">Edit your app components</header>\n                      <ul data-type=\"edit\" class=\"components-list\">\n                        ";
  stack1 = depth0.app_components;
  stack2 = {};
  stack1 = helpers.each.call(depth0, stack1, {hash:stack2,inverse:self.noop,fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                      </ul>\n                    </section>\n                  </section>\n\n                  <!-- footer region -->\n                  <section role=\"region\" data-type=\"footer\">\n                    <footer></footer>\n                  </section>\n                </div>\n            ";
  return buffer;}
function program4(depth0,data) {
  
  var buffer = "", stack1, stack2, foundHelper;
  buffer += "\n                            <li>\n                                <p>";
  stack1 = depth0.component_name;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "</p>\n                                <p>";
  stack1 = depth0.description;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "</p>\n                                <button id=\"";
  foundHelper = helpers.component_id;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.component_id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "\" ";
  stack1 = depth0.completed;
  stack2 = {};
  stack1 = helpers['if'].call(depth0, stack1, {hash:stack2,inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "></button>\n                            </li>\n                        ";
  return buffer;}
function program5(depth0,data) {
  
  
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
  
  
  return "\n            <section role=\"region\" data-type=\"outer-chrome\" class=\"outer-chrome\">\n                <button id=\"back\">Exit Preview</button>\n            </section>\n        ";}

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
  buffer += "\n                                </label>\n                            </li>\n                            \n                            <!--\n                            <p><a href=\"#\" productID=\"";
  stack1 = depth0.id;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "\" class=\"link-product-temp\">";
  stack1 = depth0.name;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "</a></p>\n                            <p>";
  stack1 = depth0.description;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "</p>\n                            <p>";
  stack1 = depth0.price;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "</p>\n                            -->\n                        ";
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
  buffer += escapeExpression(stack1) + "</p>\n                <p>";
  stack1 = depth0.about;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.properties;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.email;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "</p>\n                <p>";
  stack1 = depth0.about;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.properties;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.phone;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "</p>    \n            ";
  return buffer;}

  stack1 = depth0.loading;
  stack2 = {};
  stack1 = helpers['if'].call(depth0, stack1, {hash:stack2,inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }});
templates['fake-markup'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers; data = data || {};
  


  return "//alert('loading');\n//mozapps.Templates.fakeMarkupTemplate = \"<p>test</p>\";\nmozapps.Templates.fakeMarkupTemplate = \"&lt;html&gt;\\r\\\n&lt;head&gt;\\r\\\n&lt;meta charset='utf-8'&gt;\\r\\\n&lt;metahttp-equiv='X-UA-Compatible'content='IE=edge,chrome=1'&gt;\\r\\\n&lt;title&gt;&lt;/title&gt;\\r\\\n&lt;metaname='description'content=''&gt;\\r\\\n&lt;metaname='viewport'content='width=device-width,initial-scale=1.0,maximum-scale=1.0'&gt;\\r\\\n&lt;metaname='apple-mobile-web-app-capable'content='yes'&gt;\\r\\\n&lt;linkrel='stylesheet'href='styles/main.css'&gt;\\r\\\n&lt;!--temp,forliverefreshdev--&gt;\\r\\\n&lt;style&gt;\\r\\\n#templateList,#templateDetail,#appBuilderEditIcon,#appBuilder,#productList,#productListEdit,#productAddImage,#productDetailView,#productDetailEdit,#appView,appBuilderPublishSubmit,#leftNav{\\r\\\n\\tdisplay:none;\\r\\\n}\\r\\\n&lt;/style&gt;\\r\\\n&lt;styletype='text/css'charset='utf-8'&gt;/*Seelicense.txtfortermsofusage*/\\r\\\n/**resetstyling**/\\r\\\n.firebugResetStyles{\\r\\\n\\tz-index:2147483646!important;\\r\\\n\\ttop:0!important;\\r\\\n\\tleft:0!important;\\r\\\n\\t\\display:block!important;\\r\\\n\\tborder:0none!important;\\r\\\n\\tmargin:0!important;\\r\\\n\\tpadding:0!important;\\r\\\n\\toutline:0!important;\\r\\\n\\tmin-width:0!important;\\r\\\n\\tmax-width:none!important;\\r\\\n\\tmin-height:0!important;\\r\\\n\\tmax-height:none!important;\\r\\\n\\tposition:fixed!important;\\r\\\n\\ttransform:rotate(0deg)!important;\\r\\\n\\ttransform-origin:50%50%!important;\\r\\\n\\tborder-radius:0!important;\\r\\\n\\tbox-shadow:none!important;\\r\\\n\\tbackground:transparentnone!important;\\r\\\n\\tpointer-events:none!important;\\r\\\n\\twhite-space:normal!important;\\r\\\n}\\r\\\nr\\\n.firebugBlockBackgroundColor{\\r\\\n\\tbackground-color:transparent!important;\\r\\\n}\\r\\\n\\t\\r\\\n\\t\\r\\\n\\t\\r\\\n\\t\\r\\\n\\t\\r\\\n\\t\\r\\\n\";\n//console.log(\">>>>>>>>>>>>>>>>hi\");";});
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
  buffer += "\n        <li>\n        <input id=\"item-0\" type=\"radio\" name=\"radio\" checked>\n          <label for=\"item-0\" class=\"list-item open\">My Apps</label>\n          <div id=\"myAppsBody\" class=\"list-item-body\">\n            <ul class=\"horizontal-list\">\n            ";
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
  buffer += escapeExpression(stack1) + "\"><img src=\"imgs/templates/small_store_sm.jpg\" class=\"template-thumbnail\"><span>";
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
  


  return "<button id=\"openAppButton\">Open App</button>\n<button id=\"backButton\">Back to App Builder</button>";});
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
  buffer += "\n            </header>\n        </section>\n\n        <!-- content region -->\n        <section role=\"region\" data-type=\"content\">\n            <section role=\"region\" data-type=\"detail\" class=\"template-detail box-padded-small\">\n                <div class=\"box-left-padded\">\n            ";
  stack1 = depth0.imgStorageType;
  stack2 = {};
  stack2['compare'] = "package";
  foundHelper = helpers.if_eq;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, {hash:stack2,inverse:self.program(10, program10, data),fn:self.program(8, program8, data),data:data}) : helperMissing.call(depth0, "if_eq", stack1, {hash:stack2,inverse:self.program(10, program10, data),fn:self.program(8, program8, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                </div>\n                <div class=\"grey-box\">\n                    <p class=\"box-unpadded\">\n                        <label class=\"label-padded\">Item Name</label>\n                        <input id=\"name\" name=\"name\" type=\"text\" value=\"";
  foundHelper = helpers.name;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "\" />\n                    </p>\n                    <p class=\"box-unpadded\">\n                        <label class=\"label-padded\">Description</label>\n                        <textarea id=\"description\" name=\"description\">";
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
  buffer += "\n                <p class=\"box-unpadded\"><img src=\"";
  foundHelper = helpers.imgSmallPath;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.imgSmallPath; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "\"></p>\n            ";
  return buffer;}

function program10(depth0,data) {
  
  var buffer = "", stack1, stack2;
  buffer += "\n                ";
  stack1 = depth0.add;
  stack2 = {};
  stack1 = helpers['if'].call(depth0, stack1, {hash:stack2,inverse:self.program(13, program13, data),fn:self.program(11, program11, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "                            \n            ";
  return buffer;}
function program11(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n                <a href=\"#apps/";
  foundHelper = helpers.appID;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.appID; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "/cameraGallery\">\n                    <p class=\"box-unpadded\" id=\"productDetailImage\"></p>\n                </a>\n                ";
  return buffer;}

function program13(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n                <a href=\"#apps/";
  foundHelper = helpers.appID;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.appID; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "/cameraGallery/";
  foundHelper = helpers.id;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "\">\n                    <p class=\"box-unpadded\" id=\"productDetailImage\"></p>\n                </a>\n                ";
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
  buffer += escapeExpression(stack1) + "\"></figure>\n                                            ";
  return buffer;}

function program7(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                                                <figure><img src=\"";
  stack1 = depth0.imgSmallPath;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "\"></figure>\n                                            ";
  return buffer;}

  buffer += "<div id=\"productList\" role=\"window\">\n                <!-- title bar region -->\n                <section role=\"region\" data-type=\"header\">\n                <header>\n                    <button id=\"back\"><span class=\"icon icon-back\">back</span></button>\n                    <menu type=\"toolbar\">\n                        <!-- TODO: make this an add icon -->\n                        <!-- TODO: make this an edit icon where the list is populated -->\n                        <a href=\"#apps/";
  foundHelper = helpers.appID;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.appID; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "/cameraGallery\" id=\"link-add-product\"><span class=\"\">+</span></a>\n                    </menu>\n                    <h1>Product List</h1>\n                </header>\n                </section>\n\n                <!-- content region -->\n                <section role=\"region\" data-type=\"content\">\n                    <header>Products</header>\n                    <section role=\"region\" data-type=\"detail\" class=\"template-detail\">\n                        ";
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
  


  return "<div id=\"templateList\" role=\"window\">\n\n<!-- title bar region -->\n<section role=\"region\">\n  <header>\n    <button id=\"menuButton\"><span class=\"icon icon-menu\">menu</span></button>\n    <h1>Mozillapps</h1>\n  </header>\n</section>\n\n<!-- content region -->\n<section role=\"region\" data-type=\"accordion\">\n    <ul id=\"appList\" class=\"list\">\n\n    </ul>\n    <ul id=\"templatelist\" class=\"list\">\n\n    </ul>\n</section>\n\n<!-- footer region -->\n<section role=\"region\" data-type=\"footer\">\n    <footer></footer>\n</section>\n</div> ";});
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
  buffer += escapeExpression(stack1) + "</li>\n                </ul>\n            </div>\n            <p class=\"template-index\">";
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
  foundHelper = helpers.name;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + " ";
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
  buffer += "    \n            </div>\n        </section>\n        <section role=\"region\" data-type=\"content\" class=\"box-padded\">\n            <h2>Customize</h2>\n            <p>Choose a color theme, image display style, application icon and menu style that suits your app.</p>\n            <h2>Add Content</h2>\n            <p>Add images from your phone’s camera or gallery. Tell the world about yourself or your business by adding unique pages to your app.</p>\n            <h2>Socialize</h2>\n            <p>Popularize your app by easily adding links to your favorite social networks.</p>\n            <h2>Sell</h2>\n            <p>Set up a store so you can sell directly from your application.</p>\n        </section>\n    </section>\n\n    <!-- footer region -->\n    <section role=\"region\" data-type=\"footer\">\n    <footer></footer>\n    </section>\n</div>";
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