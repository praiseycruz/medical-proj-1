import styled from 'styled-components'

export const TaskManagementWrapper = styled.div`
    /* .card {
        background-color: #353C48;
        min-height: 260px;
        margin-top: 30px;
        border-radius: 2px;

        .card-header {
            font-size: 20px;
            border: none;
            background-color: #2D333D;
        }

        .card-body {
            .patient-data {
                h4 {
                    display: flex;
                    align-items: center;
                    margin-bottom: 0;
                }

                p {
                    font-size: 16px;
                    margin-bottom: 0;

                    span {
                        color: #b0b0b0;
                    }
                }
            }

            .patient-condidtion-wrapper {
                width: 100%;
                background-color: #2f3641;
                border: 1px solid #3c4452;
                padding: 20px;
                margin-top: 25px;
                border-radius: 2px;
                min-height: 100px;

                .conditions-container {
                    .conditions-content {
                        &:first-child {
                            margin-right: 20px;
                        }

                        h5 {
                            margin-bottom: 5px;
                        }

                        p {
                            background-color: #333a46;
                            padding: 2px 10px;
                            font-size: 15px;
                            margin-bottom: 0;
                            border-radius: 2px;
                            display: flex;
                            justify-content: space-between;
                            align-items: center;

                            span {
                                display: flex;
                                justify-content: center;
                                align-items: center;
                                margin-left: 5px;
                            }
                        }

                        &.last {
                            margin: 28px 0 0 10px;

                            button {
                                font-size: 15px;
                                background-color: transparent;
                                border-radius: 2px;
                                padding: 1px 5px;
                                min-width: 130px;
                            }
                        }

                    }
                }
            }

            .logged-wrapper {
                .box-wrapper {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    flex-direction: column;
                    width: 100%;
                    min-height: 115px;
                    border: 1px solid #3c4452;
                    padding: 20px;
                    border-bottom-left-radius: 5px;
                    border-top-right-radius: 5px;

                    .time {
                        font-size: 20px;
                    }
                }

                .logged-content {
                    background-color: #2d7eb6;
                }

                .goal-wrapper {
                    background-color: #d56e13;
                }

                h5 {
                    text-align: center;
                    font-size: 18px;
                    text-transform: uppercase;
                }

                p {
                    text-align: center;
                    margin-bottom: 0;
                }

                .care-team-wrapper {
                    background-color: #1B9938;

                    p {
                        text-align: left;
                        color: #fff;

                        span {
                            color: #ffffff;
                        }
                    }
                }

                .timer-wrapper {
                    width: 100%;
                    min-height: 145px;
                    background-color: #2f3641;
                    border: 1px solid #3c4452;
                    padding: 20px;
                    margin-top: 25px;
                    border-radius: 2px;

                    .timer-content {
                        .form-control {
                            max-width: 100%;
                        }

                        .options-wrapper {
                            margin-bottom: 15px;

                            &:last-child {
                                margin-bottom: 0;
                            }

                            label {
                                margin-bottom: 0;
                            }
                        }

                        .timer-container {
                            height: 100%;
                            padding: 23px 0 0;

                            .timer {
                                text-align: center;
                                font-size: 25px;
                                border: 1px solid #767a8259;
                                border-radius: 2px;
                                margin-bottom: 10px;
                                width: 100%;
                            }

                            .timer-buttons {
                                display: flex;
                                justify-content: space-evenly;
                                align-items: center;
                                width: 100%;

                                button {
                                    width: 55px;
                                    border-radius: 2px;
                                }
                            }
                        }

                        .assigning-wrapper {
                            label {
                                margin-bottom: 0;
                            }

                            .date-wrapper {
                                margin-bottom: 15px;

                                .react-datepicker-wrapper {
                                    input {
                                        background-color: #353c48;
                                        width: 100%;
                                        max-width: 250px;
                                        color: #fff;
                                        border: 1px solid #767a8259;
                                        font-size: 15px;
                                        border-radius: 2px;
                                        padding: 6px 12px;
                                    }
                                }

                                button {
                                    font-size: 15px;
                                    border-radius: 2px;
                                }
                            }
                        }
                    }
                }
            }

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

                .patient-number-wrapper {
                    width: 100%;
                    border: 1px solid #767a8259;
                    min-height: 150px;
                    padding: 15px;
                    border-radius: 2px;

                    .title-wrapper {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;

                        button {
                            border-radius: 2px;
                            font-size: 15px;
                        }
                    }
                }
            }


        }
    } */

    .search-patient {
        margin-top: 35px;

        button {
            font-size: 15px;
            border-radius: 2px;
        }
    }

    .card {
        background-color: #353C48;
        min-height: 200px;
        margin-top: 35px;
        border-radius: 2px;

        .card-header {
            background-color: #272D38;
            font-size: 18px;
            text-transform: uppercase;
            color: #a9a9a9;
        }

        .card-body {
            .patient-data-wrapper {
                .patient-content {
                    h4 {
                        display: flex;
                        align-items: center;
                        margin-bottom: 0;
                        font-size: 28px;
                    }

                    p {
                        font-size: 16px;
                        margin-bottom: 0;

                        span {
                            color: #b0b0b0;
                        }
                    }

                    button {
                        &.patient-location {
                            border-radius: 2px;
                            margin-left: 10px;
                            font-size: 12px;
                        }
                    }

                    .patient-info {
                        color: #56bbf6;
                        /* color: #F67B56; */

                        span {
                            color: #fff;
                        }
                    }

                    .rpm-conditions-wrapper {
                        margin-top: 25px;

                        .box-wrapper {
                            background-color: #232A34;
                            border-radius: 2px;
                            border: 1px solid #29303a;
                            min-height: 155px;

                            .conditions-content {
                                padding: 15px;
                                min-height: 95px;

                                h5 {
                                    margin-bottom: 8px;
                                    color: #56bbf6;
                                    /* color: #F67B56; */
                                }

                                p {
                                    background-color: #2c394b;
                                    padding: 2px 10px;
                                    font-size: 15px;
                                    margin-bottom: 0;
                                    border-radius: 2px;
                                    display: flex;
                                    justify-content: space-between;
                                    align-items: center;

                                    span {
                                        display: flex;
                                        justify-content: center;
                                        align-items: center;
                                        margin-left: 5px;
                                    }
                                }
                            }
                        }

                        .box-button {
                            display: flex;
                            justify-content: flex-end;
                            align-items: flex-end;
                            height: 100%;
                            padding: 15px 15px 15px 0;

                            button {
                                font-size: 15px;
                                /* background-color: transparent; */
                                border-radius: 2px;
                                padding: 1px 5px;
                                min-width: 130px;
                            }
                        }
                    }
                }

                .separator {
                    width: 100%;
                    border-bottom: 2px solid #888e99;
                    margin-top: 20px;
                }
            }

            .logged-wrapper {
                .info-box {
                    border-bottom-left-radius: 5px;
                    border-top-right-radius: 5px;
                    min-height: 100px;
                    background: #fff;
                    width: 100%;
                    box-shadow: 0 5px 20px rgba(0, 0, 0, .1);
                    -webkit-box-shadow: 0 5px 20px rgba(0, 0, 0, .1);
                    /* margin-bottom: 20px; */
                    padding: 15px;
                    height: 100%;

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
                        margin: 5px 0;
                    }

                    .info-box-content {
                        /* padding: 10px 10px 10px 0; */
                        padding: 0;
                        margin-left: 90px;

                        .info-box-text,
                        .progress-description {
                            display: block;
                            font-size: 18px;
                            white-space: nowrap;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            font-weight: 400;
                            border-bottom: 1px solid #fff;
                            margin-bottom: 5px;
                        }

                        .info-box-number {
                            font-weight: 300;
                            font-size: 21px;
                        }
                    }

                    &.bg-blue {
                        background-color: #3598dc;
                    }

                    &.bg-orange {
                        background-color: #D56E13;
                        cursor: pointer;
                    }

                    &.bg-purple {
                        background-color: #8E44AD;
                    }
                }

                .box-wrapper {
                    /* display: flex;
                    justify-content: center;
                    align-items: center;
                    flex-direction: column; */
                    width: 100%;
                    min-height: 115px;
                    border: 1px solid #3c4452;
                    padding: 20px;
                    border-bottom-left-radius: 5px;
                    border-top-right-radius: 5px;

                    .time {
                        font-size: 20px;
                    }

                    &.logged-content {
                        background-color: #2d7eb6;
                    }

                    &.goal-wrapper {
                        background-color: #d56e13;
                    }
                }

                h5 {
                    /* text-align: center;
                    font-size: 18px;
                    text-transform: uppercase; */
                    /* text-align: center; */
                    font-size: 18px;
                    text-transform: uppercase;
                    border-bottom: 2px solid #bebebe;
                    width: 100%;
                    padding-bottom: 5px;
                }

                p {
                    /* text-align: center; */
                    margin-bottom: 0;
                }

                .care-team-wrapper {
                    background-color: #1B9938;

                    p {
                        text-align: left;
                        color: #fff;

                        span {
                            color: #ffffff;
                        }
                    }
                }

                .timer-wrapper {
                    width: 100%;
                    min-height: 145px;
                    background-color: #2e343f;
                    border: 1px solid #292f38;
                    padding: 20px;
                    margin-top: 25px;
                    border-radius: 2px;

                    .timer-content {
                        .form-control {
                            max-width: 100%;
                        }

                        .options-wrapper {
                            margin-bottom: 15px;

                            &:last-child {
                                margin-bottom: 0;
                            }

                            label {
                                margin-bottom: 0;
                            }
                        }

                        .timer-container {
                            height: 100%;
                            padding: 23px 0 0;

                            .timer {
                                text-align: center;
                                font-size: 25px;
                                border: 1px solid #464e5b;
                                border-radius: 2px;
                                margin-bottom: 10px;
                                /* width: 100%; */
                                width: 80%;
                                margin: 0 auto 10px;
                            }

                            .timer-buttons {
                                display: flex;
                                justify-content: space-evenly;
                                align-items: center;
                                width: 100%;

                                button {
                                    width: 55px;
                                    border-radius: 2px;
                                }
                            }
                        }

                        .assigning-wrapper {
                            label {
                                margin-bottom: 0;
                            }

                            .date-wrapper {
                                margin-bottom: 15px;

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

                                button {
                                    font-size: 15px;
                                    border-radius: 2px;
                                }
                            }
                        }
                    }
                }
            }

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

                .patient-number-wrapper {
                    width: 100%;
                    border: 1px solid #292f38;
                    min-height: 150px;
                    padding: 15px;
                    border-radius: 2px;

                    .title-wrapper {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        margin-bottom: 15px;

                        h5 {
                            margin-bottom: 0;
                        }

                        button {
                            border-radius: 2px;
                            font-size: 15px;
                        }
                    }

                    .chart-wrapper {
                        background-color: transparent;
                        margin-bottom: 25px;
                        width: 100%;
                        /* padding: 15px; */
                        height: 100%;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        position: relative;
                        border-radius: 10px;

                        .chart {
                            width: 100%;
                            padding-top: 15px;

                            canvas {
                                height: 180px !important;
                                width: 100% !important;
                            }
                        }
                    }
                }

                .details-wrapper {
                    width: 100%;

                    .title-wrapper {
                        width: 100%;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        margin-top: 15px;

                        button {
                            font-size: 15px;
                            border-radius: 2px;
                        }
                    }

                    .pressure-details-wrapper {
                        .pressure-details-content {
                            width: 100%;
                            border: 1px solid #292f38;
                            min-height: 150px;
                            padding: 15px;
                            border-radius: 2px;
                            margin-top: 20px;

                            p {
                                margin-bottom: 0;
                            }

                            .table-wrapper {
                                margin-top: 20px;

                                .add-reading-wrapper {
                                    display: flex;
                                    justify-content: center;
                                    align-items: center;

                                    button {
                                        font-size: 15px;
                                        border-radius: 2px;
                                    }
                                }
                            }

                            .dropdown-wrapper {
                                select {
                                    background-color: #353c48;
                                    width: 100%;
                                    max-width: 100%;
                                    color: #fff;
                                    border: 1px solid #464e5b;
                                    font-size: 15px;
                                    border-radius: 2px;
                                    padding: 6px 12px;
                                    margin-top: 5px;
                                }

                                .save-default-device {
                                    display: flex;
                                    justify-content: flex-end;
                                    align-items: center;
                                    margin-top: 15px;

                                    button {
                                        font-size: 15px;
                                        border-radius: 2px;
                                        min-width: 100px;
                                    }
                                }
                            }

                            .notes-wrapper {
                                display: flex;
                                justify-content: space-between;
                                align-items: center;

                                button {
                                    font-size: 15px;
                                    border-radius: 2px;
                                    background-color: transparent;
                                }
                            }

                            .alert-ranges-wrapper {
                                p {
                                    margin-top: 10px;
                                }

                                button {
                                    font-size: 15px;
                                    border-radius: 2px;
                                }

                                .measure-targets-wrapper {
                                    margin-top: 30px;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`
