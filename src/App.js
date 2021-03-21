import "../src/assets/css/style.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Home from "./Components/Home/Home";
import SignUp from "./Components/SignUp/SignUp";
import { createContext, useState } from "react";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";
import Destination from "./Components/Destination/Destination";
import DefaultDestination from "./Components/Destination/DefaultDestination";
export const UserContext = createContext();
export const SignInContext = createContext();
function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  const [isSignIn, setIsSignIn] = useState(false);
  return (
    <div className="App">
      <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
        <SignInContext.Provider value={[isSignIn, setIsSignIn]}>
          <Router>
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/signup">
                <SignUp />
              </Route>
              <PrivateRoute path="/ride/:rideType">
                <Destination />
              </PrivateRoute>
              <PrivateRoute exact path="/ride">
                <DefaultDestination />
              </PrivateRoute>
            </Switch>
          </Router>
        </SignInContext.Provider>
      </UserContext.Provider>
    </div>
  );
}

export default App;
