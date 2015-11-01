function parseJson () {
	var strAddress = '';
	var City = '';
	var State = '';
	var Temp = '';

    if (document.getElementById('stAddress').value === "") {
		document.getElementById('valiAddre').style.display = "block";
	} else {
		document.getElementById('valiAddre').style.display = "none";
		strAddress = document.getElementById('stAddress').value;
	}
	if (document.getElementById('city').value === "") {
		document.getElementById('valiCity').style.display = "block";
	} else {
		document.getElementById('valiCity').style.display = "none";
		City = document.getElementById('city').value;
	}
	if (document.getElementById('state').value === "") {
		document.getElementById('valiState').style.display = "block";
		return false;
	} else {
		document.getElementById('valiCity').style.display = "none";
		State = document.getElementById('state').value;
	}
	if (document.getElementById('Fahrenheit').checked) {
		Temp = document.getElementById('Fahrenheit').value;
	} else {
		Temp = document.getElementById('Celsius').value;
	}
    //document.getElementById("display").style.display = "block";
    var request;
    var url = '';
    if (window.XMLHttpRequest) {
      request = new XMLHttpRequest();
    } else {
      request = new ActiveXObject("Microsoft.XMLHTTP");
    }
    url += 'server.php?stAddress=';
    url += strAddress + '&city=';
    url += City + '&state=';
    url += State + '&temperature=';
    url += Temp;
    alert(url);
    request.open("GET", url, true);
    request.onreadystatechange = function() {
      if((request.status === 200) && (request.readyState ===4)) {
        document.getElementById("demo").innerHTML = request.responseText;
        //var test = request.responseText;
        //alert(test);
      }
    }
    request.send();
  }

function resetInputField (myForm) {
	document.getElementById('stAddress').value = "";
	document.getElementById('city').value = "";
	document.getElementById('state').options[0].selected = 'true';
	document.getElementById('Fahrenheit').checked = 'true';
	document.getElementById("display").style.display = "none";
	return true;
}