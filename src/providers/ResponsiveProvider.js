import { useState, createContext, useLayoutEffect } from 'react'
import detectDevice from '~/utils/detectDevice'

export const ResponsiveContext = createContext()

const ResponsiveProvider = ({ children }) => {
    const obj = detectDevice()
    const [widthWin, setWidthWin] = useState(window.innerWidth)
    const [itemsToShow, setItemsToShow] = useState(obj.itemsToShow)
    const [marginRight, setMarginRight] = useState(obj.marginRight)
    const [padding, setPadding] = useState(obj.padding)
    const SCROLLWIDTH = 8
    let paddingGloble = document.querySelector(':root')
    const [device, setDevice] = useState(obj.device)
    useLayoutEffect(() => {
        const handleWindowResize = () => {
            if (window.innerWidth >= 1400) {
                setDevice('desktop')
                setItemsToShow(6)
                setMarginRight(8)
                setPadding(60)
            } else if (window.innerWidth < 1399 && window.innerWidth >= 1100) {
                setDevice('laptop')
                setItemsToShow(5)
                setMarginRight(6)
                setPadding(50)
            } else if (window.innerWidth < 1100 && window.innerWidth >= 800) {
                setDevice('tablet')
                setItemsToShow(4)
                setMarginRight(4)
                setPadding(40)
            } else if (window.innerWidth < 800) {
                setDevice('mobile')
                setItemsToShow(3)
                setMarginRight(2)
                setPadding(30)
            }
            setWidthWin(window.innerWidth)
        }
        window.addEventListener('resize', handleWindowResize)
        return () => window.removeEventListener('resize', handleWindowResize)
    }, [])

    const [itemWidth, setItemWidth] = useState(
        (window.innerWidth -
            padding * 2 -
            SCROLLWIDTH -
            marginRight * itemsToShow) /
            itemsToShow,
    )

    useLayoutEffect(() => {
        setItemWidth(
            (window.innerWidth -
                padding * 2 -
                SCROLLWIDTH -
                marginRight * itemsToShow) /
                itemsToShow,
        )
        paddingGloble.style.setProperty('--PADDING', `${padding}px`)
        paddingGloble.style.setProperty('--WIDTH-WINDOW', `${widthWin}px`)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [widthWin])

    return (
        <ResponsiveContext.Provider
            value={{
                itemWidth,
                device,
                widthWin,
                itemsToShow,
                marginRight,
                padding,
                SCROLLWIDTH,
            }}
        >
            {children}
        </ResponsiveContext.Provider>
    )
}

export default ResponsiveProvider
