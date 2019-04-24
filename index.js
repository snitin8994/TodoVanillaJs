const shortid = require('shortid')
const addItemInput = document.querySelector('.additem-input')
const listContainer = document.querySelector('.list-container')
const filterContainer = document.querySelector('.filter')
let tabActiveContent = ''
let itemCount = 0
let activeTabElement

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

const onCheckBoxClick = e => {
  let taskCheckBox = e.currentTarget
  let taskList = taskCheckBox.parentNode
  let taskPara = taskCheckBox.nextElementSibling
  let taskTickButton = taskCheckBox.querySelector('.list__tick')
  if (taskCheckBox.dataset.checked === 'true') {
    taskCheckBox.dataset.checked = 'false' // active task
    editLocalStorageItem(taskList.id, 'checked', 'false')
    if (tabActiveContent === 'Completed') filter(null, 'Completed', true)
  } else {
    taskCheckBox.dataset.checked = 'true'
    editLocalStorageItem(taskList.id, 'checked', 'true')
    if (tabActiveContent === 'Active') filter(null, 'Active', true)
  }
  taskPara.classList.toggle('taskdone')
  taskTickButton.classList.toggle('hide')
}

const filter = (e, text, artificialClick = false) => {
  let buttonContent = text || e.target.textContent
  // for preventing  handler executing clicks on filterContainer
  if (!text && !e.target.classList.contains('filter__item')) return
  tabActiveContent = buttonContent
  let childrenArray = Array.from(listContainer.children)
  if (!artificialClick) {
    if (activeTabElement) activeTabElement.classList.remove('tabstyle')
    e.target.classList.add('tabstyle')
    activeTabElement = e.target
  }
  switch (buttonContent) {
    case 'All':
      for (let item of childrenArray) {
        console.log(item)
        if (item.classList.contains('hide')) {
          item.classList.remove('hide')
        }
      }
      break
    case 'Active':
      for (let item of childrenArray) {
        let checkBox = item.querySelector('.list__checkbox')
        if (checkBox.dataset.checked === 'true') {
          item.classList.add('hide')
        } else {
          item.classList.remove('hide')
        }
      }
      break
    case 'Completed':
      for (let item of childrenArray) {
        let checkBox = item.querySelector('.list__checkbox')
        if (checkBox.dataset.checked === 'false') {
          item.classList.add('hide')
        } else {
          item.classList.remove('hide')
        }
      }
      break
  }
}

const createTickButton = (elem, checked) => {
  let tickButton = createDomElement('div')
  tickButton.innerHTML = '&#10003'
  if (checked === 'true') {
    tickButton.setAttribute('class', 'list__tick')
  } else {
    tickButton.setAttribute('class', 'list__tick hide')
  }
  elem.appendChild(tickButton)
}
const editLocalStorageItem = (id, property, value) => {
  let tasksObj = JSON.parse(localStorage.getItem('tasks'))
  for (let item of tasksObj) {
    if (item.id === id) {
      item[property] = value
    }
  }
  localStorage.setItem('tasks', JSON.stringify(tasksObj))
}

const addLocalStorageItem = item => {
  if (!localStorage.getItem('tasks')) {
    localStorage.setItem('tasks', JSON.stringify([item]))
    return
  }
  let taskObj = JSON.parse(localStorage.getItem('tasks'))
  taskObj.push(item)
  localStorage.setItem('tasks', JSON.stringify(taskObj))
}

const deleteLocalStorageItem = id => {
  let taskObj = JSON.parse(localStorage.getItem('tasks'))
  let newTaskObj = taskObj.filter(item => item.id !== id)
  localStorage.setItem('tasks', JSON.stringify(newTaskObj))
}

const SaveAfterEdit = (e, prevText, editInput) => {
  let element = e.target.closest('.list__edit')
  let flag = 0
  if (element) return
  if (editInput.value.trim() === '') flag = 1
  const taskItem = editInput.parentNode
  const taskCheckBox = taskItem.querySelector('.list__checkbox')
  const taskDelete = taskItem.querySelector('.list__deleteButton')
  const taskPara = taskItem.querySelector('.list__task')
  taskPara.innerText = editInput.value
  if (flag === 1) taskPara.innerText = prevText
  editLocalStorageItem(taskItem.id, 'text', taskPara.innerText)
  taskPara.classList.toggle('hide')
  taskDelete.classList.toggle('hide')
  taskCheckBox.classList.toggle('hide')
  taskItem.removeChild(editInput)
  document.removeEventListener('click', SaveAfterEdit)
}

