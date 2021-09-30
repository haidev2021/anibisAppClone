import React, { Component, Fragment, useState, useEffect, useLayoutEffect, useRef, useCallback, useContext, useMemo } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View, Image, Button, ActivityIndicator, Modal,
} from 'react-native';

import { TextSearchStyles } from './textSearchStyles';

export interface ICategorySectionTitle {
    name: string,
    actionText?: string,
    onActionPress: () => void,
}
export function TextHistoryHeader(props: ICategorySectionTitle) {
    const { name, actionText, onActionPress} = props
    return <View style={TextSearchStyles.category_section_title}>
        <Text style={TextSearchStyles.section_title}> {name} </Text>
        <Text style={TextSearchStyles.section_action_text} onPress={onActionPress}>{actionText}</Text>
    </View>
}