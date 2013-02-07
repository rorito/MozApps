$(document).ready(function(){

console.log("hellllllloooo");
console.log("hellllllloooo2");

	if (window.navigator.mozSetMessageHandler) { 
	    window.navigator.mozSetMessageHandler('activity', 
	      function handleActivity(activity) { 
	      	alert("handleActivity callback");
			var data = activity.source.data; 

	        switch (data.type) { 
	          case 'guide_type': 
	                window.location='index.html'; 
	                break; 
	        } 
	    }
	  ); 
  	}	 
});

