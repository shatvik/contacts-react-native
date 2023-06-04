# Contacts App in React-Native

In this app :

1. We will take permission to access user phone's contact.
2. All the `Contacts` will get display on screen.
3. It has `Search` Box on top so that user can search for any name inside contacts.
4. Whenever, User clicks on any of the contact , then we will show the popup along with their phone no.

### Libraries used :

- `Contacts` - _from react-native-contacts_
- From `react-native` :
  - imported components & functions => **_Text, View, FlatList, StyleSheet, TextInput, Modal, PermissionsAndroid, ScrollView, TouchableOpacity._**

### React Hooks used :

- useState() - _for storing the states of variables_.
- useEffect() - _for setting the data into our `app` component_.
- useRef() - _for handling the input box_.

### Code working :

1. Inside our `App.js` component we have imported all the required libraries then we have our async code for PermissionsAndroid from where we all accessing our contact list inside `getAllContacts()` function, then we are setting the data recieved to our useState variable.
2. Now, once we got the data we will display its jsx with the help of `.map()` method .
3. Now we will look for its search functionality for that we have made one function name `handleSearch()` , inside this we have our searching logic.
4. Then comes our task to implement a dismissable popup for that we have used inbuilt `Modal` Component from _react-native_.
5. I made UserModal component and it contains the data like name and phone no.
6. We have also set a useState for Modal closing , upon clicking on `x` TouchableOpactity we can close the modal.

Thats all !
You can Run the app by installing the **_.apk_** file from `apkFile` folder
or
You can run expo app commands .
or
You can run this on android emulator.
