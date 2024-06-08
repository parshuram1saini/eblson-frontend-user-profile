import React from 'react'
import HomeDashboard from '../HomeDashboard'

function HOC(WrappedComponent) {
    return (props) => {

        const token = localStorage.getItem("token");

        const context = {
            token
        }

        return (
            <>
                <HomeDashboard />
                <WrappedComponent {...props} context={context} />
            </>
        )
    }
}

export default HOC
