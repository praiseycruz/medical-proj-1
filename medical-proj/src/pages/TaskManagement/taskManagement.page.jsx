import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { TaskManagementWrapper } from './styled_components/taskManagement.style'
import { Form as FormFinal, Field } from "react-final-form"
import { Container, Form, Row, Col, Button, Modal, Card, Tabs, Tab } from 'react-bootstrap'
import { patientAction, dashboardAction, practitionerAction, deviceAction } from '../../actions'
import { TableComponent } from '../../components/Table'
import iziToast from 'izitoast';
import { RandNum } from '../../helpers/misc'

import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

class TaskManagementPage extends React.Component {
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
            rpmCols: [
                {
                    title: 'Date',
                    key: 'date',
                    render: colData => {
                        return <div>
                            <div className="entry upper-item">
                                <h6>Entry Date</h6>
                                <p>{colData.date}</p>
                            </div>

                            <div className="task">
                                <h6>Task</h6>
                                <p>{colData.task}</p>
                            </div>
                        </div>
                    }
                },
                {
                    title: 'By',
                    key: 'by',
                    render: colData => {
                        return <div>
                            <div className="by upper-item">
                                <h6>By</h6>
                                <p>{colData.by}</p>
                            </div>

                            <div className="minutes">
                                <h6>Mins</h6>
                                <p>{colData.mins}</p>
                            </div>
                        </div>
                    }
                },
                {
                    title: 'Comments',
                    key: 'comments',
                    render: colData => {
                        return <div className="comments">
                            <h6>Comment</h6>
                            <p>{colData.comments}</p>
                        </div>
                    }
                },
            ],
            rpmAdded: [
                {
                    date: '10/17/2020 3:37 PM',
                    by: "Dr. Sample One",
                    comments: 'Still in progress',
                    task: 'Task 1',
                    mins: '20 mins'
                },
                {
                    date: '10/17/2020 3:37 PM',
                    by: "Dr. Sample One",
                    comments: 'Still in progress',
                    task: 'Task 2',
                    mins: '25 mins'
                },
            ],
            bloodPressureData: [
                {
                    dateRecorded: '07/01/2020 8:10 PM',
                    value: '131 / 81'
                },
                {
                    dateRecorded: '07/01/2020 8:09 PM',
                    value: '132 / 79'
                },
                {
                    dateRecorded: '06/24/2020 3:29 PM',
                    value: '122 / 81'
                },
                {
                    dateRecorded: '06/24/2020 3:28 PM',
                    value: '119 / 81'
                },
                {
                    dateRecorded: '06/01/2020 12:00 PM',
                    value: '129 / 83'
                }
            ],
            bloodPressureCols: [
                {
                    title: 'Date Recorded',
                    key: 'dateRecorded',
                    render: colData => {
                        return <span>{colData.dateRecorded}</span>
                    }
                },
                {
                    title: 'Value',
                    key: 'value',
                    render: colData => {
                        return <span>{colData.value}</span>
                    }
                },
            ],
            pulseData: [
                {
                    dateRecorded: '07/01/2020 8:10 PM',
                    value: '71'
                },
                {
                    dateRecorded: '07/01/2020 8:09 PM',
                    value: '71'
                },
                {
                    dateRecorded: '06/24/2020 3:29 PM',
                    value: '73'
                },
                {
                    dateRecorded: '06/24/2020 3:28 PM',
                    value: '71'
                },
                {
                    dateRecorded: '06/01/2020 12:00 PM',
                    value: '78'
                }
            ],
            pulseCols: [
                {
                    title: 'Date Recorded',
                    key: 'dateRecorded',
                    render: colData => {
                        return <span>{colData.dateRecorded}</span>
                    }
                },
                {
                    title: 'Value',
                    key: 'value',
                    render: colData => {
                        return <span>{colData.value}</span>
                    }
                },
            ]
        }
        this.mounted = false
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

    _handleSubmitSearch = () => {

    }

    _handleValidateSearch = () => {

    }

    render() {
        let { taskLists, taskTypeValue, performeByValue, performedByLists, value, rpmAdded, bloodPressureData, pulseData } = this.state

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
            <TaskManagementWrapper>
                <div className="page-breadcrumbs">
                    <h1>Task Management</h1>

                    <ol className="breadcrumb page-breadcrumb pull-right">
                        <li>
                            <i className="fa fa-home"></i>&nbsp;
                            <Link className="parent-item" to="/dashboard">Home</Link>
                            &nbsp;<i className="fa fa-angle-right">
                            </i>
                        </li>
                        <li className="active">Task Management</li>
                    </ol>
                </div>

                <Card>
                    <Card.Header>
                        <div className="search-patient">
                            <FormFinal
                                onSubmit={this._handleSubmitSearch}
                                validate={this._handleValidate}
                                render={({values, initialValues, pristine, submitting, handleSubmit }) => (
                                    <Form onSubmit={handleSubmit}>
                                        <Form.Group as={Row} controlId="searchPatients" className="d-flex align-items-center mb-0">
                                            <Form.Label className="mb-0 px-3">
                                                Search patients
                                            </Form.Label>

                                            <div className="px-2">
                                                <Field name="searchPatient" type="text">
                                                    {({ input, meta, type }) => (
                                                        <>
                                                            <Form.Control
                                                                type={type}
                                                                placeholder="Search by name or ID"
                                                                autoComplete="off"
                                                                {...input}
                                                            />
                                                        </>
                                                    )}
                                                </Field>
                                            </div>

                                            <Button
                                                type="submit"
                                                className="btn btn-submit"
                                                disabled={pristine}
                                            >Search</Button>
                                        </Form.Group>
                                    </Form>
                                )}
                            />
                        </div>
                    </Card.Header>

                    <Card.Body>
                        <div className="patient-data">
                            <Row>
                                <Col sm={3}>
                                    <h4>
                                        <i className="fas fa-male mr-2"></i>
                                        <span className="patient-name">Paul Degagne</span>
                                    </h4>
                                </Col>

                                <Col sm={3}>
                                    <div>
                                        <p>DOB: <span>01/22/1952</span></p>
                                        <p>AGE: <span>68 years old</span></p>
                                    </div>
                                </Col>

                                <Col sm={3}>
                                    <div>
                                        <p>PHONE: <span>(702) 683-5453</span></p>
                                        <p>EMAIL: <span>p.degagne@gmail.com</span></p>
                                    </div>
                                </Col>

                                <Col sm={3}>
                                    <div>
                                        <p>MEDICARE ID: <span>3JW8AF9TR38</span></p>
                                    </div>
                                </Col>
                            </Row>
                        </div>

                        <div className="patient-condidtion-wrapper">
                            <div className="conditions-container">
                                <Row>
                                    <Col sm={4}>
                                        <div className="conditions-content">
                                            <h5>RPM Conditions: 2</h5>
                                            <p>Hypertension [H0] <span><i className="far fa-question-circle"></i></span></p>
                                        </div>
                                    </Col>

                                    <Col sm={4}>
                                        <div className="conditions-content">
                                            <h5>Total Other Conditions: 5</h5>
                                            <p>Hyperlipidemia (high cholesterol) [E7B.2]
                                            <span><i className="far fa-question-circle"></i></span>
                                            </p>
                                        </div>
                                    </Col>

                                    <Col sm={4}>
                                        <div className="conditions-content last">
                                            <Button variant="primary" className="btn-view">View all</Button>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </Card.Body>
                </Card>

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
                                                                                {/*<span className="Bloc-timer"> {this._getHours()}</span>*/}
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

                <Card className="mt-4">
                    <Card.Body>
                        <Tabs defaultActiveKey="rpmTracking" transition={false} id="noanim-tab-example">
                            <Tab eventKey="rpmTracking" title="RPM Tracking">
                                <TableComponent data={rpmAdded} cols={this.state.rpmCols} bordered={false} striped={false} removeThead={true} isTableFor={'rpmTracking'} />
                            </Tab>
                            <Tab eventKey="patientNum" title="Patient Numbers">
                                <Row>
                                    <Col sm={6}>
                                        <div className="patient-number-wrapper">
                                            <div className="title-wrapper">
                                                <h5>Blood Pressure</h5>
                                                <Button variant="primary" className="btn-view">View Details</Button>
                                            </div>

                                            <div className="blood-pressure-container">
                                                <Row>
                                                    <Col sm={7}>
                                                        <TableComponent
                                                            bordered={false}
                                                            striped={false}
                                                            isTableFor={'blood-pressure'}
                                                            data={bloodPressureData}
                                                            cols={this.state.bloodPressureCols}
                                                        />
                                                    </Col>

                                                    <Col sm={5}>

                                                    </Col>
                                                </Row>
                                            </div>
                                        </div>
                                    </Col>

                                    <Col sm={6}>
                                        <div className="patient-number-wrapper">
                                            <div className="title-wrapper">
                                                <h5>Pulse</h5>
                                                <Button variant="primary" className="btn-view">View Details</Button>
                                            </div>

                                            <div className="pulse-container">
                                                <Row>
                                                    <Col sm={7}>
                                                        <TableComponent
                                                            bordered={false}
                                                            striped={false}
                                                            isTableFor={'pulse'}
                                                            data={pulseData}
                                                            cols={this.state.pulseCols}
                                                        />
                                                    </Col>

                                                    <Col sm={5}>

                                                    </Col>
                                                </Row>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </Tab>
                            <Tab eventKey="alerts" title="Alerts">
                                Alerts
                            </Tab>
                        </Tabs>
                    </Card.Body>
                </Card>



            </TaskManagementWrapper>
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

const connectedTaskManagementPage = connect(mapStateToProps)(TaskManagementPage)
export { connectedTaskManagementPage as TaskManagementPage }
