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
    const ul = document.querySelector('ul')
    firstSpice.ingredients.forEach(ingredient => {
        const li = document.createElement('li')
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
    const ul = document.querySelector('ul')
    ul.append(ingredientLi)

    fetch('http://localhost:3000/ingredients', {
        method : 'POST',
        headers: { 
            
            "Content-Type": "application/json",
            'Accept': 'application/json'
        },
        body: JSON.stringify({ingredients,
            spiceBlendId: parseInt(event.target.dataset.id)
        })
        })
        
})

// Add a new ingredient to the spice blend when the #ingredient-form is submitted. 
// The new ingredient should be displayed on the page (no persistence needed for now).
firstSpiceInfo()


























































// ***************************** old code *************************** 
// // write your code here
// const url = 'http://localhost:3000/spiceblends' 
// const newIngredientForm = document.querySelector('form#ingredient-form')
// const updateForm = document.querySelector('form#update-form')

// fetch (`${url}/1`)
//     .then(response => response.json())
//     .then(spiceBlendArray => {
        
//         const detailH2 = document.querySelector('h2.title')
//         detailH2.textContent = spiceBlendArray.title
    
//     const detailImg = document.querySelector('img.detail-image')
//     detailImg.src = spiceBlendArray.image
//     detailImg.alt = spiceBlendArray.title

//     const ingredientsUl = document.querySelector('ul.ingredients-list')

//     spiceBlendArray.ingredients.forEach(ingredientObj => {
//         const li = document.createElement('li')
//         li.textContent = ingredientObj.name
        
//         ingredientsUl.append(li)

//     }) 
    
//     })

//      updateForm.addEventListener('submit', event => {
//      event.preventDefault()
     
//      const titleInput = event.target.title.value

//      fetch(`${url}/1`, {
//      method: 'PATCH',
//      headers: { 
//     'Content-Type': 'application/json'
// },

//     body: JSON.stringify({ title: titleInput })

// })
//     .then(response => response.json())
//     .then(updatedSpiceBlendObj => {
//     const detailH2 = document.querySelector('h2.title')
//     detailH2.textContent = updatedSpiceBlendObj.title
//     })

    
// })


// newIngredientForm.addEventListener('submit', event => {
//     event.preventDefault()
    
//     const newIngredientInput = event.target["ingredient-name"].value
//     const li = document.createElement('li')
//     li.textContent = newIngredientInput

//     const ingredientsUl = document.querySelector('ul.ingredients-list')
//     ingredientsUl.append(li)
    
//     event.target.reset()

   
// })