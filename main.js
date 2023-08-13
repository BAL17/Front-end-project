let pokemon = [];

const inputBox = document.querySelector(".form-control");
const catchBtn = document.querySelector(".btn")
function loadPokemon(data, element) {
  if (data) {
    element.innerHTML = " ";
    let innerElement = " ";
    pokemon.forEach((item) => {
      innerElement += `<li> ${item} </li>`;
    });
    element.innerHTML = innerElement;
  }
}

//filter out the  data
function typeSuggestions(data, searchText) {
  return data.filter((x) => x.toLowerCase().include(searchText.toLowerCase()));
}

inputBox.addEventListener("input", function () {
  const filteredData = typeSuggestions(pokemon, inputBox.value);
  loadPokemon(filteredData, inputBox);
});


// async pull data from input
$(".btn").click(async function () {
  const userInput = $('input[type="text"]').val();
  if (!$(".pokeman-card").is(":visible")) {
    catchPokeData(userInput);
    // clear the form after they search
    $('input[type="text"]').val(" ");
  } 
});


//clear card button
const elem = document.querySelector(".btnCatch");
elem.onclick = function () {
  $(".pokeman-card").hide();
};

// create a function that fetchs pokemon data
async function catchPokeData(string) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${string}`);
  const data = await response.json();
  pokemonCard(data);
}

//create pokeman stat card template and some more content
function pokemonCard(obj) {
  let current = obj;
  let $pokeDexDiv = $("#pokedex");

  let $pokeDexDisplay = $("#pokeman-display").appendTo($pokeDexDiv);

  //create span for pokedex base
  let $pokemanCard = $("<span>")
    .addClass("pokeman-card")
    .appendTo($pokeDexDisplay);

  let $spanLeftDiv = $("<div>").addClass("spanLeftDiv").appendTo($pokemanCard);

  $("<img>")
    .addClass("pokeball-image")
    .attr(
      "src",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Pok%C3%A9_Ball_icon.svg/1200px-Pok%C3%A9_Ball_icon.svg.png"
    )
    .appendTo($spanLeftDiv);

  //add img for pokemon
  if (obj.sprites === null) {
    $("<img>")
      .addClass("pokeman-image")
      .attr(
        "src",
        "Resouses/rickrollpoke.jpeg"
      )
      .appendTo($spanLeftDiv);
  } else {
    $("<img>")
      .addClass("pokeman-image")
      .attr("src", current.sprites["front_default"])
      .appendTo($spanLeftDiv);
  }

  $("<h3>")
    .addClass("pokeman-name")
    .text(`ID:${current.id}  ${current.name}`)
    .appendTo($spanLeftDiv);
  // $('<p>').addClass('pokeman-sum').text(pokemonDesc).appendTo($spanLeftDiv)

  //create div container for this stuff rightside of span and left side = just img and description

  let $spanRightDiv = $("<div>")
    .addClass("spanRightDiv")
    .appendTo($pokemanCard);

  //create ol to append li data too
  let $pokemanData = $("<div>").addClass("pokeman-data").appendTo($spanRightDiv);

  //create lis that display specific data
  //stats
  let $pokemanStatData = $("<li>")
    .addClass("pokeman-subdata")
    .appendTo($pokemanData);

  let $para = $("<span>")
    .addClass("pokeman-subdataPara")
    .text("Base Stats")
    .appendTo($pokemanStatData);

  let $pokemanSubStatData = $("<ul>")
    .addClass("pokeman-subdata")
    .appendTo($para);
  // hp stat
  $("<li>")
    .addClass("pokeman-subdata-stats")
    .text(`Hp: ${" "} ${current.stats[0].base_stat}`)
    .appendTo($pokemanSubStatData);
  //attack stat
  $("<li>")
    .addClass("pokeman-subdata-stats")
    .text(`Attack: ${" "} ${current.stats[1].base_stat}`)
    .appendTo($pokemanSubStatData);
  //defense stat
  $("<li>")
    .addClass("pokeman-subdata-stats")
    .text(`Defense: ${" "} ${current.stats[2].base_stat}`)
    .appendTo($pokemanSubStatData);
  //spec att
  $("<li>")
    .addClass("pokeman-subdata-stats")
    .text(`Spec-Defense: ${" "} ${current.stats[3].base_stat}`)
    .appendTo($pokemanSubStatData);
  //spec def
  $("<li>")
    .addClass("pokeman-subdata-stats")
    .text(`Spec-Attack: ${" "} ${current.stats[4].base_stat}`)
    .appendTo($pokemanSubStatData);
  //speed
  $("<li>")
    .addClass("pokeman-subdata-stats")
    .text(`Speed: ${" "} ${current.stats[5].base_stat}`)
    .appendTo($pokemanSubStatData);

  //pokeman type
  $("<li>")
    .addClass("pokeman-subdata")
    .text(`Type(s): ${" "} ${current.types[0].type.name}`)
    .appendTo($pokemanData);

  //pokeman height
  $("<li>")
    .addClass("pokeman-subdata")
    .text("Height: " + +current.height + "ft")
    .appendTo($pokemanData);

  //pokeman  weight
  $("<li>")
    .addClass("pokeman-subdata")
    .text("Weight: " + +current.weight + "lbs")
    .appendTo($pokemanData);
}
