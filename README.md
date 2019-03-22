# Shopping List

A simple shopping list (and eventual... maybe) recipe builder.

## Work Completed

### March 8, 2019
- Created a data set
- Established some categories
- Filtered the data by category
- Map the data to formatted HTML
- Output the data into the document
- Colourized the categories using CSS
- Filtering by category

### March 15, 2019
- Add new items to the shopping list
- Make filtering more efficient
    - Change filtering to radio buttons (or store settings in an object) so they don't get ignored on reprint
- Made it prettier

### March 22, 2019
- Default an item to be included in the category being filtered presently
- Setup `localStorage` to:
    - Track the category we're currently filtering for so we always come back to the same filter
    - Encode/decode our list (`Array`) to a string and store it locally


## Work To Do
- Turn category variables into an array
    - _Could_ modify the data set to include categories
    - Create UI options from the Array
- Make items clickable to signify they have been purchased
- Make quantitied updatable (stepper, or swipe?)
- Sort the list somehow
- Validate the input, show an error
- Click uncategorized to slide out a category selection
- Wrap this in a PWA wrapper and download it to our phone