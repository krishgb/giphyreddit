import Feed from "./Feed/Feed"
import classes from './ShowFeeds.module.scss'

export default function ShowFeeds({ feeds }) {

    return (
        <div className={classes.showfeeds}>
            {
                feeds.map(feed =>
                    <Feed
                        key={feed.id}
                        {...feed}
                    />
                )
            }
        </div>
    )
}
