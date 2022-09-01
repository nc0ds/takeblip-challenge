import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { Home } from '.';
import { useCookies } from 'react-cookie';
import { useDebounce } from '../../hooks/useDebounce';

jest.useFakeTimers();

jest.mock('react-router-dom', () => {
	return {
		Link: 'a',
	};
});

jest.mock('../../services/api.ts', () => {
	return {
		api: {
			get: jest.fn().mockResolvedValue({
				data: [
					{
						name: 'John Doe 1',
						type: 'router',
						created: '2020-01-01T14:35:44.510Z',
					},
					{
						name: 'John Doe 3',
						type: 'builder',
						created: '2020-01-04T14:35:44.510Z',
					},
					{
						name: 'John Doe 2',
						type: 'router',
						created: '2020-01-03T14:35:44.510Z',
					},
					{
						name: 'John Doe 4',
						type: 'builder',
						created: '2020-01-02T14:35:44.510Z',
					},
				],
			}),
		},
	};
});

jest.mock('../../hooks/useDebounce.ts', () => {
	return {
		useDebounce: jest.fn().mockImplementation((fn) => fn),
	};
});

jest.mock('react-cookie', () => {
	return {
		useCookies: jest.fn(),
	};
});

describe('Home page', () => {
	it('should render correctly when there is no favorite', async () => {
		const cookiesMocked = jest.mocked(useCookies);

		const cookies = cookiesMocked.mockReturnValue([
			{
				favoriteContactsNames: [],
			},
			jest.fn(),
			jest.fn(),
		] as any);

		const { container } = render(<Home />);

		await waitFor(() => {
			const gridButton = container.querySelector(
				'button > img[src="grid-icon.svg"]'
			);
			const listButton = container.querySelector(
				'button > img[src="list-icon.svg"]'
			);

			expect(screen.getAllByText(/John Doe/i).length).toBe(4);
			expect(screen.getByText('My chatbots')).toBeInTheDocument();
			expect(screen.getByPlaceholderText(/search/i)).toBeInTheDocument();
			expect(
				screen.getByRole('button', {
					name: /order by name/i,
				})
			).toBeInTheDocument();
			expect(
				screen.getByRole('button', {
					name: /order by creation/i,
				})
			).toBeInTheDocument();
			expect(gridButton).toBeInTheDocument();
			expect(listButton).toBeInTheDocument();
			expect(screen.queryByText('Favorites')).not.toBeInTheDocument();
		});
	});

	it('should render correctly when there is any favorite', async () => {
		const cookiesMocked = jest.mocked(useCookies);

		const cookies = cookiesMocked.mockReturnValue([
			{
				favoriteContactsNames: ['John Doe 1'],
			},
			jest.fn(),
			jest.fn(),
		] as any);

		const { container } = render(<Home />);

		await waitFor(() => {
			const gridButton = container.querySelector(
				'button > img[src="grid-icon.svg"]'
			);
			const listButton = container.querySelector(
				'button > img[src="list-icon.svg"]'
			);

			expect(screen.getAllByText(/John Doe/i).length).toBe(4);
			expect(screen.getByText('My chatbots')).toBeInTheDocument();
			expect(screen.getByPlaceholderText(/search/i)).toBeInTheDocument();
			expect(
				screen.getByRole('button', {
					name: /order by name/i,
				})
			).toBeInTheDocument();
			expect(
				screen.getByRole('button', {
					name: /order by creation/i,
				})
			).toBeInTheDocument();
			expect(gridButton).toBeInTheDocument();
			expect(listButton).toBeInTheDocument();
			expect(screen.getByText('Favorites')).toBeInTheDocument();
		});
	});

	it('should render in switch through grid and list mode', async () => {
		const cookiesMocked = jest.mocked(useCookies);

		const cookies = cookiesMocked.mockReturnValue([
			{
				favoriteContactsNames: ['John Doe 1'],
			},
			jest.fn(),
			jest.fn(),
		] as any);

		const { container } = render(<Home />);

		await waitFor(() => {
			expect(screen.getAllByText(/John Doe/i).length).toBe(4);

			const gridButton = container.querySelector(
				'main > section:nth-child(1) > div > div:nth-child(3) > button:first-of-type'
			) as HTMLButtonElement;
			const listButton = container.querySelector(
				'main > section:nth-child(1) > div > div:nth-child(3) > button:last-of-type'
			) as HTMLButtonElement;

			const gridButtonOnClick = jest.fn();
			const listButtonOnClick = jest.fn();

			gridButton.onclick = gridButtonOnClick;
			listButton.onclick = listButtonOnClick;

			expect(gridButton).toHaveClass('active');
			expect(listButton).not.toHaveClass('active');

			fireEvent.click(listButton);

			expect(listButtonOnClick).toHaveBeenCalledTimes(1);
			expect(gridButton).not.toHaveClass('active');
			expect(listButton).toHaveClass('active');

			fireEvent.click(gridButton);

			expect(gridButtonOnClick).toHaveBeenCalledTimes(1);
			expect(gridButton).toHaveClass('active');
			expect(listButton).not.toHaveClass('active');
		});
	});

	it('should order by name when clicked on order by name button', async () => {
		const cookiesMocked = jest.mocked(useCookies);

		const cookies = cookiesMocked.mockReturnValue([
			{
				favoriteContactsNames: ['John Doe 1'],
			},
			jest.fn(),
			jest.fn(),
		] as any);

		const { container } = render(<Home />);

		await waitFor(() => {
			expect(screen.getAllByText(/John Doe/i).length).toBe(4);

			const orderByNameButton = screen.getByRole('button', {
				name: /order by name/i,
			});

			const firstContactNameBeforeOrder = container.querySelector(
				'main > section:last-of-type > article:first-of-type > a > div:last-of-type > span:first-of-type'
			) as HTMLSpanElement;

			fireEvent.click(orderByNameButton);

			const firstContactNameAfterOrder = container.querySelector(
				'main > section:last-of-type > article:first-of-type > a > div:last-of-type > span:first-of-type'
			) as HTMLSpanElement;

			expect(firstContactNameBeforeOrder?.textContent).toBe('John Doe 3');
			expect(firstContactNameAfterOrder?.textContent).toBe('John Doe 2');
		});
	});

	it('should order by creation when clicked on order by creation button', async () => {
		const cookiesMocked = jest.mocked(useCookies);

		const cookies = cookiesMocked.mockReturnValue([
			{
				favoriteContactsNames: ['John Doe 1'],
			},
			jest.fn(),
			jest.fn(),
		] as any);

		const { container } = render(<Home />);

		await waitFor(() => {
			expect(screen.getAllByText(/John Doe/i).length).toBe(4);

			const orderByCreationButton = screen.getByRole('button', {
				name: /order by creation/i,
			});

			const firstContactNameBeforeOrder = container.querySelector(
				'main > section:last-of-type > article:first-of-type > a > div:last-of-type > span:first-of-type'
			) as HTMLSpanElement;

			fireEvent.click(orderByCreationButton);

			const firstContactNameAfterOrder = container.querySelector(
				'main > section:last-of-type > article:first-of-type > a > div:last-of-type > span:first-of-type'
			) as HTMLSpanElement;

			expect(firstContactNameBeforeOrder?.textContent).toBe('John Doe 3');
			expect(firstContactNameAfterOrder?.textContent).toBe('John Doe 4');
		});
	});

	it('should search when type on search input', async () => {
		const cookiesMocked = jest.mocked(useCookies);

		const cookies = cookiesMocked.mockReturnValue([
			{
				favoriteContactsNames: ['John Doe 1'],
			},
			jest.fn(),
			jest.fn(),
		] as any);

		render(<Home />);

		await waitFor(async () => {
			expect(screen.getAllByText(/John Doe/i).length).toBe(4);

			const searchInput = screen.getByPlaceholderText(
				'Search'
			) as HTMLInputElement;

			fireEvent.change(searchInput, {
				target: {
					value: 'John Doe 2',
				},
			});

			expect(useDebounce).toHaveBeenCalled();

			await waitFor(() => {
				expect(screen.getByText('John Doe 2')).toBeInTheDocument();
				expect(screen.queryByText('John Doe 3')).not.toBeInTheDocument();
				expect(screen.queryByText('John Doe 4')).not.toBeInTheDocument();
				expect(screen.queryByText('John Doe 1')).not.toBeInTheDocument();
			});
		});
	});
});
