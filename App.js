import React, {useEffect, useRef, useState} from 'react';
import {
  Button,
  Modal,
  PermissionsAndroid,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Contacts from 'react-native-contacts';
import {Text, View, FlatList, StyleSheet, TextInput} from 'react-native';

function App() {
  const [contacts, setContacts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  let input = useRef();
  useEffect(() => {
    getAllContacts();
  }, []);

  const getAllContacts = () => {
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
      title: 'Contacts',
      message: 'This app would like to view your contacts.',
      buttonPositive: 'Please accept bare mortal',
    }).then(
      Contacts.getAll()
        .then(contacts => {
          // work with contacts
          // console.log(contacts);
          setData(contacts);
          setContacts(contacts);
        })
        .catch(e => {
          console.warn(e);
        }),
    );
  };

  const handleSearch = text => {
    setSearchQuery(text);
    const filteredList = data.filter(contact => {
      let defaultList = (
        contact.givenName +
        ' ' +
        contact.familyName
      ).toLowerCase();
      let searchParameter = text.toLowerCase();
      return defaultList.indexOf(searchParameter) !== -1;
    });
    setContacts(filteredList);
  };
  const clearVal = () => {
    setContacts(data);
    input.current.blur();
    setSearchQuery('');
  };
  const updateModal = item => {
    setShowModal(true);
    setSelectedUser(item);
  };

  return (
    <View style={styles.container}>
      <View style={{margin: 0}}>
        <Text style={styles.header}>Contacts</Text>
      </View>
      <View style={{flexDirection: 'row'}}>
        <TextInput
          placeholder="Search"
          cursorColor={'#ccc'}
          style={styles.searchBox}
          autoCorrect={false}
          value={searchQuery}
          onChangeText={text => handleSearch(text)}
          ref={input}
        />
        {searchQuery.length > 0 ? (
          <Text
            style={{
              flex: 1,
              textAlign: 'center',
              textAlignVertical: 'center',
              fontSize: 20,
            }}
            onPress={clearVal}>
            ✖
          </Text>
        ) : null}
      </View>
      <ScrollView style={styles.contactWrapper}>
        {contacts.length > 0
          ? contacts.map((item, key) => (
              <TouchableOpacity
                key={key}
                style={styles.singleContact}
                onPress={() => updateModal(item)}>
                <Text style={styles.contactName}>{item.displayName}</Text>
                <Text style={{fontSize: 20}}>
                  {item.phoneNumbers[0].number}
                </Text>
              </TouchableOpacity>
            ))
          : null}
      </ScrollView>
      <Modal transparent={true} visible={showModal}>
        <UserModal setShowModal={setShowModal} selectedUser={selectedUser} />
      </Modal>
    </View>
  );
}

const UserModal = ({setShowModal, selectedUser}) => {
  return (
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <TouchableOpacity style={styles.closeButton}>
          <Text
            style={styles.closeButtonText}
            onPress={() => setShowModal(false)}>
            ✖
          </Text>
        </TouchableOpacity>
        <View style={styles.userInfoContainer}>
          <Text style={styles.userInfoLabel}>First Name:</Text>
          <Text style={styles.userInfoText}>{selectedUser.givenName}</Text>
          <Text style={styles.userInfoLabel}>Last Name:</Text>
          <Text style={styles.userInfoText}>{selectedUser.familyName}</Text>
          <Text style={styles.userInfoLabel}>Phone No.:</Text>
          <Text style={styles.userInfoText}>
            {selectedUser.phoneNumbers[0].number}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    textAlign: 'center',
    padding: 10,
    fontSize: 24,
    backgroundColor: '#3D93D1',
    color: '#fff',
    fontWeight: 'bold',
    shadowColor: 'black',
    elevation: 15,
  },
  searchBox: {
    flex: 9,
    marginHorizontal: 10,
    marginVertical: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    fontSize: 20,
  },
  contactWrapper: {
    flex: 1,
    marginHorizontal: 10,
    borderRadius: 12,
  },
  singleContact: {
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    padding: 10,
  },
  contactName: {color: 'royalblue', fontSize: 20, marginBottom: 4},
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
    alignItems: 'flex-start',
    elevation: 5,
    flexDirection: 'row',
  },
  userInfoContainer: {
    flex: 1,
  },
  userInfoLabel: {
    fontSize: 16,
    marginBottom: 5,
  },
  userInfoText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  closeButtonText: {
    fontSize: 20,
  },
});

export default App;
