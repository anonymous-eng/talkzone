import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ChakraProvider } from '@chakra-ui/react';
import ChatProvider from "./Context/ChatProvider";
import { BrowserRouter } from 'react-router-dom';
import { ColorModeScript } from "@chakra-ui/react";
import theme from "./theme/theme.js";
import axios from "axios";

axios.defaults.baseURL = 'http://127.0.0.1:5000';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ChakraProvider>
    <BrowserRouter>
      <ChatProvider>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
         <App />
      </ChatProvider>
    </BrowserRouter>
  </ChakraProvider>
);
