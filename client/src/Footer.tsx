import styled from 'styled-components';

function Footer() {

    const Footer = styled.footer`
        position: fixed;
        bottom: 0;
        width: 100%;
        padding: 10px 0;
        text-align: center;
        left: 0;
    `;

    return( 
        <>
            <Footer>
                <p>©2024 App developed by Yurith Rubio</p>
            </Footer>
        </>
    )
}

export default Footer;