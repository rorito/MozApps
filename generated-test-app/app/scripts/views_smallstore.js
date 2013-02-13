smallstore.Views.homeView = Backbone.View.extend({
    template: Handlebars.templates['appViewTemplate'],
    classNames: window.widgets.carouselClassNames,
    productCarousel:null,
    productList: [],
    events: {
        'click a.link-product-temp' : "showProductDetail"
    },
    showProductDetail: function(event) {
        event.preventDefault();
        console.log(event.currentTarget);
        var targetLink = event.currentTarget;
        var productID = targetLink.getAttribute("productID");

        smallstore.router.navigate("#product/"+productID,true);
    },
    render: function(eventName) {
        console.log("home render")
        var counter = 0;
        var selectedProduct = {};
        productList = [];
        smallstore.productCollection.where({appID: this.appID}).forEach(function(element,index,array){
            productList.push(element.toJSON());
            // determine classname based on index
            // blending in some visual markup (className) with the data here
            // TODO: this needs to be smarter if there are less than 5 items in the carousel
            var className = window.widgets.getCarouselClassNameForIndex(counter);
            var lastProductAdded = productList[productList.length - 1];
            lastProductAdded.className = className;
            if (className === "") {
                // empty classname is the selected one
                selectedProduct.name = lastProductAdded.name;
                selectedProduct.price = lastProductAdded.price;
            }
            // update counter
            counter++;
        });

        var aboutJSON = _.find(smallstore.appCollection.get(this.appID).toJSON().app_components, function(elem){
            return elem.component_id == "about";
        });

        var themeJSON = _.find(smallstore.appCollection.get(this.appID).toJSON().app_components, function(elem){
            return elem.component_id == "theme";
        });
        //console.log(selectedProduct);
        this.$el.html(this.template(
            {
                model: this.model.toJSON(), 
                products: productList, 
                about: aboutJSON, 
                theme: themeJSON.properties.selectedTheme, 
                selectedProduct: selectedProduct,
                dontShowBackButton: true 
            })
        );

        // underscore uses setTimeout under the hood so not sure this will work on device
        _.defer( function( view ){ view.createCarousel();}, this );
        
        return this;
    },
    createCarousel: function() {
        //console.log('create carousel !!!');
        
        // callback to instantiate carousel
        productCarousel = new window.widgets.carousel();
        // id should be part of view
        productCarousel.init("#productCarousel");
        // set callbacks
        productCarousel.onSwipeDone = (function(targetIndex, targetEl) {
            //console.log('on swipe done: ' + targetIndex);
            //console.log('on swipe done: ' + targetEl);

            // get product info based on app id and product id
            if (targetIndex < productList.length) {
                var newSelectedProduct = productList[targetIndex];
                // update the dom
                $('#product-name').html(newSelectedProduct.name);
                $('#product-price').html('$' + newSelectedProduct.price);
            }
        }).bind(this);
        
        productCarousel.onMainItemClicked = (function(targetIndex, targetEl) {
            console.log('on main item clicked: ' + targetIndex);   
            console.log('on main item clicked: ' + targetEl);
            if (targetEl) {
                var productID = targetEl.getAttribute("productID");
                //console.log(this.appID);
                //console.log(productID);
                smallstore.router.navigate("#product/"+productID,true);
            }
        }).bind(this);
    }
});

smallstore.Views.productDetailView = Backbone.View.extend({
    template: Handlebars.templates['appViewProductDetailTemplate'],
    events: {
        'click button#back' : "back"
    },
    back : function() {
        smallstore.router.navigate("#",true);
    },
    render: function(eventName) {
        console.log("product detail render")
        var productJSON = smallstore.productCollection.get({id: this.productID});

        console.log('appID: ' + this.appID);

        var themeJSON = _.find(smallstore.appCollection.get(this.appID).toJSON().app_components, function(elem){
            return elem.component_id == "theme";
        });
        
        this.$el.html(this.template({ dontShowBackButton: true, model: this.model.toJSON(), product: productJSON, theme: themeJSON.properties.selectedTheme }));
        
        return this;
    }
});