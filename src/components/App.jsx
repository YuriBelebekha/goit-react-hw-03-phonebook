import React, { Component } from 'react';
import shortid from 'shortid';
import Section from './Section';
import ContactsList from './ContactsList';
import ContactForm from './ContactForm';
import Filter from './Filter';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson',  number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements',  number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };
  
  addContact = (name, number) => {
    const contact = {
      id: shortid.generate(),
      name,
      number,
    }

    const checkDuplicateContact = this.state.contacts.some(addContact =>
      (addContact.name.toLocaleLowerCase() === contact.name.toLocaleLowerCase())
    );

    checkDuplicateContact
      ? alert(`${name.toUpperCase()} is already in contacts`)
      : this.setState(({ contacts }) => ({
        contacts: [contact, ...contacts],
      }));
  };

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  deleteContact = (contactId) => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }))
  };

  getFilteredContacts = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact => 
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  render() {        
    const filteredContacts = this.getFilteredContacts();
        
    return (
      <>
        <Section title="Phonebook">
          <ContactForm
            onSubmit={this.addContact}
          />
        </Section>

        <Section title="Contacts">
          <Filter
            filter={this.filter}
            onChange={this.changeFilter}
          />

          <ContactsList
            contacts={filteredContacts}
            onDeleteContact={this.deleteContact}
          />
        </Section>
      </>
    );
  };
}


