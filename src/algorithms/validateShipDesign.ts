export function validateShipDesign(shipOffsets: number[][], numSegsInShip: number): {'message': string; 'valid': boolean} {

    //'traversed index' and 'traversed segments of ship'
    let travIdx = 0;
    let travSegs = [shipOffsets[0]];

    while (travIdx < travSegs.length) {
        let curSeg = travSegs[travIdx];

        //possible to go 'up'  AND 'up' isin't already in the travSegs list AND 'up' is part of the ship
        if (
            curSeg[0] > 0 &&
            !travSegs.some(
                (entry) => entry[0] === curSeg[0] - 1 && entry[1] === curSeg[1]
            ) &&
            shipOffsets.some(
                (entry) => entry[0] === curSeg[0] - 1 && entry[1] === curSeg[1]
            )
        ) {
            travSegs.push([curSeg[0] - 1, curSeg[1]]);
        }
        //possible to go 'down'  AND 'down' isin't already in the travSegs list AND 'down' is part of the ship
        if (
            curSeg[0] < 3 &&
            !travSegs.some(
                (entry) => entry[0] === curSeg[0] + 1 && entry[1] === curSeg[1]
            ) &&
            shipOffsets.some(
                (entry) => entry[0] === curSeg[0] + 1 && entry[1] === curSeg[1]
            )
        ) {
            travSegs.push([curSeg[0] + 1, curSeg[1]]);
        }
        //possible to go 'left'  AND 'left' isin't already in the travSegs list AND 'left' is part of the ship
        if (
            curSeg[1] > 0 &&
            !travSegs.some(
                (entry) => entry[0] === curSeg[0] && entry[1] === curSeg[1] - 1
            ) &&
            shipOffsets.some(
                (entry) => entry[0] === curSeg[0] && entry[1] === curSeg[1] - 1
            )
        ) {
            travSegs.push([curSeg[0], curSeg[1] - 1]);
        }
        if (
            curSeg[1] < 3 &&
            !travSegs.some(
                (entry) => entry[0] === curSeg[0] && entry[1] === curSeg[1] + 1
            ) &&
            shipOffsets.some(
                (entry) => entry[0] === curSeg[0] && entry[1] === curSeg[1] + 1
            )
        ) {
            travSegs.push([curSeg[0], curSeg[1] + 1]);
        }
        travIdx++;
    }
    //valid ship
    if (travIdx === numSegsInShip) {
        let possibleConfirmations = ["Looks great captain!", "She's a beauty!", "What a gorgeous vessel!", "Heck ya, flawless!", "What a gem! Beautiful!", "This ship is downright swanky!", "You've discovered the optimal ship", "Creative! Looks great!", "The S.S. Magnificent right here", "Looks like a winner!", "Perfect, just perfect!", "Love it!", "Best ship I've ever seen"];
        let randIndex = Math.floor(Math.random() * possibleConfirmations.length);
        return {'message': possibleConfirmations[randIndex], 'valid': true};
    } else {
        return {'message': "All segments must be connected by shared edges", 'valid': false};
    }

}