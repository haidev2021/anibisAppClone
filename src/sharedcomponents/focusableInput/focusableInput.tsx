import { FIStyles } from "./fiStyles";
import { accentColor } from "../../utils/xbaseInterface.d";
import { FloatingLabelInput } from "react-native-floating-label-input";
import React, { useCallback, useState } from "react";
import { View } from "react-native";

export interface FocusableInputProps {
    label: string;
    value: string;
    onValueChange: (value: string) => void
    style?: any;
    editable?: boolean;
}
export function FocusableInput(props: FocusableInputProps): JSX.Element {
    const { label, value, onValueChange, style, editable} = props;
    const [isFocus, setIsFocus] = useState(false);
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
            editable={editable}
        /></View>
}