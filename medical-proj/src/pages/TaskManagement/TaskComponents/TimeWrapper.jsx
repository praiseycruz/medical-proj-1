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
            startDate: new Date()
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
                        <Row>
                            <Col sm={4}>
                                <div className="logged-content box-wrapper">
                                    <h5>
                                        <i className="far fa-clock mr-2"></i>
                                        Logged this month
                                    </h5>

                                    <p className="time">40:00</p>
                                </div>
                            </Col>

                            <Col sm={4}>
                                <div className="goal-wrapper box-wrapper">
                                    <h5>Goal</h5>

                                    <p className="time">20:00 mins</p>
                                </div>
                            </Col>

                            <Col sm={4}>
                                <div className="care-team-wrapper box-wrapper">
                                    <h5>Care Team</h5>

                                    <p>Care Manager: <span>Dr. Test Manager</span></p>
                                    <p>PCP: <span>Dr. Test Physician</span></p>
                                </div>
                            </Col>
                        </Row>

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
                                                                                <Field name="date" type="select">
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

                                                                                <Button variant="primary">Log Time</Button>
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
