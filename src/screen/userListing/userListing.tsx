import * as React from 'react';
import { View, StyleSheet, } from "react-native";
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { RootStackParamList } from '../../../Type';
import { AdvertList, ListType, ItemType } from '../../components/advertLists/list';
import { fetchFavoriteAdvertsAction } from '../../redux/actions/actionsFavorite';
import { useSelector, useDispatch } from 'react-redux';
import { trans } from '../../utils/common';
import { resetUserListingListAction, fetchUserListingListIdsAction } from '../../redux/actions/actionsUserListingList';
import { useEffect } from 'react';

type Props = BottomTabScreenProps<RootStackParamList, 'UserListing'>;
export default function UserListing({ route, navigation }: Props) {
    const texts = useSelector(state => state.localization.texts)

    return <AdvertList
        itemType={ItemType.FAT}
        listType={ListType.USER_LISTING}
        itemClass="non-material-bordered"
        lng={"de"}
        navigation={navigation}
        nocontent={{
            title: trans("apps.noresults.createnotification", texts),
            description: trans("apps.noresults.createnotification.description", texts),
            buttonText: trans("apps.notification.enable", texts),
            onButtonClick: () => { }
        }}/>
}