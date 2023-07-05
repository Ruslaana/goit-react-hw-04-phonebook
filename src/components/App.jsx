import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

import Section from './Section';
import ContactForm from './ContactForm';
import FilterInput from './FilterInput/FilterInput';
import ContactsList from './ContactsList/ContactsList';

const App = () => {
  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const storedContacts = localStorage.getItem('contacts');
    if (storedContacts) {
      setContacts(JSON.parse(storedContacts));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = data => {
    const newContact = {
      ...data,
      id: nanoid(),
    };

    const existingContact = contacts.find(
      contact => contact.name === data.name
    );
    if (existingContact) {
      alert(`${data.name} is a duplicate contact`);
    } else {
      setContacts(prevContacts => [...prevContacts, newContact]);
    }
  };

  const deleteContact = userId => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== userId)
    );
  };

  const handleChangeFilter = ({ target: { value } }) => {
    setFilter(value);
  };

  const getFilteredContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  return (
    <>
      <Section title="Phonebook">
        <ContactForm addContact={addContact} />
      </Section>
      <Section title="Contacts">
        <FilterInput value={filter} onChangeFilter={handleChangeFilter} />
        <ContactsList
          contacts={getFilteredContacts()}
          delContact={deleteContact}
        />
      </Section>
    </>
  );
};

export default App;
