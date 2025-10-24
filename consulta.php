<!DOCTYPE html>
<html lang="es">
<head>
    <?php
        include './controller.php';
        serverInfo();

        $actividades = getActividades();
    ?>
    <base href="..">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registro de Aliado</title>

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
    <script src="./js/script-registro.js?v=<?=$FILE_VER?>" defer></script>
    <script src="./js/script-consulta.js?v=<?=$FILE_VER?>" defer></script>
    

</head>
<body>
    <div class="container">
        <div class="row">
            <div class="col-12">
                <form action="javascript:;" onsubmit="regAliado(this)">
                    <h3 class="">
                        Consulta de registro como Aliado
                    </h3>
                    <div class="small-msg">
                        Los datos marcados con * son obligatorios
                    </div>

                    <div class="island" id="datos-basicos">
                        <div class="row gx-2">
                            <div class="col-5 col-md-4">
                                <div class="input-group-label">
                                    Tipo de Doc *
                                </div>
                                <div class="input-group mb-3">
                                    <select class="form-select" name="tipnip" required>
                                        <option value="J">Jurídico</option>
                                        <option value="V">Venezolano</option>
                                        <option value="E">Extranjero</option>
                                        <option value="P">Pasaporte</option>
                                    </select>
                                </div>
                            </div>

                            <div class="col-7 col-md-4">
                                <div class="input-group-label">
                                    Número de Doc *
                                </div>
                                <div class="input-group mb-3">
                                    <input placeholder="Ej. 123456789" type="number" class="form-control" name="codnip" id="codnip"   required>
                                </div>
                            </div>

                            <div class="col-12 col-md-4">
                                <div class="input-group-label">
                                    Razón Social *
                                </div>
                                <div class="input-group mb-3">
                                    <input placeholder="Razón social de la empresa" type="text" class="form-control" name="razonsocial" required>
                                </div>
                            </div>

                            <div class="col-12 col-md-4">
                                <div class="input-group-label">
                                    Nombre Comercial *
                                </div>
                                <div class="input-group mb-3">
                                    <input type="text" placeholder="Nombre de la empresa" class="form-control" name="nombrecomercial" required>
                                </div>
                            </div>

                            <div class="col-12 col-md-4">
                                <div class="input-group-label">
                                    Actividad Económica *
                                </div>
                                <div class="input-group mb-3">
                                    <select class="form-select" name="actividad" required>
                                        <option value="">Seleccione su actividad</option>
                                        <?php foreach($actividades as $actividad):?>
                                            <option value="<?=$actividad->ocupactivcod?>"><?=$actividad->ocupactivnombre?></option>
                                        <?php endforeach?>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="island" id="contacto">
                        <h4>Información de Contacto</h4>
                        <div class="row gx-2">
                            <div class="col-12 col-md-4">
                                <div class="input-group-label">
                                    Correo *
                                </div>
                                <div class="input-group mb-3">
                                    <input placeholder="Ej. usuario@gmail.com" type="email" class="form-control" id="email" name="email-contacto" onblur="copyValue('email','xp-email')" required>
                                </div>
                            </div>

                            <div class="col-12 col-md-4">
                                <div class="input-group-label">
                                    Tlf WhatsApp *
                                </div>
                                <div class="input-group mb-3">
                                    <input type="tel" placeholder="Ej. 4xx-5551234" class="form-control" name="tlf-contacto" id="tlf-contacto" onblur="copyValue('tlf-contacto','xp-telefono')" required>
                                </div>
                            </div>

                            <div class="col-12 col-md-4">
                                <div class="input-group-label">
                                    Tlf Local *
                                </div>
                                <div class="input-group mb-3">
                                    <input type="tel" placeholder="Ej. 2xx-5551234" class="form-control" name="tlflocal-contacto" required>
                                </div>
                            </div>
                        </div>

                        <h5>Dirección</h5>
                        <div class="row gx-2">
                            <div class="col-12">
                                <div class="input-group-label">
                                    Linea 1 *
                                </div>
                                <div class="input-group mb-3">
                                    <input type="text" placeholder="Ej. Calle 1" class="form-control" name="dir-lin1" required>
                                </div>
                            </div>
                            <div class="col-12">
                                <div class="input-group-label">
                                    Linea 2
                                </div>
                                <div class="input-group mb-3">
                                    <input type="text" class="form-control" name="dir-lin2">
                                </div>
                            </div>
                            <div class="col-12 col-md-6">
                                <div class="input-group-label">
                                    Linea 3
                                </div>
                                <div class="input-group mb-3">
                                    <input type="text" class="form-control" name="dir-lin3">
                                </div>
                            </div>
                            <div class="col-12 col-md-3">
                                <div class="input-group-label">
                                    Estado *
                                </div>
                                <div class="input-group mb-3">
                                    <select class="form-select" name="dir-estado" id="dir-estado" oninput="selectZona()" required>
                                        <option value="" disabled>Seleccione uno</option>
                                        <?php foreach(ESTADOS_VZLA as $estado):?>
                                            <option value="<?=$estado['cod']?>" <?=$estado['cod']=='00'?'selected':''?>><?=$estado['nom']?></option>
                                        <?php endforeach?>
                                    </select>
                                </div>
                            </div>
                            <div class="col-12 col-md-3">
                                <div class="input-group-label">
                                    Municipio *
                                </div>
                                <div class="input-group mb-3">
                                    <select class="form-select" name="dir-localidad" id="dir-localidad" disabled required>
                                        <option value="">Seleccione uno</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="island" id="responsable">
                        <h4>Datos de la Persona Responsable</h4>
                        <div class="row gx-2">
                            <div class="col-5 col-md-4">
                                <div class="input-group-label">
                                    Tipo de Doc *
                                </div>
                                <div class="input-group mb-3">
                                    <select class="form-select" name="tipnip-pr" required>
                                        <option value="V">V</option>
                                        <option value="E">E</option>
                                    </select>
                                </div>
                            </div>

                            <div class="col-7 col-md-4">
                                <div class="input-group-label">
                                    Número de Doc *
                                </div>
                                <div class="input-group mb-3">
                                    <input placeholder="Ej. 12345678" type="number" class="form-control" name="codnip-pr" required>
                                </div>
                            </div>

                            <div class="col-md-4 d-none d-md-block"></div>

                            <div class="col-12 col-md-6">
                                <div class="input-group-label">
                                    Primer Nombre *
                                </div>
                                <div class="input-group mb-3">
                                    <input placeholder="Ej. Carlos Antonio" type="text" class="form-control" name="nombres-pr1" required>
                                </div>
                            </div>
                            <div class="col-12 col-md-6">
                                <div class="input-group-label">
                                    Segundo Nombre
                                </div>
                                <div class="input-group mb-3">
                                    <input placeholder="Ej. Carlos Antonio" type="text" class="form-control" name="nombres-pr2" >
                                </div>
                            </div>

                            <div class="col-12 col-md-6">
                                <div class="input-group-label">
                                    Primer Apellidos
                                </div>
                                <div class="input-group mb-3">
                                    <input placeholder="Ej. Pérez Fernández" type="text" class="form-control" name="apellido-pr1" required>
                                </div>
                            </div>

                            <div class="col-12 col-md-6">
                                <div class="input-group-label">
                                    Segundo Apellido
                                </div>
                                <div class="input-group mb-3">
                                    <input placeholder="Ej. Pérez Fernández" type="text" class="form-control" name="apellido-pr2" >
                                </div>
                            </div>

                            <div class="col-12 col-md-6">
                                <div class="input-group-label">
                                    Correo Personal
                                </div>
                                <div class="input-group mb-3">
                                    <input type="email" placeholder="Ej. usuario@gmail.com" class="form-control" name="email-pr">
                                </div>
                            </div>

                            <div class="col-12 col-md-6">
                                <div class="input-group-label">
                                    Teléfono Personal
                                </div>
                                <div class="input-group mb-3">
                                    <input type="tel" placeholder="Ej. 4xx-5551234" class="form-control" name="tlf-pr">
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="island" id="rrss">
                        <h4>Presencia On-Line</h4>
                        <div class="row gx-2">
                            <div class="col-12">
                                <div class="input-group-label">
                                    Página Web
                                </div>
                                <div class="input-group mb-3">
                                    <input type="url" placeholder="http://" class="form-control" name="website">
                                </div>
                            </div>
                            <div class="col-12">
                                <div class="input-group-label">
                                    Instagram
                                </div>
                                <div class="input-group mb-3">
                                    <input type="text" placeholder="@" class="form-control" name="instagram">
                                </div>
                            </div>
                            <div class="col-12">
                                <div class="input-group-label">
                                    Facebook
                                </div>
                                <div class="input-group mb-3">
                                    <input type="text" placeholder="" class="form-control" name="facebook">
                                </div>
                            </div>
                            <div class="col-12">
                                <div class="input-group-label">
                                    Twitter
                                </div>
                                <div class="input-group mb-3">
                                    <input type="text" placeholder="@" class="form-control" name="twitter">
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="island" id="xitypay">
                        <h4>Información para el registro de XityPay</h4>
                        <div class="row gx-2">
                            <div class="col-12">
                                <div class="input-group-label">
                                    Descripción *
                                </div>
                                <div class="input-group mb-3">
                                    <input placeholder="Descripción del receptor del pago" type="text" class="form-control" name="xp-desc" required>
                                </div>
                            </div>


                            <div class="col-4 col-md-2">
                                <div class="input-group-label">
                                    Tipo de Doc *
                                </div>
                                <div class="input-group mb-3">
                                    <select class="form-select" name="tipnip-xp" required>
                                        <option value="J">Jurídico</option>
                                        <option value="V">Venezolano</option>
                                        <option value="E">Extranjero</option>
                                        <option value="P">Pasaporte</option>
                                    </select>
                                </div>
                            </div>

                            <div class="col-8 col-md-3">
                                <div class="input-group-label">
                                    Número de doc *
                                </div>
                                <div class="input-group mb-3">
                                    <input placeholder="12345678" inputmode="numeric" type="text" class="form-control" id="codnip-xp" name="codnip-xp" required>
                                </div>
                            </div>
                            <div class="col-12 col-md-2">
                                <div class="input-group-label">
                                    Banco *
                                </div>
                                <div class="input-group mb-3">
                                    <select name="xp-banco" id="xp-banco" class="form-select" oninput="selectBanco()">
                                        <?php foreach(BANCOS as $banco):?>
                                            <?= $banco ?>
                                            <?php if (!$banco['visible_general']) continue?>
                                            <option value="<?=$banco['cod']?>"><?=str_replace('- ', '', $banco['nombre'])?></option>
                                        <?php endforeach?>
                                    </select>
                                </div>
                            </div>
                            <div class="col-12 col-md-5">
                                <div class="input-group-label">
                                    Número de Cuenta *
                                </div>
                                <div class="input-group mb-3">
                                    <input placeholder="Número de cuenta de 20 dígitos" inputmode="numeric" type="text" class="form-control" id="cuentanumero" name="xp-cuentanumero" minlength="20" maxlength="20" required>
                                </div>
                            </div>

                        </div>

                        <h5>Información registrada en la entidad bancaria</h5>
                        <div class="row gx-2">

                            <div class="col-12 col-md-4">
                                <div class="input-group-label">
                                    Código de país *
                                </div>
                                <div class="input-group mb-3">
                                    <select name="xp-pais" id="xp-pais" class="form-select">
                                    </select>
                                </div>
                            </div>

                            <div class="col-12 col-md-4">
                                <div class="input-group-label">
                                    Número telefónico *
                                </div>
                                <div class="input-group mb-3">
                                    <input type="tel" placeholder="Ej. 4xx-5551234" class="form-control" name="xp-telefono" id="xp-telefono" required>
                                </div>
                            </div>

                            <div class="col-12 col-md-4">
                                <div class="input-group-label">
                                    Email *
                                </div>
                                <div class="input-group mb-3">
                                    <input type="email" placeholder="Ej. usuario@gmail.com" class="form-control" name="xp-email" id="xp-email" required>
                                </div>
                            </div>
                        </div>
                    </div>

                    <button class="btn-registro" type="submit">Registrarse</button>

                </form>
            </div>
        </div>
    </div>
</body>
<script>
    document.addEventListener('DOMContentLoaded', function() {
        const queryString = new URLSearchParams(window.location.search);
        loadAliado(queryString.get('id'));

    })
</script>
</html>