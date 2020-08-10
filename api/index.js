const express = require('express')
const app = express()
const port = 3000

//sanity end point
app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})


// const express = require('express')
// const app = express()
// const axios = require('axios')

// const APIKEY = 'ed024fbf-2596-4b20-8393-2aac31525cbd'

// app.use(express.json()) // support json encoded bodies


// // Movie endpoint
// app.get('/movie', (req, res) => {
//     const movieName = req.query.name
//     axios
//         .get(
//             `https://search.uitdatabank.be/offers/?embed=true&q=terms.label:Film AND name.nl:(${movieName})&apiKey=${APIKEY}&limit=200`
//         )
//         .then((response) => {
//             res.json(response.data)
//         })
//         .catch((err) => {
//             console.log('err', err)
//         })
// })

// // Offer endpoint
// app.get('/offer', (req, res) => {
//     const id = req.params.id
//     axios
//         .get(
//             `https://search.uitdatabank.be/offers/?embed=true&q=id:${id}&apiKey=${APIKEY}`
//         )
//         .then((response) => {
//             res.json(response.data)
//         })
//         .catch((err) => {
//             console.log(err)
//         })
// })

// // Movies endpoint
// app.get('/movies', (req, res) => {
//     axios
//         .get(
//             `https://search.uitdatabank.be/offers/?embed=true&q=terms.label:Film AND workflowStatus:APPROVED&apiKey=${APIKEY}&limit=200`
//         )
//         .then((response) => {
//             res.json(response.data)
//         })
//         .catch((err) => {
//             console.log(err)
//         })
// })

// // Venues endpoint
// app.get('/venues', (req, res) => {
//     axios
//         .get(
//             `https://search.uitdatabank.be/places/?embed=true&q=terms.label:Bioscoop&apiKey=${APIKEY}&limit=200`
//         )
//         .then((response) => {
//             res.json(response.data)
//         })
//         .catch((err) => {
//             console.log(err)
//         })
// })

// module.exports = {
//     path: '/api/',
//     handler: app
// }
