import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Destination from './components/Destination/Destination';
import Contact from './components/Contact/Contact';
import Login from './components/Login/Login';
import Blog from './components/Blog/Blog';
import { createContext, useState } from 'react';
import Book from './components/Book/Book';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <p>Name: {loggedInUser.name}</p>
    <Router>
      <Header />
      <Switch>
        <Route path="/home">
          <Home />
        </Route>
        <Route path="/destination">
          <Destination />
        </Route>
        <Route path="/contact">
          <Contact />
        </Route>
        <Route path="/blog">
          <Blog/>
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <PrivateRoute path="/book/:ticketType">
          <Book/>
        </PrivateRoute>
        <Route exact patch="/">
          <Home/>
        </Route>
      </Switch>
    </Router>
    </UserContext.Provider>
  );
}

export default App;
