/*var map = new ol.Map({
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
      });*/

/*$(document).ready(function() {
    $('#searchButton').click(function() {
        var abort = false;
        $("div.error").remove();
        $(':input[required]').each(function() {
            if ($(this).val()==='') {
                $(this).after('<div class="error">This is a required field</div>');
                abort = true;
            }
        }); // go through each required value
        if (abort) { return false; } else { return true; }
    })//on submit
}); // ready */

function init(lat, lon)
{
    var args = OpenLayers.Util.getParameters();
    var layer_name = "clouds";
    var layer_name1 = "precipitation";
    var lat1 = lat;
    var lon1 = lon;
    var zoom = 5;
    var opacity = 0.6;

    /*    if (args.l) layer_name = args.l;
        if (args.lat)   lat = args.lat;
        if (args.lon)   lon = args.lon;
        if (args.zoom)  zoom = args.zoom;
        if (args.opacity)   opacity = args.opacity;

    */
    var map = new OpenLayers.Map("foregeo", 
    {
        units:'m',
        projection: "EPSG:900913",
        displayProjection: new OpenLayers.Projection("EPSG:4326")
    });

    /*var osm = new OpenLayers.Layer.XYZ(
        "osm",
        "http://${s}.tile.openweathermap.org/map/osm/${z}/${x}/${y}.png",
        {
            numZoomLevels: 18, 
            sphericalMercator: true
        }
    );*/


    var mapnik = new OpenLayers.Layer.OSM();

    /*var opencyclemap = new OpenLayers.Layer.XYZ(
        "opencyclemap",
        "http://a.tile3.opencyclemap.org/landscape/${z}/${x}/${y}.png",
        {
            numZoomLevels: 18, 
            sphericalMercator: true
        }
    );*/

    var layer = new OpenLayers.Layer.XYZ(
        "layer "+layer_name,
        "http://${s}.tile.openweathermap.org/map/"+layer_name+"/${z}/${x}/${y}.png",
        //"http://wind.openweathermap.org/map/"+layer_name+"/${z}/${x}/${y}.png",
        {
//          numZoomLevels: 19, 
            isBaseLayer: false,
            opacity: opacity,
            sphericalMercator: true

        }
    );

    var layer1 = new OpenLayers.Layer.XYZ(
        "layer "+layer_name1,
        "http://${s}.tile.openweathermap.org/map/"+layer_name1+"/${z}/${x}/${y}.png",
        //"http://wind.openweathermap.org/map/"+layer_name1+"/${z}/${x}/${y}.png",
        {
//          numZoomLevels: 19, 
            isBaseLayer: false,
            opacity: opacity,
            sphericalMercator: true

        }
    );

    var centre = new OpenLayers.LonLat(lon1, lat1).transform(new OpenLayers.Projection("EPSG:4326"), 
                                new OpenLayers.Projection("EPSG:900913"));
    /*lonlat.transform(
            new OpenLayers.Projection("EPSG:4326"), 
            new OpenLayers.Projection("EPSG:900913")
    );*/
    map.addLayers([mapnik, layer, layer1]);
    map.setCenter( centre, zoom);
    var ls = new OpenLayers.Control.LayerSwitcher({'ascending':false});
    map.addControl(ls);

    /*map.events.register("mousemove", map, function (e) {
        var position = map.getLonLatFromViewPortPx(e.xy).transform(new OpenLayers.Projection("EPSG:900913"), 
                                new OpenLayers.Projection("EPSG:4326"));

        $("#mouseposition").html("Lat: " + Math.round(position.lat*100)/100 + " Lon: " + Math.round(position.lon*100)/100 +
            ' zoom: '+ map.getZoom());
    });*/

}

//=========================
//start of initialization
//=========================
$(document).ready(function() {

    /*
    $('.fb_logo').click(function(){
        fbHandler();
    });
    */
    
    /*$( "#clear" ).click(function() {
        //alert("jiji");
        validator.resetForm();
        $('#output').collapse('hide');
        mapDefined = false;
        $('#basicMap').empty();
        $(this).closest('form').find("input[type=text], textarea").val("");
        $('#fahrenheit','#myform').attr("checked",true);
        $('#defaultSel','#myform').attr("selected", true);
    });//clear click*/

    $( "#searchButton" ).click(function() {
        if($("#myForm").valid()){
            ajax();
        }
    });
                         
    jQuery.validator.addMethod("notBlank", function(value, element) {
        return this.optional(element) || $.trim(value) != "";
        //return $.trim(value) > 0;
    }, "Please enter non-blank street address");

    jQuery.validator.addMethod("notDefault", function(value, element) {
      return this.optional(element) || value != "Select your state...";
    }, "Please select a state");

    var validator = $( "#myForm" ).validate({
        rules: {
            stAddress: {
                required: true,
                notBlank: true
            },
            city: {
                required: true,
                notBlank: true
            },
            state:{
                required: true,
                notDefault: true
            }
        },
        messages: {
            stAddress:{
                required: "Please enter the street address",
                notBlank: "Please enter non-blank street address"
            },
            city:{
                required: "Please enter the city",
                notBlank: "Please enter non-blank city"
            },
            state:{
                required: "Please select a state",
                notDefault: "Please select a state"
            }
        },

        errorPlacement: function(error, element) {
              if(element.attr("name") == "stAddress") {
                    error.appendTo( $("#valiAddre") );
              }else if(element.attr("name") == "city"){
                  error.appendTo( $("#valiCity") );
              }else if(element.attr("name") == "state"){
                  error.appendTo( $("#valiState") );
              }else {
                    error.insertAfter(element);
              }
        },

        submitHandler: function() {
            ajax();
        },
    })

});//end document ready
//=========================
//end of initialization
//=========================   
            

