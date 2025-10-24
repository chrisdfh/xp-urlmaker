async function getAliadoList(){
    const url = './php/aliadoslist.php'
    try {
        const res = await fetch(url);
        const data = await res.json();
        document.querySelector('table tbody').innerHTML = ''
        data.forEach((aliado)=>{
            addAliadoToList(aliado)
        })
        
    } catch (err) {
         console.error(err);
    }
}

function addAliadoToList(aliado){
    console.log(aliado.id)
    const tbody = document.querySelector('table tbody')
    const tr = document.createElement('tr')
    const tdFecha = document.createElement('td')
    const tdRif = document.createElement('td')
    const tdNc = document.createElement('td')
    const tdRs = document.createElement('td')
    
    const date = new Date(aliado.id*1000)
    const formattedDate = date.toLocaleDateString('es-VE', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        // hour: '2-digit',
        // minute: '2-digit',
    })
    tdFecha.innerText = formattedDate
    tr.appendChild(tdFecha)

    console.log(aliado)

    tdRif.innerText = aliado.persona.tipnip + '-' + aliado.persona.codnip
    tr.appendChild(tdRif)

    tdNc.innerText = aliado.persona.nombrecorto
    tr.appendChild(tdNc)

    tdRs.innerText = aliado.persona.nombrecompleto
    tr.appendChild(tdRs)

    tr.addEventListener('click', ()=>{
        goLoadAliado(aliado.id)
    })

    tbody.appendChild(tr)
}

function goLoadAliado(id){
    window.location.href = './consulta.php?id='+id
}

async function loadAliado(id){
    document.querySelector('button.btn-registro').remove()
    url = './php/loadaliado.php'
    
    const fetchOptions = {
        method: 'POST', // *GET, POST, PUT, DELETE
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify({id}), // body data type must match 'Content-Type' header
        headers: {
            'Content-Type': 'application/json' // application/x-www-form-urlencoded
        }
    }
    const response = await fetch(url,fetchOptions)
    if (response.status !== 200){
        alert('Error al cargar el registro')
        return
    }
    const respJson = await response.json()
    setAliado(respJson)
    
}

function setReadOnly(bool){
    bool = bool ? bool : true

    console.log('bool es '+bool)
    const form = document.querySelector('form')
    const inputs = form.querySelectorAll('input')
    const selects = form.querySelectorAll('select')

    inputs.forEach((input)=>{
        input.readOnly = bool
    })
    selects.forEach((select)=>{
        select.setAttribute("disabled", true)
    })


    if (!bool){
        selects.forEach((select)=>{
            select.removeAttribute("disabled")
        })
    }

}

function setAliado(aliado){
    console.log(aliado)
    // ISLA 1
    setValue('select','tipnip',aliado.persona.tipnip)
    setValue('input','codnip',aliado.persona.codnip)
    setValue('input','razonsocial',aliado.persona.nombrecorto)
    setValue('input','nombrecomercial',aliado.persona.nombrecompleto)
    setValue('select','actividad',aliado.persona.ocupactivcod)

    // ISLA 2
    setValue('input','email-contacto',aliado.persona.email1)
    setValue('input','tlf-contacto',aliado.telefonos[1].telefononumero)
    setValue('input','tlflocal-contacto',aliado.telefonos[1].telefononumero)
    setValue('input','dir-lin1',aliado.locales[0].dir_lin1)
    setValue('input','dir-lin2',aliado.locales[0].dir_lin2)
    setValue('input','dir-lin3',aliado.locales[0].dir_lin3)
    setValue('select','dir-estado',aliado.locales[0].dir_estado)
    selectZona()

    // ISLA 3
    setValue('select','tipnip-pr',aliado.personas_relacionadas[0].tipnip)
    setValue('input','codnip-pr',aliado.personas_relacionadas[0].codnip)
    setValue('input','email-pr',aliado.personas_relacionadas[0].email)
    setValue('input','tlf-pr',aliado.personas_relacionadas[0].telefono)
    setValue('input','nombres-pr1',aliado.personas_relacionadas[0].nombreprimero)
    setValue('input','nombres-pr2',aliado.personas_relacionadas[0].nombresegundo)
    setValue('input','apellido-pr1',aliado.personas_relacionadas[0].apellidoprimero)
    setValue('input','apellido-pr2',aliado.personas_relacionadas[0].apellidosegundo)

    // ISLA 4
    setValue('input','website',aliado.pagina_web)
    setValue('input','twitter',aliado.rs_twitter)
    setValue('input','facebook',aliado.rs_facebook)
    setValue('input','instagram',aliado.rs_instagram)


    // ISLA 5
    setValue('input','xp-desc',aliado.xitypay.mensaje_desc)
    setValue('select','xp-banco',aliado.xitypay.bancocod)
    setValue('input','xp-cuentanumero',aliado.xitypay.ctanro)
    setValue('input','xp-email',aliado.xitypay.email)
    setValue('select','xp-pais',aliado.xitypay.telfcodpais)
    setValue('input','xp-telefono',aliado.xitypay.telefono)
    setValue('select','tipnip-xp',aliado.xitypay.tipnip)
    setValue('input','codnip-xp',aliado.xitypay.codnip)

    setTimeout(() => {
        setValue('select','dir-localidad',aliado.locales[0].localidadcod)
        setReadOnly()
    },1500)

}

function setValue(element,name,value){
    try{
        document.querySelector(`${element}[name='${name}']`).value = value
    } catch (e) {
        console.log('elemento no encontrado')
        console.log(e)
        console.log('-----------------')
    }
}