// LIST

const response = {
  games: [
    { title: 'Fallout 4', release_date: 1447200000000, category_id: 2 },
    { title: 'Halo 5', release_date: 1445990400000,  category_id: 3 },
    { title: 'Quantum Break', release_date: 1459900800000,  category_id: 1 },
    { title: 'Forza Horizon 3', release_date: 1475020800000,  category_id: 4 },
    { title: 'Final Fantasy XV', release_date: 1480464000000,  category_id: 2 },
    { title: 'NBA 2K17', release_date: 1474416000000,  category_id: 4 },
    { title: 'Battlefield 1', release_date: 1477094400000,  category_id: 3 },
    { title: 'GTA V', release_date: 1474156800000,  category_id: 1 },
    { title: 'FIFA 17', release_date: 1475020800000,  category_id: 4 },
    { title: 'Overwatch', release_date: 1464134400000,  category_id: 3 },
    { title: 'Titanfall 2', release_date: 1477699200000,  category_id: 3 },
    { title: 'Gears of War 4', release_date: 1476230400000,  category_id: 3 }
  ],
  categories: [
    { id: 1, title: 'Action', },
    { id: 2, title: 'Roleplaying', },
    { id: 3, title: 'Shooter' },
    { id: 4, title: 'Sports' }
  ]
}

// FUNCTIONS

// Figuring out if a category exists

function filterGenreId(genre) {

  const category = response.categories.filter(function(value) {
    return value.title === genre;
  });

  if (category.length > 0) {
    const id = category[0].id;
    return id;
  }
}

// Listing all games of an existing category

function listGames(genre) {

  if (typeof(filterGenreId(genre)) === "number") {
    
    const id = filterGenreId(genre);

    const games = response.games.filter(function(value) {
      return value.category_id === id;
    })
    
    if (games.length > 0) {
      return games;  
    }
  }    
}

// Finding the title of a category_id

function findCategory(num) {

  const category = response.categories.filter(function(value) {

    return value.id === num;

  });

  if (category.length > 0) {
    return category[0].title;
  }

}

// Creating a button that displays all games and their respective categories

function createAllBtn() {

  const btnGroup = document.querySelector(".btn-group");
  const label = document.createElement("label");
  const input = document.createElement("input");
  const span = document.createElement("span");

  // Adding classes

  span.classList.add("btn");
  input.classList.add("btn--all");

  // Adding properties

  input.type = "radio";
  input.name = "button";

  // Assigning text content

  span.textContent = "All";

  // Appending

  btnGroup.appendChild(label);
  label.appendChild(input);
  label.appendChild(span);

  // Event listener

  input.addEventListener("change", function() {
  
    const display = document.querySelector(".items-group");

    display.innerHTML = "";

    const games = response.games;

    if (typeof(games) === "object") {

      games.forEach(function(value) {        
        const ul = document.createElement("ul");
        const li = document.createElement("li");
        const li2 = document.createElement("li");
        ul.classList.add("item");
        li.textContent = value.title;
        li2.textContent = findCategory(value.category_id);
        display.appendChild(ul);
        ul.appendChild(li);
        ul.appendChild(li2);     
      })   
    } 
  })
}

// Creating category-related buttons

function createButtons() {

  response.categories.forEach(function(category){

    const btnGroup = document.querySelector(".btn-group");
    const label = document.createElement("label");
    const input = document.createElement("input");
    const span = document.createElement("span");

    // Adding classes

    span.classList.add("btn");

    // Adding properties

    input.type = "radio";
    input.name = "button";

    // Assigning text content

    span.textContent = category.title;

    // Appending

    btnGroup.appendChild(label);
    label.appendChild(input);
    label.appendChild(span);

    // Event listener
    
    input.addEventListener("change", function(){

      const display = document.querySelector(".items-group");

      display.innerHTML = "";

      const games = listGames(span.textContent);

      if (typeof(games) === "object") {

        games.forEach(function(value) {        
          const ul = document.createElement("ul");
          const li = document.createElement("li");
          const li2 = document.createElement("li");
          ul.classList.add("item");
          li.textContent = value.title;
          li2.textContent = category.title;
          display.appendChild(ul);
          ul.appendChild(li);
          ul.appendChild(li2);     
        })    
      }
    }) 
  })
}

// PAGE LOAD

createAllBtn();
createButtons();
document.querySelector(".btn--all").click();