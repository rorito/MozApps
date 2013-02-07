
window.widgets = window.widgets || {
    carousel: function() {
        var listItems           = [];
        var activeCount         = null;
        var activeStartIndex    = 0;
        var indexOffset         = null;
        var activeClassNames    = ["left-out", "left-left", "left", "", "right", "right-right", "right-out"];

        this.init = function(carouselID) {
            //console.log('init: ' + carouselID);
            
            //console.log('init: ' + radioBtns.length);
            activeCount = activeClassNames.length;
            // calculate index offset
            indexOffset = Math.floor(activeCount / 2);
            
            initContainer(carouselID);
            // init the items
            initItems(carouselID);
        };

        // set up the container for swipe gestures
        var initContainer = function(carouselID) {
            //alert(carouselID);
            var container = document.querySelector(carouselID);
            //alert(container);
            // capture the swipe gesture
            new GestureDetector(container).startDetecting();
            container.addEventListener('swipe', handleSwipe);
        }

        // initialize radio buttons
        var initItems = function(carouselID) {
            listItems = [];
            var radioBtns = document.querySelectorAll(carouselID + " li input[type='radio']");
            for (var i=0; i<radioBtns.length; i++) {
                var radioBtn = radioBtns[i];
                radioBtn.onclick = function(event) {
                    handleRadioBtnClick(event, this);
                }

                

                // get reference to grandparent list item
                var targetLI = radioBtn.parentNode.parentNode;
                //console.log(targetLI.tagName);

                // populate the list item, where we will add and remove class names   
                if ("LI" === targetLI.tagName.toUpperCase()) {
                    listItems.push(targetLI);
                    // add callback for transition done
                    targetLI.addEventListener("transitionend", handleTransitionEnd, true);
                }
            }
        };

       

        // set active items
        var setActiveItems = function(targetIndex) {
            //console.log(">>>> : " + targetIndex);

            // loop through all items
            for (var i=0; i<listItems.length; i++) {
                var listItem = listItems[i];
                //console.log(i, listItem);

                if (i <= targetIndex - indexOffset) {
                    //console.log('a');
                    listItem.className = "left-off";
                } else if (i == targetIndex - 2) {
                    //console.log('b');
                    listItem.className = "left-left";
                } else if (i == targetIndex - 1) {
                    //console.log('c');
                    listItem.className = "left";
                } else if (i == targetIndex + 1) {
                    //console.log('d');
                    listItem.className = "right";
                } else if (i == targetIndex + 2) {
                    //console.log('e');
                    listItem.className = "right-right";
                } else if (i >= targetIndex + indexOffset) {
                    //console.log('f');
                    listItem.className = "right-off";
                } else {
                    listItem.className = "";
                }
                
            }

            activeStartIndex = targetIndex - indexOffset;
        }

        // event handler for radio button click
        var handleRadioBtnClick = function(event, targetBtn) {
            event.preventDefault();
            //alert('click');
            //console.log(targetBtn);
            var targetLI = targetBtn.parentNode.parentNode;
            var targetIndex = $(targetLI).index();
            //console.log(targetIndex);
            
            //alert(targetIndex); // 2
            //alert(activeStartIndex); //0
            //alert(indexOffset); // 3
            
            if (targetIndex != activeStartIndex + indexOffset) {
                setActiveItems(targetIndex);    
            } else {
                alert('go to product detail');
            }
            
        }

        var handleSwipe = function(event) {
            event.preventDefault();
            //alert('swipe');
            var data = event.detail;
            if (data) {
                //alert(data.direction);
                var currentIndex = activeStartIndex + indexOffset;
                if ("left" === data.direction) {
                    //alert('go left');
                    if (currentIndex + 1 < listItems.length) {
                        setActiveItems(currentIndex + 1);
                    }
                    
                } else {
                    //alert('go right');
                    if (currentIndex - 1 >= 0) {
                        setActiveItems(currentIndex - 1);
                    }
                }
            }
        }

        var handleTransitionEnd = function(event) {
            //  alert('transition end: ' + this);
            var targetIndex = $(this).index();
            if ((targetIndex === activeStartIndex + indexOffset) 
                && (event.propertyName.toUpperCase() === "LEFT")) {
                //alert(event);
                // we are changing multiple properties, so just catch the
                //console.log(event);
                alert('update text content for li: ' + targetIndex);
            }
        }
    }
};