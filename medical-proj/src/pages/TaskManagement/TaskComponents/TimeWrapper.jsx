import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { TaskManagementWrapper } from '../styled_components/taskManagement.style'
import { Form as FormFinal, Field } from "react-final-form"
import { Container, Form, Row, Col, Button, Modal, Card, Tabs, Tab } from 'react-bootstrap'
// import { patientAction, dashboardAction, practitionerAction, deviceAction } from '../../../actions'
// import { TableComponent } from '../../../components/Table'
import iziToast from 'izitoast';

import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { Line } from "react-chartjs-2";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsers, faExclamationTriangle } from "@fortawesome/free-solid-svg-icons"

class TaskTimerWrapper extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isActive: false,
            secondsElapsed: 0 / 1000, //time in seconds
            taskTypeValue: '',
            performeByValue: '',
            taskLists: [
                {
                    name: 'Task 1'
                },
                {
                    name: 'Task 2'
                },
                {
                    name: 'Task 3'
                },
                {
                    name: 'Task 4'
                },
            ],
            performedByLists: [
                {
                    name: 'Dr. One Asd'
                },
                {
                    name: 'Dr. Two Asd'
                },
                {
                    name: 'Dr. Three Asd'
                },
                {
                    name: 'Dr. Four Asd'
                },
            ],
            startDate: new Date(),
            showGoalModal: false
        }
    }

    componentDidMount() {
        this.mounted = true
    }

    componentDidUpdate(prevProps, prevState) {

    }

    componentWillUnmount() {
        if (this._mounted)
            this._mounted = false
    }

    // _getHours() {
    //     return ("0" + Math.floor(this.state.secondsElapsed / 3600)).slice(-2);
    // }

    _logTime = () => {
        let { secondsElapsed } = this.state

        if (secondsElapsed !== 0) {

        } else {
            let error = "<span>Cannot log zero time amount. <br />Please try again after starting timer or click minutes to add manually</span>"

            iziToast.error({
               position: 'topRight',
               title: 'Error',
               displayMode: 1,
               message: error
           });
        }
    }

    _getMinutes() {
        return ("0" + Math.floor((this.state.secondsElapsed % 3600) / 60)).slice(
            -2
        )
    }

    _getSeconds() {
        return ("0" + (this.state.secondsElapsed % 60)).slice(-2);
    }

    _startTime = () => {
        this.setState({ isActive: true })

        this.countdown = setInterval(() => {
            this.setState(({ secondsElapsed }) => ({
                secondsElapsed: secondsElapsed + 1
            }))
        }, 1000)
    }

    _resetTime = () => {
        clearInterval(this.countdown)
        this.setState({
            secondsElapsed: 0 / 1000,
            isActive: false
        })
    }

    _pauseTime = () => {
        clearInterval(this.countdown)
        this.setState({ isActive: false })
    }

    _getTaskType = (e) => {
        let { value } = e.target

        this.setState({
            taskTypeValue: value
        })
    }

    _getPerformedBy = (e) => {
        let { value } = e.target

        this.setState({
            performeByValue: value
        })
    }

    _handleSubmit = () => {

    }

    _handleValidate = () => {

    }

    _setStartDate = date => {
        this.setState({
            startDate: date,
        });
    }

    _showGoalModal = () => {
        this.setState({
            showGoalModal: true
        })
    }

    _closeGoalModal = () => {
        this.setState({
            showGoalModal: false
        })
    }

    render() {
        let { taskLists,
              taskTypeValue,
              performeByValue,
              performedByLists } = this.state

        let taskTypeOptions = taskLists.map((item, key) => {
            return (
                <option key={key}>{item.name}</option>
            )
        })

        let performedByOptions = performedByLists.map((item, key) => {
            return (
                <option key={key}>{item.name}</option>
            )
        })

        return (
            <Card>
                <Card.Body>
                    <div className="logged-wrapper">
                        <div className="state-overview">
                            <div className="row">
                                <div className="col-xl-4 col-md-6 col-12">
                                    <div className="info-box bg-blue">
                                        <span className="info-box-icon push-bottom">
                                            <i className="far fa-clock"></i>
                                        </span>

                                        <div className="info-box-content">
                                            <span className="info-box-text pt-1">Logged this month</span>
                                            <span className="info-box-number">40:00</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-xl-4 col-md-6 col-12">
                                    <div className="info-box bg-orange">
                                        <span className="info-box-icon push-bottom">
                                            <i className="fas fa-file-medical-alt"></i>
                                        </span>

                                        <div className="info-box-content" onClick={this._showGoalModal}>
                                            <span className="info-box-text pt-1">Goal</span>
                                            <span className="info-box-number">20:00 mins</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-xl-4 col-md-6 col-12">
                                    <div className="info-box bg-purple">
                                        <span className="info-box-icon push-bottom">
                                            <FontAwesomeIcon size="sm" className="icon" icon={faUsers} />
                                        </span>

                                        <div className="info-box-content">
                                            <span className="info-box-text">Care Team</span>
                                            <span className="info-box-names">
                                                <span>Care Manager: <span>Dr. Test Manager</span></span>
                                                <span>PCP: <span>Dr. Test Physician</span></span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="timer-wrapper">
                            <Container>
                                <FormFinal
                                        initialValues={{
                                            gender: 'male'
                                        }}
                                        onSubmit={this._handleSubmit}
                                        validate={this._handleValidate}
                                        render={({values, initialValues, pristine, submitting, handleSubmit }) => (
                                            <Form onSubmit={handleSubmit}>
                                                <div className="timer-content">
                                                    <div>
                                                        <Form.Group className="">
                                                            <Row>
                                                                <Col sm={3}>
                                                                    <div className="timer-container">
                                                                        <div className="timer">
                                                                            <span className="block-timer">{this._getMinutes()}</span>
                                                                            <span className="block-timer">:{this._getSeconds()}</span>
                                                                        </div>

                                                                        <div className="timer-buttons">
                                                                            <button
                                                                                className="start-button btn btn-success"
                                                                                onClick={this.state.isActive ? this._pauseTime : this._startTime}
                                                                            > {this.state.isActive ? <i className="fas fa-pause"></i> : <i className="fas fa-play"></i>}
                                                                            </button>
                                                                            <button className="reset-button btn btn-danger" onClick={this._resetTime}>
                                                                                <i className="fas fa-stop"></i>
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </Col>

                                                                <Col sm={4}>
                                                                    <div className="options-wrapper">
                                                                        <Form.Label className="col-sm-12">Task type:</Form.Label>
                                                                        <div className="col-sm-12">
                                                                            <Field name="taskType" type="select">
                                                                                {({ input, meta, type }) => (
                                                                                    <Form.Control
                                                                                         as="select"
                                                                                         value={taskTypeValue}
                                                                                         onChange={(e) => { this._getTaskType(e) }}>
                                                                                         {taskTypeOptions}
                                                                                    </Form.Control>
                                                                                )}
                                                                            </Field>
                                                                        </div>
                                                                    </div>

                                                                    <div className="options-wrapper">
                                                                        <Form.Label className="col-sm-12">Performed by:</Form.Label>
                                                                        <div className="col-sm-12">
                                                                            <Field name="performedBy" type="select">
                                                                                {({ input, meta, type }) => (
                                                                                    <Form.Control
                                                                                         as="select"
                                                                                         value={performeByValue}
                                                                                         onChange={(e) => { this._getPerformedBy(e) }}>
                                                                                         {performedByOptions}
                                                                                    </Form.Control>
                                                                                )}
                                                                            </Field>
                                                                        </div>
                                                                    </div>
                                                                </Col>

                                                                <Col sm={5}>
                                                                    <div className="assigning-wrapper">
                                                                        <div className="date-wrapper">
                                                                            <Form.Label className="col-sm-12">Performed on:</Form.Label>
                                                                            <div className="col-sm-12 d-flex justify-content-between align-items-center">
                                                                                <Field name="date" type="text">
                                                                                    {({ input, meta, type }) => (
                                                                                        <DatePicker
                                                                                          selected={this.state.startDate}
                                                                                          onChange={date => this._setStartDate(date)}
                                                                                          isClearable
                                                                                          placeholderText="MM/DD/YYYY"
                                                                                          value={this.state.startDate}
                                                                                        />
                                                                                    )}
                                                                                </Field>

                                                                                <Button variant="primary" onClick={this._logTime}>Log Time</Button>
                                                                            </div>
                                                                        </div>

                                                                        <div className="comment-area">
                                                                            <Form.Label className="col-sm-12">Comments</Form.Label>
                                                                            <div className="col-sm-12">
                                                                                <Field name="comment" type="textarea">
                                                                                    {({ input, meta, type }) => (
                                                                                        <Form.Control
                                                                                             as="textarea"
                                                                                             rows={3}
                                                                                             {...input}
                                                                                        />
                                                                                    )}
                                                                                </Field>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </Col>
                                                            </Row>
                                                        </Form.Group>
                                                    </div>
                                                </div>
                                            </Form>
                                    )} />
                            </Container>
                        </div>

                        <FormFinal
                            initialValues={{
                                minutes: '20'
                            }}
                            onSubmit={this._handleSubmit}
                            validate={this._handleValidate}
                            render={({values, initialValues, pristine, submitting, handleSubmit }) => (
                                <Form onSubmit={handleSubmit}>
                                    <Modal
                                        show={this.state.showGoalModal}
                                        size="md"
                                        aria-labelledby="contained-modal-title-vcenter"
                                        centered
                                        onHide={this._closeGoalModal}>

                                        <Modal.Header closeButton>
                                            <Modal.Title id="contained-modal-title-vcenter">
                                                Edit Patient Minute Goal
                                            </Modal.Title>
                                        </Modal.Header>

                                        <Modal.Body>
                                            <div className="goal">
                                                <Row>
                                                    <Col sm={12}>
                                                        <Form.Group className="minutes">
                                                            <Row>
                                                                <Col sm={12} className="patient-inputs">
                                                                    <div className="col-sm-12">
                                                                        <label className="minutes">
                                                                            <Field name="minutes" type="radio" value="20">
                                                                                {({ input, meta }) => (
                                                                                    <>
                                                                                        <input
                                                                                            {...input}
                                                                                        />
                                                                                    </>
                                                                                )}
                                                                            </Field>
                                                                            <span>20 minutes</span>
                                                                        </label>
                                                                    </div>

                                                                    <div className="col-sm-12">
                                                                        <label className="minutes">
                                                                            <Field name="minutes" type="radio" value="40">
                                                                                {({ input, meta, type }) => (
                                                                                    <>
                                                                                        <input
                                                                                            type={type}
                                                                                            {...input}
                                                                                        />
                                                                                    </>
                                                                                )}
                                                                            </Field>
                                                                            <span>40 minutes</span>
                                                                        </label>
                                                                    </div>

                                                                    <div className="col-sm-12">
                                                                        <label className="minutes">
                                                                            <Field name="minutes" type="radio" value="60">
                                                                                {({ input, meta, type }) => (
                                                                                    <>
                                                                                        <input
                                                                                            type={type}
                                                                                            {...input}
                                                                                        />
                                                                                    </>
                                                                                )}
                                                                            </Field>
                                                                            <span>60 minutes</span>
                                                                        </label>
                                                                    </div>

                                                                    <div className="col-sm-12">
                                                                        <label className="minutes">
                                                                            <Field name="minutes" type="radio" value="90+">
                                                                                {({ input, meta, type }) => (
                                                                                    <>
                                                                                        <input
                                                                                            type={type}
                                                                                            {...input}
                                                                                        />
                                                                                    </>
                                                                                )}
                                                                            </Field>
                                                                            <span>90+ minutes</span>
                                                                        </label>
                                                                    </div>
                                                                </Col>
                                                            </Row>
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                            </div>
                                        </Modal.Body>

                                        <Modal.Footer className="task-management">
                                            <div className="btn-save">
                                                <Button type="submit" disabled={pristine} variant="primary" className={`btn-submit`}>
                                                    Save
                                                </Button>
                                            </div>
                                            <Button variant="danger" onClick={this._closeGoalModal}>Close</Button>
                                        </Modal.Footer>
                                    </Modal>
                                </Form>
                            )} />
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

const connectedTaskTimerWrapper = connect(mapStateToProps)(TaskTimerWrapper)
export { connectedTaskTimerWrapper as TaskTimerWrapper }
