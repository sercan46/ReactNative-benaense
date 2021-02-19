import {PRODUCT_CHANGE,CREATE_REQUEST,CREATE_REQUEST_SUCCESS} from '../actions/types';

const INITIAL_STATE={
    category:'',
    count:'',
    description:'',
    image:'',
    name:'',
    price:'',
    loading:false
};
export default(state=INITIAL_STATE,action)=>{
  switch (action.type) {
    case PRODUCT_CHANGE:
        return {...state,[action.payload.props]:action.payload.value};
      break;
      case CREATE_REQUEST:
          return {...state,loading:true}
        break;
        case CREATE_REQUEST_SUCCESS:
            return {INITIAL_STATE}
          break;
    default:
      return state;

  }
};
