const addItemInput = document.querySelector('.additem-input')
const listContainer = document.querySelector('.list-container')

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

  appendMultipleChild(elem, [taskCheckBox, taskPara, deleteButton])

  return elem
}

const addItem = e => {
  if (e.key !== 'Enter') return
  let text = addItemInput.value
  const taskItem = addTaskFunctionality(createDomElement('li'), text)
  listContainer.appendChild(taskItem)
}

addItemInput.addEventListener('keydown', addItem)
