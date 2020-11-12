import styled from 'styled-components'

export const MainWrapper = styled.div`
    position: relative;
    transition: all 300ms ease-in-out;
    background-color: #353c48;

    &.content-collapse {
        .sidebar,
        .page-logo {
            width: 60px;
            transition: all 300ms ease-in-out;
        }

        .main-content {
            margin-left: 60px;
            transition: all 300ms ease-in-out;
        }

        .user-panel {
            display: none;
            transition: all 300ms ease-in-out;
        }

        .card-links {
            display: none !important;
        }
    }
`

export const MainContentWrapper = styled.div`
    background-color: #3c4452 !important;
    margin-left: 235px;
    padding: 20px;
    min-height: calc(100vh - 60px);
    transition: all 300ms ease-in-out;
`
