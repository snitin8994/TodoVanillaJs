const addItemInput = document.querySelector('.additem-input')
const listContainer = document.querySelector('.list-container')

document.addEventListener('click', (e) => {
  let element = e.target.closest('.list__edit')
  if (element) return
  let editInput = document.querySelector('.list__edit')
  const taskItem = editInput.parentNode
  const taskCheckBox = taskItem.querySelector('.list__checkbox')
  const taskDelete = taskItem.querySelector('.list__deleteButton')
  const taskPara = taskItem.querySelector('.list__task')
  taskPara.innerText = editInput.value
  taskPara.classList.toggle('hide')
  taskDelete.classList.toggle('hide')
  taskCheckBox.classList.toggle('invisible')
  taskItem.removeChild(editInput)
})

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

const addTaskFunctionality = (elem, text) => {
  setElementAttibutes(elem, {
    class: 'list'
  })
  const taskCheckBox = createDomElement('input')
  setElementAttibutes(taskCheckBox, {
    type: 'checkbox',
    class: 'list__checkbox'
  })
  const taskPara = createDomElement('p')
  taskPara.innerText = text
  setElementAttibutes(taskPara, {
    class: 'list__task'
  })

  const deleteButton = createDomElement('div')
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
  const taskItem = editInput.parentNode
  const taskCheckBox = taskItem.querySelector('.list__checkbox')
  const taskDelete = taskItem.querySelector('.list__deleteButton')
  const taskPara = taskItem.querySelector('.list__task')
  taskPara.innerText = editInput.value
  taskPara.classList.toggle('hide')
  taskDelete.classList.toggle('hide')
  taskCheckBox.classList.toggle('invisible')
  taskItem.removeChild(editInput)
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
  taskCheckBox.classList.toggle('invisible')
  const editInput = createDomElement('input')
  setElementAttibutes(editInput, { class: 'list__edit', value: taskPara.innerText, type: 'text' })
  editInput.addEventListener('keydown', afterEdit)
  /* after edit
  change para contnet
  toggle para class
  toggle taskdelete class
  toggle taskcheckbox class
  */
  taskList.appendChild(editInput)
}

const addItem = e => {
  if (e.key !== 'Enter') return
  let text = addItemInput.value
  const taskItem = addTaskFunctionality(createDomElement('li'), text)
  listContainer.appendChild(taskItem)
}

addItemInput.addEventListener('keydown', addItem)
