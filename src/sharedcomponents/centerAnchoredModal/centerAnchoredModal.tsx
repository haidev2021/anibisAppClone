
import React, { useContext } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View, Image, Button, ActivityIndicator, Modal, TouchableOpacity,
} from 'react-native';
import { onDummyClick, trans } from '../../utils/common';
import { Styles } from './styles';
import { useSelector } from 'react-redux';
import { ic_x_white } from '../../utils/assetHelper';
// import { RootContext } from '../../../root';
// import { NullableIRootContext } from '../../../utils/xbaseInterface.d';
export interface ICenterAnchoredModal {
    isOpen: boolean;
    onXClick: (params: any) => void;
    onBottomButtonClick?: (params: any) => void;
    bottomButtonText?: string;
    hideBottomButton?: boolean;
    children?: any;
    className?: string;
    smallMarginBottom?: boolean;
    title?: string;
}
export default function CenterAnchoredModal(props: ICenterAnchoredModal) {
    let { isOpen, onXClick, onBottomButtonClick, bottomButtonText, hideBottomButton, children, className, smallMarginBottom, title} = props;
    // const rootContext = useContext(RootContext) as NullableIRootContext;

    // useEffect(() => {
    //     console.log('useEffect pageYOffset set', window.pageYOffset)
    //     if (isOpen && rootContext.usedPageYOffset[0] !== null)
    //         rootContext.usedPageYOffset[1](window.pageYOffset);
    //     rootContext.usedDisableScrollY[1](isOpen);
    // }, [isOpen]);

    const texts = useSelector(state => state.localization.texts);
    onBottomButtonClick = onBottomButtonClick || onXClick;
    bottomButtonText = bottomButtonText || trans("apps.action.done", texts);
    className = "modal_container " + className;

    return <Modal style={Styles.modal_container} visible={isOpen} animationType="slide">
        <SafeAreaView style={Styles.modal_container}>
            <View style={Styles.modal_content_center_anchored}>

                <View style={Styles.modal_header}>
                    {/* <Button style={Styles.simple_link_x_mark} onPress={onXClick}></Button> */}
                    <TouchableOpacity style={Styles.close_icon_touch} onPress={onXClick}>
                        <Image source={ic_x_white} style={Styles.closeIcon} />
                    </TouchableOpacity>
                    <Text style={Styles.modal_title}>{title}</Text>
                </View >

                <ScrollView>
                    <View style={hideBottomButton === true ? Styles.modal_chunk_hide_bottom_button : Styles.modal_chunk}>
                        {/* <Text>{JSON.stringify(children)}</Text> */}
                        {children}
                    </View>
                </ScrollView>

                {!hideBottomButton && <View style={Styles.modal_footer}>
                    <TouchableOpacity style={Styles.modal_footer_button} onPress={onBottomButtonClick}>
                        <Text style={Styles.button_text}>{bottomButtonText}</Text>
                    </TouchableOpacity>
                </View >}
            </View >
        </SafeAreaView>
    </Modal >;
}