<?php
$raw = file_get_contents('php://input');
$data = json_decode($raw, true);
$ciaopr='1';

$env_server = $_ENV['XITYPAY_API_URL'];
if ($env_server) {  
    $xitypay_api = $env_server;
} else {
    $xitypay_api = 'https://test-api.xitypay.com/api';
    // $xitypay_api = 'https://xitypay.com/api';
}
$api_url = $xitypay_api."/otpv2/$ciaopr/".$data['xpaycta'];
// $api_url = "https://api.xitypay.com/xitypay/otp/$ciaopr/".$data['xpaycta'];
// echo $api_url;


$ip =   getenv('HTTP_CLIENT_IP')?:
        getenv('HTTP_X_FORWARDED_FOR')?:
        getenv('HTTP_X_FORWARDED')?:
        getenv('HTTP_FORWARDED_FOR')?:
        getenv('HTTP_FORWARDED')?:
        getenv('REMOTE_ADDR');


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

$payload = array(
    "moneda"=>$data['moneda'],
    "monto"=>floatval($data['monto']),
    "bancocod_pagador"=>$data['cod_bank'],
    "tipocta_pagador"=>"CELE",
    "nrocta_pagador"=>$data['cel_num'],
    "tipnip_pagador"=>$data['tip'],
    "codnip_pagador"=>$data['nip'],
    "direccion_ip"=>$ip
);

// {
//   "moneda": "VES",
//   "monto": 1,
//   "bancocod_pagador": "0138",
//   "tipocta_pagador": "CELE",
//   "nrocta_pagador": "4123344516",
//   "tipnip_pagador": "V",
//   "codnip_pagador": "11562938",
//   "pec_nropersona": 2576,
//   "direccion_ip": "192.168.1.100"
// }

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