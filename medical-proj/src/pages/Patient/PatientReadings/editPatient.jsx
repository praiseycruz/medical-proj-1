import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import ReactDOM from 'react-dom'
import { AddPatientWrapper } from '../styled_components/addpatient.style'
import { Form as FormFinal, Field } from "react-final-form"
import { Form, Row, Col, Button, Modal, Card } from 'react-bootstrap'
import { TableComponent } from '../../../components/Table'
import { patientAction, dashboardAction, practitionerAction, deviceAction, careTeamAction } from '../../../actions'
import iziToast from 'izitoast'
import { RandNum } from '../../../helpers/misc'
import { config } from '../../../config'

import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import moment from 'moment'

import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react'
import Geocode from "react-geocode"
import { CurrentLocation } from '../../../components/Map'

Geocode.setApiKey(config.googleApiKey)

//style for info window
const styles = {
    infoWindow: {
        h4: {
            fontSize: '13px !important',
            color: 'black'
        }
    }
}

//string prototype for uppercase
//use for geocoding address display
String.prototype.ucwords = function() {
  let str = this.toLowerCase()
  return str.toLowerCase().replace(/(?<= )[^\s]|^./g, a=>a.toUpperCase())
};


class EditPatientPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {},
            showPatientLocationModal: false,
            devicesAdded: [],
            devicesLists: [],
            patientLocation: {
                lat: 4.210484,
                lng: 101.975766
            },
            patientAddress: '',
            devicesCols: [
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
            devicesDataOnClick: [],
            physicianData: [],
            isPhysicianAdded: false
        }
    }

    // submit patient update data
    _handleSubmit = async (values) => {
        const { dispatch } = this.props

        let s = document.getElementById("date_picker_id")
        let dobFormat = moment(s.value).format("MM-DD-yyyy")

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
                        `${values.addressLine1} ${values.addressLine2}, ${values.state} ${values.zipcode}`
                    ],
                    "line": [
                        `${values.addressLine1}`,
                        `${values.addressLine2}`
                    ],
                    "state": `${values.state}`,
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

    // open patient location modal
    _openPatientLocation = form => {

        let { patientLocation } = this.state
        
        //set the location to get the longitude and latitude
        let completeAddress = {
            addressLine1: typeof form.getFieldState('addressLine1').value!=='undefined' ? form.getFieldState('addressLine1').value : '',
            addressLine2: typeof form.getFieldState('addressLine2').value!=='undefined' ? form.getFieldState('addressLine2').value : '',
            state: typeof form.getFieldState('state').value!=='undefined' ? form.getFieldState('state').value : '',
            zipcode: typeof form.getFieldState('zipcode').value!=='undefined' ? form.getFieldState('zipcode').value : ''
        }

        //combined address inputs
        let location = `${completeAddress.addressLine1}, ${completeAddress.addressLine2}, ${completeAddress.state}, ${completeAddress.zipcode}`.ucwords()

        this.setState({
            showPatientLocationModal: true,
            patientAddress: location
        })
    
        //geocode now the address into longitude and latitude
        Geocode.fromAddress(location).then(
          response => {
            const { lat, lng } = response.results[0].geometry.location

            patientLocation = {
                lat,
                lng
            }
            this.setState({
                patientLocation
            })
          },
          error => {
            console.error(error)
          }
        )

    }

    // close patient location modal
    _closeModal = () => {
        this.setState({
            showPatientLocationModal: false
        })
    }

    // for adding device to patient
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

    // removing device data
    _removeDeviceData = (id) => {
        alert(id)
    }

    componentDidMount() {
        
        const { dispatch } = this.props
        dispatch(deviceAction.findUnassigned())
        dispatch(practitionerAction.getAll(10, 0))
        //this._loadMap(this.state.patientLocation)

    }

    componentDidUpdate(prevProps, prevState) {
        let { patient } = this.props
        let { hasPatientCreated, isPatientCreated, physicianData, isPhysicianAdded } = this.state
        const { dispatch } = this.props

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

        var index = e.target.selectedIndex
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

    _getPhysicianValue = (e) => {
        let { value } = e.target

        var index = e.target.selectedIndex
        var optionElement = e.target.childNodes[index]
        var optionId =  optionElement.getAttribute('data-id')

        let physicianData = [
            {
                "id": optionId,
                "role": "Primary Physician"
            }
        ]

        this.setState({
            physicianValue: value,
            physicianData
        })

        console.log(physicianData)
    }

    _setDob = date => {
        this.setState({
            dob: date
        })
    }

    onMarkerClick = (props, marker, e) =>
        this.setState({
          selectedPlace: props,
          activeMarker: marker,
          showingInfoWindow: true
        })

    onClose = props => {
        if (this.state.showingInfoWindow) {
          this.setState({
            showingInfoWindow: false,
            activeMarker: null
          })
        }
    }

    render() {
        let { showPatientLocationModal,
              devicesAdded,
              devicesLists,
              physicianValue,
              physicianLists,
              devicesDataOnClick } = this.state
        let { patient, practitioner, removeBc } = this.props

        let isAddingNewPatientLoading = false
        let patientId = null
        // let patientName = null
        // let patientData = null
        let optionDevicesLists = null
        let physicianOptions = []
        let populateDeviceData = null

        if (typeof patient !== 'undefined' && patient !== null) {
            let { create } = patient

            if (typeof create !== 'undefined' && create !== null) {
                let { patient, loading } = create

                if (loading) {
                    isAddingNewPatientLoading = true
                } else {
                    isAddingNewPatientLoading = false
                }

                // if (typeof patient !== 'undefined' && patient !== null) {
                //     patientId = patient.id
                //
                //     if (typeof patient.name !== 'undefined' && patient.name !== null ) {
                //         patientData = patient.name.map((item, index) => {
                //             patientName = item.given + ' ' + item.family
                //         })
                //     }
                // }
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

                                    let physicianName = name[0].prefix + ' ' + name[0].given + ' ' + name[0].family

                                    return (
                                        <option
                                            key={physician.resource.id}
                                            value={physician.resource.id}
                                            data-id={physician.resource.id}>
                                                {physicianName}
                                        </option>
                                    )
                                }
                            }
                        })
                    }
                }
            }
        }

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
                                data-type={deviceItem.resource.type}
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

        // commented for now
        /*if (devicesDataOnClick !== 'undefined' && devicesDataOnClick !== null && devicesDataOnClick.length > 0) {
            populateDeviceData = devicesDataOnClick.map((item, key) => {

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
        }*/

        return (
            <AddPatientWrapper>
                <div className="mt-3">
                    <Card>
                        <Card.Header>Update patient info</Card.Header>

                        <Card.Body>
                            <FormFinal
                                initialValues={{
                                    gender: 'male',
                                    allowSendText: true
                                }}
                                onSubmit={this._handleSubmit}
                                validate={this._handleValidate}
                                render={({values, initialValues, pristine, submitting, handleSubmit, form }) => (
                                    <Form onSubmit={handleSubmit}>
                                        <div className="patient-info">
                                            <Row>
                                                <Col sm={6}>
                                                    <Form.Group className="patient-firstname">
                                                        <Row>
                                                            <Col sm={12} className="patient-inputs">
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
                                                            <Col sm={12} className="patient-inputs">
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
                                                            <Col sm={12} className="patient-inputs">
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

                                                    <Form.Group className="patient-phone">
                                                        <Row>
                                                            <Col sm={12} className="patient-inputs">
                                                                <Form.Label className="col-sm-4">Phone Number</Form.Label>
                                                                <div className="col-sm-8">
                                                                    <Field name="phoneNum" type="number">
                                                                        {({ input, meta, type }) => (
                                                                            <>
                                                                                <Form.Control
                                                                                    type={type}
                                                                                    placeholder="Phone Number"
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

                                                    <Form.Group className="patient-cell mb-1">
                                                        <Row>
                                                            <Col sm={12} className="patient-inputs">
                                                                <Form.Label className="col-sm-4">Mobile Number</Form.Label>
                                                                <div className="col-sm-8">
                                                                    <Field name="mobileNum" type="number">
                                                                        {({ input, meta, type }) => (
                                                                            <>
                                                                                <Form.Control
                                                                                    type={type}
                                                                                    placeholder="Mobile Number"
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

                                                    <Form.Group className="allo-send-text">
                                                        <Row>
                                                            <Col sm={12} className="patient-inputs">
                                                                <Form.Label className="col-sm-4"></Form.Label>
                                                                <div className="col-sm-8">
                                                                    <Field name="allowSendText" type="checkbox">
                                                                        {({ input, meta, type }) => (

                                                                            <>
                                                                                <input
                                                                                    type={type}
                                                                                    {...input}
                                                                                />

                                                                                <span className="ml-2"
                                                                                    style={{ color: '#848793' }}>
                                                                                    Okay to send text
                                                                                </span>
                                                                            </>
                                                                        )}
                                                                    </Field>
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                    </Form.Group>

                                                    <Form.Group className="patient-physician">
                                                        <Row>
                                                            <Col sm={12} className="patient-inputs">
                                                                <Form.Label className="col-sm-4">Primary Physician</Form.Label>
                                                                <div className="col-sm-8">
                                                                    <Field name="patientPhysician" type="select">
                                                                        {({ input, meta, type }) => (
                                                                            <Form.Control
                                                                                 as="select"
                                                                                 value={physicianValue}
                                                                                 onChange={(e) => { this._getPhysicianValue(e) }}>
                                                                                 <option>Select a Primary Physician</option>
                                                                                 {physicianOptions}
                                                                            </Form.Control>
                                                                        )}
                                                                    </Field>
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                    </Form.Group>

                                                    <Form.Group className="patient-care-manager">
                                                        <Row>
                                                            <Col sm={12} className="patient-inputs">
                                                                <Form.Label className="col-sm-4">Primary Care Manager</Form.Label>
                                                                <div className="col-sm-8">
                                                                    <Field name="patientCareManager" type="select">
                                                                        {({ input, meta, type }) => (
                                                                            <Form.Control
                                                                                 as="select"
                                                                                 value={physicianValue}
                                                                                 onChange={(e) => { this._getPhysicianValue(e) }}>
                                                                                 <option>Select a Primary Care Manager</option>
                                                                                 {physicianOptions}
                                                                            </Form.Control>
                                                                        )}
                                                                    </Field>
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                    </Form.Group>
                                                </Col>

                                                <Col sm={6}>
                                                    <Form.Group className="gender">
                                                        <Row>
                                                            <Col sm={12} className="patient-inputs">
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
                                                            <Col sm={12} className="patient-inputs">
                                                                <Form.Label className="col-sm-4">DOB</Form.Label>
                                                                <div className="col-sm-8">
                                                                    <Field name="dob" type="select">
                                                                        {({ input, meta, type }) => (
                                                                            <DatePicker
                                                                              selected={this.state.dob}
                                                                              onChange={date => this._setDob(date)}
                                                                              isClearable
                                                                              placeholderText="MM/DD/YYYY"
                                                                              dateFormat="MM/dd/yyyy"
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
                                                            <Col sm={12} className="patient-inputs">
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
                                                            <Col sm={12} className="patient-inputs">
                                                                <Form.Label className="col-sm-4">Address</Form.Label>
                                                                <div className="col-sm-8">
                                                                    <Field name="addressLine1" type="text">
                                                                        {({ input, meta, type }) => (
                                                                            <>
                                                                                <Form.Control
                                                                                    type={type}
                                                                                    placeholder="Address Line 1"
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
                                                            <Col sm={12} className="patient-inputs">
                                                                <Form.Label className="col-sm-4"></Form.Label>
                                                                <div className="col-sm-8">
                                                                    <Field name="addressLine2" type="text">
                                                                        {({ input, meta, type }) => (
                                                                            <>
                                                                                <Form.Control
                                                                                    type={type}
                                                                                    placeholder="Address Line 2"
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

                                                    <Form.Group className="patient-state">
                                                        <Row>
                                                            <Col sm={12} className="patient-inputs">
                                                                <Form.Label className="col-sm-4">State</Form.Label>
                                                                <div className="col-sm-8">
                                                                    <Field name="state" type="text">
                                                                        {({ input, meta, type }) => (
                                                                            <>
                                                                                <Form.Control
                                                                                    type={type}
                                                                                    placeholder="State"
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
                                                            <Col sm={12} className="patient-inputs">
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

                                                    <Form.Group className="patient-location-wrapper">
                                                        <Row>
                                                            <Col sm={12} className="patient-inputs">
                                                                <Form.Label className="col-sm-4"></Form.Label>
                                                                <div className="col-sm-8">
                                                                    <Button className="get-patient-location" onClick={ () => {this._openPatientLocation(form) }}>
                                                                        <i className="fas fa-map-marker-alt"></i>
                                                                    </Button>
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                    </Form.Group>
                                                </Col>
                                            </Row>

                                            <div className="btn-add">
                                                <Button type="submit" disabled={pristine} variant="primary" className={`btn-submit ${isAddingNewPatientLoading ? 'disabled' : ''}`}>
                                                    { isAddingNewPatientLoading ?
                                                        <span className="ml-2">Updating Patient Data...</span>
                                                        :
                                                        <>Edit Patient</>
                                                    }
                                                </Button>
                                            </div>
                                        </div>
                                    </Form>
                                )} />
                        </Card.Body>

                        { /* Patient Location Modal */ }
                        <Modal
                          show={showPatientLocationModal}
                          size="lg"
                          aria-labelledby="contained-modal-title-vcenter"
                          centered
                          onHide={this._closeModal}>
                            <Modal.Header closeButton>
                                <Modal.Title id="contained-modal-title-vcenter">
                                    Patient Location
                                </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                             <CurrentLocation
                                google={this.props.google}
                                initialCenter={this.state.patientLocation}
                              >
                                <Marker onClick={this.onMarkerClick} name={this.state.patientAddress} />
                                <InfoWindow
                                  marker={this.state.activeMarker}
                                  visible={this.state.showingInfoWindow}
                                  onClose={this.onClose}
                                >
                                  <div>
                                    <h4 style={styles.infoWindow.h4}>{this.state.selectedPlace.name}</h4>
                                  </div>
                                </InfoWindow>
                              </CurrentLocation>
                            </Modal.Body>

                            <Modal.Footer>
                                <Button onClick={this._closeModal}>Close</Button>
                            </Modal.Footer>
                        </Modal>
                    </Card>
                </div>
            </AddPatientWrapper>
        )
    }
}

function mapStateToProps(state) {
    const { patient, practitioner, device, careTeam } = state
    return {
        patient,
        device,
        careTeam,
        practitioner,
    }
}


const connectedEditPatientPage = connect(mapStateToProps)(GoogleApiWrapper({
  apiKey: config.googleApiKey
})(EditPatientPage))
export { connectedEditPatientPage as EditPatientPage }
