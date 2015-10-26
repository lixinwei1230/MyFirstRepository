function checkInput () {
	var a = 0;
	if (document.getElementById('stAddress').value === "") {
		alert("Please enter value for Address");
		document.getElementById('stAddress').focus();
		return false;
	} else {
		a = a + 1;
	}
	if (document.getElementById('city').value === "") {
		alert("Please enter value for City");
		document.getElementById('city').focus();
		return false;
	} else {
		a = a + 1;
	}
	if (document.getElementById('state').value === "") {
		alert("Please chooes a State");
		return false;
	} else {
		a = a + 1;
	}
	if (a != 3) {
		return false;
	} else {
		document.getElementById("hidden").setAttribute("value","true");
		return true;
	}
}

function parseJson () {
    //alert("hello world");
    var request;
    if (window.XMLHttpRequest) {
      request = new XMLHttpRequest();
    } else {
      request = new ActiveXObject("Microsoft.XMLHTTP");
    }
    request.open("GET", "server.php?a=1&b=2", true);
    request.onreadystatechange = function() {
      if((request.status === 200) && (request.readyState ===4)) {
        document.getElementById("demo").innerHTML = request.responseText;
      }
    }
    request.send();
  }

function resetInputField (myForm) {
	document.getElementById('stAddress').value = "";
	document.getElementById('city').value = "";
	document.getElementById('state').options[0].selected = 'true';
	document.getElementById('Fahrenheit').checked = 'true';
	//document.getElementById("display").style.display = "none";
	return true;
}