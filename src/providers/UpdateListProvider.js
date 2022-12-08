import { createContext, useState } from 'react'

export const UpdateListContext = createContext()

const UpdateListProvider = ({ children }) => {
    const [updateList, setUpdateList] = useState(false)

    return (
        <UpdateListContext.Provider
            value={{
                updateList,
                setUpdateList,
            }}
        >
            {children}
        </UpdateListContext.Provider>
    )
}

export default UpdateListProvider
