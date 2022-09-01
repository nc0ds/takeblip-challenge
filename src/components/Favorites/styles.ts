import styled from 'styled-components';

export const FavoriteContainer = styled.section`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	gap: 1rem;
	margin-bottom: 2.5rem;
	padding-bottom: 2.5rem;
	border-bottom: 1px solid ${({ theme }) => theme['gray-200']};

	& > h2 {
		font-size: 2rem;
		font-weight: 700;
		color: ${({ theme }) => theme['gray-400']};
	}
`;

interface FavoriteContactsBoxProps {
	isGridMode: boolean;
}

export const FavoriteContactsBox = styled.section<FavoriteContactsBoxProps>`
	width: 100%;
	display: flex;
	flex-direction: ${({ isGridMode }) => (isGridMode ? 'row' : 'column')};
	flex-wrap: wrap;
	gap: 1rem;

	@media (max-width: 780px) {
		justify-content: center;
	}
`;
