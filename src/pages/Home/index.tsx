import React, { useEffect, useState, useCallback } from 'react';
import { useCookies } from 'react-cookie';

import { useDebounce } from '../../hooks/useDebounce';

import {
	HomeContainer,
	HomeTitleSection,
	SearchInput,
	OrderButton,
	GridListOrderIconBox,
	OrderButtonsBox,
} from './styles';

import gridIcon from '../../assets/grid-icon.svg';
import listIcon from '../../assets/list-icon.svg';
import { Favorites } from '../../components/Favorites';
import { Contacts } from '../../components/Contacts';
import { AddNewContactButton } from '../../components/AddNewContactButton';
import { api } from '../../services/api';

interface ContactType {
	name: string;
	type: string;
	created: string;
}

interface FormattedContactType extends ContactType {
	short_name: string;
	created_date_time: number;
}

export function Home(): JSX.Element {
	const [isGridMode, setIsGridMode] = useState<boolean>(true);
	const [allContacts, setAllContacts] = useState<FormattedContactType[]>([]);
	const [filteredContactsNames, setFilteredContactsNames] = useState<string[]>(
		[]
	);
	const [search, setSearch] = useState<string>('');

	const [cookies, setCookies] = useCookies(['favoriteContactsNames']);

	const favoriteContactsNames = cookies.favoriteContactsNames ?? [];

	const filteredContacts = allContacts.filter((item) =>
		filteredContactsNames.includes(item.name)
	);

	const favorites: FormattedContactType[] =
		search.length > 0 && filteredContacts.length > 0
			? filteredContacts.filter((item) =>
					favoriteContactsNames.includes(item.name)
			  )
			: allContacts.filter((item) => favoriteContactsNames.includes(item.name));

	const contacts: FormattedContactType[] =
		search.length > 0 && filteredContacts.length > 0
			? filteredContacts.filter(
					(item) => !favoriteContactsNames.includes(item.name)
			  )
			: allContacts.filter(
					(item) => !favoriteContactsNames.includes(item.name)
			  );

	const handleFavoriteContact = (contactName: string) => {
		if (!contactName) {
			return alert('No contact name was specified');
		}

		const oldFavorites: string[] = favoriteContactsNames;

		if (oldFavorites.includes(contactName)) {
			return alert('Contact already in favorites');
		}

		const newFavorites: string[] = [...oldFavorites, contactName];

		return setCookies('favoriteContactsNames', newFavorites, {
			path: '/',
		});
	};

	const handleUnfavoriteContact = (contactName: string): void => {
		if (!contactName) {
			return alert('No contact name was specified');
		}

		const oldFavorites: string[] = favoriteContactsNames;

		if (!oldFavorites.includes(contactName)) {
			return alert('Contact is not in favorites');
		}

		const newFavorites: string[] = oldFavorites.filter(
			(item) => item !== contactName
		);

		return setCookies('favoriteContactsNames', newFavorites, {
			path: '/',
		});
	};

	const getAllContacts = async () => {
		try {
			const { data } = await api.get('/bots');

			const formatDate = new Intl.DateTimeFormat('pt-BR', {
				dateStyle: 'short',
			});

			const contacts: FormattedContactType[] = data.map((item: ContactType) => {
				return {
					name: item.name,
					short_name: item.name.toLowerCase().replace(/\s/gi, '_'),
					type: item.type.replace(
						item.type.charAt(0),
						item.type.charAt(0).toUpperCase()
					),
					created: formatDate.format(new Date(item.created)),
					created_date_time: new Date(item.created).getTime(),
				};
			});

			setAllContacts(contacts);
		} catch (err) {
			console.log(err);
		}
	};

	const handleSortContactsByName = useCallback((): void => {
		setAllContacts((old) => [
			...old.sort((a, b) => a.name.localeCompare(b.name)),
		]);
	}, []);

	const handleSortContactsByCreation = useCallback((): void => {
		setAllContacts((old) => [
			...old.sort((a, b) => a.created_date_time - b.created_date_time),
		]);
	}, []);

	const searchContactDebounced = useDebounce((name: string) => {
		setFilteredContactsNames(
			allContacts
				.filter((item) => item.name.toLowerCase().includes(name))
				.map((item) => item.name)
		);
	});

	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value);

		const formattedSearch = e.target.value.trim().toLowerCase();

		searchContactDebounced(formattedSearch);
	};

	useEffect(() => {
		getAllContacts();
	}, []);

	return (
		<HomeContainer>
			<HomeTitleSection>
				<h1>My chatbots</h1>
				<div>
					<SearchInput
						type='text'
						placeholder='Search'
						onChange={handleSearchChange}
					/>
					<OrderButtonsBox>
						<OrderButton type='button' onClick={handleSortContactsByName}>
							Order by name
						</OrderButton>
						<OrderButton type='button' onClick={handleSortContactsByCreation}>
							Order by creation
						</OrderButton>
					</OrderButtonsBox>
					<GridListOrderIconBox>
						<button
							type='button'
							className={isGridMode ? 'active' : undefined}
							onClick={() => setIsGridMode(true)}
						>
							<img src={gridIcon} alt='' />
						</button>
						<button
							type='button'
							className={!isGridMode ? 'active' : undefined}
							onClick={() => setIsGridMode(false)}
						>
							<img src={listIcon} alt='' />
						</button>
					</GridListOrderIconBox>
				</div>
			</HomeTitleSection>

			{search.length > 0 ? (
				filteredContactsNames.length > 0 ? (
					<>
						{favorites.length > 0 && (
							<Favorites
								contacts={favorites}
								isGridMode={isGridMode}
								handleFavorite={handleUnfavoriteContact}
							/>
						)}

						{contacts.length > 0 && (
							<Contacts
								contacts={contacts}
								isGridMode={isGridMode}
								handleFavorite={handleFavoriteContact}
							/>
						)}
					</>
				) : (
					<p>Contact not found</p>
				)
			) : (
				<>
					{favorites.length > 0 && (
						<Favorites
							contacts={favorites}
							isGridMode={isGridMode}
							handleFavorite={handleUnfavoriteContact}
						/>
					)}

					{contacts.length > 0 && (
						<Contacts
							contacts={contacts}
							isGridMode={isGridMode}
							handleFavorite={handleFavoriteContact}
						/>
					)}
				</>
			)}

			<AddNewContactButton />
		</HomeContainer>
	);
}
