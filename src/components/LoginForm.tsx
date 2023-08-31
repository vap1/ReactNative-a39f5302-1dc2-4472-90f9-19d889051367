
import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { UserLoginRequest } from '../types/Types';
import { loginUser } from '../apis/UserLoginApi';

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

      const response = await loginUser(request);

      if (response.success) {
        // Handle successful login
      } else {
        setError(response.message);
      }
    } catch (error) {
      setError('An error occurred during login.');
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
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
      {error ? <Text>{error}</Text> : null}
    </View>
  );
};

export default LoginForm;