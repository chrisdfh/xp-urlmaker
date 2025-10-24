

function defaults(p,c,pId){
    resetInputs()
    blockInputs(false)
    document.querySelector('#guardar-datos-check').checked=true
    document.querySelector('#aceptar-terminos-check').checked=true
    setPago(p)
    readLS()
    xpaycta = c
    pid=pId
    const regexNumber = /^[0-9]+$/

    document.querySelector('#codnip').addEventListener('keyup',errorInput)

    document.querySelector('#celnum').addEventListener('keyup',errorInput)

    checkInputs()
}
let xpaycta


function normalizeInputValue(s){
    const element = document.getElementById(s.id)
    element.value = element.value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/['".$%&*!@+=`:;^#]+/g, '');
}
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
    const emailRegex = /^$|^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (selectedOption.id !== "btn-select-ti") return


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

        if (!emailRegex.test(email.trim())){
            btnConfirmar.disabled = true
            return
        }

        btnConfirmar.removeAttribute("disabled")
    }

}

let pp
function setPago(p){
    const montoPagar = document.querySelector(".monto-pagar span")
    montoPagar.innerText = parseFloat(p).toLocaleString('es-VE', { maximumFractionDigits: 2,minimumFractionDigits: 2 })
    // document.querySelector('#cont-monto').innerText = parseFloat(p).toLocaleString('es-VE', { maximumFractionDigits: 2,minimumFractionDigits: 2 })
    pp = p
}


async function confirmarPago(){
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
        // monto: pp,
        monto: document.querySelector("input#valor_base").value,
        moneda: document.querySelector("input#moneda").value || 'VES',
        nropersona: document.querySelector("#npers").value,
        xpaycta: xpaycta
    }

    const url = '/php/OTP2.php'
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
        document.querySelector("#otp-dialog").showModal()

        const bancoSelect = document.querySelector("select#bancocod")
        document.getElementById("otp-monto").innerText = 'Bs. '+parseFloat(pp).toLocaleString('es-VE', { maximumFractionDigits: 2,minimumFractionDigits: 2 })
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
                    btn.removeAttribute('disabled')
                    btnSpinner.classList.add('d-none')
                    closeDialog(document.querySelector("#otp-dialog"))
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
    const monto = parseFloat(document.querySelector('#valor_base').value)
    const tipNip  = document.querySelector("select#tipnip").value
    const codNip  = document.querySelector("input#codnip").value
    const banco = document.querySelector("select#bancocod")
    const codCel = document.querySelector("select#celcod").value
    const numCel = document.querySelector("input#celnum").value
    const otp = document.querySelector("input#otp").value
    const email = document.querySelector("input#email").value
    const concepto = document.querySelector("input#concepto").value
    const moneda = document.querySelector("input#moneda").value

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
    form.setAttribute("action", "./pagando")

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

    const inConcepto= document.createElement("input")
    inConcepto.setAttribute("name", "concepto")
    inConcepto.value = concepto
    form.appendChild(inConcepto)

    const inMoneda= document.createElement("input")
    inMoneda.setAttribute("name", "moneda")
    inMoneda.value = moneda
    form.appendChild(inMoneda)



    

    document.querySelector("#form-placeholder").appendChild(form)
    form.submit()

}

