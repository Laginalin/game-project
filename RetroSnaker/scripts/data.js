function User() {
	this.name = prompt("Please Enter your name.");
	this.storage = window.localStorage;
	this.getUser();
}

User.prototype.setUser = function(name, score) {
	this.storage.setItem(name, score);
}

User.prototype.getUser = function() {
	if(!this.storage.getItem(this.name)) {
		this.setUser(this.name, 0);
	} 
	this.score = this.storage.getItem(this.name);
}