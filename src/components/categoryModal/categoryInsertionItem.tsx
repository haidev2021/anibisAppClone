
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

import { Styles } from './styles';

export interface ICategorySearchCountItem {
    name: string,
    searchCount?: number,
    isParent: boolean,
    isSelected: boolean,
    onPress: () => void,
}
export function CategorySearchCountItem(props: ICategorySearchCountItem) {
    const { name, searchCount, isParent, isSelected, onPress } = props
    return <View>
        <Text style={isParent ? Styles.parent_category : Styles.sub_category} onPress={onPress}>
            <Text>
                {name}
                <Text style={Styles.search_count}>{searchCount}</Text>
            </Text>
            {isSelected && <Text style={Styles.category_selected_icon} />}
        </Text>
    </View>
}