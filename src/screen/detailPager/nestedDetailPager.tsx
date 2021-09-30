import * as React from 'react';
import { RootStackParamList } from '../../../Type';
import { StackScreenProps } from '@react-navigation/stack';
import DetailPagerFragment from './detailPagerFragment';
export default function NestedDetailPager({ route, navigation }: StackScreenProps<RootStackParamList, 'NestedDetailPager'>) {
    const { firstItem, listType } = route.params;
    return <DetailPagerFragment firstItem={firstItem} listType={listType} navigation={navigation}/>
}