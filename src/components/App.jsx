import React, { Component } from 'react';
import shortid from 'shortid';
import Section from './Section';
import ContactsList from './ContactsList';
import ContactForm from './ContactForm';
import Filter from './Filter';

export class App extends Component {
  state = {
    contacts: [],
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

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);

    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    };
  };

  componentDidUpdate(_, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    };
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


