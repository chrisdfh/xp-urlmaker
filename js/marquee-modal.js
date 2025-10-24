document.addEventListener('DOMContentLoaded', function() {
    const modalParent = document.createElement('div')
    modalParent.classList.add('modal')
    modalParent.classList.add('fade')
    modalParent.tabIndex = -1
    modalParent.id = 'infoModal'
    modalParent.setAttribute('aria-labelledby', 'infoModalLabel')
    modalParent.setAttribute('aria-hidden', 'true')
    modalParent.innerHTML = `
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-body">
                <img id="modalImgElement" src="${modalImgXP}" alt="" onclick="clickBtn('closeInfoModalBtn')">
            </div>
            <button id="closeInfoModalBtn" type="button" class="d-none" data-bs-dismiss="modal" data-bs-target="#infoModal" aria-label="Close"></button>
        </div>
    </div>
    `
    document.body.appendChild(modalParent)

    const infoModalEl = document.querySelector('#infoModal')
    const infoModal = new bootstrap.Modal(infoModalEl)
    infoModal.show()
})


/**
 * Simulates a click event on a button element identified by its ID.
 *
 * @param {string} el - The ID of the button element to be clicked.
 */
function clickBtn(el){
    const btn = document.getElementById(el)
    btn.click()
}
