import { render, screen } from '@testing-library/react';
import { ContactDetails } from '.';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../../services/api';

jest.mock('react-router-dom', () => {
	return {
		useParams: jest.fn(),
		useNavigate: jest.fn().mockReturnValue(jest.fn()),
	};
});

jest.mock('../../services/api.ts', () => {
	return {
		api: {
			get: jest.fn(),
		},
	};
});

describe('ContactDetails page', () => {
	it('should render "Loading..." initially', async () => {
		const apiMocked = jest.mocked(api.get);
		const useParamsMocked = jest.mocked(useParams);
		const useNavigateMocked = jest.mocked(useNavigate);

		const navigateMocked = jest.fn();

		apiMocked.mockResolvedValueOnce({
			data: {
				name: 'John Doe 1',
				short_name: 'john_doe_1',
				description:
					'Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe veritatis ex odit, ipsam obcaecati vel et corrupti aliquid a nulla atque quod distinctio sit optio delectus, voluptatem, doloremque rerum eius!',
				type: 'router',
				culture: 'pt-BR',
				analytics: {
					user: {
						total: 100,
						actived: 2,
					},
					message: {
						received: 10000,
						sent: 10001,
					},
				},
				created: '2020-01-01T14:35:44.510Z',
			},
			status: 200,
		});

		useNavigateMocked.mockReturnValue(navigateMocked);

		useParamsMocked.mockReturnValue({
			contactShortName: 'john_doe_1',
		});

		render(<ContactDetails />);

		expect(screen.getByText('Loading...')).toBeInTheDocument();
	});
});
