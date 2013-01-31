// debug script to test phone capability
var linkAddProduct = document.querySelector("#link-add-product");
if ("undefined" != typeof(linkAddProduct)) {
	linkAddProduct.onclick = function(event) {
		//console.log('click a');

		// try to get an image
		var pick = new MozActivity({
                 name: "pick",
                 data: {
                     type: ["image/png", "image/jpg", "image/jpeg"]
                  }
             });

        pick.onsuccess = function () { 
        	//alert("success");
            var img = document.createElement("img");
            //alert("img el created");
            var imgBlob = this.result.blob;
            //alert("have img blob");
            img.src = window.URL.createObjectURL(imgBlob);
            // when it comes from the camera, we need css to keep the
            // image dimensions bound to the viewport size
            var imagePresenter = document.querySelector("#image-presenter");
            imagePresenter.appendChild(img);
            //imagePresenter.style.display = "block";
        };

        pick.onerror = function () { 
            alert("Can't view the image!");
        };

		// prevent default
		return false;
	}
}