import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { RootStackParamList } from "../../../Type";
import { View } from "react-native";
import { LoginFragment } from "../../components/login/loginFragment";
import React, { useState, useEffect, useCallback } from 'react';
import { AccountFragment } from "../../components/login/accountFragment";
import { useSelector } from "react-redux";

type Props = BottomTabScreenProps<RootStackParamList, 'Login'>;
export default function Login({ navigation }: Props) {
    const token = useSelector(state => state.authentication.token)
    return token ? <AccountFragment/>: <LoginFragment/>
}