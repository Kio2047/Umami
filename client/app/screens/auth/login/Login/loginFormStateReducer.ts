import {
  FormAction,
  LoginFormField,
  FormState
} from "../../types/CredentialFormTypes";
import { formValidations } from "../../utils/utils";

export const reducer = (
  state: FormState<LoginFormField>,
  action: FormAction<LoginFormField>
): FormState<LoginFormField> => {
  switch (action.type) {
    case "highlight_fields":
      return action.fields.reduce(
        (accumulator, field) => {
          return {
            ...accumulator,
            [field]: {
              ...accumulator[field],
              highlight: true
            }
          };
        },
        { ...state }
      );

    case "update_and_validate_field":
      return {
        ...state,
        [action.field]: {
          ...state[action.field],
          value: action.value,
          // valid: formValidations[action.field](action.value),
          highlight: false
        }
      };

    case "focus_field": {
      const updatedState = { ...state };
      let field: keyof typeof state;
      for (field in updatedState) {
        updatedState[field] = {
          ...updatedState[field],
          focused: field === action.field
        };
      }
      return updatedState;
    }

    case "blur_field": {
      return {
        ...state,
        [action.field]: { ...state[action.field], focused: false }
      };
    }
  }
};

export const initialState: FormState<LoginFormField> = {
  usernameOrEmail: {
    value: "",
    valid: false,
    highlight: false,
    focused: false,
    error: false
  },
  password: {
    value: "",
    valid: false,
    highlight: false,
    focused: false,
    error: false
  }
};
