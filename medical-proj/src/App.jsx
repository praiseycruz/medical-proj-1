import React from 'react'
import { Router, Route, Link, Switch, Redirect } from 'react-router-dom'
import { DashboardPage, PatientPage, AddPatientPage } from './pages'
import { MainWrapper, MainContentWrapper } from './styled_components/app.style'
import { PageLogoSection } from './styled_components/header.style'
import { SideBarContainer, SideBarContent } from './styled_components/sidebar.style'
import { NavbarWrapper, NotificationBell } from './styled_components/navbar.style'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Accordion, Card } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faBell, faCaretDown, faCaretRight } from "@fortawesome/free-solid-svg-icons"

import './assets/scss/global.scss'
import { history } from './helpers'

export default class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            patientsOpen: false,
            sidebarOpen: true
        }
    }

    _caretOpen = () => {
        this.setState({
            patientsOpen: !this.state.patientsOpen
        })
    }

    _handleSidebar = () => {
        this.setState({
            sidebarOpen: !this.state.sidebarOpen
        })
    }

    render() {
        let { patientsOpen, sidebarOpen } = this.state

        return (
            <Router history={history} exact path="/" render={() => {
                return (
                    <Redirect to="/dashboard" />
                )
            }}>
        	   <MainWrapper className={`${sidebarOpen ? '' : 'content-collapse'}`}>
        			<NavbarWrapper>
                        <Navbar fixed="top">
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
                        </Navbar>
                    </NavbarWrapper>

                    <SideBarContainer className="sidebar">
                        <SideBarContent>
                            <div className="user-panel">
                                <div className="user-image">
                                    <img src="/images/default-user-icon.png" className="img-circle user-img-circle img-fluid" alt="User" />
                                </div>

                                <div className="user-info">
                                    <p>John Doe</p>
                                </div>
                            </div>

                            <div className="sidebar-menu-section">
                                <Accordion>
                                    <Card>
                                        <Card.Header>
                                            <img src="/images/dashboard.svg" className="img-fluid dashboard-icon" alt="dashboard-svg"/>
                                            <Link to="/dashboard" className="card-links">Dashboard</Link>
                                        </Card.Header>
                                    </Card>

                                    <Card>
                                        <Card.Header>
                                            <Accordion.Toggle as={Link} variant="link" eventKey="1" onClick={this._caretOpen}>
                                                <span>
                                                    <i className="fas fa-wheelchair"></i>
                                                    <span className="card-links">Patients</span>
                                                </span>

                                                <FontAwesomeIcon size="sm" className="icon" icon={patientsOpen ? faCaretDown : faCaretRight} />
                                            </Accordion.Toggle>
                                        </Card.Header>

                                        <Accordion.Collapse eventKey="1" className="accordion-collapse">
                                            <ul>
                                                <li><Link to="/addpatients">Patients Details</Link></li>
                                                <li><Link to="#">Patients Readings</Link></li>
                                            </ul>
                                        </Accordion.Collapse>
                                    </Card>

                                    <Card>
                                        <Card.Header>
                                            <i className="fas fa-user-md"></i>
                                            <Link to="#" className="card-links">Physician Management</Link>
                                        </Card.Header>
                                    </Card>

                                    <Card>
                                        <Card.Header>
                                            <i className="fas fa-file-medical"></i>
                                            <Link to="#" className="card-links">Care Manager Management</Link>
                                        </Card.Header>
                                    </Card>

                                    <Card>
                                        <Card.Header>
                                            <i className="fas fa-tasks"></i>
                                            <Link to="#" className="card-links">Tasks</Link>
                                        </Card.Header>
                                    </Card>

                                    <Card>
                                        <Card.Header>
                                            <i className="fas fa-file-medical-alt"></i>
                                            <Link to="#" className="card-links">Reports</Link>
                                        </Card.Header>
                                    </Card>

                                    <Card>
                                        <Card.Header>
                                            <i className="far fa-building"></i>
                                            <Link to="#" className="card-links">Office setup</Link>
                                        </Card.Header>
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
                            <Route exact path="/addpatients" component={AddPatientPage} />
                        </Switch>
                    </MainContentWrapper>
        		</MainWrapper>
        	</Router>
        )
    }
}
