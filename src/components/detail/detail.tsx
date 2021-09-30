
import React from 'react';
import {
    ScrollView,
    View, 
} from 'react-native';
import { TXBaseAttributes, IXBaseAdvert, TLanguage } from '../../utils/xbaseInterface.d';
import DetailBriefInfo from './detailBriefInfo';
import { Styles } from './styles';
import DetailAttributeList from './detailAttributeList';
import DetailDescription from './detailDescription';
import DetailContact from './detailContact';
import DetailAddress from './detailAddress';
import DetailUserVerification from './detailUserVerification';
import DetailAbuseReport from './detailAbusReport';
import { useSelector } from 'react-redux';

export interface IDetailProps {
    reusedXBaseAttributes?: TXBaseAttributes;
    detail: IXBaseAdvert;
    lng?: TLanguage;
    isInsertionPreview?: boolean;
    navigation: any;
}
export default function Detail(props: IDetailProps) {
    const { reusedXBaseAttributes, detail, lng, isInsertionPreview, navigation} = props;
    const texts = useSelector(state => state.localization.texts)
    return <ScrollView style={Styles.scroll_view}>
        {/* <Text>{JSON.stringify(detail)}</Text> */}
        <DetailBriefInfo advert={detail as IXBaseAdvert} lng={lng} texts={texts}></DetailBriefInfo>
        <View style={Styles.separator} />
        <DetailAttributeList advert={detail as IXBaseAdvert} lng={lng} texts={texts}></DetailAttributeList>
        <View style={Styles.separator} />
        <DetailDescription advert={detail as IXBaseAdvert} lng={lng} texts={texts}></DetailDescription>
        <View style={Styles.separator} />
        <DetailAddress advert={detail as IXBaseAdvert} lng={lng} texts={texts}></DetailAddress>
        <View style={Styles.separator} />
        <DetailContact advert={detail as IXBaseAdvert} lng={lng} texts={texts} navigation={navigation}></DetailContact>
        <View style={Styles.separator} />
        <DetailUserVerification advert={detail as IXBaseAdvert} lng={lng} texts={texts}></DetailUserVerification>
        <View style={Styles.separator} />
        <DetailAbuseReport advert={detail as IXBaseAdvert} lng={lng} texts={texts}></DetailAbuseReport>
    </ScrollView>
}