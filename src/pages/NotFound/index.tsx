import { Link } from 'react-router-dom';

import { NotFoundContainer } from './styles';

export function NotFound(): JSX.Element {
	return (
		<NotFoundContainer>
			<h1>Oh no... Page not found!</h1>
			<p>
				This page doesn't exist, let's head back to the{' '}
				<Link to='/'>homepage</Link>
			</p>
		</NotFoundContainer>
	);
}
