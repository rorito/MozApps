
// utility helper
window.mozapps.Utils = window.mozapps.Utils || {}
	
window.mozapps.Utils.isConsole = true;

window.mozapps.Utils.setIsConsole = function(isConsole) {
	this.isConsole = isConsole;
}

window.mozapps.Utils.debugOut = function(msg) {
    if (this.isConsole) { console.log (msg); }
    else { alert(msg);}
}

window.mozapps.Utils.addToCollection = function(data,db) {
    if (data instanceof Array) {
            console.log("adding array of products to " + db.dbName);
            data.forEach(function(element, index, array){
                db.put(element.toJSON());
            });
    } else {
        console.log("adding single product to "+ db.dbName);
        db.put(data.toJSON());
    }
}

window.mozapps.Utils.removeFromCollection = function(data,db) {
    if (data instanceof Array) {
        console.log("removing array of products from DB");
        data.forEach(function(element, index, array){
            db.remove(element.toJSON().id);
        });
    } else {
        console.log("removing single product from DB");
        db.remove(data.toJSON().id);
    }
}

window.mozapps.Utils.getImageFromDeviceStorage = function(imgObj){
    var deferred = Deferred();

	var domRequest = navigator.getDeviceStorage("pictures").get(imgObj.filename);
    domRequest.onsuccess = function(){
        console.log("getImageFromDeviceStorage - callback request success");
        console.log(this.result.name);

        // var img = document.createElement("img");
        // img.height = imgSize;
        // img.width = imgSize;
        // img.src = window.URL.createObjectURL(this.result);
        // console.log("img.src");
        // console.log(img.src);
        // img.onload = function(e) {
        //     window.URL.revokeObjectURL(this.src);
        // }
        imgObj.url = window.URL.createObjectURL(this.result);
        deferred.resolve();

        //TODO instead of append, swap out img tags?
        //console.log("? Found element to append to?")
        //console.log(document.getElementById(idToAppendTo))
        //document.getElementById(idToAppendTo).appendChild(img);
    };
    domRequest.onerror = function(){
        console.log("getImageFromDeviceStorage - callback request fail");
    };

    return deferred.promise();
}

window.mozapps.Utils.cropResizeSave = function(imgRef, blob, canvasSize){
    var deferred = Deferred();

    var image = new Image();
    image.onload = function resizeImg() {
        var self = this;

        var canvas = document.createElement('canvas');
        canvas.width = canvasSize;
        canvas.height = canvasSize;
        var ctx = canvas.getContext('2d');
      
        var minSize = Math.min(image.width,image.height);
        var originX = image.width / 2 - minSize / 2;
        var originY = image.height / 2 - minSize / 2;

        ctx.drawImage(image, originX, originY, originX + minSize, originY + minSize, 0, 0, canvasSize, canvasSize);

        canvas.toBlob(function toBlobSuccess(resized_blob) {
            console.log("resized blob");




            // console.log(imgRef)
            // console.log(imgRef.imgOrigPath);
            // console.log(canvasSize);
            var newFilename = "mozapps-"+UUID.genV4().toString()+".jpg";
            var domRequest = navigator.getDeviceStorage("pictures").addNamed(resized_blob, newFilename);

            domRequest.onsuccess = function(){
                if(canvasSize == 156){
                    console.log("resize to 156: " + newFilename)
                    imgRef.imgSmallPath = newFilename;
                    //mozapps.productImage.imgSmallPath = newFilename;
                } else if(canvasSize == 320){
                    console.log("resize to 320: " + newFilename)
                    imgRef.imgLargePath = newFilename;
                    //mozapps.productImage.imgLargePath = newFilename;
                }

                deferred.resolve();
            };

            domRequest.onerror = function(){
                console.log("devicestorage addNamed error");
                console.log(domRequest.error);
                console.log(domRequest.error.name);
                alert("Error saving camera image");
                deferred.fail(domRequest.error);
            };
        }, 'image/jpeg', imgRef, canvasSize);
    };
    image.src = window.URL.createObjectURL(blob);

    return deferred.promise();
}

