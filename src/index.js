const url = 'http://localhost:3000/spiceblends/1'
const updateForm = document.querySelector('form#update-form')
const ingredientForm = document.querySelector('form#ingredient-form')


function oneSpiceBlend(firstSpice) {
    const spiceDetail = document.querySelector('div#spice-blend-detail')
    const spiceTitle = spiceDetail.querySelector('h2')
    spiceTitle.textContent = firstSpice.title
    const spiceImg = spiceDetail.querySelector('img')
    spiceImg.src = firstSpice.image
    spiceImg.alt = firstSpice.title
    updateForm.dataset.id = firstSpice.id
    ingredientForm.dataset.id = firstSpice.id
    const ul = document.querySelector('ul')
    ul.innerHTML = ''
    firstSpice.ingredients.forEach(ingredient => {
        const li = document.createElement('li')
        li.dataset.id = ingredient.id
        li.textContent = ingredient.name
        ul.append(li)
    })
}
// See the first spice blend (the spice blend with an ID of 1), 
// including its title, image, and 
// list of ingredients, when the page loads.
function firstSpiceInfo() {
fetch(url)
.then(response => response.json())
.then(spiceObj => 
    oneSpiceBlend(spiceObj)
    // console.log(data)
    )
}
// Update the title of the spice blend on the page when the #update-form is submitted, 
// and still see that change when reloading the page 
// (the new title should be persisted on the server).
// How does this function know about the variable updateForm from the other function?
updateForm.addEventListener('submit', event => {
    event.preventDefault()
    // console.log('submit!')
    // console.log(event)
    const title = event.target['spiceblend-title'].value
    console.log(updateForm)
    fetch(`http://localhost:3000/spiceblends/${event.target.dataset.id}`,{

        method: 'PATCH',
        headers: { 
            
            "Content-Type": "application/json",
            'Accept': 'application/json'
        },
        body: JSON.stringify({title})
        
    })
    .then(response => response.json())
    .then(titleUpdate => {
        const h2 = document.querySelector('h2.title')
        h2.textContent = titleUpdate.title

    })
    // console.log(title)
    
})

ingredientForm.addEventListener('submit', event => {
    event.preventDefault()

    const ingredients = event.target['ingredient-name'].value
    const ingredientLi = document.createElement('li')
    ingredientLi.textContent = ingredients
    const ul = document.querySelector('ul.ingredients-list')
    ul.append(ingredientLi)
   
    fetch(`http://localhost:3000/ingredients`, {
        method : 'POST',
        headers: { 
            
            "Content-Type": "application/json",
            'Accept': 'application/json'
        },
        body: JSON.stringify({name: ingredients,
            spiceblendId: parseInt(event.target.dataset.id) 
        })
        })
        .then(response => response.json())
        .then(ingredientsObj => (ingredientsObj))
            // console.log(ingredientsObj)))
    

            // See all spice blend images in the #spice-images div when the page loads. Request the data from the server to get all the spice blends. 
            // Then, display the image for each of the spice blends using an img tag inside the #spice-images div.
    

})
firstSpiceInfo()

function spiceImages(imagesObj){
    const images = document.querySelector('div#spice-images')
    const img = document.createElement('img')
    img.src = imagesObj.image
    img.alt = imagesObj.title
    img.dataset.id = imagesObj.id
    
    images.append(img)
} 
fetch('http://localhost:3000/spiceblends')
.then(response => response.json())
.then(allImages => {
    allImages.forEach(image => {
        spiceImages(image)
    })
})

const images = document.querySelector('div#spice-images')

images.addEventListener('click', event => {
    if(event.target.matches('img')) {
        fetch(`http://localhost:3000/spiceblends/${event.target.dataset.id}`)
        .then(response => response.json())
        .then(oneImageObj => {
        oneSpiceBlend(oneImageObj)
        })
    }
    
})
// Click on an image from the #spice-images div and see all the info about that spice blend displayed inside the #spice-blend-detail div. 
// You will need to make another GET request with the spice blend's ID to get the information about the spice blend that was clicked.