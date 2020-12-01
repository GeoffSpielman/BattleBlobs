/*
function print(value) {
    const precision = 14
    document.write(math.format(value, precision) + '<br>')
}

function printMatrix(mtx){
    for (var i = 0; i < mtx.length; i++){
        document.write(mtx[i] + '<br>')
    }
}

// functions and constants
print(math.round(math.e, 3))            // 2.718
print(math.derivative('x^2 + x', 'x'))  // 2 * x + 1

// expressions
print(math.evaluate('12 / (2.3 + 0.7)'))    // 4


const ship = [[0, 1, 0], [1, 1, 1], [1, 0, 1]]
document.write("ship: <br>")
printMatrix(ship)

const mapSeg = [[0, 0, 1], [0, 0, 0], [1, 0, 0]]
document.write("map seg: <br>")
printMatrix(mapSeg)

const iSec = math.add(ship, mapSeg)
document.write("intersection: <br>")
printMatrix(iSec)

const maxVal = math.max(iSec)
document.write("max: " + maxVal + "<br>")
*/

alert("main has started")
import {placeShips} from './PlaceShips.js';
placeShips('blah')