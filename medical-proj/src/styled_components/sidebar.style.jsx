import styled from 'styled-components'

export const SideBarContainer = styled.div`
    background-color: #353C48;
    position: fixed;
    width: 235px;
    float: left;
    box-shadow: none;
    transition: all 300ms ease-in-out;
`

export const SideBarContent = styled.div`
    position: relative;
    overflow: hidden;
    width: auto;
    height: 688px;

    .user-panel {
        display: flex;
        align-items: center;
        width: 100%;
        color: #ccc;
        padding: 15px 10px 20px 15px;
        transition: all 300ms ease-in-out;

        .user-image {
            width: 35%;
            max-width: 75px;

            img {
                max-width: 100%;
            }

            .user-img-circle {
                background: #fff;
                z-index: 1000;
                position: inherit;
                border: 1px solid rgba(52, 73, 94, 0.44);
                padding: 2px;
                border-radius: 50%;
            }
        }

        .user-info {
            p {
                margin-bottom: 0;
                padding-left: 15px;
                font-size: 20px;
            }
        }
    }

    .sidebar-menu-section {
        /* padding-top: 20px; */
        /* overflow: hidden; */
        width: auto;
        height: 688px;

        .accordion {
            .card {
                background-color: #353C48;
                border: none;

                .card-header {
                    display: flex;
                    align-items: center;
                    background-color: transparent;
                    border: none;

                    i {
                        font-size: 16px;
                        margin-right: 10px;
                    }

                    .dashboard-icon {
                        margin-right: 10px;
                    }

                    a {
                        color: #fff;
                        text-decoration: none;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        width: 100%;
                        font-size: 14px;
                    }
                }

                ul {
                    list-style: none;
                    padding: 0;
                    margin: 0;

                    li {
                        padding: 10px 10px 10px 55px;
                    }
                }

                .accordion-collapse {
                    ul {
                        li {
                            a {
                                color: #ffffff80;
                                font-size: 14px;
                                text-decoration: none;
                            }
                        }
                    }
                }
            }
        }
    }

`
