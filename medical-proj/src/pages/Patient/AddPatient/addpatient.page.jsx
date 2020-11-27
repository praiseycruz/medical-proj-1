import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { AddPatientWrapper } from '../styled_components/addpatient.style'
import { Form as FormFinal, Field } from "react-final-form"
import { Form, Row, Col, Button, Modal, Card, Tabs, Tab } from 'react-bootstrap'
import { TableComponent } from '../../../components/Table'
import { patientAction, dashboardAction, practitionerAction, deviceAction, careTeamAction } from '../../../actions'
import iziToast from 'izitoast';
import { RandNum } from '../../../helpers/misc'
import { config } from '../../../config'
import { patientService } from '../../../services'

import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import moment from 'moment'
import { OnChange } from 'react-final-form-listeners'
import _ from 'lodash'

//string prototype for uppercase
String.prototype.ucwords = function() {
  let str = this.toLowerCase()
  return str.toLowerCase().replace(/(?<= )[^\s]|^./g, a=>a.toUpperCase())
}

//label when adding the device
var addingNewDeviceLabel = ''


//hidden form component
const HiddenForm = ({values}) => {

    addingNewDeviceLabel = `${typeof values.firstname!=='undefined' ? values.firstname : ''} ${typeof values.lastname!=='undefined' ? values.lastname : ''}`.ucwords()

    return null
}

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

class AddPatientPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            deviceIds: [],
            currentSelectedDevice: null,
            hasSetSelects: false,
            patientDevicesLists: [], // store all the devices populated in the table (data passed in registering patient)
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
            isPatientCreated: false,
            hasPatientCreated: false,
            dob: new Date(), // date of birth state
            physicianValue: '', // store the physician value on select physician dropdown
            physicianData: [], // store the physician data on select physician dropdown
            careManagerValue: '', // store the care manager value on select care manager dropdown
            careManagerData: [], // store the care manager value on select care manager dropdown
            careManagerLists: [], // store all care managers and display in Primary Care Manager dropwdown
            physicianLists: [], // store all physicians and display in Primary Physician dropdown
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
            ], // dummy data of conditions - displayed in table
            devicesLists: [], // store all the devices lists and display in dropdown
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
            showModalAddPatientDevices: false, // show modal if "Add Device" button is clicked
            deviceValue: '', // setting the device value on select device name
            devicesDataOnClick: [], // save devices data on select devices dropdown inside modal
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
                        return <button className="btn btn-primary" onClick={(e, id) => { this._viewAlert(e, colData.id) }}>View</button>
                    }
                }
            ],
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
            showAlertModal: false,
            isAddingNewPatientLoading: false
        }
    }

    _handleSubmit = async (values, form) => {
        const { dispatch } = this.props
        let { careManagerData, physicianData, deviceIds } = this.state

        let s = document.getElementById("date_picker_id")
        let dobFormat = moment(s.value).format("MM-DD-yyyy")
        let physicianID = null
        let careManagerID = null

        if (physicianData.length > 0 && careManagerData.length > 0) {
            // get physician id
            physicianData.map((physician, index) => {
                physicianID = physician.id
            })

            // get care manager id
            careManagerData.map((careManager, index) => {
                careManagerID = careManager.id
            })
        }

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
                    "system": "http://hl7.org/fhir/sid/us-ssn",
                    "value": `${values.ssn}`
                },
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

        if (physicianID !== null && careManagerID !== null && deviceIds.length > 0) {
            try {
                this.setState({
                    isAddingNewPatientLoading: true
                })

                await patientService.create(patientData, physicianID, careManagerID, deviceIds)

                this.setState({
                    isAddingNewPatientLoading: false
                })

                Object.keys(values).forEach(key => {
                    form.change(key, undefined)
                    form.resetFieldState(key)
                })

            } catch(e) {
                console.log(e)
            }
        } else if (physicianID == null) {
            iziToast.error({
               position: 'topRight',
               title: 'Error',
               displayMode: 1,
               message: "Please select patient's primary physician"
           });
       } else if (careManagerID == null) {
           iziToast.error({
              position: 'topRight',
              title: 'Error',
              displayMode: 1,
              message: "Please select patient's primary care manager"
          });
      } else if (deviceIds.length < 0) {
          iziToast.error({
             position: 'topRight',
             title: 'Error',
             displayMode: 1,
             message: "Please add patient's devices before registering patient"
         });
      }
    }

    _handleValidate = values => {
        const errors = {}
        let patientId = []
		let firstname = []
        let lastname = []
		let addemail = []
        let ssn = []
        let addressLine1 = []
        let zipcode = []
        let phoneNum = []
        let mobileNum = []
        let medicareId = []
        let state = []

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

        if (!values.ssn)
            ssn.push("SSN is required")

        if (!values.addressLine1)
            addressLine1.push("Address is required")

        if (!values.zipcode)
            zipcode.push("Zipcode is required")

        if (!values.state)
            state.push("State is required")

        if (!values.phoneNum)
            phoneNum.push("Phone number is required")

        if (!values.mobileNum)
            mobileNum.push("Mobile number is required")


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

        if (ssn.length > 0)
            errors.ssn = ssn

        if (addressLine1.length > 0)
            errors.addressLine1 = addressLine1

        if (zipcode.length > 0)
            errors.zipcode = zipcode

        if (state.length > 0)
            errors.state = state

        if (phoneNum.length > 0)
            errors.phoneNum = phoneNum

        if (mobileNum.length > 0)
            errors.mobileNum = mobileNum

		return errors
    }

    _openModal = () => {
        let { isPatientCreated } = this.state

        this.setState({
            showModalAddPatientDevices: true
        })

        // if (isPatientCreated) {
        //     this.setState({
        //         showModalAddPatientDevices: true
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
            showModalAddPatientDevices: false
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

        let { patientDevicesLists, deviceIds } = this.state

        patientDevicesLists = _.filter(patientDevicesLists, e => e.id!==id)


        if (deviceIds.indexOf(id)!==-1)
            deviceIds.splice(deviceIds.indexOf(id), 1)

        this.setState({
            patientDevicesLists,
            deviceIds
        })
    }

    _handleSubmitDevice = async (values) => {

        await sleep(300)

        let { currentSelectedDevice, patientDevicesLists, deviceIds } = this.state

        if (currentSelectedDevice!==null) {

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

    componentDidMount() {
        const { dispatch } = this.props
        dispatch(deviceAction.findUnassigned())
        // dispatch(practitionerAction.getAll(100, 0))
        dispatch(practitionerAction.getAllPhysician(100, 0))
        dispatch(practitionerAction.getAllCareManager(100, 0))

        console.log(this.hiddenForm)
    }

    componentDidUpdate(prevProps, prevState) {
        let { patient } = this.props
        let { hasPatientCreated, isPatientCreated, physicianData, careManagerData } = this.state
        const { dispatch } = this.props

        if (prevProps.patient !== this.props.patient) {
            let { create } = this.props.patient

            if (typeof create !== 'undefined' && create !== null) {
                let { success, patient } = create

                if (success) {
                    if ( typeof patient !== 'undefined' && patient !== null) {
                        let patientId = patient.id

                        if (!hasPatientCreated) {

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

                    let finalEntriesOfPhysicians = []
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
                    }

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
                    }

                    this.setState({
                        hasSetSelects: true,
                        physicianLists: finalEntriesOfPhysicians,
                        careManagerLists: finalEntriesOfCareManagers
                    })
                }
            }
        }
    }

    _setSelectedDevice = (value, devicesLists) => {

        let { currentSelectedDevice } = this.state
        devicesLists.map (deviceItem => {
            if (deviceItem.resource.id==value) {
                currentSelectedDevice = deviceItem
                this.setState({
                    currentSelectedDevice
                })
            }
        })

    }

    _getDeviceName = (e) => {

        /*
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
                "model": optionModel,
                "id": optionId
            }
        ]

        this.setState({
            deviceValue: value,
            devicesDataOnClick
        })*/
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

    _setDob = date => {
        this.setState({
            dob: date
        });
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

    _handleSubmitAddCondition = () => {

    }

    _handleValidateAddCondition = () => {

    }

    _viewAlert = (e, id) => {
        // e.preventDefault()

        // this.setState({
        //     showAlertModal: true
        // })
    }

    _closeModalAlert = () => {
        // this.setState({
        //     showAlertModal: false
        // })
    }

    render() {
        let { showModalAddPatientDevices,
              devicesAdded,
              devicesLists,
              physicianValue,
              careManagerValue,
              devicesDataOnClick,
              diagnosisCode,
              diagnosisCodeValue,
              conditionLists,
              conditionValue,
              conditionsAdded,
              alertLists,
              patientDevicesLists,
              initialValues,
              physicianLists,
              careManagerLists,
              currentSelectedDevice,
              showAlertModal } = this.state

        let { patient, practitioner } = this.props

        let isAddingNewPatientLoading = false
        let patientId = null
        let patientName = null
        let patientData = null
        let optionDevicesLists = null
        let physicianOptions = []
        let careManagerListsOptions = []
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
                <div className="mt-3">
                    <Card>
                        <Card.Header>Add patient info</Card.Header>

                        <Card.Body>
                            <FormFinal
                                initialValues={initialValues}
                                onSubmit={this._handleSubmit}
                                validate={this._handleValidate}
                                render={({values, initialValues, pristine, submitting, handleSubmit, form }) => (
                                    <Form onSubmit={(event) => {
                                        const promise = handleSubmit(event);
                                        promise && promise.then(() => {
                                            const { dispatch } = this.props
                                            //dispatch(practitionerAction.getAll(100, 0, this.state.role))
                                            dispatch(patientAction.getAll(100, 0))
                                            form.reset();
                                            iziToast.success({
                                                position: 'topRight',
                                                title: 'Success',
                                                displayMode: 1,
                                                message: 'Patient registered successfully!!',
                                            })
                                         }); return promise; }}>

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
                                                                                 value={careManagerValue}
                                                                                 onChange={(e) => { this._getPrimaryCareManager(e) }}>
                                                                                 <option>Select a Primary Care Manager</option>
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
                                                                              onChange={date => this._setDob(date)}
                                                                              isClearable
                                                                              placeholderText="MM/DD/YYYY"
                                                                              dateFormat="MM/dd/yyyy"
                                                                              value={this.state.dob}
                                                                              id="date_picker_id"
                                                                              autoComplete="off"
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
                                                        </Tab>
                                                        <Tab eventKey="devices" title="Devices">
                                                            <div className="supplied-devices-wrapper">
                                                                <div className="supplied-devices-section">
                                                                    <h5>Supplied Devices:</h5>

                                                                    <Button variant="primary" onClick={this._openModal}>Add Device</Button>
                                                                </div>
                                                                <div className="mt-4">
                                                                    <TableComponent data={devicesAdded} cols={this.state.devicesCols} bordered={false} striped={false} isTableFor={'patients-devices'} />
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
                                                </div>
                                            </div>

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

                            <FormFinal
                                 onSubmit={this._handleSubmitDevice}
                                 validate={this._handleValidateDevice}
                                 render={({values, initialValues, pristine, submitting, handleSubmit }) => (
                                     <Form onSubmit={handleSubmit}>
                                         <Modal
                                             show={showModalAddPatientDevices}
                                             size="md"
                                             aria-labelledby="contained-modal-title-vcenter"
                                             centered
                                             onHide={this._closeModal}
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
                                                        this._closeModal()
                                                    })
                                                 }}
                                                 type="submit" disabled={pristine} variant="primary" className="btn-submit">
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
                        </Card.Body>
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

const connectedAddPatientPage = connect(mapStateToProps)(AddPatientPage)
export { connectedAddPatientPage as AddPatientPage }
