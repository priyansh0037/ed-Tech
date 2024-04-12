


// services/opertaions/profileApi.js

import { apiConnector } from '../apiconnector';
import { profileEndPoints } from '../api';

const { ENROLLED_COURSE } = profileEndPoints;

export async function getUserEnrolledCourses(token) {
  try {
    const response = await apiConnector('GET', ENROLLED_COURSE, null, {
      Authorization: `Bearer ${token}`,
    });

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    return response.data; // Return response.data instead of response
    
  } catch (error) {
    throw new Error(`Unable to fetch enrolled courses: ${error.message}`);
  }
}
