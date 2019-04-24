const addItemInput = document.querySelector('.additem-input')
const listContainer = document.querySelector('.list-container')

// for outiside clicks when editing list
const SaveAfterEdit = e => {
  let element = e.target.closest('.list__edit')
  if (element) return
  let editInput = document.querySelector('.list__edit')
  if (editInput.value.trim() === '') return
  const taskItem = editInput.parentNode
  const taskCheckBox = taskItem.querySelector('.list__checkbox')
  const taskDelete = taskItem.querySelector('.list__deleteButton')
  const taskPara = taskItem.querySelector('.list__task')
  taskPara.innerText = editInput.value
  taskPara.classList.toggle('hide')
  taskDelete.classList.toggle('hide')
  taskCheckBox.classList.toggle('hide')
  taskItem.removeChild(editInput)
  document.removeEventListener('click', SaveAfterEdit)
}

const createDomElement = tag => document.createElement(tag)

const setElementAttibutes = (element, attributes) => {
  Object.keys(attributes).forEach(key => {
    element.setAttribute(key, attributes[key])
  })
  return element
}

const appendMultipleChild = (parent, child) => {
  child.forEach(element => {
    parent.appendChild(element)
  })
}

const onCheckBoxClick = (e) => {
  let taskCheckBox = e.currentTarget
  let taskPara = taskCheckBox.nextElementSibling
  let taskTickButton = taskCheckBox.querySelector('.list__tick')
  if (taskCheckBox.dataset.checked === 'true') {
    taskCheckBox.dataset.checked = 'false'
  } else {
    taskCheckBox.dataset.checked = 'true'
  }
  taskPara.classList.toggle('taskdone')
  taskTickButton.classList.toggle('hide')
}

const createTickButton = elem => {
  let tickButton = createDomElement('div')
  tickButton.innerHTML = '&#10003'
  tickButton.setAttribute('class', 'list__tick hide')
  elem.appendChild(tickButton)
}

const addTaskFunctionality = (elem, text) => {
  setElementAttibutes(elem, {
    class: 'list'
  })
  const taskCheckBox = createDomElement('div')
  taskCheckBox.dataset.checked = 'false'
  setElementAttibutes(taskCheckBox, {
    class: 'list__checkbox'
  })

  createTickButton(taskCheckBox)

  taskCheckBox.addEventListener('click', onCheckBoxClick)
  const taskPara = createDomElement('p')
  taskPara.innerText = text
  setElementAttibutes(taskPara, {
    class: 'list__task'
  })

  const deleteButton = createDomElement('div')
  deleteButton.innerHTML = '&#9747'
  setElementAttibutes(deleteButton, {
    class: 'list__deleteButton'
  })

  deleteButton.addEventListener('click', () => {
    listContainer.removeChild(elem)
  })

  elem.addEventListener('dblclick', editItem)

  appendMultipleChild(elem, [taskCheckBox, taskPara, deleteButton])

  return elem
}

const afterEdit = e => {
  if (e.key !== 'Enter') return
  const editInput = e.target
  if (editInput.value.trim() === '') return
  const taskItem = editInput.parentNode
  const taskCheckBox = taskItem.querySelector('.list__checkbox')
  const taskDelete = taskItem.querySelector('.list__deleteButton')
  const taskPara = taskItem.querySelector('.list__task')
  taskPara.innerText = editInput.value
  taskPara.classList.toggle('hide')
  taskDelete.classList.toggle('hide')
  taskCheckBox.classList.toggle('hide')
  taskItem.removeChild(editInput)
  document.removeEventListener('click', SaveAfterEdit)
}

const editItem = e => {
  if (e.target.tagName !== 'P') return
  const taskList = e.target.parentNode
  const taskPara = e.target
  const taskCheckBox = taskList.querySelector('.list__checkbox')
  const taskDelete = taskList.querySelector('.list__deleteButton')
  console.log(taskCheckBox, taskDelete)
  taskPara.classList.toggle('hide')
  taskDelete.classList.toggle('hide')
  taskCheckBox.classList.toggle('hide')
  const editInput = createDomElement('input')
  setElementAttibutes(editInput, { class: 'list__edit', value: taskPara.innerText, type: 'text' })

  /* after edit
  change para contnet
  toggle para class
  toggle taskdelete class
  toggle taskcheckbox class
  */
  taskList.appendChild(editInput)
  editInput.focus()
  let val = editInput.value // store the value of the element
  editInput.value = '' // clear the value of the element
  editInput.value = val
  editInput.addEventListener('keydown', afterEdit)
  document.addEventListener('click', SaveAfterEdit)
}

const addItem = e => {
  if (e.key !== 'Enter') return
  let text = addItemInput.value
  if (text.trim() === '') return
  addItemInput.value = ''
  const taskItem = addTaskFunctionality(createDomElement('li'), text)
  listContainer.appendChild(taskItem)
}

addItemInput.addEventListener('keydown', addItem)
