import styled from 'styled-components';

interface ContactsContainerProps {
	isGridMode: boolean;
}

export const ContactsContainer = styled.section<ContactsContainerProps>`
	width: 100%;
	display: flex;
	flex-direction: ${({ isGridMode }) => (isGridMode ? 'row' : 'column')};
	flex-wrap: wrap;
	gap: 1rem;

	@media (max-width: 780px) {
		justify-content: center;
	}
`;
