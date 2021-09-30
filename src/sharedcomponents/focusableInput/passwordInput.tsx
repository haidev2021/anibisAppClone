import { FIStyles } from "./fiStyles";
import { accentColor } from "../../utils/xbaseInterface.d";
import { FloatingLabelInput } from "react-native-floating-label-input";
import React, { useCallback, useState } from "react";
import { View, Text, Image } from "react-native";
import { ic_show_password, ic_hide_password } from "../../utils/assetHelper";

export interface PasswordInputProps {
    label: string;
    value: string;
    onValueChange: (value: string) => void
    style?: any;
}
export function PasswordInput(props: PasswordInputProps): JSX.Element {
    const { label, value, onValueChange, style } = props;
    const [isFocus, setIsFocus] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const onFocus = useCallback(() => {
        setIsFocus(true);
    }, [setIsFocus])
    const onBlur = useCallback(() => {
        setIsFocus(false);
    }, [setIsFocus])
    return <View style={style}>
        <FloatingLabelInput
            label={label}
            staticLabel={true}
            value={value}
            isPassword
            togglePassword={showPassword}
            onChangeText={onValueChange}
            containerStyles={isFocus ? FIStyles.containerStyleFocus : FIStyles.containerStyleBlur}
            customLabelStyles={{
                colorFocused: accentColor,
                fontSizeFocused: 13,
            }}
            labelStyles={FIStyles.labelStyles}
            inputStyles={FIStyles.inputStyles}
            onFocus={onFocus}
            onBlur={onBlur}
            customShowPasswordComponent={<Image source={ic_hide_password} style={FIStyles.eye_icon}></Image>}
            customHidePasswordComponent={<Image source={ic_show_password} style={FIStyles.eye_icon}></Image>}
        /></View>
}