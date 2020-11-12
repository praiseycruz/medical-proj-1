import styled from 'styled-components'

export const PatientsWrapper = styled.div`
    .patients-content {
        .form-wrapper {
            &.patients-search {
                padding: 5px 0;
                border-bottom: 1px solid #fff;

                .add-patient-button {
                    /* display: flex;
                    justify-content: flex-end;
                    align-items: center; */
                }
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
    }
`