const afterEdit = (e, prevText) => {
  console.log(e)
  let flag = 0
  if (e.key !== 'Enter') return
  const editInput = e.target
  if (editInput.value.trim() === '') flag = 1
  const taskItem = editInput.parentNode
  const taskCheckBox = taskItem.querySelector('.list__checkbox')
  const taskDelete = taskItem.querySelector('.list__deleteButton')
  const taskPara = taskItem.querySelector('.list__task')
  taskPara.innerText = editInput.value
  if (flag === 1) taskPara.innerText = prevText
  editLocalStorageItem(taskItem.id, 'text', taskPara.innerText)
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
  taskPara.classList.toggle('hide')
  taskDelete.classList.toggle('hide')
  taskCheckBox.classList.toggle('hide')
  const editInput = createDomElement('input')
  setElementAttibutes(editInput, {
    class: 'list__edit',
    value: taskPara.innerText,
    type: 'text'
  })

  //   after edit
  //   change para contnet
  //   toggle para class
  //   toggle taskdelete class
  //   toggle taskcheckbox class

  taskList.appendChild(editInput)
  editInput.focus()
  let val = editInput.value // store the value of the element
  editInput.value = '' // clear the value of the element
  editInput.value = val
  editInput.addEventListener('keydown', e => afterEdit(e, val))
  document.addEventListener('click', e => SaveAfterEdit(e, val, editInput))
}

const createTaskElement = taskObj => {
  const taskItem = createDomElement('li')
  setElementAttibutes(taskItem, {
    class: 'list',
    id: taskObj.id
  })
  const taskCheckBox = createDomElement('div')
  taskCheckBox.dataset.checked = taskObj.checked
  setElementAttibutes(taskCheckBox, {
    class: 'list__checkbox'
  })

  createTickButton(taskCheckBox, taskObj.checked)

  taskCheckBox.addEventListener('click', onCheckBoxClick)
  const taskPara = createDomElement('p')
  taskPara.innerText = taskObj.text
  let taskParaClass = 'list__task'
  if (taskObj.checked === 'true') taskParaClass += ' taskdone'
  setElementAttibutes(taskPara, {
    class: taskParaClass
  })

  const deleteButton = createDomElement('div')
  deleteButton.innerHTML = '&#9747'
  setElementAttibutes(deleteButton, {
    class: 'list__deleteButton'
  })

  deleteButton.addEventListener('click', () => {
    deleteLocalStorageItem(taskItem.id)
    listContainer.removeChild(taskItem)

    itemCount--
    if (itemCount === 0) {
      filterContainer.classList.add('hide')
    }
  })

  // const noteButton = createDomElement('div')
  // noteButton.setAttribute('class', 'note')
  // noteButton.innerText = '+'
  // noteButton.addEventListener('click', addNote)

  taskItem.addEventListener('dblclick', editItem)

  appendMultipleChild(taskItem, [taskCheckBox, taskPara, deleteButton])

  listContainer.appendChild(taskItem)
  itemCount++
  if (filterContainer.classList.contains('hide')) {
    filterContainer.classList.remove('hide')
  }
}

const addItem = e => {
  if (e.key !== 'Enter') return
  let text = addItemInput.value
  if (text.trim() === '') return
  addItemInput.value = ''
  const taskObj = { text, checked: 'false', id: shortid.generate() }
  createTaskElement(taskObj)
  addLocalStorageItem(taskObj)
}

const addItemsFromLocalStorage = () => {
  if (!localStorage.getItem('tasks')) return
  let taskItems = JSON.parse(localStorage.getItem('tasks'))
  taskItems.forEach(task => createTaskElement(task))
}

addItemsFromLocalStorage()

// createTaskElement({ text: 'run', id: '6788', checked: 'true' })
filterContainer.addEventListener('click', filter)
addItemInput.addEventListener('keydown', addItem)
