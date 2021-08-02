import axios from 'axios'

const api = process.env.REACT_APP_GIPHY_KEY


const getGifs = async (offset = 0, query = "", rating = 'g') => {
    const uri = !query.trim().length ?
        `https://api.giphy.com/v1/gifs/trending?api_key=${api}&limit=20&offset=${offset}&rating=${rating}&lang=en`
        :
        `https://api.giphy.com/v1/gifs/search?api_key=${api}&q=${query.trim()}&limit=20&offset=${offset}&rating=${rating}&lang=en`

    const array = []
    const m = await axios.get(uri)
    const { data } = await m.data

    for await (let i of data) {
        const { url, title, images, id } = i
        const { fixed_height_downsampled } = images
        const { height, width } = fixed_height_downsampled
        const state = { url, id, title, height, width, gifurl: fixed_height_downsampled.url }
        array.push(state)
    }

    return array
}

export { getGifs }