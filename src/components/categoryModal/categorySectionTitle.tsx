import React, { Component, Fragment, useState, useEffect, useLayoutEffect, useRef, useCallback, useContext, useMemo } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View, Image, Button, ActivityIndicator, Modal, TouchableOpacity
} from 'react-native';

import { Styles } from './styles';

export interface ICategorySectionTitle {
    name: string,
    actionText?: string,
    onActionPress: () => void,
}
export function CategorySectionTitle(props: ICategorySectionTitle) {
    const { name, actionText, onActionPress} = props
    return <View style={Styles.category_section_title}>
        <Text style={Styles.section_title}> {name} </Text>
        <Text style={Styles.section_action_text} onPress={onActionPress}>{actionText}</Text>
    </View>
}