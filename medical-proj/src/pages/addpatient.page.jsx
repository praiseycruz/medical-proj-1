import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { AddPatientWrapper } from './styled_components/addpatient.style'
import { Form as FormFinal, Field } from "react-final-form";
import { Form, Row, Col, Button, Container, Modal } from 'react-bootstrap'
import { TableComponent } from '../components/Table'
import { patientAction } from '../actions'

class AddPatientPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showModal: false,
            devices: [
                {
                    id: '1',
                    deviceName: 'Device Name',
                    name: 'GlucoMeter Glucometer',
                    serialNum: 'W9865456828403682'
                },
                {
                    id: '2',
                    deviceName: 'Device Name',
                    name: 'GlucoMeter Glucometer',
                    serialNum: 'W9865456828403682'
                },
                {
                    id: '3',
                    deviceName: 'Device Name',
                    name: 'GlucoMeter Glucometer',
                    serialNum: 'W9865456828403682'
                }
            ],
            cols: [
                {
                    title: '',
                    key: 'deviceName',
                    render: colData => {
                        return <span>{colData.deviceName}</span>;
                    }
                },
                {
                    title: '',
                    key: 'name',
                    render: colData => {
                        return <span>{colData.name}</span>;
                    }
                },
                {
                    title: '',
                    key: 'serialNum',
                    render: colData => {
                        return <span>{colData.serialNum}</span>;
                    }
                },
                {
                    title: '',
                    key: 'button',
                    render: colData => {
                        return <button className="btn btn-danger" onClick={(e) => { this._removeData(colData.id) }}>Remove</button>;
                    }
                }
            ]
        }
    }

    _handleSubmit = async values => {
        let { firstname, lastname, addemail: email, gender, ssn, address, zipcode, phoneNum, monitor } = values
        const { dispatch } = this.props

        let patientData = {
            "resourceType": "Patient",
            "name": [
                {
                    "use": "official",
                    "given": [`${firstname}`],
                    "family": `${lastname}`
                }
            ],
            "gender": `${gender}`,
            "telecom": [
                {
                    "value": `${phoneNum}`,
                    "use": "mobile",
                    "system": "phone"
                },
                {
                    "system": "email",
                    "value": `${email}`
                }
            ],
            "address": [
                {
                    "text": [
                        `${address}`
                    ],
                    "postalCode": `${zipcode}`
                }
            ],
            "identifier": [
                {
                    "type": {
                        "coding": [
                            {
                                "system": "http://terminology.hl7.org/CodeSystem/v2-0203",
                                "code": "SSN"
                            }
                        ]
                    },
                    "system": "http://hl7.org/fhir/sid/us-ssn",
                    "value": `${ssn}`
                }
            ],
        }

        dispatch(patientAction.create(patientData))
    }

    _handleValidate = () => {

    }

    _openModal = () => {
        this.setState({
            showModal: true
        })
    }

    _closeModal = () => {
        this.setState({
            showModal: false
        })
    }

    _addDevice = () => {

    }

    _removeData = (id) => {
        alert(id)
    }

    render() {
        let { showModal, devices } = this.state

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

                <div>
                    <FormFinal
                            initialValues={{
                                gender: 'male'
                            }}
                            onSubmit={this._handleSubmit}
                            validate={this._handleValidate}
                            render={({values, initialValues, pristine, submitting, handleSubmit }) => (
                                <Form onSubmit={handleSubmit}>
                                    <div className="patient-info">
                                        <h2>Patient Info</h2>

                                        <Container>
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
                                                                            {...input}
                                                                        />
                                                                    </>
                                                                )}
                                                            </Field>
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </Form.Group>

                                            <Form.Group className="email" controlId="formBasicEmail">
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
                                        </Container>
                                    </div>

                                    <div className="devices">
                                        <h2>Devices</h2>

                                        <Container>
                                            <Form.Group className="devices">
                                                <div className="device-wrapper">
                                                    <div className="col-sm-12 col-md-6 col-lg-4">
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

                                                    <Button onClick={this._openModal}>Add Device</Button>
                                                </div>
                                            </Form.Group>

                                            <div className="mt-4">
                                                <TableComponent data={devices} cols={this.state.cols} bordered={false} striped={false} removeThead={true}/>
                                            </div>
                                        </Container>
                                    </div>

                                    <div className="btn-add">
                                        <Button type="submit" disabled={pristine} variant="primary" className="btn-submit">
                                            Add Patient
                                        </Button>
                                    </div>
                                </Form>
                        )} />

                    <FormFinal
                         initialValues={{

                         }}
                         onSubmit={this._handleSubmit}
                         validate={this._handleValidate}
                         render={({values, initialValues, pristine, submitting, handleSubmit }) => (
                             <Form onSubmit={handleSubmit}>
                             <Modal
                                 show={showModal}
                                 size="md"
                                 aria-labelledby="contained-modal-title-vcenter"
                                 centered
                                 onHide={this._closeModal}
                             >
                                 <Modal.Header closeButton>
                                    <h5>Adding new device - "John Doe"</h5>
                                 </Modal.Header>

                                 <Modal.Body>
                                     <div className="adding-new">
                                         <Form.Group className="devices-types mt-4">
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
                                         </Form.Group>

                                         <Form.Group className="devices-types">
                                             <Form.Label className="col-sm-5">Device</Form.Label>
                                             <div className="col-sm-7">
                                                 <Field name="device" type="text">
                                                     {({ input, meta, type }) => (
                                                         <>
                                                             <Form.Control
                                                                 type={type}
                                                                 placeholder="Device"
                                                                 autoComplete="off"
                                                                 {...input}
                                                             />
                                                         </>
                                                     )}
                                                 </Field>
                                             </div>
                                         </Form.Group>

                                         <Form.Group className="devices-types">
                                             <Form.Label className="col-sm-5">Device Name</Form.Label>
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
                                     <Button onClick={this._addDevice}>Add Device</Button>
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
    const { } = state
    return {

    }
}

const connectedAddPatientPage = connect(mapStateToProps)(AddPatientPage)
export { connectedAddPatientPage as AddPatientPage }
