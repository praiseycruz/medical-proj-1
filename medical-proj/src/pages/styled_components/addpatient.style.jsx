import styled from 'styled-components'

export const AddPatientWrapper = styled.div`
    h2 {
        font-size: 22px;
        margin: 30px 20px;
    }

    .btn-add {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        margin-top: 20px;
    }

    .form-control {
        background-color: transparent;
        border: 1px solid #5d6472;
        border-radius: 2px;
        color: #fff;
    }

    .patient-info {
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
        }
    }

    .device-wrapper {
        display: flex;
        justify-content: space-between;
        align-items: center;

        button {
            background-color: #5CA9F0;
        }
    }
`
