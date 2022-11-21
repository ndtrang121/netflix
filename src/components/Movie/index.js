import Backdrop from '../Backdrop'

function Movie() {
    return (
        <div
            key={index}
            className={cx('trending-item')}
            style={{ marginRight: `${marginRight}px` }}
            onMouseOver={() => handleOnPopup(data)}
            onMouseOut={handleClearTimer}
            onClick={() => handleOnPopup(data)}
        >
            <Backdrop
                style={{
                    width: `${itemWidth}px`,
                    height: `${itemWidth / 1.777}px`,
                }}
                className={cx('trending-bg')}
                path={data.backdrop_path || data.poster_path}
            />
        </div>
    )
}

export default Movie
