import {CATEGORY_LİST_SUCCESS} from '../actions/types';

const INITIAL_STATE={
};
export default(state=INITIAL_STATE,action)=>{
  switch (action.type) {
    case CATEGORY_LİST_SUCCESS:
      return action.payload;
    default:
      return state;
  }
};
