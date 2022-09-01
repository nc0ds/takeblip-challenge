import styled from 'styled-components';

export const HeaderContainer = styled.header`
	width: 100%;
	height: 2.75rem;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: ${({ theme }) => theme['blue-900']};

	& > a {
		height: calc(100% - 1.5rem);

		& > img {
			height: 100%;
		}
	}
`;
