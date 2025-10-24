<?php
    $data = file_get_contents('php://input');
    $fecha = date('d/m/Y H:i');
    const FILE_NAME = 'aliados.json';

    $unsaved = json_decode($data, false);

    $aliados = file_get_contents(FILE_NAME, true);

    $datos_php = json_decode($aliados, false);
    $pre_search_array = array_column($datos_php, 'persona');
    $search_array = array_column($pre_search_array, 'codnip');

    $key = array_search($unsaved->codnip, $search_array);
    if (is_int($key)) {
        echo '{"status":"exist","id":"'.$key.'"}';
        return;
    } else {
        echo '{"status":"new"}';
        return;
    }


    // $datos_json = json_decode($aliados, false);
    // $datos_json[] = $unsaved;

    // $new_json = json_encode($datos_json);
    // file_put_contents(FILE_NAME, $new_json.PHP_EOL);
?>