import axios from 'axios';
import { LOAD_USER, AUTH_ERROR } from './types';

// Load User
export const loadUser = () => async dispatch => {
  try {
    const res = await axios.get('/api/auth/user');
    dispatch({
      type: LOAD_USER,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};