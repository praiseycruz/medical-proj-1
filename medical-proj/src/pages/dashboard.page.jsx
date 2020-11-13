import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { DashboardWrapper } from './styled_components/dashboard.style'
import { Form, FormControl, Row, Col, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsers, faExclamationTriangle } from "@fortawesome/free-solid-svg-icons"

class DashboardPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            searchValue: null
        }
    }

    componentDidMount() {
    }

    _searchHandler = (event) => {
        let searchData = event.target.value

        this.setState({
            searchValue: event.target.value.toLowerCase()
        })
    }

    render() {
        console.log(this.state.searchValue);
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
                                        <span className="info-box-number">150</span>
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
                    </div>

                    <div className="form-wrapper manager-content">
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
                    </div>
                </div>
            </DashboardWrapper>
        )
    }
}

function mapStateToProps(state) {
    const { patient } = state
    return {
        patient
    }
}

const connectedDashboard = connect(mapStateToProps)(DashboardPage)
export { connectedDashboard as DashboardPage }
