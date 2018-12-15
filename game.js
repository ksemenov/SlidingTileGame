let tiles = Array.from(document.querySelectorAll(".tile"));
let emptyTile = document.querySelector(".tile-empty");

let gridAreas = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];

let movableTilesMap = {
  A: ["B", "D"],
  B: ["A", "C", "E"],
  C: ["B", "F"],
  D: ["A", "E", "G"],
  E: ["B", 'D', 'F', 'H'],
  F: ['C', 'E', 'I'],
  G: ['D', 'H'],
  H: ['E', 'G', 'I'],
  I: ['F', 'H']
}

// takes in an array and returns its suffled version
let shuffle = arr => {
  let tempArr = arr.slice();
  let shuffled = [];
  for (let i = tempArr.length; i > 0; i--){
    let index = Math.floor(Math.random (0, tempArr.length) * tempArr.length);
    shuffled.push(...(tempArr.splice(index, 1)));
  }
  return isSolvable(shuffled) ? shuffled : shuffle(arr);
};

// checks for number of inversions in an array to see if the picture puzzle will be solvable by moving tiles
// for each element it checks to see in how many instances this element is larger than any of the proceeding elements
let isSolvable = arr => {
  //all tiles except the empty one
  let filledTiles = arr.filter( tile => tile.name != "9");
  let numInversions = 0;
  for (let i = 0; i < filledTiles.length-1; i++){
    for (let j = i+1; j < filledTiles.length; j++){
      if (filledTiles[i].name > filledTiles[j].name) numInversions++;
    }
  }
  // puzzle is only solvable if number of inversions is even
  return (numInversions % 2 == 0 && numInversions != 0) ? true : false;
};

let shuffledGrid = function (arr, grid) {
  for (let i = 0; i < arr.length; i++){
    arr[i].style.setProperty("grid-area", grid[i]);
  }
};

// swaps two adjacent tiles and sets new active tiles
let swapTiles = e => {
  let newEmptyTile = e.target.style.getPropertyValue("grid-area")[0];
  e.target.style.setProperty("grid-area", emptyTile.style.getPropertyValue("grid-area")[0]);
  emptyTile.style.setProperty("grid-area", newEmptyTile);
  activateTiles(newEmptyTile);
};

// activates tiles based on an empty tile location
let activateTiles = currentEmptyTile => {
  let movableAreas = movableTilesMap[currentEmptyTile];
  tiles.forEach( (tile) => {
    let gridLocation = tile.style.getPropertyValue("grid-area")[0];
    if (movableAreas.includes(gridLocation)){
      tile.disabled = false;
      tile.classList.add("movable");
    } else {
      tile.disabled = true;
      tile.classList.remove("movable");
    }
  })
};

//
let game = () => {
  let shuffled = shuffle(tiles);

  shuffledGrid(shuffled, gridAreas);
  activateTiles(emptyTile.style.getPropertyValue("grid-area")[0]);

  shuffled.forEach( tile => {
    tile.addEventListener ("click", swapTiles);
  });
};

document.querySelector('#start').addEventListener('click', function() {
  game();
});
