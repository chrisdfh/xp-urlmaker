<?php

    const XITYPAY_URL = 'https://test.xitypay.com';

    if (isset($_ENV['CIAOPR'])) {
        $ciaopr = $_ENV['CIAOPR'];
    }else{
        $error = true;
    }
    if (isset($_ENV['XITYPAY_API_KEY'])) {
        $api_key = $_ENV['XITYPAY_API_KEY'];
    }else{
        $error = true;
    }
    if (isset($_ENV['XITYPAY_USER_ID'])) {
        $user_id = intval($_ENV['XITYPAY_USER_ID']);
    }else{
        $error = true;
    }
    if (isset($_ENV['XITYPAY_API_URL'])) {
        $api_url = $_ENV['XITYPAY_API_URL'];
    }else{
        $error = true;
    }
    if (isset($_ENV['XITYPAY_XPAYCTA'])) {
        $xpaycta = $_ENV['XITYPAY_XPAYCTA'];
    }else{
        $error = true;
    }
    
    // $ciaopr = '1';
    // $api_key = 'JNNTl7iZMg6FF9Ow5rmBcfmt7ZJjVlkS';
    // $user_id = 2217; //PARA LA X.....072
    // $api_url = 'https://test-api.xitypay.com';
    // $xpaycta = 'X000000072';
    // $error=false;

    $options = ["http" => [
        "method" => "GET",
        "header" => [
            "Content-Type: application/json",
            "X-API-KEY: $api_key"
        ],
    ]];



    $ciaopr = '1';
    date_default_timezone_set('America/Caracas');
    setlocale(LC_TIME, 'es_VE.utf8');
    ini_set('display_errors', '0');

    $FILE_VER="0.06";
    $ambiente_prueba = true;
    // CHANGE JWT

    $env_server = $_ENV['XITYPAY_API_URL'];
    
    $env_server_login = $_ENV['XITYPAY_API_LOGIN_URL'];
    
    
    $xitypay_api = 'https://xitypay.com/api';
    $xitypay_api2 = 'https://xitypay.com/api';
    $xitypay_api_login = 'https://www.xitypay.com';

    if ($ambiente_prueba){
        $env_server_login = 'https://test-api.xitypay.com';
        $env_server = 'https://test-api.xitypay.com/api';
        $xitypay_api_login = 'https://test-api.xitypay.com';
    }

    
    if ($env_server) {  
        $xitypay_api = $env_server;
        $xitypay_api2 = $env_server;
    }
    if ($env_server_login){
        $xitypay_api_login=$env_server_login;
    }

    function serverInfo(){
        global $xitypay_api;
        global $xitypay_api2;
        global $xitypay_api_login;
        
        echo "<script>const xitypayApi='$xitypay_api'</script>";
        echo "<script>const xitypayApiLogin='$xitypay_api_login'</script>";
        echo "<script>const xitypayApi2='$xitypay_api2'</script>";
    }
    $xpaynro='';
    $logo_aliado='';


    $ip =   getenv('HTTP_CLIENT_IP')?:
            getenv('HTTP_X_FORWARDED_FOR')?:
            getenv('HTTP_X_FORWARDED')?:
            getenv('HTTP_FORWARDED_FOR')?:
            getenv('HTTP_FORWARDED')?:
            getenv('REMOTE_ADDR');

    const BANCOS = array(
        array(
            "cod"=>"0172",
            "nombre"=>" - Bancamiga",
            "enabled"=>true,
            "visible_general"=>true
        ),
        array(
            "cod"=>"0174",
            "nombre"=>" - Banplus",
            "enabled"=>true,
            "visible_general"=>true
        ),
        array(
            "cod"=>"0191",
            "nombre"=>" - BNC",
            "enabled"=>true,
            "visible_general"=>true
        ),
        array(
            "cod"=>"0128",
            "nombre"=>" - Caroní",
            "enabled"=>true,
            "visible_general"=>true
        ),
        array(
            "cod"=>"0157",
            "nombre"=>" - Del Sur",
            "enabled"=>true,
            "visible_general"=>true
        ),
        array(
            "cod"=>"0115",
            "nombre"=>" - Exterior",
            "enabled"=>true,
            "visible_general"=>true
        ),
        array(
            "cod"=>"0105",
            "nombre"=>" - Mercantil",
            "enabled"=>true,
            "visible_general"=>true
        ),
        array(
            "cod"=>"0169",
            "nombre"=>" - Mi Banco",
            "enabled"=>true,
            "visible_general"=>true
        ),
        array(
            "cod"=>"0178",
            "nombre"=>" - N58",
            "enabled"=>true,
            "visible_general"=>true
        ),
        array(
            "cod"=>"0138",
            "nombre"=>" - Plaza",
            "enabled"=>true,
            "visible_general"=>true
        ),
        array(
            "cod"=>"0108",
            "nombre"=>" - Provincial",
            "enabled"=>true,
            "visible_general"=>true
        ),
        array(
            "cod"=>"0104",
            "nombre"=>" - Banco Venezolano de Crédito",
            "enabled"=>true,
            "visible_general"=>true
        ),
        array(
            "cod"=>"0156",
            "nombre"=>" - 100% Banco",
            "enabled"=>true,
            "visible_general"=>true
        ),



        array(
            "cod"=>"",
            "nombre"=>"═════════════════════",
            "enabled"=>false,
            "visible_general"=>false
        ),
        array(
            "cod"=>"",
            "nombre"=>"PRÓXIMAMENTE",
            "enabled"=>false,
            "visible_general"=>false
        ),
        array(
            "cod"=>"",
            "nombre"=>"═════════════════════",
            "enabled"=>false,
            "visible_general"=>false
        ),

        

        array(
            "cod"=>"0171",
            "nombre"=>" - Banco Activo",
            "enabled"=>false,
            "visible_general"=>true
        ),
        array(
            "cod"=>"0166",
            "nombre"=>" - Agrícola",
            "enabled"=>false,
            "visible_general"=>true
        ),
        array(
            "cod"=>"0168",
            "nombre"=>" - Bancrecer",
            "enabled"=>false,
            "visible_general"=>true
        ),
        array(
            "cod"=>"0134",
            "nombre"=>" - Banesco",
            "enabled"=>false,
            "visible_general"=>true
        ),
        array(
            "cod"=>"0177",
            "nombre"=>" - BANFANB",
            "enabled"=>false,
            "visible_general"=>true
        ),
        array(
            "cod"=>"0175",
            "nombre"=>" - BDT",
            "enabled"=>false,
            "visible_general"=>true
        ),
        array(
            "cod"=>"0173",
            "nombre"=>" - BID",
            "enabled"=>false,
            "visible_general"=>true
        ),
        array(
            "cod"=>"0114",
            "nombre"=>" - Banco del Caribe ",
            "enabled"=>false,
            "visible_general"=>true
        ),
        array(
            "cod"=>"0151",
            "nombre"=>" - Fondo Común",
            "enabled"=>false,
            "visible_general"=>true
        ),
        array(
            "cod"=>"0137",
            "nombre"=>" - Sofitasa",
            "enabled"=>false,
            "visible_general"=>true
        ),
        array(
            "cod"=>"0163",
            "nombre"=>" - Tesoro",
            "enabled"=>false,
            "visible_general"=>true
        ),
        array(
            "cod"=>"0102",
            "nombre"=>" - Banco de Venezuela",
            "enabled"=>false,
            "visible_general"=>true
        ),
    );


    const ESTADOS_VZLA = array(
        array(
            'cod'=>'00',
            'nom'=>'Gran Caracas',
            'visible'=>true
        ),
        array(
            'cod'=>'15',
            'nom'=>'Miranda',
            'visible'=>true
        ),
        array(
            'cod'=>'24',
            'nom'=>'La Guaira',
            'visible'=>true
        ),
        array(
            'cod'=>'02',
            'nom'=>'Amazonas',
            'visible'=>false
        ),
        array(
            'cod'=>'03',
            'nom'=>'Anzoáteguí',
            'visible'=>false
        ),
        array(
            'cod'=>'04',
            'nom'=>'Apure',
            'visible'=>false
        ),
        array(
            'cod'=>'05',
            'nom'=>'Aragua',
            'visible'=>false
        ),
        array(
            'cod'=>'06',
            'nom'=>'Barinas',
            'visible'=>false
        ),
        array(
            'cod'=>'07',
            'nom'=>'Bolívar',
            'visible'=>false
        ),
        array(
            'cod'=>'08',
            'nom'=>'Carabobo',
            'visible'=>false
        ),
        array(
            'cod'=>'09',
            'nom'=>'Cojedes',
            'visible'=>false
        ),
        array(
            'cod'=>'10',
            'nom'=>'Delta Amacuro',
            'visible'=>false
        ),
        array(
            'cod'=>'11',
            'nom'=>'Falcón',
            'visible'=>false
        ),
        array(
            'cod'=>'12',
            'nom'=>'Guárico',
            'visible'=>false
        ),
        array(
            'cod'=>'13',
            'nom'=>'Lara',
            'visible'=>false
        ),
        array(
            'cod'=>'14',
            'nom'=>'Mérida',
            'visible'=>false
        ),
        array(
            'cod'=>'16',
            'nom'=>'Monagas',
            'visible'=>false
        ),
        array(
            'cod'=>'17',
            'nom'=>'Nueva Esparta',
            'visible'=>false
        ),
        array(
            'cod'=>'18',
            'nom'=>'Portuguesa',
            'visible'=>false
        ),
        array(
            'cod'=>'19',
            'nom'=>'Sucre',
            'visible'=>false
        ),
        array(
            'cod'=>'20',
            'nom'=>'Táchira',
            'visible'=>false
        ),
        array(
            'cod'=>'21',
            'nom'=>'Trujillo',
            'visible'=>false
        ),
        array(
            'cod'=>'22',
            'nom'=>'Yaracuy',
            'visible'=>false
        ),
        array(
            'cod'=>'23',
            'nom'=>'Zulia',
            'visible'=>false
        ),
        array(
            'cod'=>'25',
            'nom'=>'Dependencias Feredales',
            'visible'=>false
        )
    );

    function getActividades(){
        global $options;
        $server="https://micropersona.xityclub.com";
    
        $cant_registros=1000;
    
        $url_request = "$server/ocupaciones_actividades/1?cant_registros=$cant_registros";
    
        $parametros = array(
            "ciaopr"=> "1",
            "campousuariochar_1"=>"A"
        );
    
        $options['http']['method'] = 'POST';
        $options['http']['content'] = json_encode($parametros);
        
        $context = stream_context_create($options);
        return json_decode(file_get_contents($url_request, false, $context))->results;
    }


    function getBancos(){
        global $options;
        $options['http']['method'] = 'GET';
        $url = 'https://sypago.net:8086/api/v1/banks';
    
        $context = stream_context_create($options);
        $result = json_decode(file_get_contents($url, false, $context));
    
        $bancos_ok = [];
        $bancos_no_ok = [];
      
        foreach($result as $banco){
          if ($banco->IsDebitOTP && $banco->Active){ 
            $bancos_ok[] = $banco;
          } else {
            $bancos_no_ok[] = $banco;
          }
        }
    
        return array($bancos_ok, $bancos_no_ok);
      }

    function getAliadoCod($aliado_id){
        global $options;
        global $logo_aliado;
        // $server = "./xpnro.json";
        $server = "https://mmedia.misrevistas.com/XTC/archivos/xitypay/xpnro.json";

        $context = stream_context_create($options);
        $result = file_get_contents($server, false, $context);
        $aliados = json_decode($result);

        $key = array_search($aliado_id, array_column($aliados, 'id'));
        if (is_int($key)) {
            $logo_aliado = $aliados[$key]->avatar;
            return $aliados[$key]->xpaynro;
        };

        return null;
    }

    function getAliadoData($xpay_cta_hash,$persona_nro=null){
        global $options;
        global $logo_aliado;
        global $ciaopr;
        global $xitypay_api;

        $options = ["http" => [
            "method" => "GET",
            "header" => [
                "Content-Type: application/json",
                "X-API-KEY:JDv1dv2TMXLr7M5WJpCJVtWfaP3MjMck"
            ],
        ]];

        $server = "$xitypay_api/xpay_cuenta/persona/$ciaopr/$xpay_cta_hash/$persona_nro";


        $context = stream_context_create($options);
        $result = file_get_contents($server, false, $context);

        $aliado_data = json_decode($result);


        $tipnip = $aliado_data->cuenta->tipnip == 'A' ? 'V' : $aliado_data->cuenta->tipnip;
        $aliado = array(
            "nombre"=>$aliado_data->cuenta->nombre,
            "descripcion"=> isset($aliado_data->cuenta->concepto_x_defecto)?$aliado_data->cuenta->concepto_x_defecto:$aliado_data->cuenta->mensaje_desc,
            "avatar"=>$aliado_data->cuenta->url_avatar1,
            "cta_titular_nombre"=>$aliado_data->cta_titular_nombre,
            "moneda"=>"Bs.",
            "moneda2"=>"$",
            "rif"=>$tipnip.'-'.$aliado_data->cuenta->codnip,
            "comision"=>(isset($aliado_data->cuenta->porcentaje_xitypay) && is_numeric($aliado_data->cuenta->porcentaje_xitypay))?$aliado_data->cuenta->porcentaje_xitypay:0,
            "xpayctanro"=>$aliado_data->xpayctanro,
            "concepto_default"=> isset($aliado_data->cuenta->concepto_x_defecto)?$aliado_data->cuenta->concepto_x_defecto:$aliado_data->cuenta->mensaje_desc,
            "activo"=>$aliado_data->cuenta->activo,
            "def1"=>$aliado_data->cuenta->valor_def_1,
            "def2"=>$aliado_data->cuenta->valor_def_2,
            "def3"=>$aliado_data->cuenta->valor_def_3,
            "defd1"=>$aliado_data->cuenta->valor_def_4,
            "defd2"=>$aliado_data->cuenta->valor_def_5,
            "defd3"=>$aliado_data->cuenta->valor_def_6,
            "rate"=>36.68,
            "persona"=>$aliado_data->persona,
            "vigente_por"=>$aliado_data->cuenta->vigente_por
        );
        
        $aliado_object = (object) $aliado;
        
        if (!isset($aliado_data->url_avatar1)){
            $aliado_object->persona->url_avatar1='https://cdn1.iconfinder.com/data/icons/user-pictures/101/malecostume-512.png';
        } else {
            $aliado_object->persona->url_avatar1=$aliado_data->url_avatar1;
        }
        $aliado_object->comision_calculada = 1+ ($aliado_object->comision / 100);

        return $aliado_object;
    }


    function getAllAliadoData($xpay_cta_hash,$persona_nro=null){
        global $options;
        global $ciaopr;
        global $xitypay_api;


        $server = "$xitypay_api/xpay_cuenta/persona/$ciaopr/$xpay_cta_hash/$persona_nro";
        
        $new_options = $options;
        $new_options['http']['method']='GET';
        $context = stream_context_create($new_options);
        $result = file_get_contents($server, false, $context);

        $aliado_data = json_decode($result);
        return $aliado_data;
    }

    function getAliadoDataNoPersona($xpayctanro){
        global $options;
        global $logo_aliado;
        global $ciaopr;
        global $xitypay_api;

        $server = "$xitypay_api/aliado/$ciaopr/$xpayctanro";

        // $api_dollar = "https://pydolarve.org/api/v1/dollar";
        // $dolar = json_decode(file_get_contents($api_dollar),false);
        // "rate"=>$dolar->monitors->bcv->price,

        $context = stream_context_create($options);
        $result = file_get_contents($server, false, $context);

        $aliado_data = json_decode($result);

        $aliado = array(
            "nombre"=>$aliado_data->nombrecorto,
            "descripcion"=>$aliado_data->mensaje_desc,
            "avatar"=>$aliado_data->url_avatar1,
            "moneda"=>"Bs.",
            "moneda2"=>"$",
            "comision"=>$aliado_data->porcentaje_xitypay,
            "xpayctanro"=>$aliado_data->xpayctanro,
            "def1"=>$aliado_data->valor_def_1,
            "def2"=>$aliado_data->valor_def_2,
            "def3"=>$aliado_data->valor_def_3,
            "defd1"=>$aliado_data->valor_def_4,
            "defd2"=>$aliado_data->valor_def_5,
            "defd3"=>$aliado_data->valor_def_6,
            "rate"=>36.68,
            "persona"=>$aliado_data->persona
        );

        $aliado_object = (object) $aliado;

        $aliado_object->comision_calculada = 1+ ($aliado_object->comision / 100);

        return $aliado_object;
    }

    function getAliadoFromJWT(){
        global $logged_in_user;
        $aliado = (object) array (
            "nombre"=>$logged_in_user->active_xpaycta->siglaspersjuridica,
            "xpayctanro"=>$logged_in_user->active_xpaycta->xpayctanro,
            "avatar"=>$logged_in_user->active_xpaycta->url_avatar1,
            "persona"=>(object) array (
                "alias"=>$logged_in_user->usuario->alias,
                "tipnip"=>$logged_in_user->usuario->tipnip,
                "codnip"=>$logged_in_user->usuario->codnip,
                "email_publico"=>$logged_in_user->usuario->email_publico,
                "nombrecorto"=>$logged_in_user->usuario->nombrecorto,
                "nombrecompleto"=>$logged_in_user->usuario->nombrecompleto,
                "nropersona"=>$logged_in_user->usuario->nropersona,
                "nrousuario"=>$logged_in_user->usuario->nrousuario,
                "url_avatar1"=>$logged_in_user->active_xpaycta->url_avatar1,
            )
        );

        return $aliado;
    }


    function getPersonasFromXpayctanro($xpayctanro){
        global $options;
        global $xitypay_api;

        $url = "$xitypay_api/xpay_cuenta/persona/1/$xpayctanro?pagina=1&cant_registros=200";

        $context = stream_context_create($options);
        $result = file_get_contents($url, false, $context);
        return json_decode($result,false);
    }


    function sendPayment($persona_cod,$correo_pagador,$xpaycta,$monto,$moneda,$concepto,$otp,$doc_tipo,$docnum,$cod_bank,$cel_num,$linknro){
        global $ciaopr;
        global $xitypay_api;

        $url_payment = "$xitypay_api/send/otp/$ciaopr/$xpaycta";
        // $url_payment = "https://api.xitypay.com/xitypay/send/otp/$ciaopr/$xpaycta";

        $moneda_string = $moneda=='USD'?'USD ':'Bs ';
        $concepto = "$concepto Por $moneda_string $monto";

        $data = array(
            "amount"=>array(
                "amt"=>floatval($monto),
                "currency"=>$moneda,
            ),
            "nropersona"=>intval($persona_cod),
            "linknro"=>$linknro,
            "correo_pagador"=>$correo_pagador,
            "concept"=>$concepto,
            "receiving_user"=>array(
                "otp"=>$otp,
                "document_info"=>array(
                    "type"=>$doc_tipo,
                    "number"=>$docnum
                ),
                "account"=>array(
                    "bank_code"=>$cod_bank,
                    "type"=>"CELE",
                    "number"=>$cel_num
                )
            ),
        );
        $options = ["http" => [
            "method" => "POST",
            "header" => [
                "Content-Type: application/json",
                "X-API-KEY:JDv1dv2TMXLr7M5WJpCJVtWfaP3MjMck"
            ],
            "content" => json_encode($data)
        ]];


        // echo "<br><br>";
        // echo json_encode($data);

        // echo "<br><br>";
        // return;

        $context = stream_context_create($options);
        $result = file_get_contents($url_payment, false, $context); 
        return json_decode($result, false);

    }


    function sendPayment2($persona_cod,$correo_pagador,$xpaycta,$monto,$moneda,$concepto,$otp,$doc_tipo,$docnum,$cod_bank,$cel_num,$linknro,$referencia='PAGO POR QR'){
        global $ciaopr;
        global $xitypay_api;
        global $ip;

        $url_payment = "$xitypay_api/send/otpv2/$ciaopr/$xpaycta";
        // $url_payment = "https://api.xitypay.com/xitypay/send/otp/$ciaopr/$xpaycta";

        $moneda_string = $moneda=='USD'?'USD ':'Bs ';
        $concepto = "$concepto Por $moneda_string $monto";

        $data = array(
            "otp"=>$otp,
            "moneda"=> $moneda,
            "monto"=> floatval($monto),
            "concepto"=> $concepto,
            "direccion_ip"=> $ip,
            "tipnip_pagador"=> $doc_tipo,
            "codnip_pagador"=> $docnum,
            "nombre_pagador"=> "XityPay SN",
            "bancocod_pagador"=> $cod_bank,
            "tipocta_pagador"=> "CELE",
            "nrocta_pagador"=> $cel_num,
            "correo_pagador"=> $correo_pagador,
            "nropersona"=> intval($persona_cod),
            "referencia_1"=> $referencia
        );

        

        $options = ["http" => [
            "ignore_errors" => true,
            "method" => "POST",
            "header" => [
                "Content-Type: application/json",
                "X-API-KEY:JDv1dv2TMXLr7M5WJpCJVtWfaP3MjMck"
            ],
            "content" => json_encode($data)
        ]];


        // echo "<br><br>";
        // echo json_encode($data);
        
        // echo "<br><br>";
        // echo $url_payment;
        // return;

        $context = stream_context_create($options);
        $result = file_get_contents($url_payment, false, $context); 
        return json_decode($result, false);

    }

    function sendPaymentFromLote($persona_cod,$correo_pagador,$xpaycta,$monto,$moneda,$concepto,$otp,$doc_tipo,$docnum,$cod_bank,$cel_num,$linknro){
        global $ciaopr;
        global $xitypay_api;

        $url_payment = "$xitypay_api/send/otp/$ciaopr/$xpaycta";
        // $url_payment = "https://api.xitypay.com/xitypay/send/otp/$ciaopr/$xpaycta";

        $moneda_string = $moneda=='USD'?'USD ':'Bs ';
        $concepto = "$concepto Por $moneda_string $monto";

        $data = array(
            "amount"=>array(
                "amt"=>floatval($monto),
                "currency"=>$moneda,
            ),
            "linknro"=>$linknro,
            "correo_pagador"=>$correo_pagador,
            "concept"=>$concepto,
            "receiving_user"=>array(
                "otp"=>$otp,
                "document_info"=>array(
                    "type"=>$doc_tipo,
                    "number"=>$docnum
                ),
                "account"=>array(
                    "bank_code"=>$cod_bank,
                    "type"=>"CELE",
                    "number"=>$cel_num
                )
            ),
        );

        if ($persona_cod != '' || $persona_cod != null) {
            $data["nropersona"]=intval($persona_cod);
        }

        // echo "<br><br>";
        // echo json_encode($data);
        // echo "<br><br>";

        $options = ["http" => [
            "method" => "POST",
            "header" => [
                "Content-Type: application/json",
                "X-API-KEY:JDv1dv2TMXLr7M5WJpCJVtWfaP3MjMck"
            ],
            "content" => json_encode($data)
        ]];

        $context = stream_context_create($options);
        $result = file_get_contents($url_payment, false, $context); 
        return json_decode($result, false);

    }

    function sendPaymentFromLote2($persona_cod,$correo_pagador,$xpaycta,$monto,$moneda,$concepto,$otp,$doc_tipo,$docnum,$cod_bank,$cel_num,$linknro,$referencia){
        global $ciaopr;
        global $xitypay_api;
        global $ip;

        $url_payment = "$xitypay_api/send/otpv2/$ciaopr/$xpaycta";
        // $url_payment = "https://api.xitypay.com/xitypay/send/otp/$ciaopr/$xpaycta";

        $moneda_string = $moneda=='USD'?'USD ':'Bs ';
        $concepto = "$concepto Por $moneda_string $monto";

        $data=array(
            "otp"=>$otp,
            "moneda"=> $moneda,
            "monto"=> floatval($monto),
            "concepto"=> $concepto,
            "direccion_ip"=> $ip,
            "tipnip_pagador"=> $doc_tipo,
            "codnip_pagador"=> $docnum,
            "nombre_pagador"=> "XityPay SN",
            "bancocod_pagador"=> $cod_bank,
            "tipocta_pagador"=> "CELE",
            "nrocta_pagador"=> $cel_num,
            "correo_pagador"=> $correo_pagador,
            "linknro"=>$linknro,
            "referencia_1"=>$referencia
        );

        if ($persona_cod != '' || $persona_cod != null) {
            $data["nropersona"]=intval($persona_cod);
        }

        // echo "<br><br>";
        // echo json_encode($data);
        // echo "<br><br>";

        $options = ["http" => [
            "ignore_errors" => true,
            "method" => "POST",
            "header" => [
                "Content-Type: application/json",
                "X-API-KEY:JDv1dv2TMXLr7M5WJpCJVtWfaP3MjMck"
            ],
            "content" => json_encode($data)
        ]];

        $context = stream_context_create($options);
        $result = file_get_contents($url_payment, false, $context); 
        return json_decode($result, false);

    }

    function sendPaymentFromLoteV2($persona_cod,$correo_pagador,$xpnro,$monto,$moneda,$concepto,$otp,$doc_tipo,$docnum,$cod_bank,$cel_num,$linknro){
        global $ciaopr;
        global $xitypay_api;

        $url_payment = "$xitypay_api/send/otp2/$ciaopr/$xpnro";
        $data = array(
            "amount"=>array(
                "amt"=>floatval($monto),
                "currency"=>$moneda,
            ),
            "linknro"=>$linknro,
            "correo_pagador"=>$correo_pagador,
            "concept"=>$concepto,
            "receiving_user"=>array(
                "otp"=>$otp,
                "document_info"=>array(
                    "type"=>$doc_tipo,
                    "number"=>$docnum
                ),
                "account"=>array(
                    "bank_code"=>$cod_bank,
                    "type"=>"CELE",
                    "number"=>$cel_num
                )
            ),
        );

        if ($persona_cod != '' || $persona_cod != null) {
            $data["nropersona"]=intval($persona_cod);
        }

        // echo "<br><br>";
        // echo json_encode($data);
        // echo "<br><br>";

        $options = ["http" => [
            "method" => "POST",
            "header" => [
                "Content-Type: application/json",
            ],
            "content" => json_encode($data)
        ]];

        $context = stream_context_create($options);
        $result = file_get_contents($url_payment, false, $context); 
        return json_decode($result, false);

    }


    function getRate($currency='dollar'){
        global $options;
        global $xitypay_api;
        global $ciaopr;

        $server = "$xitypay_api/currency_rate/$ciaopr/$currency";

        $context = stream_context_create($options);
        $result = file_get_contents($server, false, $context);
        $currency_rate = json_decode($result);
        return $currency_rate;
    }

    function syPagoRate($currency='USD',$monto=1, $xpayctanro=null){
        global $options;
        global $xitypay_api;
        global $ciaopr;

        $server = "$xitypay_api/currency_rate/$ciaopr";

        $data = array(
                "xpayctanro"=>$xpayctanro,
                "moneda"=> $currency,
                "monto"=> $monto
        );

        $options['http']['method'] = 'POST';
        $options['http']['content'] = json_encode($data);


        $context = stream_context_create($options);
        $result = json_decode(file_get_contents($server, false, $context));

        if (isset($result->monto_ves) && floatval($result->monto_ves) > 1) {
            $res_obj = (object) array(
                'code' => $currency,
                'rate' => $result->monto_ves
            );
        } else {
            $res_obj = syPagoRate_backup($currency);
        }

        return $res_obj;

        // $key = array_search($currency,array_column($result, 'code'),false);
        // if (is_int($key)) { 
        //     return $result[$key];
        // }
    }

    function syPagoRate_backup($currency='USD'){
        global $options;

        $server = "https://sypago.net:8086/api/v1/bank/bcv/rate";
        $options['http']['method'] = 'GET';

        $context = stream_context_create($options);
        $result = json_decode(file_get_contents($server, false, $context));

        $key = array_search($currency,array_column($result, 'code'),false);
        if (is_int($key)) { 
            return $result[$key];
        }
    }


    function enviarSolicitud($data){
        global $options;
        global $xitypay_api;
        global $ciaopr;

        $server_url = "$xitypay_api/link_cobro/$ciaopr";

        $options['http']['ignore_errors'] = true;
        $options['http']['method'] = 'POST';
        $options['http']['content'] = json_encode($data);



        $context = stream_context_create($options);
        $resp = json_decode(file_get_contents($server_url, false, $context));

        return $resp;


    }

    function getPago($pago_id){
        global $options;
        global $xitypay_api;
        global $ciaopr;

        $options['http']['method'] = 'GET';

        $server_url = "$xitypay_api/link_cobro/$ciaopr/$pago_id";
        $context = stream_context_create($options);
        return json_decode(file_get_contents($server_url, false, $context));
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

    function redirectUrl($reg,$tipo_pago='pago'){
        global $pago_id;
        $url = '';
        switch ($reg->xpayctanro){
            case "X000000073":
             $url = "https://neoplata.xitypay.com";
        }
        if ($url != ''){
            switch ($tipo_pago){
                case "pago":
                    $url .= "/pago/$pago_id";
                break;
                case "monto_definido":
                    $url .= "/$pago_id";
                break;
                case "monto_abierto":
                    $url .= "/$pago_id";
                break;
            }
            return $url;

        }
        return null;
    }


    function getReviews(){
        global $options;
        $file = './reviews.json';

        $context = stream_context_create($options);
        return json_decode(file_get_contents($file, false, $context));
    }


    const COD_ERROR = array(
        "AG09"=>"Pago no recibido",
        "AC00"=>"Operación en espera de respuesta del receptor",
        "AB01"=>"Tiempo de espera agotado",
        "AB07"=>"Agente fuera de línea",
        "AC01"=>"Número de cuenta incorrecto",
        "AC04"=>"Cuenta cancelada",
        "AC06"=>"Cuenta bloqueada",
        "AC09"=>"Moneda no válida",
        "AG10"=>"Agente suspendido o excluido",
        "AM02"=>"Monto de la transacción no permitido",
        "AM03"=>"Moneda no permitida",
        "AM04"=>"Saldo insuficiente",
        "AM05"=>"Operación duplicada",
        "BE01"=>"Datos del cliente no corresponden a la cuenta",
        "BE20"=>"Longitud del nombre inválida",
        "CH20"=>"Número de decimales incorrecto",
        "DU01"=>"Identificación de mensaje duplicado",
        "ED05"=>"Liquidación fallida",
        "FF05"=>"Código del producto incorrecto",
        "FF07"=>"Código del subproducto incorrecto",
        "RC08"=>"Código del banco no existe en el sistema de compensación / liquidación",
        "TKCM"=>"Código único de operación de débito incorrecto",
        "TM01"=>"Fuera del horario permitido",
        "VE01"=>"Rechazo técnico",
        "DT03"=>"Fecha de procesamiento no bancaria no válida",
        "TECH"=>"Error técnico al procesar liquidación",
        "PRCS"=>"Liquidación Lipone procesada",
        "REJT"=>"Solicitud de liquidación Lipone rechazada",
        "AG01"=>"Transacción restringida",
        "MD09"=>"Afiliación inactiva",
        "MD15"=>"Monto incorrecto",
        "MD21"=>"Cobro no permitido",
        "CUST"=>"Cancelación solicitada por el deudor",
        "DS02"=>"Operación cancelada",
        "MD01"=>"No posee afiliación",
        "MD22"=>"Afiliación suspendida",
    );

    function get_transactions($ciaopr, $xpayctanro, $fecha_inicial=null, $fecha_final=null, $status=null,$pagina=1,$cant_registros=20, $nropersona=null,$tipo_transaccion=null){
        global $options;
        global $xitypay_api;



        $server = "$xitypay_api/transacciones/$ciaopr?pagina=$pagina&cant_registros=$cant_registros";
     
        $data = array(
            "xpayctanro"=>$xpayctanro,
            "status"=>$status,
            "fecha_desde"=>$fecha_inicial,
            "fecha_hasta"=>$fecha_final,
            "tipo_transaccion"=>$tipo_transaccion,
        );

        if ($nropersona != null){
            $data['nropersona'] = intval($nropersona);
        }


        $options['http']['ignore_errors'] = true;
        $options['http']['method'] = 'POST';
        $options['http']['content'] = json_encode($data);

        $context = stream_context_create($options);

        $resp = json_decode(file_get_contents($server, false, $context));
        return $resp;

    }



    $tipo_transaccion = function ($cuenta_transitoria){
        if ($cuenta_transitoria == 'S') {
            return 'SAL';
        } else {
            return 'BAS';
        }
    };

    function get_transactions_persona($ciaopr, $xpaycta_hash, $fecha_inicial=null, $fecha_final=null, $status=null,$pagina=1,$cant_registros=20, $nropersona=null){
        global $options;
        global $xitypay_api;

        $server = "$xitypay_api/transacciones/$ciaopr?pagina=$pagina&cant_registros=$cant_registros";
     
        $data = array(
            "hash_ctanro"=>$xpaycta_hash,
            "status"=>$status,
            "fecha_desde"=>$fecha_inicial,
            "fecha_hasta"=>$fecha_final,
        );

        if ($nropersona != null){
            $data['nropersona'] = intval($nropersona);
        }

        $options['http']['ignore_errors'] = true;
        $options['http']['method'] = 'POST';
        $options['http']['content'] = json_encode($data);

        $context = stream_context_create($options);

        $resp = json_decode(file_get_contents($server, false, $context));
        return $resp;

    }

    function format_number($number){
        return number_format($number, 2, ',', '.');
    }

    function format_date($date,$format="d/m/Y  h:i a"){
        return date($format, strtotime($date));
    }

    function getBancoData($cod){
        $key = array_search($cod,array_column(BANCOS, 'cod'), true);
        return BANCOS[$key];
    }

    function getStatusName($status){
        if ($status == 'ACCP'){return 'Aprobado';}
        if ($status == 'RJCT'){return 'Rechazado';}
    }

    function drawMoneda($transaccion){
        return "Bs. ".format_number(floatval($transaccion->monto_ves));
        // if ($transaccion->moneda == 'VES'){
        //     return "Bs. ".format_number(floatval($transaccion->monto));
        // } else {
        //     $pago  = format_number(floatval($transaccion->monto) * floatval($transaccion->rate));
        //     return "Bs. $pago";
        // }
    }

    function getMarquee(){
        // $url = 'https://mmedia.misrevistas.com/XTC/archivos/xitypay-conf/xpay-msg.json';
        $url = 'https://mmedia.xityclub.com/xitypay/config-files/xpay-msg.plain;%20charset=utf-8';
        
        $ch=curl_init();
        $timeout=2; //SI NO RESPONDE EN 2 SEGUNDOS, SIGO SIN ESPERAR

        $curl_options = array(
            CURLOPT_URL => $url,
            CURLOPT_RETURNTRANSFER => 1,
            CURLOPT_TIMEOUT => $timeout,
            CURLOPT_CONNECTTIMEOUT => $timeout
        );
        curl_setopt_array($ch, $curl_options);


        $result=curl_exec($ch);
        curl_close($ch);
        return json_decode($result);



        // global $options;
        // $options['http']['ignore_errors'] = true;
        // $options['http']['method'] = 'GET';
        // $context = stream_context_create($options);

        // $url = 'https://mmedia.misrevistas.com/XTC/archivos/xitypay-conf/xpay-msg.json';
        // return json_decode(file_get_contents($url, false, $context));
    }


    function getLayout($xpcuenta){
        
        if(isset($_SERVER['HTTPS'])){
            $protocol = ($_SERVER['HTTPS'] && $_SERVER['HTTPS'] != "off") ? "https://" : "http://";
        }
        else{
            $protocol = 'http://';
        }

        $styles = json_decode(file_get_contents($protocol.$_SERVER['HTTP_HOST'].'/xpcuenta_layout.json'),false);
        $key = array_search($xpcuenta,array_column($styles, 'xpcuenta'),true);
        if (is_int($key)) {
            return $styles[$key];
        } else {
            return $styles[0];
        }

    }

    function consulta_enlace($url){
        global $options;
        global $api_url;
        global $ciaopr;
        global $xpaycta;
        $data = array( "url" => $url,"currency"=>"USD" );
        $service_url = "$api_url/xp/enlace_check_url/$ciaopr/$xpaycta";

        $options['http']['ignore_errors'] = true;
        $options['http']['method'] = 'POST';
        $options['http']['content'] = json_encode($data);

        $context = stream_context_create($options);
        $enlace=json_decode(file_get_contents($service_url, false, $context));
        return $enlace;
    }

    

?>