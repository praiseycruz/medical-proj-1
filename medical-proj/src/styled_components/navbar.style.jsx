import styled from 'styled-components'

export const NavbarWrapper = styled.div`
    width: 100%;
    margin: 0;
    border: 0;
    padding: 0;
    min-height: 65px;
    filter: none;
    background-color: #333a47;
    /* background-color: #2C333F; */

    nav {
        height: 65px;
        background-color: #333a47 !important;
        box-shadow: 0 2px 5px 0 rgba(0,0,0,0.16), 0 2px 10px 0 rgba(0,0,0,0.12);
        padding: 8px 0 8px 16px;

        .navbar-collapse {
            padding: 0 10px 0 0;

            .navbar-nav {
                &.menu-icon {
                    width: 100%;
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                }

                &.page-name {
                    width: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;

                    li {
                        font-size: 22px;
                        text-decoration: underline;
                    }
                }

                &.settings-icon {
                    width: 100%;
                    display: flex;
                    justify-content: flex-end;
                    align-items: center;
                }

                .nav-link {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    /* margin-left: 15px; */

                    svg {
                        font-size: 20px;
                        color: #ffffff;
                    }
                }

                .dropdown {
                    button {
                        background-color: transparent;
                        border: none !important;

                        &:focus,
                        &:active {
                            box-shadow: none !important;
                            background-color: transparent;
                            border: none !important;
                        }

                        &:after {
                            display: none;
                        }
                    }

                    &.user-dropdown {
                        button {
                            display: flex;
                            justify-content: center;
                            align-items: center;

                            &:after {
                                display: inline-block;
                                margin-left: 10px;
                            }
                        }
                    }
                }
            }

            .form-control {
                font-size: 16px;
            }
        }

        /* .navbar-collapse {
            width: 140px;
        } */
    }
`

export const NotificationBell = styled.div`
    padding: 10px 20px;
    color: #fff;
`
