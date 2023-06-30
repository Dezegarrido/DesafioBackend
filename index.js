const fs = require('fs')

class ProductManager {
    constructor(path) {
        this.products = []
        this.path = path
    }

    addProduct(data) {
        if (!data.title
            || !data.description
            || !data.price
            || !data.thumbnail
            || !data.code
            || !data.stock) {
            return "Error: Campos incorrectos"
        }

        const productExists = this.products.findIndex((product) => product.code === data.code)

        if (productExists !== -1) {
            console.log("El código de producto ya esta en uso")
            return "Error: El código de producto ya esta en uso."
        }

        const product = {
            id: this.products.length + 1,
            title: data.title,
            description: data.description,
            price: data.price,
            thumbnail: data.thumbnail,
            code: data.code,
            stock: data.stock
        }

        const productString = JSON.stringify(product, null, 2)
        this.products.push(productString)

        return product
    }

    getProducts() {

        fs.promises.readFile('./products.json', this.products)
            .then((productosArchivo) => {
                const productosObjeto = JSON.parse(productosArchivo)
                console.log(productosObjeto)
            })
            .catch((e) => {
                console.log({ e })
            })

        return this.products
    }

    getProductById(id) {

        fs.promises.readFile('./products.json', this.products)
            .then((productosArchivo) => {
                const productosObjeto = JSON.parse(productosArchivo)
                const productExists = productosObjeto.find(product => product.id === id)
                if (!productExists) {
                    const error = 'Not found'
                    console.log(error)
                    return error
                }
            })
        return productExists
    }

    updateProduct(id, data){
        fs.promises.readFile('./products.json', this.products)
            .then((productosArchivo) => {
                const productosObjeto = JSON.parse(productosArchivo)
                const productExists = productosObjeto.find((product) => product.id === id)
                if (!productExists) {
                    const error = 'Not found'
                    console.log(error)
                    return error
                }

                productExists.title = data.title
                productExists.description = data.description
                productExists.price = data.price
                productExists.thumbnail = data.thumbnail
                productExists.code = data.code
                productExists.stock = data.stock

                fs.promises.writeFile('./products.json', this.products)
                    .then(() => {
                        return fs.promises.readFile('./products.json' , 'utf-8')
                    })
            })
            .catch((err) => {

            })
    }

    deleteProduct(id) {

        fs.promises.readFile('./products.json', this.products)
            .then((productosArchivo) => {
                const productosObjeto = JSON.parse(productosArchivo)
                const productExists = productosObjeto.find((product) => product.id === id)
                if (!productExists) {
                    const error = 'Not found'
                    console.log(error)
                    return error
                }
                fs.promises.writeFile('./products.json', this.products != productExists)
                    .then(() => {
                        return fs.promises.readFile('./products.json' , 'utf-8')
                    })
            })
            .catch((err) => {

            })
    }
}

const archivo = './products.json'

const manager = new ProductManager('./products.json')

fs.promises.writeFile(archivo, manager)
    .then(() => {
        return fs.readFile(archivo, 'utf-8')
    })
    .catch(err => {

    })

const body = {
    "title": "Producto 1",
    "description": "Desc prod1",
    "price": 10.2,
    "thumbnail": "www.image.com",
    "code": "qwerty",
    "stock": 100
}

manager.addProduct(body)

const body2 = {
    "title": "Producto 2",
    "description": "Desc prod2",
    "price": 10.2,
    "thumbnail": "www.image.com",
    "code": "qwerty2",
    "stock": 100
}

manager.addProduct(body2)

manager.addProduct(body)

console.log(manager.getProducts())

const product2 = manager.getProductById(2)
const product1 = manager.getProductById(1)
const product3 = manager.getProductById(3)

console.log({
    product1,
    product2,
    product3
})

manager.deleteProduct(2)
