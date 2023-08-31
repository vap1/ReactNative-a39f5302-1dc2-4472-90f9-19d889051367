
import axios from 'axios';
import { UserLoginRequest, UserLoginResponse } from '../types/Types';

const loginUser = async (request: UserLoginRequest): Promise<UserLoginResponse> => {
  try {
    const response = await axios.post('/api/login', request);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export default loginUser;