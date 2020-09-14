import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
// import Login from './pages/Login';
import Comidas from './pages/Comidas';
// import Header from './components/Header';
import Explorar from './pages/Explorar';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/explorar" render={(props) => <Explorar {...props} />} />
        <Route exact path="/comidas" render={(props) => <Comidas {...props} />} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
