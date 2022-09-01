import { render, screen } from '@testing-library/react';
import { NotFound } from '.';

jest.mock('react-router-dom', () => {
	return {
		Link: 'a',
	};
});

describe('NotFound page', () => {
	it('should render correctly', () => {
		render(<NotFound />);

		expect(screen.getByText('Oh no... Page not found!')).toBeInTheDocument();
		expect(screen.getByText(/This page doesn't exist/i)).toBeInTheDocument();
		expect(screen.getByText('homepage')).toBeInTheDocument();
	});
});
