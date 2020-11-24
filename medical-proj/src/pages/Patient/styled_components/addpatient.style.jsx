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
        .col-sm-12 {
            &.patient-inputs {
                display: flex;
                justify-content: space-between;
                align-items: center;
            }            
        }

        .form-group {
            .from-label {
                font-size: 15px;
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
                font-size: 15px;
            }
        }

        label {
            margin-bottom: 0;
            font-size: 15px;
        }

        .edit-patient {
            display: flex;
            justify-content: flex-end;
            align-items: center;

            button {
                font-size: 15px;
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
            font-size: 15px;
            border-radius: 2px;
        }

        .react-datepicker-wrapper {
            /* width: 100%; */

            input {
                background-color: #353c48;
                width: 100%;
                max-width: 250px;
                color: #fff;
                border: 1px solid #464e5b;
                font-size: 15px;
                border-radius: 2px;
                padding: 6px 12px;
            }
        }

        .add-patient-condition-wrapper {
            margin-top: 30px;
            border-top: 2px solid #282E38;
            padding-top: 25px;
            min-height: 400px;
        }
    }

    .patient-reading-wrapper {
        /* margin-top: 30px; */

        .patient-readings {
            .form-group {
                .from-label {
                    font-size: 15px;
                }

                .form-control {
                    font-size: 15px;
                }
            }

            label {
                margin-bottom: 0;
            }

            .edit-patient {
                display: flex;
                justify-content: flex-end;
                align-items: center;

                button {
                    font-size: 15px;
                    border-radius: 2px;
                }
            }

            button {
                font-size: 15px;
                border-radius: 2px;
            }

            .patient-data-wrapper {
                margin-top: 25px;

                .patient-name {
                    display: block;
                    font-size: 22px;
                    margin: 0 0px 25px;
                    color: #fff !important;
                    border-top: 2px solid #3C4452;
                    padding: 15px 0 0;
                }

                .patient-data {
                    label {
                        color: #56bbf6;
                        text-transform: uppercase;
                    }

                    span {
                        &.value {
                            color: #fff !important;
                        }
                    }

                    .care-manager,
                    .primary-physician {
                        label {
                            font-size: 18px;
                        }
                    }

                    .group-inline {
                        display: flex;
                        justify-content: flex-start;
                        align-items: center;
                    }
                }
            }
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
                            border-bottom: 1px solid #a9a9a961;
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

    .update-patient-wrapper {

    }
`
