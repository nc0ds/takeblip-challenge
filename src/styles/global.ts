import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    @media (max-width: 1080px) {
      font-size: 93.75%;
    }

    @media (max-width: 720px) {
      font-size: 87.5%;
    }
  }

  html,
  body {
    width: 100vw;
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
    background-color: ${({ theme }) => theme['gray-100']};
  }

  body,
  button,
  input,
  textarea {
    font-family: 'Nunito Sans', sans-serif;
    font-weight: 400;
    font-size: 1rem;
    color: ${({ theme }) => theme['gray-600']};
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  strong,
  b {
    font-weight: 800;
  }

  button {
    cursor: pointer;
  }

  [disabled] {
    cursor: not-allowed;
    filter: brightness(0.7);
    opacity: 0.6;
  }
`;
