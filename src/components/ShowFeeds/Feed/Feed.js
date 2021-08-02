import classes from './Feed.module.scss'

export default function Feed(props) {
    const { title, author, authorPage, date, ups, pageUrl, thumbnail, media, vid } = props

    return (
        <div className={classes.feed}>
            {/* <div className={(!thumbnail && !media && !vid) && classes.nothing}> */}

            {/* Title and date */}
            <a
                className={classes.title}
                href={pageUrl}
                target="_blank"
                rel="noreferrer"
            >{title}
                <small>{date}</small>
            </a>

            {/* video || embedded video || thumbnail */}
            {
                vid ?
                    <div className={classes.media}>

                        <video
                            title={title}
                            width="356"
                            height="200"
                            src={vid}
                            frameBorder="0"
                            controls
                            // muted={false}
                            // muted
                            allowFullScreen></video>
                    </div>
                    :
                    (media ?
                        <div className={classes.media} dangerouslySetInnerHTML={{ __html: media }}></div>
                        :
                        thumbnail &&
                        (
                            <div className={classes.media}>
                                <img src={thumbnail} alt="" loading="lazy" />
                            </div>
                        )
                    )
            }


            {/* Author */}
            <div className={classes.column}>
                <label className={classes.author}>/u/
                    <a
                        className={classes.authorPage}
                        href={authorPage}
                        target="_blank"
                        rel="noreferrer"
                    >{author}
                    </a>
                </label>


                {/* score */}
                <p className={classes.up}>
                    <img src={`${require('../../../assests/arrow.svg').default}`} style={{ width: '15px', color: 'red' }} alt="Votes" />
                    {ups}
                </p>
            </div>
        </div>
    )
}
