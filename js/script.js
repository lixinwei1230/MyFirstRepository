var map = new ol.Map({
        target: 'foregeo',
        layers: [
          new ol.layer.Tile({
            source: new ol.source.MapQuest({layer: 'sat'})
          })
        ],
        view: new ol.View({
          center: ol.proj.fromLonLat([-118.2817648, 34.0256596]),
          zoom: 8
        })
      });

/*
//Center of map
var lonlat = new OpenLayers.LonLat(-118.2817648, 34.0256596);
var map = new OpenLayers.Map("foregeo");
// Create OSM overlays
var mapnik = new OpenLayers.Layer.OSM();

var layer_cloud = new OpenLayers.Layer.XYZ(
        "clouds",
        "http://${s}.tile.openweathermap.org/map/clouds/${z}/${x}/${y}.png",
        {
            isBaseLayer: false,
            opacity: 0.7,
            sphericalMercator: true
        }
    );

    var layer_precipitation = new OpenLayers.Layer.XYZ(
        "precipitation",
        "http://${s}.tile.openweathermap.org/map/precipitation/${z}/${x}/${y}.png",
        {
            isBaseLayer: false,
            opacity: 0.7,
            sphericalMercator: true
        }
    );

    map.addLayers([mapnik, layer_precipitation, layer_cloud]);
*/

function parseJson () {
	var strAddress = '';
	var City = '';
	var State = '';
	var Temp = '';

    if (document.getElementById('stAddress').value === "") {
		document.getElementById('valiAddre').style.display = "block";
        return false;
	} else {
		document.getElementById('valiAddre').style.display = "none";
		strAddress = document.getElementById('stAddress').value;
	}
	if (document.getElementById('city').value === "") {
		document.getElementById('valiCity').style.display = "block";
        return false;
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
    url += 'index.php?stAddress=';
    url += strAddress + '&city=';
    url += City + '&state=';
    url += State + '&temperature=';
    url += Temp;
    alert(url);
    request.open("GET", url, true);
    request.onreadystatechange = function() {
      if((request.status === 200) && (request.readyState ===4)) {
        var rightNow = JSON.parse(request.responseText);
        //alert(rightNow['rightNow']['pic_url']);
        console.log(rightNow);
        //addIMG(rightNow);
        //addheader(rightNow);
        //addRightNowContent(rightNow);
      }
    }
    request.send();
  }

function addIMG (a) {
    if (document.getElementById('forepic').childElementCount == 0) {
        var elem = document.createElement('img');
        elem.setAttribute('src', a['rightNow']['pic_url']);
        elem.setAttribute('id', 'pic');
        elem.setAttribute('height', '120px');
        elem.setAttribute('width', '120px');
        document.getElementById('forepic').appendChild(elem);
    } else {
        return false;
    }
}

function addheader (a) {
    var elem = document.createElement('span');
    elem.setAttribute('class', 'white');
    elem.setAttribute('id', 'weatherCondition');
    document.getElementById('a').appendChild(elem);
    var elem1 = document.createElement('br');
    document.getElementById('weatherCondition').innerHTML = a['rightNow']['weatherCondition'];
    //document.getElementById('forecontent').appendChild(elem1);
    

    var elem2 = document.createElement('span');
    elem2.setAttribute('id', 'temp');
    elem2.setAttribute('class', 'white');
    document.getElementById('b').appendChild(elem2);
    document.getElementById('temp').innerHTML = a['rightNow']['temperature'];

    var elem3 = document.createElement('span');
    elem3.setAttribute('id', 'temp_postfix');
    elem3.setAttribute('class', 'white');
    document.getElementById('b').appendChild(elem3);
    document.getElementById('temp_postfix').innerHTML = a['rightNow']['postPrefix'];
    //document.getElementById('forecontent').appendChild(elem1);
    //document.getElementById('forecontent').appendChild(elem1);
    
    var elem4 = document.createElement('span');
    elem4.setAttribute('id', 'lowtemp');
    document.getElementById('c').appendChild(elem4);
    document.getElementById('lowtemp').innerHTML = a['rightNow']['lowTemperature'] + a['rightNow']['postPrefix'];

    var elem5 = document.createElement('span');
    elem5.setAttribute('id', 'vertical');
    document.getElementById('c').appendChild(elem5);
    document.getElementById('vertical').innerHTML = " | ";

    var elem6 = document.createElement('span');
    elem6.setAttribute('id', 'hightemp');
    document.getElementById('c').appendChild(elem6);
    document.getElementById('hightemp').innerHTML = a['rightNow']['highTemperature'] + a['rightNow']['postPrefix'];

    if (document.getElementById('c').childElementCount == 3) {
        var elem7 = document.createElement('a');
        elem7.setAttribute('href', 'www.baidu.com');
        elem7.setAttribute('id', 'faceBookTag');
        document.getElementById('c').appendChild(elem7);
        var elem8 = document.createElement('img');
        elem8.setAttribute('id', 'facebook');
        elem8.setAttribute('src', 'images/fb_icon.png');
        elem8.setAttribute('width', '25px');
        elem8.setAttribute('height', '25px');
        document.getElementById('faceBookTag').appendChild(elem8);
    } else {
        return false;
    }
}

function addRightNowContent(a) {
    document.getElementById('precipitation').innerHTML = a['rightNow']['precipitation'];
    document.getElementById('chanceOfRain').innerHTML = a['rightNow']['chanceOfRian'];
    document.getElementById('windSpeed').innerHTML = a['rightNow']['windSpeed'];
    document.getElementById('dewPoint').innerHTML = a['rightNow']['dewPoint'];
    document.getElementById('humidity').innerHTML = a['rightNow']['humidity'];
    document.getElementById('visibility').innerHTML = a['rightNow']['visibility'];
    document.getElementById('sunrise').innerHTML = a['rightNow']['sunrise'];
    document.getElementById('sunset').innerHTML = a['rightNow']['sunset'];
}

function resetInputField (myForm) {
	document.getElementById('stAddress').value = "";
	document.getElementById('city').value = "";
	document.getElementById('state').options[0].selected = 'true';
	document.getElementById('Fahrenheit').checked = 'true';
	document.getElementById("display").style.display = "none";
	return true;
}