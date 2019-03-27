// Select all of the necessary dom elements
const shopping = document.getElementById(`shoppinglist`);
const vegetables = document.getElementById(`vegetables`);
const drygoods = document.getElementById(`drygoods`);
const newitemform = document.getElementById(`newItem`);
const filterForm = document.getElementById(`filterCategories`)

// Array will hold all off the shopping list items
let shoppingList;

// Store all the valid categories
// true categories are actual valid categories, `all` is false because it's just a filter
// This isn't implemented, but could be handy down the road.
const categories = {
    all: false,
    fruit: true,
    veg: true,
    dry: true,
}


// GENERIC PRINTER //////////////////////////////////////////////
// Will clear out the current list to replace with a new list
function printList(theArrayToPrint = shoppingList) {
    
    // Format and output whatever it was told to print (theArrayToPrint)

    // Get the current filter value, so that we only print based on that value set
    let catToShow = filterForm.category.value;

    // If no list was supplied, use the entire shoppingList
    if ( catToShow != 'all' )
        theArrayToPrint = theArrayToPrint.filter(item => item.cat == catToShow)

    // Add the entire list of <li> items to the document
    shopping.innerHTML = theArrayToPrint.map(item => `
        <li class="${item.cat}">
            <button data-id="${item.id}" data-step="-1">-</button>
            <span>${item.qty} ${item.name}</span>
            <button data-id="${item.id}" data-step="1">+</button>
        </li>
    `).join('');
}



// CATEGORY FILTER PRINTER ////////////////////////////////////////
//Print filters from an object
function printFilters(allcats = categories) {
    document.querySelector('.filters').innerHTML = Object.keys(allcats).map((cat, i) => `<li><input type="radio" name="category" value="${cat}" id="filter${i}"><label for="filter${i}">${cat}</label></li>`).join('');
}



// +/- QUANTITY NEEDED ///////////////////////////////////////////
// When the shopping list is clicked, check if it was an +/- button
shopping.addEventListener('click', event => {
    // If not a button, leave the function immediately (return)
    if (!event.target.matches('button') || !event.target.dataset.id) return;

    // Which item are we updating?
    const updateId = parseInt(event.target.dataset.id);

    // Add 1 or subtract 1?
    const step = parseInt(event.target.dataset.step);

    // Update the quantity based on the step value
    // If the quantity will end up less than 0, fail the block (won't reach the second step: the update)
    { (shoppingList[shoppingList.findIndex(item => item.id === updateId)].qty + step >= 0) && 
        (shoppingList[shoppingList.findIndex(item => item.id === updateId)].qty += step) }

    // Save our shoppingList to the browser
    window.localStorage.setItem('shoppingList', JSON.stringify(shoppingList));

    // Print the list
    printList();
});



// ADD A NEW ITEM //////////////////////////////////////////////
// When the form is submit, take the field and add to the list
newitemform.addEventListener('submit', event => {
    // The form was submit, stop the refreshing of the page
    //      (which is what a form wants to do by default)
    event.preventDefault();

    // Get the text from the field
    let groceryItem = newitemform.item.value;
    
    // Clear the text from the field (so we can add a new item again later)
    newitemform.item.value = '';

    // Force focus the input field in case we want to add more
    newitemform.item.focus();

    // Store the category that is currently selected (from filter form)
    let defaultCategory = filterForm.category.value;

    // If the category selected doesn't exist (ex, "all"), default category to: false
    if (defaultCategory == "all")
        defaultCategory = false;

    // Use the current filter category as the default for any new items added
    // Push it into our dataset (Array: shoppingList)
    // Default to 0 quantity, and no category
    shoppingList.push( { id: shoppingList.length, name: groceryItem, qty: 1, cat: defaultCategory } );

    // Save our shoppingList to the browser
    window.localStorage.setItem('shoppingList', JSON.stringify(shoppingList));

    // Print the list
    printList();
});



// RADIO-BUTTON FILTERS //////////////////////////////////////////////
// Listen to the whole form, quit if what was clicked was NOT an input field
filterForm.addEventListener('click', event => {
    
    // If NOT an input (radio button), then "return" (quit immediately)
    if (!event.target.matches('input')) return;

    // We know for sure it was an input (radio), find out the value and set it to localstorage
    window.localStorage.setItem('category', filterForm.category.value);

    // Must be a radio button if we got this far. Go ahead and print
    printList();
});



// STARTUP THE APPLICATION ///////////////////////////////////////////
// When the window is loaded, start the application!
window.addEventListener('load', event => {

    // Load up date from localStorage. If no data was 
    shoppingList = JSON.parse(window.localStorage.getItem('shoppingList')) || [];

    // Add all the filters
    printFilters();

    // Before we print the list for the first time, check if there was a category that we left off with
    // If no category was set, default to "all"
    var theCategory = window.localStorage.getItem('category') || `all`;

    // Find the radio button that matches the category and set it to "checked"
    document.querySelector(`input[value="${theCategory}"]`).setAttribute('checked', 'checked');

    // PRINT THE LIST WHEN THE PAGE LOADS //////////////////////////////////
    // Default to the WHOLE list when a user arrives at the page
    printList();

});
