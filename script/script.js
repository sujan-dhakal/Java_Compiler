$(function(){
	$("#run").click(function() {
	    var editor = document.getElementById("ace").edit("editor");
	    var code = editor.getValue();
	    var output = document.getElementById("output");
	    output.innerHTML="Running. Please Wait";
	    $.ajax({
	    	method: 'POST',
	    	url: '/run',
	    	contentType: 'application/json',
	    	data: JSON.stringify({msg: code}),
	    	success: function(response){
	    		output.innerHTML=response;
	    	},
	    	error: function(){
	    		alert('error');
	    	}
	    });
	});
});
