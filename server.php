<?php
	function getJson() {
		if ($_GET["stAddress"] !== "" && $_GET["city"] !== "" && $_GET["state"] !== "") {
			$api_key2 = "AIzaSyDaWbKyLfVK0vNk1w0rHSOEz8bJHmcEShE"; //This is the key for google maps
			$url = "https://maps.googleapis.com/maps/api/geocode/xml?address=";
			$url .= urlencode($_GET["stAddress"]) . ",";
			$url .= "+" . urlencode($_GET["city"]) . ",";
			$url .= "+" . urlencode($_GET["state"]);
			$url .= "&key=" . $api_key2;
			$url;
			$xml = simplexml_load_file($url);
			//var_dump($xml);
			$lat = $xml -> result -> geometry -> location -> lat;
			$lng = $xml -> result -> geometry -> location -> lng;
			if ($_GET["temperature"] === "Fahrenheit") {
				$units_value = "us";
			} else {
				$units_value = "si";
			}
			$api_key =  "7cb8420d223e059c1ada3d50d1cd6d92";
			$url1 = "https://api.forecast.io/forecast/";
			$url1 .= $api_key . "/";
			$url1 .= $lat . ",";
			$url1 .= $lng . "?";
			$url1 .= "units=" . $units_value . "&amp";
			$url1 .= "exclude=flags";
			$json = file_get_contents($url1);
			$json = json_decode($json, true);
			$json = json_encode($json);
			//var_dump($json);
			//echo $json;
			return $json;
		} else {
			//echo "PHP load failed. Please reload the website.";
			//echo "There is something wrong in your form";
		}
	}



	function displayHeader($json) {
		$temperature = intval($json["currently"]["temperature"]);
		if ($_GET["temperature"] === "Fahrenheit") {
			$temperature .= "°F";
		} else {
			$temperature .= "°C";
		}
		if ($json["currently"]["icon"] === "clear-day") {
			$pic_url = "pic_for_hw6/clear.png"; 
		}
		elseif ($json["currently"]["icon"] === "clear-night") {
			$pic_url = "pic_for_hw6/clear_night.png"; 
		}
		elseif ($json["currently"]["icon"] === "rain") {
			$pic_url = "pic_for_hw6/rain.png"; 
		}
		elseif ($json["currently"]["icon"] === "snow") {
			$pic_url = "pic_for_hw6/snow.png"; 
		}
		elseif ($json["currently"]["icon"] === "sleet") {
			$pic_url = "pic_for_hw6/sleet.png"; 
		}
		elseif ($json["currently"]["icon"] === "wind") {
			$pic_url = "pic_for_hw6/wind.png"; 
		}
		elseif ($json["currently"]["icon"] === "fog") {
			$pic_url = "pic_for_hw6/fog.png"; 
		}
		elseif ($json["currently"]["icon"] === "cloudy") {
			$pic_url = "pic_for_hw6/cloudy.png"; 
		}
		elseif ($json["currently"]["icon"] === "partly-cloudy-day") {
			$pic_url = "pic_for_hw6/cloud_day.png"; 
		}
		elseif ($json["currently"]["icon"] === "partly-cloudy-night") {
			$pic_url = "pic_for_hw6/cloud_night.png"; 
		} else {
			$pic_url = "";
		}

		$header = array("{$json["currently"]["summary"]}", 
						"{$temperature}", 
						"{$pic_url}"); 
		//print_r($Header);
		return $header;
	}

	function dispalyPresipitation ($json) {
		if ($json["currently"]["precipIntensity"] >= 0 && $json["currently"]["precipIntensity"] < 0.002) {
			$precipitation = "None";
		}
		elseif ($json["currently"]["precipIntensity"] >= 0.002 && $json["currently"]["precipIntensity"] < 0.017) {
			$precipitation = "Very Light";
		}
		elseif ($json["currently"]["precipIntensity"] >= 0.017 && $json["currently"]["precipIntensity"] < 0.1) {
			$precipitation = "Light";
		}
		elseif ($json["currently"]["precipIntensity"] >= 0.1 && $json["currently"]["precipIntensity"] < 0.4) {
			$precipitation = "Moderate";
		}
		elseif ($json["currently"]["precipIntensity"] >= 0.4) {
			$precipitation = "Heavy";
		}
		else {
			$precipitation = "";
		}
		return $precipitation;
	}

	function displayChance_of_Rain($json) {
		$chance_of_Rain = $json["currently"]["precipProbability"] * 100;
		$chance_of_Rain .= "%";
		return $chance_of_Rain;
	}

	function displayWind_Speed($json) {
		$wind_Speed = intval($json["currently"]["windSpeed"]);
		if ($_GET["temperature"] === "Fahrenheit") {
			$wind_Speed .= " mph";
		} else {
			$wind_Speed .= " mts/sec";
		}
		//$wind_Speed .= "mph";
		return $wind_Speed;
	}

	function displayDew_Point($json) {
		$dew_Point = intval($json["currently"]["dewPoint"]);
		if ($_GET["temperature"] === "Fahrenheit") {
			$dew_Point .= "°F";
		} else {
			$dew_Point .= "°C";
		}
		return $dew_Point;
	}

	function displayHumidity($json) {
		$humidity = $json["currently"]["humidity"] * 100;
		$humidity .= "%";
		return $humidity;
	}

	function displayVisibility($json) {
		$visibility = intval($json["currently"]["visibility"]);
		if ($_GET["temperature"] === "Fahrenheit") {
			$visibility .= " mi";
		} else {
			$visibility .= " kms";
		}
		//$visibility .= " mi";
		return $visibility;
	}

	function displaySunrise($json) {
		$timestamp = intval($json["daily"]["data"][0]["sunriseTime"]);
		$timezone = $json["timezone"];
		date_default_timezone_set($timezone);
		$sunrise = date("h:i A", $timestamp);
		return $sunrise;
	}

	function displaySunset($json) {
		$timestamp = intval($json["daily"]["data"][0]["sunsetTime"]);
		$timezone = $json["timezone"];
		date_default_timezone_set($timezone);
		$sunset = date("h:i A", $timestamp);
		return $sunset;
	}
	//displayAll();
?>
<?php 
	//$json = getJson();
	//echo "hello world";
	$json = getJson();
	echo $json;
	//print_r($_GET);
	/*if (isset($_GET['stAddress'])) {
		echo "1";
	} else {
		echo "2";
	}*/
?>