import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { AddDiagnosisWrapper } from './styled_components/addDiagnosis.style'
import { Form as FormFinal, Field } from "react-final-form"
import { Form, Row, Col, Button, Modal, Card } from 'react-bootstrap'
import { TableComponent } from '../../components/Table'
import { patientAction, dashboardAction, practitionerAction, deviceAction } from '../../actions'
import iziToast from 'izitoast';
import { RandNum } from '../../helpers/misc'
import { config } from '../../config'

class AddDiagnosisCodePage extends React.Component {
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
            <AddDiagnosisWrapper>
                <div className="mt-3">
                    <Card>
                        <Card.Header>Diagnosis Code</Card.Header>

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
                                                    {/*<Form.Group className="device-type">
                                                        <Row>
                                                            <Col sm={12}>
                                                                <Form.Label className="col-sm-4">Diagnosis</Form.Label>
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
                                                    </Form.Group>*/}

                                                    <Form.Group className="manufacturer">
                                                        <Row>
                                                            <Col sm={12}>
                                                                <Form.Label className="col-sm-4">Diagnosis</Form.Label>
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
                                                </Col>

                                                <Col sm={6}>
                                                    <Form.Group className="manufacturer">
                                                        <Row>
                                                            <Col sm={12}>
                                                                <Form.Label className="col-sm-4">Diagnosis Code</Form.Label>
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
                                                </Col>
                                            </Row>

                                            <div className="btn-add">
                                                <Button type="submit" disabled={pristine} variant="primary" className={`btn-submit`}>
                                                    <span>Add Diagnosis Code</span>
                                                </Button>
                                            </div>
                                        </div>
                                    </Form>
                                )} />
                        </Card.Body>
                    </Card>
                </div>
            </AddDiagnosisWrapper>
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

const connectedAddDiagnosisCodePage = connect(mapStateToProps)(AddDiagnosisCodePage)
export { connectedAddDiagnosisCodePage as AddDiagnosisCodePage }
