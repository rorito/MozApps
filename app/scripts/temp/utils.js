
// utility helper
window.utils = window.utils || {
	isConsole:true,

	setIsConsole:function(isConsole) {
		this.isConsole = isConsole;
	},

	debugOut:function(msg) {
	    if (this.isConsole) { console.log (msg); }
	    else { alert(msg);}
	}
};