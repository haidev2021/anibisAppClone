import { IUploadImageParam } from "./action.d";
import { actionTypes } from "./actionTypes";

export const uploadImageAction = (param: IUploadImageParam) => {
    return {
        type: actionTypes.UPLOAD_IMAGE,
        param,
    };
}