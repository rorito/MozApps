
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

window.mozapps.Utils.cropResizeSave = function(blob, canvasWidth, canvasHeight){
    var deferred = Deferred();

    var image = new Image();
    image.onload = function resizeImg() {
        var self = this;

        var canvas = document.createElement('canvas');
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        var ctx = canvas.getContext('2d');
      
        var size = Math.min(self.width,self.height);
        var originX = self.width / 2 - size / 2;
        var originY = self.height / 2 - size / 2;

        ctx.drawImage(image, originX, originY, originX + size, originY + size, 0, 0, canvasWidth, canvasHeight);

        canvas.toBlob(function toBlobSuccess(resized_blob) {
            console.log("resized blob");
            var newFilename = "mozapps-"+UUID.genV4().toString()+".jpg";
            var domRequest = navigator.getDeviceStorage("pictures").addNamed(resized_blob, newFilename);

            domRequest.onsuccess = function(){
                deferred.resolve(newFilename);
            };

            domRequest.onerror = function(){
                console.log("devicestorage addNamed error");
                console.log(domRequest.error);
                console.log(domRequest.error.name);
                alert("Error saving camera image");
                deferred.fail(domRequest.error);
            };
        }, 'image/jpeg');
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
            window.URL.revokeObjectURL(this.src);
            console.log("getImageFromDeviceStorage2 - append to DOM")
            document.getElementById(idToAppendTo).appendChild(img);
        }        
    };
    domRequest.onerror = function(){
        console.log("getImageFromDeviceStorage - callback request fail");
        console.log(domRequest.error);
    };
}

window.mozapps.Utils.canvasImageResize = function(imageRef, width, height){
	var deferred = Deferred();

	imageRef = new Image();
    imageRef.onload = function resizeImg() {
      	var canvas = document.createElement('canvas');
      	canvas.width = width;
      	canvas.height = height;
      	
      	var ctx = canvas.getContext('2d');
      	ctx.drawImage(mozapps.productImage, 0, 0, width, height);
      	
      	canvas.toBlob(function toBlobSuccess(resized_blob) {
        	console.log("resized blob");
        	var domRequest = navigator.getDeviceStorage("pictures").addNamed(resized_blob, "mozapps-"+UUID.genV4().toString()+".jpg");
        	
	        domRequest.onsuccess = function(){
	            var self = this;
	            console.log("file name");
	            console.log(this.result);
	            self.imageRef.filename = this.result;
	            deferred.resolve();
	        };
	        domRequest.onerror = function(){
	            console.log("devicestorage addNamed error");
	            console.log(domRequest.error);
	            console.log(domRequest.error.name);
	            deferred.resolve();
	        };
      	}, 'image/jpeg');
	};
	
	imageRef.src = window.URL.createObjectURL(this.result.blob);

	return deferred.promise();
}