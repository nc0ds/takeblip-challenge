import { useEffect, useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../../services/api';

import {
	AccountStatusBox,
	AccountStatusButton,
	ActiveUsersCard,
	CardContentBox,
	CardsBox,
	ContactDetailsContainer,
	ContactHeaderBox,
	ContactHeaderInfoBox,
	Content,
	ReceivedMessagesCard,
	SentMessagesCard,
	TimezoneCard,
} from './styles';

import userIcon from '../../assets/user_icon.svg';
import activeUsersIcon from '../../assets/active_users_icon.svg';
import receivedMessagesIcon from '../../assets/received_messages_icon.svg';
import sentMessagesIcon from '../../assets/sent_messages_icon.svg';
import ballonImg from '../../assets/ballon.svg';

interface ContactDetailType {
	analytics: {
		message: {
			received: number;
			sent: number;
		};
		user: {
			actived: number;
			total: number;
		};
	};
	culture: string;
	description: string;
	name: string;
	type: string;
	created: string;
	updated: string;
	timezone_offset: string;
	timezone: string;
	regionInfo: Intl.Locale;
}

export function ContactDetails(): JSX.Element {
	const [contactDetails, setContactDetails] = useState<ContactDetailType>(
		{} as ContactDetailType
	);

	const { contactShortName } = useParams();
	const navigate = useNavigate();

	const getContactDetails = useMemo(async () => {
		try {
			const { data, status } = await api.get(`/${contactShortName}/details`);

			if (status !== 200) {
				return navigate('/404');
			}

			const formatDate = new Intl.DateTimeFormat('pt-BR', {
				dateStyle: 'short',
			});

			const timezone = new Intl.DateTimeFormat('pt-BR')
				.resolvedOptions()
				.timeZone.split('/')[1]
				.replace(/_/gi, ' ');

			const formatTimezoneOffset = (offset: number) => {
				const offsetInHours = (offset * -1) / 60;
				const splittedOffset = String(offsetInHours).split('.');

				const result =
					offsetInHours > 0
						? `${
								splittedOffset[0].length > 1
									? Number(splittedOffset[0]) * -1 + ':00'
									: '0' + Number(splittedOffset[0]) * -1 + ':00'
						  }`
						: `${
								splittedOffset[0].length > 2
									? '-' + Number(splittedOffset[0]) * -1 + ':00'
									: '-0' + Number(splittedOffset[0]) * -1 + ':00'
						  }`;

				return result;
			};

			return setContactDetails({
				analytics: data.analytics,
				name: data.name,
				description: data.description,
				type: data.type,
				culture: data.culture,
				created: formatDate.format(new Date(data.created)),
				updated: formatDate.format(new Date(data.updated)),
				timezone_offset: formatTimezoneOffset(
					new Date(data.created).getTimezoneOffset()
				),
				timezone,
				regionInfo: new Intl.Locale(data.culture),
			});
		} catch (err) {
			return navigate('/404');
		}
	}, [contactShortName]);

	useEffect(() => {
		getContactDetails;
	}, [contactShortName]);

	return (
		<ContactDetailsContainer>
			{Object.keys(contactDetails).length > 0 ? (
				<>
					<ContactHeaderBox>
						<img src={userIcon} alt='' />
						<ContactHeaderInfoBox>
							<div>
								<h1>{contactDetails.name}</h1>
								<span>Id: {contactShortName}</span>
							</div>
							<p>Created at {contactDetails.created}</p>
						</ContactHeaderInfoBox>
					</ContactHeaderBox>

					<Content>
						<CardsBox>
							<div>
								<TimezoneCard>
									<span>Region and idiom</span>
									<p>
										{contactDetails.regionInfo.region} -{' '}
										{contactDetails.timezone} (
										{contactDetails.regionInfo.language.toUpperCase()})
									</p>
									<span>Timezone</span>
									<p>
										(UTC {contactDetails.timezone_offset}){' '}
										{contactDetails.timezone}
									</p>
								</TimezoneCard>
								<ActiveUsersCard>
									<CardContentBox>
										<img src={activeUsersIcon} alt='' />
										<div>
											<h3>
												{contactDetails.analytics.user.actived.toLocaleString(
													'pt-BR'
												)}
											</h3>
											<p>Active users</p>
										</div>
									</CardContentBox>
								</ActiveUsersCard>
							</div>
							<div>
								<ReceivedMessagesCard>
									<CardContentBox>
										<img src={receivedMessagesIcon} alt='' />
										<div>
											<h3>
												{contactDetails.analytics.message.received.toLocaleString(
													'pt-BR'
												)}
											</h3>
											<p>Messages received</p>
										</div>
									</CardContentBox>
								</ReceivedMessagesCard>
								<SentMessagesCard>
									<CardContentBox>
										<img src={sentMessagesIcon} alt='' />
										<div>
											<h3>
												{contactDetails.analytics.message.sent.toLocaleString(
													'pt-BR'
												)}
											</h3>
											<p>Messages sent</p>
										</div>
									</CardContentBox>
								</SentMessagesCard>
							</div>
						</CardsBox>

						<AccountStatusBox>
							<img src={ballonImg} alt='' />
							<div>
								<span>Status account</span>
								<h3>Free</h3>
							</div>
							<AccountStatusButton type='button'>
								Update account
							</AccountStatusButton>
						</AccountStatusBox>
					</Content>
				</>
			) : (
				<p>Loading...</p>
			)}
		</ContactDetailsContainer>
	);
}
