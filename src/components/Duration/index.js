/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState, Fragment } from 'react'
import request from '~/utils/request'

function Duration({ type, id, className }) {
    const [detail, setDetail] = useState([])
    const fetchDetail = useCallback(async () => {
        const dataDetail = await request(`/${type}/${id}`).then((res) => {
            return res
        })
        setDetail(dataDetail)
    }, [id])

    useEffect(() => {
        try {
            fetchDetail()
        } catch (error) {}
    }, [])

    return (
        detail.runtime && (
            <span className={className}>
                {type === 'movie' ? (
                    <Fragment>
                        {Math.floor(detail.runtime / 60)}h {detail.runtime - Math.floor(detail.runtime / 60) * 60}m
                    </Fragment>
                ) : detail.number_of_seasons > 1 ? (
                    <Fragment>{detail.number_of_seasons} Parts</Fragment>
                ) : (
                    <Fragment>{detail.number_of_episodes} Episodes</Fragment>
                )}
            </span>
        )
    )
}

export default Duration
