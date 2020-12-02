import React from 'react'
import { Router, Route, Link, Switch, Redirect, NavLink } from 'react-router-dom'
import { DashboardPage, PhysicianPage, CareManagerPage, TaskManagementPage, ReportsPage, AddNewDevicePage } from './pages'
import { AddPatientPage, PatientReadingsPage  } from './pages/Patient'
import { MainWrapper, MainContentWrapper } from './styled_components/app.style'
import { PageLogoSection } from './styled_components/header.style'
import { SideBarContainer, SideBarContent } from './styled_components/sidebar.style'
import { NavbarWrapper } from './styled_components/navbar.style'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Accordion, DropdownButton, Dropdown, Card, Button, NavDropdown } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faBell, faCaretRight, faCaretDown } from "@fortawesome/free-solid-svg-icons"
import { connect } from 'react-redux'
import 'izitoast/dist/css/iziToast.min.css'; // added izitoast css
import { practitionerAction } from './actions'

import './assets/scss/global.scss'
import { history } from './helpers'

export class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            officeSetup: false,
            sidebarOpen: true,
            physicianLists: [],
            physicianValue: ''
        }
    }

    _caretOpen = () => {
        this.setState({
            officeSetup: !this.state.officeSetup
        })
    }

    _handleSidebar = () => {
        this.setState({
            sidebarOpen: !this.state.sidebarOpen
        })
    }

    componentDidMount() {
        const { dispatch } = this.props
        dispatch(practitionerAction.getAllPhysician(100,0))

        let pages = {
            'dashboard': 'Dashboard',
            'patient-management': 'Patient Management',
            'add-patients': 'Add Patient',
            'reports': 'Reports',
            // 'physician': 'Office Setup',
            // 'care-manager': 'Office Setup',
            // 'task-management': 'Office Setup',
            // 'add-device': 'Office Setup'
            'physician': 'Physician Management',
            'care-manager': 'Care Management',
            'task-management': 'Task Management',
            'add-device': 'Add Device'
        }

        let exceptions = ['physician','care-manager','task-management','add-device']
        // let exceptionsMap = ['Physician Management', 'Care Management', 'Tasks', 'Add New Device']
        let currentPage = (window.location.pathname).toString().replace('/','')

        this._setCurrentPage(pages[currentPage])

        // if (exceptions.indexOf(currentPage)!==-1)
        //     this._setOfficePage(exceptionsMap[exceptions.indexOf(currentPage)])
        // else
        //     this._setCurrentPage(pages[currentPage])
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.practitioner !== this.props.practitioner) {
            let { create, getAll } = this.props.practitioner

            // getting all the lists of practitioners
            if (typeof getAll !== 'undefined' && getAll !== null) {
                let { physicians, loading } = getAll

                if (typeof physicians !== 'undefined' && physicians !== null) {
                    let { entry, link, total } = physicians

                    if (typeof entry !== 'undefined' && entry !== null) {
                        this.setState({
                            physicianLists: entry
                        })
                    } else {
                        this.setState({
                            physicianLists: []
                        })
                    }
                }
            }
        }
    }

    _setCurrentPage = (page) => {
        let { dispatch, breadCrumbs } = this.props

        breadCrumbs.history = []
        breadCrumbs.history.push(page)

        //set history
        dispatch({
            type: 'SET_HISTORY',
            history: breadCrumbs.history
        })

        //set current page
        dispatch({
            type: 'SET_CURRENT_PAGE',
            currentPage: page
        })
    }

    _setOfficePage = (page) => {

        let { dispatch, breadCrumbs } = this.props

        breadCrumbs.history = []
        breadCrumbs.history.push('Office Setup')
        breadCrumbs.history.push(page)

        //set history
        dispatch({
            type: 'SET_HISTORY',
            history: breadCrumbs.history
        })

        //set current page
        dispatch({
            type: 'SET_CURRENT_PAGE',
            currentPage: 'Office Setup'
        })
    }

    _getPhysicianValue = (e) => {
        let { value } = e.target

        this.setState({
            physicianValue: value
        })
    }

    render() {
        let { sidebarOpen, officeSetup, physicianLists } = this.state
        let { practitioner } = this.props

        let historyLength = this.props.breadCrumbs.history.length
        let physicianOptions = []

        if (typeof practitioner !== 'undefined' && practitioner !== null) {
            let { getAll } = practitioner

            if (typeof getAll !== 'undefined' && getAll !== null) {
                let { physicians } = getAll

                if (typeof physicians !== 'undefined' && physicians !== null) {
                    let { entry } = physicians

                    if (typeof entry !== 'undefined' && entry !== null) {
                        physicianOptions = entry.map((physician, index) => {
                            let { resource } = physician

                            if (typeof resource !== 'undefined' && resource !== null) {
                                let { name, id } = resource
                                let fullname = name[0].given + ' ' + name[0].family

                                return (
                                    <option key={index} value={id}>{fullname}, M.D</option>
                                )
                            }
                        })
                    }
                }
            }
        }

        return (
            <Router history={history}>
        	   <MainWrapper className={`${sidebarOpen ? '' : 'content-collapse'}`}>
        			<NavbarWrapper>
                        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" fixed="top">
                            <PageLogoSection className="page-logo">
                                <ul>
                                    <li><Link to="/dashboard">Evixia</Link></li>
                                </ul>
                            </PageLogoSection>

                            <Navbar.Toggle aria-controls="responsive-navbar-nav" />

                            <Navbar.Collapse id="responsive-navbar-nav">
                                <Nav className="mr-auto menu-icon">
                                    <Nav.Link onClick={this._handleSidebar}>
                                        <FontAwesomeIcon size="sm" className="icon" icon={faBars} />
                                    </Nav.Link>

                                    <div className="px-2">
                                        <select
                                            className="form-control"
                                            value={this.state.physicianValue}
                                            onChange={(e) => { this._getPhysicianValue(e) }}>
                                            <option>-- Select physician --</option>
                                            { physicianOptions }
                                        </select>
                                    </div>
                                </Nav>

                                <Nav className="page-name">
                                    <div>
                                        { this.props.breadCrumbs.history.map ((h, key) => {
                                                return (
                                                    <span key={key} className="d-flex">
                                                        <li className={(h==this.props.breadCrumbs.currentPage) ? 'active' : ''}>
                                                            { h }
                                                            { historyLength > 1 && key!= ( historyLength - 1 ) &&
                                                                <>
                                                                    &nbsp;<i className="fa fa-angle-right ml-2"></i>
                                                                </>
                                                            }
                                                        </li>
                                                    </span>
                                                )
                                            })
                                        }
                                    </div>
                                </Nav>

                                <Nav className="settings-icon">
                                    <DropdownButton
                                        menuAlign="right"
                                        title={
                                            <FontAwesomeIcon size="sm" className="icon" icon={faBell} />
                                        }
                                        id="dropdown-menu-align-right">
                                        <Dropdown.Item eventKey="1">Action</Dropdown.Item>
                                        <Dropdown.Item eventKey="2">Another action</Dropdown.Item>
                                        <Dropdown.Item eventKey="3">Something else here</Dropdown.Item>
                                        <Dropdown.Divider />
                                        <Dropdown.Item eventKey="4">Separated link</Dropdown.Item>
                                    </DropdownButton>

                                    <DropdownButton
                                        menuAlign="right"
                                        title={
                                            <>
                                                <img src="/images/default-user-icon.png" className="img-fluid"
                                                style={{ width: '26px',  marginRight: '10px', borderRadius: '50%' }} alt="User Icon"/>
                                                <span style={{ fontSize: '16px' }}></span>
                                            </>
                                        }
                                        id="dropdown-menu-align-right"
                                        className="user-dropdown">
                                        <Dropdown.Item eventKey="1">
                                            Profile
                                        </Dropdown.Item>
                                        <Dropdown.Item eventKey="2">Settings</Dropdown.Item>
                                        <Dropdown.Divider />
                                        <Dropdown.Item eventKey="4">Log Out</Dropdown.Item>
                                    </DropdownButton>
                                </Nav>
                            </Navbar.Collapse>
                        </Navbar>
                    </NavbarWrapper>

                    <SideBarContainer className="sidebar">
                        <SideBarContent>
                            <div className="sidebar-menu-section">
                                <Accordion>
                                    <NavLink onClick={() => {this._setCurrentPage('Dashboard')}}
                                    to="/dashboard" activeClassName="active" className="card-links">
                                        <img src="/images/dashboard.svg" className="img-fluid dashboard-icon" alt="dashboard-svg"/>
                                        <span className="link-text">Dashboard</span>
                                    </NavLink>

                                    <NavLink onClick={() => {this._setCurrentPage('Remote Patient Monitoring')}} to="/remote-patient-monitoring" activeClassName="active" className="card-links">
                                        <i className="fas fa-laptop-medical"></i>
                                        <span className="link-text">Remote Patient Monitoring</span>
                                    </NavLink>

                                    <NavLink onClick={() => {this._setCurrentPage('Patient Management')}} to="/patient-management" activeClassName="active" className="card-links">
                                        <i className="fas fa-book-open"></i>
                                        <span className="link-text">Patient Management</span>
                                    </NavLink>

                                    {/*<NavLink onClick={() => {this._setCurrentPage('Add New Patient')}} to="/add-patients" activeClassName="active" className="card-links">
                                        <i className="fas fa-info-circle"></i>
                                        <span className="link-text">Add New Patient</span>
                                    </NavLink>*/}

                                    <NavLink onClick={() => {this._setCurrentPage('Reports')}} to="/reports" className="card-links" activeClassName="active">
                                        <i className="fas fa-file-medical-alt"></i>
                                        <span className="link-text">Reports</span>
                                    </NavLink>

                                    <Card>
                                        <Card.Header>
                                            <Accordion.Toggle as={Button} variant="link" eventKey="1" onClick={this._caretOpen}>
                                                <span>
                                                    <i className="far fa-building"></i>
                                                    <span className="link-text">Office setup</span>
                                                </span>

                                                <FontAwesomeIcon size="sm" className="icon" icon={officeSetup ? faCaretDown : faCaretRight} />
                                            </Accordion.Toggle>
                                        </Card.Header>

                                        <Accordion.Collapse eventKey="1" className="accordion-collapse">
                                            <ul>
                                                <li>
                                                    <NavLink onClick={() => {this._setCurrentPage('Physician Management')}} to="/physician" className="card-links" activeClassName="active">
                                                        <i className="fas fa-user-md"></i>
                                                        <span className="link-text">Physician Management</span>
                                                    </NavLink>

                                                    <NavLink onClick={() => {this._setCurrentPage('Care Management')}} to="/care-manager" className="card-links" activeClassName="active">
                                                        <i className="fas fa-file-medical"></i>
                                                        <span className="link-text">Care Management</span>
                                                    </NavLink>

                                                    <NavLink onClick={() => {this._setCurrentPage('Tasks')}} to="/task-management" className="card-links" activeClassName="active">
                                                        <i className="fas fa-tasks"></i>
                                                        Tasks
                                                    </NavLink>

                                                    <NavLink onClick={() => {this._setCurrentPage('Add New Device')}} to="/add-device" className="card-links" activeClassName="active">
                                                        <i className="fas fa-stethoscope"></i>
                                                        Add New Device
                                                    </NavLink>
                                                </li>
                                            </ul>
                                        </Accordion.Collapse>
                                    </Card>
                                </Accordion>
                            </div>
                        </SideBarContent>
                    </SideBarContainer>

                    <MainContentWrapper className="main-content">
                        <Switch>
                            <Route
                                exact
                                path="/"
                                render={() => {
                                return (
                                    <Redirect to="/dashboard" />
                                )
                            }}
                            />
                            <Route exact path="/dashboard" component={DashboardPage} />
                            <Route exact path="/add-patients" component={AddPatientPage} />
                            <Route exact path="/patient-management" component={PatientReadingsPage} />
                            <Route exact path="/physician" component={PhysicianPage} />
                            <Route exact path="/care-manager" component={CareManagerPage} />
                            <Route exact path="/reports" component={ReportsPage} />
                            <Route exact path="/task-management" component={TaskManagementPage} />
                            <Route exact path="/add-device" component={AddNewDevicePage} />
                        </Switch>
                    </MainContentWrapper>
        		</MainWrapper>
        	</Router>
        )
    }
}


function mapStateToProps(state) {
    const { breadCrumbs, practitioner } = state
    return {
        breadCrumbs,
        practitioner
    }
}

const connectedApp = connect(mapStateToProps)(App)
export default connectedApp
