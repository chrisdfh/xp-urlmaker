<?php
    $raw_data = file_get_contents('php://input');
    $data = json_decode($raw_data, false);

    $options = ["http" => [
        "method" => "GET",
        "header" => [
            "Content-Type: application/json",
        ],
    ]];

    $ciaopr = '1';
    date_default_timezone_set('America/Caracas');
    setlocale(LC_TIME, 'es_VE.utf8');
    ini_set('display_errors', '0');


    $xitypay_api = 'https://test-api.xitypay.com/api';
    $env_server = $_ENV['XITYPAY_API_URL'];
    if ($env_server) {  
        $xitypay_api = $env_server;
    }

    function getPersonasFromXpayctanro($xpayctanro){
        global $options;
        global $xitypay_api;

        $url = "$xitypay_api/xpay_cuenta/persona/1/$xpayctanro?pagina=1&cant_registros=200";

        $context = stream_context_create($options);
        $result = file_get_contents($url, false, $context);
        return json_decode($result,false);
    }

    function object_from_jwt($token){
        return (
            json_decode(
                base64_decode(
                    str_replace('_', '/', str_replace('-','+',explode('.', $token)[1]))
                    )
                )
        );
    }

    function getAliadoFromJWT($user){
        $aliado = (object) array (
            "nombre"=>$user->active_xpaycta->siglaspersjuridica,
            "xpayctanro"=>$user->active_xpaycta->xpayctanro,
            "avatar"=>$user->active_xpaycta->url_avatar1,
            "persona"=>(object) array (
                "alias"=>$user->usuario->alias,
                "tipnip"=>$user->usuario->tipnip,
                "codnip"=>$user->usuario->codnip,
                "email_publico"=>$user->usuario->email_publico,
                "nombrecorto"=>$user->usuario->nombrecorto,
                "nombrecompleto"=>$user->usuario->nombrecompleto,
                "nropersona"=>$user->usuario->nropersona,
                "nrousuario"=>$user->usuario->nrousuario,
                "url_avatar1"=>$user->active_xpaycta->url_avatar1,
            )
        );

        return $aliado;
        
    }


    $personas_xpay_cuenta = getPersonasFromXpayctanro($data->xpayctanro)->results;    

    $login_Jwt = object_from_jwt($data->jwt)->usuario;

    
    
    $nropersona = $login_Jwt->nropersona;
    $xpayctanro = md5($data->xpayctanro);
    $logged_in_user;

    if ($login_Jwt){
        $login_jwt = $login_Jwt;
        $md5column;
        $search_column = array_column($login_Jwt->xpaycta, 'xpayctanro');
        
        foreach ($search_column as $key => $value) {
            $md5column[$key] = md5($value);
        }
        
        
        $key_jwt = array_search($xpayctanro, $md5column);

        $logged_in_user = (object) array(
            "usuario"=>$login_Jwt,
            "active_xpaycta"=>$login_Jwt->xpaycta[$key_jwt]
        );

    } 





    $aliado_data = getAliadoFromJWT($logged_in_user);

    $persona_cod = $aliado_data->persona->nropersona;


    $array_usuario_nropersona = array_column($personas_xpay_cuenta, 'nropersona');
    $aliado_nropersona = $personas_xpay_cuenta[0]->cuenta->nropersona;

    $key_nropersona = array_search($aliado_data->persona->nropersona, $array_usuario_nropersona);
    if(!is_numeric($key_nropersona)) {
        $persona_cod = $aliado_nropersona;
    }
    // ESTE XPAYCTANRO ESTÁ EN MD5


    // $aliado_cod = $login_data->xpayctanro;  
    $logged_in_user->persona_cod = $persona_cod;



    echo json_encode($logged_in_user);




    // echo json_encode($aliado);




?>