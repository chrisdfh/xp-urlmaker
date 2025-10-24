

function defaults(p,c,pId,gfs,mb){
    resetInputs()
    blockInputs(false)
    document.querySelector('#guardar-datos-check').checked=true
    document.querySelector('#aceptar-terminos-check').checked=true
    setPago(p)
    readLS()
    xpaycta = c
    pid=pId
    const regexNumber = /^[0-9]+$/

    gf=false
    if(gfs=='S'){
        gf = true
    }
    
    mbs = mb?mb:false
    
    document.querySelector('#codnip').addEventListener('keyup',errorInput)

    document.querySelector('#celnum').addEventListener('keyup',errorInput)

    checkInputs()
}
let xpaycta
let gf
let mbs


function errorInput(e){
    const regexNumber = /^[0-9]+$/
    console.log(e.target.value.trim() ==='')
    if (e.target.value.trim()==='' || !(!regexNumber.test(e.target.value) || e.target.value.slice(-1) == '.')){
        e.target.classList.toggle('is-invalid',false)
        document.querySelector(`#e-${e.target.id}`).classList.toggle('d-none',true)
    } else {
        e.target.classList.toggle('is-invalid',true)
        document.querySelector(`#e-${e.target.id}`).classList.toggle('d-none',false)
    }
}

function readLS(){
    const ls = localStorage.getItem("pagoData")
    if (ls){
        const data = JSON.parse(ls)
        document.querySelector('select#tipnip').value = data.tip
        document.querySelector('input#codnip').value = data.nip
        document.querySelector('select#bancocod').value = data.banco
        document.querySelector('select#celcod').value = data.cod_cel
        document.querySelector('input#celnum').value = data.num_cel
        document.querySelector('input#email').value = data.email
    }
}

function showPage(e, id){
    const el = document.getElementById(id);
    const pages = document.querySelectorAll(".page")
    const btnPages = document.querySelectorAll(".btn-page")
    //document.querySelector("#seccion-principal").scrollIntoView({top: 0, left: 0, behavior: 'smooth'});


    btnPages.forEach((btn)=>{btn.classList.remove("active")})
    pages.forEach((page)=>{page.classList.add("d-none")})
    el.classList.remove("d-none")

    e.classList.add("active")
    resetInputs()
}

function resetInputs(){
    const inputs = document.querySelectorAll("input")
    inputs.forEach((input)=>{
        if (input.classList.contains('nc')) return
        input.value = ""
    })

    document.querySelector(".boton-continuar").disabled = true
    document.querySelector("select#bancocod").value = ""
    document.querySelector("select#celcod").value = ""
}

function JSONfromForm(form){
    const data = new FormData(form)
    const obj = {}
    data.forEach((value, key)=>{
        obj[key] = value
    })

    return obj
}



function checkInputs(){
    const selectedOption = document.querySelector(".btn-page.active")
    const btnConfirmar = document.querySelector(".boton-continuar")
    if (selectedOption.id !== "btn-select-ti") return
    const emailRegex = /^$|^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


    // IF TRANSFERENCIA INSTANTANEA
    if(selectedOption.id === "btn-select-ti"){

        btnConfirmar.disabled = true
        const cedula = document.querySelector("input#codnip").value
        const banco = document.querySelector("select#bancocod").value
        const celCod = document.querySelector("select#celcod").value
        const celNum = document.querySelector("input#celnum").value
        const email = document.querySelector("input#email").value
        const numberMatch = /^[0-9]+$/

        if (cedula === "" || banco === "" || cedula.length < 6) {
            btnConfirmar.disabled = true
            return
        }

        if (celCod === "") {
            btnConfirmar.disabled = true
            return
        }
        if (!document.querySelector("#aceptar-terminos-check").checked){
            btnConfirmar.disabled = true
            return
        }

        if (!(numberMatch.test(cedula) && numberMatch.test(celNum))){
            btnConfirmar.disabled = true
            return;
        }

        if (!emailRegex.test(email.trim())) {
            btnConfirmar.disabled = true
            return
        }

        btnConfirmar.removeAttribute("disabled")
    }

}

let pp
function setPago(p){
    pp = p
    const montoPagar = document.querySelector(".monto-pagar span")
    const montoPagarEditable = document.querySelector(".monto-pagar-editable")
    if(montoPagar){
        montoPagar.innerText = parseFloat(p).toLocaleString('es-VE', { maximumFractionDigits: 2,minimumFractionDigits: 2 })
    }
    if(montoPagarEditable){
        montoPagarEditable.value = p
    }
    // document.querySelector('#cont-monto').innerText = parseFloat(p).toLocaleString('es-VE', { maximumFractionDigits: 2,minimumFractionDigits: 2 })
}



