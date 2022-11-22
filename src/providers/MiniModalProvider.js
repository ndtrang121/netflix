import { createContext, useState } from 'react'

export const MiniModalContext = createContext()

const MiniModalProvider = ({ children }) => {
    const [infoMovie, setInfoMovie] = useState({})
    const [showModal, setShowModal] = useState(false)
    const [leftItem, setLeftItem] = useState(0)
    const [topItem, setTopItem] = useState(0)
    const [position, setPosition] = useState(0)

    return (
        <MiniModalContext.Provider
            value={{
                infoMovie,
                setInfoMovie,
                showModal,
                setShowModal,
                leftItem,
                setLeftItem,
                topItem,
                setTopItem,
                position,
                setPosition,
            }}
        >
            {children}
        </MiniModalContext.Provider>
    )
}

export default MiniModalProvider
