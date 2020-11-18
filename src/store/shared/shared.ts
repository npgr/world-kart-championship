import thunk, { ThunkDispatch } from "redux-thunk";
import configureStore from "redux-mock-store";
import { AxiosResponse } from "axios";

export const mockStoreRedux = (initialState: object) => {
  const mockStore = configureStore([thunk]);
  return mockStore(initialState);
};

export type StoreDispatch = ThunkDispatch<any, any, any>;

export function hasOwnProperty(obj: any, propertyName: string): boolean {
  return Object.prototype.hasOwnProperty.call(obj, propertyName);
}

type getErrorMessageType = (field: string, objectName: string) => string;

export type DataType =
  | "string"
  | "number"
  | "object"
  | "boolean"
  | "array"
  | string;

export type DataTypeConfig = {
  type: DataType;
  allowNull?: boolean;
};

const isValidDataType = (
  fieldType: string | DataTypeConfig,
  fieldValue: any
) => {
  let type = typeof fieldType === "object" ? fieldType.type : fieldType;
  let allowNull = typeof fieldType === "object" ? fieldType.allowNull : false;

  return (
    type.includes(typeof fieldValue) ||
    (type === "array" && Array.isArray(fieldValue)) ||
    (allowNull && fieldValue === null)
  );
};

export function validateResponseItem(
  item: { [key: string]: any },
  fields: {
    [key: string]: DataType | DataTypeConfig;
  },
  getErrorMessage: getErrorMessageType,
  getErrorTypeMessage: getErrorMessageType,
  objectName = ""
) {
  const fieldsNames = Object.keys(fields);
  fieldsNames.forEach((fieldName) => {
    if (!hasOwnProperty(item, fieldName)) {
      throw new Error(getErrorMessage(fieldName, objectName));
    }

    if (!isValidDataType(fields[fieldName], item[fieldName]))
      throw new Error(getErrorTypeMessage(fieldName, objectName));
  });
}

export interface IApiCallReduxParams {
  actionType: string;
  apiCall: Function;
  builder?: Function;
  customCatch?: Function;
}

export const apiCallRedux = ({
  actionType,
  apiCall,
  builder,
  customCatch,
}: IApiCallReduxParams) => (dispatch: StoreDispatch) => {
  dispatch({ type: `${actionType}_START` });
  return apiCall()
    .then((res: AxiosResponse<any>) =>
      dispatch({
        type: `${actionType}_SUCCESS`,
        payload: builder ? builder(res.data) : res.data,
      })
    )
    .catch((err: any) =>
      !customCatch
        ? dispatch({
            type: `${actionType}_FAILURE`,
            payload: err,
          })
        : customCatch(err)
    );
};
