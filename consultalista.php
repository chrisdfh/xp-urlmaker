<!DOCTYPE html>
<html lang="en">
<head>
    <base href="..">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <?php
        include './controller.php';
    ?>


    <title>Consulta Registro</title>


    <meta name="description" content="Registro de Aliado">

    <!-- Facebook Meta Tags -->
    <meta property="og:url" content="https://www.xitypay.com/">
    <meta property="og:type" content="website">
    <meta property="og:title" content="XityPay">
    <meta property="og:description" content="Registro de Aliado">
    <meta property="og:image" content="https://www.xitypay.com/assets/img/icons/icon-192x192.png">

    <!-- Twitter Meta Tags -->
    <meta name="twitter:card" content="summary_large_image">
    <meta property="twitter:domain" content="xitypay.com">
    <meta property="twitter:url" content="https://www.xitypay.com/">
    <meta name="twitter:title" content="XityPay">
    <meta name="twitter:description" content="Registro de Aliado">
    <meta name="twitter:image" content="https://www.xitypay.com/assets/img/icons/icon-192x192.png">
    
    <!-- BOOTSTRAP -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous" defer></script>

    <!-- LOCAL FILES -->
    <link rel="stylesheet" href="./css/registro.css?v=<?=$FILE_VER?>">
    <link rel="stylesheet" href="./css/consulta.css?v=<?=$FILE_VER?>">
    <script src="./js/script-consulta.js?v=<?=$FILE_VER?>" defer></script>



</head>
<body>
    <div class="container">
        <div class="row">
            <div class="col-12">
                <h3>Consulta de Registro</h3>
            </div>

            <div class="island">
                <table class="table mb-0">
                    <thead>
                        <tr>
                            <td>Fecha Registro</td>
                            <td>RIF</td>
                            <td>Nombre Comercial</td>
                            <td>Razón Social</td>
                        </tr>
                    </thead>
                    <tbody>

                    </tbody>
                </table>
            </div>
        </div>
    </div>
</body>
<script>
    document.addEventListener("DOMContentLoaded", function() {
        getAliadoList()
    })
</script>
</html>