import {CATEGORY_LİST_SUCCESS_CATEGORY} from '../actions/types';

const INITIAL_STATE={
};
export default(state=INITIAL_STATE,action)=>{
  switch (action.type) {
    case CATEGORY_LİST_SUCCESS_CATEGORY:
      return action.payload;
    default:
      return state;
  }
};
