import styled from 'styled-components';

export const ContactDetailsContainer = styled.main`
	width: 100%;
	max-width: 1200px;
	margin: 0 auto;
	padding: 1rem;
	padding-top: 0;
`;

export const ContactHeaderBox = styled.header`
	width: 100%;
	display: flex;
	align-items: center;
	gap: 0.5rem;
	margin-bottom: 2rem;
	padding-bottom: 2rem;
	border-bottom: 1px solid ${({ theme }) => theme['gray-200']};
`;

export const ContactHeaderInfoBox = styled.div`
	flex: 1;
	display: flex;
	justify-content: space-between;
	align-items: center;

	& > div {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
	}

	h1 {
		font-size: 1.5rem;
	}

	span {
		font-size: 0.875rem;
		color: ${({ theme }) => theme['gray-400']};
	}

	p {
		font-size: 0.875rem;
		color: ${({ theme }) => theme['gray-400']};
	}
`;

export const Content = styled.section`
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 2rem;

	@media (max-width: 780px) {
		flex-direction: column-reverse;
	}
`;

export const CardsBox = styled.article`
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 1.5rem;

	& > div {
		display: flex;
		align-items: center;
		gap: 1.5rem;

		@media (max-width: 600px) {
			flex-direction: column;
		}
	}
`;

const CardBase = styled.div`
	width: 100%;
	min-height: 12rem;
	padding: 2rem;
	background-color: ${({ theme }) => theme.white};
	box-shadow: 0 0 15px ${({ theme }) => theme['gray-300']};
	border-radius: 8px;
`;

export const TimezoneCard = styled(CardBase)`
	max-width: 18rem;
	display: flex;
	flex-direction: column;

	@media (max-width: 600px) {
		max-width: none;
	}

	span {
		font-size: 0.75rem;
		margin-bottom: 0.5rem;
	}

	p {
		font-size: 0.875rem;

		& + span {
			margin-top: 1rem;
		}
	}
`;

export const CardContentBox = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	gap: 1rem;

	h3 {
		font-size: 1.5rem;
		font-weight: 800;
	}
`;

export const ActiveUsersCard = styled(CardBase)`
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const ReceivedMessagesCard = styled(CardBase)`
	width: 100%;
	display: flex;
	align-items: center;
	gap: 1rem;

	h3 {
		font-size: 1.5rem;
		font-weight: 800;
	}
`;

export const SentMessagesCard = styled(CardBase)`
	width: 100%;
	max-width: 25rem;
	display: flex;
	align-items: center;
	gap: 1rem;

	@media (max-width: 600px) {
		max-width: none;
	}

	h3 {
		font-size: 1.5rem;
		font-weight: 800;
	}
`;

export const AccountStatusBox = styled.article`
	width: 100%;
	max-width: 15.5rem;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 2rem;
`;

export const AccountStatusButton = styled.button`
	width: 100%;
	max-width: 8.5rem;
	padding: 0.625rem 1rem;
	border: none;
	border-radius: 8px;
	color: ${({ theme }) => theme.white};
	background-color: ${({ theme }) => theme['blue-400']};
	font-size: 0.875rem;
	transition: 0.2s ease-in-out;

	&:hover {
		filter: brightness(0.8);
	}
`;
