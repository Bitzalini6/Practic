const search = document.querySelector(".search input");
const addForm = document.querySelector(".add"); //select the form field "add new"

const list = document.querySelector(".todos"); //selecting the ul list that contains the "stuff to do"
const generateTemplate = (todo) => {
  //defining the generateTemplate function
  const html = `<li class="list-group-item d-flex justify-content-between align-items-center">
    <span>${todo}</span>
    <i class="far fa-trash-alt delete"></i>
  </li>`; //a li element template and inside it what the user types into the form field
  list.innerHTML += html; //injecting the template with "innerHTML" into the page
};

addForm.addEventListener("submit", (e) => {
  //attaching a submit event to the form field "add new"
  e.preventDefault(); //prevent reloading the page by default
  const todo = addForm.add.value.trim(); // getting what the user types in to the form field "add new" and adding ".trim" to trim the whitespace
  if (todo.length) {
    //if the inserted value has only spaces don`t generate template
    generateTemplate(todo); //generate template function defined at line 4 when submit event happens
    addForm.reset(); //reset the form field every time a value is submitted
  }
});

//delete added stuff
list.addEventListener("click", (e) => {
  //adding event listener set to action "click" to the list selected at line 3
  if (e.target.classList.contains("delete")) {
    //using "target" method to target only the elements with the class 'delete' in the list
    e.target.parentElement.remove(); //remove parent element which is the <li> tag with the "remove" method
  }
});

const filterTodos = (term) => {
  //the "term" parameter is gonna be what the user types in

  Array.from(list.children) //turning the HTML collection into an array so we can  use methods on the array
    .filter((todo) => !todo.textContent.includes(term)) //returning the textContent of each of the li tags,using the "includes" method to see if includes the "term" in and then add "!" to reverse it and keep only the items in the array if they don`t include the "term"
    .forEach((todo) => todo.classList.add("filtered")); //adding a class for every item that does not includes the "term"

  Array.from(list.children)
    .filter((todo) => todo.textContent.includes(term)) //finding the <li> elements that includes the "term"
    .forEach((todo) => todo.classList.remove("filtered")); //removing the class used to hide the elements that don`t includes the "term" so they can ne displayed
};

//keyup event
search.addEventListener("keyup", () => {
  //adding a eventListener with 'keyup' to detect when a button is pressed and released
  const term = search.value.trim(); // injecting the value typed on the the search field at that moment in the const "term" and trim the whitespace with ".trim" method
  filterTodos(term); //calling the function "filterTodos" and use term as an argument
});
