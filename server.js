const express = require('express')
const path = require('path')
const app = express()
const {bots, playerRecord} = require('./data')
const {shuffleArray} = require('./utils')


// see all bots doesnt work when you have 
// botsArr was not defined but then I found there was no botsArr so I found the bot arr in data.js and changed botsArr in the shuffle function
// I tested whether or not app get bots were working by console logging bots
// I tried to look and see why winner was not increasing and if it was defined 
// I looked for some text and saw that the index.js had a wins button and looked for other spots it existed and found that there was a wins
// when I 


const ex = (thing1, thing2) => {
    app.use(thing1, express.static(path.join(__dirname, thing2)))
}


ex("/", "public");
ex("/styles", "public/index.css");
ex("/js", "public/index.js");


app.use(express.json())

let Rollbar = require("rollbar")
let rollbar = new Rollbar({
    accessToken: '65hh07432gg05050y0h85g68g87b8765'/* I am not give you that im no noobe */,
    captureUncaught: true,
    captureUncaughtRejections: true
})

app.get('/api/robots', (req, res) => {
    try {
        res.status(200).send(bots)
    } catch (error) {
        console.log('ERROR GETTING BOTS', error)
        res.sendStatus(400)
    }
})

app.get('/api/robots/five', (req, res) => {
    try {
        let shuffled = shuffleArray(bots)
        let choices = shuffled.slice(0, 5)
        let compDuo = shuffled.slice(6, 8)
        res.status(200).send({choices, compDuo})
    } catch (error) {
        console.log('ERROR GETTING FIVE BOTS', error)
        res.sendStatus(400)
    }
    // console.log(`${bots}`)
})

app.post('/api/duel', (req, res) => {
    try {
        // getting the duos from the front end
        let {compDuo, playerDuo} = req.body

        // adding up the computer player's total health and attack damage
        let compHealth = compDuo[0].health + compDuo[1].health
        let compAttack = compDuo[0].attacks[0].damage + compDuo[0].attacks[1].damage + compDuo[1].attacks[0].damage + compDuo[1].attacks[1].damage
        
        // adding up the player's total health and attack damage
        let playerHealth = playerDuo[0].health + playerDuo[1].health
        let playerAttack = playerDuo[0].attacks[0].damage + playerDuo[0].attacks[1].damage + playerDuo[1].attacks[0].damage + playerDuo[1].attacks[1].damage
        
        // calculating how much health is left after the attacks on each other
        let compHealthAfterAttack = compHealth - playerAttack
        let playerHealthAfterAttack = playerHealth - compAttack

        // comparing the total health to determine a winner
        if (compHealthAfterAttack > playerHealthAfterAttack) {
            playerRecord.losses++
            res.status(200).send('You lost!')
            // console.log(wins)
        } else {
            playerRecord.wins++
            res.status(200).send('You won!')
            // console.log(wins)
        }
    } catch (error) {
        console.log('ERROR DUELING', error)
        res.sendStatus(400)
    }
})

app.get('/api/player', (req, res) => {
    try {
        res.status(200).send(playerRecord)
    } catch (error) {
        console.log('ERROR GETTING PLAYER STATS', error)
        res.sendStatus(400)
    }
})

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
