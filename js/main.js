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
        // for testing
        const storedItems = [
            {
                name: "Pen",
                location: "In the kitchen drawer",
                description: "Blue Pen"
            },
            {
                name: "Candy",
                location: "In the green shelf",
                description: "Yummy Candy"
            }
        ];

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
        alert('Please fill in all fields');
    }
    else{
        // instatiate item
        const item = new Item(name, location, description);

        // update the table in the client
        UI.addItemToList(item);

        // clear the input fields
        UI.clearForm();
    }
});

document.querySelector('#item-list').addEventListener('click', (e) => {
    UI.deleteItem(e.target);
});