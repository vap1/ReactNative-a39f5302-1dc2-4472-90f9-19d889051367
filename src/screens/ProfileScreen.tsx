
import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { UserProfileRequest, UserProfileResponse, UserProfileUpdateRequest, UserProfileUpdateResponse } from '../types/Types';
import getUserProfile from '../apis/UserProfileApi';
import updateUserProfile from '../apis/UserProfileUpdateApi';

const ProfileScreen: React.FC = () => {
  const [name, setName] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [address, setAddress] = useState('');
  const [profilePicture, setProfilePicture] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const request: UserProfileRequest = {
        token: 'YOUR_JWT_TOKEN', // Replace with actual JWT token
      };

      const response: UserProfileResponse = await getUserProfile(request);

      const { user } = response;
      setName(user.name);
      setContactInfo(user.contactInfo || '');
      setAddress(user.address || '');
      setProfilePicture(user.profilePicture || '');
    } catch (error) {
      setError('Failed to retrieve user profile');
    }
  };

  const handleProfileUpdate = async () => {
    try {
      const request: UserProfileUpdateRequest = {
        token: 'YOUR_JWT_TOKEN', // Replace with actual JWT token
        name,
        contactInfo,
        address,
        profilePicture,
      };

      const response: UserProfileUpdateResponse = await updateUserProfile(request);

      if (response.success) {
        // Profile update successful
      } else {
        setError(response.message);
      }
    } catch (error) {
      setError('Failed to update user profile');
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        placeholder="Contact Info"
        value={contactInfo}
        onChangeText={setContactInfo}
      />
      <TextInput
        placeholder="Address"
        value={address}
        onChangeText={setAddress}
      />
      <TextInput
        placeholder="Profile Picture"
        value={profilePicture}
        onChangeText={setProfilePicture}
      />
      <Button title="Save Changes" onPress={handleProfileUpdate} />
      {error ? <Text>{error}</Text> : null}
    </View>
  );
};

export default ProfileScreen;