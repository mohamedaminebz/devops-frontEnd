// third-party
import { combineReducers } from 'redux';

// project import
import menu from '../feature/menuSlice';
import auth from '../feature/authSlice';

// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({ menu, auth });

export default reducers;
