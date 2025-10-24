getPaisesTelCod()

async function regAliado(form){
    const data = await preparaJSON(form)
    console.log(data)

    saveAliado(data)
}


async function preparaJSON(form){
    const data = new FormData(form);
    const rawValue = await Object.fromEntries(data.entries());
    return prepareAliado(rawValue)
}

function getPaisesTelCod(){
    const xpPais = document.querySelector("select#xp-pais")
    const url = '/js/pais-cod-tel.json'
    const fetchOptions = {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer'
    }
    fetch(url,fetchOptions)
    .then((response) => response.json())
    .then((data) => {
        data.forEach((pais)=>{
            drawOption(xpPais,pais)
        })
    })
}

function drawOption(selectEl, data){
    const option = document.createElement("option")
    option.value = data.phone_code
    option.text = data.nombre + " (" + data.phone_code + ")"
    if (data.phone_code == 58) option.selected = true
    selectEl.appendChild(option)
}

function copyValue(id1, id2){
    if (document.getElementById(id1).value.trim() == "") return
    if (document.getElementById(id2).value.trim() != "") return
    document.getElementById(id2).value = document.getElementById(id1).value
}

async function selectZona(cod){
    document.querySelector("select#dir-localidad").innerHTML = ""
    document.querySelector("select#dir-localidad").setAttribute("disabled", "true")
    const estadoCod = cod? cod:document.querySelector("select#dir-estado").value
    const url = 'https://micropersona.xityclub.com/localidades/1?cant_registros=300&pagina=1'
    
    const data = {
        ciaopr:'1',
        campolocalidadayudabusq: "l.localidadnombre",
        localidadcod: `58-${estadoCod}`,
        nronivelcod:3,
        order_by: "l.localidadnombre asc",
        tipo:"P"
    }
    const fetchOptions = {
        method: 'POST', // *GET, POST, PUT, DELETE
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data), // body data type must match 'Content-Type' header
        headers: {
            'Content-Type': 'application/json' // application/x-www-form-urlencoded
        }
    }
    try{
        const response = await fetch(url,fetchOptions)
        const respJson = await response.json()
        drawOptionLocalidad(respJson)
    }catch(err){
        console.log(err)
    }
}

function drawOptionLocalidad (data) {
    const selectEl = document.querySelector("select#dir-localidad")
    selectEl.innerHTML = ""
    const options = data['results']

    options.forEach((opt)=>{
        const option = document.createElement("option")
        option.value = opt['localidadcod']
        option.text = opt['localidadnombre']
        selectEl.appendChild(option)
    })

    selectEl.removeAttribute('disabled')
}

function selectBanco(){
    const bancoCod = document.querySelector("select#xp-banco").value
    const inputCuenta = document.querySelector("input#cuentanumero")

    inputCuenta.value = bancoCod
    inputCuenta.focus()
}


function prepareAliado(data){
    const aliado = {
        ciaopr:'1',
        email_publico:data['xp-email'],
        pagina_web:data.website,
        rs_twitter:data.twitter,
        rs_facebook:data.facebook,
        rs_instagram:data.instagram,
        persona:{
            tipnip:data.tipnip,
            codnip:data.codnip,
            ocupactivcod:data.actividad,
            nombrecompleto:data.razonsocial,
            nombrecorto:data.nombrecomercial,
            email1:data['email-contacto'],
        },
        locales:[{
            dir_lin1:data['dir-lin1'],
            dir_lin2:data['dir-lin2'],
            dir_lin3:data['dir-lin3'],
            dir_estado:data['dir-estado'],
            localidadcod:data['dir-localidad'],
            telefonos:`${data['tlf-contacto']},${data['tlflocal-contacto']}`,
        }],
        telefonos:[{
            telefonotipcod:'PPL',
            telefonocodigopais:'+58',
            telefonocodigoarea:'',
            telefononumero:data['tlflocal-contacto'],
        },
        {
            telefonotipcod:'WSP',
            telefonocodigopais:'+58',
            telefonocodigoarea:'',
            telefononumero:data['tlf-contacto'],
        }],
        personas_relacionadas:[
            {
                tipnip:data['tipnip-pr'],
                codnip:data['codnip-pr'],
                nombreprimero:data['nombres-pr1'],
                nombresegundo:data['nombres-pr2'],
                apellidoprimero:data['apellido-pr1'],
                apellidosegundo:data['apellido-pr2'],
                // nombres:data['nombres-pr'],
                // apellidos:data['apellido-pr1'],
                email:data['email-pr'],
                telefono:data['tlf-pr'],
            }
        ],
        xitypay:{
            ctatipo:'CNTA',
            mensaje_desc:data['xp-desc'],
            bancocod:data['xp-banco'],
            ctanro:data['xp-cuentanumero'],
            email:data['xp-email'],
            telfcodpais:data['xp-pais'],
            telfcodarea:data['xp-tlfarea'],
            telefono:data['xp-telefono'],
            tipnip:data['tipnip-xp'],
            codnip:data['codnip-xp']
        }
        
    }

    console.log(aliado)

    return aliado
}



async function aliadoExist(){
    const url = '/php/aliadosexist.php'

    const _codnip = document.querySelector("input#codnip").value
    if(_codnip.trim()=='') return

    const codnip = {codnip:document.querySelector("input#codnip").value}

    const fetchOptions = {
        method: 'POST', // *GET, POST, PUT, DELETE
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(codnip), // body data type must match 'Content-Type' header
        headers: {
            'Content-Type': 'application/json' // application/x-www-form-urlencoded
        }
    }
    const response = await fetch(url,fetchOptions)
    const respJson = await response.json()
    if (respJson['status'] === 'new'){
        console.log('Nuevo Aliado')
        document.querySelector('.btn-registro').removeAttribute('disabled')
    } else {
        alert('El preregistro se encuentra en proceso, nos podremos en contacto al finalizar la revisión')
        document.querySelector('.btn-registro').setAttribute('disabled',true)
    }
    console.log(respJson)
    
}


async function saveAliado(aliado){
    const url = '/php/savealiado.php'

    const fetchOptions = {
        method: 'POST', // *GET, POST, PUT, DELETE
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(aliado), // body data type must match 'Content-Type' header
        headers: {
            'Content-Type': 'application/json' // application/x-www-form-urlencoded
        }
    }
    const response = await fetch(url,fetchOptions)
    const respJson = await response.json()
    if (respJson['status'] === 'ok'){
        alert('Registro guardado con exito')
        document.querySelector("form").reset()
        window.location.reload()
    } else {
        alert('Error al guardar el registro')
    }
    console.log(respJson)
}

selectZona()
