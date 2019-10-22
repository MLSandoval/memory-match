<?php
header('Content-Type: application/json');
set_exception_handler('error_handler');
require_once('./api_creds.php');

function error_handler($error, $code = 500){
    $output = [
        'success' => false,
        'error' => $error->getMessage()
    ];

    $jsonObj = json_encode($output, JSON_PRETTY_PRINT);
    http_response_code($code);
    print_r($jsonObj);
}

if (!isset($_GET['lat'])) {
    throw new Exception('Must provide latitude.');
} else if (!isset($_GET['lon'])) {
    throw new Exception('Must provide longitude.');
}
$lat = $_GET['lat'];
$lon = $_GET['lon'];


$curl = curl_init();
$dataURL = 'https://www.hikingproject.com/data/get-campgrounds?lat=' . $lat . '&lon=' . $lon . '&maxDistance=30&maxResults=10&key=' . $ReiApiKey;

curl_setopt_array($curl, array(
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_URL => $dataURL,
));

$output = curl_exec($curl);
curl_close($curl);

print($output);
?>
