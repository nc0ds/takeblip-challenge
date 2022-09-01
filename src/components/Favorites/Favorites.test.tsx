import { render, screen } from '@testing-library/react';
import { Favorites } from '.';

interface ContactType {
	name: string;
	type: string;
	created: string;
	short_name: string;
	created_date_time: number;
}

jest.mock('react-router-dom', () => {
	return {
		Link: 'a',
	};
});

describe('Contacts component', () => {
	it('should render correctly in grid mode', () => {
		const contacts: ContactType[] = [
			{
				name: 'John Doe 1',
				type: 'Builder',
				short_name: 'john_doe1',
				created: '01/01/2010',
				created_date_time: new Date('01/01/2010').getTime(),
			},
			{
				name: 'John Doe 2',
				type: 'Builder',
				short_name: 'john_doe2',
				created: '02/01/2010',
				created_date_time: new Date('02/01/2010').getTime(),
			},
			{
				name: 'John Doe 3',
				type: 'Builder',
				short_name: 'john_doe3',
				created: '03/01/2010',
				created_date_time: new Date('03/01/2010').getTime(),
			},
		];
		const handleFavorite = jest.fn();

		const { container } = render(
			<Favorites
				contacts={contacts}
				handleFavorite={handleFavorite}
				isGridMode={true}
			/>
		);

		const cards = container.querySelectorAll('article');

		expect(cards.length).toBe(3);
		expect(screen.getAllByText('Builder').length).toBe(3);
	});

	it('should render correctly in list mode', () => {
		const contacts: ContactType[] = [
			{
				name: 'John Doe 1',
				type: 'Builder',
				short_name: 'john_doe1',
				created: '01/01/2010',
				created_date_time: new Date('01/01/2010').getTime(),
			},
			{
				name: 'John Doe 2',
				type: 'Builder',
				short_name: 'john_doe2',
				created: '02/01/2010',
				created_date_time: new Date('02/01/2010').getTime(),
			},
			{
				name: 'John Doe 3',
				type: 'Builder',
				short_name: 'john_doe3',
				created: '03/01/2010',
				created_date_time: new Date('03/01/2010').getTime(),
			},
		];
		const handleFavorite = jest.fn();

		const { container } = render(
			<Favorites
				contacts={contacts}
				handleFavorite={handleFavorite}
				isGridMode={false}
			/>
		);

		const cards = container.querySelectorAll('article');

		expect(cards.length).toBe(3);
		expect(screen.getAllByText(/created/i).length).toBe(3);
	});
});
