<?php
    $data = file_get_contents('php://input');
    $fecha = date('d/m/Y H:i');
    const FILE_NAME = 'aliados.json';

    $aliado_id = json_decode($data, false)->id;

    $aliados = file_get_contents(FILE_NAME, true);

    $datos_php = json_decode($aliados, false);
    $search_array = array_column($datos_php, 'id');

    $key = array_search($aliado_id, $search_array);
    if (is_int($key)) {
        echo json_encode($datos_php[$key]);
        return;
    } else {
        header('HTTP/1.0 404 Not Found');
        echo '{"status":"404","message":"Aliado no encontrado"}';
        return;
    }


    // $datos_json = json_decode($aliados, false);
    // $datos_json[] = $unsaved;

    // $new_json = json_encode($datos_json);
    // file_put_contents(FILE_NAME, $new_json.PHP_EOL);
?>