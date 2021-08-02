import { useEffect, useState } from "react"
import reddit from "../../apiCalls/reddit"
import classes from './Reddit.module.scss'
import ShowFeeds from "../ShowFeeds/ShowFeeds"

export default function Reddit() {
    const [page, setPage] = useState('anime')
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState('anime')

    useEffect(() => {
        setLoading(true)
        reddit(page)
            .then(res => {
                setPosts(res)
            }).then(() => {
                setLoading(false)
            })
            .catch(err => {
                console.log(err)
                alert(`Can't get feeds 😔😔😔`)
            })
    }, [page])

    const formHandler = event => {
        event.preventDefault()
        setPage(event.target.children[0].value.toLowerCase().slice(3))
    }

    return (
        <div className={classes.reddit}>

            <form onSubmit={formHandler}>
                <input
                    type="text"
                    placeholder="javascript"
                    value={`/r/${search}`}
                    onChange={(event) => setSearch(event.target.value.toLowerCase().slice(3))}

                />
                <button><img src={`${require('../../assests/search.svg').default}`} alt="Search" /></button>
            </form>
            <p style={{ fontFamily: 'sans-serif', fontSize: '1.5rem' }}>/r/{page} | watchers: {posts[0]?.subscribers}</p>
            {
                loading ?
                    <h2 style={{ textAlign: 'center', color: 'white', fontFamily: 'sans-serif' }}>Loading...</h2>
                    :
                    <ShowFeeds feeds={posts} />
            }
        </div>
    )
}
