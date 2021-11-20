import React, { createContext, useContext } from 'react';
import { Redirect, Route } from 'react-router';
import { UserContext } from '../../App';


// const authContext = createContext();

// function useAuth() {
//     return useContext(authContext);
//   }

const PrivateRoute = ({children, ...rest}) => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    return (
        <Route
            {...rest}
            render={({ location }) =>
                loggedInUser.email ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    );
};

export default PrivateRoute;