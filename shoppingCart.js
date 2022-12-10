let cartData = JSON.parse(localStorage.getItem("cartItems"))

//check localstorage för data
function checkCart() {
    //ifall localstorage har data lägg till i cart
    if (cartData != undefined) {

        showCart()
    }
    //if no data in localstora säg att den är tom
    else {
        document.getElementById("cart").style.display = "none"
        document.getElementById("empty-message").style.display = "block"
    }
}

checkCart()

function showCart() {
    //table
    let table = document.getElementById("table")

    //gå ingenom datan
    for (let i = 0; i < cartData.length; i++) {
        //new row
        let tr = document.createElement("tr")
        //element for item name
        let tdName = document.createElement("td")
        tdName.innerText = cartData[i].title

        //element för item price
        let tdPrice = document.createElement("td")
        tdPrice.innerText = cartData[i].price + "$"

        //lägg ihop elemnt
        tr.appendChild(tdName)
        tr.appendChild(tdPrice)

        //new row
        table.appendChild(tr)
    }


    //calc total kostand
    calcTotal()
}

function calcTotal() {
    let total = 0
    // gå ingenom items och lägg till totalkostnad
    for (let i = 0; i < cartData.length; i++) {
        total += cartData[i].price
    }
    //visa totalkostnad
    document.getElementById("total").innerHTML = "Total: " + total.toFixed(2) + "$"
}

//remove button för localstorage
let removeBTN = document.getElementById("remove")

removeBTN.addEventListener("click", function () {
    localStorage.removeItem("cartItems")
    document.getElementById("cart").style.display = "none"
    document.getElementById("empty-message").style.display = "block"
})