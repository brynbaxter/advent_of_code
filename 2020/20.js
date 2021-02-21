const fs = require('fs');
const path = require('path');

const getTestInput = () => {
  const input = `Tile 2311:
..##.#..#.
##..#.....
#...##..#.
####.#...#
##.##.###.
##...#.###
.#.#.#..##
..#....#..
###...#.#.
..###..###

Tile 1951:
#.##...##.
#.####...#
.....#..##
#...######
.##.#....#
.###.#####
###.##.##.
.###....#.
..#.#..#.#
#...##.#..

Tile 1171:
####...##.
#..##.#..#
##.#..#.#.
.###.####.
..###.####
.##....##.
.#...####.
#.##.####.
####..#...
.....##...

Tile 1427:
###.##.#..
.#..#.##..
.#.##.#..#
#.#.#.##.#
....#...##
...##..##.
...#.#####
.#.####.#.
..#..###.#
..##.#..#.

Tile 1489:
##.#.#....
..##...#..
.##..##...
..#...#...
#####...#.
#..#.#.#.#
...#.#.#..
##.#...##.
..##.##.##
###.##.#..

Tile 2473:
#....####.
#..#.##...
#.##..#...
######.#.#
.#...#.#.#
.#########
.###.#..#.
########.#
##...##.#.
..###.#.#.

Tile 2971:
..#.#....#
#...###...
#.#.###...
##.##..#..
.#####..##
.#..####.#
#..#.#..#.
..####.###
..#.#.###.
...#.#.#.#

Tile 2729:
...#.#.#.#
####.#....
..#.#.....
....#..#.#
.##..##.#.
.#.####...
####.#.#..
##.####...
##..#.##..
#.##...##.

Tile 3079:
#.#.#####.
.#..######
..#.......
######....
####.#..#.
.#...#.##.
#.#####.##
..#.###...
..#.......
..#.###...`;

  return input;
};

const getInput = () => {
  const input = fs.readFileSync(
    path.resolve(__dirname, '20_input.txt'),
    'utf8'
  );
  const cleanInput = input.replace(/\r/g, '');

  return cleanInput;
};

const reverseString = string => {
  return string.split('').reverse().join('');
};

class Tile {
  constructor(id, data) {
    this.id = id;
    this.data = data;
    this.topEdge = data[0];
    this.bottomEdge = data[data.length - 1];
    this.leftEdge = data.reduce((accum, currVal) => {
      return accum + currVal.split('')[0];
    }, '');
    this.rightEdge = data.reduce((accum, currVal) => {
      return accum + currVal.split('')[currVal.length - 1];
    }, '');
    this.edges = [
      this.topEdge,
      this.bottomEdge,
      this.leftEdge,
      this.rightEdge,
      reverseString(this.topEdge),
      reverseString(this.bottomEdge),
      reverseString(this.leftEdge),
      reverseString(this.rightEdge),
    ];
    this.topEdgeTile = null;
    this.bottomEdgeTile = null;
    this.leftEdgeTile = null;
    this.rightEdgeTile = null;
    this.matches = [];
  }
}

const parseInput = input => {
  const tilesArr = [];
  input.split('\n\n').forEach(tile => {
    const tileSplit = tile.split(/Tile |:\n/);
    const tileId = parseInt(tileSplit[1]);
    const tileVal = tileSplit[2].split('\n');
    let tileObj = new Tile(tileId, tileVal);
    tilesArr.push(tileObj);
  });
  return tilesArr;
};

const useTestInput = false;
let input = useTestInput ? getTestInput() : getInput();
const tiles = parseInput(input);
// console.log(tiles);

const checkSharedEdge = (tileA, tileB) => {
  for (let i = 0; i < tileA.edges.length; i++) {
    if (tileB.edges.indexOf(tileA.edges[i]) > -1) {
      return true;
    }
  }
  return false;
};

const compareTiles = (tileA, tileB) => {
  // console.log(tileA.id, tileB.id);
  if (checkSharedEdge(tileA, tileB)) {
    // console.log(`${tileA.id} matches ${tileB.id}`);
    tileA.matches.push(tileB.id);
    tileB.matches.push(tileA.id);
  }
};

tiles.forEach((tile, index) => {
  for (let i = index; i < tiles.length; i++) {
    if (tile !== tiles[i]) {
      compareTiles(tile, tiles[i]);
    }
  }
});

let partOneAnswer = 1;
tiles.forEach(tile => {
  // console.log(tile.id, tile.matches);
  if (tile.matches.length <= 2) {
    partOneAnswer *= tile.id;
  }
});
console.log('Part 1 Answer:', partOneAnswer);

const getCornerTile = (tiles) => {

}

let arrangedTiles = 