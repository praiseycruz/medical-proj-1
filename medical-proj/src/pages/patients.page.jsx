import React from 'react'
import { connect } from 'react-redux'
import { TableComponent } from '../components/Table'
import { Form, FormControl, Row, Col, Button } from 'react-bootstrap'
import { PatientsWrapper } from './styled_components/patients.style'

class PatientPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            patientsData: [
                {
                    name: 'John Doe',
                    dob: '01/01/1987',
                    gender: 'Male',
                    careManager: 'John Doe',
                    pcp: 'John Doe',
                },
                {
                    name: 'John Doe',
                    dob: '01/01/1987',
                    gender: 'Male',
                    careManager: 'John Doe',
                    pcp: 'John Doe',
                },
                {
                    name: 'John Doe',
                    dob: '01/01/1987',
                    gender: 'Male',
                    careManager: 'John Doe',
                    pcp: 'John Doe',
                },
                {
                    name: 'John Doe',
                    dob: '01/01/1987',
                    gender: 'Male',
                    careManager: 'John Doe',
                    pcp: 'John Doe',
                },
                {
                    name: 'John Doe',
                    dob: '01/01/1987',
                    gender: 'Male',
                    careManager: 'John Doe',
                    pcp: 'John Doe',
                },
                {
                    name: 'John Doe',
                    dob: '01/01/1987',
                    gender: 'Male',
                    careManager: 'John Doe',
                    pcp: 'John Doe',
                }
            ],
            cols: [
                {
                    title: 'Patient Name',
                    key: 'name',
                    render: colData => {
                        return <span>{colData.name}</span>;
                    }
                },
                {
                    title: 'DOB',
                    key: 'dob',
                    render: colData => {
                        return <span>{colData.dob}</span>;
                    }
                },
                {
                    title: 'Gender',
                    key: 'gender',
                    render: colData => {
                        return <span>{colData.gender}</span>;
                    }
                },
                {
                    title: 'Care Manager',
                    key: 'careManager',
                    render: colData => {
                        return <span>{colData.careManager}</span>;
                    }
                },
                {
                    title: 'PCP',
                    key: 'pcp',
                    render: colData => {
                        return <span>{colData.pcp}</span>;
                    }
                },
                {
                    title: '',
                    key: 'edit',
                    render: colData => {
                        return <span>{colData.pcp}</span>;
                    }
                }
            ]
        }
    }


    render() {
        return (
            <PatientsWrapper>
                <div className="patients-content">
                    <div className="form-wrapper patients-search">
                        <Row>
                            <Col sm={10} className="column-content">
                                <Form>
                                    <Form.Group as={Row} controlId="searchPatients">
                                        <Form.Label column sm="6" md="6" lg="2">
                                            Search patients
                                        </Form.Label>

                                        <Col sm="4" className="p-0">
                                            <Form.Control type="text" placeholder="Search by name or ID" />
                                        </Col>
                                    </Form.Group>
                                </Form>
                            </Col>

                            <Col sm={2} className="add-patient-button">
                                <Button>Add Patient</Button>
                            </Col>
                        </Row>
                    </div>

                    <TableComponent data={this.state.patientsData} cols={this.state.cols} />
                </div>
            </PatientsWrapper>
        )
    }
}

function mapStateToProps(state) {
    const { } = state
    return {

    }
}

const connectedPatientPage = connect(mapStateToProps)(PatientPage)
export { connectedPatientPage as PatientPage }
