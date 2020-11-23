import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { AddPatientWrapper } from '../styled_components/addpatient.style'
import { Form as FormFinal, Field } from "react-final-form"
import { Form, Row, Col, Button, Modal, Card } from 'react-bootstrap'
import { TableComponent } from '../../../components/Table'
import { patientAction, dashboardAction, practitionerAction, deviceAction } from '../../../actions'
import iziToast from 'izitoast';
import { RandNum } from '../../../helpers/misc'
import { config } from '../../../config'

import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import moment from 'moment'

class AddPatientPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showModal: false,
            devicesAdded: [],
            devicesLists: [],
            cols: [
                {
                    title: '',
                    key: 'deviceName',
                    render: colData => {
                        return <span>{colData.deviceName}</span>
                    }
                },
                {
                    title: '',
                    key: 'name',
                    render: colData => {
                        return <span>{colData.name}</span>
                    }
                },
                {
                    title: '',
                    key: 'serialNum',
                    render: colData => {
                        return <span>{colData.serialNum}</span>
                    }
                },
                {
                    title: '',
                    key: 'button',
                    render: colData => {
                        return <button className="btn btn-danger" onClick={(e) => { this._removeDeviceData(colData.id) }}>Remove</button>
                    }
                }
            ],
            isPatientCreated: false,
            hasPatientCreated: false,
            deviceValue: '',
            dob: new Date(),
            physicianValue: '',
            // physicianLists: [
            //     {
            //         name: 'Dr. One Physician'
            //     },
            //     {
            //         name: 'Dr. Two Physician'
            //     },
            //     {
            //         name: 'Dr. Three Physician'
            //     }
            // ]
        }
    }

    _handleSubmit = async (values) => {
        // let { firstname, lastname, addemail: email, gender, ssn, address, zipcode, phoneNum, monitor } = values
        // let { dob } = this.state
        const { dispatch } = this.props

        let s = document.getElementById("date_picker_id")
        let dobFormat = moment(s.value).format("yyyy-MM-DD")

        let patientData = {
            "resourceType": "Patient",
            "name": [
                {
                    "use": "official",
                    "given": [`${values.firstname}`],
                    "family": `${values.lastname}`
                }
            ],
            "gender": `${values.gender}`,
            "birthDate": `${dobFormat}`,
            "telecom": [
                {
                    "value": `${values.phoneNum}`,
                    "use": "mobile",
                    "system": "phone"
                },
                {
                    "system": "email",
                    "value": `${values.addemail}`
                }
            ],
            "address": [
                {
                    "text": [
                        `${values.address}`
                    ],
                    "postalCode": `${values.zipcode}`
                }
            ],
            "identifier": [
                {
                    "system": "http://hl7.org/fhir/sid/us-ssn",
                    "value": `${values.ssn}`
                },
                {
                    "value": RandNum("PX"),
                    "system": "EXSYS"
                }
            ],
            "extension": [{
                "url": config.apiGateway.URL + "/IsRemoteMonitored",
                "valueBoolean": typeof values.monitor === 'undefined' ? false : values.monitor
            }]
        }

        dispatch(patientAction.create(patientData))
    }

    _handleValidate = values => {
        const errors = {}
		let firstname = []
        let lastname = []
		let addemail = []
        let ssn = []
        let address = []
        let zipcode = []
        let phoneNum = []

		if (!values.firstname)
			firstname.push("Firstname is required")

        if (!values.lastname)
            lastname.push("Lastname is required")

        if (!values.addemail)
            addemail.push("Email is required")

        if (!values.ssn)
            ssn.push("SSN is required")

        if (!values.address)
            address.push("Address is required")

        if (!values.zipcode)
            zipcode.push("Zipcode is required")

        if (!values.phoneNum)
            phoneNum.push("Phone number is required")


        if (firstname.length > 0)
            errors.firstname = firstname

        if (lastname.length > 0)
            errors.lastname = lastname

        if (addemail.length > 0)
            errors.addemail = addemail

        if (ssn.length > 0)
            errors.ssn = ssn

        if (address.length > 0)
            errors.address = address

        if (zipcode.length > 0)
            errors.zipcode = zipcode

        if (phoneNum.length > 0)
            errors.phoneNum = phoneNum

		return errors
    }

    _openModal = () => {
        let { isPatientCreated } = this.state

        this.setState({
            showModal: true
        })

        // if (isPatientCreated) {
        //     this.setState({
        //         showModal: true
        //     })
        // } else {
        //     iziToast.warning({
        //         position: 'topRight',
        //         title: 'Warning',
        //         displayMode: 1,
        //         message: 'Please register Patient first before assigning a Device',
        //     });
        // }
    }

    _closeModal = () => {
        this.setState({
            showModal: false
        })
    }

    _addDevice = () => {
        // let deviceData = {
        //     "resourceType": "Device",
        //     "text": {
        //         "status": "generated",
        //         "div": "<div>\n      <p>example</p>\n    </div>"
        //     },
        //     "identifier": [
        //         {
        //             "system": "http://goodcare.org/devices/id",
        //             "value": "345675"
        //         },
        //         {
        //             "label": "Serial Number",
        //             "value": "AMID-342135-8464"
        //         }
        //     ],
        //     "type": {
        //         "coding": [
        //             {
        //                 "system": "http://snomed.info/sct",
        //                 "code": "86184003",
        //                 "display": "Electrocardiographic monitor and recorder"
        //             }
        //         ],
        //         "text": "ECG"
        //     },
        //     "manufacturer": "Acme Devices, Inc",
        //     "model": "AB 45-J",
        //     "lotNumber": "43453424",
        //     "contact": [
        //         {
        //             "system": "phone",
        //             "value": "ext 4352"
        //         }
        //     ]
        // }
    }

    _removeDeviceData = (id) => {
        alert(id)
    }

    _handleSubmitDevice = () => {

    }

    _handleValidateDevice = () => {

    }

    componentDidMount() {
        const { dispatch } = this.props
        dispatch(deviceAction.findUnassigned())
        dispatch(practitionerAction.getAll(10, 0))
    }

    componentDidUpdate(prevProps, prevState) {
        let { patient } = this.props
        let { hasPatientCreated, isPatientCreated } = this.state
        const { dispatch } = this.props

        if (prevProps.patient !== 'undefined' && this.props.patient !== null) {
            let { create } = this.props.patient

            if (typeof create !== 'undefined' && create !== null) {
                let { success, patient } = create

                if (success) {
                    if ( typeof patient !== 'undefined' && patient !== null) {
                        if (!hasPatientCreated) {
                            this.setState({
                                isPatientCreated: true,
                                hasPatientCreated: true,
                                patientData: patient
                            })

                            // iziToast.success({
                            //     position: 'topRight',
                            //     title: 'Success',
                            //     displayMode: 1,
                            //     message: 'Patient registered successfully!',
                            // })

                            dispatch(dashboardAction.count())
                            dispatch(patientAction.getAll(10, 0))
                            dispatch(practitionerAction.getAll(10, 0))
                        }
                    }
                }
            }
        }

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

    _getDeviceName = (e) => {
        let { value } = e.target

        this.setState({
            deviceValue: value
        })
    }

    _getPhysicianValue = (e) => {
        let { value } = e.target

        this.setState({
            physicianValue: value
        })
    }

    _setDob = date => {
        this.setState({
            dob: date
        });
    }

    render() {
        let { showModal, devicesAdded, devicesLists, physicianValue, physicianLists } = this.state
        let { patient, practitioner } = this.props

        let isAddingNewPatientLoading = false
        let patientId = null
        let patientName = null
        let patientData = null
        let optionDevicesLists = null
        let physicianOptions = []

        if (typeof patient !== 'undefined' && patient !== null) {
            let { create } = patient

            if (typeof create !== 'undefined' && create !== null) {
                let { patient, loading } = create

                if (loading) {
                    isAddingNewPatientLoading = true
                } else {
                    isAddingNewPatientLoading = false
                }

                if (typeof patient !== 'undefined' && patient !== null) {
                    patientId = patient.id

                    if (typeof patient.name !== 'undefined' && patient.name !== null ) {
                        patientData = patient.name.map((item, index) => {
                            patientName = item.given + ' ' + item.family
                        })
                    }
                }
            }
        }

        if (typeof practitioner !== 'undefined' && practitioner !== null) {
            let { getAll } = practitioner

            if (typeof getAll !== 'undefined' && getAll !== null) {
                let { practitioners } = getAll

                if (typeof practitioners !== 'undefined' && practitioners !== null) {
                    let { entry } = practitioners

                    if (typeof entry !== 'undefined' && entry !== null) {
                        physicianOptions = entry.map((physician, index) => {
                            let { resource } = physician

                            if (typeof resource !== 'undefined' && resource !== null) {
                                let { name } = resource

                                if (typeof name !== 'undefined' && name !== null) {
                                    let physicianName = physician[0].prefix + ' ' + physician[0].given + ' ' + physician[0].family

                                    console.log(physicianName);

                                    return (
                                        <option key={physician.resource.id} value={physician.resource.id}> {physicianName} </option>
                                    )
                                }
                            }
                        })
                    }
                }
            }
        }

        // let physicianOptions = physicianLists.map((item, key) => {
        //     return (
        //         <option key={key}>{item.name}</option>
        //     )
        // })

        if (typeof devicesLists !== 'undefined' && devicesLists !== null && devicesLists.length > 0) {
            optionDevicesLists = devicesLists.map((deviceItem, deviceKey) => {
                let { resource } = deviceItem

                if (typeof resource !== 'undefined' && resource !== null) {
                    let { deviceName, manufacturer } = resource

                    if (typeof deviceName !== 'undefined' && deviceName !== null) {
                        return (
                            <option key={deviceItem.resource.id} value={deviceItem.resource.id}> { deviceName[0].name } </option>
                        )
                    }
                }
            })
        }

        return (
            <AddPatientWrapper>
                <div className="page-breadcrumbs">
                    <h1>Patient</h1>

                    <ol className="breadcrumb page-breadcrumb pull-right">
                        <li>
                            <i className="fa fa-home"></i>&nbsp;
                            <Link className="parent-item" to="/dashboard">Home</Link>
                            &nbsp;<i className="fa fa-angle-right">
                            </i>
                        </li>
                        <li className="active">Patient Details</li>
                    </ol>
                </div>

                <div className="mt-4">
                    {/*<FormFinal
                            initialValues={{
                                gender: 'male'
                            }}
                            onSubmit={this._handleSubmit}
                            validate={this._handleValidate}
                            render={({values, initialValues, pristine, submitting, handleSubmit }) => (
                                <Form onSubmit={handleSubmit}>
                                    <div className="patient-info">
                                        <>
                                            <Card>
                                                <Card.Header>Patient Info</Card.Header>

                                                <Card.Body>
                                                    <div>
                                                        <Form.Group className="firstname">
                                                            <Row>
                                                                <Col sm={6}>
                                                                    <Form.Label className="col-sm-4">First name</Form.Label>
                                                                    <div className="col-sm-8">
                                                                        <Field name="firstname" type="text">
                                                                            {({ input, meta, type }) => (
                                                                                <>
                                                                                    <Form.Control
                                                                                        type={type}
                                                                                        placeholder="First name"
                                                                                        autoComplete="off"
                                                                                        className={`${meta.error && meta.touched ? 'is-invalid' : ''}`}
                                                                                        {...input}
                                                                                    />
                                                                                </>
                                                                            )}
                                                                        </Field>
                                                                    </div>
                                                                </Col>

                                                                <Col sm={6}>
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

                                                        <Form.Group className="lastname">
                                                            <Row>
                                                                <Col sm={6}>
                                                                    <Form.Label className="col-sm-4">Last name</Form.Label>
                                                                    <div className="col-sm-8">
                                                                        <Field name="lastname" type="text">
                                                                            {({ input, meta, type }) => (
                                                                                <>
                                                                                    <Form.Control
                                                                                        type={type}
                                                                                        placeholder="Last name"
                                                                                        autoComplete="off"
                                                                                        className={`${meta.error && meta.touched ? 'is-invalid' : ''}`}
                                                                                        {...input}
                                                                                    />
                                                                                </>
                                                                            )}
                                                                        </Field>
                                                                    </div>
                                                                </Col>

                                                                <Col sm={6}>
                                                                    <Form.Label className="col-sm-4">SSN</Form.Label>
                                                                    <div className="col-sm-8">
                                                                        <Field name="ssn" type="text">
                                                                            {({ input, meta, type }) => (
                                                                                <>
                                                                                    <Form.Control
                                                                                        type={type}
                                                                                        placeholder="SSN"
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

                                                        <Form.Group className="email">
                                                            <Row>
                                                                <Col sm={6}>
                                                                    <Form.Label className="col-sm-4">Email</Form.Label>
                                                                    <div className="col-sm-8">
                                                                        <Field name="addemail" type="email">
                                                                            {({ input, meta, type }) => (
                                                                                <>
                                                                                    <Form.Control
                                                                                        type={type}
                                                                                        placeholder="Email address"
                                                                                        autoComplete="off"
                                                                                        className={`${meta.error && meta.touched ? 'is-invalid' : ''}`}
                                                                                        {...input}
                                                                                    />
                                                                                </>
                                                                            )}
                                                                        </Field>
                                                                    </div>
                                                                </Col>

                                                                <Col sm={6}>
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

                                                        <Form.Group className="phoneNum">
                                                            <Row>
                                                                <Col sm={6}>
                                                                    <Form.Label className="col-sm-4">Phone Number</Form.Label>
                                                                    <div className="col-sm-8">
                                                                        <Field name="phoneNum" type="number">
                                                                            {({ input, meta, type }) => (
                                                                                <>
                                                                                    <Form.Control
                                                                                        type={type}
                                                                                        placeholder="Number"
                                                                                        autoComplete="off"
                                                                                        className={`${meta.error && meta.touched ? 'is-invalid' : ''}`}
                                                                                        onKeyDown={ e => ( e.keyCode === 69 || e.keyCode === 190 ) && e.preventDefault() }
                                                                                        {...input}
                                                                                    />
                                                                                </>
                                                                            )}
                                                                        </Field>
                                                                    </div>
                                                                </Col>

                                                                <Col sm={6}>
                                                                    <Form.Label className="col-sm-4">Zip Code</Form.Label>
                                                                    <div className="col-sm-8">
                                                                        <Field name="zipcode" type="number">
                                                                            {({ input, meta, type }) => (
                                                                                <>
                                                                                    <Form.Control
                                                                                        type={type}
                                                                                        placeholder="Zip code"
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

                                                        <Form.Group className="monitoring">
                                                            <Row>
                                                                <Col sm={6}>
                                                                    <Form.Label className="col-sm-4">Remote Monitoring</Form.Label>
                                                                    <div className="col-sm-8">
                                                                        <Field name="monitor" type="checkbox">
                                                                            {({ input, meta, type }) => (

                                                                                <>
                                                                                    <input
                                                                                        type={type}
                                                                                        {...input}
                                                                                    />
                                                                                </>
                                                                            )}
                                                                        </Field>
                                                                        <span className="ml-2">Yes</span>
                                                                    </div>
                                                                </Col>
                                                            </Row>
                                                        </Form.Group>

                                                        <div className="btn-add">
                                                            <Button type="submit" disabled={pristine} variant="primary" className={`btn-submit ${isAddingNewPatientLoading ? 'disabled' : ''}`}>
                                                                { isAddingNewPatientLoading ?
                                                                    <span className="ml-2">Adding Patient...</span>
                                                                    :
                                                                    <>Add Patient</>
                                                                }
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </Card.Body>
                                            </Card>
                                        </>
                                    </div>

                                    <div className="devices">
                                        <>
                                            <h2>Devices</h2>

                                            <Card>
                                                <Card.Body>
                                                    <Form.Group className="devices">
                                                        <div className="device-wrapper">
                                                            <div className="col-sm-12 col-md-6 col-lg-4 p-0">
                                                                <Field name="devices" type="text">
                                                                    {({ input, meta, type }) => (
                                                                        <>
                                                                            <Form.Control
                                                                                type={type}
                                                                                placeholder="Device type"
                                                                                autoComplete="off"
                                                                                {...input}
                                                                            />
                                                                        </>
                                                                    )}
                                                                </Field>
                                                            </div>

                                                            <Button
                                                                id="btn-add-device"
                                                                onClick={this._openModal}>Add Device</Button>
                                                        </div>
                                                    </Form.Group>

                                                    <div className="mt-4">
                                                        <TableComponent data={devicesAdded} cols={this.state.cols} bordered={false} striped={false} removeThead={true} isTableFor={'devices'} />
                                                    </div>
                                                </Card.Body>
                                            </Card>
                                        </>
                                    </div>
                                </Form>
                        )} />*/}

                    <Card>
                        <Card.Header>Patient Info</Card.Header>

                        <Card.Body>
                            <FormFinal
                                initialValues={{
                                    gender: 'male'
                                }}
                                onSubmit={this._handleSubmit}
                                validate={this._handleValidate}
                                render={({values, initialValues, pristine, submitting, handleSubmit }) => (
                                    <Form onSubmit={handleSubmit}>
                                        <div className="patient-info">
                                            <Row>
                                                <Col sm={6}>
                                                    <Form.Group className="patient-firstname">
                                                        <Row>
                                                            <Col sm={12}>
                                                                <Form.Label className="col-sm-4">First name</Form.Label>
                                                                <div className="col-sm-8">
                                                                    <Field name="firstname" type="text">
                                                                        {({ input, meta, type }) => (
                                                                            <>
                                                                                <Form.Control
                                                                                    type={type}
                                                                                    placeholder="First name"
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

                                                    <Form.Group className="patient-lastname">
                                                        <Row>
                                                            <Col sm={12}>
                                                                <Form.Label className="col-sm-4">Last name</Form.Label>
                                                                <div className="col-sm-8">
                                                                    <Field name="lastname" type="text">
                                                                        {({ input, meta, type }) => (
                                                                            <>
                                                                                <Form.Control
                                                                                    type={type}
                                                                                    placeholder="Last name"
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

                                                    <Form.Group className="patient-email">
                                                        <Row>
                                                            <Col sm={12}>
                                                                <Form.Label className="col-sm-4">Email</Form.Label>
                                                                <div className="col-sm-8">
                                                                    <Field name="addemail" type="email">
                                                                        {({ input, meta, type }) => (
                                                                            <>
                                                                                <Form.Control
                                                                                    type={type}
                                                                                    placeholder="Email address"
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

                                                    <Form.Group className="patient-number">
                                                        <Row>
                                                            <Col sm={12}>
                                                                <Form.Label className="col-sm-4">Phone Number</Form.Label>
                                                                <div className="col-sm-8">
                                                                    <Field name="phoneNum" type="number">
                                                                        {({ input, meta, type }) => (
                                                                            <>
                                                                                <Form.Control
                                                                                    type={type}
                                                                                    placeholder="Number"
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

                                                    <Form.Group className="patient-physician">
                                                        <Row>
                                                            <Col sm={12}>
                                                                <Form.Label className="col-sm-4">Assign Physician</Form.Label>
                                                                <div className="col-sm-8">
                                                                    <Field name="patientPhysician" type="select">
                                                                        {({ input, meta, type }) => (
                                                                            <Form.Control
                                                                                 as="select"
                                                                                 value={physicianValue}
                                                                                 onChange={(e) => { this._getPhysicianValue(e) }}>
                                                                                 {physicianOptions}
                                                                            </Form.Control>
                                                                        )}
                                                                    </Field>
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                    </Form.Group>

                                                    <Form.Group className="monitoring">
                                                        <Row>
                                                            <Col sm={12}>
                                                                <Form.Label className="col-sm-4">Remote Monitoring</Form.Label>
                                                                <div className="col-sm-8">
                                                                    <Field name="monitor" type="checkbox">
                                                                        {({ input, meta, type }) => (

                                                                            <>
                                                                                <input
                                                                                    type={type}
                                                                                    {...input}
                                                                                />
                                                                            </>
                                                                        )}
                                                                    </Field>
                                                                    <span className="ml-2">Yes</span>
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                    </Form.Group>
                                                </Col>

                                                <Col sm={6}>
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

                                                    <Form.Group className="dob">
                                                        <Row>
                                                            <Col sm={12}>
                                                                <Form.Label className="col-sm-4">DOB</Form.Label>
                                                                <div className="col-sm-8">
                                                                    <Field name="dob" type="select">
                                                                        {({ input, meta, type }) => (
                                                                            <DatePicker
                                                                              selected={this.state.dob}
                                                                              onChange={date => this._setDob(date)}
                                                                              isClearable
                                                                              placeholderText="YYYY-MM-DD"
                                                                              dateFormat="yyyy-MM-dd"
                                                                              value={this.state.dob}
                                                                              id="date_picker_id"
                                                                            />
                                                                        )}
                                                                    </Field>
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                    </Form.Group>

                                                    <Form.Group className="patient-ssn">
                                                        <Row>
                                                            <Col sm={12}>
                                                                <Form.Label className="col-sm-4">SSN</Form.Label>
                                                                <div className="col-sm-8">
                                                                    <Field name="ssn" type="text">
                                                                        {({ input, meta, type }) => (
                                                                            <>
                                                                                <Form.Control
                                                                                    type={type}
                                                                                    placeholder="SSN"
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

                                                    <Form.Group className="patient-address">
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

                                                    <Form.Group className="patient-zipcode">
                                                        <Row>
                                                            <Col sm={12}>
                                                                <Form.Label className="col-sm-4">Zip Code</Form.Label>
                                                                <div className="col-sm-8">
                                                                    <Field name="zipcode" type="number">
                                                                        {({ input, meta, type }) => (
                                                                            <>
                                                                                <Form.Control
                                                                                    type={type}
                                                                                    placeholder="Zip code"
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

                                            <div className="btn-add">
                                                <Button type="submit" disabled={pristine} variant="primary" className={`btn-submit ${isAddingNewPatientLoading ? 'disabled' : ''}`}>
                                                    { isAddingNewPatientLoading ?
                                                        <span className="ml-2">Adding Patient...</span>
                                                        :
                                                        <>Add Patient</>
                                                    }
                                                </Button>
                                            </div>
                                        </div>
                                    </Form>
                                )} />
                        </Card.Body>
                    </Card>

                    <FormFinal
                         initialValues={{

                         }}
                         onSubmit={this._handleSubmitDevice}
                         validate={this._handleValidateDevice}
                         render={({values, initialValues, pristine, submitting, handleSubmit }) => (
                             <Form onSubmit={handleSubmit}>
                                 <div className="devices">
                                     <>
                                         <h2>Devices</h2>

                                         <Card>
                                             <Card.Body>
                                                 <Form.Group className="devices">
                                                     <div className="device-wrapper">
                                                         <div className="col-sm-12 col-md-6 col-lg-4 p-0">
                                                             <Field name="devices" type="text">
                                                                 {({ input, meta, type }) => (
                                                                     <>
                                                                         <Form.Control
                                                                             type={type}
                                                                             placeholder="Device type"
                                                                             autoComplete="off"
                                                                             {...input}
                                                                         />
                                                                     </>
                                                                 )}
                                                             </Field>
                                                         </div>

                                                         <Button
                                                             id="btn-add-device"
                                                             onClick={this._openModal}>Add Device</Button>
                                                     </div>
                                                 </Form.Group>

                                                 <div className="mt-4">
                                                     <TableComponent data={devicesAdded} cols={this.state.cols} bordered={false} striped={false} removeThead={true} isTableFor={'devices'} />
                                                 </div>
                                             </Card.Body>
                                         </Card>
                                     </>
                                 </div>

                                 <Modal
                                     show={showModal}
                                     size="md"
                                     aria-labelledby="contained-modal-title-vcenter"
                                     centered
                                     onHide={this._closeModal}
                                 >
                                     <Modal.Header closeButton>
                                        <h5>Adding new device - {`"${patientName}"`}</h5>
                                     </Modal.Header>

                                     <Modal.Body>
                                         <div className="adding-new">
                                            {/* <Form.Group className="devices-types mt-4">
                                                 <Form.Label className="col-sm-5">Device type</Form.Label>
                                                 <div className="col-sm-7">
                                                     <Field name="device-type" type="text">
                                                         {({ input, meta, type }) => (
                                                             <>
                                                                 <Form.Control
                                                                     type={type}
                                                                     placeholder="Device type"
                                                                     autoComplete="off"
                                                                     {...input}
                                                                 />
                                                             </>
                                                         )}
                                                     </Field>
                                                 </div>
                                             </Form.Group>*/}

                                             <Form.Group className="devices-types">
                                                 <Form.Label className="col-sm-5">Device Name</Form.Label>
                                                 <div className="col-sm-7">
                                                     <Field name="device" type="text">
                                                         {({ input, meta, type }) => (
                                                             <>
                                                                 <Form.Control
                                                                      as="select"
                                                                      value={this.state.deviceValue}
                                                                      onChange={(e) => { this._getDeviceName(e) }}>
                                                                      {optionDevicesLists}
                                                                 </Form.Control>
                                                             </>
                                                         )}
                                                     </Field>
                                                 </div>
                                             </Form.Group>

                                             <Form.Group className="devices-types">
                                                 <Form.Label className="col-sm-5">Device Type</Form.Label>
                                                 <div className="col-sm-7">
                                                     <label>GlucoMeter Glucometer</label>
                                                 </div>
                                             </Form.Group>

                                             <Form.Group className="devices-types">
                                                 <Form.Label className="col-sm-5">Device Model</Form.Label>
                                                 <div className="col-sm-7">
                                                     <label>Model model - Glucometer XD565</label>
                                                 </div>
                                             </Form.Group>

                                             <Form.Group className="devices-types">
                                                 <Form.Label className="col-sm-5">Serial Number</Form.Label>
                                                 <div className="col-sm-7">
                                                     <label>AJ530365653</label>
                                                 </div>
                                             </Form.Group>

                                             <Form.Group className="devices-types">
                                                 <Form.Label className="col-sm-5">Manufacturer</Form.Label>
                                                 <div className="col-sm-7">
                                                     <label>AJ530365653</label>
                                                 </div>
                                             </Form.Group>
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
                </div>
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

const connectedAddPatientPage = connect(mapStateToProps)(AddPatientPage)
export { connectedAddPatientPage as AddPatientPage }
