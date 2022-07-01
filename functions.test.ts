const {shuffleArray} = require('./utils')

describe('shuffleArray should', () => {
    // CODE HERE
    const robotz = [{id: 1, name: "bot"}, {id: 2, name: "robot"}]

    test('there should be two ids from users', () => {
        expect(robotz)
        .toEqual(
            expect.arrayContaining([
                expect.objectContaining({id: 1}), expect.objectContaining({id: 2})
            ])
        )
    })
})
    
