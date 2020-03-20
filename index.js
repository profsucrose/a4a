const pathToWork = "static/ART for ALL (dragged) 4.png"
const getPixels = require("get-pixels")
const path = require('path')
const chunks = (array, chunk_size) => Array(Math.ceil(array.length / chunk_size)).fill().map((_, index) => index * chunk_size).map(begin => array.slice(begin, begin + chunk_size))
const cities = [ "LAX", "MEX", "SAO", "LDN", "IST", "DXB", "MSK", "LAG", "JHB","MUM", "BJC","HKG", "JKI","TYO", "SYD" ]

let pixels, shape

const yCoords = [ 728, 746, 764, 781, 799, 816, 835, 852, 870, 889, 907, 923, 941, 959, 978 ]
const xCoords = [ 364, 380, 397, 418, 435, 452, 470, 489, 507, 524, 544, 561, 577, 597, 614, 632, 650, 667, 686, 701 ]
const typeCheck = [209, 865]

// square is 17x17

getPixels(path.join(__dirname, 'static', 'Corrugation IV (Auerbach).png'), (err, data) => {

    if (err) {
        console.log("Bad image path")
        return
    }

    pixels = chunks(data.data, 4)
    shape = data.shape

    const prices = getPrices()
    console.log(prices)


})

function writeAllPricesToJSON() {

    let allPrices = ``

    allPrices += cities.join(',')

    const fs = require('fs');

    let counter = 0

    fs.readdir('./static/', (err, files) => {
        console.log(files)

        files.forEach(file => {
            if (file.charAt(0) === '.') return

            getPixels(path.join(__dirname, 'static', file), (err, data) => {

                if (err) {
                    console.log("Bad image path")
                    return
                }
        
                pixels = chunks(data.data, 4)
                shape = data.shape
                counter++
                console.log(counter)

                const prices = getPrices()
                console.log(prices)
        
                allPrices[file] = prices

                console.log(allPrices)
                if (counter === files.length - 1) fs.writeFileSync('prices.json', JSON.stringify(allPrices))
        
            })
        })        

    })

}

function getPrices() {

    const pricesForCities = {}

    yCoords.forEach((y, cityIndex) => {

        const pricesForRow = []

        xCoords.forEach((x, price) => {
            const coordToCheck = [
                x,
                y
            ]

            const isPrice = isBlack(getPixel(...coordToCheck))

            if (isPrice)
                pricesForRow.push(price + 1)

        })

        pricesForCities[cities[cityIndex]] = pricesForRow

    })

    return pricesForCities

}

function getArtwork() {
    const typePixel = getPixel(...typeCheck)
}

function getAllArtworkTypes() {

    let allPrices = ``

    allPrices += cities.join(',')

    const fs = require('fs')

    fs.readdir('./static/', (err, files) => {
        console.log(files)

        files.forEach(file => {
            if (file.charAt(0) === '.') return

            getPixels(path.join(__dirname, 'static', file), (err, data) => {

                if (err) {
                    console.log("Bad image path")
                    return
                }
        
                pixels = chunks(data.data, 4)
                shape = data.shape
                counter++
                console.log(counter)

                const prices = getPrices()
                console.log(prices)
        
                allPrices[file] = prices

                console.log(allPrices)
                if (counter === files.length - 1) fs.writeFileSync('prices.json', JSON.stringify(allPrices))
        
            })
        })        

    })

}

function isBlack(pixel) {
    return pixel[0] == 1
}

function getPixel(x, y) {
    return pixels[x + y * shape[0]]
}
