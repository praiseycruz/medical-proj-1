import React from 'react'
import { Router, Route, Link, Switch, Redirect , NavLink} from 'react-router-dom'
import { DashboardPage, PhysicianPage, CareManagerPage, TaskManagementPage, ReportsPage } from './pages'
import { AddPatientPage, PatientReadingsPage  } from './pages/Patient'
import { MainWrapper, MainContentWrapper } from './styled_components/app.style'
import { PageLogoSection } from './styled_components/header.style'
import { SideBarContainer, SideBarContent } from './styled_components/sidebar.style'
import { NavbarWrapper } from './styled_components/navbar.style'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Accordion, DropdownButton, Dropdown, Card, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faBell, faCaretRight, faCaretDown } from "@fortawesome/free-solid-svg-icons"

import 'izitoast/dist/css/iziToast.min.css'; // added izitoast css

import './assets/scss/global.scss'
import { history } from './helpers'

export default class App extends React.Component {
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

    }

    render() {
        let { sidebarOpen, officeSetup } = this.state

        return (
            <Router history={history}>
        	   <MainWrapper className={`${sidebarOpen ? '' : 'content-collapse'}`}>
        			<NavbarWrapper>
                        {/*<Navbar fixed="top">
                            <PageLogoSection className="page-logo">
                                <ul>
                                    <li><Link to="/dashboard">Evixia</Link></li>
                                </ul>
                            </PageLogoSection>

                            <Nav className="mr-auto">
                                <Nav.Link onClick={this._handleSidebar}>
                                    <FontAwesomeIcon size="sm" className="icon" icon={faBars} />
                                </Nav.Link>
                            </Nav>

                            <NotificationBell>
                                <FontAwesomeIcon size="sm" className="icon" icon={faBell} />
                            </NotificationBell>
                        </Navbar>*/}

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

                                <div className="physician-wrapper">
                                    <div className="physician-name">
                                        <p>John Doe, M.D</p>
                                    </div>
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
                                                <span style={{ fontSize: '14px' }}>John Doe</span>
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
                                    <NavLink to="/dashboard" activeClassName="active" className="card-links">
                                        <img src="/images/dashboard.svg" className="img-fluid dashboard-icon" alt="dashboard-svg"/>
                                        <span className="link-text">Dashboard</span>
                                    </NavLink>

                                    <NavLink to="/add-patients" activeClassName="active" className="card-links">
                                        <i className="fas fa-info-circle"></i>
                                        <span className="link-text">Patients Details</span>
                                    </NavLink>

                                    <NavLink to="/patient-readings" activeClassName="active" className="card-links">
                                        <i className="fas fa-book-open"></i>
                                        <span className="link-text">Patients Readings</span>
                                    </NavLink>

                                    {/*<Link to="#" className="card-links">
                                        <i className="fas fa-tasks"></i>
                                        <span className="link-text">Tasks</span>
                                    </Link>*/}

                                    <NavLink to="/reports" className="card-links" activeClassName="active">
                                        <i className="fas fa-file-medical-alt"></i>
                                        <span className="link-text">Reports</span>
                                    </NavLink>

                                    <Card>
                                        <Card.Header>
                                            <Accordion.Toggle as={Button} variant="link" eventKey="1" onClick={this._caretOpen}>
                                                <span>
                                                    <i className="far fa-building"></i>
                                                    <span>Office setup</span>
                                                </span>

                                                <FontAwesomeIcon size="sm" className="icon" icon={officeSetup ? faCaretDown : faCaretRight} />
                                            </Accordion.Toggle>
                                        </Card.Header>

                                        <Accordion.Collapse eventKey="1" className="accordion-collapse">
                                            <ul>
                                                <li>
                                                    <NavLink to="/physician" className="card-links" activeClassName="active">
                                                        <i className="fas fa-user-md"></i>
                                                        <span className="link-text">Physician Management</span>
                                                    </NavLink>

                                                    <NavLink to="/care-manager" className="card-links" activeClassName="active">
                                                        <i className="fas fa-file-medical"></i>
                                                        <span className="link-text">Care Manager Management</span>
                                                    </NavLink>

                                                    <NavLink to="/task-management" className="card-links" activeClassName="active">
                                                        <i className="fas fa-tasks"></i>
                                                        Tasks
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
                            <Route exact path="/patient-readings" component={PatientReadingsPage} />
                            <Route exact path="/physician" component={PhysicianPage} />
                            <Route exact path="/care-manager" component={CareManagerPage} />
                            <Route exact path="/reports" component={ReportsPage} />
                            <Route exact path="/task-management" component={TaskManagementPage} />
                        </Switch>
                    </MainContentWrapper>
        		</MainWrapper>
        	</Router>
        )
    }
}
