import styled from 'styled-components'

export const AddCareManagerWrapper = styled.div`
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
            .care-manager-info {
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
            }
        }
    }
`
