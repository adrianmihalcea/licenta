const express = require('express')

const app = express()
const port = 8080

app.listen(port, () => {
    console.log('Starting up Backend on port 8080');
})

app.get('/test', (req, res) => {
    res.send({
        'yellow': 'sir'
    })
})
