import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { AddPhysicianWrapper } from './styled_components/physician.style'
import { Form as FormFinal, Field } from "react-final-form"
import { Form, Row, Col, Button, Card } from 'react-bootstrap'
import { practitionerAction, dashboardAction, patientAction } from '../../actions'
import iziToast from 'izitoast';
import { RandNum } from '../../helpers'
import { config } from '../../config'

import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import moment from 'moment'

class PhysicianPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showModal: false,
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
                        return <button className="btn btn-danger" onClick={(e) => { this._removeData(colData.id) }}>Remove</button>
                    }
                }
            ],
            isPractitionerCreated: false,
            hasPractitionerCreated: false,
            practitionerData: {},
            dob: new Date(),
        }
    }

    componentDidMount() {
    }

    componentDidUpdate(prevProps, prevState) {
        let { practitioner } = this.props
        let { isPractitionerCreated, hasPractitionerCreated } = this.state
        const { dispatch } = this.props

        if (typeof practitioner !== 'undefined' && practitioner !== null) {
            let { create } = practitioner

            if (typeof create !== 'undefined' && create !== null) {
                let { success, practitioner } = create

                if (success) {
                    if ( typeof practitioner !== 'undefined' && practitioner !== null) {
                        if (!hasPractitionerCreated) {

                            this.setState({
                                isPractitionerCreated: true,
                                hasPractitionerCreated: true,
                                practitionerData: practitioner
                            })

                            iziToast.success({
                                position: 'topRight',
                                title: 'Success',
                                displayMode: 1,
                                message: 'Practitioner registered successfully!',
                            })

                            dispatch(dashboardAction.count())
                            dispatch(patientAction.getAll(10, 0))
                            dispatch(practitionerAction.getAll(10, 0))
                        }
                    }
                }
            }
        }
    }

    _handleSubmit = async values => {
        const { dispatch } = this.props

        let s = document.getElementById("date_picker_id")
        let dobFormat = moment(s.value).format("yyyy-MM-DD")

        let practitionerData = {
            "resourceType": "Practitioner",
            "name": [
                {
                    "use": "official",
                    "given": [`${values.firstname}`],
                    "family": `${values.lastname}`,
                    "prefix": [`${values.prefix}`]
                }
            ],
            "birthDate": `${dobFormat}`,
            "gender": `${values.gender}`,
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
                "url": config.apiGateway.URL + "/Role",
                "valueBoolean": `${values.role}`
            }]
        }

        dispatch(practitionerAction.create(practitionerData))
    }

    _handleValidate = values => {
        const errors = {}
        let prefix = []
		let firstname = []
        let lastname = []
		let addemail = []
        let ssn = []
        let address = []
        let zipcode = []
        let phoneNum = []

        if (!values.prefix)
			firstname.push("Physician Prefix is required")

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

    _setDob = date => {
        this.setState({
            dob: date
        });
    }

    render() {
        let { practitioner } = this.props

        let isAddingNewPractitionerLoading = false

        if (typeof practitioner !== 'undefined' && practitioner !== null) {
            let { create } = practitioner

            if (typeof create !== 'undefined' && create !== null) {
                let { practitioner, loading } = create

                if (loading) {
                    isAddingNewPractitionerLoading = true
                } else {
                    isAddingNewPractitionerLoading = false
                }
            }
        }

        return (
            <AddPhysicianWrapper>
                <div className="page-breadcrumbs">
                    <h1>Physician</h1>

                    <ol className="breadcrumb page-breadcrumb pull-right">
                        <li>
                            <i className="fa fa-home"></i>&nbsp;
                            <Link className="parent-item" to="/dashboard">Home</Link>
                            &nbsp;<i className="fa fa-angle-right">
                            </i>
                        </li>
                        <li>
                            <i className="far fa-building"></i>&nbsp; Office Setup
                            &nbsp;<i className="fa fa-angle-right"></i>
                        </li>
                        <li className="active">Physician Management</li>
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
                                            <Card.Header>Physician Info</Card.Header>

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

                                                <div className="btn-add">
                                                    <Button type="submit" disabled={pristine} variant="primary" className={`btn-submit ${isAddingNewPractitionerLoading ? 'disabled' : ''}`}>
                                                        { isAddingNewPractitionerLoading ?
                                                            <span className="ml-2">Adding Practitioner...</span>
                                                            :
                                                            <>Add Practitioner</>
                                                        }
                                                    </Button>
                                                </div>
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    </>
                                </div>
                            </Form>
                    )} />*/}

                    <Card>
                        <Card.Header>Physician Info</Card.Header>

                        <Card.Body>
                            <FormFinal
                                initialValues={{
                                    gender: 'male'
                                }}
                                onSubmit={this._handleSubmit}
                                validate={this._handleValidate}
                                render={({values, initialValues, pristine, submitting, handleSubmit }) => (
                                    <Form onSubmit={handleSubmit}>
                                        <div className="physician-info">
                                            <Row>
                                                <Col sm={6}>
                                                    <Form.Group className="physician-prefix">
                                                        <Row>
                                                            <Col sm={12}>
                                                                <Form.Label className="col-sm-4">Prefix</Form.Label>
                                                                <div className="col-sm-8">
                                                                    <Field name="prefix" type="text">
                                                                        {({ input, meta, type }) => (
                                                                            <>
                                                                                <Form.Control
                                                                                    type={type}
                                                                                    placeholder="Physician Prefix"
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

                                                    <Form.Group className="physician-firstname">
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

                                                    <Form.Group className="physician-lastname">
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

                                                    <Form.Group className="physician-email">
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

                                                    <Form.Group className="physician-number">
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

                                                    <Form.Group className="physician-ssn">
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

                                                    <Form.Group className="physician-address">
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

                                                    <Form.Group className="physician-zipcode">
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
                                                <Button type="submit" disabled={pristine} variant="primary" className={`btn-submit ${isAddingNewPractitionerLoading ? 'disabled' : ''}`}>
                                                    { isAddingNewPractitionerLoading ?
                                                        <span className="ml-2">Adding Practitioner...</span>
                                                        :
                                                        <>Add Practitioner</>
                                                    }
                                                </Button>
                                            </div>
                                        </div>
                                    </Form>
                                )} />
                        </Card.Body>
                    </Card>
                </div>
            </AddPhysicianWrapper>
        )
    }
}

function mapStateToProps(state) {
    const { practitioner } = state
    return {
        practitioner
    }
}

const connectedPhysicianPage = connect(mapStateToProps)(PhysicianPage)
export { connectedPhysicianPage as PhysicianPage }
