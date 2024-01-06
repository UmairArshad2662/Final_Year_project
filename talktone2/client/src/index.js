import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
const theme = extendTheme({
  fonts: {
    h1: `'Lobster', cursive`,
    main: `'Lobster', cursive`,
    h2:`'Slabo 27px', serif`,
    count:`'Anton', sans-serif`
    
  },
  size: {
    h1: "30px",
    h2: "15px",
    main: "40px",
    count:'16px'
  }
})
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
export default theme;
