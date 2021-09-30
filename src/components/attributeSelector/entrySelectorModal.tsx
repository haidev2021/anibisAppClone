
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
import { useSelector } from 'react-redux';
import { Styles } from './styles';
import { EntrySelectorItem } from './entrySelectorItem';
import CenterAnchoredModal from '../../sharedcomponents/centerAnchoredModal/centerAnchoredModal';
export interface IEntry {
    value: string | number;
    label: string;
}
export interface IEntrySelectorModal {
    value: string;
    isOpen: boolean;
    entries: IEntry[];
    onXClick: () => void;
    onValueChange: (value: string | number | undefined) => void; 
    title: string;
}

export default function EntrySelectorModal(props: IEntrySelectorModal) {
    const { value, isOpen, onXClick, entries, onValueChange, title} = props;
    const onSelect = useCallback((value: string | number | undefined) => {
        onValueChange(value);
        onXClick();
    }, [onValueChange, onXClick]);

    return <CenterAnchoredModal isOpen={isOpen} onXClick={onXClick} title={title}>
        <Fragment>
            {entries.map((entry, index) => {
                return <EntrySelectorItem key={entry.label} value={entry.value} label={entry.label} onSelect={onSelect}
                        isSelected={value == entry.value}/>
            })}
        </Fragment>
    </CenterAnchoredModal>
}