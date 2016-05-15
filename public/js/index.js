$(function(){
	$("#submit").click(function(){
		var username = $("#username");
	    var password = $("#password");
	    var postData = {
	    	username:username,
	    	password:password
	    }
	    $.ajax(function(){
	    	url:"./test.js",
	    	method:"get"
	    	data:postData,
	    	success:function(result){
	    		console.log(result);
	    	},
	    	error:function(error){

	    	}

	    })
	   //return false;

	})
	$("#register1").click(function(){
		var username = $("#newUser");
		var email = $("#email");
	    var password = $("#password");
	    var postData = {
	    	username:username,
	    	password:password
	    }
	    $.ajax(function(){
	    	url:"../app.js",
	    	data:postData,
	    	success:function(result){

	    	},
	    	error:function(error){

	    	}

	    })
	   //return false;

	})


});