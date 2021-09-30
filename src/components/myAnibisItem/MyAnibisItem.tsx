import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { Fragment } from "react";
import { MAIStyles } from "./maiStyles";

export interface IMyAnibisItem {
    icon: any;
    label: string;
    count?: number;
    onPress: () => void;
    useTintColor?: boolean
}
export default function MyAnibisItem(props: IMyAnibisItem): JSX.Element {
    const { icon, label, count, onPress, useTintColor} = props;
    return <View style={MAIStyles.container}> 
        <TouchableOpacity style={MAIStyles.touch} onPress={onPress}>
            <Image source={icon} style={useTintColor? MAIStyles.tint_icon : MAIStyles.icon}></Image>
            <Text style={MAIStyles.label}>{label}</Text>
            <Text style={StyleSheet.compose(MAIStyles.count, { display: isNaN(count) ? 'none' : 'flex' })}>{count}</Text>
        </TouchableOpacity>
        <View style={MAIStyles.separator}></View>
    </View>
}