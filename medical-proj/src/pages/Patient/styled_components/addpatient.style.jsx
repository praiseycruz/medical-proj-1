import styled from 'styled-components'

export const AddPatientWrapper = styled.div`
    h2 {
        font-size: 22px;
        margin: 40px 0 20px;
    }

    .btn-add {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        margin-top: 20px;
        padding: 0 15px;

        button {
            &:focus {
                box-shadow: none;
            }
        }
    }

    .form-control {
        background-color: transparent;
        border: 1px solid #5d6472;
        border-radius: 2px;
        color: #fff;
    }

    .patient-info {
        margin-top: 30px;

        .col-sm-6 {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .form-group {
            .from-label {
                font-size: 14px;
            }

            .gender-label {
                &.male {
                    margin-right: 25px;
                }

                input {
                    margin-right: 10px;
                }
            }

            .form-control {
                font-size: 14px;
            }
        }

        label {
            margin-bottom: 0;
            font-size: 14px;
        }

        .edit-patient {
            display: flex;
            justify-content: flex-end;
            align-items: center;

            button {
                font-size: 14px;
                border-radius: 2px;
            }
        }

        .patient-info-content {
            margin-top: 25px;

            .card {
                .card-body {
                    .row {
                        .col-sm-12 {
                            display: flex;
                            justify-content: space-between;
                            align-items: center;

                            label {
                                padding: 0;
                            }
                        }
                    }


                }
            }
        }

        button {
            font-size: 14px;
            border-radius: 2px;
        }
    }

    .device-wrapper {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 15px;

        button {
            background-color: #5CA9F0;
        }
    }

    .card {
        background-color: #353C48;
        min-height: 260px;

        .card-header {
            font-size: 20px;
            border-radius: 2px;
            border: none;
            background-color: #2D333D;
        }

        .card-body {
            .card-header-tabs {
                border-bottom: 2px solid #3c4452;
                margin: 0 10px 15px;

                .nav-link {
                    color: #fff;

                    &.active {
                        border-top-left-radius: 2px;
                        border-top-right-radius: 2px;
                        color: #fff;
                        background-color: #464b55;
                        border-color: transparent;
                        border-bottom: none;
                    }

                    &:hover {
                        border-color: #575d69;
                        border-top-left-radius: 2px;
                        border-top-right-radius: 2px;
                        border-bottom: none;
                    }
                }
            }

            .tab-content {
                .active {
                    padding: 0 20px;
                }

                .supplied-devices-wrapper {
                    .supplied-devices-section {
                        margin-top: 30px;
                        display: flex;
                        justify-content: flex-start;
                        align-items: center;

                        h5 {
                            margin-bottom: 0;
                            font-size: 18px;
                        }

                        button {
                            margin-left: 25px;
                            border-radius: 2px;
                            font-size: 16px;
                        }
                    }
                }

                .patient-device-wrapper {
                    margin-top: 30px;
                }
            }

            .patient-condition {
                .col-sm-3 {
                    text-align: center;
                    padding: 0;

                    &:last-child {
                        label {
                            text-align: right;
                        }

                        .add-assessment {
                            display: flex;
                            justify-content: flex-end;
                            align-items: center;
                            margin-top: 0;
                        }
                    }

                    label {
                        &.form-label {
                            border-bottom: 1px solid #fff;
                            padding: 15px;
                            margin-bottom: 20px;
                        }

                        &.programs-label {
                            margin-bottom: 0;
                            display: flex;
                            justify-content: center;
                            align-items: center;

                            input {
                                margin-right: 5px;
                            }
                        }
                    }
                }
            }
        }
    }
`
