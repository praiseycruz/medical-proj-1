import styled from 'styled-components'

export const AddPatientWrapper = styled.div`
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

    .patient-info {
        margin-top: 30px;

        .col-sm-6 {
            display: flex;
            justify-content: space-between;
            align-items: center;
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

        .card-header {
            font-size: 20px;
            border-radius: 2px;
            border: none;
        }
    }
`
