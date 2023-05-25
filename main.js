//global vars

$('.btn').click(async function(){
const userInput = $('input[type="text"]').val()
catchPokeData(userInput)
})

// create a function that pokemon data
async function catchPokeData(string) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${string}`)
    const data = await response.json()
    // for (let i = 0; i < data.length; i ++){
    console.log(data)
    pokemonCard(data)
    
}
    
        
     
        
function pokemonCard(obj){
    let current = obj
    let $pokeDexDiv = $('#pokedex')

//create span for pokedex base
    let $pokemanCard = $('<span>').addClass('pokeman-card').appendTo($pokeDexDiv)

//add an h3 to span
// $('<h3>').addClass('pokeman-name').text(current.name).appendTo($pokemanCard)

//add img for pokemon
    if (obj.sprites === null){
        $('<img>').addClass('pokeman-image').attr('src', "https://cdn.discordapp.com/attachments/998745818582482964/1108890217626214400/serious.png").appendTo($pokemanCard)
        } else {
          $('<img>').addClass('pokeman-image').attr('src', current.sprites['front_default']).appendTo($pokemanCard)
        }
//create ol to append li data too 
let $pokemanData = $('<ol>').addClass('pokeman-data').appendTo($pokemanCard)

$('<h3>').addClass('pokeman-name').text(`ID:${current.id}  ${current.name}`).appendTo($pokemanData)

//create lis that display specific data
//stats
$('<li>').addClass('pokeman-subdata').text(current.stats).appendTo($pokemanData)

//pokeman type
$('<li>').addClass('pokeman-subdata').text(current.types).appendTo($pokemanData)


//pokeman height
$('<li>').addClass('pokeman-subdata').text("Height: " + + current.height + "ft").appendTo($pokemanData)
 
//pokeman  weight
$('<li>').addClass('pokeman-subdata').text("Weight: " + + current.weight + "lbs").appendTo($pokemanData)  

$('<button>').addClass('clear-btn').text("Refresh").appendTo($pokeDexDiv)  

$('.btn').appendTo($pokeDexDiv)
}
        
        
        
        


// const pokemon = results.map((data) => ({
//         name: data.name,
//         image: data.sprites['front_default'],
//         id: data.id,
//         type: data.types.map((type) => type.type.name).join(', '),
//         height: data.height,
//         weight: data.weight
//     })); 