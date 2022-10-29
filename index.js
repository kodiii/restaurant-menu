import { menuArray } from './data.js'

const menuCart = document.getElementById("menu-cart")
const modalContainer = document.getElementById("modal-container")
const cardDetailsForm = document.getElementById("card-details")
const inputName = document.getElementById('name')
const inputCardNr = document.getElementById('card-number')
const inputCardCvv = document.getElementById('card-cvv')
let cartArray = []
let subTotal
let fullTotalCart

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
    const itemTargetIdObj = menuArray.filter(item => {
        return item.id === parseInt(itemMenuId)
    })[0]

    cartArray.push(itemTargetIdObj)
}

//handle render cart
function  renderCart() {
    let cart = ''
    subTotal = 0

    cartArray.forEach(function(item) {
        cart += `
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
        subTotal += item.price
    });

    fullTotalCart = subTotal

    //check if the following items are on the cart and if so apply discount
    const item1 = cartArray.includes(cartArray.find(item => item.name === "Pizza"))
    const item2 = cartArray.includes(cartArray.find(item => item.name === "Beer"))

    if(item1 && item2){
        fullTotalCart = subTotal / 1.05
        document.getElementById("discount-msg").style.display = "block"
    }
    //render the HTML
    document.getElementById("table-items").innerHTML = cart
    document.getElementById("total-items-price").innerHTML = `
        <span class="total-price">Total:</span>
        <span class="price">$${fullTotalCart.toFixed(2)}</span>
    `
    menuCart.style.display = 'block'

}

//remove item from cart
function deleteItem(removeItemId) {
    cartArray = cartArray.filter(function (item) {
        if (item.name === "Pizza" || item.name === "Beer") {
            document.getElementById("discount-msg").style.display = "none"
            fullTotalCart = subTotal
            return item.id !== parseInt(removeItemId)
        } else {
            return item.id !== parseInt(removeItemId)
        }
    })
    renderCart()
}

//handle payment service event
cardDetailsForm.addEventListener("submit", handlePayBtn)

function handlePayBtn(e) {
    e.preventDefault()

    const cardDetailsData = new FormData(cardDetailsForm)
    const name = cardDetailsData.get("name")
    const cardNr = cardDetailsData.get("cardNumber")
    const cardNrCvv = cardDetailsData.get("cardCvv")

    if( inputName.value !== '' &&
        inputCardNr.value !== '' &&
        inputCardCvv.value !== ''&&
        inputCardNr.value.length === 16 &&
        inputCardCvv.value.length === 3
    ) {
        setTimeout(function (){
            menuCart.style.display = 'none'
            modalContainer.style.display = 'none'
            document.getElementById("order-message").style.display = 'block'
            console.log(name, cardNr, cardNrCvv)
        }, 1500)
    } else {
        alert("Fill all the fields")
    }
}

function ratingStar() {

}
renderMenuBoard()

