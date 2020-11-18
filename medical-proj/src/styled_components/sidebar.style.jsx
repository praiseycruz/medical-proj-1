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
    margin-top: 20px;

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
            .card-links {
                padding: 15px;
                color: #fff;
                display: flex;
                align-items: center;
                font-size: 14px;
                text-decoration: none;

                &.active {
                    background-color: #464B55;
                }

                img,
                i {
                    margin-right: 10px;
                }
            }


            .card {
                background-color: #353C48;
                border: none;

                .card-header {
                    display: flex;
                    align-items: center;
                    background-color: transparent;
                    border: none;
                    padding: 15px;

                    i {
                        font-size: 16px;
                        margin-right: 10px;
                    }

                    .dashboard-icon {
                        margin-right: 10px;
                    }

                    button {
                        color: #fff;
                        text-decoration: none;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        width: 100%;
                        font-size: 14px;
                        padding: 0;

                        &:focus {
                            box-shadow: none;
                        }
                    }
                }

                ul {
                    list-style: none;
                    padding: 0;
                    margin: 0;

                    li {
                        padding: 10px 10px 10px 35px;

                        i {
                            margin-right: 10px;
                        }
                    }
                }

                .accordion-collapse {
                    ul {
                        li {
                            a {
                                color: #dddddd;
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
