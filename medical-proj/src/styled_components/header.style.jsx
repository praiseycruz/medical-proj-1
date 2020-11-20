import styled from 'styled-components'

export const PageLogoSection = styled.div`
    background-color: #333a47;
    float: left;
    display: block;
    width: 220px;
    height: 60px;
    padding: 10px 0;
    transition: all 300ms ease-in-out;

    ul {
        list-style: none;
        margin: 0;
        padding: 0;

        li {
            a {
                color: #ddd;
                text-decoration: none;
                font-size: 26px;
            }
        }
    }
`

export const PageContainer = styled.div`
    margin: 0;
    padding: 0;
    position: relative;
    background-color: #353c48;
`
