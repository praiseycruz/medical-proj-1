import React from 'react';

class DashboardPage extends React.Component {
    constructor(props) {
        super(props)
    }


    render() {
        return (

        )
    }
}

function mapStateToProps(state) {
    const { } = state
    return {

    }
}

const connectedDashboard = connect(mapStateToProps)(DashboardPage)
export { connectedDashboard as DashboardPage }
