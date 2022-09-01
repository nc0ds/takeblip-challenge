import { Link } from 'react-router-dom';

import logoImg from '../../assets/logo.svg';

import { HeaderContainer } from './styles';

export function Header(): JSX.Element {
	return (
		<HeaderContainer>
			<Link to='/'>
				<img src={logoImg} alt='' />
			</Link>
		</HeaderContainer>
	);
}
