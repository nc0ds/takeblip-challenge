import { render, screen } from '@testing-library/react';
import { Header } from '.';

jest.mock('react-router-dom', () => {
	return {
		Link: 'a',
	};
});

describe('Header component', () => {
	it('should render correctly', () => {
		const { container } = render(<Header />);

		const link = container.querySelector('a');
		const logo = container.querySelector('img');

		expect(link).toBeInTheDocument();
		expect(logo).toBeInTheDocument();
	});
});
