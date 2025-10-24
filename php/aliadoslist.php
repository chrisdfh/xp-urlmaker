<?php
    $data = file_get_contents('php://input');
    const FILE_NAME = 'aliados.json';

    $aliados = file_get_contents(FILE_NAME, true);

    echo $aliados;
?>