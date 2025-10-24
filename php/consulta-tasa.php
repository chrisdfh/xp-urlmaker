<?php
$raw = file_get_contents('php://input');
$data = json_decode($raw, true);
$ciaopr='1';

$api_url = "https://xitypay.com/apixp/currency_rate/$ciaopr";

$payload = array(
    "moneda"=>"USD",
    "monto"=>1
);

$options = ["http" => [
    
    "ignore_errors" => true,
    "method" => "POST",
    "header" => [
        "Content-Type: application/json",
        "xitypay:2qT8H3C93MVwqHddemI9b2iOXOU6RezL"
    ],
    "content" => json_encode($payload)
]];

$context = stream_context_create($options);
$result = @file_get_contents($api_url, false, $context);
$json = json_decode($result);

header('HTTP/1.0 200 OK');
header('Content-Type: application/json');
echo $result;


?>