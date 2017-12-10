import React,{Component} from 'react';
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';

import Avatar from 'material-ui/Avatar';
import SocialPerson from 'material-ui/svg-icons/social/person';

import {List, ListItem} from 'material-ui/List';
import Chip from 'material-ui/Chip';

//import Contact from './../Contact/Contact';

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
  dateChip: {
    margin: 4,
    backgroundColor: '#FFFFFF00', // 100% Transparency
  },
  dateChipLabel: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  dateChipLabelColor: '#00000080',  // 50% Transparency
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

// LIST ITEM
const SortableItem = SortableElement(({collection, contact}) => {
  //const company = contact.company;
  const context = contact.context;
  const latest_dialogue = contact.latest_dialogue;
  return (
    <ListItem
      disabled={true}
      style={styles.listItem}
      leftAvatar={<Avatar icon={<SocialPerson />}/>}
      primaryText={contact.name}
      secondaryText={contact.id}
      rightAvatar={
        <div style={styles.chipWrapper}>
          <Chip style={styles.chip} labelStyle={styles.chipLabel} onClick={() => onContextClick({context})}>{context}</Chip>
          <Chip style={styles.dateChip} labelStyle={styles.dateChipLabel} labelColor={styles.dateChipLabelColor}>{latest_dialogue}</Chip>
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
    contacts: [
      {
        'id':'123@gmail.com',
        'name':'Daniel Holmberg',
        'company':'Sectra AB',
        'context':'STABEN Spons',
        'latest_dialogue':'2017-12-09',
        'info':'Blablabla blabla blablabla.',
      },
      {
        'id':'234@gmail.com',
        'name':'Albin Andersson',
        'company':'Sectra AB',
        'context':'STABEN Spons',
        'latest_dialogue':'2017-12-08',
        'info':'Blablabla blabla blablabla.',
      },
      {
        'id':'345@gmail.com',
        'name':'Christian Holmberg',
        'company':'Accenture',
        'context':'NärU',
        'latest_dialogue':'2017-12-02',
        'info':'Blablabla blabla blablabla.',
      },
      {
        'id':'456@gmail.com',
        'name':'Johanna Assarsson',
        'company':'Spotify',
        'context':'D-LAN Spons',
        'latest_dialogue':'2017-11-10',
        'info':'Blablabla blabla blablabla.',
      },
    ],
  };

  onSortStart = ({oldIndex, newIndex}) => {

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
        onSortStart={this.onSortStart}
        onSortEnd={this.onSortEnd}
        useWindowAsScrollContainer={true}
        lockAxis='y'
      />
    );
  }
}
