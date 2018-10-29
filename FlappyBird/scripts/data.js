function User() {
	this.name = prompt("Please Enter your name.") || "unknown user";
	this.name = this.name.toString();
	this.storage = window.localStorage;
	this.getUser();
	this.getRank();
}

User.prototype.setUser = function(name, score) {
	this.storage.setItem(name, score);
}

User.prototype.getUser = function() {
	if(!this.storage.getItem(this.name)) {
		this.setUser(this.name, 0);
	}
	this.score = parseInt(this.storage.getItem(this.name));
}

User.prototype.getRank = function() {
	if(!this.storage.getItem("rank")) {
		var arr = new Array(4);
		this.setUser("rank",JSON.stringify(arr));
	}
	this.rank = JSON.parse(this.storage.getItem("rank"));
}
