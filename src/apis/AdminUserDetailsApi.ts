
import axios from 'axios';
import { AdminUserDetailsRequest, AdminUserDetailsResponse } from '../types/Types';

const getAdminUserDetails = async (request: AdminUserDetailsRequest): Promise<AdminUserDetailsResponse> => {
  try {
    const response = await axios.get('/api/admin/users', { headers: { Authorization: `Bearer ${request.token}` } });
    return response.data;
  } catch (error) {
    throw new Error('Failed to retrieve admin user details');
  }
};

export default getAdminUserDetails;