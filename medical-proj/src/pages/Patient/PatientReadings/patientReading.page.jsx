import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { AddPatientWrapper } from '../styled_components/addpatient.style'
import { EditPatientPage } from './'
import { Form as FormFinal, Field } from "react-final-form"
import { Form, Row, Col, Button, Modal, Card, Tabs, Tab } from 'react-bootstrap'
import { patientAction, dashboardAction, practitionerAction, deviceAction } from '../../../actions'
import { TableComponent } from '../../../components/Table'
import iziToast from 'izitoast';
import { RandNum } from '../../../helpers/misc'

import { AddPatientPage } from '../AddPatient'

class PatientReadingsPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            diagnosisCode: [
                {
                    name: 'Code 1'
                },
                {
                    name: 'Code 2'
                },
                {
                    name: 'Code 3'
                }
            ],
            diagnosisCodeValue: '',
            conditionValue: '',
            conditionLists: [
                {
                    name: 'Condition 1'
                },
                {
                    name: 'Condition 2'
                },
                {
                    name: 'Condition 3'
                }
            ],
            conditionsAdded: [
                {
                    condition: 'Condition 1',
                    diagnosisCode: 'Code 1',
                    programs: [
                        {
                            name: 'rpm',
                        }
                    ]
                },
                {
                    condition: 'Condition 2',
                    diagnosisCode: 'Code 2',
                    programs: [
                        {
                            name: 'rpm',
                        }
                    ]
                },
                {
                    condition: 'Condition 3',
                    diagnosisCode: 'Code 3',
                    programs: [
                        {
                            name: 'rpm',
                        }
                    ]
                },
                {
                    condition: 'Condition 4',
                    diagnosisCode: 'Code 4',
                    programs: [
                        {
                            name: 'rpm',
                        }
                    ]
                }
            ],
            conditionCols: [
                {
                    title: '',
                    key: 'condition',
                    render: colData => {
                        return <span>{colData.condition}</span>
                    }
                },
                {
                    title: '',
                    key: 'diagnosisCode',
                    render: colData => {
                        return <span>{colData.diagnosisCode}</span>
                    }
                },
                {
                    title: '',
                    key: 'programs',
                    render: colData => {
                        return <span>{colData.programs[0].name}</span>
                    }
                },
                {
                    title: '',
                    key: 'button',
                    render: colData => {
                        return <button className="btn btn-danger" onClick={(e) => { this._removeCondition(colData.id) }}><i className="fa fa-times" aria-hidden="true"></i></button>
                    }
                }
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
            devicesLists: [
                {
                    device: 'Body Trace - Blood Pressure Monitor',
                    deviceId: '868998037680309',
                    connectedAt: '11/01/2019 11:12 AM',
                    lastMeasurement: '07/01/2020 8:10 PM'
                }
            ],
            devicesCols: [
                {
                    title: 'Device',
                    key: 'device',
                    render: colData => {
                        return <span>{colData.device}</span>
                    }
                },
                {
                    title: 'Device ID',
                    key: 'deviceId',
                    render: colData => {
                        return <span>{colData.deviceId}</span>
                    }
                },
                {
                    title: 'Connected At',
                    key: 'connectedAt',
                    render: colData => {
                        return <span>{colData.connectedAt}</span>
                    }
                },
                {
                    title: 'Last Measurement At',
                    key: 'lastMeasurement',
                    render: colData => {
                        return <span>{colData.lastMeasurement}</span>
                    }
                },
                {
                    title: 'Actions',
                    key: 'button',
                    render: colData => {
                        return <>
                                <button className="btn btn-primary" onClick={(e) => { this._viewAlert(colData.id) }}>Bill for 1199</button>
                                <button className="btn btn-danger" onClick={(e) => { this._viewAlert(colData.id) }}>Remove</button>
                                <button className="btn btn-primary" onClick={(e) => { this._viewAlert(colData.id) }}>Edit</button>
                            </>
                    }
                }
            ],
            patientDevicesLists: [
                {
                    name: '',
                    connectedAt: '',
                    lastMeasurement: ''
                }
            ],
            patientDevicesCols: [
                {
                    title: 'Device',
                    key: 'device',
                    render: colData => {
                        return <span>{colData.device}</span>
                    }
                },
                {
                    title: 'Connected At',
                    key: 'connectedAt',
                    render: colData => {
                        return <span>{colData.connectedAt}</span>
                    }
                },
                {
                    title: 'Last Measurement At',
                    key: 'lastMeasurement',
                    render: colData => {
                        return <span>{colData.lastMeasurement}</span>
                    }
                },
                {
                    title: 'Actions',
                    key: 'button',
                    render: colData => {
                        return <>{colData.actions}</>
                    }
                }
            ],
            showEditPatientModal: false,
        }
    }

    componentDidMount() {
        // let { data } = this.props.location
        //
        // if (typeof data !== 'undefined' && data !== null) {
        //     console.log(data);
        // }
        let patientDetails = localStorage.getItem("patientDetails")

        console.log(patientDetails);
    }

    componentDidUpdate(prevProps, prevState) {
        let patientDetails = localStorage.getItem("patientDetails")

        console.log(patientDetails);
    }


    _handleSubmitSearch = () => {

    }

    _handleValidateSearch = () => {

    }

    _handleSubmitUpdate = () => {

    }

    _handleValidateUpdate = () => {

    }

    _handleSubmitAddCondition = () => {

    }

    _handleValidateAddCondition = () => {

    }

    _getDiagnosisCode = (e) => {
        let { value } = e.target

        this.setState({
            diagnosisCodeValue: value
        })
    }

    _getCondition = (e) => {
        let { value } = e.target

        this.setState({
            conditionValue: value
        })
    }

    _showEditPatient = () => {
        this.setState({
            showEditPatientModal: true
        })
    }

    _closeModal = () => {
        this.setState({
            showEditPatientModal: false
        })
    }

    _handleSubmitPatientEdit = () => {

    }

    _handleValidatePatientEdit = () => {

    }

    render() {
        let {
            diagnosisCode,
            diagnosisCodeValue,
            conditionLists,
            conditionValue,
            conditionsAdded,
            alertLists,
            devicesLists,
            patientDevicesLists,
            showEditPatientModal
        } = this.state

        let diagnosisCodeOption = diagnosisCode.map((item, key) => {
            return (
                <option key={key}>{item.name}</option>
            )
        })

        let conditionOptions = conditionLists.map((item, key) => {
            return (
                <option key={key}>{item.name}</option>
            )
        })

        return (
            <AddPatientWrapper>
                <Row>
                    <Col sm={12} md={12} lg={12} xl={12}>
                        <div className="patient-reading-wrapper mt-3">
                            <FormFinal
                                onSubmit={this._handleSubmitSearch}
                                validate={this._handleValidate}
                                render={({values, initialValues, pristine, submitting, handleSubmit }) => (
                                    <Form onSubmit={handleSubmit}>
                                        <Form.Group as={Row} controlId="searchPatients" className="d-flex justify-content-end align-items-center mb-0 form-group row mx-1">
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

                        <EditPatientPage/>
                    </Col>

                    <Col sm={12} md={12} lg={12} xl={12}>
                        <div>
                            <Card className="mt-4">
                                <Card.Body>
                                    <Tabs defaultActiveKey="conditions" transition={false} id="noanim-tab-example">
                                        <Tab eventKey="conditions" title="Conditions">
                                            <FormFinal
                                                    initialValues={{
                                                        gender: 'male'
                                                    }}
                                                    onSubmit={this._handleSubmitAddCondition}
                                                    validate={this._handleValidateAddCondition}
                                                    render={({values, initialValues, pristine, submitting, handleSubmit }) => (
                                                        <Form onSubmit={handleSubmit}>
                                                            <div className="patient-condition">
                                                                <div>
                                                                    <Form.Group className="firstname">
                                                                        <Row>
                                                                            <Col sm={3}>
                                                                                <Form.Label className="col-sm-12">Condition</Form.Label>
                                                                                <div className="col-sm-12">
                                                                                    <Field name="condition" type="select">
                                                                                        {({ input, meta, type }) => (
                                                                                            <>
                                                                                                <Form.Control
                                                                                                     as="select"
                                                                                                     value={conditionValue}
                                                                                                     onChange={(e) => { this._getCondition(e) }}>
                                                                                                     {conditionOptions}
                                                                                                </Form.Control>
                                                                                            </>
                                                                                        )}
                                                                                    </Field>
                                                                                </div>
                                                                            </Col>

                                                                            <Col sm={3}>
                                                                                <Form.Label className="col-sm-12">Diagnosis Code</Form.Label>
                                                                                <div className="col-sm-12">
                                                                                    <Field name="diagnosis" type="select">
                                                                                        {({ input, meta, type }) => (
                                                                                            <Form.Control
                                                                                                 as="select"
                                                                                                 value={diagnosisCodeValue}
                                                                                                 onChange={(e) => { this._getDiagnosisCode(e) }}>
                                                                                                 {diagnosisCodeOption}
                                                                                            </Form.Control>
                                                                                        )}
                                                                                    </Field>
                                                                                </div>
                                                                            </Col>

                                                                            <Col sm={3}>
                                                                                <Form.Label className="col-sm-12">Programs</Form.Label>
                                                                                <div className="col-sm-12">
                                                                                    <div>
                                                                                        <label className="programs-label">
                                                                                            <Field name="programs-rpm" type="checkbox" value="rpm">
                                                                                                {({ input, meta }) => (
                                                                                                    <>
                                                                                                        <input
                                                                                                            {...input}
                                                                                                        />
                                                                                                    </>
                                                                                                )}
                                                                                            </Field>
                                                                                            <span>RPM</span>
                                                                                        </label>
                                                                                    </div>

                                                                                    {/*<div>
                                                                                        <label className="programs-label">
                                                                                            <Field name="programs-ccm" type="checkbox" value="ccm">
                                                                                                {({ input, meta, type }) => (
                                                                                                    <>
                                                                                                        <input
                                                                                                            type={type}
                                                                                                            {...input}
                                                                                                        />
                                                                                                    </>
                                                                                                )}
                                                                                            </Field>
                                                                                            <span>CCM</span>
                                                                                        </label>
                                                                                    </div>*/}
                                                                                </div>
                                                                            </Col>

                                                                            <Col sm={3}>
                                                                                <Form.Label className="col-sm-12">Assessment</Form.Label>
                                                                                <div className="col-sm-12">
                                                                                    <div className="add-assessment">
                                                                                        <Button type="submit" disabled={pristine} variant="primary" className={`btn-submit`}>
                                                                                            Start Now
                                                                                        </Button>
                                                                                    </div>
                                                                                </div>
                                                                            </Col>
                                                                        </Row>
                                                                    </Form.Group>
                                                                </div>
                                                            </div>

                                                            <div className="mt-4">
                                                                <TableComponent data={conditionsAdded} cols={this.state.conditionCols} bordered={false} striped={false} removeThead={true} isTableFor={'conditions'} />
                                                            </div>
                                                        </Form>
                                                )} />
                                        </Tab>
                                        <Tab eventKey="devices" title="Devices">
                                            <div className="supplied-devices-wrapper">
                                                <div className="supplied-devices-section">
                                                    <h5>Supplied Devices:</h5>

                                                    <Button variant="primary">Add Device</Button>
                                                </div>
                                                <div className="mt-4">
                                                    <TableComponent data={devicesLists} cols={this.state.devicesCols} bordered={false} striped={false} isTableFor={'patients-devices'} />
                                                </div>
                                            </div>

                                            <div className="patient-device-wrapper">
                                                <h5>Patient Devices:</h5>

                                                <div className="mt-4">
                                                    <TableComponent data={patientDevicesLists} cols={this.state.patientDevicesCols} bordered={false} striped={false} isTableFor={'patients-devices'} />
                                                </div>
                                            </div>
                                        </Tab>
                                        <Tab eventKey="alerts" title="Alerts">
                                            <div className="mt-4">
                                                <TableComponent data={alertLists} cols={this.state.alertCols} bordered={false} striped={false} isTableFor={'alerts'} />
                                            </div>
                                        </Tab>
                                        <Tab eventKey="billing" title="Billing">
                                            Billing
                                        </Tab>
                                        <Tab eventKey="portal" title="Portal">
                                            Portal
                                        </Tab>
                                        <Tab eventKey="rangeSetup" title="Patient Alerts Range Setup/Edit">
                                            Patient Alerts Range Setup/Edit
                                        </Tab>
                                    </Tabs>
                                </Card.Body>
                            </Card>
                        </div>
                    </Col>

                    <FormFinal
                        onSubmit={this._handleSubmitSearch}
                        validate={this._handleValidate}
                        render={({values, initialValues, pristine, submitting, handleSubmit }) => (
                            <Form onSubmit={handleSubmit}>
                                <Modal
                                    show={showEditPatientModal}
                                    size="md"
                                    aria-labelledby="contained-modal-title-vcenter"
                                    centered
                                    onHide={this._closeModal}
                                    >
                                    <Modal.Header closeButton>
                                       <h5>Update Patient Data for <span className="patient-name">Paul Degagne</span></h5>
                                    </Modal.Header>

                                    <Modal.Body>
                                        <div className="update-patient-wrapper">
                                            <Row>
                                                <Col sm={6}>
                                                    <Form.Group as={Row} controlId="searchPatients">
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
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                        </div>

                                        <div className="device-limits">
                                            <h5>Provider and Care Team</h5>

                                        </div>
                                    </Modal.Body>

                                    <Modal.Footer>

                                    </Modal.Footer>
                                </Modal>
                            </Form>
                        )}
                    />
                </Row>

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

const connectedPatientReadingsPage = connect(mapStateToProps)(PatientReadingsPage)
export { connectedPatientReadingsPage as PatientReadingsPage }
