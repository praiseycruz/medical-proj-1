import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Form as FormFinal, Field } from "react-final-form"
import { Container, Form, Row, Col, Button, Modal, Card, Tabs, Tab } from 'react-bootstrap'
import { patientAction, dashboardAction, practitionerAction, deviceAction } from '../../../actions'
import { TableComponent } from '../../../components/Table'
import iziToast from 'izitoast';
import { RandNum } from '../../../helpers/misc'

import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { Line } from "react-chartjs-2";

class TaskPatientTracking extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
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
                    value: '131',
                    overValue: '81'
                },
                {
                    dateRecorded: '07/01/2020 8:09 PM',
                    value: '132',
                    overValue: '79'
                },
                {
                    dateRecorded: '06/24/2020 3:29 PM',
                    value: '122',
                    overValue: '81'
                },
                {
                    dateRecorded: '06/24/2020 3:28 PM',
                    value: '119',
                    overValue: '81'
                },
                {
                    dateRecorded: '06/01/2020 12:00 PM',
                    value: '129',
                    overValue: '83'
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
                        return <span>{colData.value} / {colData.overValue}</span>
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
            isTabActive: true,
            bloodPressureDataMore: [
                {
                    dateRecorded: '07/01/2020 8:10 PM',
                    value: '131',
                    overValue: '81'
                },
                {
                    dateRecorded: '07/01/2020 8:09 PM',
                    value: '132',
                    overValue: '79'
                },
                {
                    dateRecorded: '06/24/2020 3:29 PM',
                    value: '122',
                    overValue: '81'
                },
                {
                    dateRecorded: '06/24/2020 3:28 PM',
                    value: '119',
                    overValue: '81'
                },
                {
                    dateRecorded: '06/01/2020 12:00 PM',
                    value: '129',
                    overValue: '83'
                },
                {
                    dateRecorded: '07/01/2020 8:10 PM',
                    value: '131',
                    overValue: '81'
                },
                {
                    dateRecorded: '07/01/2020 8:09 PM',
                    value: '132',
                    overValue: '79'
                },
            ],
            bloodPressureColsMore: [
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
                        return <span>{colData.value} / {colData.overValue}</span>
                    }
                },
                {
                    title: 'Actions',
                    key: 'actions',
                    render: colData => {
                        return <>
                                <button className="btn btn-primary" onClick={(e) => { this._viewAlert(colData.id) }}>
                                    <i className="fas fa-edit"></i>
                                </button>

                                <button className="btn btn-danger" onClick={(e) => { this._viewAlert(colData.id) }}>
                                    <i className="fas fa-times"></i>
                                </button>
                               </>
                    }
                },
            ],
        }
    }

    componentDidMount() {
        this.mounted = true
        let { bloodPressureData } = this.state

        if (this.mounted) {
            let bpLabels = []
            let bpFirstValue = []
            let bpSecondValue = []

            /*if (bloodPressureData !== 'undefined' && bloodPressureData !== null && bloodPressureData.length > 0) {
                bpLabels = bloodPressureData.map((labels, key) => {
                    return ['Jan', 'Feb', 'Mar', 'Apr', 'May']
                })

                bpFirstValue = bloodPressureData.map((firstVal, key) => {
                    return firstVal.value
                })

                bpSecondValue = bloodPressureData.map((secondVal, key) => {
                    return secondVal.overValue
                })

                this.setState({
                    newChartData: {
                        bpLabels,
                        datasets: [
                            {
                                fill: false,
                                backgroundColor: "rgba(75,192,192,0.4)",
                                borderColor: "#3ea4f6",
                                data: bpFirstValue
                            },
                            {
                                fill: false,
                                backgroundColor: "rgba(75,192,192,0.4)",
                                borderColor: "#3ea4f6",
                                data: bpSecondValue
                            }
                        ]
                    },

                    chartOptions: {
                        // maintainAspectRatio: false,
                        scales: {
                            yAxes: [
                                {
                                    display: true,
                                    ticks: {
                                        beginAtZero: false,
                                        display: true
                                    },
                                    gridLines: {
                                        display: true
                                    }
                                }
                            ],

                            xAxes: [
                                {
                                    display: true,
                                    ticks: {
                                        display: true
                                    },
                                    gridLines: {
                                        display: true
                                    }
                                }
                            ]
                        },
                        legend: {
                            display: false
                        },
                        // elements: {
                        //     point: {
                        //         radius: 0
                        //     }
                        // }
                    }
                });
            }*/
        }
    }

    componentDidUpdate(prevProps, prevState) {

    }

    componentWillUnmount() {
        if (this._mounted)
            this._mounted = false
    }

    _bloodPressureViewAll = () => {
        let { isTabActive } = this.state

        this.setState({
            isTabActive: !isTabActive
        })
    }

    _pulseViewAll = () => {
        alert('View Pulse Details')
    }

    render() {
        let { rpmAdded,
              bloodPressureData,
              pulseData,
              alertLists,
              newChartData,
              chartOptions,
              isTabActive,
              bloodPressureDataMore } = this.state

          let dataLabels = bloodPressureData.map((value, key) => {
              return value.dateRecorded
          })

          let valueOne = bloodPressureData.map((value, key) => {
              return value.value
          })

          let valueTwo = bloodPressureData.map((value, key) => {
              return value.overValue
          })

          const data = {
              labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
              datasets: [
                  {
                      label: 'Rainfall',
                      fill: false,
                      lineTension: 0.5,
                      backgroundColor: 'rgba(75,192,192,1)',
                      borderColor: 'rgba(0,0,0,1)',
                      borderWidth: 2,
                      data: valueTwo
                  },
                  {
                      label: 'Waterfall',
                      fill: false,
                      lineTension: 0.5,
                      backgroundColor: 'rgba(75,192,192,1)',
                      borderColor: 'rgba(0,0,0,1)',
                      borderWidth: 2,
                      data: valueOne
                  }
              ]
          }

          let pulseOne = pulseData.map((value, key) => {
              return value.value
          })

          const dataTwo = {
              labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
              datasets: [
                  {
                      label: 'Rainfall',
                      fill: false,
                      lineTension: 0.5,
                      backgroundColor: 'rgba(75,192,192,1)',
                      borderColor: 'rgba(0,0,0,1)',
                      borderWidth: 2,
                      data: pulseOne
                  }
              ]
          }

          const sampleData = {
              labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
              datasets: [
                  {
                      label: 'My First dataset',
                      fill: false,
                      lineTension: 0.1,
                      backgroundColor: 'rgba(75,192,192,0.4)',
                      borderColor: 'rgba(75,192,192,1)',
                      pointHitRadius: 10,
                      data: [65, 59, 80, 81, 56, 55, 40]
                  },
                  {
                      label: 'My Second dataset',
                      fill: false,
                      lineTension: 0.1,
                      backgroundColor: 'rgba(75,192,192,0.4)',
                      borderColor: 'rgba(75,192,192,1)',
                      pointHitRadius: 10,
                      data: [0, 50, 10, 25, 3, 25, 150]
                  }
              ]
          }

        return (
            <Card>
                <Card.Body>
                    <Tabs defaultActiveKey="rpmTracking" transition={false} id="noanim-tab-example">
                        <Tab eventKey="rpmTracking" title="RPM Tracking">
                            <TableComponent data={rpmAdded} cols={this.state.rpmCols} bordered={false} striped={false} removeThead={true} isTableFor={'rpmTracking'} />
                        </Tab>
                        <Tab eventKey="patientNum" title="Patient Numbers">
                            <Row>
                                { isTabActive ?
                                     <>
                                        <Col sm={6} className="pl-0">
                                            <div className="patient-number-wrapper">
                                                <div className="title-wrapper">
                                                    <h5>
                                                        <i className="fas fa-stethoscope mr-2"></i>
                                                        Blood Pressure
                                                    </h5>
                                                    <Button
                                                        variant="primary"
                                                        className="btn-view"
                                                        onClick={() => { this._bloodPressureViewAll() }}>Details</Button>
                                                </div>

                                                <div className="blood-pressure-container">
                                                    <Row>
                                                        <Col sm={6}>
                                                            <TableComponent
                                                                bordered={false}
                                                                striped={false}
                                                                isTableFor={'blood-pressure'}
                                                                data={bloodPressureData}
                                                                cols={this.state.bloodPressureCols}
                                                            />
                                                        </Col>

                                                        <Col sm={6} className="pl-0">
                                                            <div className="chart-wrapper">
                                                                <div className="chart">
                                                                    <Line
                                                                        data={data}
                                                                        options={{
                                                                            legend:{
                                                                                display: false
                                                                            }
                                                                        }}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                </div>
                                            </div>
                                        </Col>

                                        <Col sm={6} className="pr-0">
                                            <div className="patient-number-wrapper">
                                                <div className="title-wrapper">
                                                    <h5>
                                                        <i className="fas fa-heartbeat mr-2"></i>
                                                        Pulse
                                                    </h5>
                                                    <Button
                                                        variant="primary"
                                                        className="btn-view"
                                                        onClick={() => { this._pulseViewAll() }}>Details</Button>
                                                </div>

                                                <div className="pulse-container">
                                                    <Row>
                                                        <Col sm={6}>
                                                            <TableComponent
                                                                bordered={false}
                                                                striped={false}
                                                                isTableFor={'pulse'}
                                                                data={pulseData}
                                                                cols={this.state.pulseCols}
                                                            />
                                                        </Col>

                                                        <Col sm={6} className="pl-0">
                                                            {/*<Line
                                                              ref={reference => (this.chartReference = reference)}
                                                              data={newChartData}
                                                              options={chartOptions} />*/}

                                                              <div className="chart-wrapper">
                                                                  <div className="chart">
                                                                      <Line
                                                                          data={dataTwo}
                                                                          options={{
                                                                              legend:{
                                                                                  display: false
                                                                              }
                                                                          }}
                                                                      />
                                                                  </div>
                                                              </div>
                                                        </Col>
                                                    </Row>
                                                </div>
                                            </div>
                                        </Col>
                                    </> :
                                    <div className="details-wrapper">
                                        <div className="title-wrapper">
                                            <h5>
                                                <i className="fas fa-stethoscope mr-2"></i>
                                                Blood Pressure Details
                                            </h5>
                                            <Button
                                                variant="primary"
                                                className="btn-view"
                                                onClick={() => { this._bloodPressureViewAll() }}>Back to All Numbers</Button>
                                        </div>

                                        <div className="pressure-details-wrapper">
                                            <Row>
                                                <Col sm={5}>
                                                    <div className="pressure-details-content">
                                                        <p>Recent readings</p>

                                                        <p>
                                                            <i className="fas fa-exclamation-triangle"></i>
                                                             &nbsp;=&nbsp;Entry other than default device
                                                        </p>

                                                        <div className="table-wrapper">
                                                            <TableComponent
                                                                bordered={false}
                                                                striped={false}
                                                                isTableFor={'blood-pressure'}
                                                                data={bloodPressureDataMore}
                                                                cols={this.state.bloodPressureColsMore}
                                                            />

                                                            <div></div>
                                                            <div className="add-reading-wrapper">
                                                                <Button
                                                                    variant="primary"
                                                                    className="btn btn-primary">
                                                                    <i className="fas fa-plus mr-2"></i>
                                                                    Add Reading
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Col>

                                                <Col sm={7}>
                                                    <div className="pressure-details-content">
                                                        <p>Graph over time</p>

                                                        <div className="graph-wrapper">
                                                             <Line ref="chart" data={sampleData} />
                                                        </div>
                                                    </div>
                                                </Col>
                                            </Row>

                                            <Row>
                                                <Col sm={5}>
                                                    <div className="pressure-details-content">
                                                        <p>Default device</p>

                                                        <div className="dropdown-wrapper">
                                                            <select>
                                                                <option>Body Trace - Blood Pressure Monitor</option>
                                                            </select>

                                                            <div className="save-default-device">
                                                                <Button
                                                                    variant="primary"
                                                                    className="btn btn-primary">
                                                                    Save
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Col>

                                                <Col sm={7}>
                                                    <div className="pressure-details-content">
                                                        <div className="notes-wrapper">
                                                            <p>Notes</p>

                                                            <Button
                                                                variant="primary"
                                                                className="btn btn-primary">
                                                                <i className="fas fa-plus"></i>
                                                            </Button>
                                                        </div>

                                                        <div className="notes-content">

                                                        </div>
                                                    </div>
                                                </Col>
                                            </Row>

                                            <Row>
                                                <Col sm={12}>
                                                    <div className="pressure-details-content">
                                                        <div className="alert-ranges-wrapper">
                                                            <Button
                                                                variant="primary"
                                                                className="btn btn-primary">
                                                                Hide Settings
                                                            </Button>

                                                            <p>Targets and Alert Ranges - set the parameters for Normal, Caution and Critical levels using the controls below:</p>

                                                            <div className="measure-targets-wrapper">
                                                                <div className="measure-targets">
                                                                    <Row>
                                                                        <label className="col-sm-3">Systolic</label>

                                                                    </Row>
                                                                </div>

                                                                <div className="measure-targets">
                                                                    <Row>
                                                                        <label className="col-sm-3">Diastolic</label>

                                                                    </Row>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </div>
                                    </div>
                                }
                            </Row>
                        </Tab>
                        <Tab eventKey="alerts" title="Alerts">
                            <TableComponent data={alertLists} cols={this.state.alertCols} bordered={false} striped={false} isTableFor={'alerts'} />
                        </Tab>
                    </Tabs>
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

const connectedTaskPatientTracking = connect(mapStateToProps)(TaskPatientTracking)
export { connectedTaskPatientTracking as TaskPatientTracking }
