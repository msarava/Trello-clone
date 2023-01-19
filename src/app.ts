const itemsContainer = document.querySelectorAll(
  '.items-container'
) as NodeListOf<HTMLDivElement>;

let actualcontainer: HTMLDivElement,
  actualBtn: HTMLButtonElement,
  actualUl: HTMLUListElement,
  actualForm: HTMLFormElement,
  actualTextInput: HTMLInputElement,
  actualValidation: HTMLSpanElement;

//Ajoute un listener sur chaque container de la div ppale
itemsContainer.forEach((container: HTMLDivElement) => {
  addContainerListeners(container);
});

function addContainerListeners(currentContainer: HTMLDivElement) {
  // 1 . Selection des elements
  const currentContainerDeletionBtn = currentContainer.querySelector(
    '.delete-container-btn'
  ) as HTMLButtonElement;
  const currentAddItemBtn = currentContainer.querySelector(
    '.add-item-btn'
  ) as HTMLButtonElement;

  const currentCloseFormBtn = currentContainer.querySelector(
    '.close-form-btn'
  ) as HTMLButtonElement;

  const currentForm = currentContainer.querySelector('form') as HTMLFormElement;

  //2. Appel de fn pour ajout des Eventlistener
  deleteBtnListeners(currentContainerDeletionBtn);
  addItemBtnListener(currentAddItemBtn);
  closingFormBtnListeners(currentCloseFormBtn);
  addFormSubmitListeners(currentForm);
}

//3. def Eventlistener
function deleteBtnListeners(btn: HTMLButtonElement) {
  btn.addEventListener('click', handleContainerDeletion);
}

function addItemBtnListener(btn: HTMLButtonElement) {
  btn.addEventListener('click', handleAddItem);
}

function closingFormBtnListeners(btn: HTMLButtonElement) {
  btn.addEventListener('click', () => toggleForm(actualBtn, actualForm, false));
}

function addFormSubmitListeners(form: HTMLFormElement) {
  form.addEventListener('submit', createNewItem);
}
//4. call back du listener
function handleContainerDeletion(e: MouseEvent) {
  const btn = e.target as HTMLButtonElement;

  const btnsArray = [
    ...document.querySelectorAll('.delete-container-btn'),
  ] as HTMLButtonElement[];
  const containers = [
    ...document.querySelectorAll('.items-container'),
  ] as HTMLDivElement[];

  containers[btnsArray.indexOf(btn)].remove();
}

function handleAddItem(e: MouseEvent) {
  const btn = e.target as HTMLButtonElement;
  if (actualcontainer) toggleForm(actualBtn, actualForm, false);
  setcontainerItem(btn);
  toggleForm(actualBtn, actualForm, true);
}

function toggleForm(
  btn: HTMLButtonElement,
  form: HTMLFormElement,
  action: boolean
) {
  if (!action) {
    form.style.display = 'none';
    btn.style.display = 'block';
  } else if (action) {
    form.style.display = 'block';
    btn.style.display = 'none';
  }
}

function setcontainerItem(btn: HTMLButtonElement) {
  actualBtn = btn;
  actualcontainer = btn.parentElement as HTMLDivElement;
  actualUl = actualcontainer.querySelector('ul') as HTMLUListElement;
  actualForm = actualcontainer.querySelector('form') as HTMLFormElement;
  actualTextInput = actualcontainer.querySelector('input') as HTMLInputElement;
  actualValidation = actualcontainer.querySelector(
    '.validation-msg'
  ) as HTMLSpanElement;
}

function createNewItem(e: Event) {
  e.preventDefault();
  
  //validation
  if (actualTextInput.value.length === 0) {
    actualValidation.textContent = 'Must be at least 1 character long ';
    return; // stop l'execution de la fn
  } else {
    actualValidation.textContent = '';
  }
//creation item

const itemContent = actualTextInput.value
const li = `<li class='item' draggable = true> <p>${itemContent}</p><button>`
}
