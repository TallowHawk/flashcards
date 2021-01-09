import { Switch, Route } from 'wouter-preact'
import Create from './pages/Create/Create'
import ListSets from './pages/ListSets/ListSets'
import Practice from './pages/Practice/Practice'
import './main.css'

const Root = () => {
   return (
       <div>
           <Switch>
               <Route path="/create" component={Create} />
               <Route path="/edit/:id">
                   {params => <Create id={params.id} />}
               </Route>
               <Route path="/practice/:id">
                   {params => <Practice id={params.id} />}
               </Route>
               <Route path="/" component={ListSets} />
           </Switch>
       </div>
   )
}

export default Root
