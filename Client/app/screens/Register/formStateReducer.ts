import {
  FormAction,
  RegisterFormField,
  RegisterFormState
} from "../../Types/SharedTypes";
import { formValidations } from "../../utils/utils";

export const reducer = (
  state: RegisterFormState,
  action: FormAction<RegisterFormField>
): RegisterFormState => {
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

    case "blur_field":
      return {
        ...state,
        [action.field]: { ...state[action.field], focus: false }
      };
  }
};

export const initialState: RegisterFormState = {
  email: {
    value: "",
    valid: false,
    highlight: false,
    focused: false
  },
  name: {
    value: "",
    valid: false,
    highlight: false,
    focused: false
  },
  username: {
    value: "",
    valid: false,
    highlight: false,
    focused: false
  },
  password: {
    value: "",
    valid: false,
    highlight: false,
    focused: false
  }
};
