import { ContactsContainer } from './styles';

import { Card } from '../Card';

interface ContactsProps {
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

export function Contacts({
	contacts,
	isGridMode,
	handleFavorite,
}: ContactsProps): JSX.Element {
	return (
		<ContactsContainer isGridMode={isGridMode}>
			{contacts.map((item) => (
				<Card
					key={item.name}
					isGridMode={isGridMode}
					contact={item}
					handleFavorite={handleFavorite}
				/>
			))}
		</ContactsContainer>
	);
}
