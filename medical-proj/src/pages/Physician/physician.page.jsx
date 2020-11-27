import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { AddPhysicianWrapper } from './styled_components/physician.style'
import { Form as FormFinal, Field } from "react-final-form"
import { Form, Row, Col, Button, Card, Modal } from 'react-bootstrap'
import { practitionerAction, dashboardAction, patientAction } from '../../actions'
import iziToast from 'izitoast';
import { RandNum } from '../../helpers'
import { config } from '../../config'
import { practitionerService } from '../../services'

import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import moment from 'moment'
import { TableComponent } from '../../components/Table'

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

class PhysicianPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            currentPage: 1,
            showPhysicianEditModal: false,
            getPhysicanDataOnClick: {}, // set physician data on click edit button
            role: 'Primary Physician', // set role to physician
            isPractitionerCreated: false,
            hasPractitionerCreated: false,
            practitionerLoading: false,
            practitionerData: {}, // store newly practitioner created
            practitionersLists: [], // store all the lists of practitioners
            dob: new Date(),
            practitionersPagination: null, // pracitioner pagination
            practitionerTotal: null, // practitioner total
            practitionerCols: [
                {
                    title: 'Name',
                    key: 'name',
                    render: colData => {
                        return <span>{ colData.resource.name[0].prefix + " " + colData.resource.name[0].given + " " + colData.resource.name[0].family }</span>;
                    }
                },
                {
                    title: 'DOB',
                    key: 'dob',
                    render: colData => {
                        return <span>{colData.resource.birthDate}</span>;
                    }
                },
                {
                    title: 'Gender',
                    key: 'gender',
                    render: colData => {
                        return <span>{colData.resource.gender}</span>;
                    }
                },
                {
                    title: 'Mobile',
                    key: 'mobile',
                    render: colData => {
                        return <span>{colData.resource.telecom[1].value}</span>;
                    }
                },
                {
                    title: 'Email',
                    key: 'email',
                    render: colData => {
                        return <span className="email">{colData.resource.telecom[2].value}</span>;
                    }
                },
                {
                    title: 'Actions',
                    key: 'button',
                    render: colData => {
                        return <span>
                                    <button className="btn btn-primary edit" onClick={(e, data) => { this._showEditModal(e, colData.resource) }}>
                                        <i className="fas fa-pencil-alt"></i>
                                    </button>
                               </span>;
                    }
                }
            ], // practitioner table columns,
            isAddingNewPractitionerLoading: false,
            initialValues: {
                firstname: '',
                lastname: '',
                addemail: '',
                phoneNum: '',
                mobileNum: '',
                gender: 'male',
                ssn: '',
                addressLine1: '',
                addressLine2: '',
                state: '',
                zipcode: ''
            }, // form final initial values
            sort: {
                col: 0,
                asc: true
            }
        }
    }

    componentDidMount() {
        const { dispatch } = this.props
        //dispatch(practitionerAction.getAll(100, 0, this.state.role))
        dispatch(practitionerAction.getAllPhysician(100,0))
    }

    componentDidUpdate(prevProps, prevState) {
        let { practitioner } = this.props
        let { isPractitionerCreated, hasPractitionerCreated } = this.state
        const { dispatch } = this.props

        if (prevProps.practitioner !== this.props.practitioner) {
            let { create, getAll } = practitioner

            // for newly registered practitioner
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
                        }
                    }
                }
            }

            // getting all the lists of practitioners
            if (typeof getAll !== 'undefined' && getAll !== null) {
                let { physicians, loading } = getAll

                if (loading) {
                    this.setState({
                        practitionerLoading: true
                    })
                } else {
                    this.setState({
                        practitionerLoading: false
                    })
                }

                if (typeof physicians !== 'undefined' && physicians !== null) {
                    let { entry, link, total } = physicians

                    this.setState({
                        practitionerTotal: total,
                        practitionersPagination: link
                    })

                    if (typeof entry !== 'undefined' && entry !== null) {
                        this.setState({
                            practitionersLists: entry
                        })
                    } else {
                        this.setState({
                            practitionersLists: []
                        })
                    }
                }
            }
        }
    }

    _handleSubmit = async (values, form) => {
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
                    "value": RandNum("PX"),
                    "system": "EXSYS"
                }
            ],
            "extension": [{
                "url": config.apiGateway.URL + "/Role",
                "valueString": `${this.state.role}`
            }]
        }

        try {
            this.setState({
                isAddingNewPractitionerLoading: true
            })

            await practitionerService.create(practitionerData)

            this.setState({
                isAddingNewPractitionerLoading: false
            })

            Object.keys(values).forEach(key => {
                form.change(key, undefined)
                form.resetFieldState(key)
            })

        } catch(e) {
            console.log(e)
        }
    }

    _handleValidate = values => {
        const errors = {}
        let prefix = []
		let firstname = []
        let lastname = []
		let addemail = []
        let ssn = []
        let addressLine1 = []
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

        if (!values.addressLine1)
            addressLine1.push("Address is required")

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

        if (addressLine1.length > 0)
            errors.addressLine1 = addressLine1

        if (zipcode.length > 0)
            errors.zipcode = zipcode

        if (phoneNum.length > 0)
            errors.phoneNum = phoneNum

            console.log(errors);

		return errors
    }

    _setDob = date => {
        this.setState({
            dob: date
        });
    }

    _showEditModal = (e, data) => {
        console.log(data);

        this.setState({
            showPhysicianEditModal: true,
            getPhysicanDataOnClick: data
        })
    }

    _closeModal = () => {
        this.setState({
            showPhysicianEditModal: false,
            getPhysicanDataOnClick: []
        })
    }

    _handleSubmitDevice = (values) => {

    }

    _handleValidateDevice = () => {

    }


    render() {
        let { practitioner } = this.props
        let { practitionersPagination, practitionerLoading, initialValues, showPhysicianEditModal, getPhysicanDataOnClick } = this.state

        let isAddingNewPractitionerLoading = false
        let practitionerPagePagination = null
        let displayPhysicianDataOnModal = null

        if (typeof practitioner !== 'undefined' && practitioner !== null) {
            let { create, getAll } = practitioner

            if (typeof create !== 'undefined' && create !== null) {
                let { practitioner, loading } = create

                if (loading) {
                    isAddingNewPractitionerLoading = true
                } else {
                    isAddingNewPractitionerLoading = false
                }
            }
        }

        if (typeof practitionersPagination !== 'undefined' && practitionersPagination !== null) {
            practitionerPagePagination = practitionersPagination.map((item, index) => {
                let key = index + 1

                return (
                    <div key={key}>
                        { (item.relation === 'next' || item.relation === 'previous') &&
                            <button
                                key={key}
                                className={`${item.relation === 'previous' ? 'btn btn-secondary previous' : 'btn btn-primary next'}`}
                                onClick={(e, link, relation) => { this._getPractitionerPaginationLink(e, item.url, item.relation) }}>
                                { item.relation === 'previous' ?
                                    <>
                                        <i className="fas fa-angle-left"></i> &nbsp; Previous
                                    </> :
                                    <>
                                        Next &nbsp; <i className="fas fa-angle-right"></i>
                                    </>
                                }
                            </button>
                        }
                    </div>
                )
            })
        }

        return (
            <AddPhysicianWrapper>
                <div className="mt-3">
                    <Card>
                        <Card.Header>Physician Info</Card.Header>

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
                                            dispatch(practitionerAction.getAllPhysician(100,0))
                                            form.reset();
                                            iziToast.success({
                                                position: 'topRight',
                                                title: 'Success',
                                                displayMode: 1,
                                                message: 'Physician registered successfully!!',
                                            })
                                         }); return promise; }}>

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

                                                    <Form.Group className="physician-number">
                                                        <Row>
                                                            <Col sm={12}>
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
                                                            <Col sm={12} className="physician-inputs">
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

                                                    <Form.Group className="physician-address">
                                                        <Row>
                                                            <Col sm={12} className="physician-inputs">
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

                                                    <Form.Group className="physician-state">
                                                        <Row>
                                                            <Col sm={12} className="physician-inputs">
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
                                                <Button type="submit" disabled={pristine || this.state.isAddingNewPractitionerLoading} variant="primary" className={`btn-submit`}>

                                                    { this.state.isAddingNewPractitionerLoading ?
                                                    'Adding Physician...' : 'Add Physician'
                                                    }
                                                </Button>
                                            </div>
                                        </div>
                                    </Form>
                                )} />
                        </Card.Body>
                    </Card>

                    <Card className="dashboard-table mt-4">
                        <Card.Header>Physicians Lists</Card.Header>

                        <Card.Body>
                            <div className="form-wrapper patients-content">
                                <Row>
                                    <Col sm={12} className="column-content">
                                        <Form>
                                            <Form.Group as={Row} controlId="searchPatients">
                                                <Form.Label className="mb-0 px-3">
                                                    Search physicians
                                                </Form.Label>

                                                <div className="px-2">
                                                    <Form.Control type="text" placeholder="Search by name or ID" />
                                                </div>

                                                <Button className="btn btn-submit">Search</Button>
                                            </Form.Group>
                                        </Form>
                                    </Col>
                                </Row>
                            </div>

                            <TableComponent
                                data={this.state.practitionersLists}
                                cols={this.state.practitionerCols}
                                loading={practitionerLoading}
                                total={this.state.practitionerTotal}
                                isTableFor="practitioners"
                            />

                            <div className="pagination">
                                <div className="pagination-content">
                                    { !practitionerLoading ?
                                        <>
                                            { this.state.practitionerTotal === 0 ?
                                                <span>Showing 0 items of 0 entries</span>
                                                :
                                                <span>Showing {this.state.practitionersLists.length} items of {this.state.practitionersLists.length} entries</span>
                                            }

                                            <div className="pagination-button">
                                                { practitionerPagePagination }
                                            </div>
                                        </>
                                        :
                                        <></>
                                    }
                                </div>
                            </div>

                            <FormFinal
                                initialValues={initialValues}
                                onSubmit={this._handleSubmit}
                                validate={this._handleValidate}
                                render={({values, initialValues, pristine, submitting, handleSubmit, form }) => (
                                    <Modal
                                        show={showPhysicianEditModal}
                                        size="lg"
                                        aria-labelledby="contained-modal-title-vcenter"
                                        centered
                                        className="edit-physician-modal"
                                        onHide={this._closeModal}>

                                        <Modal.Header closeButton>
                                            <Modal.Title id="contained-modal-title-vcenter">
                                                Update physician data for
                                            </Modal.Title>
                                        </Modal.Header>

                                        <Modal.Body>
                                            <Form onSubmit={(event) => {
                                                const promise = handleSubmit(event);
                                                promise && promise.then(() => {
                                                    const { dispatch } = this.props
                                                    //dispatch(practitionerAction.getAll(100, 0, this.state.role))
                                                    dispatch(practitionerAction.getAllPhysician(100,0))
                                                    form.reset();
                                                    iziToast.success({
                                                        position: 'topRight',
                                                        title: 'Success',
                                                        displayMode: 1,
                                                        message: 'Physician registered successfully!!',
                                                    })
                                                 }); return promise; }}>

                                                <div className="physician-info">
                                                    <Row>
                                                        <Col sm={6}>
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
                                                                        <Form.Label className="col-sm-4">Phone</Form.Label>
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

                                                            <Form.Group className="physician-number">
                                                                <Row>
                                                                    <Col sm={12}>
                                                                        <Form.Label className="col-sm-4">Mobile</Form.Label>
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
                                                        </Col>

                                                        <Col sm={6}>
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
                                                                    <Col sm={12} className="physician-inputs">
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

                                                            <Form.Group className="physician-address">
                                                                <Row>
                                                                    <Col sm={12} className="physician-inputs">
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

                                                            <Form.Group className="physician-state">
                                                                <Row>
                                                                    <Col sm={12} className="physician-inputs">
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
                                                </div>
                                            </Form>
                                        </Modal.Body>

                                        <Modal.Footer>
                                            <div className="btn-add">
                                                <Button type="submit" disabled={pristine || this.state.isAddingNewPractitionerLoading} variant="primary" className={`btn-submit`}>

                                                    { this.state.isAddingNewPractitionerLoading ?
                                                    'Updating Physician...' : 'Update Physician'
                                                    }
                                                </Button>
                                            </div>

                                            <Button variant="danger" onClick={this._closeModal}>Close</Button>
                                        </Modal.Footer>
                                    </Modal>
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
