import { Link } from 'react-router-dom';

import { CardContainer } from './styles';

import activeStar from '../../assets/active-star.svg';
import inactiveStar from '../../assets/inactive-star.svg';

interface CardProps {
	contact: {
		name: string;
		short_name: string;
		type: string;
		created: string;
	};
	isGridMode: boolean;
	isFavorite?: boolean;
	handleFavorite: (contactName: string) => void;
}

export function Card({
	isGridMode,
	contact,
	isFavorite = false,
	handleFavorite,
}: CardProps): JSX.Element {
	return (
		<CardContainer isGridMode={isGridMode}>
			<div>
				<button type='button' onClick={() => handleFavorite(contact.name)}>
					<img
						src={isFavorite ? activeStar : inactiveStar}
						alt='Favorite'
						title='Favorite'
					/>
				</button>
			</div>
			<Link to={`/${contact.short_name}`}>
				<div className='contact-image' />
				<div>
					<span>{contact.name}</span>
					{!isGridMode ? (
						<span>Created at {contact.created}</span>
					) : (
						<span>{contact.type}</span>
					)}
				</div>
			</Link>
		</CardContainer>
	);
}
