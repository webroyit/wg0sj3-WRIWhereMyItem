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
                description: "Blue Pen"
            }
        ];

        const items = storedItems;

        items.forEach((item) => UI.addItemToList(item));
    }
}