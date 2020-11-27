import styled from 'styled-components'

export const AddPhysicianWrapper = styled.div`
    h2 {
        font-size: 20px;
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
        border: 1px solid #767a8259;
        border-radius: 2px;
        color: #fff;
    }

    .card {
        background-color: #353C48;
        min-height: 300px;

        .card-header {
            font-size: 20px;
            border-radius: 2px;
            border: none;
            background-color: #2D333D;
        }

        .card-body {
            .physician-info {
                .col-sm-12 {
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;

                    .form-label {
                        margin-bottom: 0;
                    }
                }

                .col-sm-8 {
                    label {
                        margin-bottom: 0;
                        margin-right: 15px;
                    }

                    input {
                        margin-right: 5px;
                    }
                }

                .react-datepicker-wrapper {
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
            }
        }
    }
`
