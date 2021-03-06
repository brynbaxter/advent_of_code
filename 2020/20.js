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

const rotateMatrix = matrix => {
  return flipMajorDiagonal(matrix.reverse());
};

const flipMajorDiagonal = matrix => {
  return matrix[0].map((column, index) =>
    matrix.map(row => row[index]).join('')
  );
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

  rotate = () => {
    let tileDataMatrix = this.data.map(row => row.split(''));
    let rotatedMatrix = rotateMatrix(tileDataMatrix);

    this.data = rotatedMatrix;
    this.topEdge = rotatedMatrix[0];
    this.bottomEdge = rotatedMatrix[rotatedMatrix.length - 1];
    this.leftEdge = rotatedMatrix.reduce((accum, currVal) => {
      return accum + currVal.split('')[0];
    }, '');
    this.rightEdge = rotatedMatrix.reduce((accum, currVal) => {
      return accum + currVal.split('')[currVal.length - 1];
    }, '');
  };

  flip = () => {
    let flippedMatrix = this.data.map(row => reverseString(row));
    this.data = flippedMatrix;
    this.topEdge = flippedMatrix[0];
    this.bottomEdge = flippedMatrix[flippedMatrix.length - 1];
    this.leftEdge = flippedMatrix.reduce((accum, currVal) => {
      return accum + currVal.split('')[0];
    }, '');
    this.rightEdge = flippedMatrix.reduce((accum, currVal) => {
      return accum + currVal.split('')[currVal.length - 1];
    }, '');
  };
}

const parseInput = input => {
  const tilesObj = new Object();
  input.split('\n\n').forEach(tile => {
    const tileSplit = tile.split(/Tile |:\n/);
    const tileId = parseInt(tileSplit[1]);
    const tileVal = tileSplit[2].split('\n');
    let tileObj = new Tile(tileId, tileVal);
    tilesObj[tileId] = tileObj;
  });
  return tilesObj;
};

const checkSharedEdge = (tileA, tileB) => {
  for (let i = 0; i < tileA.edges.length; i++) {
    if (tileB.edges.indexOf(tileA.edges[i]) > -1) {
      return true;
    }
  }
  return false;
};

const compareTiles = (tileA, tileB) => {
  if (checkSharedEdge(tileA, tileB)) {
    // console.log(`${tileA.id} matches ${tileB.id}`);
    tileA.matches.push(tileB.id);
    tileB.matches.push(tileA.id);
  }
};

const useTestInput = false;
const input = useTestInput ? getTestInput() : getInput();
const tiles = parseInput(input);
const tileKeys = Object.keys(tiles);

tileKeys.forEach((tileKeyA, index) => {
  for (let i = index; i < tileKeys.length; i++) {
    let tileKeyB = tileKeys[i];
    if (tileKeyA !== tileKeyB) {
      compareTiles(tiles[tileKeyA], tiles[tileKeyB]);
    }
  }
});

let partOneAnswer = 1;
tileKeys.forEach(key => {
  // console.log(tiles[key].id, tiles[key].matches);
  if (tiles[key].matches.length <= 2) {
    partOneAnswer *= tiles[key].id;
  }
});
console.log('Part 1 Answer:', partOneAnswer);
