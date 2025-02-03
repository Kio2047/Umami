import { FormState } from "../../../../types/auth/CommonAuthTypes";
import { LoginField, LoginFormAction } from "../../../../types/auth/LoginTypes";

export const reducer = (
  state: FormState<LoginField>,
  action: LoginFormAction<LoginField>
): FormState<LoginField> => {
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
      const { fields, invalidMessages } = action;
      const newState = {
        ...state
      };
      for (let i = 0; i < fields.length; i++) {
        newState[fields[i]].valid = false;
        newState[fields[i]].invalidMessage = invalidMessages[i];
      }
      return newState;
    }
  }
};

export const initialState: FormState<LoginField> = {
  usernameOrEmail: {
    value: "",
    valid: true,
    invalidMessage: "",
    focused: false
    // highlight: false,
    // error: false
  },
  password: {
    value: "",
    valid: true,
    invalidMessage: "",
    focused: false
    // highlight: false,
    // error: false
  }
};
