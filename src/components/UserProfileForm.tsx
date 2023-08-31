
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { UserProfileUpdateRequest } from '../types/Types';
import { updateUserProfile } from '../apis/UserProfileUpdateApi';

interface UserProfileFormProps {
  token: string;
  initialName: string;
  initialContactInfo: string;
  initialAddress: string;
  initialProfilePicture: string;
}

const UserProfileForm: React.FC<UserProfileFormProps> = ({
  token,
  initialName,
  initialContactInfo,
  initialAddress,
  initialProfilePicture,
}) => {
  const [name, setName] = useState(initialName);
  const [contactInfo, setContactInfo] = useState(initialContactInfo);
  const [address, setAddress] = useState(initialAddress);
  const [profilePicture, setProfilePicture] = useState(initialProfilePicture);

  const handleSaveChanges = () => {
    const request: UserProfileUpdateRequest = {
      token,
      name,
      contactInfo,
      address,
      profilePicture,
    };

    updateUserProfile(request)
      .then((response) => {
        console.log(response.message);
        // Handle success response
      })
      .catch((error) => {
        console.error(error);
        // Handle error response
      });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Name"
      />
      <TextInput
        style={styles.input}
        value={contactInfo}
        onChangeText={setContactInfo}
        placeholder="Contact Info"
      />
      <TextInput
        style={styles.input}
        value={address}
        onChangeText={setAddress}
        placeholder="Address"
      />
      <TextInput
        style={styles.input}
        value={profilePicture}
        onChangeText={setProfilePicture}
        placeholder="Profile Picture"
      />
      <Button title="Save Changes" onPress={handleSaveChanges} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: '#dddddd',
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
});

export default UserProfileForm;