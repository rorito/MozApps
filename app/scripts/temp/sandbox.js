// uncomment to install app on phone
/*
var request = navigator.mozApps.getSelf();
  request.onsuccess = function() {
    if (request.result) {
      // we're installed
    } else {
        navigator.mozApps.install("");
    }
  };
  request.onerror = function() {
    alert('Error checking installation status: ' + this.error.message);
  };
*/



var PHOTO_WIDTH = 83;
var PHOTO_HEIGHT = 83;
var currentPhoto;
var thumb;
var thumbContainer;

// debug script to test phone capability
var linkAddProduct = document.querySelector("#link-add-product");
if ("undefined" != typeof(linkAddProduct)) {
	linkAddProduct.onclick = function(event) {

        window.utils.setIsConsole(false);
        window.utils.debugOut('click');
        
        thumb = document.querySelector("#thumbnail-photo");
        thumbContainer = document.querySelector("#image-presenter");

        var pick = new MozActivity({
          name: 'pick',
          data: {
            type: 'image/jpeg',
            width: PHOTO_WIDTH, // The desired width of the image
            height: PHOTO_HEIGHT // The desired height of the image
          }
        });     

        pick.onsuccess = function () { 
            window.utils.debugOut('start pick');
            
            // XXX
              // this.result.blob is valid now, but it won't stay valid
              // (see https://bugzilla.mozilla.org/show_bug.cgi?id=806503)
              // And it might not be the size we want, anyway, so we make
              // our own copy that is at the right size.
              resizeBlob(this.result.blob, PHOTO_WIDTH, PHOTO_HEIGHT,
                         function(resized) {
                            //alert(resized);
                            //Contacts.updatePhoto(resized, thumb);
                            updatePhoto(resized, thumb);
                            //addPhoto(resized, thumbContainer);
                            savePhoto(resized);

                            // not able to enumerate files in device storage
                            //checkDeviceStorage();

                            // not able to browse using media library
                            //browsePhotoDB();    

                            currentPhoto = resized;
                         });
        };

        pick.onerror = function () { 
            alert("Can't view the image!");
        };

		// prevent default
		return false;
	}
}

function resizeBlob(blob, target_width, target_height, callback) {
    var img = document.createElement('img');
    var url = URL.createObjectURL(blob);
    img.src = url;
    img.onload = function() {
      var image_width = img.width;
      var image_height = img.height;
      var scalex = image_width / target_width;
      var scaley = image_height / target_height;
      var scale = Math.min(scalex, scaley);

      var w = target_width * scale;
      var h = target_height * scale;
      var x = (image_width - w) / 2;
      var y = (image_height - h) / 2;

      var canvas = document.createElement('canvas');
      canvas.width = target_width;
      canvas.height = target_height;
      var context = canvas.getContext('2d');

      context.drawImage(img, x, y, w, h, 0, 0, target_width, target_height);
      URL.revokeObjectURL(url);
      canvas.toBlob(callback, 'image/jpeg');
    };
}

var updatePhoto = function updatePhoto(photo, dest) {
    //alert('updatePhoto');
    var background = '';
    if (photo != null) {
      background = 'url(' + URL.createObjectURL(photo) + ')';
    }
    dest.style.backgroundImage = background;
};

var addPhoto = function addPhoto(photo, dest) {
    var img = document.createElement("img");
    //console.log(this.result);
    //var imgBlob = this.result.blob;
    var imgURL = window.URL.createObjectURL(photo); 
    img.src =  imgURL;
    // when it comes from the camera, we need css to keep the
    // image dimensions bound to the viewport size
    //var imagePresenter = document.querySelector("#image-presenter");
    dest.appendChild(img);
    //imagePresenter.style.display = "block";
        

    // TODO: may need image resizing (lg, carousel, thumbnail)
};

var savePhoto = function savePhoto(photo) {
    var deviceStorage = navigator.getDeviceStorage("pictures");
    var domRequest = deviceStorage.add(photo);
    //alert(domRequest);
    //console.log(domRequest);
    domRequest.onsuccess = function() {
        window.utils.debugOut('save success');
    }
    domRequest.onerror = function() {
        window.utils.debugOut('save error: ' + this.error.name);
    }
}

var checkDeviceStorage = function checkDeviceStorage() {
    var deviceStorage = navigator.getDeviceStorage("pictures");
    var files = deviceStorage.enumerate();
    // getting files this way also doesn't work
    //var files = deviceStorage.enumerate("pictures");
    
    // only getting object properties
    //for (var file in files) { alert(file); }

    // these iterators don't work either    
    /*
    files.forEach(function(file)) {
        alert(file);
    });
    */
    /*
    while (files.hasNext()) {
        var file = files.next();
        alert(file);
    }
    */    
}

var browsePhotoDB = function browsePhotoDB() {
    window.utils.debugOut("browsePhotoDB");

    //alert(metadataParsers.imageMetadataParser);
    
    var photodb = new MediaDB('pictures', metadataParsers.imageMetadataParser, {
        mimeTypes: ['image/jpeg', 'image/png'],
        version: 2,
        autoscan: true  ,    // We're going to call scan() explicitly
        batchHoldTime: 350, // Batch files during scanning
        batchSize: 12       // Max batch size: one screenful
    });

    //console.log(photodb);
    //alert(photodb);
    
    

    
    photodb.onunavailable = function(event) {
        /*
        var why = event.detail;
        if (why === MediaDB.NOCARD)
          alert('nocard');
        else if (why === MediaDB.UNMOUNTED)
          alert('pluggedin');
        */
        window.utils.debugOut('photodb unavailable');
    };

    photodb.onready = function() {
        //console.log('photodb ready');
        window.utils.debugOut('photodb ready')
        
        /*
        photodb.getAll(function(records) {
            photos = records;
            alert(photos);
          });
        */
    };

    //alert('end');    
}