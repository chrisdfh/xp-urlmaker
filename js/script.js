let comision

function defaults(d){
    const {c,r} = d
    document.querySelector(".boton-continuar").disabled=true;
    document.querySelector("input#input-monto-propina").value=0
    document.querySelector('input#monto-base-propina').value=0.00
    comision = c
    rate = r
}
function toggleDialog(id){
    const el = document.getElementById(id);
    if(el.open){
        el.close()
    } else {
        document.querySelector('#form-propina input').value = 0
        el.showModal();
    }
}

// const dialog = document.querySelector("dialog");
// dialog.addEventListener("click", df)

// function df(e){
    // if (e.target == dialog) {
        // dialog.close();
    // }
// }

document.querySelector("#monto-base-propina").addEventListener('focus',(e)=>{
    e.target.select()
})

if (document.querySelector(".propina")){
    const btnPropina = document.querySelectorAll(".boton-propina.valor")
    btnPropina.forEach((btn)=>{
        btn.addEventListener("click", ()=>{
            setBtnPropina(btn)
        })
    })
}

if (document.querySelector("#base-propina")){
    const basePropina = document.querySelector("#base-propina")
    basePropina.addEventListener("input", ()=>{
        calcPropina()
    })
}

let rate
function setBtnPropina(el){

    document.querySelector("input#monto-base-propina").classList.add('v-hidden')
    document.querySelector("#monto-porcentaje-propina").classList.add('v-hidden')
    const btnContinuar = document.querySelector(".boton-continuar")
    const btnPropina = document.querySelectorAll(".boton-propina")
    const propinaPorCiento = document.querySelector('#form-propina input')
    btnContinuar.innerText = "Seleccione una opción"
    propinaPorCiento.value = ""


    btnContinuar.disabled = true
    btnPropina.forEach((btn)=>{
        if (el.id == btn.id){
            const boxShow = document.getElementById('monto-show-box')
            boxShow.innerText = btn.innerText
            btn.classList.add("active")
            // propinaPorCiento.value = parseInt(btn.querySelector('span').innerText)
            if (btn.id.split('-')[1] >= '6'){
                setPropina(parseInt(btn.querySelector('span').innerText.replace('.',''))*rate, false, btn.querySelector('span').innerText.replace('.',''))
            } else {
                setPropina(parseInt(btn.querySelector('span').innerText.replace('.','')), false, btn.querySelector('span').innerText.replace('.',''))
            }
            // document.querySelector('#valor_base').value = parseInt(btn.querySelector('span').innerText.replace('.',''))
            btnContinuar.removeAttribute("disabled")
        } else {
            btn.classList.remove("active")
        }
    })
}

function checkPropina(){
    console.log('check propina')
    const propinaPorCiento = document.querySelector('#form-propina input')
    if (propinaPorCiento.value > 0){
        document.querySelector(".boton-continuar").disabled = false
    } else {
        document.querySelector(".boton-continuar").disabled = true
    }
}


function paymentPage(){
    const form = document.querySelector("#form-propina")
    const propina = form.querySelector('input').value
    const msgError = document.querySelector(".text-danger.text-end.fs-6")
    if (msgError && !msgError.classList.contains('d-none')){
        alertBs('Solo ingrese letras y números')
        return
    }
    if (document.querySelector('input#concepto-base-propina')){
        form.querySelector('input#input-concepto-propina').value = document.querySelector('input#concepto-base-propina').value
    }
    if (document.querySelector('input#concepto-base-propina') && form.querySelector('#input-concepto-propina').value==''){
        alert ('Debe especificar un concepto')
        return;
    }

    if (propina != 0){
        form.submit()
    }
        
}


function toggleInputOtro(){
    const montoInput = document.querySelector("input#monto-base-propina")
    const montoPorcentInput = document.querySelector("#monto-porcentaje-propina")
    const btnOtro = document.querySelector("#prop-4")
    const currencyPlaceholder = document.querySelector("#other-currency")
    setBtnPropina(false)
    btnOtro.classList.add("active") 

    montoInput.value=""
    montoPorcentInput.value=""

    montoInput.classList.remove('v-hidden')
    currencyPlaceholder.classList.remove('v-hidden')
    
}
function toggleInputPercent(){
    const montoInput = document.querySelector("input#monto-base-propina")
    const montoPorcentInput = document.querySelector("#monto-porcentaje-propina")
    const btnOtro = document.querySelector("#prop-5")
    const currencyPlaceholder = document.querySelector("#other-currency")
    setBtnPropina(false)
    btnOtro.classList.add("active") 

    montoInput.value=""
    montoPorcentInput.value=""

    montoPorcentInput.classList.remove('v-hidden')
    montoInput.classList.remove('v-hidden')
    currencyPlaceholder.classList.remove('v-hidden')
}

