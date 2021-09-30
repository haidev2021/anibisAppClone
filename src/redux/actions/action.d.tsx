import { IXBaseAdvert, IAdvertId, ISearchCountItem, XBaseContactAddressS, TTextPack, IInsertionUpdateParam } from "../../utils/xbaseInterface.d";

export type IOnAdvertIdsSuccess = (data: IAdvertId[]) => void;
export type IOnAdvertsSuccess = (data: IXBaseAdvert[]) => void;
export type IOnAdvertSuccess = (advert: IXBaseAdvert) => void;
export type IOnSearchCountsSuccess = (data: ISearchCountItem[]) => void;
export type IOnLocationSuggestSuccess = (data: string[]) => void;
export type IOnError = (message: string) => void;
export type IOnSuccessNoContent= () => void;

export type IFetchAdvertsByIdsParam = {
    ids: IAdvertId[],
    language: string,
    debug: string
}
export type IFetchSearchCountsParam = {
    language: string,
    query: string
}
export type IFetchLocationSuggestParam = {
    language?: string,
    countryCode?: string,
    prefix: string
}
export type IOnLanguageGet = (language: string) => void

export type IGetTextsParam = {
    language: string,
    texts: TTextPack
}
export type IFetchSearchListIdsParam = {
    language: string,
    query: string,
}
export type IFetchUserListingListIdsParam = {
    language: string,
    userId: string,
}

export interface IUploadFileInfo {
    name: string
    filename: string,
    filepath: string,
    filetype: string,
}

export type IUploadImageParam = {
    file: IUploadFileInfo[],
    uploadBeginCb: (response: any) => void,
    uploadProgressCb: (response: any) => void,
    onSuccess: (body: any) => void,
    onError: (error: any) => void,
}

export type IInsertParam = {
    advert: IXBaseAdvert,
    onSuccess: (advert: IXBaseAdvert) => void,
    onError: (error: any) => void,
}

