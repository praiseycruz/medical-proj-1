import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Form as FormFinal, Field } from "react-final-form"
import { Container, Form, Row, Col, Button, Modal, Card, Tabs, Tab } from 'react-bootstrap'
import iziToast from 'izitoast';

class TaskPatientInfo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    componentDidMount() {

    }

    componentDidUpdate(prevProps, prevState) {

    }

    componentWillUnmount() {

    }


    render() {
        return (
            <Card>
                <Card.Body>
                    <div className="patient-data-wrapper">
                        <div className="patient-content">
                            <Row>
                                <Col sm={3}>
                                    <h4>
                                        <i className="fas fa-male mr-2"></i>
                                        <span className="patient-name">Paul Degagne</span>
                                        <Button
                                            variant="primary"
                                            className="patient-location">
                                            <i className="fa fa-location-arrow" aria-hidden="true"></i>
                                        </Button>
                                    </h4>
                                </Col>

                                <Col sm={3}>
                                    <div className="patient-info">
                                        <p>
                                            DOB: <span>01/22/1952</span>
                                        </p>
                                        <p>AGE: <span>68 years old</span></p>
                                    </div>
                                </Col>

                                <Col sm={3}>
                                    <div className="patient-info">
                                        <p>PHONE: <span>(702) 683-5453</span></p>
                                        <p>EMAIL: <span>p.degagne@gmail.com</span></p>
                                    </div>
                                </Col>

                                <Col sm={3}>
                                    <div className="patient-info">
                                        <p>MEDICARE ID: <span>3JW8AF9TR38</span></p>
                                    </div>
                                </Col>
                            </Row>

                            <div className="separator"></div>

                            <Row className="rpm-conditions-wrapper">
                                <Col sm={4} className="pr-0">
                                    <div className="box-wrapper">
                                        <div className="conditions-content">
                                            <h5>RPM Conditions: 2</h5>
                                            <p>Hypertension [H0] <span><i className="far fa-question-circle"></i></span></p>
                                        </div>
                                    </div>
                                </Col>

                                <Col sm={4}>
                                    <div className="box-wrapper">
                                        <div className="conditions-content">
                                            <h5>Total Other Conditions: 5</h5>
                                            <p>Hyperlipidemia (high cholesterol) [E7B.2]
                                            <span><i className="far fa-question-circle"></i></span>
                                            </p>
                                        </div>

                                        <div className="box-button">
                                            <Button variant="primary" className="btn-view">Show all</Button>
                                        </div>
                                    </div>
                                </Col>

                                <Col sm={4} className="pl-0">
                                    <div className="box-wrapper">
                                        <div className="conditions-content">
                                            <h5>Patient Flags</h5>
                                            <span>
                                                <i className="fas fa-edit"></i>
                                            </span>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </Card.Body>
            </Card>
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

const connectedTaskPatientInfo = connect(mapStateToProps)(TaskPatientInfo)
export { connectedTaskPatientInfo as TaskPatientInfo }
