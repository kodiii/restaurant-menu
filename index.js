import { menuArray } from './data.js'

const menuCart = document.getElementById("menu-cart")
const modalContainer = document.getElementById("modal-container")
const cardDetailsForm = document.getElementById("card-details")
const inputName = document.getElementsByTagName('name')
const inputCardNr = document.getElementsByTagName('card-number')
const inputCardCvv = document.getElementsByTagName('card-cvv')
const payBtn = document.getElementById("pay-btn")
let cartArray = []
//console.log(inputForm.valueOf())

document.addEventListener("click", function(e){
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

//render menu board items
function renderMenuBoard() {
    document.getElementById("menu-feed").innerHTML = menuBoard()
}

//handle add item to cart click
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

//remove item from cart
function deleteItem(removeItemId) {
    cartArray = cartArray.filter(function (item) {
        return item.id !== parseInt(removeItemId)
    })
    renderCart()
}

cardDetailsForm.addEventListener("submit", handlePayBtn)

function handlePayBtn(e) {
    e.preventDefault()

    const cardDetailsData = new FormData(cardDetailsForm)
    const name = cardDetailsData.get("name")
    const cardNr = cardDetailsData.get("cardNumber")
    const cardNrCvv = cardDetailsData.get("cardCvv")

    setTimeout(function (){
        menuCart.style.display = 'none'
        modalContainer.style.display = 'none'
        document.getElementById("order-message").style.display = 'block'

    }, 3000)
        console.log(name, cardNr, cardNrCvv)
}
renderMenuBoard()

