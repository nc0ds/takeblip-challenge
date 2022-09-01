import { FavoriteContainer, FavoriteContactsBox } from './styles';

import { Card } from '../Card';

interface FavoritesProps {
	contacts: Array<{
		name: string;
		type: string;
		created: string;
		short_name: string;
		created_date_time: number;
	}>;
	isGridMode: boolean;
	handleFavorite: (contactName: string) => void;
}

export function Favorites({
	contacts,
	isGridMode,
	handleFavorite,
}: FavoritesProps): JSX.Element {
	return (
		<FavoriteContainer>
			<h2>Favorites</h2>
			<FavoriteContactsBox isGridMode={isGridMode}>
				{contacts.map((item) => (
					<Card
						key={item.name}
						isGridMode={isGridMode}
						contact={item}
						isFavorite
						handleFavorite={handleFavorite}
					/>
				))}
			</FavoriteContactsBox>
		</FavoriteContainer>
	);
}
