<?php
    $login_data = isset($_COOKIE['ld']) ? json_decode($_COOKIE['ld']) : null;
    $login_jwt = isset($_COOKIE['xpr']) ? json_decode($_COOKIE['xpr']) : null;
    // EN PANTALLA DE FORMA DE ENVIO, BUSCAR LA DATA DE XPR

    function obj_from_jwt($token){
        return (
            json_decode(
                base64_decode(
                    str_replace('_', '/', str_replace('-','+',explode('.', $token)[1]))
                    )
                )
        );
    }

    if (!$login_data) {
        header('Location: /login');
    } else {
        if (!isset($login_data->xpayctanro) || !isset($login_data->nropersona)) {
            header('Location: /login');
        }

        if ($login_jwt){
            $login_jwt = obj_from_jwt($login_jwt)->usuario;
            $md5column;
            $search_column = array_column($login_jwt->xpaycta, 'xpayctanro');
            
            foreach ($search_column as $key => $value) {
                $md5column[$key] = md5($value);
            }
            

            $key_jwt = array_search($login_data->xpayctanro, $md5column);

            $logged_in_user = (object) array(
                "usuario"=>$login_jwt,
                "active_xpaycta"=>$login_jwt->xpaycta[$key_jwt]
            );

            $jwt_active = json_encode($logged_in_user);
        } 

        // ESTE XPAYCTANRO ESTÁ EN MD5
        $aliado_cod = $login_data->xpayctanro;  
        $persona_cod = $login_data->nropersona;
        $user_cod = $login_data->nrousuario;

        $user_type = $login_data->rol;

        // ESTE XPAYCTANRO ESTÁ EN PLAINTEXT
        $xpcta_login = $login_data->xpaycta;
        
        // CAMBIO LA FORMA DE ASIGNAR EL XPAYCTA DE LOGIN
        // $xpcta_login = $logged_in_user->active_xpaycta->xpayctanro;
    }
?>