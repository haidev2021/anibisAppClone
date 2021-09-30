import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { RootStackParamList } from "../../../Type";
import { View, Image } from "react-native";
import React, { useState, useEffect, useCallback } from 'react';
import { AccountFragment } from "../../components/login/accountFragment";
import { trans } from "../../utils/common";
import Title from "../../sharedcomponents/title/title";
import { useSelector } from "react-redux";
import PlainText from "../../sharedcomponents/plainText/plainText";
import { FocusableInput } from "../../sharedcomponents/focusableInput/focusableInput";
import FullWidthButton from "../../sharedcomponents/button/fullWidthButton";
import { ic_rated_star, ic_unrated_star } from "../../utils/assetHelper";
import { FStyles } from "./fStyles";

type Props = BottomTabScreenProps<RootStackParamList, 'Feedback'>;
export default function Feedback({ navigation }: Props) {
    const texts = useSelector(state => state.localization.texts);
    const [email, setEmail] = useState("")
    const [feedback, setFeedback] = useState("")
    const onSendPress = useCallback(
        () => {
        },
        [])
    return <View style={FStyles.feedback_screen}>
        <Title style={FStyles.title} text={trans("apps.rating", texts)}></Title>
        <PlainText style={FStyles.description} text={trans("apps.rating.description", texts)}></PlainText>
        <View style={FStyles.stars} >
            <Image style={FStyles.star} source={ic_rated_star} />
            <Image style={FStyles.star} source={ic_rated_star} />
            <Image style={FStyles.star} source={ic_rated_star} />
            <Image style={FStyles.star} source={ic_unrated_star} />
            <Image style={FStyles.star} source={ic_unrated_star} />
        </View>
        <FocusableInput style={FStyles.email} value={email} onValueChange={setEmail} label={trans("apps.email", texts)}></FocusableInput>
        <FocusableInput style={FStyles.feedback} value={feedback} onValueChange={setFeedback} label={trans("apps.yourfeedback", texts)}></FocusableInput>
        <FullWidthButton style={FStyles.send} text={trans("apps.action.send", texts)} onPress={onSendPress} isPrimary={true}></FullWidthButton>
    </View>
}