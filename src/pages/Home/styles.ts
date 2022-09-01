import styled from 'styled-components';

export const HomeContainer = styled.main`
	width: 100%;
	max-width: 1200px;
	margin: 0 auto;
	padding: 1rem;
	padding-top: 0;
`;

export const HomeTitleSection = styled.section`
	width: 100%;
	margin-bottom: 2rem;
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 1rem;

	@media (max-width: 780px) {
		flex-direction: column;
	}

	& > h1 {
		font-size: 2rem;
	}

	& > div {
		height: 2.5rem;
		flex: 1;
		display: flex;
		justify-content: flex-end;
		align-items: center;
		gap: 0.5rem;

		@media (max-width: 780px) {
			flex-direction: column;
		}
	}
`;

export const OrderButtonsBox = styled.div`
	height: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 0.5rem;
`;

export const SearchInput = styled.input`
	width: 100%;
	max-width: 19.5rem;
	height: 100%;
	padding: 0.625rem 0.75rem;
	border-radius: 8px;
	border: 1px solid ${({ theme }) => theme['gray-200']};
	font-size: 0.875rem;
`;

export const OrderButton = styled.button`
	height: 100%;
	padding: 0.625rem 1rem;
	color: ${({ theme }) => theme.white};
	background-color: ${({ theme }) => theme['blue-400']};
	border-radius: 8px;
	border: none;
	font-size: 0.875rem;
	line-height: 0.8rem;
	transition: 0.2s ease-in-out;

	&:hover {
		filter: brightness(0.8);
	}
`;

export const GridListOrderIconBox = styled.div`
	display: flex;
	align-items: center;
	gap: 0.5rem;

	& > button {
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: transparent;
		border: none;
		filter: opacity(0.5);
		transition: 0.1s ease-in-out;

		&.active {
			filter: opacity(1);
		}
	}
`;
