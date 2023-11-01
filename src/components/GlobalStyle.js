import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    *, *::before, *::after {
        margin: 0;
        padding: 0;
        box-sizing: border-box; // 박스 크기 계산 방식 변경
    } 

    @font-face {
        font-family: 'S-CoreDream-light';
        src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_six@1.2/S-CoreDream-3Light.woff') format('woff');
        font-weight: normal;
        font-style: normal;
    }

    @font-face {
        font-family: 'S-CoreDream-bold';
        src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_six@1.2/S-CoreDream-8Heavy.woff') format('woff');
        font-weight: normal;
        font-style: normal;
    }
    
    @font-face {
        font-family: 'S-CoreDream-medium';
        src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_six@1.2/S-CoreDream-5Medium.woff') format('woff');
        font-weight: normal;
        font-style: normal;
    }

    body {
        font-family: 'S-CoreDream-medium', sans-serif;
    }

    h1, h2 {
        font-family: 'S-CoreDream-bold', sans-serif;
    }

    p {
        font-family: 'S-CoreDream-light', sans-serif;
    }
`;

export default GlobalStyle;
