
import React, { useCallback, useState, Fragment } from "react";
import { FocusableInput } from "../../sharedcomponents/focusableInput/focusableInput";
import { trans } from "../../utils/common";
import { useSelector, useDispatch } from "react-redux";
import { Text, View, Alert } from "react-native";
import LowerCasedLink from "../../sharedcomponents/button/lowerCasedLink";
import { LStyles } from "./lStyles";
import UpperCasedLink from "../../sharedcomponents/button/upperCasedLink";
import FullWidthButton from "../../sharedcomponents/button/fullWidthButton";
import PlainText from "../../sharedcomponents/plainText/plainText";
import { PasswordInput } from "../../sharedcomponents/focusableInput/passwordInput";
import { login, loginAction } from "../../redux/actions/actionsAuthentication";
import { IOnError } from "../../redux/actions/action.d";
import { fLog } from "../../utils/utils";
import Title from "../../sharedcomponents/title/title";
export interface LoginFragmentProps {
    showLoginTitle?: boolean,
}
export function LoginFragment(props: LoginFragmentProps): JSX.Element {
    const { showLoginTitle } = props;
    const [email, setEmail] = useState("haihaihai@gmail.com");
    const [password, setPassword] = useState("123");
    const texts = useSelector(state => state.localization.texts)
    const dispatch = useDispatch();
    const TAG = "login"
    const onLoginPress = useCallback(() => {
        let onError: IOnError = function (error: string) {
            fLog(TAG, 'onError = ', error);
            Alert.alert(
                trans("apps.login", texts),
                trans("apps.message.loginfail", texts),
                [
                    // {
                    //     text: "Cancel",
                    //     onPress: () => {},
                    //     style: "cancel"
                    // },
                    { text: trans("apps.action.ok", texts), onPress: () => { } }
                ]
            );
        }
        let loginRequest = { email: email, password: password }
        dispatch(loginAction(loginRequest, onError))
    }, [email, password])

    return <View style={{ padding: 20, backgroundColor: 'white', flex: 1 }}>
        {showLoginTitle && <View>
            <Title style={LStyles.need_login_title} text={trans('apps.needlogin.title', texts)}></Title>
            <PlainText style={LStyles.need_login_description} text={trans('apps.needlogin', texts)}></PlainText>
            </View>}
        <FocusableInput
            value={email}
            onValueChange={setEmail}
            label={trans("apps.username", texts)}
            style={LStyles.input_container} />
        <PasswordInput
            value={password}
            onValueChange={setPassword}
            label={trans("apps.password", texts)}
            style={LStyles.input_container} />
        <UpperCasedLink
            style={LStyles.forget_password}
            text={trans("apps.action.retrievepassword", texts)}
            onPress={() => { }} />
        <FullWidthButton
            style={LStyles.login_button}
            text={trans("apps.action.login", texts)}
            onPress={onLoginPress}
            isPrimary={true} />
        <PlainText text={trans("apps.message.noaccount", texts)} style={LStyles.is_new} />
        <UpperCasedLink
            style={LStyles.register}
            text={trans("apps.action.createaccount", texts)}
            onPress={() => { }} />
    </View>
}