"use strict";
const itemsContainer = document.querySelectorAll('.items-container');
let actualcontainer, actualBtn, actualUl, actualForm, actualTextInput, actualValidation;
//Ajoute un listener sur chaque container de la div ppale
itemsContainer.forEach((container) => {
    addContainerListeners(container);
});
function addContainerListeners(currentContainer) {
    // 1 . Selection des elements
    const currentContainerDeletionBtn = currentContainer.querySelector('.delete-container-btn');
    const currentAddItemBtn = currentContainer.querySelector('.add-item-btn');
    const currentCloseFormBtn = currentContainer.querySelector('.close-form-btn');
    const currentForm = currentContainer.querySelector('form');
    //2. Appel de fn pour ajout des Eventlistener
    deleteBtnListeners(currentContainerDeletionBtn);
    addItemBtnListener(currentAddItemBtn);
    closingFormBtnListeners(currentCloseFormBtn);
    addFormSubmitListeners(currentForm);
}
//3. def Eventlistener
function deleteBtnListeners(btn) {
    btn.addEventListener('click', handleContainerDeletion);
}
function addItemBtnListener(btn) {
    btn.addEventListener('click', handleAddItem);
}
function closingFormBtnListeners(btn) {
    btn.addEventListener('click', () => toggleForm(actualBtn, actualForm, false));
}
function addFormSubmitListeners(form) {
    form.addEventListener('submit', createNewItem);
}
//4. call back du listener
function handleContainerDeletion(e) {
    const btn = e.target;
    const btnsArray = [
        ...document.querySelectorAll('.delete-container-btn'),
    ];
    const containers = [
        ...document.querySelectorAll('.items-container'),
    ];
    containers[btnsArray.indexOf(btn)].remove();
}
function handleAddItem(e) {
    const btn = e.target;
    if (actualcontainer)
        toggleForm(actualBtn, actualForm, false);
    setcontainerItem(btn);
    toggleForm(actualBtn, actualForm, true);
}
function toggleForm(btn, form, action) {
    if (!action) {
        form.style.display = 'none';
        btn.style.display = 'block';
    }
    else if (action) {
        form.style.display = 'block';
        btn.style.display = 'none';
    }
}
function setcontainerItem(btn) {
    actualBtn = btn;
    actualcontainer = btn.parentElement;
    actualUl = actualcontainer.querySelector('ul');
    actualForm = actualcontainer.querySelector('form');
    actualTextInput = actualcontainer.querySelector('input');
    actualValidation = actualcontainer.querySelector('.validation-msg');
}
function createNewItem(e) {
    e.preventDefault();
    //validation
    if (actualTextInput.value.length === 0) {
        actualValidation.textContent = 'Must be at least 1 character long ';
        return; // stop l'execution de la fn
    }
    else {
        actualValidation.textContent = '';
    }
    //creation item
    const itemContent = actualTextInput.value;
    const li = `<li class='item' draggable = true> <p>${itemContent}</p><button>`;
}
