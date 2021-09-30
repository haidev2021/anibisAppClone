import * as React from 'react';
import { RootStackParamList } from '../../../Type';
import { StackScreenProps } from '@react-navigation/stack';
import Detail from '../../components/detail/detail';
export default function SingleDetail({ route, navigation }: StackScreenProps<RootStackParamList, 'SingleDetail'>) {
    const { detail } = route.params;
    return <Detail detail={detail} navigation={navigation}/>
}