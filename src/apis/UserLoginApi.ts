
import { UserLoginRequest, UserLoginResponse } from '../types/Types';

export const loginUser = async (request: UserLoginRequest): Promise<UserLoginResponse> => {
  try {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error('Failed to login');
    }

    const data: UserLoginResponse = await response.json();
    return data;
  } catch (error) {
    throw new Error('Failed to login');
  }
};