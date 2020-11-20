import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { AddPatientWrapper } from '../styled_components/addpatient.style'
import { Form as FormFinal, Field } from "react-final-form"
import { Form, Row, Col, Button, Modal, Card, Tabs, Tab } from 'react-bootstrap'
import { patientAction, dashboardAction, practitionerAction, deviceAction } from '../../../actions'
import { TableComponent } from '../../../components/Table'
import iziToast from 'izitoast';
import { RandNum } from '../../../helpers/misc'

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
                        },
                        {
                            name: 'cpm'
                        }
                    ]
                },
                {
                    condition: 'Condition 2',
                    diagnosisCode: 'Code 2',
                    programs: [
                        {
                            name: 'rpm',
                        },
                        {
                            name: 'cpm'
                        }
                    ]
                },
                {
                    condition: 'Condition 3',
                    diagnosisCode: 'Code 3',
                    programs: [
                        {
                            name: 'rpm',
                        },
                        {
                            name: 'cpm'
                        }
                    ]
                },
                {
                    condition: 'Condition 4',
                    diagnosisCode: 'Code 4',
                    programs: [
                        {
                            name: 'rpm',
                        },
                        {
                            name: 'cpm'
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
                        return <span>{colData.programs[0].name + ', ' + colData.programs[1].name}</span>
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
            ]
        }
    }

    componentDidMount() {
        let { data } = this.props.location

        if (typeof data !== 'undefined' && data !== null) {
            console.log(data);
        }
    }

    componentDidUpdate(prevProps, prevState) {

    }

    _getDeviceName = () => {

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

    render() {
        let {
            diagnosisCode,
            diagnosisCodeValue,
            conditionLists,
            conditionValue,
            conditionsAdded,
            alertLists,
            devicesLists,
            patientDevicesLists
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
                <div className="page-breadcrumbs">
                    <h1>Patient Readings</h1>

                    <ol className="breadcrumb page-breadcrumb pull-right">
                        <li>
                            <i className="fa fa-home"></i>&nbsp;
                            <Link className="parent-item" to="/dashboard">Home</Link>
                            &nbsp;<i className="fa fa-angle-right">
                            </i>
                        </li>
                        <li className="active">Patient Readings</li>
                    </ol>
                </div>

                <Row>
                    <Col sm={12} md={12} lg={12} xl={12}>
                        <div className="patient-info">
                            <Card>
                                <Card.Body className="patient-readings">
                                    <div>
                                        <Row>
                                            <Col sm={10} md={9} className="column-content">
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
                                            </Col>

                                            <Col sm={2} md={3} className="edit-patient">
                                                <Button
                                                    type="submit"
                                                    className="btn btn-submit"
                                                >Edit Patient</Button>

                                                <Button
                                                    type="submit"
                                                    className="btn btn-submit ml-2"
                                                >Notification</Button>
                                            </Col>
                                        </Row>

                                        <div className="patient-data">
                                            <FormFinal
                                                initialValues={{

                                                }}
                                                onSubmit={this._handleSubmitUpdate}
                                                validate={this._handleValidateUpdate}
                                                render={({values, initialValues, pristine, submitting, handleSubmit }) => (
                                                    <Form onSubmit={handleSubmit}>
                                                        <div className="patient-info-content">
                                                            <Card>
                                                                <Card.Body>
                                                                    <Row>
                                                                        <Col sm={4}>
                                                                            <Form.Group className="fullname">
                                                                                <Row>
                                                                                    <Col sm={12}>
                                                                                        <Form.Label className="col-sm-4">Patient name</Form.Label>
                                                                                        <div className="col-sm-8">
                                                                                            <Field name="fullname" type="text">
                                                                                                {({ input, meta, type }) => (
                                                                                                    <>
                                                                                                        <Form.Control
                                                                                                            type={type}
                                                                                                            placeholder="Patient Full name"
                                                                                                            autoComplete="off"
                                                                                                            className={`${meta.error && meta.touched ? 'is-invalid' : ''}`}
                                                                                                            {...input}
                                                                                                        />
                                                                                                    </>
                                                                                                )}
                                                                                            </Field>
                                                                                        </div>
                                                                                    </Col>
                                                                                </Row>
                                                                            </Form.Group>

                                                                            <Form.Group className="primaryCareManager">
                                                                                <Row>
                                                                                    <Col sm={12}>
                                                                                        <Form.Label className="col-sm-4">Primary Care Manager</Form.Label>
                                                                                        <div className="col-sm-8">
                                                                                            <Field name="careManager" type="text">
                                                                                                {({ input, meta, type }) => (
                                                                                                    <>
                                                                                                        <Form.Control
                                                                                                            type={type}
                                                                                                            placeholder="Primary Care Manager"
                                                                                                            autoComplete="off"
                                                                                                            className={`${meta.error && meta.touched ? 'is-invalid' : ''}`}
                                                                                                            {...input}
                                                                                                        />
                                                                                                    </>
                                                                                                )}
                                                                                            </Field>
                                                                                        </div>
                                                                                    </Col>
                                                                                </Row>
                                                                            </Form.Group>

                                                                            <Form.Group className="primaryPhysician">
                                                                                <Row>
                                                                                    <Col sm={12}>
                                                                                        <Form.Label className="col-sm-4">Primary Physician</Form.Label>
                                                                                        <div className="col-sm-8">
                                                                                            <Field name="physician" type="text">
                                                                                                {({ input, meta, type }) => (
                                                                                                    <>
                                                                                                        <Form.Control
                                                                                                            type={type}
                                                                                                            placeholder="Primary Physician"
                                                                                                            autoComplete="off"
                                                                                                            className={`${meta.error && meta.touched ? 'is-invalid' : ''}`}
                                                                                                            {...input}
                                                                                                        />
                                                                                                    </>
                                                                                                )}
                                                                                            </Field>
                                                                                        </div>
                                                                                    </Col>
                                                                                </Row>
                                                                            </Form.Group>

                                                                            <Form.Group className="age">
                                                                                <Row>
                                                                                    <Col sm={12}>
                                                                                        <Form.Label className="col-sm-4">Age</Form.Label>
                                                                                        <div className="col-sm-8">
                                                                                            <Field name="age" type="text">
                                                                                                {({ input, meta, type }) => (
                                                                                                    <>
                                                                                                        <Form.Control
                                                                                                            type={type}
                                                                                                            placeholder="Age"
                                                                                                            autoComplete="off"
                                                                                                            className={`${meta.error && meta.touched ? 'is-invalid' : ''}`}
                                                                                                            {...input}
                                                                                                        />
                                                                                                    </>
                                                                                                )}
                                                                                            </Field>
                                                                                        </div>
                                                                                    </Col>
                                                                                </Row>
                                                                            </Form.Group>
                                                                        </Col>

                                                                        {/* SECOND COL */}
                                                                        <Col sm={4}>
                                                                            <Form.Group className="email">
                                                                                <Row>
                                                                                    <Col sm={12}>
                                                                                        <Form.Label className="col-sm-4">Email</Form.Label>
                                                                                        <div className="col-sm-8">
                                                                                            <Field name="email" type="text">
                                                                                                {({ input, meta, type }) => (
                                                                                                    <>
                                                                                                        <Form.Control
                                                                                                            type={type}
                                                                                                            placeholder="Email"
                                                                                                            autoComplete="off"
                                                                                                            className={`${meta.error && meta.touched ? 'is-invalid' : ''}`}
                                                                                                            {...input}
                                                                                                        />
                                                                                                    </>
                                                                                                )}
                                                                                            </Field>
                                                                                        </div>
                                                                                    </Col>
                                                                                </Row>
                                                                            </Form.Group>

                                                                            <Form.Group className="mobile">
                                                                                <Row>
                                                                                    <Col sm={12}>
                                                                                        <Form.Label className="col-sm-4">Mobile</Form.Label>
                                                                                        <div className="col-sm-8">
                                                                                            <Field name="mobile" type="text">
                                                                                                {({ input, meta, type }) => (
                                                                                                    <>
                                                                                                        <Form.Control
                                                                                                            type={type}
                                                                                                            placeholder="Mobile"
                                                                                                            autoComplete="off"
                                                                                                            className={`${meta.error && meta.touched ? 'is-invalid' : ''}`}
                                                                                                            {...input}
                                                                                                        />
                                                                                                    </>
                                                                                                )}
                                                                                            </Field>
                                                                                        </div>
                                                                                    </Col>
                                                                                </Row>
                                                                            </Form.Group>

                                                                            <Form.Group className="address">
                                                                                <Row>
                                                                                    <Col sm={12}>
                                                                                        <Form.Label className="col-sm-4">Address</Form.Label>
                                                                                        <div className="col-sm-8">
                                                                                            <Field name="address" type="text">
                                                                                                {({ input, meta, type }) => (
                                                                                                    <>
                                                                                                        <Form.Control
                                                                                                            type={type}
                                                                                                            placeholder="Address"
                                                                                                            autoComplete="off"
                                                                                                            className={`${meta.error && meta.touched ? 'is-invalid' : ''}`}
                                                                                                            {...input}
                                                                                                        />
                                                                                                    </>
                                                                                                )}
                                                                                            </Field>
                                                                                        </div>
                                                                                    </Col>
                                                                                </Row>
                                                                            </Form.Group>
                                                                        </Col>

                                                                        {/* THIRD COL */}
                                                                        <Col sm={4}>
                                                                            <Form.Group className="dob">
                                                                                <Row>
                                                                                    <Col sm={12}>
                                                                                        <Form.Label className="col-sm-4">DOB</Form.Label>
                                                                                        <div className="col-sm-8">
                                                                                            <Field name="dob" type="text">
                                                                                                {({ input, meta, type }) => (
                                                                                                    <>
                                                                                                        <Form.Control
                                                                                                            type={type}
                                                                                                            placeholder="DOB"
                                                                                                            autoComplete="off"
                                                                                                            className={`${meta.error && meta.touched ? 'is-invalid' : ''}`}
                                                                                                            {...input}
                                                                                                        />
                                                                                                    </>
                                                                                                )}
                                                                                            </Field>
                                                                                        </div>
                                                                                    </Col>
                                                                                </Row>
                                                                            </Form.Group>

                                                                            <Form.Group className="gender">
                                                                                <Row>
                                                                                    <Col sm={12}>
                                                                                        <Form.Label className="col-sm-4">Gender</Form.Label>
                                                                                        <div className="col-sm-8">
                                                                                            <label className="gender-label male">
                                                                                                <Field name="gender" type="radio" value="male">
                                                                                                    {({ input, meta }) => (
                                                                                                        <>
                                                                                                            <input
                                                                                                                {...input}
                                                                                                            />
                                                                                                        </>
                                                                                                    )}
                                                                                                </Field>
                                                                                                <span>Male</span>
                                                                                            </label>

                                                                                            <label className="gender-label">
                                                                                                <Field name="gender" type="radio" value="female">
                                                                                                    {({ input, meta, type }) => (
                                                                                                        <>
                                                                                                            <input
                                                                                                                type={type}
                                                                                                                {...input}
                                                                                                            />
                                                                                                        </>
                                                                                                    )}
                                                                                                </Field>
                                                                                                <span>Female</span>
                                                                                            </label>
                                                                                        </div>
                                                                                    </Col>
                                                                                </Row>
                                                                            </Form.Group>

                                                                            <Form.Group className="medicare">
                                                                                <Row>
                                                                                    <Col sm={12}>
                                                                                        <Form.Label className="col-sm-4">Medicare ID</Form.Label>
                                                                                        <div className="col-sm-8">
                                                                                            <Field name="medicare" type="text">
                                                                                                {({ input, meta, type }) => (
                                                                                                    <>
                                                                                                        <Form.Control
                                                                                                            type={type}
                                                                                                            placeholder="Medicare ID"
                                                                                                            autoComplete="off"
                                                                                                            className={`${meta.error && meta.touched ? 'is-invalid' : ''}`}
                                                                                                            {...input}
                                                                                                        />
                                                                                                    </>
                                                                                                )}
                                                                                            </Field>
                                                                                        </div>
                                                                                    </Col>
                                                                                </Row>
                                                                            </Form.Group>

                                                                            <Form.Group className="account-status">
                                                                                <Row>
                                                                                    <Col sm={12}>
                                                                                        <Form.Label className="col-sm-4">Account status</Form.Label>
                                                                                        <div className="col-sm-8">
                                                                                            <Field name="status" type="text">
                                                                                                {({ input, meta, type }) => (
                                                                                                    <>
                                                                                                        <Form.Control
                                                                                                            type={type}
                                                                                                            placeholder="Account status"
                                                                                                            autoComplete="off"
                                                                                                            className={`${meta.error && meta.touched ? 'is-invalid' : ''}`}
                                                                                                            {...input}
                                                                                                        />
                                                                                                    </>
                                                                                                )}
                                                                                            </Field>
                                                                                        </div>
                                                                                    </Col>
                                                                                </Row>
                                                                            </Form.Group>
                                                                        </Col>
                                                                    </Row>
                                                                </Card.Body>
                                                            </Card>
                                                        </div>
                                                    </Form>
                                                )} />
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </div>
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

                                                                                    <div>
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
                                                                                    </div>
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
                                    </Tabs>
                                </Card.Body>
                            </Card>
                        </div>
                    </Col>
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
