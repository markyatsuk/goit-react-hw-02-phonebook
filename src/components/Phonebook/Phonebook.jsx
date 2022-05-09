import React, { Component } from 'react';
// import s from './Phonebook.module.css';
import { Contacts } from './Contacts';
import { nanoid } from 'nanoid';
import { Section } from './Section';
import { Form } from './Form';
import { Filter } from './Filter';

class Phonebook extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
    name: '',
    number: '',
  };

  handleSubmit = e => {
    e.preventDefault();
    const { contacts } = this.state;
    const form = e.currentTarget;
    const name = form.elements.name.value;
    const number = form.elements.number.value;
    let isNameAlreadyExists = false;

    contacts.forEach(contact => {
      if (contact.name === name) {
        isNameAlreadyExists = true;
      }
    });

    this.setState(prevState => {
      contacts.filter(contact => contact.name.includes(name));
      console.log(isNameAlreadyExists);
      if (isNameAlreadyExists) {
        alert(`${name} is already in contacts`);
        return;
      } else {
        return {
          contacts: [
            ...prevState.contacts,
            {
              name,
              id: nanoid(),
              number,
            },
          ],
        };
      }
    });
  };

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  filterContacts = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  deleteContact = contactId => {
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(
          contact => contact.id !== contactId
        ),
      };
    });
  };

  render() {
    const { filter } = this.state;
    const filteredContacts = this.filterContacts();
    return (
      <div>
        <Section title="Phonebook">
          <Form onFormSubmit={this.handleSubmit} />
        </Section>

        <Section title="Contacts">
          <Filter filterValue={filter} onChangeFilter={this.changeFilter} />
          <Contacts
            contacts={filteredContacts}
            onDeleteContact={this.deleteContact}
          />
        </Section>
      </div>
    );
  }
}

export { Phonebook };
