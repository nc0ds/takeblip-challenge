import { render, screen } from '@testing-library/react';
import { AddNewContactButton } from '.';

describe('AddNewContactButton component', () => {
	it('should render correctly', () => {
		render(<AddNewContactButton />);

		expect(screen.getByText('+')).toBeInTheDocument();
	});
});
