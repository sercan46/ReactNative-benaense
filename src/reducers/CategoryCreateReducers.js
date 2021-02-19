import {CATEGORY_CHANGE,CREATE_REQUEST_CATEGORY,CREATE_REQUEST_SUCCESS_CATEGORY} from '../actions/types';

const INITIAL_STATE={
    description:'',
    image:'',
    name:'',
    loading:false
};
export default(state=INITIAL_STATE,action)=>{
  switch (action.type) {
    case CATEGORY_CHANGE:
        return {...state,[action.payload.props]:action.payload.value};
      break;
      case CREATE_REQUEST_CATEGORY:
          return {...state,loading:true}
        break;
        case CREATE_REQUEST_SUCCESS_CATEGORY:
            return {INITIAL_STATE}
          break;
    default:
      return state;

  }
};
