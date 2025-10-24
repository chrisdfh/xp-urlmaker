document.addEventListener('DOMContentLoaded', function() {
    setDefaults()

    document.querySelector('input#archivo').addEventListener('change', (e)=>{
        if(e.target.files[0] === undefined) return
        document.querySelector('#programaLote').removeAttribute('disabled')
    })

    document.querySelector('button#programaLote').addEventListener('click', (e)=>{
        if (!document.querySelector('input#archivo').files[0]) return
        enviarLote()
    })
})

function setDefaults(args){
    document.querySelector('input[name="envio"]').value = new Date().toISOString().slice(0, 10)
    document.querySelector('input#archivo').value = ''
    document.querySelector('#programaLote').setAttribute('disabled', true)
    document.querySelector('#emitirfactura').checked = true
    document.querySelector('#llevamonto').checked = true
    document.querySelector('#montoabierto').checked = false
    document.querySelector('#vef').checked = true
    document.querySelector('#concepto').value = ''
}

async function enviarLote(){
    const ciaopr = '1'
    const formData = new FormData();
    formData.append('ciaopr', ciaopr)
    formData.append('xpayctanro', document.querySelector('input[name="xpayctanro"]').value)
    formData.append('fchemision', fixDate(document.querySelector('input[name="envio"]').value,'start'))
    formData.append('fchcaducidad', fixDate(document.querySelector('input[name="caducidad"]').value,'end'))
    formData.append('genera_factura', checkToSN('input#emitirfactura'))
    formData.append('lleva_monto', checkToSN('input#llevamonto'))
    formData.append('monto_modificable', checkToSN('input#montoabierto'))
    formData.append('caracter_separador', ',')
    formData.append('nrousuario', parseInt(document.querySelector('input#nrousuario').value)) 
    formData.append('nropersona', parseInt(document.querySelector('input#nropersona').value))
    formData.append('enviar_notificacion_email',document.querySelector('input#enviar_notificacion_email').checked)
    formData.append('enviar_notificacion_ws',document.querySelector('input#enviar_notificacion_ws').checked)
    formData.append('csv', document.querySelector('input#archivo').files[0])




    const url = 'https://www.xitypay.com/api/archivo_cobro/'+ciaopr

    const response = await fetch(url, {
        method: 'POST',
        body: formData
    })

    if (response.status !== 200){
        alert('Error al cargar el registro')
        return
    }
    if (response.ok){
        const respJson = await response.json()
        alert(`Archivo cargado con exito bajo el lote #${respJson.lotenro}`)
        console.log(respJson)
        window.location.href="/pagos/formaenvio.html"
    }

}

function normalizeInputValue(s){
    const element = document.getElementById(s.id)
    element.value = element.value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/['".$%&*!@+=`:;^#]+/g, '');
}
function checkToSN(selector){
    const check = document.querySelector(selector).checked
    if (check) return 'S'
    return 'N'
}

function fixDate(date, time){
    if (date){
        let setTime = date + "T00:00:00-04:00"
        if (time == 'end'){
            setTime = date + "T23:59:59-04:00"
        }
        return setTime;
    } else {
        return ''
    }
}