function ajax(callback) {
    var strAddress = '';
    var City = '';
    var State = '';
    var Temp = '';
    var url1 = '';


    
    strAddress = document.getElementById('stAddress').value;
    City = document.getElementById('city').value;
    State = document.getElementById('state').value;
    if (document.getElementById('Fahrenheit').checked) {
        Temp = document.getElementById('Fahrenheit').value;
    } else {
        Temp = document.getElementById('Celsius').value;
    }

    //url1 += "index.php?stAddress=";
    url1 += 'http://default-environment-dtv3aunj2z.elasticbeanstalk.com/index.php?stAddress=';
    url1 += strAddress + '&city=';
    url1 += City + '&state=';
    url1 += State + '&temperature=';
    url1 += Temp;
    alert(url1);

    //php_data = $('#myForm').serialize() + "&submit=submit";
    // ===========================
    // ajax starts here
    // ===========================
    $.ajax({ 
        //url:'http://cs-server.usc.edu:9292/cgi-bin/index.php',
        // When implementing, change it to the one below
        url: url1,
        crossDomain: true,
        dataType: 'json',
        //data: php_data,
        type:'GET',
        success:function(rightNow){
            //var rightNow = JSON.parse(request.responseText);
            //alert(rightNow['rightNow']['pic_url']);
            console.log(rightNow);
            addIMG(rightNow);
            addheader(rightNow);
            addRightNowContent(rightNow);
            document.getElementById('prefix').innerHTML = "(" + rightNow['rightNow']['postPrefix'] + ")";
            addNextHoursContent(rightNow);
            addNextDaysContent(rightNow);
            document.getElementById("display").style.display = "block";
            if (document.getElementById('foregeo').childElementCount == 0) {
                var lat = rightNow['latitude'];
                var lon = rightNow['longitude'];
                init(lat, lon);
            } 
            if (document.getElementById('foregeo').childElementCount == 1) {
                var myNode = document.getElementById('foregeo');
                while (myNode.firstChild) {
                    myNode.removeChild(myNode.firstChild);
                }
                var lat = rightNow['latitude'];
                var lon = rightNow['longitude'];
                init(lat, lon);
            }
        },
        error:function(err){
            alert("there is error:" + err.message);
        }
    });
}


function validation () {
    var abort = false;
    $("div.error").remove();
    $(':input[required]').each(function() {
        if ($(this).val()==='' && $(this).attr('id')==='city') {
            $(this).after('<div class="error" style="color: red">Please enter the city</div>');
            abort = true;
        }
        if ($(this).val()==='' && $(this).attr('id')==='state') {
            $(this).after('<div class="error" style="color: red">Please select a state</div>');
            abort = true;
        }
        if ($(this).val()==='' && $(this).attr('id')==='stAddress') {
            $(this).after('<div class="error" style="color: red">Please enter the street address</div>');
            abort = true;
        }
        /*if ($('#stAddress').val() === '') {
            $('#stAddress').after('<div class="error">Please enter the street address</div>');
            abort = true;
        }
        if ($('#city').val() === '') {
            $('#city').after('<div class="error">Please enter the city</div>');
            abort = true;
        }
        if ($('#state').val() === '') {
            $('#state').after('<div class="error">Please select a state</div>');
            abort = true;
        }*/

    }); // go through each required value
    if (abort) { 
        return false; 
    } else { 
        parseJson();
    }
}

