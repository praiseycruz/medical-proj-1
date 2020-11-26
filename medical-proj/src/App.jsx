import React from 'react'
import { Router, Route, Link, Switch, Redirect , NavLink} from 'react-router-dom'
import { DashboardPage, PhysicianPage, CareManagerPage, TaskManagementPage, ReportsPage, AddNewDevicePage } from './pages'
import { AddPatientPage, PatientReadingsPage  } from './pages/Patient'
import { MainWrapper, MainContentWrapper } from './styled_components/app.style'
import { PageLogoSection } from './styled_components/header.style'
import { SideBarContainer, SideBarContent } from './styled_components/sidebar.style'
import { NavbarWrapper } from './styled_components/navbar.style'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Accordion, DropdownButton, Dropdown, Card, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faBell, faCaretRight, faCaretDown } from "@fortawesome/free-solid-svg-icons"
import { connect } from 'react-redux'
import 'izitoast/dist/css/iziToast.min.css'; // added izitoast css

import './assets/scss/global.scss'
import { history } from './helpers'

export class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            officeSetup: false,
            sidebarOpen: true
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

        let pages = {
            'dashboard': 'Dashboard',
            'patient-management': 'Patient Management',
            'add-patients': 'Add Patient',
            'reports': 'Reports',
            'physician': 'Office Setup',
            'care-manager': 'Office Setup',
            'task-management': 'Office Setup',
            'add-device': 'Office Setup'
        }

        let exceptions = ['physician','care-manager','task-management','add-device']
        let exceptionsMap = ['Physician Management', 'Care Manager Management', 'Tasks', 'Add New Device']
        let currentPage = (window.location.pathname).toString().replace('/','')

        if (exceptions.indexOf(currentPage)!==-1)
            this._setOfficePage(exceptionsMap[exceptions.indexOf(currentPage)])
        else
            this._setCurrentPage(pages[currentPage])


    }

    _setCurrentPage = (page) => {

        let { dispatch, breadCrumbs } = this.props
        /*
        if (breadCrumbs.history.indexOf(page)==-1) {
            breadCrumbs.history.push(page)
        } else {
            breadCrumbs.history = []
            breadCrumbs.history.push(page)
        }*/
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

    render() {
        let { sidebarOpen, officeSetup } = this.state

        let historyLength = this.props.breadCrumbs.history.length

        return (
            <Router history={history}>
        	   <MainWrapper className={`${sidebarOpen ? '' : 'content-collapse'}`}>
        			<NavbarWrapper>
                        <Navbar collapseOnSelect expand="lg" variant="dark" fixed="top">
                            <PageLogoSection className="page-logo">
                                <ul>
                                    <li><Link to="/dashboard">Evixia</Link></li>
                                </ul>
                            </PageLogoSection>

                            <Nav className="mr-auto">
                                <Nav.Link onClick={this._handleSidebar}>
                                    <FontAwesomeIcon size="sm" className="icon" icon={faBars} />
                                </Nav.Link>


                                <div className="page-breadcrumbs">
                                    <ol className="breadcrumb page-breadcrumb pull-right">
            							<li>
                                            <i className="fa fa-home"></i>&nbsp;
                                            <Link to="/dashboard" className="parent-item">Home</Link>
                                            &nbsp;<i className="fa fa-angle-right"></i>
            							</li>

                                        { this.props.breadCrumbs.history.map ((h, key) => {
                                                return (
                                                    <span key={key} className="d-flex">
                                                        <li className={(h==this.props.breadCrumbs.currentPage) ? 'active' : ''}>
                                                            { h }
                                                            { historyLength > 1 && key!= ( historyLength - 1 ) &&
                                                                <>
                                                                    &nbsp;<i className="fa fa-angle-right"></i>
                                                                </>
                                                            }
                                                        </li>
                                                    </span>
                                                )
                                            })
                                        }

            						</ol>
                                </div>
                            </Nav>

                            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                            <Navbar.Collapse id="responsive-navbar-nav">
                                <Nav className="ml-auto">
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
                                                <span style={{ fontSize: '16px' }}>John Doe</span>
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
                            {/*<div className="user-panel">
                                <div className="user-image">
                                    <img src="/images/default-user-icon.png" className="img-circle user-img-circle img-fluid" alt="User" />
                                </div>

                                <div className="user-info">
                                    <p>John Doe</p>
                                </div>
                            </div>*/}

                            <div className="sidebar-menu-section">
                                <Accordion>
                                    <NavLink onClick={() => {this._setCurrentPage('Dashboard')}}
                                    to="/dashboard" activeClassName="active" className="card-links">
                                        <img src="/images/dashboard.svg" className="img-fluid dashboard-icon" alt="dashboard-svg"/>
                                        <span className="link-text">Dashboard</span>
                                    </NavLink>

                                    <NavLink onClick={() => {this._setCurrentPage('Patient Management')}} to="/patient-management" activeClassName="active" className="card-links">
                                        <i className="fas fa-book-open"></i>
                                        <span className="link-text">Patient Management</span>
                                    </NavLink>

                                    <NavLink onClick={() => {this._setCurrentPage('Add New Patient')}} to="/add-patients" activeClassName="active" className="card-links">
                                        <i className="fas fa-info-circle"></i>
                                        <span className="link-text">Add New Patient</span>
                                    </NavLink>

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
                                                    <NavLink onClick={() => {this._setOfficePage('Physician Management')}} to="/physician" className="card-links" activeClassName="active">
                                                        <i className="fas fa-user-md"></i>
                                                        <span className="link-text">Physician Management</span>
                                                    </NavLink>

                                                    <NavLink onClick={() => {this._setOfficePage('Care Manager Management')}} to="/care-manager" className="card-links" activeClassName="active">
                                                        <i className="fas fa-file-medical"></i>
                                                        <span className="link-text">Care Manager Management</span>
                                                    </NavLink>

                                                    <NavLink onClick={() => {this._setOfficePage('Tasks')}} to="/task-management" className="card-links" activeClassName="active">
                                                        <i className="fas fa-tasks"></i>
                                                        Tasks
                                                    </NavLink>

                                                    <NavLink onClick={() => {this._setOfficePage('Add New Device')}} to="/add-device" className="card-links" activeClassName="active">
                                                        <i className="fas fa-tasks"></i>
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
    const { breadCrumbs } = state
    return {
        breadCrumbs
    }
}

const connectedApp = connect(mapStateToProps)(App)
export default connectedApp
