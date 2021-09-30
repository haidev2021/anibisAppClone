import { IXBaseAdvert } from "./src/utils/xbaseInterface.d";

export type RootStackParamList = {
    Tabs: undefined;
    Home: undefined;
    Insertion: undefined;
    Messenger: undefined;
    MyAnibis: undefined;
    Search: { catId: number, searchTermFlag: boolean, searchQuery: string };
    DetailPager: { firstItem: number, listType: number};
    NestedDetailPager: { firstItem: number, listType: number};
    SingleDetail: { detail: IXBaseAdvert};
    EditInsertion: { editInsertion: IXBaseAdvert};
    Notification: undefined;
    Login: undefined;
    Feedback: undefined;
    About: undefined;
    Favorite: undefined;
    History: undefined;
    UserListing: undefined;
    InsertionList: undefined;
    Feed: { sort: 'latest' | 'top' } | undefined;
  };