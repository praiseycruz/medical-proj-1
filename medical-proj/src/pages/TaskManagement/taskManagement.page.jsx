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

// import DatePicker from "react-datepicker"
// import "react-datepicker/dist/react-datepicker.css"
import { Line } from "react-chartjs-2";

import { TaskPatientInfo, TaskTimerWrapper, TaskPatientTracking } from './TaskComponents'

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
            ],
            alertLists: [
                {
                    priority: 'High',
                    title: "Patient's blood pressure is out of target range",
                    date: '10/17/2020 3:37 PM'
                },
                {
                    priority: 'High',
                    title: "Patient's blood pressure is out of target range",
                    date: '10/17/2020 3:37 PM'
                },
                {
                    priority: 'Low',
                    title: "Patient's blood pressure is out of target range",
                    date: '10/17/2020 3:37 PM'
                },
                {
                    priority: 'High',
                    title: "Patient's blood pressure is out of target range",
                    date: '10/17/2020 3:37 PM'
                },
                {
                    priority: 'Low',
                    title: "Patient's blood pressure is out of target range",
                    date: '10/17/2020 3:37 PM'
                },
            ],
            alertCols: [
                {
                    title: 'Priority',
                    key: 'priority',
                    render: colData => {
                        return <span className={colData.priority.toLowerCase()}>{colData.priority}</span>
                    }
                },
                {
                    title: 'Title',
                    key: 'title',
                    render: colData => {
                        return <span>{colData.title}</span>
                    }
                },
                {
                    title: 'Date',
                    key: 'date',
                    render: colData => {
                        return <span>{colData.date}</span>
                    }
                },
                {
                    title: 'View',
                    key: 'button',
                    render: colData => {
                        return <button className="btn btn-primary" onClick={(e) => { this._viewAlert(colData.id) }}>View</button>
                    }
                }
            ],
            newChartData: {},
            chartOptions: {},
        }
        this.mounted = false
        this.chartReference = null
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

    _handleSubmitSearch = () => {

    }

    _handleValidateSearch = () => {

    }

    render() {
        let { taskLists,
              taskTypeValue,
              performeByValue,
              performedByLists,
              value,
              rpmAdded,
              bloodPressureData,
              pulseData,
              alertLists,
              newChartData,
              chartOptions } = this.state

        return (
            <TaskManagementWrapper>
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

                <TaskPatientInfo />

                <TaskTimerWrapper />

                <TaskPatientTracking />
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
