import { menuArray } from './data.js';
const menuCart = document.getElementById("menuCart")

document.addEventListener("click",function(e){
    if (e.target.dataset.additembtn) {
        addItemToCart(e.target.dataset.additembtn)
        renderCart()
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

function addItemToCart(itemMenuId) {
    const itemTargetIdObj = menuArray.filter(function (item) {
        return item.id === parseInt(itemMenuId)
    })[0]

    let cartMenu = ''
    let totalCart = 0
    totalCart += itemTargetIdObj.price

    cartMenu = `
            <p>Your order</p>
            <div class="container-cart">
                <div class="items">
                    <div class="items-name-col">
                        ${itemTargetIdObj.name}
                        <span class="remove-item" data-remove="${itemTargetIdObj.id}">remove</span>
                    </div>
                    <div class="items-price-col">
                        ${itemTargetIdObj.price}
                    </div> 
                </div>
                <p>Total price: ${totalCart}</p>
            </div>   
        `
    //return cartMenu
    return menuCart.innerHTML = cartMenu

        //console.log(itemTargetIdObj.price)
}

//render menu items
function render() {
    document.getElementById("menuFeed").innerHTML = menuBoard()
}

function renderCart() {
    //document.getElementById("menuCart").innerHTML = addItemToCart()
    console.log('done')
}

render()

