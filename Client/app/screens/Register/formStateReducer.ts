import {
  FormAction,
  RegisterFormField,
  FormState
} from "../../Types/CredentialFormTypes";
import { formValidations } from "../../utils/utils";

export const reducer = (
  state: FormState<RegisterFormField>,
  action: FormAction<RegisterFormField>
): FormState<RegisterFormField> => {
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
          valid: formValidations[action.field](action.value),
          highlight: false
        }
      };

    case "focus_field": {
      const updatedState = { ...state };
      let field: keyof typeof state;
      for (field in updatedState) {
        if (field === action.field) updatedState[field].focused = true;
        else updatedState[field].focused = false;
      }
      return updatedState;
    }

    case "blur_field": {
      if (action.field)
        return {
          ...state,
          [action.field]: { ...state[action.field], focused: false }
        };
      const focusedEntry = Object.entries(state).find(
        (entry) => entry[1].focused
      );
      if (focusedEntry) {
        return {
          ...state,
          [focusedEntry[0]]: {
            ...focusedEntry[1],
            focused: false
          }
        };
      }
      return state;
    }
  }
};

export const initialState: FormState<RegisterFormField> = {
  email: {
    value: "",
    valid: false,
    highlight: false,
    focused: false,
    error: false
  },
  name: {
    value: "",
    valid: false,
    highlight: false,
    focused: false,
    error: false
  },
  username: {
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
