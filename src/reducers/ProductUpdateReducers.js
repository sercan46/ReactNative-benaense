import {UPDATE_REQUEST,UPDATE_REQUEST_SUCCESS} from '../actions/types';
const INITIAL_STATE={
  loadingUpdate:false
};
export default(state=INITIAL_STATE,action)=>{
    switch(action.type){
      case UPDATE_REQUEST:
          return {loadingUpdate:true};
        break;
        case UPDATE_REQUEST_SUCCESS:
            return INITIAL_STATE;
          break;
          default:
          return state;

    }
}
