
import axios from 'axios';
import { UserProfileUpdateRequest, UserProfileUpdateResponse } from '../types/Types';

const updateUserProfile = async (request: UserProfileUpdateRequest): Promise<UserProfileUpdateResponse> => {
  try {
    const response = await axios.put('/api/profile', request, { headers: { Authorization: `Bearer ${request.token}` } });
    return response.data;
  } catch (error) {
    throw new Error('Failed to update user profile');
  }
};

export default updateUserProfile;