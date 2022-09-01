import styled, { css } from 'styled-components';

interface CardContainerProps {
	isGridMode: boolean;
}

const CardListModeStyles = css`
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 1.25rem;

	& > div {
		display: flex;
		align-items: center;
		gap: 0.5rem;

		& > button {
			display: flex;
			justify-content: center;
			align-items: center;
			background-color: transparent;
			border: none;

			& > img {
				transition: 0.2s ease-in-out;
			}

			&:hover {
				& > img {
					filter: drop-shadow(0 0 5px ${({ theme }) => theme['gray-400']});
				}
			}
		}
	}

	& > a {
		width: 100%;
		padding: 1rem 1.5rem;
		background-color: ${({ theme }) => theme.white};
		border-radius: 8px;
		display: flex;
		align-items: center;
		gap: 0.5rem;
		text-decoration: none;
		box-shadow: 0 0 10px ${({ theme }) => theme['gray-200']};

		& > .contact-image {
			width: 1.5rem;
			height: 1.5rem;
			background-color: ${({ theme }) => theme['blue-600']};
			border-radius: 999px;
		}

		& > div:last-child {
			width: 100%;
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-size: 0.875rem;
			gap: 1rem;

			& > span:first-child {
				color: ${({ theme }) => theme['gray-600']};
				font-weight: 700;
			}

			& > span:last-child {
				color: ${({ theme }) => theme['gray-400']};
				text-align: right;
			}
		}
	}
`;

const CardGridModeStyles = css`
	width: 100%;
	max-width: 188px;
	padding: 0.8rem 0.8rem 2.5rem 0.8rem;
	background-color: ${({ theme }) => theme.white};
	box-shadow: 0 0 10px ${({ theme }) => theme['gray-200']};
	border-radius: 8px;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	transition: 0.2s ease-in-out;

	&:hover {
		box-shadow: 0 0 15px ${({ theme }) => theme['gray-300']};
	}

	& > div {
		width: 100%;
		display: flex;
		justify-content: flex-start;

		& > button {
			display: flex;
			justify-content: center;
			align-items: center;
			background-color: transparent;
			border: none;

			& > img {
				transition: 0.2s ease-in-out;
			}

			&:hover {
				& > img {
					filter: drop-shadow(0 0 5px ${({ theme }) => theme['gray-400']});
				}
			}
		}
	}

	& > a {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
		text-decoration: none;

		& > .contact-image {
			width: 3rem;
			height: 3rem;
			background-color: ${({ theme }) => theme['blue-600']};
			border-radius: 999px;
		}

		& > div:last-child {
			display: flex;
			flex-direction: column;
			align-items: center;
			text-align: center;

			& > span:first-child {
				color: ${({ theme }) => theme['gray-600']};
				font-weight: 700;
				font-size: 1rem;
			}

			& > span:last-child {
				color: ${({ theme }) => theme['gray-400']};
				font-size: 0.75rem;
			}
		}
	}
`;

export const CardContainer = styled.article<CardContainerProps>`
	${({ isGridMode }) => (!isGridMode ? CardListModeStyles : CardGridModeStyles)}
`;
