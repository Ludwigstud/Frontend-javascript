let dataAPI

//Api callar för att fetch data
function APICall() {

    fetch("https://fakestoreapi.com/products?limit=20")
        .then(res => res.json())
        .then(data => {
            dataAPI = data
            console.log(data)
            addDataToPage()
        })
}

APICall()

//Function lägger till all fetched data till interface
function addDataToPage() {
    //div för att bifoga information
    let containerDIV = document.getElementsByClassName("items-container")[0]

    //Går igenom alla fetched item
    for (let i = 0; i < dataAPI.length; i++) {

        //Div för information
        let itemInfo = document.createElement("div")
        itemInfo.classList.add("items-info")

        //div för img
        let imageDiv = document.createElement("div")
        imageDiv.classList.add("image-container")

        //Div för föremål-bild
        let image = document.createElement("img")
        image.classList.add("image")
        //Hämta bild från api
        image.src = dataAPI[i].image

        //img element till imageDiv
        imageDiv.appendChild(image)

        //item-category tillägg
        let itemCategory = document.createElement("h3")
        itemCategory.innerText = dataAPI[i].category
        
        //item-price tillägg
        let itemPrice = document.createElement("h4")
        itemPrice.innerText = "Price: "+ dataAPI[i].price+" $"

        //item-rating tillägg
        let itemRating= document.createElement("p")
        itemRating.innerText = "Rating: "+dataAPI[i].rating.rate+" from "+dataAPI[i].rating.count+" reviews"

        //item-description för sida
        let itemDesc = document.createElement("p")
        itemDesc.innerText = dataAPI[i].description

        //add-to-cart button
        let addToCartBTN = document.createElement("button")
        addToCartBTN.innerText = "Add To Cart"
        addToCartBTN.classList.add("btn")

        //all item information till itemInfo
        itemInfo.appendChild(imageDiv)
        itemInfo.appendChild(itemCategory)
        itemInfo.appendChild(itemPrice)
        itemInfo.appendChild(itemRating)
        itemInfo.appendChild(itemDesc)
        itemInfo.appendChild(addToCartBTN)

        //iteminfo div tillägg hemsidan
        containerDIV.appendChild(itemInfo)
    }

    //button add-to-cart
    let btns = document.getElementsByClassName("btn")

    //event-listener till alla buttons
    addListeners(btns)
}

//add-to-cart event click
function addListeners(btns){

    for (let i = 0; i < btns.length; i++) {
        // buttonclick för localstorage
        btns[i].addEventListener("click", function () {

            addToLocalStorage(dataAPI[i])
        })
    }
}

//function för tillägg i cart, samt localstorage

function addToLocalStorage(item){

    let items = JSON.parse(localStorage.getItem("cartItems"))

    //If cart empty
    if(items == undefined){
        localStorage.setItem("cartItems",JSON.stringify([item]))
    }

    else{
        items.push(item)
        localStorage.setItem("cartItems",JSON.stringify(items))
    }

    alert("Item Added To Cart")
}
