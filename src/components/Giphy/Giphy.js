import { useEffect, useState, useRef, useCallback, useReducer } from 'react'
import { getGifs } from '../../apiCalls/giphy'
import Showgifs from '../Showgifs/Showgifs'
import classes from './Giphy.module.scss'


const ACTIONS = {
    getTrending: 'getTrending',
    setTrending: 'setTrending',
    getSearched: 'getSearched',
    updateSearched: 'updateSearched'
}

const RATING = {
    G: 'g',
    PG: 'pg',
    PG13: 'pg13',
    R: 'r'
}

const trending = [],
    searched = []


const reducer = (state, action) => {
    switch (action.type) {
        case ACTIONS.getTrending:
            trending.splice(0)
            trending.push(...state.trending, ...action.payload)
            return {
                ...state,
                trending: [...new Set(trending)]
            }
        case ACTIONS.setTrending:
            return {
                ...state,
                trending: action.payload
            }
        case ACTIONS.getSearched:
            searched.splice(0)
            searched.push(...action.payload)
            return {
                ...state,
                searched: searched
            }
        case ACTIONS.updateSearched:
            searched.splice(0)
            searched.push(...state.trending, ...action.payload)

            return {
                ...state,
                searched: [...new Set(searched)]
            }

        default:
            return state
    }
}

export default function Giphy() {

    const [state, dispatch] = useReducer(reducer, { trending: [], searched: [] })
    const [searchText, setSearchText] = useState('')
    const [searches, setSearches] = useState([])
    const [rating, setRating] = useState(RATING.G)
    const [loading, setloading] = useState(true)
    const observer = useRef()


    const gifs = async (array, reducerFunction) => {
        setloading(true)
        const $ = await getGifs(array.length, searchText, rating)
        dispatch({
            type: reducerFunction,
            payload: $
        })
        setloading(false)
    }

    useEffect(() => {
        gifs([], ACTIONS.getTrending)
    }, [])

    useEffect(() => {
        !searchText && gifs([], ACTIONS.setTrending)
        searchText && gifs([], ACTIONS.getSearched)
    }, [rating])

    const refElement = useCallback(node => {
        if (loading) return
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                !searchText && gifs(state.trending, ACTIONS.getTrending)
                searchText && gifs(state.searched, ACTIONS.updateSearched)
            }
        })
        if (node) observer.current.observe(node)
    }, [loading])


    const formHandler = (event) => {
        event.preventDefault()
        setSearches([...new Set(searches.concat(searchText))])
        gifs([], ACTIONS.getSearched)
    }



    return (
        <div className={classes.giphy}>
            <form onSubmit={formHandler}>
                {searchText && <input type="button" className={classes.goback} value="Go Back" onClick={() => setSearchText('')} />}
                <div className={classes.ibs}>
                    <input type="text" placeholder="search gifs" className={classes.formInput} value={searchText} onChange={(event) => setSearchText(event.target.value)} />
                    <button><img src={`${require('../../assests/search.svg').default}`} alt="Search" /></button>
                    <select defaultValue={RATING.PG} onChange={(event) => setRating(event.target.value)}>
                        <option value={RATING.G}>G</option>
                        <option value={RATING.PG}>PG</option>
                        <option value={RATING.PG13}>PG 13</option>
                        <option value={RATING.R}>R</option>
                    </select>
                </div>
                {searches.map((search, index) => <span key={index} className={classes.searches} onClick={() => setSearchText(search)}>{search}&nbsp;</span>)}
            </form>


            {!searchText && state.trending.length ? <Showgifs gifs={state.trending} refElement={refElement} /> : null}

            {searchText && state.searched.length ? <Showgifs gifs={state.searched} refElement={refElement} /> : null}

            {loading && <h3 style={{ textAlign: 'center', fontFamily: 'Segoe UI', color: 'white' }}>Loading... </h3>}

        </div>
    )
}
