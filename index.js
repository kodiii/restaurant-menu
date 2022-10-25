import { menuArray } from './data.js'

let cartArray = []

document.addEventListener("click",function(e){
    if (e.target.dataset.additembtn) {
        addItemToCart(e.target.dataset.additembtn)
        renderCart()
    } else if (e.target.dataset.remove) {
        deleteItem(e.target.dataset.remove)
        console.log(cartArray)
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
                    <span class="item-name" data-name="${item.id}">${item.name}</span>
                    <p data-ingredients="${item.id}">${item.ingredients}</p>
                    <span class="price" data-price="${item.id}">$${item.price}</span>
                </div>
                <button class="add-item-btn" data-additembtn="${item.id}">+</button>
            </div>
        `
    })
    return menuItems
}

//handle add item to cart click and render it
function addItemToCart(itemMenuId) {
    const itemTargetIdObj = menuArray.filter(function (item) {
        return item.id === parseInt(itemMenuId)
    })[0]

    cartArray.push(itemTargetIdObj)
}
//handle render cart
function  renderCart() {
    let cartMenu = ''
    let totalCart = 0

    cartArray.forEach(function(item) {
        cartMenu += `
                <div class="container-cart">
                    <div class="cart-items">
                        <div class="items-name-col">
                            <span class="item-name">${item.name}</span>
                            <button class="remove-item-btn" data-remove="${item.id}">remove</button>
                        </div>
                        <div class="items-price-col">
                            <span class="price">$${item.price}</span>
                        </div>
                    </div>
                </div>
            `
        totalCart += item.price
    });

    document.getElementById("table-items").innerHTML = cartMenu
    document.getElementById("total-items-price").innerHTML = `
        <span class="total-price">Total:</span>
        <span class="price">$${totalCart}</span>
    `
    document.getElementById("menuCart").style.display = 'block'
    //console.log(cartArray)
}

//render menu items
function renderMenuBoard() {
    document.getElementById("menuFeed").innerHTML = menuBoard()
}

function deleteItem(removeItem) {
    const removeItemObj = cartArray.filter(function (item) {
        return item.id === parseInt(removeItem)
    })
    removeItemObj.shift()
    //cartArray.shift()
    renderCart()
}

renderMenuBoard()

