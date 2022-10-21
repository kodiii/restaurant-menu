import { menuArray } from './data.js';

const addItemBtn = document.getElementById('add-item-btn')
console.log(addItemBtn)

document.addEventListener("click", function(e){
    console.log(e.target.dataset.name)
})

//function to populate the menu board
function menuBoard() {
    let cartItems = ''

    menuArray.forEach(function (item){
        cartItems += `
            <div class="menu-items" id="menu-items">
                <span class="emoji" data-emoji="${item.id}">${item.emoji}</span>
                <div class="item-data">
                    <h3 class="item-name" data-name="${item.id}">${item.name}</h3>
                    <p data-ingredients="${item.id}">${item.ingredients}</p>
                    <span class="price" data-price="${item.id}">$${item.price}</span>
                </div>
                <button id="add-item-btn">+</button>
            </div>
        `
    })
    return cartItems
}

//render menu items
function render() {
    document.getElementById("feed").innerHTML = menuBoard()
}

render()