function calcPropinaInput(e){
    if (typeof e != undefined  && e.key == 'Tab'){
        document.getElementById('concepto-base-propina').focus()
    }
    const montoInput = document.querySelector("input#monto-base-propina")
    const montoPorcentInput = document.querySelector("#monto-porcentaje-propina")
    const showBox = document.getElementById('monto-show-box')
    const isUsd = document.querySelector('#menu .bandera img.select-currency').dataset.currency=='usd'
    document.querySelector(".boton-continuar").disabled=true

    let monedaSign = 'Bs.'
    let calcRate = 1
    if (isUsd){
        calcRate = rate
        monedaSign = '$'
    }
    
    if (montoInput.value == "" ||
        montoInput.value == 0 ||
        isNaN(montoInput.value)
    ){
        showBox.innerText = `${monedaSign} 0.00`
        return
    }


   var monto = 0
    if (montoPorcentInput.classList.contains('v-hidden')){
        monto = parseFloat(montoInput.value).toFixed(2)
        setPropina(monto*calcRate, false, parseFloat(montoInput.value).toFixed(2))
        // document.querySelector('input#valor_base').value = parseFloat(montoInput.value).toFixed(2)
    } else {
        monto= (parseFloat(montoInput.value) * parseFloat(montoPorcentInput.value) / 100).toFixed(2)
        setPropina(monto*calcRate, false, parseFloat(montoInput.value).toFixed(2)* parseFloat(montoPorcentInput.value) / 100)   
        // document.querySelector('input#valor_base').value = (parseFloat(montoInput.value) * parseFloat(montoPorcentInput.value) / 100).toFixed(2)
    }
    if (!isNaN(monto)){
        document.getElementById('monto-show-box').innerText = `${monedaSign} ${monto}` 
    } else {
        document.getElementById('monto-show-box').innerText = `${monedaSign} 0.00`
    }

}
function normalizeInputValue(elInput){
    const element = document.getElementById(elInput.id)
    element.value = element.value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/['".$%&*!@+=`:;^#]+/g, '');

}
function setPropina(propina,b,raw){
    b=b?b:false
    const propinaPorCiento = document.querySelector('#form-propina input')
    const btnContinuar = document.querySelector(".boton-continuar")
    const pagoComision = document.querySelector("#pago-gastos-check").checked

    if (!b){
        if (pagoComision){
            propina = ((parseFloat(propina) * comision).toFixed(2))
        }
    }
    
    if (!isNaN(propina)){
        if (pagoComision){
            document.querySelector('#valor_base').value = parseFloat(raw)*comision
        } else {
            document.querySelector('#valor_base').value = parseFloat(raw)
        }
        propinaPorCiento.value = propina
        btnContinuar.innerText = "Confirmar Bs."+parseFloat(propina).toLocaleString('es-VE',{minimumFractionDigits:2})
        btnContinuar.removeAttribute("disabled")
    }
}

const pagoComision = document.querySelector("#pago-gastos-check")
pagoComision.addEventListener("change",setComision)
function setComision(e){
    const pago = document.querySelector("#input-monto-propina").value
    const valorBase = document.querySelector("#valor_base")

    if (pago == 0 || pago.trim() == ""){
        return  
    }

    if (e.target.checked){
        setPropina((parseFloat(pago) * comision).toFixed(2), true, parseFloat(valorBase.value))
    } else {
        setPropina((parseFloat(pago) / comision).toFixed(2),false, parseFloat(valorBase.value) / comision)
    }

}

function drawAmmounts(def1,def2,def3){
    const prop1 = document.querySelector("#prop-1 span")
    const prop2 = document.querySelector("#prop-2 span")
    const prop3 = document.querySelector("#prop-3 span")

    prop1.innerText = def1.toLocaleString('es-VE', {minimumFractionDigits: 0})
    prop2.innerText = def2.toLocaleString('es-VE', {minimumFractionDigits: 0})
    prop3.innerText = def3.toLocaleString('es-VE', {minimumFractionDigits: 0})
}


const monedasSelect = document.querySelectorAll(".currency-item")
monedasSelect.forEach((moneda)=>{
    moneda.addEventListener("click", (e)=>{
        const selectedLi = e.target.closest('li')
        const selectedCurrency = selectedLi.dataset.currency
        const btnContinuar = document.querySelector(".boton-continuar")
        const divTasa = document.querySelector(".tasa-del-dia")
        const currencyPlaceholder = document.getElementById("other-currency")
        const showBox = document.getElementById("monto-show-box")
        const montoBase = document.querySelector("input#monto-base-propina")

        if (selectedCurrency == "vef") {
            document.querySelectorAll('.valor-m1').forEach((e)=>{e.classList.toggle("d-none",false)})
            document.querySelectorAll('.valor-m2').forEach((e)=>{e.classList.toggle("d-none",true)})
        document.querySelector('input#moneda').value = 'VES'
            divTasa.classList.toggle("v-hidden",true)
            if(currencyPlaceholder) currencyPlaceholder.innerText = 'Bs.'
            showBox.innerText = 'Bs. 0.00'
        }
        if (selectedCurrency == "usd") {
            document.querySelectorAll('.valor-m2').forEach((e)=>{e.classList.toggle("d-none",false)})
            document.querySelectorAll('.valor-m1').forEach((e)=>{e.classList.toggle("d-none",true)})
            document.querySelector('input#moneda').value = 'USD'
            divTasa.classList.toggle("v-hidden",false)
            if(currencyPlaceholder) currencyPlaceholder.innerText = '$'
            showBox.innerText = '$ 0.00'
        }
        montoBase.value = ''
        montoBase.focus()
        const imgCurrency = selectedLi.querySelector('img').src
        document.querySelector('#menu .bandera img.select-currency').src = imgCurrency
        document.querySelector('#menu .bandera img.select-currency').dataset.currency = selectedCurrency
        btnContinuar.innerText = "Seleccione una opción"
        btnContinuar.disabled = true
        
    })
})