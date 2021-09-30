import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View, Image, Button, TouchableOpacity,
} from 'react-native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { accentColor } from '../../utils/xbaseInterface.d';
import { useSelector } from 'react-redux';
import { trans } from '../../utils/common';

export interface IShortcutCategory {
    icon: any;
    name: string;
    onPress: any;
}

export default function ShortcutCategory(props: IShortcutCategory): JSX.Element {
    const texts = useSelector(state => state.localization.texts)
    return <TouchableOpacity
        style={styles.container} onPress={props.onPress}>
        <Image
            source={props.icon}
            style={styles.icon}
        />
        <View style={styles.nameContainer}>
            <Text style={styles.name}>
                {trans(props.name, texts)}
            </Text>
        </View>
    </TouchableOpacity>
}

const styles = StyleSheet.create({
    container: {
        width: 66,
        height: 120,
        margin: 8
    },
    icon: {
        flex: 3,
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    nameContainer: {
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        paddingTop: 10,
    },
    name: {
        fontSize: 11,
        color: accentColor,
        textAlign: 'center'
    },
    logoText: {
        width: 225,
        height: 42,
        marginTop: 30,
    },
    termEdit: {
        width: '100%',
        marginTop: 30,
        elevation: 2,
        backgroundColor: 'white',
        padding: 10,
    },
});