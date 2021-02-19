import {UPDATE_REQUEST_CATEGORY,UPDATE_REQUEST_SUCCESS_CATEGORY} from '../actions/types';
const INITIAL_STATE={
  loadingUpdateCategory:false
};
export default(state=INITIAL_STATE,action)=>{
  console.log('action toy',action.type)
    switch(action.type){
      case UPDATE_REQUEST_CATEGORY:
          return {loadingUpdateCategory:true};
        break;
        case UPDATE_REQUEST_SUCCESS_CATEGORY:
            return INITIAL_STATE;
          break;
          default:
          return state;

    }
}
