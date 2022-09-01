import { Routes, Route } from 'react-router-dom';

import { DefaultLayout } from './layouts/DefaultLayout';
import { ContactDetails } from './pages/ContactDetails';

import { Home } from './pages/Home';
import { NotFound } from './pages/NotFound';

export function Router(): JSX.Element {
	return (
		<Routes>
			<Route path='/' element={<DefaultLayout />}>
				<Route index element={<Home />} />
				<Route path='/:contactShortName' element={<ContactDetails />} />

				<Route path='/404' element={<NotFound />} />
				<Route path='*' element={<NotFound />} />
			</Route>
		</Routes>
	);
}