window.mozapps.Utils.getImageFromDeviceStorage2 = function(filename,idToAppendTo,imgSize){

	var domRequest = navigator.getDeviceStorage("pictures").get(filename);
    domRequest.onsuccess = function(){
        console.log("getImageFromDeviceStorage - callback request success");
        console.log(this.result.name);

        var img = document.createElement("img");
        img.height = imgSize;
        img.width = imgSize;
        img.src = window.URL.createObjectURL(this.result);
        img.onload = function(e) {
            //console.log("onload getImageFromDeviceStorage2 - append to DOM")
            console.log("append to: " + document.getElementById(idToAppendTo).id);
            document.getElementById(idToAppendTo).appendChild(img);
            window.URL.revokeObjectURL(this.src);
        }
        
       
    };
    domRequest.onerror = function(){
        console.log("getImageFromDeviceStorage - callback request fail");
        console.log(domRequest.error);
    };
}

window.mozapps.Utils.cameraGallery = function(productID){
    console.log("camera gallery")
        
    var pick = new MozActivity({
         name: "pick",
         data: {
            type: ["image/jpg", "image/jpeg"]
          }
     });

    pick.onsuccess = function () { 
        var self = this;

        mozapps.productImage = {};

        // console.log('PICK SUCCESS');
        // console.log('result: ' + this.result);
        // console.log('result.type: ' + this.result.type);
        // console.log('result.blob: ' + this.result.blob);
        // console.log('blob.type: ' + this.result.blob.type);
        // console.log('blob.name: ' + this.result.blob.name);
        // console.log('blob.size: ' + this.result.blob.size);

        //set original filename
        mozapps.productImage.imgOrigPath = this.result.blob.name;

        $.when(
            mozapps.Utils.cropResizeSave(mozapps.productImage, this.result.blob, 156),
            mozapps.Utils.cropResizeSave(mozapps.productImage, this.result.blob, 320)
        )
        .done(function(){
            console.log("************ crop Done") 
            console.log("appID: " + mozapps.appID);              

            if(productID && productID != ""){
                console.log("camera gallery - existing product");
                console.log(mozapps.productImage.imgSmallPath)
                console.log(mozapps.productImage.imgLargePath)

                // //update the model
                // var model = mozapps.productCollection.get(productID);
                // model.set({ 
                //     imgOrigPath: mozapps.productImage.imgOrigPath,
                //     imgSmallPath: mozapps.productImage.imgSmallPath,
                //     imgLargePath: mozapps.productImage.imgLargePath
                // });

                //need to use navigate(..., false) so that we update the URL, but don't navigate and trigger the product detail edit route
                mozapps.router.navigate("#apps/"+mozapps.appID+"/product-list/"+productID, false);
                //remove the existing image
                $("#productDetailImage").empty(); 
                window.mozapps.Utils.getImageFromDeviceStorage2(mozapps.productImage.imgSmallPath, "productDetailImage", 156);
            } else {
                console.log("camera gallery - new product");
                mozapps.router.navigate("#apps/"+mozapps.appID+"/product-list/add",true);
            }
        });
    };

        pick.onerror = function () { 
            console.log("Picker error");
            // console.log(this.error.name + ': ' + this.error);
            // mozapps.router.navigate("#apps/"+id+"/product-list",true);
        };
}

// window.mozapps.Utils.canvasImageResize = function(imageRef, width, height){
// 	var deferred = Deferred();

// 	imageRef = new Image();
//     imageRef.onload = function resizeImg() {
//       	var canvas = document.createElement('canvas');
//       	canvas.width = width;
//       	canvas.height = height;
      	
//       	var ctx = canvas.getContext('2d');
//       	ctx.drawImage(mozapps.productImage, 0, 0, width, height);
      	
//       	canvas.toBlob(function toBlobSuccess(resized_blob) {
//         	var domRequest = navigator.getDeviceStorage("pictures").addNamed(resized_blob, "mozapps-"+UUID.genV4().toString()+".jpg");
        	
// 	        domRequest.onsuccess = function(){
// 	            var self = this;
// 	            console.log("file name");
// 	            console.log(this.result);
// 	            self.imageRef.filename = this.result;
// 	            deferred.resolve();
// 	        };
// 	        domRequest.onerror = function(){
// 	            console.log("devicestorage addNamed error");
// 	            console.log(domRequest.error);
// 	            console.log(domRequest.error.name);
// 	            deferred.resolve();
// 	        };
//       	}, 'image/jpeg');
// 	};
	
// 	imageRef.src = window.URL.createObjectURL(this.result.blob);

// 	return deferred.promise();
// }