import styled from 'styled-components'

export const DashboardWrapper = styled.div`
    width: 100%;

    .dashboard-content {
        .form-wrapper {
            &.patients-content {
                margin: 5px 0 25px;

                .add-patient {
                    display: flex;
                    justify-content: flex-end;
                    align-items: center;

                    .bg-primary {
                        background-color: #1689f3 !important;
                        color: #fff;
                        padding: 8px 15px;
                        border-radius: 2px;
                        text-decoration: none;
                    }
                }

                .form-group {
                    margin-bottom: 0;
                }

                button {
                    font-size: 15px;
                }
            }

            &.manager-content {
                padding-top: 20px;
            }

            form {
                .form-group {
                    &.row {
                        align-items: center;
                    }

                    .form-control {
                        background-color: #353c48;
                        width: 100%;
                        max-width: 250px;
                        color: #fff;
                        /* border-radius: 30px; */
                        border: 1px solid #767a82;
                        font-size: 15px;
                    }
                }
            }
        }

        .state-overview {
            margin-top: 15px;

            .row {
                justify-content: center;

                .info-box {
                    border-bottom-left-radius: 5px;
                    border-top-right-radius: 5px;
                    min-height: 115px;
                    /* height: 100%; */
                    background: #fff;
                    width: 100%;
                    box-shadow: 0 5px 20px rgba(0, 0, 0, .1);
                    -webkit-box-shadow: 0 5px 20px rgba(0, 0, 0, .1);
                    margin-bottom: 20px;
                    padding: 15px;

                    .info-box-icon {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        float: left;
                        height: 70px;
                        width: 70px;
                        text-align: center;
                        font-size: 30px;
                        line-height: 74px;
                        background: rgba(0, 0, 0, .2);
                        border-radius: 100%;
                    }

                    .info-box-content {
                        padding: 10px 10px 10px 0;
                        margin-left: 90px;

                        .info-box-text,
                        .progress-description {
                            display: block;
                            font-size: 15px;
                            white-space: nowrap;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            font-weight: 400;
                            border-bottom: 1px solid #fff;
                        }

                        .info-box-number {
                            font-weight: 300;
                            font-size: 21px;
                        }

                        &.with-input {
                            /* padding-top: 0; */

                            .info-box-text {
                                display: flex;
                                justify-content: space-between;
                                align-items: center;

                                input {
                                    background-color: #b869d9 !important;
                                    max-width: 110px;
                                    border: 1px solid #d46eff;
                                    height: 25px;
                                    margin-bottom: 5px;
                                    border-radius: 20px;
                                    padding: 6px 12px;

                                    &:focus {
                                        box-shadow: none;
                                    }

                                    &::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
                                        color: #c2c2c2;
                                        opacity: 1; /* Firefox */
                                    }

                                    &:-ms-input-placeholder { /* Internet Explorer 10-11 */
                                        color: #c2c2c2;
                                    }

                                    &::-ms-input-placeholder { /* Microsoft Edge */
                                        color: #c2c2c2;
                                    }
                                }
                            }
                        }
                    }

                    &.bg-blue {
                        background-color: #3598dc;
                    }

                    &.bg-red {
                        background-color: #E91E63;
                    }

                    &.bg-purple {
                        background-color: #8E44AD;
                    }
                }
            }
        }

        .care-manager-wrapper {
            label {
                margin-bottom: 0;
                color: #fff;
                font-size: 20px;
            }

            select {
                background-color: #353c48;
                width: 100%;
                min-width: 250px;
                color: #fff;
                border: 1px solid #767a82;
                font-size: 15px;
                padding: 6px 12px;
            }
        }

        .card {
            background-color: #353C48;
            margin-top: 30px;
            border-radius: 2px;

            .card-header {
                font-size: 20px;
                border-radius: 2px;
                border: none;
                background-color: #2D333D;
            }

            .card-body {
                padding: 15px 25px;

                .pagination {
                    display: flex;
                    justify-content: flex-end;
                    align-items: center;
                    padding: 0;

                    .pagination-content {
                        display: flex;
                        justify-content: space-between;
                        /* justify-content: flex-end; */
                        align-items: center;
                        width: 100%;
                        padding: 10px 0;

                        .pagination-button {
                            width: 215px;
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            flex-direction: row-reverse;

                            span {
                                font-size: 15px;
                            }

                            button {
                                font-size: 15px;
                                padding: 5px 10px;
                                border-radius: 2px;
                                width: 100px;
                            }
                        }
                    }
                }
            }

            &.dashboard-table {
                min-height: 695px;
                box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.33);

                .card-body {
                    /* padding: 0; */
                }
            }
        }

        @media screen and (min-width: 768px) and (max-width: 1023px) {
            /* .form-wrapper {
                &.patients-content {
                    padding: 5px 0;

                    .add-patient {
                        .bg-primary {
                            padding: 8px;
                        }
                    }
                }
            } */
        }
    }

`