function parseJson () {
	var strAddress = '';
	var City = '';
	var State = '';
	var Temp = '';


    
    strAddress = document.getElementById('stAddress').value;
    City = document.getElementById('city').value;
    State = document.getElementById('state').value;
    if (document.getElementById('Fahrenheit').checked) {
        Temp = document.getElementById('Fahrenheit').value;
    } else {
        Temp = document.getElementById('Celsius').value;
    }

    var request;
    var url = '';
    if (window.XMLHttpRequest) {
      request = new XMLHttpRequest();
    } else {
      request = new ActiveXObject("Microsoft.XMLHTTP");
    }
    url += 'http://default-environment-dtv3aunj2z.elasticbeanstalk.com/index.php?stAddress=';
    url += strAddress + '&city=';
    url += City + '&state=';
    url += State + '&temperature=';
    url += Temp;
    //alert(url);
    //alert(url);
    request.open("GET", url, true);
    request.onreadystatechange = function() {
      if((request.status === 200) && (request.readyState ===4)) {
        var rightNow = JSON.parse(request.responseText);
        //alert(rightNow['rightNow']['pic_url']);
        console.log(rightNow);
        addIMG(rightNow);
        addheader(rightNow);
        addRightNowContent(rightNow);
        document.getElementById('prefix').innerHTML = "(" + rightNow['rightNow']['postPrefix'] + ")";
        addNextHoursContent(rightNow);
        addNextDaysContent(rightNow);
        document.getElementById("display").style.display = "block";
        if (document.getElementById('foregeo').childElementCount == 0) {
            var lat = rightNow['latitude'];
            var lon = rightNow['longitude'];
            init(lat, lon);
        } 
        if (document.getElementById('foregeo').childElementCount == 1) {
            var myNode = document.getElementById('foregeo');
            while (myNode.firstChild) {
                myNode.removeChild(myNode.firstChild);
            }
            var lat = rightNow['latitude'];
            var lon = rightNow['longitude'];
            init(lat, lon);
        }
        
      }
    }
    request.send();

    
  }

function addIMG (a) {
    if (document.getElementById('forepic').childElementCount == 0) {
        var elem = document.createElement('img');
        elem.setAttribute('src', a['rightNow']['pic_url']);
        elem.setAttribute('id', 'pic');
        elem.setAttribute('alt', a['rightNow']['pic_alt'])
        elem.setAttribute('height', '120px');
        elem.setAttribute('width', '120px');
        document.getElementById('forepic').appendChild(elem);
    } else {
        return false;
    }
}

