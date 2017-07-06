import {
  API_QUERY,
} from '../constants/config';

export async function imagesQuery() {
  try {
    const response = await fetch(`${API_QUERY}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    let responseJson = false;
    try {
      responseJson = await response.json();
    } catch (error) {
      return false;
    }
    return responseJson;
  } catch (error) {
    console.log('error ', error);
  }
}
