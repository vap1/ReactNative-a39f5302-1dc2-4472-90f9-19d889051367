
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { AdminUserDetailsResponse, User } from '../types/Types';
import { getAdminUserDetails } from '../apis/AdminUserDetailsApi';

const AdminUserDetailsScreen: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetchAdminUserDetails();
  }, []);

  const fetchAdminUserDetails = async () => {
    try {
      const response: AdminUserDetailsResponse = await getAdminUserDetails();
      setUsers(response.users);
    } catch (error) {
      console.error('Error fetching admin user details:', error);
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
      <Text>Admin User Details</Text>
      <FlatList
        data={users}
        renderItem={renderUserItem}
        keyExtractor={(item) => item.email}
      />
    </View>
  );
};

export default AdminUserDetailsScreen;