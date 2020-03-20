const pathToWork = "static/ART for ALL (dragged) 4.png"
const getPixels = require("get-pixels")
const path = require('path')
const chunks = (array, chunk_size) => Array(Math.ceil(array.length / chunk_size)).fill().map((_, index) => index * chunk_size).map(begin => array.slice(begin, begin + chunk_size))
const fs = require('fs')

const typeCheck = [209, 865]

const typeToPixel = {
    Experience: [149, 218, 247, 255],
    Flag: [252, 223, 147, 255],
    Digital:[ 228, 134, 145, 255],
    Sculpture: [161, 206, 135, 255],
    LargeFormat: [146, 146, 203, 255]
}

getAllArtworkTypes()

function getAllArtworkTypes() {

    fs.readdir('./static/', (err, files) => {
        files.forEach(file => {
            if (file.charAt(0) === '.') return

            getPixels(path.join(__dirname, 'static', file), (err, data) => {

                if (err) {
                    console.log("Bad image path")
                    return
                }

                const pixels = chunks(data.data, 4)
                const shape = data.shape
                const artworkType = getPixel(...typeCheck, pixels, shape)

                console.log(file, artworkType)
            })
        })        
    })
}

function pixelToType(pixel) {
    for (type in typeToPixel) {
        if (typeToPixel[])
    }
}

function isWithin(x, bound) {
    return (x - bound) < x < (x + bund)
}

function getPixel(x, y, pixels, shape) {
    return pixels[x + y * shape[0]]
}
