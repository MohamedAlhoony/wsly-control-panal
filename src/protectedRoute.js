import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import auth from './auth'
import Layout from './HOC/layout/layout'

const ProtectedRoute = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={(props) => {
                if (auth.isAuthenticated()) {
                    return (
                        <Layout>
                            <Component {...props} />
                        </Layout>
                    )
                } else {
                    return (
                        <Redirect
                            to={{
                                pathname: '/login',
                                state: {
                                    from: props.location,
                                },
                            }}
                        />
                    )
                }
            }}
        />
    )
}

export default ProtectedRoute