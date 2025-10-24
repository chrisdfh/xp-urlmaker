document.addEventListener('DOMContentLoaded', function() {

    const buttons = document.querySelectorAll('input[name="formaenvio"]')
    const selectFormaEnvio = document.querySelector('#selectFormaEnvio')

    buttons.forEach((button)=>{
        button.checked = false
        selectFormaEnvio.setAttribute('disabled', 'disabled')
    })

    buttons.forEach((button)=>{
        button.addEventListener('click', ()=>{
            document.querySelector('button#selectFormaEnvio').removeAttribute('disabled')
        })
    })

    selectFormaEnvio.addEventListener('click', ()=>{
        const formaEnvio = document.querySelector('input[name="formaenvio"]:checked').value
        switch(formaEnvio){
            case 'individual':
                window.location.href = './pagos/transferencia.html'
                break
            case 'lote':
                window.location.href = './pagos/enviolote.html'
                break
            case 'recibida':
                window.location.href = './pagos/operaciones-recientes.html'
                break
            case 'pago-directo':
                showDialog('showLinkDirecto',true)    
                break
            case 'otro':
                showQrPage(md5(xpaycta),nropersona)
                break
        }
    })

    

    // loadQr(256,parseInt(nropersona),xpayctanro,'qrcode')
})

function normalizeInputValue(s){
    const element = document.getElementById(s.id)
    element.value = element.value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/['".$%&*!@+=`:;^#]+/g, '');
}
async function loadQr(size = 256,nropersona,hash_ctanro,id){

    const url = 'https://www.xitypay.com/api/qr/1'

    const data = {
        size,
        url_logo: "https://mmedia.misrevistas.com/XTC/archivos/assets/xpay-icon-wbg.png",
        url_dom_xitypay: "https://www.xitypay.com",
        nropersona,
        hash_ctanro,
        solid_logo: false
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
    const response = await fetch(url,fetchOptions)
    const blob = await response.blob()
    document.getElementById(id).src = URL.createObjectURL(blob)
    
}

function copyValue(id,alertId){
    if (document.getElementById(id).value.trim() == "") return
    //copy to clipboard
    navigator.clipboard.writeText(document.getElementById(id).value)
    document.getElementById(alertId).classList.remove('d-none')
    
}


