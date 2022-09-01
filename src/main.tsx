import React from 'react';
import ReactDOM from 'react-dom/client';

import { defaultTheme } from './styles/themes/defaultTheme';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from './styles/global';
import { CookiesProvider } from 'react-cookie';

import { App } from './App';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<ThemeProvider theme={defaultTheme}>
			<GlobalStyles />
			<CookiesProvider>
				<App />
			</CookiesProvider>
		</ThemeProvider>
	</React.StrictMode>
);
