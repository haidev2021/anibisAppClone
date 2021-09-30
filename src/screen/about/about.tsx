import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { RootStackParamList } from "../../../Type";
import { View, Text, Image } from "react-native";
import React, { useState, useEffect, useCallback } from 'react';
import { AccountFragment } from "../../components/login/accountFragment";
import { AStyles } from "./aStyles";
import LowerCasedLink from "../../sharedcomponents/button/lowerCasedLink";
import { trans } from "../../utils/common";
import { useSelector } from "react-redux";
import { ic_ext_link } from "../../utils/assetHelper";
import { graySeparator } from "../../utils/xbaseInterface.d";
import PlainText from "../../sharedcomponents/plainText/plainText";

type Props = BottomTabScreenProps<RootStackParamList, 'About'>;
interface IAboutItem {
    label: string;
    link: string;
}
function AboutItem(props: IAboutItem): JSX.Element {
    const { label, link } = props;
    return <View style={AStyles.about_item}>
        <LowerCasedLink style={AStyles.link} text={label} onPress={() => { }}></LowerCasedLink>
        <Image style={AStyles.link_icon} source={ic_ext_link}></Image>
    </View>
}
export default function About({ navigation }: Props) {
    const texts = useSelector(state => state.localization.texts)
    return <View style={AStyles.about_screen}>
        <AboutItem label={trans("apps.conditions", texts)} link=""></AboutItem>
        <AboutItem label={trans("apps.tariff", texts)} link=""></AboutItem>
        <AboutItem label={trans("apps.safety", texts)} link=""></AboutItem>
        <PlainText style={AStyles.goto_web} text={trans("apps.message.gotoweb", texts)}></PlainText>
    </View>
}