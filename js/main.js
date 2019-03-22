const shopping = document.getElementById(`shoppinglist`);
const vegetables = document.getElementById(`vegetables`);
const drygoods = document.getElementById(`drygoods`);
const newitemform = document.getElementById(`newItem`);
const filterForm = document.getElementById(`filterCategories`)

const FRUIT = `fruit`;
const VEG = `veg`;
const DRY = `dry`;


let shoppingList;


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
    shopping.innerHTML = theArrayToPrint.map(item => `<li class="${item.cat}">${item.qty} ${item.name}</li>`).join('');
}



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
    shoppingList.push( { name: groceryItem, qty: 0, cat: defaultCategory } );

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
})



// WHEN THE WINDOW HAS LOADED ALL OF ITS VARIABLES, ETC... ////////////
window.addEventListener('load', event => {

    // const shoppingList = [
    //     { name: `apples`, qty: 3, cat: FRUIT },
    //     { name: `bananas`, qty: 0, cat: FRUIT },
    //     { name: `cucumbers`, qty: 3, cat: VEG },
    //     { name: `strawberries`, qty: 10, cat: FRUIT },
    //     { name: `kraft dinner`, qty: 0, cat: DRY },
    //     { name: `eggplant`, qty: 2, cat: VEG },
    // ];

    // Load up date from localStorage. If no data was 
    shoppingList = JSON.parse(window.localStorage.getItem('shoppingList')) || [];

    // Before we print the list for the first time, check if there was a category that we left off with
    // If no category was set, default to "all"
    var theCategory = window.localStorage.getItem('category') || `all`;

    // Find the radio button that matches the category and set it to "checked"
    document.querySelector(`input[value="${theCategory}"]`).setAttribute('checked', 'checked');

    // PRINT THE LIST WHEN THE PAGE LOADS //////////////////////////////////
    // Default to the WHOLE list when a user arrives at the page
    printList();

});

