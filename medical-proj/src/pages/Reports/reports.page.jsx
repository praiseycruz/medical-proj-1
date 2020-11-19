import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { AddPatientWrapper } from '../Patient/styled_components/addpatient.style'
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
            <AddPatientWrapper>
                <div className="page-breadcrumbs">
                    <h1>Reports</h1>

                    <ol className="breadcrumb page-breadcrumb pull-right">
                        <li>
                            <i className="fa fa-home"></i>&nbsp;
                            <Link className="parent-item" to="/dashboard">Home</Link>
                            &nbsp;<i className="fa fa-angle-right">
                            </i>
                        </li>
                        <li className="active">Reports</li>
                    </ol>
                </div>

            </AddPatientWrapper>
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
