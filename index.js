import { menuArray } from './data.js'

const menuCart = document.getElementById("menu-cart")
const modalContainer = document.getElementById("modal-container")
const inputForm = document.getElementsByTagName('input')

let cartArray = []

document.addEventListener("click",function(e){
    if (e.target.dataset.additembtn) {
        addItemToCart(e.target.dataset.additembtn)
        renderCart()
    } else if (e.target.dataset.remove) {
        deleteItem(e.target.dataset.remove)
    } else if (e.target.dataset.orderbtn) {
        modalContainer.style.display = 'block'
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
                            <p class="remove-item-btn" data-remove="${item.id}">remove</p>
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
    menuCart.style.display = 'block'
}

//render menu items
function renderMenuBoard() {
    document.getElementById("menuFeed").innerHTML = menuBoard()
}

//remove item from cart
function deleteItem(removeItemId) {
    cartArray = cartArray.filter(function (item) {
        return item.id !== parseInt(removeItemId)
    })
    renderCart()
}

function handleOrderBtn(e) {
    e.preventDefault()
    if (inputForm.value) {
        menuCart.style.display = 'none'
        document.getElementById("order-message").style.display = 'block'
    } else {
        alert("Please fill all the fields")
    }
}

renderMenuBoard()

