function initialize () {
alert("Hi");
}

function sendRequest () {
   var xhr = new XMLHttpRequest();
		alert("keyword input");
   var query = encodeURI(document.getElementById("form-input").value);
   xhr.open("GET", "proxy.php?method=/3/search/movie&query=" + query);
			alert("connection open");
   xhr.setRequestHeader("Accept","application/json");
   xhr.onreadystatechange = function () {
       if (this.readyState == 4) {
				alert("parsing data");
          var json = JSON.parse(this.responseText);
          var str = JSON.stringify(json,undefined,2);
          document.getElementById("output").innerHTML = "<pre>" + str + "</pre>";
       }
   };
   xhr.send(null);
}
