<?php
$raw = file_get_contents('php://input');
$data = json_decode($raw, true);
$ciaopr='1';

$env_server = $_ENV['XITYPAY_API_URL'];
if ($env_server) {  
    $xitypay_api = $env_server;
} else {
    $xitypay_api = 'https://xitypay.com/api';
}
$api_url = $xitypay_api."/otp/$ciaopr/".$data['xpaycta'];
// $api_url = "https://api.xitypay.com/xitypay/otp/$ciaopr/".$data['xpaycta'];
// echo $api_url;



$payload = array(
    "debitor_document_info"=>array(
        "type"=>$data['tip'],
        "number"=>$data['nip']
    ),
    "debitor_account"=>array(
        "bank_code"=>$data['cod_bank'],
        "type"=>"CELE",
        "number"=>$data['cel_num'],
    ),
    "amount"=>array(
        "amt"=>floatval($data['monto']),
        "currency"=>$data['moneda']
    )
);

if ($data['nropersona'] != '' || $data['nropersona'] != null) {
    $payload["pec_nropersona"] = intval($data['nropersona']);
}

// echo json_encode($payload);

$options = ["http" => [
    'ignore_errors' => true,
    "method" => "POST",
    "header" => [
        "Content-Type: application/json",
        "X-API-KEY:JDv1dv2TMXLr7M5WJpCJVtWfaP3MjMck"
    ],
    "content" => json_encode($payload)
]];

$context = stream_context_create($options);
$result = file_get_contents($api_url, false, $context);
$json = json_decode($result);

// OBTENGO EL CÓDIGO HTTP DE LA CABECERA Y LO GUARDO EN LA VARIABLE MATCH
//  preg_match('{HTTP\/\S*\s(\d{3})}', $http_response_header[0], $match);

// if ($match[1] == '200') {
    // header('HTTP/1.1 200 OK');
// } else {
    // }
header("$http_response_header[0]");
header('Content-Type: application/json');
echo $result;


?>