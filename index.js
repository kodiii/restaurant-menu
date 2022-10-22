import { menuArray } from './data.js';

document.addEventListener("click",function(e){
    if (e.target.dataset.additembtn) {
        addItem(e.target.dataset.additembtn)
    }
})

//function to populate the menu items
function menuBoard() {
    let menuItems = ''

    menuArray.forEach(function (item){
        menuItems += `
            <div class="menu-items" id="menu-items">
                <span class="emoji" data-emoji="${item.id}">${item.emoji}</span>
                <div class="item-data">
                    <h3 class="item-name" data-name="${item.id}">${item.name}</h3>
                    <p data-ingredients="${item.id}">${item.ingredients}</p>
                    <span class="price" data-price="${item.id}">$${item.price}</span>
                </div>
                <button class="add-item-btn" data-additembtn="${item.id}">+</button>
            </div>
        `
    })
    return menuItems
}

function addItem(itemMenuId) {
    const itemTargetIdObj = menuArray.filter(function (item) {
        return item.id === parseInt(itemMenuId)
        //console.log(item.id, item.name, item.ingredients)
    })[0]
    console.log(itemTargetIdObj)
    let cartItemsObj = [{
        name: '',
        price: 0
    }]

    /*cartItemsObj.name.push(itemTargetIdObj.name)
    console.log(cartItemsObj)*/
}

//render menu items
function render() {
    document.getElementById("menuFeed").innerHTML = menuBoard()
}

render()
