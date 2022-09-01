import styled from 'styled-components';

export const NotFoundContainer = styled.main`
	width: 100%;
	padding: 2rem 1rem;
	display: flex;
	flex-direction: column;
	align-items: center;
	text-align: center;

	a {
		color: ${({ theme }) => theme['gray-600']};
	}
`;
