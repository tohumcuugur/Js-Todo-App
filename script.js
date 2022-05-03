// UI variables

const form = document.querySelector("form");
const input = document.querySelector("#txtTaskName");
const btnDeleteAll = document.querySelector("#btnDeleteAll");
const taskList = document.querySelector("#task-list");
let items;

//load items
loadItems();


//call event listeners
eventListeners(); //First application start works with eventlisteners() function

function eventListeners() {
    //submit event
    form.addEventListener("submit", addNewItem);

    //delete an item
    taskList.addEventListener("click", deleteItem);
    //delete all items

    btnDeleteAll.addEventListener("click", deleteAllItems);
}

function loadItems() {

    items = getItemsFromLS();

    items.forEach(function (item) {
        createItem(item);
    });
}
//get items from local storage
function getItemsFromLS() {
    if (localStorage.getItem('items') === null) {
        items = [];
    } else {
        items = JSON.parse(localStorage.getItem('items'));
    }
    return items;
}
//set item to local storage
function setItemToLS(text) {
    items = getItemsFromLS();
    items.push(text);
    localStorage.setItem('items', JSON.stringify(items));
}

function createItem(text) {
    //create li
    const li = document.createElement("li");
    li.className = "list-group-item list-group-item-secondary"; //!!!!!!!!!!!!!!!!! İMPORTANT!!!!!!!!!!!!!!! classList is add new class existing classes but className is deleting all classes and add new class
    li.appendChild(document.createTextNode(text));

    //create a
    const a = document.createElement("a");
    a.classList = "delete-item float-end";
    a.setAttribute = ("href", "#");
    a.innerHTML = '<i class = "fas fa-times"></i>';

    //add a to li
    li.appendChild(a);

    //add li to ul
    taskList.appendChild(li);

    //clear input

    input.value = "";

}
//add new item
function addNewItem(e) {
    //console.log(input.value)//For try when we write something in input area and add it shows
    if (input.value.trim() === "") {
        //trim() is prevent empty task
        alert("Add New Task");
    }
    createItem(input.value);


    //clear input
    input.value = "";


    e.preventDefault(); // this is prevent refreshing page when we click on "button".
}

//delete an item
function deleteItem(e) {
    //console.log(e.target);
    if (e.target.className === "fas fa-times") {
        if (confirm("Are u sure?")) {
            e.target.parentElement.parentElement.remove();
        }
    }
}

//delete all items
function deleteAllItems(e) {
    //taskList.innerHTML='';  //*********************METHOD 1********************
    if (confirm("Are u sure?")) {
        //!!!!!İMPORTANT!!!!!!!!!!!!!!!!!!!!!!There is a 2 types => childNodes(NodeList) and children but we can use children because children is HTMLCOLLECTİON and dont have forEach Method.
        while (taskList.firstChild) {
            taskList.removeChild(taskList.lastChild);
        }
    }

    e.preventDefault();
}
// taskList.childNodes.forEach(function(item){
//     if(item.nodeType===1){
//         item.remove();
//     }
// });