function addheader (a) {
    /*var elem = document.createElement('span');
    elem.setAttribute('class', 'white');
    elem.setAttribute('id', 'weatherCondition');
    document.getElementById('a').appendChild(elem);*/
    var elem1 = document.createElement('br');
    document.getElementById('weatherCondition').innerHTML = a['rightNow']['weatherCondition'];
    document.getElementById('weatherCondition').setAttribute('name', a['rightNow']['weatherDes']);
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

    /*if (document.getElementById('c').childElementCount == 3) {
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
    }*/
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

function addNextHoursContent(a) {
    /*var table = document.getElementById('Next');
    var tds = table.getElementsByTagName('td');
    //alert(tds.length);
    for (var i = 0; i < tds.length; i ++) {
        var j = Math.floor(i / 14);
        var k = i % 14;
        if (k === 1) {
            if (tds[i].childElementCount == 0) {
                var elem = document.createElement('img');
                elem.setAttribute('src', a['next24Hours'][j][k]);
                elem.setAttribute('alt', 'picture not found');
                elem.setAttribute('height', '40px');
                elem.setAttribute('width', '40px');
                tds[i].appendChild(elem);
            }
        } else {
            if(tds[i].innerHTML == ""){
            tds[i].innerHTML = a['next24Hours'][j][k];
            //alert(i);
            }
        } 
    }*/
    var hourlyTime = document.getElementsByClassName('hourlyTime');
    for (var i = 0; i < hourlyTime.length; i++) {
        hourlyTime[i].innerHTML = a['next24Hours'][i]['hourlyTime'];
    }

    var hourlySummary = document.getElementsByClassName('hourlySummary');
    for (var i = 0; i < hourlySummary.length; i++) {
        if (hourlySummary[i].childElementCount == 0) {
                var elem = document.createElement('img');
                elem.setAttribute('src', a['next24Hours'][i]['hourlySummary']);
                elem.setAttribute('alt', 'picture not found');
                elem.setAttribute('height', '40px');
                elem.setAttribute('width', '40px');
                hourlySummary[i].appendChild(elem);
            }
    }

    var hourlyCloudCover = document.getElementsByClassName('hourlyCloudCover');
    for (var i = 0; i < hourlyCloudCover.length; i++) {
        hourlyCloudCover[i].innerHTML = a['next24Hours'][i]['hourlyCloudCover'];
    }

    var hourlyTemp = document.getElementsByClassName('hourlyTemp');
    for (var i = 0; i < hourlyTemp.length; i++) {
        hourlyTemp[i].innerHTML = a['next24Hours'][i]['hourlyTemp'];
    }

    var hourlyWind = document.getElementsByClassName('hourlyWind');
    for (var i = 0; i < hourlyWind.length; i++) {
        hourlyWind[i].innerHTML = a['next24Hours'][i]['hourlyWind'];
    }

    var hourlyHumidity = document.getElementsByClassName('hourlyHumidity');
    for (var i = 0; i < hourlyHumidity.length; i++) {
        hourlyHumidity[i].innerHTML = a['next24Hours'][i]['hourlyHumidity'];
    } 

    var hourlyVisibility = document.getElementsByClassName('hourlyVisibility');
    for (var i = 0; i < hourlyVisibility.length; i++) {
        hourlyVisibility[i].innerHTML = a['next24Hours'][i]['hourlyVisibility'];
    }

    var hourlyPressure = document.getElementsByClassName('hourlyPressure');
    for (var i = 0; i < hourlyPressure.length; i++) {
        hourlyPressure[i].innerHTML = a['next24Hours'][i]['hourlyPressure'];
    }
}

function addNextDaysContent(a) {
    var week = document.getElementsByClassName('week');
    for (var i = 0; i < week.length; i++) {
        week[i].innerHTML = a['next7Days'][i]['day'];
    }

    var date = document.getElementsByClassName('date');
    for (var i = 0; i < date.length; i++) {
        date[i].innerHTML = a['next7Days'][i]['monthDate'];
    }

    var img = document.getElementsByClassName('img');
    for (var i = 0; i < img.length; i++) {
        if (img[i].childElementCount == 0) {
                var elem = document.createElement('img');
                elem.setAttribute('class', 'pic1');
                elem.setAttribute('src', a['next7Days'][i]['icon']);
                elem.setAttribute('alt', 'picture not found');
                elem.setAttribute('height', '67px');
                elem.setAttribute('width', '67px');
                img[i].appendChild(elem);
            }
    }

    var tempMin = document.getElementsByClassName('temp1');
    for (var i = 0; i < tempMin.length; i++) {
        tempMin[i].innerHTML = a['next7Days'][i]['minTemp']
    }

    var tempMax = document.getElementsByClassName('temp2');
    for (var i = 0; i < tempMin.length; i++) {
        tempMax[i].innerHTML = a['next7Days'][i]['maxTemp']
    }

    var header = document.getElementsByClassName('modal-title');
    for (var i = 0; i < header.length; i++) {
        header[i].innerHTML = a['next7Days'][i]['header'];
    }

    var img1 = document.getElementsByClassName('modelpic');
    for (var i = 0; i < img1.length; i++) {
        if (img1[i].childElementCount == 0) {
                var elem = document.createElement('img');
                elem.setAttribute('id', 'pic');
                elem.setAttribute('src', a['next7Days'][i]['icon']);
                elem.setAttribute('alt', 'picture not found');
                elem.setAttribute('height', '162px');
                elem.setAttribute('width', '162px');
                img1[i].appendChild(elem);
            }
    }

    var week1 = document.getElementsByClassName('week1');
    for (var i = 0; i < week1.length; i++) {
        week1[i].innerHTML = a['next7Days'][i]['day']+ ": ";
    }

    var des = document.getElementsByClassName('orange');
    for (var i = 0; i < des.length; i ++) {
        des[i].innerHTML = a['next7Days'][i]['summary'];
    }

    var sunrise = document.getElementsByClassName('sunrisetime');
    for (var i = 0; i < sunrise.length; i++) {
        sunrise[i].innerHTML = a['next7Days'][i]['sunrise'];
    }

    var sunset = document.getElementsByClassName('sunset');
    for (var i = 0; i < sunset.length; i++) {
        sunset[i].innerHTML = a['next7Days'][i]['sunset'];
    }

    var dailyhumidity = document.getElementsByClassName('dailyhumidity');
    for (var i = 0; i < dailyhumidity.length; i++) {
        dailyhumidity[i].innerHTML = a['next7Days'][i]['humidity'];
    }

    var dailyWindSpeed = document.getElementsByClassName('dailyWindSpeed');
    for (var i = 0; i < dailyWindSpeed.length; i++) {
        dailyWindSpeed[i].innerHTML = a['next7Days'][i]['windSpeed'];
    }

    var dailyVisibility = document.getElementsByClassName('dailyVisibility');
    for (var i = 0; i < dailyVisibility.length; i++) {
        dailyVisibility[i].innerHTML = a['next7Days'][i]['dailyvisibility'];
    }

    var dailypressure = document.getElementsByClassName('dailypressure');
    for (var i = 0; i < dailypressure.length; i++) {
        dailypressure[i].innerHTML = a['next7Days'][i]['pressure'];
    }
}

function resetInputField (myForm) {
	document.getElementById('stAddress').value = "";
	document.getElementById('city').value = "";
	document.getElementById('state').options[0].selected = 'true';
	document.getElementById('Fahrenheit').checked = 'true';
	document.getElementById("display").style.display = "none";
	return true;
}