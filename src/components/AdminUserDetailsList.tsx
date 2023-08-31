
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { AdminUserDetailsRequest, AdminUserDetailsResponse, User } from '../types/Types';
import getAdminUserDetails from '../apis/AdminUserDetailsApi';

const AdminUserDetailsList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAdminUserDetails();
  }, []);

  const fetchAdminUserDetails = async () => {
    try {
      const request: AdminUserDetailsRequest = {
        token: 'YOUR_ADMIN_JWT_TOKEN', // Replace with actual admin JWT token
      };

      const response: AdminUserDetailsResponse = await getAdminUserDetails(request);

      setUsers(response.users);
    } catch (error) {
      setError(error.message);
    }
  };

  const renderUserItem = ({ item }: { item: User }) => (
    <View>
      <Text>Name: {item.name}</Text>
      <Text>Email: {item.email}</Text>
      <Text>Contact Info: {item.contactInfo}</Text>
      <Text>Address: {item.address}</Text>
      <Text>Profile Picture: {item.profilePicture}</Text>
    </View>
  );

  return (
    <View>
      {error ? <Text>{error}</Text> : null}
      <FlatList
        data={users}
        renderItem={renderUserItem}
        keyExtractor={(item) => item.email}
      />
    </View>
  );
};

export default AdminUserDetailsList;