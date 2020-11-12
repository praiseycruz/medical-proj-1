import styled from 'styled-components'

export const DashboardWrapper = styled.div`
    .dashboard-content {
        .form-wrapper {
            &.patients-content {
                padding: 5px 0;
                border-bottom: 1px solid #fff;

                .add-patient {
                    .bg-primary {
                        background-color: #5CA9F0 !important;
                        color: #fff;
                        padding: 12px 20px;
                        border-radius: 5px;
                    }
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
                        border-radius: 30px;
                        border: 1px solid #939496;
                        font-size: 14px;
                    }
                }
            }
        }

        .state-overview {
            margin-top: 30px;

            .row {
                justify-content: center;

                .info-box {
                    border-bottom-left-radius: 5px;
                    border-top-right-radius: 5px;
                    min-height: 100px;
                    background: #fff;
                    width: 100%;
                    box-shadow: 0 5px 20px rgba(0, 0, 0, .1);
                    -webkit-box-shadow: 0 5px 20px rgba(0, 0, 0, .1);
                    margin-bottom: 20px;
                    padding: 15px;

                    .info-box-icon {
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
                            font-size: 16px;
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
    }

`
