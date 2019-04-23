let addItemInput = document.querySelector(".additem-input");
let listContainer = document.querySelector(".list-container");

const createDomElement = tag => document.createElement(tag);

const setElementAttibutes = (element,attributes) => {
    Object.keys(attributes).forEach((key)=> {
        element.setAttribute(key,attributes[key])
    })
    return element
}

const addTaskFunctionality = (elem, text) => {

  elem = setElementAttibutes(elem,{
      class: "list"
  })
  let taskCheckBox = createDomElement("input");
 
};

const addItem = e => {
  if (e.key !== "Enter") return;
  let text = addItemInput.value;
  let taskItem = addTaskFunctionality(createDomElement("li"), text);
  listContainer.appendChild(taskItem);
};

addItemInput.addEventListener("keydown", addItem);
