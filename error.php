<?php
function error_handler($error, $code = 500)
{
    $output = [
        'success' => false,
        'error' => $error->getMessage()
    ];

    $jsonObj = json_encode($output, JSON_PRETTY_PRINT);
    http_response_code($code);
    print_r($jsonObj);
}
?>