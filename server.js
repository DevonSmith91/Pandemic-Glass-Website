const express = require('express')
const path = require('path')
const app = express()
const port = process.env.PORT || 5000

// defining the path for the server to launch the html page form
app.use(express.static(path.resolve('./client/build')))
// telling the page to display home when given an address
app.get('*', (req, res) => {
    res.sendFile(path.resolve('./client/build/index.html'))
})
// giving a port that the server is being hosted on
app.listen(port, () => console.log(`Listening on port: ${port}`))


