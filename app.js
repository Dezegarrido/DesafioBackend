import ProductManager from './index.js'

const express = require('express')
const app = express()

app.get('/', (req, res) => {
    return res.send('Bienvenidos')
})

app.get('/products', (req,res) => {
    const limit = parseInt(req.query.limit)

    if(!limit){
        return res.send(getProducts())
    }

    const productsLimited = product.filter(product => product.limit === limit)

    return res.send(productsLimited)
})

app.get('/products/:pid', (req,res) => {
    const pid = parseInt(req.params.productId)

    console.log(req.query)

    const productId = products.find(product => product.id === pid)

    return res.send(productId)
})