const {shuffleArray} = require('./utils')

let testing1 = [1,2,3,4];
let testing2 = [];
let testing3 = [45,64,1,35,5];

const shuffled = shuffleArray([1, 2, 3, 4, 5, 6, 7])


describe('shuffleArray should', () => {
    // CODE HERE
    
    test('testing the length stays the same', async () => {
        expect(shuffleArray(testing1).length).toBe(testing1.length)
        expect(shuffleArray(testing2).length).toBe(testing2.length)
        expect(shuffleArray(testing3).length).toBe(testing3.length)
    })
    test("doesn't change an array into something else", async () => {
        expect(Array.isArray(shuffleArray(testing1))).toBe(true)
        expect(Array.isArray(shuffleArray(testing2))).toBe(true)
        expect(Array.isArray(shuffleArray(testing3))).toBe(true)
    })
    test('suffled has the same length', () => {
        expect(shuffled.length).toEqual(7)
    })
    
    
    test("testing how long the array is", () => {
        expect(Array.isArray(shuffled)).toEqual(true)
        // console.log(shuffleArray.length)
    })
})
