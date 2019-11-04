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
}

// excute the function as soon as the page load
document.addEventListener('DOMContentLoaded', UI.displayItems);