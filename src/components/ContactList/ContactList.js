import React,{Component} from 'react';
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';
import firebase from './../../firebase.js';  // Firebase

import Avatar from 'material-ui/Avatar';
import SocialPerson from 'material-ui/svg-icons/social/person';

import {List, ListItem} from 'material-ui/List';
import Chip from 'material-ui/Chip';

//import Contact from './../Contact/Contact';

// FIRESTORE
firebase.firestore().enablePersistence()
  .then(function() {
      // Initialize Cloud Firestore through firebase
      var db = firebase.firestore();
  })
  .catch(function(err) {
      if (err.code == 'failed-precondition') {
          // Multiple tabs open, persistence can only be enabled
          // in one tab at a a time.
          // ...
      } else if (err.code == 'unimplemented') {
          // The current browser does not support all of the
          // features required to enable persistence
          // ...
      }
  });

// STYLES
const styles = {
  listItem: {
    textAlign: 'left',
    backgroundColor: '#FFFFFFCC' // 80% Transparency
  },
  chip: {
    margin: 4,
  },
  chipLabel: {
    fontWeight: 'bold',
    fontSize: 12,
  },
  chipWrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

function onContextClick({context}) {
  // TODO - Should open a modal with a list of all contacts contected to incoming 'context'.
  alert('You clicked on context: ' + context);
};

// CONTACT LIST ITEM
const SortableItem = SortableElement(({company, contact}) => {
  const context = contact.context;
  const latest_dialogue = contact.latest_dialogue;
  return (
    <ListItem
      disabled={true}
      style={styles.listItem}
      leftAvatar={<Avatar icon={<SocialPerson />}/>}
      primaryText={contact.name}
      secondaryText={contact.id + ' | ' + contact.latest_dialogue}
      rightAvatar={
        <div style={styles.chipWrapper}>
          <Chip style={styles.chip} labelStyle={styles.chipLabel} onClick={() => onContextClick({context})}>{context}</Chip>
        </div>}
    />
  );
});

// LIST
const SortableList = SortableContainer(({contacts}) => {
  return (
    <List>
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
    contacts: [],
  };

  componentDidMount() {
    var db = firebase.firestore();
    var contacts = [];
    db.collection('companies').get().then(function(companies) {
      companies.forEach(function(company) {
        db.collection('companies').get({company}).collection('contacts').get().then(function(db_contacts) {
          db_contacts.forEach(function(contact, id){
            contacts.push([
              id,
              contact.data().name,
              contact.data().context,
              contact.data().latest_dialogue,
              contact.data().info
            ]);
          });
        });
      });
    });
    this.setState({
      contacts: contacts
    });
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
        pressDelay={200}
        transitionDuration={400}
        onSortEnd={this.onSortEnd}
        useWindowAsScrollContainer={true}
        lockAxis='y'
      />
    );
  }
}
