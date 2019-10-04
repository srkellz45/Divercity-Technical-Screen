import { SHOW_MODAL, HIDE_MODAL } from '../../actions/user.actions';

const initialState = {
  modalType: null,
  modalProps: {}
};

const modal = (state = initialState, action) => {
  switch(action.type) {
    case SHOW_MODAL:
      return {
        modalType: action.modalType,
        modalProps: action.modalProps
      };
    case HIDE_MODAL:
      return state;
    default:
      return state;
  }
};

export default modal;