function normalizeInputValue(s){
    const element = document.getElementById(s.id)
    element.value = element.value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/['".$%&*!@+=`:;^#]+/g, '');
}
async function confirmarPago(){

    if(gf){
        const tieneDatosFactura = checkFactData()
        if (!tieneDatosFactura){
            datosFactura()
            return;
        }
    }

    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const email = document.querySelector("input#email").value
    const btn = document.querySelector('#btn-cont-btn')
    const btnSpinner = document.querySelector('#conf-spinner')
    if (email.trim() !== "") {
        if (!emailRegex.test(email.trim())) {
            alert ("Ingrese un correo valido")
            return
        }
    }
    if (!document.querySelector("#aceptar-terminos-check").checked){
        alert ('Debe aceptar los terminos y condiciones')
        return
    }

    const data = {
        tip: document.querySelector("select#tipnip").value,
        nip: document.querySelector("input#codnip").value,
        cod_bank: document.querySelector("select#bancocod").value,
        cel_num: document.querySelector("select#celcod").value.toString() + document.querySelector("input#celnum").value.toString(),
        monto: document.querySelector("#monto-pagar-editable").value,
        moneda: document.querySelector("#moneda").value,
        nropersona: document.querySelector("#npers").value,
        xpaycta: xpaycta
    }

    const url = '/php/OTP2.php'
    // const url = ''
    const fetchOptions = {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    }

    btn.setAttribute('disabled',true)
    btnSpinner.classList.remove('d-none')
    
    const response = await fetch(url,fetchOptions)
    if (response.ok){
    // if (true){
        document.querySelector("#otp-dialog").showModal()

        const bancoSelect = document.querySelector("select#bancocod")
        if (mbs){
            document.getElementById("otp-monto").innerText = 'Bs. ' + parseFloat(mbs).toLocaleString('es-VE', { maximumFractionDigits: 2,minimumFractionDigits: 2 })
        } else {
            document.getElementById("otp-monto").innerText = document.querySelector("#moneda-editable span").innerText +" "+parseFloat(document.querySelector("#monto-pagar-editable").value).toLocaleString('es-VE', { maximumFractionDigits: 2,minimumFractionDigits: 2 })
        }
        document.getElementById("otp-cedula").innerText = document.querySelector("select#tipnip").value +"-" +  document.querySelector("input#codnip").value
        document.getElementById("otp-tlf").innerText = document.querySelector("select#celcod").value +"-" +  document.querySelector("input#celnum").value
        document.getElementById('otp-banco').innerText = bancoSelect.options[bancoSelect.selectedIndex].innerText
        document.getElementById('otp-correo').innerText = document.querySelector("input#email").value

        //OBLIGO A TENER EL FOCUS EN EL ELEMENTO DE INPUT Y MUESTRO TECLADO NUMERICO
        setTimeout(() => {
            document.querySelector('#otp').focus()
        },200)
        const timerPlaceholder = document.getElementById("otp-timer")
        let objContador = null
        let maxTime = 120
        timerPlaceholder.innerText = String(~~(maxTime/60)).padStart(2,'0')+':'+String(maxTime%60).padStart(2,'0')
        var contador = function (){
            if (maxTime > 0){
                maxTime--
                timerPlaceholder.innerText = String(~~(maxTime/60)).padStart(2,'0')+':'+String(maxTime%60).padStart(2,'0')
            } else {
                clearInterval(objContador)
                if (document.querySelector("#otp-dialog").open){
                    if(document.querySelector("#otp-dialog").classList.contains('pago-dialog')){
                        document.querySelector("#otp-dialog").close()
                        return
                    }
                    closeDialog(document.querySelector("#otp-dialog"))
                    btn.removeAttribute('disabled')
                    btnSpinner.classList.add('d-none')
                }
            }
        }
        objContador = setInterval(contador,1000)
        document.querySelector("#otp-dialog").showModal()
    } else {
        alertBs('Hubo un error en la solicitud del OTP')
        btn.removeAttribute('disabled')
        btnSpinner.classList.add('d-none')
    }


    // const respJson = await response.json()
    // console.log(respJson)




}

function ingresaOTP(e){
    const otp = e.querySelector('input#otp').value
    if (otp === "" || otp.length < 2) {
        alert ("Ingrese el OTP")
        return
    }
    document.querySelector("#otp-dialog").close()
    startSend()
    blockInputs(true)
}

function blockInputs(b){
    const inputs = document.querySelectorAll("input")
    inputs.forEach((input)=>{
        input.disabled = b
    })
    const selects = document.querySelectorAll("select")
    selects.forEach((select)=>{
        select.disabled = b
    })
}

function startSend(){
    const  btnPages = document.querySelectorAll(".btn-page")
    const monto = parseFloat(document.querySelector('#payment-amount').innerText)
    const icon = document.createElement("i")
    document.querySelector(".boton-continuar").remove()
    const btn = document.createElement("button")
    btn.classList.add("boton-continuar")
    // btn.innerText = "Enviar Bs. "+ monto.toLocaleString('es-VE', { maximumFractionDigits: 2,minimumFractionDigits: 2 })
    btn.innerText = 'CONFIRMAR Y ENVIAR PAGO'
    btn.addEventListener("click", sendPago)

    // icon.classList.add("fa")
    // icon.classList.add("fa-paper-plane")
    // icon.classList.add("ms-2")
    // btn.appendChild(icon)

    document.querySelector("#btn-cont").appendChild(btn)
    btnPages.forEach((btn)=>{
        btn.disabled = true
    })
}
let pid
function sendPago(){
    const monto = parseFloat(document.querySelector('#monto-pagar-editable').value)
    if (isNaN(monto) || monto <=0){
        alertBs("Ingrese un monto a pagar")
        return
    }
    const tipNip  = document.querySelector("select#tipnip").value
    const codNip  = document.querySelector("input#codnip").value
    const banco = document.querySelector("select#bancocod")
    const codCel = document.querySelector("select#celcod").value
    const numCel = document.querySelector("input#celnum").value
    const otp = document.querySelector("input#otp").value
    const email = document.querySelector("input#email").value
    const monedaInput = document.querySelector("input#moneda").value

    if (otp === "" || otp.length < 4) {
        alert ("Ingrese el OTP")
        return
    }
    // alert ('Se enviará Bs. '+ monto + ' por ' + document.querySelector("select#bancocod").value + " EN ESTE PASO SE ENVÍA EL PAYLOAD A SYSPAY")

    if (document.querySelector("#guardar-datos-check").checked){
        const data = {
            tip: tipNip,
            nip: codNip,
            cod_cel: codCel,
            num_cel: numCel,
            banco: banco.selectedOptions[0].value,
            email: document.querySelector("input#email").value
        }
        localStorage.setItem("pagoData", JSON.stringify(data))
    } else {
        localStorage.removeItem("pagoData")
    }



    const btnSendOtp = document.querySelector('#btn-send-otp-dialog')
    btnSendOtp.setAttribute('disabled',true)

    const form = document.createElement("form")
    form.setAttribute("method", "POST")
    form.setAttribute("action", "/pagos/action-pago-li.html")

    const inNacCedula = document.createElement("input")
    inNacCedula.setAttribute("name", "nac")
    inNacCedula.value = tipNip
    form.appendChild(inNacCedula)

    const inCedula = document.createElement("input")
    inCedula.setAttribute("name", "ced")
    inCedula.value = codNip
    form.appendChild(inCedula)

    const inMonto = document.createElement("input")
    inMonto.setAttribute("name", "ppc")
    inMonto.value = monto
    form.appendChild(inMonto)

    const inBancoCod= document.createElement("input")
    inBancoCod.setAttribute("name", "ban")
    inBancoCod.value = banco.selectedOptions[0].value
    form.appendChild(inBancoCod)

    const inBancoNom= document.createElement("input")
    inBancoNom.setAttribute("name", "ban_nombre")
    inBancoNom.value = banco.selectedOptions[0].text
    form.appendChild(inBancoNom)

    const inOTP= document.createElement("input")
    inOTP.setAttribute("name", "otp")
    inOTP.value = otp
    form.appendChild(inOTP)

    const inCelCod= document.createElement("input")
    inCelCod.setAttribute("name", "celcod")
    inCelCod.value = codCel
    form.appendChild(inCelCod)

    const inCelNum= document.createElement("input")
    inCelNum.setAttribute("name", "celnum")
    inCelNum.value = numCel
    form.appendChild(inCelNum)

    const inEmail= document.createElement("input")
    inEmail.setAttribute("name", "email")
    inEmail.value = email
    form.appendChild(inEmail)

    const pers_id= document.createElement("input")
    pers_id.setAttribute("name", "pid")
    pers_id.value = pid
    form.appendChild(pers_id)

    const linknro= document.createElement("input")
    linknro.setAttribute("name", "linknro")
    linknro.value = document.querySelector("input#linknro").value
    form.appendChild(linknro)

    const aliadoCod= document.createElement("input")
    aliadoCod.setAttribute("name", "xpnro")
    aliadoCod.value = xpaycta
    form.appendChild(aliadoCod)

    const moneda= document.createElement("input")
    moneda.setAttribute("name", "moneda")
    moneda.value = monedaInput
    form.appendChild(moneda)


    document.querySelector("#form-placeholder").appendChild(form)
    form.submit()

}
function sendPagoV2(){
    const monto = parseFloat(document.querySelector('#monto-pagar-editable').value)
    if (isNaN(monto) || monto <=0){
        alertBs("Ingrese un monto a pagar")
        return
    }
    const tipNip  = document.querySelector("select#tipnip").value
    const codNip  = document.querySelector("input#codnip").value
    const banco = document.querySelector("select#bancocod")
    const codCel = document.querySelector("select#celcod").value
    const numCel = document.querySelector("input#celnum").value
    const otp = document.querySelector("input#otp").value
    const email = document.querySelector("input#email").value

    if (otp === "" || otp.length < 4) {
        alert ("Ingrese el OTP")
        return
    }
    // alert ('Se enviará Bs. '+ monto + ' por ' + document.querySelector("select#bancocod").value + " EN ESTE PASO SE ENVÍA EL PAYLOAD A SYSPAY")

    if (document.querySelector("#guardar-datos-check").checked){
        const data = {
            tip: tipNip,
            nip: codNip,
            cod_cel: codCel,
            num_cel: numCel,
            banco: banco.selectedOptions[0].value,
            email: document.querySelector("input#email").value
        }
        localStorage.setItem("pagoData", JSON.stringify(data))
    } else {
        localStorage.removeItem("pagoData")
    }


    const form = document.createElement("form")
    form.setAttribute("method", "POST")
    form.setAttribute("action", "/pagos/action-pago-liv2.html")

    const inNacCedula = document.createElement("input")
    inNacCedula.setAttribute("name", "nac")
    inNacCedula.value = tipNip
    form.appendChild(inNacCedula)

    const inCedula = document.createElement("input")
    inCedula.setAttribute("name", "ced")
    inCedula.value = codNip
    form.appendChild(inCedula)

    const inMonto = document.createElement("input")
    inMonto.setAttribute("name", "ppc")
    inMonto.value = monto
    form.appendChild(inMonto)

    const inBancoCod= document.createElement("input")
    inBancoCod.setAttribute("name", "ban")
    inBancoCod.value = banco.selectedOptions[0].value
    form.appendChild(inBancoCod)

    const inBancoNom= document.createElement("input")
    inBancoNom.setAttribute("name", "ban_nombre")
    inBancoNom.value = banco.selectedOptions[0].text
    form.appendChild(inBancoNom)

    const inOTP= document.createElement("input")
    inOTP.setAttribute("name", "otp")
    inOTP.value = otp
    form.appendChild(inOTP)

    const inCelCod= document.createElement("input")
    inCelCod.setAttribute("name", "celcod")
    inCelCod.value = codCel
    form.appendChild(inCelCod)

    const inCelNum= document.createElement("input")
    inCelNum.setAttribute("name", "celnum")
    inCelNum.value = numCel
    form.appendChild(inCelNum)

    const inEmail= document.createElement("input")
    inEmail.setAttribute("name", "email")
    inEmail.value = email
    form.appendChild(inEmail)

    const pers_id= document.createElement("input")
    pers_id.setAttribute("name", "pid")
    pers_id.value = pid
    form.appendChild(pers_id)

    const linknro= document.createElement("input")
    linknro.setAttribute("name", "linknro")
    linknro.value = document.querySelector("input#linknro").value
    form.appendChild(linknro)

    const aliadoCod= document.createElement("input")
    aliadoCod.setAttribute("name", "xpnro")
    aliadoCod.value = xpaycta
    form.appendChild(aliadoCod)


    document.querySelector("#form-placeholder").appendChild(form)
    form.submit()

}

function datosFactura(){
    const dialog = document.querySelector("dialog#datos-facturacion")
    dialog.querySelector('form').reset()
    setTimeout(() => {
        document.querySelector('#datos-facturacion select#tipnip_factura').value = document.querySelector("select#tipnip").value
        document.querySelector('#datos-facturacion input#codnip_factura').value = document.querySelector("input#codnip").value
        document.querySelector('#datos-facturacion input#codnip_factura').focus()
    },200)
    dialog.showModal()
}

function dissmissDialog(e){
    const dialog = e.closest('dialog')
    document.getElementById('btn-cont-btn').removeAttribute('disabled')
    document.getElementById('conf-spinner').classList.add('d-none')
    dialog.close()
}

function regFactura(form){
    const factData = JSONfromForm(form)
    console.log(factData)

    document.querySelector("input#tn_fact").value = factData.tipnip_factura
    document.querySelector("input#cn_fact").value = factData.codnip_factura
    document.querySelector("input#nom_fact").value = factData.nombre_factura
    document.querySelector("input#dir_fact").value = factData.direccion_factura

    const dialog = form.closest('dialog')
    document.querySelector('#btn-fact').remove()
    dialog.close()
}

function editInput(id){
    const input = document.querySelector(`#${id}`)
    input.removeAttribute("readonly")
    input.focus()
}

function checkFactData(){
    const codnip= document.querySelector("input#cn_fact").value
    const nombre= document.querySelector("input#nom_fact").value
    if (codnip.trim().length > 0 && nombre.trim().length > 0){
        return true
    } else {
        return false
    }
}