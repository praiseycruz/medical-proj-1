import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { ReportsWrapper } from './styled_components/reports.style'
import { Form as FormFinal, Field } from "react-final-form"
import { Form, Row, Col, Button, Modal, Card, Tabs, Tab } from 'react-bootstrap'
import { patientAction, dashboardAction, practitionerAction, deviceAction } from '../../actions'
import { TableComponent } from '../../components/Table'
import iziToast from 'izitoast';
import { RandNum } from '../../helpers/misc'

class ReportsPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    componentDidMount() {
    }

    componentDidUpdate(prevProps, prevState) {

    }

    render() {

        return (
            <ReportsWrapper>

            </ReportsWrapper>
        )
    }
}

function mapStateToProps(state) {
    const { patient, device } = state
    return {
        patient,
        device
    }
}

const connectedReportsPage = connect(mapStateToProps)(ReportsPage)
export { connectedReportsPage as ReportsPage }
