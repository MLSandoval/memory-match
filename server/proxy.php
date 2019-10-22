<?php
set_exception_handler('error_handler');
function error_handler($error, $code = 500){
    $output = [
        'success' => false,
        'error' => $error->getMessage()
    ];

    $jsonObj = json_encode($output, JSON_PRETTY_PRINT);
    http_response_code($code);
    print_r($jsonObj);
}

require_once('api_creds.php');

function CallAPI($park){
    $curl = curl_init();
    $dataURL = 'https://developer.nps.gov/api/v1/parks?stateCode=me';
    curl_setopt_array($curl, array(
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_URL => $dataURL,
    ));

    $output = curl_exec($curl);
    curl_close($curl);
}

if (!isset($_GET["id"])) {
    Throw new Exception('Error with query: ' . $_GET.error());
} else {
    // $ReiApiKey
    // $NpsApiKey
    $parkName = $_GET['id'];
    CallAPI($parkName);
}


?>



<?php
// create curl resource
$ch = curl_init();
// set url 
curl_setopt($ch, CURLOPT_URL, "https://api.genderize.io/?name=Baron");
// $output contains the output json
$output = curl_exec($ch);
// close curl resource to free up system resources 
curl_close($ch);
// {"name":"Baron","gender":"male","probability":0.88,"count":26}
var_dump(json_decode($output, true));
?>