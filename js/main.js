// item class
class Item{
    constructor(name, location, description){
        this.name = name;
        this.location = location;
        this.description = description;
    }
}

// UI class
class UI{
    static displayItems(){
        const items = storedItems;

        items.forEach((item) => UI.addItemToList(item));
    }

    static addItemToList(item){
        const list = document.getElementById('item-list');

        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.location}</td>
            <td>${item.description}</td>
            <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        `;

        // add the row to list
        list.appendChild(row);
    }

    static showAlert(message, classname){
        // create the div
        const alertDiv = document.createElement('div');
        // add bootstrap classes
        alertDiv.className = `alert alert-${classname}`;
        // add the text to the div
        alertDiv.appendChild(document.createTextNode(message));
        // target the element
        const container = document.querySelector('.container');
        const form = document.querySelector('#item-form');
        // insert the div to the dom
        container.insertBefore(alertDiv, form);

        // make the alert message vanish in 3 secons
        setTimeout(() => document.querySelector('.alert').remove(), 3000);
    }

    static clearForm(){
        document.querySelector('#name').value = '';
        document.querySelector('#location').value = '';
        document.querySelector('#description').value = '';
    }

    static deleteItem(target){
        // check if the row was the class name called delete
        if(target.classList.contains('delete')){
            // remove the row
            // first parentElement goes to td and second parentElement goes to tr
            target.parentElement.parentElement.remove();
        }
    }
}

// handles storage
// local storage can only store string, no object
class Store{
    static getItems(){
        let items;
        if(localStorage.getItem('items') === null){
            items = [];
        }
        else{
           
            items = JSON.parse(localStorage.getItem('items'));
        }
        return items;
    }

    static addItem(item){
        const items = Store.getItems();

        items.push(item);

         // convert the js object into string
        localStorage.setItem('items', JSON.stringify(items));
    }

    static removeItem(name){
        const items = Store.getItems();

        items.forEach((item, index) => {
            // remove the item
            if(item.name === name){
                items.splice(index, 1);
            }
        })

         // convert the js object into string
        localStorage.setItem('items', JSON.stringify(items));
    }
}

// excute the function as soon as the page load
document.addEventListener('DOMContentLoaded', UI.displayItems);

// add user input for item to the list
document.querySelector('#item-form').addEventListener('submit', (e) => {
    // prevent the actual submit
    e.preventDefault();

    // get the form value
    const name = document.querySelector('#name').value;
    const location = document.querySelector('#location').value;
    const description = document.querySelector('#description').value;

    // validation
    if(name === '' === location === '' || description === ''){
        // show error message
        UI.showAlert('Please fill in all fields', 'danger');
    }
    else{
        // instatiate item
        const item = new Item(name, location, description);

        // update the table in the client
        UI.addItemToList(item);

        // show success message
        UI.showAlert('Item Added', 'success');

        // clear the input fields
        UI.clearForm();
    }
});

document.querySelector('#item-list').addEventListener('click', (e) => {
    UI.deleteItem(e.target);

    // show delete message
    UI.showAlert('Item Removed', 'success');
});