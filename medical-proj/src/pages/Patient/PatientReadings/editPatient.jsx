import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import ReactDOM from 'react-dom'
import { AddPatientWrapper } from '../styled_components/addpatient.style'
import { Form as FormFinal, Field } from "react-final-form"
import { Form, Row, Col, Button, Modal, Card, Container, Tab, Tabs } from 'react-bootstrap'
import { TableComponent } from '../../../components/Table'
import { patientAction, dashboardAction, practitionerAction, deviceAction, careTeamAction } from '../../../actions'
import iziToast from 'izitoast'
import { RandNum } from '../../../helpers/misc'
import { config } from '../../../config'

import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import moment from 'moment'
import { OnChange } from 'react-final-form-listeners'

import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react'
import Geocode from "react-geocode"
import { CurrentLocation } from '../../../components/Map'
import { practitionerService } from '../../../services'
import _ from 'lodash'

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

var addingNewDeviceLabel = ''


//hidden form component
const HiddenForm = ({values}) => {

    addingNewDeviceLabel = `${typeof values.firstname!=='undefined' ? values.firstname : ''} ${typeof values.lastname!=='undefined' ? values.lastname : ''}`.ucwords()

    return null
}

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

class EditPatientPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
             patientDevicesCols: [
                {
                    title: 'Device Name',
                    key: 'deviceName',
                    render: colData => {
                        return <span>{colData.deviceName}</span>
                    }
                },
                {
                    title: 'Device Type',
                    key: 'name',
                    render: colData => {
                        return <span>{colData.name}</span>
                    }
                },
                {
                    title: 'Serial Number',
                    key: 'serialNum',
                    render: colData => {
                        return <span>{colData.serialNum}</span>
                    }
                },
                {
                    title: 'Action',
                    key: 'button',
                    render: colData => {
                        return <button className="btn btn-danger" onClick={(e) => { this._removeDeviceData(colData.id) }}>Remove</button>
                    }
                }
            ], // add device table column
            deviceIds: [],
            showingInfoWindow: false,
            currentSelectedDevice: null,
            activeMarker: {},
            selectedPlace: {},
            showPatientLocationModal: false,
            patientLocation: {
                lat: 4.210484,
                lng: 101.975766
            },
            patientAddress: '',
            isPatientCreated: false,
            hasPatientCreated: false,
            deviceValue: '',
            dob: new Date(),
            physicianValue: '',
            careManagerValue: '',
            devicesDataOnClick: [],
            physicianData: [],
            isPhysicianAdded: false,
            showNotificationModal: false,
            hasSetSelects: false,
            careManagerLists: [], // store all care managers and display in Primary Care Manager dropwdown
            physicianLists: [], // store all physicians and display in Primary Physician dropdown
            physicianListsError: null,
            careManagerListsError: false,
            showModalDevices: false,
            initialValues: {
                patientId: '',
                firstname: '',
                lastname: '',
                addemail: '',
                phoneNum: '',
                mobileNum: '',
                gender: 'male',
                ssn: '',
                addressLine1: '',
                addressLine2: '',
                medicareId: '',
                state: '',
                zipcode: '',
                allowSendText: true

            }, // form final initial values
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
                    key: 'button',
                    render: colData => {
                        return <button className="btn btn-danger" onClick={(e) => { this._removeCondition(colData.id) }}><i className="fa fa-times" aria-hidden="true"></i></button>
                    }
                }
            ],
            conditionValue: '', // get conditions dropdown value
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
            ], // in conditions tab conditions dropdown dummy data
            conditionsAdded: [
                {
                    condition: 'Condition 1',
                    diagnosisCode: 'Code 1'
                },
                {
                    condition: 'Condition 2',
                    diagnosisCode: 'Code 2'
                },
                {
                    condition: 'Condition 3',
                    diagnosisCode: 'Code 3'
                },
                {
                    condition: 'Condition 4',
                    diagnosisCode: 'Code 4'
                }
            ], // dummy data of conditions - displayed in table
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
                                {/*<button className="btn btn-primary" onClick={(e) => { this._viewAlert(colData.id) }}>Bill for 1199</button>*/}
                                <button className="btn btn-danger">Remove</button>
                                {/*<button className="btn btn-primary" onClick={(e) => { this._viewAlert(colData.id) }}>Edit</button>*/}
                            </>
                    }
                }
            ], // devices column in supplied devices under Devices tab
            devicesAdded: [], // under supplied devices
            devicesLists: [], // store all the devices lists and display in dropdown
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
                        return <button className="btn btn-primary" onClick={(e, id) => { this._viewAlert(e, colData.id) }}>View</button>
                    }
                }
            ],
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
            ], // in conditions tab diagnosis code dropdown dummy data
            diagnosisCodeValue: '', // get diagnosis code dropdown value
            patientDevicesLists: [], // store all the devices populated in the table (data passed in registering patient)
        }
    }

    componentDidMount() {

        const { dispatch } = this.props
        dispatch(deviceAction.findUnassigned())
        // dispatch(practitionerAction.getAll(10, 0))
        //this._loadMap(this.state.patientLocation)
        //dispatch(practitionerAction.getAllPhysician(100, 0))
        //dispatch(practitionerAction.getAllCareManager(100, 0))


        //get all physicians
        practitionerService.getAllPhysician(100, 0).then( physicians => {
            let finalEntriesOfPhysicians = []
            if (typeof physicians !== 'undefined' && physicians !== null) {
                let { entry } = physicians

                if (typeof entry !== 'undefined' && entry !== null) {
                    entry.map((physiciansLists, index) => {
                        let { resource } = physiciansLists

                        if (typeof resource !== 'undefined' && resource !== null) {
                            finalEntriesOfPhysicians.push(physiciansLists)
                        }
                    })
                }

                this.setState({
                    physicianLists: finalEntriesOfPhysicians
                })
            }
        }).catch(e => {

            this.setState({
                physicianListsError: true
            })
            console.log(e)
        })

        practitionerService.getAllCareManager(100, 0).then( careManagers => {
            let finalEntriesOfCareManagers = []
            if (typeof careManagers !== 'undefined' && careManagers !== null) {
                let { entry } = careManagers
                if (typeof entry !== 'undefined' && entry !== null) {
                    entry.map((careManagersLists, index) => {
                        let { resource } = careManagersLists
                        if (typeof resource !== 'undefined' && resource !== null) {
                            finalEntriesOfCareManagers.push(careManagersLists)
                        }
                    })
                }
                this.setState({
                    careManagerLists: finalEntriesOfCareManagers
                })
            }
        }).catch(e => {
            this.setState({
                careManagerListsError: true
            })
        })


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

        if (prevProps.practitioner !== this.props.practitioner) {
            let { getAll } = this.props.practitioner

            if (typeof getAll !== 'undefined' && getAll !== null) {
                let { careManagers, physicians } = getAll

                if (!this.state.hasSetSelects) {
                    /*// if (typeof practitioners !== 'undefined' && practitioners !== null) {
                    //     let { entry } = practitioners
                    //
                    //     if (typeof entry !== 'undefined' && entry !== null) {
                    //         let finalEntriesOfPhysicians = []
                    //         let finalEntriesOfCareManagers = []
                    //
                    //         entry.map((physician, index) => {
                    //             let { resource } = physician
                    //
                    //             if (typeof resource !== 'undefined' && resource !== null) {
                    //                 let { extension } = resource
                    //
                    //                 if (typeof extension !=='undefined' && extension.length > 0) {
                    //                     if (extension[0].valueString == 'Primary Physician') {
                    //                         finalEntriesOfPhysicians.push(physician)
                    //
                    //                     } else if (extension[0].valueString == 'Care Manager') {
                    //                         finalEntriesOfCareManagers.push(physician)
                    //                     }
                    //                 }
                    //             }
                    //         })
                    //
                    //         this.setState({
                    //             hasSetSelects: true,
                    //             physicianLists: finalEntriesOfPhysicians,
                    //             careManagerLists: finalEntriesOfCareManagers
                    //         })
                    //     }
                    // }*/

                }
            }
        }
    }

    // submit patient update data
    _handleSubmit = async (values) => {
        await sleep(300)

        let { patientRecord } = this.props


        if (patientRecord.isEditMode) {
            alert('For edit')
        } else {
            alert('adding patient')
        }


        /*
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
            "telecom": [
                {
                    "value": `${values.phoneNum}`,
                    "use": "home",
                    "system": "phone"
                },
                {
                    "value": `${values.mobileNum}`,
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
                    // "system": `${values.patientIdIdentifier}`,
                    "system": `${values.patientId}`,
                    "value": `${values.patientId}`
                },
                {
                    "value": RandNum("PX"),
                    "system": "EXSYS"
                }
            ],
            "extension": [
                {
                    "url": config.apiGateway.URL + "/CanSendText",
                    "valueBoolean": typeof values.canText === 'undefined' ? false : values.canText
                },
                {
                    "url": config.apiGateway.URL + "/MedicareId",
                    "valueString": values.medicareId
                },
            ]
        }

        dispatch(patientAction.create(patientData))
        */
    }

    _handleValidate = values => {
        
        const errors = {}

        let { patientRecord: { isEditMode } } = this.props
        if ( !isEditMode ) {
            let patientId = []
            let firstname = []
            let lastname = []
            let addemail = []
            let address = []
            let zipcode = []
            let phoneNum = []
            let medicareId = []

            if (!values.patientId)
                patientId.push("Patient ID is required")

            if (!values.medicareId)
                medicareId.push("Medicare ID is required")

            if (!values.firstname)
                firstname.push("Firstname is required")

            if (!values.lastname)
                lastname.push("Lastname is required")

            if (!values.addemail)
                addemail.push("Email is required")

            if (!values.addressLine1)
                address.push("Address Line 1 is required")

            if (!values.zipcode)
                zipcode.push("Zipcode is required")

            if (!values.phoneNum)
                phoneNum.push("Phone number is required")


            if (patientId.length > 0)
                errors.patientId = patientId

            if (medicareId.length > 0)
                errors.medicareId = medicareId

            if (firstname.length > 0)
                errors.firstname = firstname

            if (lastname.length > 0)
                errors.lastname = lastname

            if (addemail.length > 0)
                errors.addemail = addemail

            if (address.length > 0)
                errors.address = address

            if (zipcode.length > 0)
                errors.zipcode = zipcode

            if (phoneNum.length > 0)
                errors.phoneNum = phoneNum
        } else {

        }

		return errors
    }

    _handleSubmitNotifications = () => {

    }

    _handleValidateNotifications = () => {

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

        let completeAddressArray = []

        if (completeAddress.addressLine1!='')
            completeAddressArray.push(completeAddress.addressLine1)

        if (completeAddress.addressLine2!='')
            completeAddressArray.push(completeAddress.addressLine2)

        if (completeAddress.state!='')
            completeAddressArray.push(completeAddress.state)

        if (completeAddress.zipcode!='')
            completeAddressArray.push(completeAddress.zipcode)

        //combined address inputs
        let location = completeAddressArray.join(', ').ucwords()

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
            showPatientLocationModal: false,
        })
    }

    _getDeviceName = (e) => {
        // let { value } = e.target
        //
        // var index = e.target.selectedIndex
        // var optionElement = e.target.childNodes[index]
        // var optionId =  optionElement.getAttribute('data-id')
        // var optionType =  optionElement.getAttribute('data-type')
        // var optionSer =  optionElement.getAttribute('data-serial')
        // var optionMan =  optionElement.getAttribute('data-man')
        // var optionModel =  optionElement.getAttribute('data-model')
        //
        // let devicesDataOnClick = [
        //     {
        //         "type": optionType,
        //         "serial": optionSer,
        //         "manufacturer": optionMan,
        //         "model": optionModel
        //     }
        // ]
        //
        // this.setState({
        //     deviceValue: value,
        //     devicesDataOnClick
        // })
    }

    _getPhysicianValue = (e) => {
        let { value } = e.target

        var index = e.target.selectedIndex;
        var optionElement = e.target.childNodes[index]
        var optionId =  optionElement.getAttribute('data-id')
        var optionValue =  optionElement.getAttribute('value')

        let physicianData = [
            {
                "id": optionId,
                "role": "Primary Physician",
                "name": optionValue
            }
        ]

        this.setState({
            physicianValue: value,
            physicianData
        })
    }

    _getPrimaryCareManager = (e) => {
        let { value } = e.target

        var index = e.target.selectedIndex;
        var optionElement = e.target.childNodes[index]
        var optionId =  optionElement.getAttribute('data-id')
        var optionValue =  optionElement.getAttribute('value')

        let careManagerData = [
            {
                "id": optionId,
                "role": "Primary Care Manager",
                "name": optionValue
            }
        ]

        this.setState({
            careManagerValue: value,
            careManagerData
        })
    }

    _setDob = (date, form) => {
        this.setState({
            dob: date
        })
        //form.change('dob', date)
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

    _showNotifications = () => {
        this.setState({
            showNotificationModal: true
        })
    }

    _closeNotifications = () => {
        this.setState({
            showNotificationModal: false
        })
    }

    // removing device data
    _removeDeviceData = (id) => {
        let { patientDevicesLists, deviceIds } = this.state

        patientDevicesLists = _.filter(patientDevicesLists, e => e.id!==id)

        if (deviceIds.indexOf(id)!==-1)
            deviceIds.splice(deviceIds.indexOf(id), 1)

        this.setState({
            patientDevicesLists,
            deviceIds
        })
    }

    _setSelectedDevice = (value, devicesLists) => {
        let { currentSelectedDevice } = this.state

        devicesLists.map(deviceItem => {
            if (deviceItem.resource.id == value) {
                currentSelectedDevice = deviceItem

                this.setState({
                    currentSelectedDevice
                })
            }
        })
    }

    _handleSubmitDevice = async (values) => {
        await sleep(300)

        let { currentSelectedDevice, patientDevicesLists, deviceIds } = this.state

        if (currentSelectedDevice !== null) {

            //insert into the patient devices lists
            patientDevicesLists.push({
                deviceName: currentSelectedDevice.resource.deviceName[0].name,
                name: currentSelectedDevice.resource.type.text,
                serialNum: currentSelectedDevice.resource.serialNumber,
                id: currentSelectedDevice.resource.id
            })

            //insert separately for device ids
            //will be use later for adding of patient
            deviceIds.push(currentSelectedDevice.resource.id)
            
            //update now the states
            this.setState({
                patientDevicesLists,
                deviceIds
            })
        }
    }

    _handleValidateDevice = () => {
        let errors = {}
        return errors
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

    render() {
        let {
              showPatientLocationModal,
              devicesAdded,
              devicesLists,
              physicianValue,
              physicianLists,
              devicesDataOnClick,
              showNotificationModal,
              careManagerValue,
              careManagerLists,
              showModalDevices,
              initialValues,
              diagnosisCode,
              diagnosisCodeValue,
              conditionLists,
              conditionValue,
              conditionsAdded,
              alertLists,
              patientDevicesLists,
              careManagerListsError,
              physicianListsError,
              currentSelectedDevice } = this.state
        let { patient, practitioner, removeBc, patientRecord, clearPatientFields } = this.props

        let isAddingNewPatientLoading = false
        let patientId = null
        // let patientName = null
        // let patientData = null
        let optionDevicesLists = null
        let physicianOptions = null
        let careManagerListsOptions = null
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

        // display physician lists in dropdown
        if (physicianLists !== null && physicianLists.length > 0) {
            physicianOptions = physicianLists.map((physician, index) => {
                let { resource } = physician

                if (typeof resource !== 'undefined' && resource !== null) {
                    let { name } = resource

                    if (typeof name !== 'undefined' && name !== null) {
                        let physicianName = name[0].prefix + ' ' + name[0].given + ' ' + name[0].family

                        return (
                            <option
                                key={physician.resource.id}
                                value={physicianName}
                                data-id={physician.resource.id}>
                                    {physicianName}
                            </option>
                        )
                    }
                }
            })
        }

        if (physicianListsError) {
            physicianOptions =  (
                        <option>
                            Error loading Physician lists
                        </option>
                    )
        }

        // display care manager lists in dropdown
        if (careManagerLists !== null && careManagerLists.length > 0) {
            careManagerListsOptions = careManagerLists.map((careManager, index) => {
                let { resource } = careManager

                if (typeof resource !== 'undefined' && resource !== null) {
                    let { name } = resource

                    if (typeof name !== 'undefined' && name !== null) {
                        let careManagerName = name[0].given + ' ' + name[0].family

                        return (
                            <option
                                key={careManager.resource.id}
                                value={careManagerName}
                                data-id={careManager.resource.id}>
                                    {careManagerName}
                            </option>
                        )
                    }
                }
            })
        } else {
            if (careManagerListsError) {
                careManagerListsOptions =  (
                            <option>
                                Error loading Care Manager Lists
                            </option>
                        )
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

        if (typeof devicesLists !== 'undefined' && devicesLists !== null && devicesLists.length > 0) {
            optionDevicesLists = devicesLists.map((deviceItem, deviceKey) => {
                let { resource } = deviceItem

                if (typeof resource !== 'undefined' && resource !== null) {
                    let { deviceName, manufacturer } = resource

                    if (typeof deviceName !== 'undefined' && deviceName !== null) {
                        return (
                            <option
                                key={deviceItem.resource.id}
                                value={deviceItem.resource.id}
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

        populateDeviceData = (
            <div>
                <Form.Group className="devices-types">
                    <Form.Label className="col-sm-5">Device Type</Form.Label>
                    <div className="col-sm-7">
                        <label>
                        {
                            currentSelectedDevice!==null ? currentSelectedDevice.resource.type.text : '--'
                        }
                        </label>
                    </div>
                </Form.Group>

                <Form.Group className="devices-types">
                    <Form.Label className="col-sm-5">Device Model</Form.Label>
                    <div className="col-sm-7">
                        <label>
                        {
                            currentSelectedDevice!==null ? currentSelectedDevice.resource.modelNumber : '--'
                        }
                        </label>
                    </div>
                </Form.Group>

                <Form.Group className="devices-types">
                    <Form.Label className="col-sm-5">Serial Number</Form.Label>
                    <div className="col-sm-7">
                        <label>
                        {
                            currentSelectedDevice!==null ? currentSelectedDevice.resource.serialNumber : '--'
                        }
                        </label>
                    </div>
                </Form.Group>

                <Form.Group className="devices-types">
                    <Form.Label className="col-sm-5">Manufacturer</Form.Label>
                    <div className="col-sm-7">
                        <label>
                        {
                            currentSelectedDevice!==null ? currentSelectedDevice.resource.manufacturer : '--'
                        }
                        </label>
                    </div>
                </Form.Group>
            </div>
        )

        return (
            <AddPatientWrapper>
                <div className="mt-3">
                    <Card>
                        <Card.Header className="edit-patient-header">
                            <span>Patient Information</span>
                            <div>
                                <Button variant="primary" className="mr-2 add" onClick={() => {clearPatientFields()}}>Add New Patient</Button>
                                <Button variant="primary" className="edit mr-2" disabled={(patientRecord.isEditMode) ? false : true}>Edit Patient</Button>
                                <Button variant="primary" onClick={this._showNotifications}>Notifications</Button>
                            </div>
                        </Card.Header>

                        <Card.Body>
                            <FormFinal
                                initialValues={patientRecord.initialValues}
                                onSubmit={this._handleSubmit}
                                validate={this._handleValidate}
                                render={({values, initialValues, pristine, submitting, handleSubmit, form, errors }) => (
                                    <Form onSubmit={handleSubmit}>
                                        <div className="patient-info">
                                            <Row>
                                                <Col sm={6}>
                                                    <Form.Group className="patient-id">
                                                        <Row>
                                                            <Col sm={12} className="patient-inputs">
                                                                <Form.Label className="col-sm-4">ID</Form.Label>
                                                                <div className="col-sm-8">
                                                                    <Field name="patientId" type="text">
                                                                        {({ input, meta, type }) => (
                                                                            <>
                                                                                <Form.Control
                                                                                    type={type}
                                                                                    placeholder="Patient ID"
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

                                                    <HiddenForm values={values} />
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

                                                    <Form.Group className="allow-send-text">
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
                                                                                  {
                                                                                    physicianOptions==null &&
                                                                                    <option>Loading Physicians...</option>
                                                                                 }
                                                                                 {
                                                                                    !physicianListsError &&
                                                                                    <option>Select a Primary Physician</option>
                                                                                }
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
                                                                                 value={careManagerValue}
                                                                                 onChange={(e) => { this._getPrimaryCareManager(e) }}>
                                                                                 {
                                                                                    careManagerListsOptions==null &&
                                                                                    <option>Loading Care Managers...</option>
                                                                                 }
                                                                                 {
                                                                                    !careManagerListsError &&
                                                                                    <option>Select a Primary Care Manager</option>
                                                                                }
                                                                                 {careManagerListsOptions}
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
                                                                              onChange={date => this._setDob(date, form)}
                                                                              isClearable
                                                                              placeholderText="MM/DD/YYYY"
                                                                              dateFormat="MM/dd/yyyy"
                                                                              value={this.state.dob}
                                                                              id="date_picker_id"
                                                                            />
                                                                        )}
                                                                    </Field>

                                                                    <span className="ml-3">
                                                                        34 years old
                                                                    </span>
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                    </Form.Group>

                                                    <Form.Group className="patient-medicare">
                                                        <Row>
                                                            <Col sm={12} className="patient-inputs">
                                                                <Form.Label className="col-sm-4">Medicare ID</Form.Label>
                                                                <div className="col-sm-8">
                                                                    <Field name="medicareId" type="text">
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

                                            <div className="add-patient-condition-wrapper">
                                                <div>
                                                    <Tabs defaultActiveKey="devices" transition={false} id="noanim-tab-example">
                                                        <Tab eventKey="conditions" title="Conditions">
                                                            <div className="patient-condition">
                                                                <div>
                                                                    <Form.Group className="firstname">
                                                                        <Row>
                                                                            <Col sm={4}>
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

                                                                            <Col sm={4}>
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

                                                                            <Col sm={4}>
                                                                                <Form.Label className="col-sm-12">Assessment</Form.Label>
                                                                            </Col>
                                                                        </Row>
                                                                    </Form.Group>
                                                                </div>
                                                            </div>

                                                            <div className="mt-4">
                                                                <TableComponent data={conditionsAdded} cols={this.state.conditionCols} bordered={false} striped={false} removeThead={true} isTableFor={'conditions'} />
                                                            </div>
                                                        </Tab>
                                                        <Tab eventKey="devices" title="Devices">
                                                            {/*<div className="supplied-devices-wrapper">
                                                                <div className="supplied-devices-section">
                                                                    <h5>Supplied Devices:</h5>

                                                                    <Button variant="primary" onClick={this._openModalDevices}>Add Device</Button>
                                                                </div>
                                                                <div className="mt-4">
                                                                    <TableComponent data={devicesAdded} cols={this.state.devicesCols} bordered={false} striped={false} isTableFor={'patients-devices'} />
                                                                </div>
                                                            </div>*/}

                                                            <div className="patient-device-wrapper">
                                                                <div className="header">
                                                                    <h5>Patient Devices:</h5>

                                                                    <Button variant="primary" onClick={this._openModalDevices}>Add Device</Button>
                                                                </div>

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
                                                </div>
                                            </div>
                                            <div className="btn-add">
                                                <Button type="submit" variant="primary" className={`btn-submit ${isAddingNewPatientLoading ? 'disabled' : ''}`}>
                                                    { isAddingNewPatientLoading ?
                                                        <span className="ml-2">Saving Patient Data...</span>
                                                        :
                                                        <>Save</>
                                                    }
                                                </Button>
                                            </div>
                                        </div>
                                    </Form>
                                )} />

                            <FormFinal
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
                                                <h5>Adding new device - {`${addingNewDeviceLabel}`}</h5>
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
                                                                             {...input}
                                                                             className="form-control">
                                                                                <option>-- SELECT A DEVICE --</option>
                                                                                { optionDevicesLists }
                                                                         </Form.Control>
                                                                     </>
                                                                 )}
                                                             </Field>

                                                             <OnChange name="addDevice">
                                                                {(value, previous) => {
                                                                  this._setSelectedDevice(value, devicesLists)
                                                                }}
                                                              </OnChange>
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
                                                 <Button onClick={(event) => {
                                                    handleSubmit(event).then(() => {
                                                        this._closeModalDevices()
                                                    })
                                                 }}
                                                 type="submit" disabled={pristine} variant="primary" className="btn-submit">
                                                     Add Device
                                                 </Button>
                                             </Modal.Footer>
                                         </Modal>
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
                                        initialCenter={this.state.patientLocation}>
                                        <Marker onClick={this.onMarkerClick} name={this.state.patientAddress} />
                                        <InfoWindow
                                            marker={this.state.activeMarker}
                                            visible={this.state.showingInfoWindow}
                                            onClose={this.onClose}>
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

                        {/* Show Notification modal */}
                        <FormFinal
                            initialValues={{

                            }}
                            onSubmit={this._handleSubmitNotifications}
                            validate={this._handleValidateNotifications}
                            render={({values, initialValues, pristine, submitting, handleSubmit, form }) => (
                              <Form onSubmit={handleSubmit}>
                                  <Modal
                                    show={showNotificationModal}
                                    size="lg"
                                    aria-labelledby="contained-modal-title-vcenter"
                                    centered
                                    onHide={this._closeNotifications}>
                                      <Modal.Header closeButton>
                                          <Modal.Title id="contained-modal-title-vcenter">
                                              Notification Settings
                                          </Modal.Title>
                                      </Modal.Header>

                                      <Modal.Body>
                                          <Row>
                                              <Col sm={12}>
                                                  <Container>
                                                      <Form.Group className="high-severity">
                                                          <Row>
                                                              <Col sm={12} className="checkbox-wrapper">
                                                                  <Form.Label className="col-sm-6">When you have an upcoming appointment</Form.Label>
                                                                  <div className="col-sm-6">
                                                                      <label className="notification-label">
                                                                          <Field name="upcomingAppointmentPush" type="checkbox" value="push">
                                                                              {({ input, meta }) => (
                                                                                  <>
                                                                                      <input
                                                                                          {...input}
                                                                                      />
                                                                                  </>
                                                                              )}
                                                                          </Field>
                                                                          <span>Push</span>
                                                                      </label>

                                                                      <label className="notification-label">
                                                                          <Field name="upcomingAppointmentEmail" type="checkbox" value="email">
                                                                              {({ input, meta }) => (
                                                                                  <>
                                                                                      <input
                                                                                          {...input}
                                                                                      />
                                                                                  </>
                                                                              )}
                                                                          </Field>
                                                                          <span>Email</span>
                                                                      </label>

                                                                      <label className="notification-label">
                                                                          <Field name="patientAssessmentText" type="checkbox" value="text">
                                                                              {({ input, meta }) => (
                                                                                  <>
                                                                                      <input
                                                                                          {...input}
                                                                                      />
                                                                                  </>
                                                                              )}
                                                                          </Field>
                                                                          <span>Text</span>
                                                                      </label>
                                                                  </div>
                                                              </Col>

                                                              <Col sm={12} className="checkbox-wrapper">
                                                                  <Form.Label className="col-sm-6">Remote Patient Reading is outside of recommended range</Form.Label>
                                                                  <div className="col-sm-6">
                                                                      <label className="notification-label">
                                                                          <Field name="rpmReadingPush" type="checkbox" value="push">
                                                                              {({ input, meta }) => (
                                                                                  <>
                                                                                      <input
                                                                                          {...input}
                                                                                      />
                                                                                  </>
                                                                              )}
                                                                          </Field>
                                                                          <span>Push</span>
                                                                      </label>

                                                                      <label className="notification-label">
                                                                          <Field name="rpmReadingEmail" type="checkbox" value="email">
                                                                              {({ input, meta }) => (
                                                                                  <>
                                                                                      <input
                                                                                          {...input}
                                                                                      />
                                                                                  </>
                                                                              )}
                                                                          </Field>
                                                                          <span>Email</span>
                                                                      </label>

                                                                      <label className="notification-label">
                                                                          <Field name="rpmReadingText" type="checkbox" value="text">
                                                                              {({ input, meta }) => (
                                                                                  <>
                                                                                      <input
                                                                                          {...input}
                                                                                      />
                                                                                  </>
                                                                              )}
                                                                          </Field>
                                                                          <span>Text</span>
                                                                      </label>
                                                                  </div>
                                                              </Col>

                                                              <Col sm={12} className="checkbox-wrapper">
                                                                  <Form.Label className="col-sm-6">Patient Reading Overdue Remider</Form.Label>
                                                                  <div className="col-sm-6">
                                                                      <label className="notification-label">
                                                                          <Field name="patientReadingOverduePush" type="checkbox" value="push">
                                                                              {({ input, meta }) => (
                                                                                  <>
                                                                                      <input
                                                                                          {...input}
                                                                                      />
                                                                                  </>
                                                                              )}
                                                                          </Field>
                                                                          <span>Push</span>
                                                                      </label>

                                                                      <label className="notification-label">
                                                                          <Field name="patientReadingOverdueEmail" type="checkbox" value="email">
                                                                              {({ input, meta }) => (
                                                                                  <>
                                                                                      <input
                                                                                          {...input}
                                                                                      />
                                                                                  </>
                                                                              )}
                                                                          </Field>
                                                                          <span>Email</span>
                                                                      </label>

                                                                      <label className="notification-label">
                                                                          <Field name="patientReadingOverdueText" type="checkbox" value="text">
                                                                              {({ input, meta }) => (
                                                                                  <>
                                                                                      <input
                                                                                          {...input}
                                                                                      />
                                                                                  </>
                                                                              )}
                                                                          </Field>
                                                                          <span>Text</span>
                                                                      </label>
                                                                  </div>
                                                              </Col>

                                                              <Col sm={12} className="checkbox-wrapper">
                                                                  <Form.Label className="col-sm-6">Patient Reading Due Remider</Form.Label>
                                                                  <div className="col-sm-6">
                                                                      <label className="notification-label">
                                                                          <Field name="patientReadingDuePush" type="checkbox" value="push">
                                                                              {({ input, meta }) => (
                                                                                  <>
                                                                                      <input
                                                                                          {...input}
                                                                                      />
                                                                                  </>
                                                                              )}
                                                                          </Field>
                                                                          <span>Push</span>
                                                                      </label>

                                                                      <label className="notification-label">
                                                                          <Field name="patientReadingDueEmail" type="checkbox" value="email">
                                                                              {({ input, meta }) => (
                                                                                  <>
                                                                                      <input
                                                                                          {...input}
                                                                                      />
                                                                                  </>
                                                                              )}
                                                                          </Field>
                                                                          <span>Email</span>
                                                                      </label>

                                                                      <label className="notification-label">
                                                                          <Field name="patientReadingDueText" type="checkbox" value="text">
                                                                              {({ input, meta }) => (
                                                                                  <>
                                                                                      <input
                                                                                          {...input}
                                                                                      />
                                                                                  </>
                                                                              )}
                                                                          </Field>
                                                                          <span>Text</span>
                                                                      </label>
                                                                  </div>
                                                              </Col>
                                                          </Row>
                                                      </Form.Group>
                                                  </Container>
                                              </Col>
                                          </Row>
                                      </Modal.Body>

                                      <Modal.Footer className="edit-patient">
                                          <Button variant="primary" className="btn-save" type="submit" disabled={pristine}>Save</Button>
                                          <Button variant="danger" onClick={this._closeNotifications}>Close</Button>
                                      </Modal.Footer>
                                  </Modal>
                              </Form>
                            )}
                          />
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
