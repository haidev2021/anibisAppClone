
import React, { useCallback, useState, Fragment } from "react";
import { FocusableInput } from "../../sharedcomponents/focusableInput/focusableInput";
import { trans } from "../../utils/common";
import { useSelector, useDispatch } from "react-redux";
import { Text, View } from "react-native";
import LowerCasedLink from "../../sharedcomponents/button/lowerCasedLink";
import { LStyles } from "./lStyles";
import UpperCasedLink from "../../sharedcomponents/button/upperCasedLink";
import FullWidthButton from "../../sharedcomponents/button/fullWidthButton";
import PlainText from "../../sharedcomponents/plainText/plainText";
import Title from "../../sharedcomponents/title/title";
import { logoutAction } from "../../redux/actions/actionsAuthentication";
export interface AccountFragmentProps {
}
export function AccountFragment(props: AccountFragmentProps): JSX.Element {
    const texts = useSelector(state => state.localization.texts)
    const email = useSelector(state => state.authentication.email)
    const dispatch = useDispatch();
    const onUserSettingPress = useCallback(() => {
    }, [])
    const onChangePasswordPress = useCallback(() => {
    }, [])
    const onLogoutPress = useCallback(() => {
        dispatch(logoutAction())
    }, [])
    return <View style={{padding: 20, backgroundColor: 'white', flex: 1}}>
        <Title style={LStyles.signed_in_as} text={trans("apps.account.signedinas", texts)} />
        <PlainText style={LStyles.user_name} text={"" + email}></PlainText>
        <UpperCasedLink style={LStyles.user_setting} text={trans("apps.account.usersetting", texts)} isWebsiteLink={true} onPress={onUserSettingPress}></UpperCasedLink>
        <UpperCasedLink style={LStyles.change_password} text={trans("apps.action.changepassword", texts)} isWebsiteLink={true} onPress={onChangePasswordPress}></UpperCasedLink>
        <FullWidthButton
            style={LStyles.login_button}
            text={trans("apps.action.logout", texts)}
            onPress={onLogoutPress} />
    </View>
}