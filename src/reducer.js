export const initialState = {
        data: [],
        isLoading: false,
        visibleModal: false,
        currentPost: undefined,
        comments: [],
        search: '',
}

export function reducer(state, action) {
    switch (action.type) {
      case 'CHANGE_LOADING_STATUS':
        return {
          ...state,
          isLoading: action.isLoading,
        };
      case 'SET_ARTICLES':
        return {
          ...state,
          data: [...action.payload],
          isLoading: false,
        //   search:''
        };
      case 'DELETE_ARTICLE':
        return {
          ...state,
          data: [...action.payload],
          isLoading: action.isLoading,
        };
      case 'MODAL_VISIBILITY':
        return {
          ...state,
          visibleModal: action.visibleModal,
          currentPost: action.currentPost,
        };
      case 'ADD_ARTICLE':
        return {
          ...state,
          data: [...state.data, action.payload],
          visibleModal: action.visibleModal,
          isLoading: false,
        };
      case 'CHANGE_ARTICLE':
        return {
          ...state,
          data: state.data.map((item) => {
            if (item.id === action.payload.id) {
              item = action.payload;
            }
            return item;
          }),
          visibleModal: action.visibleModal,
          isLoading: false,
        };
        case 'SET_COMMENTS':
            return {
                ...state,
                comments: {...state.comments, [action.userId]: action.payload},
            }
        case 'SEARCH': 
            return {
                ...state,
                search: action.search,
            }
      default:
        return { ...state };
    }
  }