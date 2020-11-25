import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { AddDeviceWrapper } from './styled_components/addDevice.style'
import { Form as FormFinal, Field } from "react-final-form"
import { Form, Row, Col, Button, Modal, Card } from 'react-bootstrap'
import { TableComponent } from '../../components/Table'
import { patientAction, dashboardAction, practitionerAction, deviceAction } from '../../actions'
import iziToast from 'izitoast';
import { RandNum } from '../../helpers/misc'
import { config } from '../../config'

class AddNewDevicePage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            deviceTypeValue: '',
            deviceTypeLists: [
                {
                    name: 'Blood Pressure'
                },
                {
                    name: 'Glucose'
                },
                {
                    name: 'Weight'
                }
            ],
            statusValue: '',
            statusLists: [
                {
                    name: 'Active',
                    value: 'active'
                },
                {
                    name: 'Inactive',
                    value: 'inactive'
                }
            ]
        }
    }

    _handleSubmit = async (values) => {
        // let { firstname, lastname, addemail: email, gender, ssn, address, zipcode, phoneNum, monitor } = values
        const { dispatch } = this.props

        // let patientData = {
        //     "resourceType": "Patient",
        //     "name": [
        //         {
        //             "use": "official",
        //             "given": [`${values.firstname}`],
        //             "family": `${values.lastname}`
        //         }
        //     ],
        //     "gender": `${values.gender}`,
        //     "telecom": [
        //         {
        //             "value": `${values.phoneNum}`,
        //             "use": "mobile",
        //             "system": "phone"
        //         },
        //         {
        //             "system": "email",
        //             "value": `${values.addemail}`
        //         }
        //     ],
        //     "address": [
        //         {
        //             "text": [
        //                 `${values.address}`
        //             ],
        //             "postalCode": `${values.zipcode}`
        //         }
        //     ],
        //     "identifier": [
        //         {
        //             "system": "http://hl7.org/fhir/sid/us-ssn",
        //             "value": `${values.ssn}`
        //         },
        //         {
        //             "value": RandNum("PX"),
        //             "system": "EXSYS"
        //         }
        //     ],
        //     "extension": [{
        //         "url": config.apiGateway.URL + "/IsRemoteMonitored",
        //         "valueBoolean": typeof values.monitor === 'undefined' ? false : values.monitor
        //     }]
        // }

        // let deviceCreationData = {
        //     "resourceType": "Device",
        //     "identifier": [{
        //         "system": "EXSYS",
        //         "value": "DV{id}"
        //     }],
        //     "serialNumber": "{sno}",
        //     "manufacturer": "{manf}",
        //     "status": "inactive",
        //     "distinctIdentifier": "{sno}",
        //     "deviceName": [
        //         {
        //             "type": "user-friendly-name",
        //             "name": "{device_name}"
        //         }
        //     ],
        //     "deviceType": {
        //         "coding": [{{ "system": "EXSYS" }}],
        //         "text": "{device_type}"
        //     }
        // }

        // dispatch(patientAction.create(patientData))
    }

    _handleValidate = values => {

    }

    componentDidMount() {
        const { dispatch } = this.props
        dispatch(deviceAction.findUnassigned())
    }

    componentDidUpdate(prevProps, prevState) {

    }

    _getEquipmentType = (e) => {
        let { value } = e.target

        this.setState({
            deviceTypeValue: value
        })
    }

    _getStatusvalue = (e) => {
        let { value } = e.target

        this.setState({
            statusValue: value
        })
    }


    render() {
        let { deviceTypeLists,
              deviceTypeValue,
              statusLists,
              statusValue } = this.state

        let deviceTypeListsOptions = deviceTypeLists.map((item, key) => {
            return (
                <option key={key}>{item.name}</option>
            )
        })

        let statusOptions = statusLists.map((item, key) => {
            return (
                <option key={key}>{item.name}</option>
            )
        })

        return (
            <AddDeviceWrapper>
                <div className="mt-3">
                    <Card>
                        <Card.Header>Device</Card.Header>

                        <Card.Body>
                            <FormFinal
                                initialValues={{

                                }}
                                onSubmit={this._handleSubmit}
                                validate={this._handleValidate}
                                render={({values, initialValues, pristine, submitting, handleSubmit }) => (
                                    <Form onSubmit={handleSubmit}>
                                        <div className="device-info">
                                            <Row>
                                                <Col sm={6}>
                                                    <Form.Group className="device-type">
                                                        <Row>
                                                            <Col sm={12}>
                                                                <Form.Label className="col-sm-4">Device Types:</Form.Label>
                                                                <div className="col-sm-8">
                                                                    <Field name="deviceType" type="select">
                                                                        {({ input, meta, type }) => (
                                                                            <Form.Control
                                                                                 as="select"
                                                                                 value={deviceTypeValue}
                                                                                 onChange={(e) => { this._getEquipmentType(e) }}>
                                                                                 {deviceTypeListsOptions}
                                                                            </Form.Control>
                                                                        )}
                                                                    </Field>
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                    </Form.Group>

                                                    <Form.Group className="device-name">
                                                        <Row>
                                                            <Col sm={12}>
                                                                <Form.Label className="col-sm-4">Device Name</Form.Label>
                                                                <div className="col-sm-8">
                                                                    <Field name="deviceName" type="text">
                                                                        {({ input, meta, type }) => (
                                                                            <>
                                                                                <Form.Control
                                                                                    type={type}
                                                                                    placeholder="Device Name"
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

                                                    <Form.Group className="serial-number">
                                                        <Row>
                                                            <Col sm={12}>
                                                                <Form.Label className="col-sm-4">Serial Number</Form.Label>
                                                                <div className="col-sm-8">
                                                                    <Field name="serialNumber" type="text">
                                                                        {({ input, meta, type }) => (
                                                                            <>
                                                                                <Form.Control
                                                                                    type={type}
                                                                                    placeholder="Serial Number"
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

                                                    <Form.Group className="status">
                                                        <Row>
                                                            <Col sm={12}>
                                                                <Form.Label className="col-sm-4">Status</Form.Label>
                                                                <div className="col-sm-8">
                                                                    <Field name="status" type="select">
                                                                        {({ input, meta, type }) => (
                                                                            <Form.Control
                                                                                 as="select"
                                                                                 value={statusValue}
                                                                                 onChange={(e) => { this._getStatusvalue(e) }}>
                                                                                 {statusOptions}
                                                                            </Form.Control>
                                                                        )}
                                                                    </Field>
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                    </Form.Group>
                                                </Col>

                                                <Col sm={6}>
                                                    <Form.Group className="manufacturer">
                                                        <Row>
                                                            <Col sm={12}>
                                                                <Form.Label className="col-sm-4">Manufacturer</Form.Label>
                                                                <div className="col-sm-8">
                                                                    <Field name="manufacturer" type="text">
                                                                        {({ input, meta, type }) => (
                                                                            <>
                                                                                <Form.Control
                                                                                    type={type}
                                                                                    placeholder="Manufacturer"
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

                                                    <Form.Group className="manufacturer-address">
                                                        <Row>
                                                            <Col sm={12}>
                                                                <Form.Label className="col-sm-4">Address</Form.Label>
                                                                <div className="col-sm-8">
                                                                    <Field name="manufacturerAddress" type="text">
                                                                        {({ input, meta, type }) => (
                                                                            <>
                                                                                <Form.Control
                                                                                    type={type}
                                                                                    placeholder="Manufacturer Address"
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

                                                    <Form.Group className="manufacturer-phone">
                                                        <Row>
                                                            <Col sm={12}>
                                                                <Form.Label className="col-sm-4">Phone</Form.Label>
                                                                <div className="col-sm-8">
                                                                    <Field name="manufacturerPhone" type="text">
                                                                        {({ input, meta, type }) => (
                                                                            <>
                                                                                <Form.Control
                                                                                    type={type}
                                                                                    placeholder="Manufacturer Phone"
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

                                                    <Form.Group className="manufacturer-person">
                                                        <Row>
                                                            <Col sm={12}>
                                                                <Form.Label className="col-sm-4">Person</Form.Label>
                                                                <div className="col-sm-8">
                                                                    <Field name="manufacturerPerson" type="text">
                                                                        {({ input, meta, type }) => (
                                                                            <>
                                                                                <Form.Control
                                                                                    type={type}
                                                                                    placeholder="Manufacturer Contact Person"
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
                                                <Button type="submit" disabled={pristine} variant="primary" className={`btn-submit`}>
                                                    <span>Add New Device</span>
                                                </Button>
                                            </div>
                                        </div>
                                    </Form>
                                )} />
                        </Card.Body>
                    </Card>
                </div>
            </AddDeviceWrapper>
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

const connectedAddNewDevicePage = connect(mapStateToProps)(AddNewDevicePage)
export { connectedAddNewDevicePage as AddNewDevicePage }
