import classes from './Showgifs.module.scss'
export default function Showgifs({ gifs, refElement }) {
    return (
        <div className={classes.flex}>
            {gifs.map((gif, index) => {
                const { url, title, gifurl, width, height } = gif
                return (

                    <a
                        key={index}
                        href={url}
                        target="_blank"
                        rel="noreferrer"
                        ref={gifs.length - 5 === index ? refElement : null}
                    >
                        <img src={gifurl} width={width} height={height} alt={title} />
                        <p>{title}</p>
                    </a>

                )
            })}
        </div>
    )
}
