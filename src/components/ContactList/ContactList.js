import React,{Component} from 'react';
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';

import Avatar from 'material-ui/Avatar';
import SocialPerson from 'material-ui/svg-icons/social/person';
import SocialPeople from 'material-ui/svg-icons/social/people';

import {List, ListItem} from 'material-ui/List';
import Chip from 'material-ui/Chip';

//import Contact from './../Contact/Contact';

// STYLES
const styles = {
  chip: {
    margin: 4,
  },
};

function handleClick({company}) {
  // TODO - Should open Modal with all Contacts related to 'company'.
  alert('You clicked ' + company);
}

// LIST ITEM
const SortableItem = SortableElement(({collection, contact}) => {
  console.log(contact.name + ': ' + contact.company);
  const company = contact.company;
  return (
    <ListItem
      style={{textAlign: 'left', backgroundColor: 'white',}}
      leftAvatar={<Avatar icon={<SocialPerson />}/>}
      primaryText={contact.name}
      secondaryText={contact.id}
      rightAvatar={<Chip style={styles.chip} onClick={() => handleClick({company})}>{company}</Chip>}
    />
  );
});

// LIST
const SortableList = SortableContainer(({contacts}) => {
  return (
    <List style={{flex:1, flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center'}}>
      {contacts.map((contact, index) => {
        return (
          <SortableItem key={contact.id} index={index} collection={contact.company} contact={contact} />
        );
      })}
    </List>
  );
});

// COMPONENT
export default class ContactList extends Component {
  state = {
    contacts: [
      {
        'id':'123@gmail.com',
        'name':'Daniel',
        'company':'Sectra AB',
      },
      {
        'id':'234@gmail.com',
        'name':'Albin',
        'company':'Sectra AB',
      },
      {
        'id':'345@gmail.com',
        'name':'Christian',
        'company':'Accenture',
      },
      {
        'id':'456@gmail.com',
        'name':'Johanna',
        'company':'Spotify',
      },
    ],
  };

  onSortEnd = ({oldIndex, newIndex}) => {
    this.setState({
      contacts: arrayMove(this.state.contacts, oldIndex, newIndex),
    });
  };

// RENDER FUNCTION
  render() {
    return (
      <SortableList
        contacts={this.state.contacts}
        onSortEnd={this.onSortEnd}
        useWindowAsScrollContainer={true}
        lockAxis='y'
      />
    );
  }
}
