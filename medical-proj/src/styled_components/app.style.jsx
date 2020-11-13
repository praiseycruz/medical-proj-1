import styled from 'styled-components'

export const MainWrapper = styled.div`
    position: relative;
    transition: all 300ms ease-in-out;
    background-color: #353c48;

    &.content-collapse {
        .sidebar {
            width: 60px;
            transition: all 300ms ease-in-out;
        }

        .page-logo {
            width: 100px;
            transition: all 300ms ease-in-out;
        }

        .main-content {
            margin-left: 60px;
            transition: all 300ms ease-in-out;
        }

        .user-panel {
            display: none;
        }

        .card-links {
            display: flex;
            justify-content: center;
            align-items: center;

            .link-text {
                display: none !important;
            }

            img, i {
                margin-right: 0 !important;
            }
        }
    }
`

export const MainContentWrapper = styled.div`
    background-color: #3c4452 !important;
    margin-left: 235px;
    padding: 20px 30px;
    min-height: calc(100vh - 60px);
    transition: all 300ms ease-in-out;

    @media screen and (min-width: 320px) and (max-width: 767px) {
        padding: 15px;
    }

    @media screen and (min-width: 768px) and (max-width: 1023px) {
        padding: 20px;
    }
`
