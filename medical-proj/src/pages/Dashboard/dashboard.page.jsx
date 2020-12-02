import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { DashboardWrapper } from './styled_components/dashboard.style'
import { Form, Row, Col, Button, Card } from 'react-bootstrap'
import { Form as FormFinal, Field } from "react-final-form"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsers, faExclamationTriangle } from "@fortawesome/free-solid-svg-icons"
import { dashboardAction, patientAction, practitionerAction } from '../../actions'
import { TableComponent } from '../../components/Table'
import { dataOrDefault } from '../../helpers'

class DashboardPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            count: 0,
            role: 'Care Manager',
            patientsModule: {
                totalPages: 0,
                currentPage: 1,
                prevLink: null,
                nextLink: null
            },
            hasGetPatientCount: false,
            searchValue: null,
            patientsPagination: null,
            patientTotal: null,
            patientLoading: false,
            patientsData: [],
            patientCols: [
                {
                    title: 'Name',
                    key: 'name',
                    render: colData => {
                        // return <Link to="/patient-readings">{ colData.resource.name[0].given + " " + colData.resource.name[0].family }</Link>;
                        return <span>{colData.resource.name[0].given + " " + colData.resource.name[0].family}</span>;
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
                    title: 'Care Manager',
                    key: 'careManager',
                    render: colData => {
                        return <span>{ dataOrDefault(colData => colData.resource.generalPractitioner.reference) }</span>;
                    }
                },
                {
                    title: 'Actions',
                    key: 'button',
                    render: colData => {
                        return <span><button className="btn btn-primary edit" onClick={(e, data) => { this._getPatientData(e, colData.resource)} }><i className="fas fa-pencil-alt"></i></button></span>;
                    }
                }
            ],
            careManagerValue: 'all',
            careManagerLists: [
                {
                    name: 'One Sample'
                },
                {
                    name: 'Two Sample'
                }
            ],
            activityValue: ''
        }
    }

    componentDidMount() {
        const { dispatch } = this.props
        dispatch(dashboardAction.count())
        dispatch(patientAction.getAll(10, 0))
        // dispatch(practitionerAction.getAll(20, 0, this.state.role))
        dispatch(practitionerAction.getAllCareManager(100,0))
    }

    componentDidUpdate(prevProps, prevState) {
        let { dashboardPatientCount } = this.props
        let { hasGetPatientCount } = this.state

        if (typeof dashboardPatientCount !== 'undefined' && dashboardPatientCount !== null) {
            let { count } = dashboardPatientCount

            if (typeof count !== 'undefined' && count !== null) {
                if (typeof count.count !== 'undefined' && count.count !== null) {
                    let totalNumberOfPatients = count.count

                    if (!hasGetPatientCount) {
                        this.setState({
                            count: totalNumberOfPatients,
                            hasGetPatientCount: true
                        })
                    }
                }
            }
        }

        if (prevProps.patient !== this.props.patient) {
            let { getAll } = this.props.patient

            if (typeof getAll !== 'undefined' && getAll !== null) {
                let { patients, loading } = getAll

                if (loading) {
                    this.setState({
                        patientLoading: true
                    })
                } else {
                    this.setState({
                        patientLoading: false
                    })
                }

                if (typeof patients !== 'undefined' && patients !== null) {
                    let { entry, link, total } = patients

                    this.setState({
                        pagination: link,
                        patientTotal: total
                    })

                    if (typeof entry !== 'undefined' && entry !== null) {
                        this.setState({
                            patientsData: entry
                        })
                    } else {
                        // if patient data is null
                        this.setState({
                            patientsData: []
                        })
                    }
                }
            }
        }

        // if (prevProps.practitioner !== this.props.pracitioner) {
        //     let { getAll } = this.props.practitioner
        //
        //     if (typeof getAll !== 'undefined' && getAll !== null) {
        //         let { practitioners } = getAll
        //
        //         if (!this.state.hasSetSelects) {
        //             if (typeof practitioners !== 'undefined' && practitioners !== null) {
        //                 let { entry } = practitioners
        //
        //                 if (typeof entry !== 'undefined' && entry !== null) {
        //                     let finalEntriesOfCareManagers = []
        //
        //                     entry.map((careManager, index) => {
        //                         let { resource } = physician
        //
        //                         if (typeof resource !== 'undefined' && resource !== null) {
        //                             let { name, id } = resource
        //
        //
        //                         }
        //                     })
        //
        //                     this.setState({
        //                         hasSetSelects: true,
        //                         careManagerLists: finalEntriesOfCareManagers
        //                     })
        //                 }
        //             }
        //         }
        //     }
        // }
    }

    _getPaginationLink = (e, link, relation) => {
        const { dispatch } = this.props

        //get patients module state
        let { patientsModule } = this.state

        //set current page to track current page
        //only allow relation with values (next, previous)
        if (relation === 'next' || relation === 'previous') {
            patientsModule.currentPage = (relation === 'next') ? patientsModule.currentPage + 1 : patientsModule.currentPage - 1

            //update patients module state
            this.setState({
                patientsModule
            })
        }

        dispatch(patientAction.getPaginationLink(link, patientsModule.currentPage))
    }

    _handleSubmitSearch = values => {
        let { searchPatient } = values
        const { dispatch } = this.props
        dispatch(patientAction.searchByIdOrName(searchPatient, 10))
    }

    _handleValidate = values => {
        let { searchPatient } = values
        const { dispatch } = this.props

        if (searchPatient === "" || searchPatient === null || searchPatient === 'undefined') {
            dispatch(patientAction.getAll(10, 0))
        }
    }

    _getPatientData = (e, patientData) => {
        // this.props.history.push({
        //     pathname: '/patient-readings',
        //     data: patientData
        // })

        this.props.history.push('/patient-management')
        localStorage.setItem('patientDetails', patientData);
    }

    _getPrimaryCareManagerValue = (e) => {
        let { value } = e.target

        this.setState({
            careManagerValue: value
        })

        // var index = e.target.selectedIndex;
        // var optionElement = e.target.childNodes[index]
        // var optionId =  optionElement.getAttribute('data-id')
        //
        // let physicianData = [
        //     {
        //         "id": optionId,
        //         "role": "Primary Physician"
        //     }
        // ]
    }

    _getActivityValue = (e) => {
        this.setState({
            activityValue: e.target.value
        })
    }

    _onClickGetRpmPatient = () => {

    }

    render() {
        let { practitioner } = this.props
        let { pagination, count, patientLoading, careManagerLists } = this.state

        let pagePagination = null
        let primaryCareManagerOptions = []

        if (typeof pagination !== 'undefined' && pagination !== null) {
            pagePagination = pagination.map((item, index) => {
                let key = index + 1

                return (
                    <>
                        { (item.relation === 'next' || item.relation === 'previous') &&
                            <button
                                key={key}
                                className={`${item.relation === 'previous' ? 'btn btn-secondary previous' : 'btn btn-primary next'}`}
                                onClick={(e, link, relation) => { this._getPaginationLink(e, item.url, item.relation) }}>
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
                    </>
                )
            })
        }

        if (typeof practitioner !== 'undefined' && practitioner !== null) {
            let { getAll } = practitioner

            if (typeof getAll !== 'undefined' && getAll !== null) {
                let { careManagers } = getAll

                if (typeof careManagers !== 'undefined' && careManagers !== null) {
                    let { entry } = careManagers

                    if (typeof entry !== 'undefined' && entry !== null) {
                        primaryCareManagerOptions = entry.map((careManager, index) => {
                            let { resource } = careManager

                            if (typeof resource !== 'undefined' && resource !== null) {
                                let { name, id } = resource
                                let fullname = name[0].given + ' ' + name[0].family

                                return (
                                    <option key={index} value={id}>{fullname}</option>
                                )
                            }
                        })
                    }
                }
            }
        }

        return (
            <DashboardWrapper>
                <div className="dashboard-content">
                    <Card>
                        <Card.Header>
                            <div className="care-manager-wrapper">
                                <div className="row">
                                    <label className="mb-0 px-3">Primary Care Manager: </label>
                                    <div className="px-2">
                                        <select
                                            className="form-control"
                                            value={this.state.careManagerValue}
                                            onChange={(e) => { this._getPrimaryCareManagerValue(e) }}>
                                            <option value="all">ALL</option>
                                            { primaryCareManagerOptions }
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </Card.Header>

                        <Card.Body>
                            <div className="state-overview">
                                <div className="row">
                                    <div className="col-xl-4 col-md-6 col-12">
                                        <div className="info-box bg-blue">
                                            <span className="info-box-icon push-bottom">
                                                <FontAwesomeIcon size="sm" className="icon" icon={faUsers} />
                                            </span>

                                            <div className="info-box-content get-total-rpm" onClick={this._onClickGetRpmPatient}>
                                                <span className="info-box-text">Total RPM patients</span>
                                                <span className="info-box-number">{ this.state.count }</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-xl-4 col-md-6 col-12">
                                        <div className="info-box bg-red">
                                            <span className="info-box-icon push-bottom">
                                                <FontAwesomeIcon size="sm" className="icon" icon={faExclamationTriangle} />
                                            </span>

                                            <div className="info-box-content">
                                                <span className="info-box-text">New critical alerts</span>
                                                <span className="info-box-number">26</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-xl-4 col-md-6 col-12">
                                        <div className="info-box bg-purple">
                                            <span className="info-box-icon push-bottom">
                                                <FontAwesomeIcon size="sm" className="icon" icon={faUsers} />
                                            </span>

                                            <div className="info-box-content with-input">
                                                <span className="info-box-text">
                                                    No activity in days

                                                    <input
                                                        className="form-control"
                                                        placeholder="Enter number"
                                                        value={this.state.activityValue}
                                                        onChange={(e) => { this._getActivityValue(e) }} />
                                                </span>
                                                <span className="info-box-number">150</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>

                    <Row>
                        <Col sm={12} md={12} lg={12} xl={12}>
                            <Card className="dashboard-table">
                                <Card.Header>Patients Lists</Card.Header>

                                <Card.Body>
                                    <div className="form-wrapper patients-content">
                                        <Row>
                                            <Col sm={10} md={9} className="column-content">
                                                <FormFinal
                                                    onSubmit={this._handleSubmitSearch}
                                                    validate={this._handleValidate}
                                                    render={({values, initialValues, pristine, submitting, handleSubmit }) => (
                                                        <Form onSubmit={handleSubmit}>
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

                                            <Col sm={2} md={3} className="add-patient">
                                                <Link to="/patient-management" className="bg-primary">
                                                    <i className="fas fa-plus mr-2"></i>
                                                    Add new patient
                                                </Link>
                                            </Col>
                                        </Row>
                                    </div>

                                    <TableComponent
                                        data={this.state.patientsData}
                                        cols={this.state.patientCols}
                                        total={this.state.patientTotal}
                                        loading={patientLoading}
                                        isTableFor="patients"
                                    />

                                    <div className="pagination">
                                        <div className="pagination-content">
                                            { !patientLoading ?
                                                <>
                                                    { this.state.patientTotal === 0 ?
                                                        <span>Showing 0 items of 0 entries</span>
                                                        :
                                                        <span>Showing {this.state.patientsData.length} items of {count} entries</span>
                                                    }

                                                    <div className="pagination-button">
                                                        { pagePagination }
                                                    </div>
                                                </>
                                                :
                                                <></>
                                            }
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>

                        {/*<Col sm={12} md={12} lg={12} xl={12}>
                            <Card className="dashboard-table">
                                <Card.Header>Practitioners Lists</Card.Header>

                                <Card.Body>
                                    <div className="form-wrapper patients-content">
                                        <Row>
                                            <Col sm={12} className="column-content">
                                                <Form>
                                                    <Form.Group as={Row} controlId="searchPatients">
                                                        <Form.Label className="mb-0 px-3">
                                                            Search practitioners
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
                                        data={this.state.practitionersData}
                                        cols={this.state.practitionerCols}
                                        loading={isGetPractionerLoading}
                                        isTableFor="practitioners"
                                    />

                                    <div className="pagination">
                                        <div className="pagination-content">
                                            { !isGetPractionerLoading ?
                                                <>
                                                    { this.state.practitionerTotal === 0 ?
                                                        <span>Showing 0 items of 0 entries</span>
                                                        :
                                                        <span>Showing {this.state.practitionersData.length} items of {this.state.practitionersData.length} entries</span>
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
                                </Card.Body>
                            </Card>
                        </Col>*/}
                    </Row>
                </div>
            </DashboardWrapper>
        )
    }
}

function mapStateToProps(state) {
    const { patient, practitioner, dashboardPatientCount } = state
    return {
        patient,
        practitioner,
        dashboardPatientCount,
    }
}

const connectedDashboard = connect(mapStateToProps)(DashboardPage)
export { connectedDashboard as DashboardPage }
