
import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { UserRegistrationRequest, UserRegistrationResponse } from '../types/Types';
import registerUser from '../apis/UserRegistrationApi';

const RegistrationScreen: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegistration = async () => {
    try {
      const request: UserRegistrationRequest = {
        name,
        email,
        password,
      };

      const response: UserRegistrationResponse = await registerUser(request);

      if (response.success) {
        // Registration successful, navigate to the next screen
      } else {
        setError(response.message);
      }
    } catch (error) {
      setError('Failed to register user');
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
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Register" onPress={handleRegistration} />
      {error ? <Text>{error}</Text> : null}
    </View>
  );
};

export default RegistrationScreen;