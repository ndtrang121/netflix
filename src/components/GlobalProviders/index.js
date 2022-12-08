import { AuthContextProvider } from '~/components/Auth'
import SearchContextProvider from '~/components/SearchContextProvider'
import ResponsiveProvider from '~/providers/ResponsiveProvider'
import MiniModalProvider from '~/providers/MiniModalProvider'
import UpdateListProvider from '~/providers/UpdateListProvider'

function GlobalProviders({ children }) {
    return (
        <AuthContextProvider>
            <ResponsiveProvider>
                <UpdateListProvider>
                    <MiniModalProvider>
                        <SearchContextProvider>
                            {children}
                        </SearchContextProvider>
                    </MiniModalProvider>
                </UpdateListProvider>
            </ResponsiveProvider>
        </AuthContextProvider>
    )
}

export default GlobalProviders
