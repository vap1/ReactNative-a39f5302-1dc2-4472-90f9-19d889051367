
import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { UserLoginRequest, UserLoginResponse } from '../types/Types';
import loginUser from '../apis/UserLoginApi';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const request: UserLoginRequest = {
        email,
        password,
      };

      const response: UserLoginResponse = await loginUser(request);

      if (response.success) {
        // Login successful, navigate to the next screen
      } else {
        setError(response.message);
      }
    } catch (error) {
      setError('Failed to login user');
    }
  };

  return (
    <View>
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
      <Button title="Login" onPress={handleLogin} />
      {error ? <Text>{error}</Text> : null}
    </View>
  );
};

export default LoginForm;