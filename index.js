import { menuArray } from './data.js';

document.addEventListener("click",function(e){
    //console.log(e.target.dataset.name)
    if (e.target.dataset.addItemBtn) {
        addItem(e.target.dataset.addItemBtn)
        console.log(e.target.dataset.name)
    } else {
        console.log('wrong')
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
                <button class="add-item-btn" data-addItemBtn="${item.id}">+</button>
            </div>
        `
    })
    return menuItems
}

function addItem(itemMenuId) {
    const itemTargetIdObj = menuArray.filter(function (item) {
        return item.id === itemMenuId
    })[0]
    console.log(itemTargetIdObj)
}

//render menu items
function render() {
    document.getElementById("feed").innerHTML = menuBoard()
}

render()
