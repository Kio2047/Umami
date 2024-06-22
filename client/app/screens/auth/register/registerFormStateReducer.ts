import { FormAction, FormState } from "../../../types/auth/CommonAuthTypes";
import { RegisterField } from "../../../types/auth/RegisterTypes";

export const reducer = (
  state: FormState<RegisterField>,
  action: FormAction<RegisterField>
): FormState<RegisterField> => {
  switch (action.type) {
    case "update_field":
      return {
        ...state,
        [action.field]: {
          ...state[action.field],
          value: action.value,
          valid: true,
          invalidMessage: ""
        }
      };

    case "focus_field": {
      return {
        ...state,
        [action.field]: { ...state[action.field], focused: true }
      };
    }

    case "blur_field": {
      return {
        ...state,
        [action.field]: { ...state[action.field], focused: false }
      };
    }

    case "add_invalid_warning": {
      const { invalidMessage } = action;
      return {
        ...state,
        [action.field]: {
          ...state[action.field],
          valid: false,
          invalidMessage
        }
      };
    }
  }
};

export const initialState: FormState<RegisterField> = {
  email: {
    value: "",
    valid: true,
    focused: false,
    invalidMessage: ""
    // highlight: false,
    // error: false
  },
  fullName: {
    value: "",
    valid: true,
    focused: false,
    invalidMessage: ""
    // highlight: false,
    // error: false
  },
  username: {
    value: "",
    valid: true,
    focused: false,
    invalidMessage: ""
    // highlight: false,
    // error: false
  },
  password: {
    value: "",
    valid: true,
    focused: false,
    invalidMessage: ""
    // highlight: false,
    // error: false
  }
};
