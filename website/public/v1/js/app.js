var socket = io();

var vm = new Vue({
	el: '#main-container',
	data : {
		username : "",
		password : "",
	},
	methods : {
		login : function(event){
			 if (event) event.preventDefault()
			console.log("LOGIN", event);
			console.log("USER", this.username);
			console.log("pass", this.password);
		}
	},
	created : function(){
		socket.on("login", function(data){
			console.log(data);
		})
	}
});

Vue.use(VueRouter)
