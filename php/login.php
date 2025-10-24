<?php

    $data_raw = file_get_contents('php://input');
    $data = json_decode($data_raw, false);
    
    $tipnip = $data->tipnip_cliente;
    $codnip = $data->codnip_cliente;
    $nacionalidad_cedula = $data->tipnip_usuario;
    $cedula = $data->codnip_usuario;
    $contrasena = $data->password;

    $rif = "$tipnip-$codnip";
    $usuario = "$nacionalidad_cedula$cedula";

    $users = array(
        array(
            'rif' => 'J-307332204',
            'usuario' => 'V3658217',
            'contrasena' => '0d5b28bb5403cddd94e839016ec71c0e',
            'datos_login' => array(
                'xpayctanro' => md5('X000000001'),
                'nropersona' => 85
            )
        ),
        array(
            'rif' => 'J-406062677',
            'usuario' => 'V3658217',
            'contrasena' => '0d5b28bb5403cddd94e839016ec71c0e',
            'datos_login' => array(
                'xpayctanro' => md5('X000000002'),
                'nropersona' => 85
            )
        ),
        array(
            'rif' => 'J-001297723',
            'usuario' => 'V3658217',
            'contrasena' => '0d5b28bb5403cddd94e839016ec71c0e',
            'datos_login' => array(
                'xpayctanro' => md5('X000000003'),
                'nropersona' => 85
            )
        ),
        array(
            'rif' => 'J-296952728',
            'usuario' => 'V3658217',
            'contrasena' => '0d5b28bb5403cddd94e839016ec71c0e',
            'datos_login' => array(
                'xpayctanro' => md5('X000000004'),
                'nropersona' => 85
            )
        ),
        array(
            'rif' => 'J-296952728',
            'usuario' => 'V22658819',
            'contrasena' => '334f5ff389cc02d4f9c787a6ba294bcd',
            'datos_login' => array(
                'xpayctanro' => md5('X000000004'),
                'nropersona' => 2393
            )
        ),
        array(
            'rif' => 'G-200001941',
            'usuario' => 'V3658217',
            'contrasena' => '0d5b28bb5403cddd94e839016ec71c0e',
            'datos_login' => array(
                'xpayctanro' => md5('X000000007'),
                'nropersona' => 85
            )
        ),
        array(
            'rif' => 'J-313130222',
            'usuario' => 'V3658217',
            'contrasena' => '0d5b28bb5403cddd94e839016ec71c0e',
            'datos_login' => array(
                'xpayctanro' => md5('X000000008'),
                'nropersona' => 85
            )
        )
    );
    

    $key;

    foreach($users as $k => $user) {
        if ($user['rif'] == $rif && $user['usuario'] == $usuario) {
            $key = $k;
            break;
        }
    }

    // $users_rif = array_column($users, 'rif');

    // $key = array_search($rif, $users_rif);
    if (is_numeric($key)) {
        if ($users[$key]['contrasena'] == $contrasena) {
            header('HTTP/1.0 200 OK');
            $user = $users[$key];
            echo json_encode($user);
        } else {
            header('HTTP/1.0 401 Unauthorized');
            echo '{"status":"401","message":"Error en usuario/contraseña"}';
        }
    } else {
        header('HTTP/1.0 404 Not Found');
        echo '{"status":"404","message":"Error en usuario/contraseña!"}';
    }

?>