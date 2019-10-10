<?php

    require_once('api_creds.php');
    
    $curl = curl_init();

    header('Content-Type: application/json');
    set_exception_handler('error_handler');

    
    
    // Set options
    $dataURL = 'https://developer.nps.gov/api/v1/parks?stateCode=me';
    curl_setopt_array($curl, array(
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_URL => $dataURL,
        CURLOPT_USERAGENT => $_SERVER['HTTP_USER_AGENT'],
        CURLOPT_HTTPHEADER => array('Authorization: INSERT_API_KEY_HERE')
    ));
    // Additional code would follow



    function error_handler($error, $code = 500){
        $output = [
            'success' => false,
            'error' => $error->getMessage()
        ];
    
        $jsonObj = json_encode($output, JSON_PRETTY_PRINT);
        http_response_code($code);
        print_r($jsonObj);
    }
    function CallAPI($method, $url, $data = false){

    }

    if (!isset($_GET["id"])) {
        CallAPI();
    }else{

    }


    // example cURL call with php
    function CallAPI($method, $url, $data = false){
        $curl = curl_init();

        switch ($method)
        {   
            case 'GET':
            case 'Get':
            case 'get':
                curl_setopt($curl, CURLOPT_POST, 1);

                if ($data)
                    curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
                break;
   
            default:
                if ($data)
                    $url = sprintf("%s?%s", $url, http_build_query($data));
        }

        // Optional Authentication:
        curl_setopt($curl, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
        curl_setopt($curl, CURLOPT_USERPWD, "username:password");

        curl_setopt($curl, CURLOPT_URL, $url);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);

        $result = curl_exec($curl);

        curl_close($curl);

        return $result;
    }


?>