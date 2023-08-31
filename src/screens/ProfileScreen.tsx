
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Image } from 'react-native';
import { UserProfileRequest, UserProfileResponse, UserProfileUpdateRequest, UserProfileUpdateResponse } from '../types/Types';
import { getUserProfile, updateUserProfile } from '../apis/UserProfileApi';

const ProfileScreen: React.FC = () => {
  const [name, setName] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [address, setAddress] = useState('');
  const [profilePicture, setProfilePicture] = useState('');
  const [isLoading, setIsLoading] = useState(true);
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
      setName(response.user.name);
      setContactInfo(response.user.contactInfo || '');
      setAddress(response.user.address || '');
      setProfilePicture(response.user.profilePicture || '');
      setIsLoading(false);
    } catch (error) {
      setError('Failed to fetch user profile');
      setIsLoading(false);
    }
  };

  const handleSaveChanges = async () => {
    try {
      const request: UserProfileUpdateRequest = {
        token: 'YOUR_JWT_TOKEN', // Replace with actual JWT token
        name,
        contactInfo,
        address,
        profilePicture,
      };
      const response: UserProfileUpdateResponse = await updateUserProfile(request);
      setError('');
      // Show success message or perform any other actions
    } catch (error) {
      setError('Failed to update user profile');
    }
  };

  if (isLoading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View>
      <Text>Name:</Text>
      <TextInput value={name} onChangeText={setName} />

      <Text>Contact Info:</Text>
      <TextInput value={contactInfo} onChangeText={setContactInfo} />

      <Text>Address:</Text>
      <TextInput value={address} onChangeText={setAddress} />

      <Text>Profile Picture:</Text>
      <Image source={{ uri: profilePicture }} style={{ width: 100, height: 100 }} />

      <Button title="Save Changes" onPress={handleSaveChanges} />

      {error ? <Text>{error}</Text> : null}
    </View>
  );
};

export default ProfileScreen;