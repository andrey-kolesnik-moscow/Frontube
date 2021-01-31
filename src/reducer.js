export const initialState = {
        data: [],
        isLoading: false,
        visibleModal: false,
        currentUser: undefined,
        comments: []
}

export function reducer(state, action) {
    switch (action.type) {
      case 'CHANGE_LOADING_STATUS':
        return {
          ...state,
          isLoading: action.isLoading,
        };
      case 'SET_LOADED_ARTICLES':
        return {
          ...state,
          data: [...action.payload],
          isLoading: action.isLoading,
        };
      case 'DELETE_ARTICLE':
        return {
          ...state,
          data: [...action.payload],
          isLoading: action.isLoading,
        };
      case 'OPEN_CLOSE_MODAL_SET_CURRENT_USER':
        return {
          ...state,
          visibleModal: action.visibleModal,
          currentUser: action.currentUser,
        };
      case 'ADD_ARTICLE':
        return {
          ...state,
          data: [...state.data, action.payload],
          visibleModal: action.visibleModal,
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
        };
        case 'ADD_COMMENT':
            return {
                ...state,
                comments: {...state.comments, [action.userId]: action.payload}
            }
      default:
        return { ...state };
    }
  }