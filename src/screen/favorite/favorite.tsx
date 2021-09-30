import * as React from 'react';
import { View, StyleSheet, } from "react-native";
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { RootStackParamList } from '../../../Type';
import { AdvertList, ListType, ItemType } from '../../components/advertLists/list';
import { fetchFavoriteAdvertsAction } from '../../redux/actions/actionsFavorite';
import { useSelector } from 'react-redux';
import { trans } from '../../utils/common';
import PlainText from '../../sharedcomponents/plainText/plainText';
import FullWidthButton from '../../sharedcomponents/button/fullWidthButton';
import { useCallback, Fragment } from 'react';
import { Styles } from '../../sharedcomponents/centerAnchoredModal/styles';
import { FStyles } from './fStyles';
import { isAuthorized } from '../../utils/network';

type Props = BottomTabScreenProps<RootStackParamList, 'Favorite'>;
export default function Favorite({ navigation }: Props) {
    const token = useSelector(state => state.authentication.token)
    const texts = useSelector(state => state.localization.texts)
    const favoriteIds = useSelector(state => state.favorite.ids)
    const onLoginPress = useCallback(() => {
        navigation.navigate('Login');
    }, [navigation])

    const onSearchPress = useCallback(() => {
        navigation.navigate(trans("apps.search", texts))
    }, [navigation])

    const conposedHeaderStyle = { display: token || favoriteIds.length == 0 ? 'none' : 'flex' };
    return <Fragment>
        <View style={StyleSheet.compose(FStyles.header, conposedHeaderStyle)}>
            <PlainText style={FStyles.header_text} text={trans("apps.favourites.signintosync.message", texts)}></PlainText>
            <View style={FStyles.login_button_container}>
                <FullWidthButton style={FStyles.login_button} isPrimary={true} text={trans("apps.action.login", texts)} onPress={onLoginPress}></FullWidthButton>
            </View>
        </View>
        <AdvertList
            itemType={ItemType.FAT}
            listType={ListType.FAVORITE}
            itemClass="non-material-bordered"
            lng={"de"}
            navigation={navigation}
            nocontent={{
                title: trans("apps.nofavorites", texts),
                description: trans("apps.nofavorites.description", texts),
                buttonText: trans("apps.action.search", texts),
                onButtonClick: onSearchPress
            }} />
    </Fragment>
}