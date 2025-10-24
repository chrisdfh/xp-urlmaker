<?php
    $data = file_get_contents('php://input');
    $fecha = date('d/m/Y H:i');
    const FILE_NAME = 'aliados.json';

    $unsaved = json_decode($data, false);
    $unsaved->id=time();    

    $aliados = file_get_contents(FILE_NAME, true);

    $datos_json = json_decode($aliados, false);
    $datos_json[] = $unsaved;

    $new_json = json_encode($datos_json);
    try{
        file_put_contents(FILE_NAME, $new_json.PHP_EOL);
        echo '{"status":"ok","id":'.$unsaved->id.'}';
    } catch (Exception $e) {
        header('HTTP/1.0 400 Bad Request');
        echo '{"status":"error"}';
    }

?>