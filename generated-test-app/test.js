$(document).ready(function(){

	console.log("small store");

	if (window.navigator.mozSetMessageHandler) { 
		console.log("moz set message");
	    window.navigator.mozSetMessageHandler('activity', 
	    	function handleActivity(activity) { 
	      		console.log("handle activity callback");
				var data = activity.source.data; 
				console.log(dump(data));
	    	}
	  	); 
  	}	



        // var domRequest = storage.get("DCIM/102MZLLA/IMG_0003.jpg");
        // domRequest.onsuccess = function(){
        //     console.log("dom request success");
        //     var file = this.result;
        //     console.log(file.name);

        //     var img = document.createElement("img");
        //     img.src = window.URL.createObjectURL(file);
        //     img.height = 60;
        //     img.onload = function(e) {
        //         window.URL.revokeObjectURL(this.src);
        //     }
        //     console.log("image")
        //     console.log(img);
        //     console.log(document.getElementsByTagName('body')[0]);
        //     document.getElementsByTagName('body')[0].appendChild(img);
        // }; 





         // var storage = navigator.getDeviceStorage("pictures");


        // var domRequest = storage.get("DCIM/102MZLLA/IMG_0003.jpg");
        // domRequest.onsuccess = function(){
        //     console.log("dom request success");
        //     var file = this.result;
        //     console.log(file.name);

        //     var img = document.createElement("img");
        //     img.src = window.URL.createObjectURL(file);
        //     img.height = 60;
        //     img.onload = function(e) {
        //         window.URL.revokeObjectURL(this.src);
        //     }
        //     console.log("image")
        //     console.log(img);
        //     console.log(document.getElementsByTagName('body')[0]);
        //     document.getElementsByTagName('body')[0].appendChild(img);
        // };  


});

/**
 * Function : dump()
 * Arguments: The data - array,hash(associative array),object
 *    The level - OPTIONAL
 * Returns  : The textual representation of the array.
 * This function was inspired by the print_r function of PHP.
 * This will accept some data as the argument and return a
 * text that will be a more readable version of the
 * array/hash/object that is given.
 * Docs: http://www.openjs.com/scripts/others/dump_function_php_print_r.php
 */
function dump(arr,level) {
	var dumped_text = "";
	if(!level) level = 0;
	
	//The padding given at the beginning of the line.
	var level_padding = "";
	for(var j=0;j<level+1;j++) level_padding += "    ";
	
	if(typeof(arr) == 'object') { //Array/Hashes/Objects 
		for(var item in arr) {
			var value = arr[item];
			
			if(typeof(value) == 'object') { //If it is an array,
				dumped_text += level_padding + "'" + item + "' ...\n";
				dumped_text += dump(value,level+1);
			} else {
				dumped_text += level_padding + "'" + item + "' => \"" + value + "\"\n";
			}
		}
	} else { //Stings/Chars/Numbers etc.
		dumped_text = "===>"+arr+"<===("+typeof(arr)+")";
	}
	return dumped_text;
}