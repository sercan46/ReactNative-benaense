import {DELETE_REQUEST,DELETE_REQUEST_SUCCESS} from '../actions/types';
const INITIAL_STATE={
  loadingDelete:false
};
export default(state=INITIAL_STATE,action)=>{
    switch (action.type) {
      case DELETE_REQUEST:
            return {loadingDelete:true};
      case DELETE_REQUEST_SUCCESS:
            return INITIAL_STATE;
        break;
      default:
      return state;

    }
}
