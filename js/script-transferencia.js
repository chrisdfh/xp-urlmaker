document.addEventListener('DOMContentLoaded', function() {
    const tiempoVigencia = document.querySelector('input[name="vigencia"]')
    tiempoVigencia.value = vigencia
    setVigencia()


    const especificarMonto = document.querySelectorAll('input#lleva_monto')
    especificarMonto.forEach((radio)=>{
        radio.addEventListener('change', (e)=>{
            setMontoRadio(e)
        })
    })
    const abiertoCheck = document.querySelector('input#abiertocheck')
    abiertoCheck.addEventListener('change', (e)=>{
        setMontoRadio(e)
    })

    const tipoMoneda = document.querySelectorAll('input[name="moneda"]')
    tipoMoneda.forEach((e)=>{
        e.addEventListener('change', (e)=>{
            setMoneda(e)
        })
    })

    const inputMontoNumber = document.querySelector('input#monto')
    inputMontoNumber.addEventListener('keyup', (e)=>{
        inputMonto(e)
    })

    tiempoVigencia.addEventListener('change', (e)=>{
        setVigencia()
    })
    tiempoVigencia.addEventListener('keyup', (e)=>{
        setVigencia()
    })
})

let rate
let currency
function setDefaults(args){
    rate = args.r

    currency = 'ves'
    document.querySelector('input#lleva_monto').checked = true
    document.querySelector('input#vef').checked = true
    document.querySelector('input#abiertocheck').checked = false

    // document.querySelectorAll('input[type="text"]').forEach((input)=>{
    document.querySelectorAll('input.form-control').forEach((input)=>{
        if (!input.classList.contains('nc')){
            input.value = ''
        }
    })
    //document.querySelector('textarea').value = '' //LIMPIA EL VALOR EN EL TEXTAREA
    document.querySelector('input[name="fchemision"]').value = fechaParaDateTimeLocal(new Date()) 
    document.querySelector('button#enviarLote').disabled = true

    document.querySelector('#referencia').value=Date.now()
}

function setVigencia(){
    document.querySelector('input[name="fchemision"]').value = fechaParaDateTimeLocal(new Date()) 
    const fechaInicial = document.querySelector('input[name="fchemision"]').value
    const tiempoVigencia = document.querySelector('input[name="vigencia"]').value
    const fechaCaducidad = document.querySelector('input[name="fchcaducidad"]')

    if (isNaN(tiempoVigencia) || tiempoVigencia == 0 || tiempoVigencia.trim() == ''){
        return false
    }

    fechaCaducidad.value = fechaParaDateTimeLocal(new Date(fechaInicial),tiempoVigencia,'m')
}

function setMontoRadio(el){
    const especificarMonto = document.querySelectorAll('input#lleva_monto')
    const abiertoCheck = document.querySelector('input#abiertocheck')
    const montoInput = document.querySelector('input#monto')
    const btnEnviar = document.querySelector('button#enviarLote')
    document.querySelector('#enviarLote span').innerText=''
    montoInput.value = ''

    if (abiertoCheck.checked){
        btnEnviar.removeAttribute('disabled')
    }

    let valorEspecificaMonto

    especificarMonto.forEach((monto)=>{
        // console.log(monto)
        if (monto.checked){
            valorEspecificaMonto = monto.value
        }
    })

    montoInput.setAttribute('disabled', 'true')
    if (valorEspecificaMonto == "on"){
        montoInput.removeAttribute('disabled')
        btnEnviar.disabled = true
    } else if (valorEspecificaMonto == "off" || valorEspecificaMonto == undefined){
        abiertoCheck.checked = true
        btnEnviar.removeAttribute('disabled')
        montoInput.setAttribute('disabled', 'true')
    }
}



function normalizeInputValue(s){
    const element = document.getElementById(s.id)
    element.value = element.value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/['".$%&*!@+=`:;^#]+/g, '');
}

function setMoneda(e){

    const montoAbiertoCheck = document.querySelector('input#abiertocheck').checked
    const montoInputCheck = document.querySelector('input#lleva_monto').checked
    const txtPlaceholder = document.querySelector('.tasa-del-dia')
    const inputMonto = document.querySelector('input#monto')
    const btnEnviar = document.querySelector('button#enviarLote')
    inputMonto.value=''
    if (e.target.dataset.value == 'usd'){
        currency = 'usd'
        txtPlaceholder.classList.remove('d-none')
    } else {
        currency = 'ves'
        txtPlaceholder.classList.add('d-none')
    }
    if (montoAbiertoCheck && !montoInputCheck){
        btnEnviar.removeAttribute('disabled')
    } else {
        btnEnviar.disabled = true
    }
    document.querySelector('#enviarLote span').innerText=''




    /**
     * 
    const montoAbiertoCheck = document.querySelector('input#abiertocheck').checked
    const montoInputCheck = document.querySelector('input#lleva_monto').checked
    const txtPlaceholder = document.querySelector('.tasa-del-dia')
    const inputMonto = document.querySelector('input#monto')
    const btnEnviar = document.querySelector('button#enviarLote')
    inputMonto.value=''
    if (e.target.dataset.value == 'usd'){
        currency = 'usd'
        txtPlaceholder.classList.remove('d-none')
    } else {
        currency = 'ves'
        txtPlaceholder.classList.add('d-none')
    }
    if (montoAbiertoCheck && !montoInputCheck){
        btnEnviar.removeAttribute('disabled')
    } else {
        btnEnviar.disabled = true
    }
    document.querySelector('#enviarLote span').innerText=''
     */
}

function inputMonto(e){
    const btnEnviar = document.querySelector('button#enviarLote')
    const envioMontoPlaceHolder = document.querySelector('#enviarLote span')
    
    if (e.target.value.trim() == '') {
        // LIMPIAR TODO LO QUE HAY EN EL INPUT
        btnEnviar.disabled = true
        envioMontoPlaceHolder.innerText = ''
        return
    }

    if (isNaN(e.target.value)){
        btnEnviar.disabled = true
        envioMontoPlaceHolder.innerText = ''
        return
    }
    btnEnviar.disabled = false


    let localRate = 1
    const moneda = 'Bs. '
    if (currency == 'usd'){
        localRate = rate
    }

    const montoTotal = parseFloat(e.target.value * localRate).toLocaleString('es-VE', { maximumFractionDigits: 2,minimumFractionDigits: 2 })

    envioMontoPlaceHolder.innerText = `${moneda} ${montoTotal}`
}




function regTransferencia(form){
    // console.log(formToJson(form))
    window.location.href="./pagos/solicitudenviada.html"
}

function formToJson(form){
    const formData = new FormData(form)
    const obj = {}
    formData.forEach((value, key)=>{
        obj[key] = value
    })
    return obj
}

function setMontoRate(ev){
    if (ev.value.trim().length == 0) return
    const monto = document.querySelector('input#monto-final')
    if (currency == 'ves'){
        monto.value =  ev.value
    } else if (currency == 'usd'){
        monto.value =  parseFloat(ev.value) * parseFloat(rate)
    }
}


function fechaParaDateTimeLocal(date,offset,units){
    if (!offset) offset = 0
    if (!units) units = 'ms'

    if (units == 'd') offset = offset * 86400000
    if (units == 'h') offset = offset * 3600000
    if (units == 'm') offset = offset * 60000
    if (units == 's') offset = offset * 1000
    if (units == 'ms') offset = offset * 1

    return new Date((date.getTime()+offset) + new Date().getTimezoneOffset() * -60 * 1000).toISOString().slice(0, 16)
} 