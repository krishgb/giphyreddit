import axios from 'axios'



const reddit = async (redditPage) => {
    const objArr = []

    const { data } = await axios.get(`https://www.reddit.com/r/${redditPage}/new.json?sort=new&limit=50`)
    const { children } = await data.data
    children.forEach(child => {
        const { title, author, id, created, permalink, score, ups, selftext, subreddit_subscribers, thumbnail, media_embed, media } = child.data
        const subscribers = (num) => {
            const n = num.toString()
            const l = n.length

            if (l < 4) return n
            switch (l) {
                case 9:
                    return n[0] + n[1] + n[2] + 'm'
                case 8:
                    return n[0] + n[1] + 'm'
                case 7:
                    return n[0] + '.' + n[1] + 'm'
                case 6:
                    return n[0] + n[1] + n[2] + 'k'
                case 5:
                    return n[0] + n[1] + 'k'
                default:
                    return n[0] + 'k'
            }
        }


        // got from https://stackoverflow.com/questions/1248849/converting-sanitised-html-back-to-displayable-html
        function htmlDecode(input) {
            if (!input) return null
            var e = document.createElement('div');
            e.innerHTML = input;
            return e.childNodes[0].nodeValue;
        }


        const obj = {
            title,
            author,
            authorPage: `https://reddit.com/user/${author}`,
            id,
            date: new Date(created * 1000).toLocaleDateString(),
            pageUrl: `https://reddit.com${permalink}`,
            score,
            ups,
            text: selftext,
            subscribers: subscribers(subreddit_subscribers),
            thumbnail,
            media: htmlDecode(media_embed?.content),
            vid: media?.reddit_video?.fallback_url
        }

        objArr.push(obj)
    })

    return objArr
}

export default reddit