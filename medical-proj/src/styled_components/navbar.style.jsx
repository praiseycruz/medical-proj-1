import styled from 'styled-components'

export const NavbarWrapper = styled.div`
    width: 100%;
    margin: 0;
    border: 0;
    padding: 0;
    min-height: 60px;
    filter: none;
    background-color: #353c48;

    nav {
        height: 60px;
        background-color: #353c48;
        box-shadow: 0 2px 5px 0 rgba(0,0,0,0.16), 0 2px 10px 0 rgba(0,0,0,0.12);

        .navbar-nav {
            .nav-link {
                display: flex;
                justify-content: center;
                align-items: center;

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
    }

    /* width: 100%;
    margin: 0;
    border: 0;
    padding: 0;
    min-height: 60px;
    filter: none;
    background-color: #353c48;

    .navbar {
        background-color: #353c48;
        box-shadow: 0 2px 5px 0 rgba(0,0,0,0.16), 0 2px 10px 0 rgba(0,0,0,0.12);
        padding: 0;


    } */
`

export const NotificationBell = styled.div`
    padding: 10px 20px;
    color: #fff;
`
