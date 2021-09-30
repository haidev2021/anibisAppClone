

import React, { useState, useEffect, useCallback } from 'react';
import {
    StyleSheet, Platform,
} from 'react-native';

export const STSStyles = StyleSheet.create({
    sort_picker: {
        width: '100%',
        marginTop: 20,
        paddingHorizontal: Platform.OS == 'ios' ? 0 : 40,
    },
});