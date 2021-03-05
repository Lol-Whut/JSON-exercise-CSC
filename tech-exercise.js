//My understanding of the problem:
  //Overview: This program is a midpoint between a database and a storefront. The JSON that we get from the database will be unordered. As the product categories on the storefront are nested (i.e. Menswear has subcategory Accessories, which has subcategory Watches), we need to make sure that the JSON is rearranged so that the subcategories appear in the list only after their parent category has been included; we can use each category's id and parent_id to do this programmatically. 
  //Input: Unordered list of dictionaries
  //Output: Ordered list of dictionaries


module.exports = function sortCategoriesForInsert (input) {
  //initialize result variable that will ultimately be returned
  const result = [];
  //initialize variable (a set) where id's of categories already added to result will be stored
  const addedToResult = new Set();

  //recursive inner function to add categories to result and update addedToResult
  function addCategories (data) {
    //if data us empty, return out of recursive function
    if (data.length <= 0) {
      return; 
    } else {
      //else, iterate through data array
      for (let i = 0; i < data.length; i++) {
        //if the parent_id of the current element is null, or the addedToResult set includes the parent id:
        if (data[i]['parent_id'] === null || addedToResult.has(data[i]['parent_id'])) {
          //push the current element to the array
          result.push(data[i]);
          //add the current element id to the addedToResult set
          addedToResult.add(data[i]['id']);
          //reset data so that the current element is deleted (thus making the dataset shorter to iterate through next time)
          data = data.slice(0, i).concat(data.slice(i+1));
        }
      }
      //once the current iteration through data is complete, recursively call the addCategories function on the updated data
      return addCategories(data);
    }
  }

  //call addCategories on input
  addCategories(input);
  
  //return result (which should have been filled in order by addCategories function)
  return result;
}

//for reference, some of my testing process is included below:

//example JSON input (expanded from sample to include multiple root categories)
// const inputJSON = [
//   {
//     "name": "Blouses",
//     "id": 4,
//     "parent_id": 3
//   },
//   {
//     "name": "Accessories",
//     "id": 1,
//     "parent_id": 20,
//   },
//   {
//     "name": "Belts",
//     "id": 7,
//     "parent_id": 1
//   },
//   {
//     "name": "Watches",
//     "id": 57,
//     "parent_id": 1
//   },
//   {
//     "name": "Men",
//     "id": 20,
//     "parent_id": null,
//   },
//   {
//     "name": "Clothes",
//     "id": 3,
//     "parent_id": 2
//   },
//   {
//     "name": "Women",
//     "id": 2,
//     "parent_id": null
//   }
// ]


// console.log(sortCategoriesForInsert(inputJSON));