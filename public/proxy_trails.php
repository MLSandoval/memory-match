<?php
require_once('error.php');

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
set_exception_handler('error_handler');

if (!isset($_GET['lat'])) {
    throw new Exception('Must provide latitude.');
} else if (!isset($_GET['lon'])) {
    throw new Exception('Must provide longitude.');
}
$lat = $_GET['lat'];
$lon = $_GET['lon'];

$curl = curl_init();
$dataURL = 'https://www.hikingproject.com/data/get-trails?lat=' . $lat . 
    '&lon=' . $lon . '&maxDistance=40&maxResults=10&key=' . $_ENV["API_KEY"];

curl_setopt_array($curl, array(
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_URL => $dataURL,
));

$output = curl_exec($curl);
curl_close($curl);

print($output);
?>