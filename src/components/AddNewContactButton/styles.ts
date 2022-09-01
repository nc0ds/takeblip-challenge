import styled from 'styled-components';

export const AddNewContactButtonContainer = styled.button`
	width: 3rem;
	height: 3rem;
	display: flex;
	justify-content: center;
	align-items: center;
	position: fixed;
	right: 2rem;
	bottom: 1rem;
	background-color: ${({ theme }) => theme['blue-400']};
	box-shadow: 0 3px 10px ${({ theme }) => theme['gray-300']};
	border: none;
	border-radius: 999px;
	color: ${({ theme }) => theme.white};
	font-size: 2rem;
	line-height: 2rem;
	transition: 0.2s ease-in-out;

	&:hover {
		filter: brightness(0.8);
	}
`;
