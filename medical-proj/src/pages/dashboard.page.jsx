import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { DashboardWrapper } from './styled_components/dashboard.style'
import { Form, FormControl, Row, Col, Button, Card } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsers, faExclamationTriangle } from "@fortawesome/free-solid-svg-icons"
import { dashboardAction, patientAction } from '../actions'
import { TableComponent } from '../components/Table'
import { dataOrDefault } from '../helpers'

class DashboardPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            count: 0,
            hasGetPatientCount: false,
            searchValue: null,
            patientsData: [],
            cols: [
                {
                    title: 'Patient Name',
                    key: 'name',
                    render: colData => {
                        return <span>{ colData.resource.name[0].family + " " + colData.resource.name[0].given }</span>;
                    }
                },
                {
                    title: 'DOB',
                    key: 'dob',
                    render: colData => {
                        return <span>{colData.resource.birthDate}</span>;
                    }
                },
                {
                    title: 'Gender',
                    key: 'gender',
                    render: colData => {
                        return <span>{colData.resource.gender}</span>;
                    }
                },
                {
                    title: 'Care Manager',
                    key: 'careManager',
                    render: colData => {
                        return <span>{ dataOrDefault(colData => colData.resource.generalPractitioner.reference) }</span>;
                    }
                },
                {
                    title: 'PCP',
                    key: 'pcp',
                    render: colData => {
                        return <span>{colData.pcp}</span>;
                    }
                },
                {
                    title: '',
                    key: 'edit',
                    render: colData => {
                        return <span><button>Info</button></span>;
                    }
                }
            ]
        }
    }

    componentDidMount() {
        const { dispatch } = this.props
        dispatch(dashboardAction.count())
        dispatch(patientAction.getAll(10, 0))
    }

    componentDidUpdate() {
        let { dashboardPatientCount, patient } = this.props
        let { hasGetPatientCount } = this.state

        if (typeof dashboardPatientCount !== 'undefined' && dashboardPatientCount !== null) {
            let { count } = dashboardPatientCount

            if (typeof count !== 'undefined' && count !== null) {
                if (typeof count.count !== 'undefined' && count.count !== null) {
                    let totalNumberOfPatients = count.count

                    if (!hasGetPatientCount && typeof patient !== 'undefined'
                        && typeof patient.getAll !== 'undefined'
                        && typeof patient.getAll.patients !== 'undefined'
                        && typeof patient.getAll.patients.entry !== 'undefined'
                    ) {

                        this.setState({
                            count: totalNumberOfPatients,
                            hasGetPatientCount: true,
                            patientsData: patient.getAll.patients.entry,
                        })
                    }
                }
            }
        }
    }

    _searchHandler = (event) => {
        let searchData = event.target.value

        this.setState({
            searchValue: event.target.value.toLowerCase()
        })
    }

    render() {
        console.log("HAHAAAHAHAH", this.state.patientsData);
        return (
            <DashboardWrapper>
                <div className="dashboard-content">
                    <div className="page-breadcrumbs">
                        <h1>Dashboard</h1>

                        <ol className="breadcrumb page-breadcrumb pull-right">
							<li>
                                <i className="fa fa-home"></i>&nbsp;
                                <Link className="parent-item" to="/dashboard">Home</Link>
                                &nbsp;<i className="fa fa-angle-right">
                                </i>
							</li>
							<li className="active">Dashboard</li>
						</ol>
                    </div>

                    <div className="state-overview">
                        <div className="row">
                            <div className="col-xl-4 col-md-6 col-12">
                                <div className="info-box bg-blue">
                                    <span className="info-box-icon push-bottom">
                                        <FontAwesomeIcon size="sm" className="icon" icon={faUsers} />
                                    </span>

                                    <div className="info-box-content">
                                        <span className="info-box-text">Total RPM patients</span>
                                        <span className="info-box-number">{ this.state.count }</span>
                                    </div>
                                </div>
                            </div>

                            <div className="col-xl-4 col-md-6 col-12">
                                <div className="info-box bg-red">
                                    <span className="info-box-icon push-bottom">
                                        <FontAwesomeIcon size="sm" className="icon" icon={faExclamationTriangle} />
                                    </span>

                                    <div className="info-box-content">
                                        <span className="info-box-text">New critical alerts</span>
                                        <span className="info-box-number">26</span>
                                    </div>
                                </div>
                            </div>

                            <div className="col-xl-4 col-md-6 col-12">
                                <div className="info-box bg-purple">
                                    <span className="info-box-icon push-bottom">
                                        <FontAwesomeIcon size="sm" className="icon" icon={faUsers} />
                                    </span>

                                    <div className="info-box-content">
                                        <span className="info-box-text">No activity in days</span>
                                        <span className="info-box-number">150</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="form-wrapper patients-content">
                        <Row>
                            <Col sm={10} md={9} className="column-content">
                                <Form>
                                    <Form.Group as={Row} controlId="searchPatients">
                                        <Form.Label column sm="6" md="5" lg="4" xl="3">
                                            Search patients
                                        </Form.Label>

                                        <Col sm="4" md="6" className="p-0">
                                            <Form.Control type="text" placeholder="Search by name or ID" />
                                        </Col>
                                    </Form.Group>
                                </Form>
                            </Col>

                            <Col sm={2} md={3} className="add-patient">
                                <Link to="/addpatients" className="bg-primary">Add patient</Link>
                            </Col>
                        </Row>

                        <Row>
                            <Col sm={10} md={9} className="column-content">
                                <Form>
                                    <Form.Group as={Row} controlId="searchPhysician">
                                        <Form.Label column sm="6" md="5" lg="4" xl="3">
                                            Search physicians
                                        </Form.Label>

                                        <Col sm="4" md="6" className="p-0">
                                            <Form.Control type="text" placeholder="Search by name or ID" onChange={this._searchHandler} autoComplete="off" />
                                        </Col>
                                    </Form.Group>
                                </Form>
                            </Col>
                        </Row>

                        <Row>
                            <Col sm={10} md={9} className="column-content">
                                <Form>
                                    <Form.Group as={Row} controlId="searchPrimaryCareManager">
                                        <Form.Label column sm="6" md="5" lg="4" xl="3">
                                            Primary care manager
                                        </Form.Label>

                                        <Col sm="4" md="6" className="p-0">
                                            <Form.Control type="text" placeholder="Search by name or ID" />
                                        </Col>
                                    </Form.Group>
                                </Form>
                            </Col>
                        </Row>
                    </div>

                    {/*<div className="form-wrapper manager-content">
                        <Form>
                            <Form.Group as={Row} controlId="searchPrimaryCareManager">
                                <Form.Label column sm="6" md="5" lg="4" xl="3">
                                    Primary care manager
                                </Form.Label>

                                <Col sm="4" md="6" className="p-0">
                                    <Form.Control type="text" placeholder="Search by name or ID" />
                                </Col>
                            </Form.Group>
                        </Form>
                    </div>*/}

                    <Card>
                        <Card.Body>
                            <TableComponent data={this.state.patientsData} cols={this.state.cols} />

                            <div className="pagination">
                              <span>&laquo;</span>
                              <span className="active">1</span>
                              <span>2</span>
                              <span>3</span>
                              <span>4</span>
                            </div>
                        </Card.Body>
                    </Card>
                </div>
            </DashboardWrapper>
        )
    }
}

function mapStateToProps(state) {
    const { patient, dashboardPatientCount } = state
    return {
        patient,
        dashboardPatientCount
    }
}

const connectedDashboard = connect(mapStateToProps)(DashboardPage)
export { connectedDashboard as DashboardPage }
