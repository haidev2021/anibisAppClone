import * as React from 'react';
import { View, StyleSheet, } from "react-native";
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { RootStackParamList } from '../../../Type';
import { AdvertList, ListType, ItemType } from '../../components/advertLists/list';
import { fetchFavoriteAdvertsAction } from '../../redux/actions/actionsFavorite';
import { useSelector } from 'react-redux';
import { trans } from '../../utils/common';
import { useCallback } from 'react';

type Props = BottomTabScreenProps<RootStackParamList, 'History'>;
export default function History({ navigation }: Props) {
    const texts = useSelector(state => state.localization.texts)

    const onSearchPress = useCallback(() => {
        navigation.navigate(trans("apps.search", texts))
    }, [navigation])

    return <AdvertList
        itemType={ItemType.FAT}
        listType={ListType.HISTORY}
        itemClass="non-material-bordered"
        lng={"de"}
        navigation={navigation}
        nocontent={{
            title: trans("apps.nohistory", texts),
            description: trans("apps.nohistory.description", texts),
            buttonText: trans("apps.action.search", texts),
            onButtonClick: onSearchPress
        }} />
}