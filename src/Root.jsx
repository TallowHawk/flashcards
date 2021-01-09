import { Switch, Router, Route } from 'wouter-preact'
import Create from './pages/Create/Create'
import ListSets from './pages/ListSets/ListSets'
import Practice from './pages/Practice/Practice'
import './main.css'
import { useEffect, useState } from 'preact/hooks'

// returns the current hash location in a normalized form
// (excluding the leading '#' symbol)
const currentLocation = () => {
    return window.location.hash.replace(/^#/, '') || '/'
}

const navigate = (to) => (window.location.hash = to)

const useHashLocation = () => {
    const [loc, setLoc] = useState(currentLocation())

    useEffect(() => {
        // this function is called whenever the hash changes
        const handler = () => setLoc(currentLocation())

        // subscribe to hash changes
        window.addEventListener('hashchange', handler)
        return () => window.removeEventListener('hashchange', handler)
    }, [])

    return [loc, navigate]
}

const Root = () => {
    return (
        <div>
            <Router hook={useHashLocation}>
                <Switch>
                    <Route path="/create" component={Create}/>
                    <Route path="/edit/:id">
                        {params => <Create id={params.id}/>}
                    </Route>
                    <Route path="/practice/:id">
                        {params => <Practice id={params.id}/>}
                    </Route>
                    <Route path="/" component={ListSets}/>
                </Switch>
            </Router>
        </div>
    )
}

export default Root
