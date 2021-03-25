// write your code here
const url = 'http://localhost:3000/spiceblends' 
const newIngredientForm = document.querySelector('form#ingredient-form')
const updateForm = document.querySelector('form#update-form')

fetch (`${url}/1`)
    .then(response => response.json())
    .then(spiceBlendArray => {
        
        const detailH2 = document.querySelector('h2.title')
        detailH2.textContent = spiceBlendArray.title
    
    const detailImg = document.querySelector('img.detail-image')
    detailImg.src = spiceBlendArray.image
    detailImg.alt = spiceBlendArray.title

    const ingredientsUl = document.querySelector('ul.ingredients-list')

    spiceBlendArray.ingredients.forEach(ingredientObj => {
        const li = document.createElement('li')
        li.textContent = ingredientObj.name
        
        ingredientsUl.append(li)

    }) 
    
    })

     updateForm.addEventListener('submit', event => {
     event.preventDefault()
     
     const titleInput = event.target.title.value

     fetch(`${url}/1`, {
     method: 'PATCH',
     headers: { 
    'Content-Type': 'application/json'
},

    body: JSON.stringify({ title: titleInput })

})
    .then(response => response.json())
    .then(updatedSpiceBlendObj => {
    const detailH2 = document.querySelector('h2.title')
    detailH2.textContent = updatedSpiceBlendObj.title
    })

    
})


newIngredientForm.addEventListener('submit', event => {
    event.preventDefault()
    
    const newIngredientInput = event.target["ingredient-name"].value
    const li = document.createElement('li')
    li.textContent = newIngredientInput

    const ingredientsUl = document.querySelector('ul.ingredients-list')
    ingredientsUl.append(li)
    
    event.target.reset()

   
})