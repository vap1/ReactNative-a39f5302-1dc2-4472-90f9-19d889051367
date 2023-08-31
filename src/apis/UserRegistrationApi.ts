
import axios from 'axios';
import { UserRegistrationRequest, UserRegistrationResponse } from '../types/Types';

const registerUser = async (request: UserRegistrationRequest): Promise<UserRegistrationResponse> => {
  try {
    const response = await axios.post('/api/register', request);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export default registerUser;