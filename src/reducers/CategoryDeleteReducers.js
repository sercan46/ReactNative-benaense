import {DELETE_REQUEST_CATEGORY,DELETE_REQUEST_SUCCESS_CATEGORY} from '../actions/types';
const INITIAL_STATE={
  loadingDelete:false
};
export default(state=INITIAL_STATE,action)=>{
    switch (action.type) {
      case DELETE_REQUEST_CATEGORY:
            return {loadingDelete:true};
      case DELETE_REQUEST_SUCCESS_CATEGORY:
            return INITIAL_STATE;
        break;
      default:
      return state;

    }
}
