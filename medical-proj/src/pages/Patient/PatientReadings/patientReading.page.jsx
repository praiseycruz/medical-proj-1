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

//import modal for search patients
import ModalSearch from '../../../components/Modals/ModalSearch'
//import patient service for searching purpose
import { patientService } from '../../../services'

class PatientReadingsPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            patientSearchBtn: {
                loadingText: 'Searching...',
                text: 'Search'
            },
            patientSearchModal: {
                show: false,
                results: [],
            },
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
                    title: 'Actions',
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
                                <button className="btn btn-primary" onClick={(e) => { this._viewAlert(e, colData.id) }}>Bill for 1199</button>
                                <button className="btn btn-danger" onClick={(e) => { this._viewAlert(e, colData.id) }}>Remove</button>
                                <button className="btn btn-primary" onClick={(e) => { this._viewAlert(e, colData.id) }}>Edit</button>
                            </>
                    }
                }
            ],
            devicesAdded: [],
            devicesDataOnClick: [],
            patientDevicesLists: [{}],
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
            showAlertModal: false,
            showModalDevices: false,
            billingLists: [{}],
            billingCols: [
                {
                    title: 'EHR ID',
                    key: 'ehrId',
                    render: colData => {
                        return <span>{colData.id}</span>
                    }
                },
                {
                    title: 'Insurance',
                    key: 'insurance',
                    render: colData => {
                        return <span>{colData.insurance}</span>
                    }
                },
                {
                    title: 'Date of Service',
                    key: 'dateService',
                    render: colData => {
                        return <span>{colData.dateService}</span>
                    }
                },
                {
                    title: 'Type',
                    key: 'type',
                    render: colData => {
                        return <>{colData.type}</>
                    }
                },
                {
                    title: 'Note',
                    key: 'note',
                    render: colData => {
                        return <>{colData.note}</>
                    }
                },
                {
                    title: 'Provider',
                    key: 'provider',
                    render: colData => {
                        return <>{colData.provider}</>
                    }
                },
                {
                    title: 'Care Manager',
                    key: 'careManager',
                    render: colData => {
                        return <>{colData.careManager}</>
                    }
                },
                {
                    title: 'POS',
                    key: 'pos',
                    render: colData => {
                        return <>{colData.pos}</>
                    }
                },
                {
                    title: 'TC Claim',
                    key: 'tcClaim',
                    render: colData => {
                        return <>{colData.tcClaim}</>
                    }
                },
                {
                    title: 'Actions',
                    key: 'actions',
                    render: colData => {
                        return <>{colData.tcClaim}</>
                    }
                }
            ],
        }
    }

    componentDidMount() {
        const { dispatch } = this.props
        dispatch(practitionerAction.getAllPhysician(100, 0))
        dispatch(practitionerAction.getAllCareManager(100, 0))

        let patientDetails = localStorage.getItem("patientDetails")
    }

    componentDidUpdate(prevProps, prevState) {
        const { dispatch } = this.props

        let patientDetails = localStorage.getItem("patientDetails")

        if (prevProps.device !== this.props.device) {
            let { unassignedDevices } = this.props.device

            if (typeof unassignedDevices !== 'undefined' && unassignedDevices !== null) {
                let { devices } = unassignedDevices

                if (typeof devices !== 'undefined' && devices !== null) {
                    let { entry } = devices

                    if (typeof entry !== 'undefined' && entry !== null) {
                        this.setState({
                            devicesLists: entry
                        })
                    }
                }
            }
        }
    }

    _handleSubmitSearch = async ({searchPatient}) => {
            
        //get patient search button state
        let { patientSearchBtn } = this.state
        
        //get default text
        let getText = patientSearchBtn.text
        

        //set search btn text to a loading text
        patientSearchBtn.text = patientSearchBtn.loadingText
    
        //set now the state        
        this.setState({
            patientSearchBtn
        })

        //do the search query now
        try {
            const response = await patientService.searchByIdOrName(searchPatient, 100)
            patientSearchBtn.text = getText
            this.setState({
                patientSearchBtn
            })
            return Promise.resolve(response)
        }catch(e) {
            return Promise.reject(e)
        }

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

    _getDeviceName = (e) => {
        let { value } = e.target

        var index = e.target.selectedIndex;
        var optionElement = e.target.childNodes[index]
        var optionId =  optionElement.getAttribute('data-id')
        var optionType =  optionElement.getAttribute('data-type')
        var optionSer =  optionElement.getAttribute('data-serial')
        var optionMan =  optionElement.getAttribute('data-man')
        var optionModel =  optionElement.getAttribute('data-model')

        let devicesDataOnClick = [
            {
                "type": optionType,
                "serial": optionSer,
                "manufacturer": optionMan,
                "model": optionModel
            }
        ]

        this.setState({
            deviceValue: value,
            devicesDataOnClick
        })
    }

    _handleSubmitDevice = () => {

    }

    _handleValidateDevice = () => {

    }

    _viewAlert = (e, id) => {
        this.setState({
            showAlertModal: true
        })
    }

    _closeModalAlert = () => {
        this.setState({
            showAlertModal: false
        })
    }

    _openModalDevices = () => {
        this.setState({
            showModalDevices: true
        })
    }

    _closeModalDevices = () => {
        this.setState({
            showModalDevices: false
        })
    }

    _closePatientModalSearch = () => {
        let { patientSearchModal } = this.state
        patientSearchModal.show = false
        this.setState({
            patientSearchModal
        })
    }

    render() {
        let {
            patientSearchBtn,
            diagnosisCode,
            diagnosisCodeValue,
            conditionLists,
            conditionValue,
            conditionsAdded,
            alertLists,
            devicesLists,
            patientDevicesLists,
            showEditPatientModal,
            showAlertModal,
            showModalDevices,
            devicesDataOnClick,
            devicesAdded,
            billingLists,
            patientSearchModal
        } = this.state

        let optionDevicesLists = null
        let populateDeviceData = null

        if (typeof devicesLists !== 'undefined' && devicesLists !== null && devicesLists.length > 0) {
            optionDevicesLists = devicesLists.map((deviceItem, deviceKey) => {
                let { resource } = deviceItem

                if (typeof resource !== 'undefined' && resource !== null) {
                    let { deviceName, manufacturer } = resource

                    if (typeof deviceName !== 'undefined' && deviceName !== null) {
                        return (
                            <option
                                key={deviceItem.resource.id}
                                value={deviceName[0].name}
                                data-id={deviceItem.resource.id}
                                data-type={deviceItem.resource.type.text}
                                data-man={deviceItem.resource.manufacturer}
                                data-serial={deviceItem.resource.serialNumber}
                                data-model={deviceItem.resource.modelNumber}>
                                    { deviceName[0].name }
                            </option>
                        )
                    }
                }
            })
        }

        if (devicesDataOnClick !== 'undefined' && devicesDataOnClick !== null && devicesDataOnClick.length > 0) {
            populateDeviceData = devicesDataOnClick.map((item, key) => {
                console.log(item.type);
                return (
                    <div key={key}>
                        <Form.Group className="devices-types">
                            <Form.Label className="col-sm-5">Device Type</Form.Label>
                            <div className="col-sm-7">
                                <label>{item.type}</label>
                            </div>
                        </Form.Group>

                        <Form.Group className="devices-types">
                            <Form.Label className="col-sm-5">Device Model</Form.Label>
                            <div className="col-sm-7">
                                <label>{item.model}</label>
                            </div>
                        </Form.Group>

                        <Form.Group className="devices-types">
                            <Form.Label className="col-sm-5">Serial Number</Form.Label>
                            <div className="col-sm-7">
                                <label>{item.serial}</label>
                            </div>
                        </Form.Group>

                        <Form.Group className="devices-types">
                            <Form.Label className="col-sm-5">Manufacturer</Form.Label>
                            <div className="col-sm-7">
                                <label>{item.manufacturer}</label>
                            </div>
                        </Form.Group>
                    </div>
                )
            })
        } else {
            populateDeviceData = (
                <div>
                    <Form.Group className="devices-types">
                        <Form.Label className="col-sm-5">Device Type</Form.Label>
                        <div className="col-sm-7">
                            <label>--</label>
                        </div>
                    </Form.Group>

                    <Form.Group className="devices-types">
                        <Form.Label className="col-sm-5">Device Model</Form.Label>
                        <div className="col-sm-7">
                            <label>--</label>
                        </div>
                    </Form.Group>

                    <Form.Group className="devices-types">
                        <Form.Label className="col-sm-5">Serial Number</Form.Label>
                        <div className="col-sm-7">
                            <label>--</label>
                        </div>
                    </Form.Group>

                    <Form.Group className="devices-types">
                        <Form.Label className="col-sm-5">Manufacturer</Form.Label>
                        <div className="col-sm-7">
                            <label>--</label>
                        </div>
                    </Form.Group>
                </div>
            )
        }

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
                                            <ModalSearch query={values.searchPatient} results={patientSearchModal.results} closeModal={this._closePatientModalSearch} show={patientSearchModal.show} label="Results for" />
                                            <Button
                                                onClick={ e => {
                                                    handleSubmit(e).then(results => {
                                                        
                                                        if (!patientSearchModal.show) {
                                                            patientSearchModal.show = true
                                                            patientSearchModal.results = results
                                                            this.setState({
                                                                patientSearchModal
                                                            })

                                                        }
                                                        
                                                    })
                                                }}
                                                type="submit"
                                                className="btn btn-submit"
                                                disabled={pristine}
                                            >{patientSearchBtn.text}</Button>
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

                                                    <Button variant="primary" onClick={this._openModalDevices}>Add Device</Button>
                                                </div>
                                                <div className="mt-4">
                                                    <TableComponent removeThead={false} data={devicesAdded} cols={this.state.devicesCols} bordered={false} striped={false} isTableFor={'patients-devices'} />
                                                </div>
                                            </div>

                                            <div className="patient-device-wrapper">
                                                <h5>Patient Devices:</h5>

                                                <div className="mt-4">
                                                    <TableComponent removeThead={false} data={patientDevicesLists} cols={this.state.patientDevicesCols} bordered={false} striped={false} isTableFor={'patients-devices'} />
                                                </div>
                                            </div>
                                        </Tab>
                                        <Tab eventKey="alerts" title="Alerts">
                                            <div className="mt-4">
                                                <TableComponent data={alertLists} removeThead={false} cols={this.state.alertCols} bordered={false} striped={false} isTableFor={'alerts'} />
                                            </div>
                                        </Tab>
                                        <Tab eventKey="billing" title="Billing">
                                            <div className="billing-wrapper">
                                                <div className="d-flex align-items-center mb-4 mx-2">
                                                    <label className="mb-0 mr-2">Status Filter</label>
                                                    <div>
                                                        <select className="form-control">
                                                            <option>Ready to bill</option>
                                                        </select>
                                                    </div>
                                                </div>

                                                <TableComponent data={billingLists} cols={this.state.billingCols} bordered={false} removeThead={false} striped={false} isTableFor={'patients-billing'} />
                                            </div>
                                        </Tab>
                                        <Tab eventKey="portal" title="Portal">
                                            <div className="portal-wrapper">
                                                <Row>
                                                    <Col sm={12}>
                                                        <label>Portal status: </label>
                                                        <div className="portal-button">
                                                            <Button variant="success">Enable Portal Access</Button>
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </div>
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

                    <FormFinal
                         initialValues={{

                         }}
                         onSubmit={this._handleSubmitDevice}
                         validate={this._handleValidateDevice}
                         render={({values, initialValues, pristine, submitting, handleSubmit }) => (
                             <Form onSubmit={handleSubmit}>
                                 <Modal
                                     show={showModalDevices}
                                     size="md"
                                     aria-labelledby="contained-modal-title-vcenter"
                                     centered
                                     onHide={this._closeModalDevices}
                                 >
                                     <Modal.Header closeButton>
                                        <h5>Adding new device - ""</h5>
                                     </Modal.Header>

                                     <Modal.Body>
                                         <div className="adding-new">
                                             <Form.Group className="devices-types">
                                                 <Form.Label className="col-sm-5">Device Name</Form.Label>
                                                 <div className="col-sm-7">
                                                     <Field name="addDevice" type="select">
                                                         {({ input, meta, type }) => (
                                                             <>
                                                                 <Form.Control
                                                                     id="allow"
                                                                     as="select"
                                                                     onChange={(e) => { this._getDeviceName(e) }}
                                                                     // {...input}
                                                                     className="form-control">
                                                                        <option>-- SELECT A DEVICE --</option>
                                                                        { optionDevicesLists }
                                                                 </Form.Control>
                                                             </>
                                                         )}
                                                     </Field>
                                                 </div>
                                             </Form.Group>

                                             { populateDeviceData }
                                         </div>

                                         <div className="device-limits">
                                             <h5>Device limits for patient</h5>

                                             <Form.Group className="devices-types mt-4">
                                                 <Form.Label className="col-sm-5">Dangerously high</Form.Label>
                                                 <div className="col-sm-7">
                                                     <div className="limit-wrapper">
                                                         <label>above</label>
                                                         <Field name="dangerously" type="number">
                                                             {({ input, meta, type }) => (
                                                                 <>
                                                                     <Form.Control
                                                                         type={type}
                                                                         placeholder="180"
                                                                         autoComplete="off"
                                                                         {...input}
                                                                     />
                                                                 </>
                                                             )}
                                                         </Field>
                                                     </div>
                                                 </div>
                                             </Form.Group>

                                             <Form.Group className="devices-types mt-4">
                                                 <Form.Label className="col-sm-5">High</Form.Label>
                                                 <div className="col-sm-7">
                                                     <div className="limit-wrapper">
                                                         <Field name="high" type="number">
                                                             {({ input, meta, type }) => (
                                                                 <>
                                                                     <Form.Control
                                                                         type={type}
                                                                         placeholder="120"
                                                                         autoComplete="off"
                                                                         {...input}
                                                                     />
                                                                 </>
                                                             )}
                                                         </Field>

                                                         <label>to</label>

                                                         <Field name="high-t" type="number">
                                                             {({ input, meta, type }) => (
                                                                 <>
                                                                     <Form.Control
                                                                         type={type}
                                                                         placeholder="180"
                                                                         autoComplete="off"
                                                                         {...input}
                                                                     />
                                                                 </>
                                                             )}
                                                         </Field>
                                                     </div>
                                                 </div>
                                             </Form.Group>

                                             <Form.Group className="devices-types mt-4">
                                                 <Form.Label className="col-sm-5">Normal</Form.Label>
                                                 <div className="col-sm-7">
                                                     <div className="limit-wrapper">
                                                         <Field name="normal" type="number">
                                                             {({ input, meta, type }) => (
                                                                 <>
                                                                     <Form.Control
                                                                         type={type}
                                                                         placeholder="80"
                                                                         autoComplete="off"
                                                                         {...input}
                                                                     />
                                                                 </>
                                                             )}
                                                         </Field>

                                                         <label>to</label>

                                                         <Field name="normal-t" type="number">
                                                             {({ input, meta, type }) => (
                                                                 <>
                                                                     <Form.Control
                                                                         type={type}
                                                                         placeholder="120"
                                                                         autoComplete="off"
                                                                         {...input}
                                                                     />
                                                                 </>
                                                             )}
                                                         </Field>
                                                     </div>
                                                 </div>
                                             </Form.Group>

                                             <Form.Group className="devices-types mt-4">
                                                 <Form.Label className="col-sm-5">Low</Form.Label>
                                                 <div className="col-sm-7">
                                                     <div className="limit-wrapper">
                                                         <Field name="low" type="number">
                                                             {({ input, meta, type }) => (
                                                                 <>
                                                                     <Form.Control
                                                                         type={type}
                                                                         placeholder="50"
                                                                         autoComplete="off"
                                                                         {...input}
                                                                     />
                                                                 </>
                                                             )}
                                                         </Field>

                                                         <label>to</label>

                                                         <Field name="low-t" type="number">
                                                             {({ input, meta, type }) => (
                                                                 <>
                                                                     <Form.Control
                                                                         type={type}
                                                                         placeholder="80"
                                                                         autoComplete="off"
                                                                         {...input}
                                                                     />
                                                                 </>
                                                             )}
                                                         </Field>
                                                     </div>
                                                 </div>
                                             </Form.Group>

                                             <Form.Group className="devices-types mt-4">
                                                 <Form.Label className="col-sm-5">Dangerously low</Form.Label>
                                                 <div className="col-sm-7">
                                                     <div className="limit-wrapper">
                                                         <label>below</label>

                                                         <Field name="very-low" type="number">
                                                             {({ input, meta, type }) => (
                                                                 <>
                                                                     <Form.Control
                                                                         type={type}
                                                                         placeholder="50"
                                                                         autoComplete="off"
                                                                         {...input}
                                                                     />
                                                                 </>
                                                             )}
                                                         </Field>
                                                     </div>
                                                 </div>
                                             </Form.Group>
                                         </div>
                                     </Modal.Body>

                                     <Modal.Footer>
                                         <Button type="submit" disabled={pristine} variant="primary" className="btn-submit">
                                             Add Device
                                         </Button>
                                     </Modal.Footer>
                                 </Modal>
                             </Form>
                     )} />

                    <Modal
                        show={showAlertModal}
                        size="md"
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                        onHide={this._closeModalAlert}
                        >
                        <Modal.Header closeButton>
                           <h5>Notification - High</h5>
                        </Modal.Header>

                        <Modal.Body>
                            <div className="update-patient-wrapper">
                                <div>
                                    <div className="type">
                                        <label className="mb-0 mr-2">Type: </label>
                                        <span>Patient Reading</span>
                                    </div>

                                    <div className="status">
                                        <label className="mb-0 mr-2">Status: </label>
                                        <span>Read</span>
                                    </div>

                                    <div className="date">
                                        <label className="mb-0 mr-2">Date: </label>
                                        <span>10/17/2019 12:37 PM</span>
                                    </div>

                                    <div className="priority">
                                        <label className="mb-0 mr-2">Priority: </label>
                                        <span className="high">High</span>
                                    </div>

                                    <div className="patient">
                                        <label className="mb-0 mr-2">Patient: </label>
                                        <span>Paul Degagne</span>
                                    </div>
                                </div>
                            </div>
                        </Modal.Body>

                        <Modal.Footer>
                            <Button variant="danger" onClick={this._closeModalAlert}>Close</Button>
                        </Modal.Footer>
                    </Modal>

                </Row>

            </AddPatientWrapper>
        )
    }
}

function mapStateToProps(state) {
    const { patient, device, practitioner } = state
    return {
        patient,
        device,
        practitioner
    }
}

const connectedPatientReadingsPage = connect(mapStateToProps)(PatientReadingsPage)
export { connectedPatientReadingsPage as PatientReadingsPage }
