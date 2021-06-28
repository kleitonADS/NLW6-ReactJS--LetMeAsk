import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Home } from './pages/Home';
import { NewRoom } from './pages/NewRoom';
import { Room } from './pages/Room'
import { AuthContextProvider }  from './contexts/AuthContext'
import './styles/global.scss'
import { AdminRoom } from './pages/AdminRoom';


function App() {

  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Switch>
          <Route path= "/" exact component={Home} />
          <Route path= "/room/new" component={NewRoom} />
          <Route path= "/room/:id" component={Room} />
          <Route path= "/admin/room/:id" component={AdminRoom} />
        </Switch>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
