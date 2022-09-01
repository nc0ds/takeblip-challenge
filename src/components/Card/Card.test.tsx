import { render, screen, fireEvent } from '@testing-library/react';
import { Card } from '.';

interface ContactType {
	name: string;
	short_name: string;
	type: string;
	created: string;
}

jest.mock('react-router-dom', () => {
	return {
		Link: 'a',
	};
});

describe('Card component', () => {
	it('should render correctly in grid mode', () => {
		const contact: ContactType = {
			name: 'John Doe',
			short_name: 'john_doe',
			created: '20/01/2019',
			type: 'Builder',
		};
		const handleFavorite = jest.fn();
		const isFavorite = false;

		const { container } = render(
			<Card
				contact={contact}
				handleFavorite={handleFavorite}
				isFavorite={isFavorite}
				isGridMode={true}
			/>
		);

		const userImg = container.querySelector('.contact-image');
		const link = container.querySelector('a[to="/john_doe"]');

		expect(screen.getByText('John Doe')).toBeInTheDocument();
		expect(userImg).toBeInTheDocument();
		expect(link).toBeInTheDocument();
		expect(screen.getByText('Builder')).toBeInTheDocument();
	});

	it('should render correctly in list mode', () => {
		const contact: ContactType = {
			name: 'John Doe',
			short_name: 'john_doe',
			created: '20/01/2019',
			type: 'Builder',
		};
		const handleFavorite = jest.fn();
		const isFavorite = false;

		const { container } = render(
			<Card
				contact={contact}
				handleFavorite={handleFavorite}
				isFavorite={isFavorite}
				isGridMode={false}
			/>
		);

		const userImg = container.querySelector('.contact-image');
		const link = container.querySelector('a[to="/john_doe"]');

		expect(screen.getByText('John Doe')).toBeInTheDocument();
		expect(userImg).toBeInTheDocument();
		expect(link).toBeInTheDocument();
		expect(screen.getByText('Created at 20/01/2019')).toBeInTheDocument();
	});

	it('should call handleFavorite function once when clicked on star', () => {
		const contact: ContactType = {
			name: 'John Doe',
			short_name: 'john_doe',
			created: '20/01/2019',
			type: 'Builder',
		};
		const handleFavorite = jest.fn();
		const isFavorite = false;

		const { container } = render(
			<Card
				contact={contact}
				handleFavorite={handleFavorite}
				isFavorite={isFavorite}
				isGridMode={true}
			/>
		);

		const starButton = container.querySelector('button') as HTMLButtonElement;

		fireEvent.click(starButton);

		expect(handleFavorite).toHaveBeenCalledTimes(1);
	});
});
