import styled from 'styled-components'

export const DashboardWrapper = styled.div`
    width: 100%;

    .dashboard-content {
        .form-wrapper {
            &.patients-content {
                margin-top: 20px;
                /* padding: 10px 0; */
                /* border-bottom: 1px solid #fff; */

                .add-patient {
                    display: flex;
                    justify-content: flex-end;
                    align-items: center;

                    .bg-primary {
                        background-color: #5CA9F0 !important;
                        color: #fff;
                        padding: 8px 15px;
                        border-radius: 5px;
                        text-decoration: none;
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

        .card {
            background-color: #353C48;
            margin-top: 30px;

            .card-header {
                font-size: 20px;
                border-radius: 2px;
                border: none;
            }

            .card-body {
                padding: 15px;

                .pagination {
                    margin-top: 25px;
                }
                .pagination span {
                  cursor: pointer;
                  color: black;
                  float: left;
                  padding: 8px 16px;
                  text-decoration: none;
                  transition: background-color .3s;
                  border: 1px solid #ddd;
                }

                .pagination span.active {
                  background-color: #0099FF;
                  color: white;
                  border: 1px solid #0099FF;
                }

                table {
                  border-collapse: collapse;
                  border-spacing: 0;
                  border-collapse: separate;
                  border-spacing: 0;
                  color: #4a4a4d;
                  font: 14px/1.4 "Helvetica Neue", Helvetica, Arial, sans-serif;
                  width: 100%;

                  tr {
                    overflow-x: scroll;
                  }

                  th,
                  td {
                    padding: 15px 15px;
                    vertical-align: middle;
                  }

                  thead {
                    font-size: 14px;
                    line-height: 24px;
                    border: 1px solid transparent;
                    max-width: 100%;
                    font-weight: 900;
                    line-height: 24px;
                    mix-blend-mode: normal;
                    color: #ddd;
                    background-color: #333a46;
                  }

                  thead tr th {
                    padding: 15px 15px;
                    border: 1px solid transparent;
                    text-align: left;
                  }

                  tbody {
                    max-width: 100%;
                  }

                  /* tbody tr:nth-child(odd) {
                    background: #f0f0f2;
                  } */

                  tbody tr:hover {
                    background-color: #464b55;
                  }

                  td {
                    padding: 15px 15px;
                    border-bottom: 1px solid #424955;
                    color: #ddd;
                  }
                }
            }
        }
/*
        .rdt_TableHeader {
            background-color: transparent;
            color: #ddd;
            margin-top: 15px;
        }

        .rdt_TableHeadRow {
            background-color: #353C48;
        }

        .rdt_TableCol {
            color: #ddd;
            font-size: 14px;
        }

        .rdt_Table {
            div {
                &:nth-child(2) {
                    background-color: #353c48;
                    color: #ddd;
                }
            }
        } */

        @media screen and (min-width: 768px) and (max-width: 1023px) {
            .form-wrapper {
                &.patients-content {
                    padding: 5px 0;

                    .add-patient {
                        .bg-primary {
                            padding: 8px;
                        }
                    }
                }
            }
        }
    }

`
