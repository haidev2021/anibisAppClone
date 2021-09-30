

import React, { Component, Fragment, useState, useEffect, useLayoutEffect, useRef, useCallback, useContext, useMemo } from 'react';
import { trans, formatString } from '../../../utils/common';
import { IXBaseAdvert, accentColor, XBasePictureS } from '../../../utils/xbaseInterface.d';
import { useSelector, useDispatch } from 'react-redux';
import { View, Image, Dimensions, Text, TouchableOpacity, Alert } from 'react-native';
import { img_add_image, ic_edit_image, ic_bottom_sheet_delete_black, ic_bottom_sheet_set_main_pic, ic_bottom_sheet_photo_camera_black, ic_bottom_sheet_photo_library_black } from '../../../utils/assetHelper';
import FullWidthButton from '../../../sharedcomponents/button/fullWidthButton';
import { fLog } from '../../../utils/utils';
import { SERVER, IMAGE_UPLOAD_API } from '../../../utils/network';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { PSStyles } from './psStyles';
import FastImage from 'react-native-fast-image';
import { Carousel } from 'react-native-snap-carousel';
import * as Progress from 'react-native-progress';
import PlainText from '../../../sharedcomponents/plainText/plainText';
import { uploadImageAction } from '../../../redux/actions/actionUploadImage';
import { IUploadFileInfo } from '../../../redux/actions/action.d';
import RBSheet from 'react-native-raw-bottom-sheet';
// var RNFS = require('react-native-fs');
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

const DELAY_FOR_BOTTOM_SHEET_TO_CLOSE = 500;

let counter = 0;
function getNewTimeMillis(debugInfo?: string) {
    fLog("image", 'debugInfo = ', debugInfo, "counter = ", counter);
    return counter++;
}

export interface IPhotoSelector {
    editPhotos?: XBasePictureS[] | null;
    onImageChange: (images: XBasePictureS[]) => void;
}
const initStateCb = () => ({
    pos: getNewTimeMillis(),
    file: null,
    uploadPercent: 0,
    blogPhotosThumbnail: null,
    blogPhotosResized: null
});

export default function PhotoSelector(props: IPhotoSelector): JSX.Element {
    const { editPhotos, onImageChange } = props;
    const TAG = "image"
    const carouselRef = useRef(null);
    const texts = useSelector(state => state.localization.texts);
    const editRBSheetRef = useRef();
    const mediaTypeRBSheetRef = useRef();
    const imageInfoRef = useRef();
    const dispatch = useDispatch();
    const photoUploadStateHandlers =
        [useState(initStateCb), useState(initStateCb), useState(initStateCb), useState(initStateCb), useState(initStateCb),
        useState(initStateCb), useState(initStateCb), useState(initStateCb), useState(initStateCb), useState(initStateCb)];

    const [activeImgIndex, setActiveImgIndex] = useState(0);
    const sortedStateHandlers = useMemo(function () {
        let result = Array.from(photoUploadStateHandlers);
        console.log('result.length', result.length)
        result.sort(function (a, b) {
            return a[0].pos - b[0].pos;
        })
        return result;
    }, [photoUploadStateHandlers]);

    const [imageChangleFlag, setImageChangeFlag] = useState(false);

    useEffect(() => {
        if (imageChangleFlag) {
            onImageChange(Array.from(sortedStateHandlers, handler => ({
                blogPhotosThumbnail: handler[0].blogPhotosThumbnail,
                blogPhotosResized: handler[0].blogPhotosResized
            })).filter(imgSet => imgSet.blogPhotosResized != null) as XBasePictureS[])
            setImageChangeFlag(false);
        }
    }, [imageChangleFlag])

    useEffect(() => {
        uploadPhoto(0);
    }, [photoUploadStateHandlers[0][0].file]);

    useEffect(() => {
        uploadPhoto(1);
    }, [photoUploadStateHandlers[1][0].file]);

    useEffect(() => {
        uploadPhoto(2);
    }, [photoUploadStateHandlers[2][0].file]);

    useEffect(() => {
        uploadPhoto(3);
    }, [photoUploadStateHandlers[3][0].file]);

    useEffect(() => {
        uploadPhoto(4);
    }, [photoUploadStateHandlers[4][0].file]);

    useEffect(() => {
        uploadPhoto(5);
    }, [photoUploadStateHandlers[5][0].file]);

    useEffect(() => {
        uploadPhoto(6);
    }, [photoUploadStateHandlers[6][0].file]);

    useEffect(() => {
        uploadPhoto(7);
    }, [photoUploadStateHandlers[7][0].file]);

    useEffect(() => {
        uploadPhoto(8);
    }, [photoUploadStateHandlers[8][0].file]);

    useEffect(() => {
        uploadPhoto(9);
    }, [photoUploadStateHandlers[9][0].file]);

    useEffect(() => {
        if (editPhotos) {
            fLog(TAG, 'editPhotos = ', editPhotos);
            editPhotos.map((picture, index) => {
                const setState = photoUploadStateHandlers[index][1]
                setState(
                    { pos: getNewTimeMillis("editPhotos"), file: null, blogPhotosThumbnail: picture.blogPhotosThumbnail, blogPhotosResized: picture.blogPhotosResized, uploadPercent: 100 }
                );
            });
        }
    }, [editPhotos]);

    const uploadNextImage = useCallback(function () {
        console.log('handleSelectedImages files', imageInfoRef.current)
        let handler = photoUploadStateHandlers.find(slot => (slot[0].file === null))
        if (handler && imageInfoRef.current && imageInfoRef.current.length > 0) {
            const setState = handler[1];
            setState(oldSlot => ({ ...oldSlot, pos: getNewTimeMillis("handleSelectedImages"), file: imageInfoRef.current[0] }));
            imageInfoRef.current.splice(0, 1);
            setTimeout(() => {
                fLog(TAG, 'handleSelectedImages carouselData.length = ', carouselData.length);
                const newLength = carouselData.length + 1;
                if (carouselRef.current)
                    carouselRef.current.snapToItem(newLength - 1)
                setActiveImgIndex(newLength - 1)
            }, 0)
        }
    }, [sortedStateHandlers, carouselData]);

    const uploadPhoto = useCallback(function (index) {
        let uploadHandler = photoUploadStateHandlers[index];
        let state = uploadHandler[0];
        const setStateFunction = uploadHandler[1];
        if (state.file != null) {
            let uploadBegin = (response: any) => {
                var jobId = response.jobId;
            };
            let uploadProgress = (response: any) => {
                var percentage = Math.floor((response.totalBytesSent / response.totalBytesExpectedToSend) * 100);
                setStateFunction((state) => ({ ...state, uploadPercent: percentage }));
            };
            let onSuccess = (body: any) => {
                if (body.blogPhotosThumbnail) {
                    const image = {
                        blogPhotosThumbnail: body.blogPhotosThumbnail,
                        blogPhotosResized: body.blogPhotosResized
                    };
                    setStateFunction((state) => ({ ...state, ...image }));
                    setImageChangeFlag(true);
                }
                if (imageInfoRef.current.length > 0) {
                    uploadNextImage();
                }
            }
            let onError = (error: any) => {
                fLog("image", 'error = ', error);
                Alert.alert(
                    "",
                    trans("apps.message.otherfail", texts),
                    [{ text: trans("apps.action.ok", texts), onPress: () => { } }]
                );
                setStateFunction((state) => {
                    return { ...state, file: null }
                });
            }
            dispatch(uploadImageAction({
                file: state.file,
                uploadBeginCb: uploadBegin,
                uploadProgressCb: uploadProgress,
                onSuccess: onSuccess,
                onError: onError,
            }))
        }
    }, [photoUploadStateHandlers]);

    const carouselData = useMemo(() => {
        // let hasFileArray = Array.from(photoUploadStateHandlers, handle => handle[0]).filter(item => item.file)
        let hasFileArray = photoUploadStateHandlers.filter(handler => {
            const state = handler[0]
            return state.file != null || state.blogPhotosResized != null
        })
        hasFileArray.sort(function (a, b) {
            const stateA = a[0]
            const stateB = b[0]
            return stateA.pos - stateB.pos;
        })
        fLog(TAG, 'useMemo hasFileArray.length = ', hasFileArray.length);
        return hasFileArray;
    }, [photoUploadStateHandlers])

    // fLog(TAG, 'render carouselData.length = ', carouselData.length);

    const onAddImage = useCallback((isCamera: boolean) => {
        const method = isCamera ? launchCamera : launchImageLibrary;
        const option = isCamera ? { mediaType: 'photo' } : { mediaType: 'photo', selectionLimit: 10 - carouselData.length };
        // launchImageLibrary({ mediaType: 'photo', selectionLimit: 10 - carouselData.length }, (response) => {
        method(option, (response) => {
            if (response.assets) {
                var filesInfos = Array.from(response.assets, asset => ({
                    name: 'selectedPhotoBinary',
                    filename: asset.fileName,
                    filepath: asset.uri.replace("file://", ""),
                    filetype: asset.type,
                }))
                // handleSelectedImage(filesInfo);
                imageInfoRef.current = filesInfos;
                uploadNextImage();
            }
        })

    }, [uploadNextImage, carouselData])


    function renderItem({ item, index }: any) {
        const state = item[0];
        fLog(TAG, 'renderItem state = ', state);
        return (
            <View style={{ width: viewportWidth, height: viewportWidth * 3 / 4, alignItems: 'center', justifyContent: 'center' }}>
                <FastImage
                    style={{ width: viewportWidth, height: viewportWidth * 3 / 4, display: state.uploadPercent >= 99 ? 'flex' : 'none' }}
                    source={{
                        uri: SERVER + "/blogPhotosResized/" + state.blogPhotosResized,
                        priority: FastImage.priority.normal,
                    }}
                    resizeMode={FastImage.resizeMode.cover}
                />
                <Progress.Bar style={{ display: state.uploadPercent >= 99 ? 'none' : 'flex' }}
                    progress={state.uploadPercent / 100} width={100} color={accentColor} />
            </View>
        )
    }

    const buttonText = useMemo(() => {
        return carouselData.length == 0 ? trans('apps.action.addimage', texts) :
            formatString(trans('apps.action.addmoreimages', texts), 10 - carouselData.length)
    }, [carouselData.length])

    const onSnapToItem = useCallback((index) => {
        setActiveImgIndex(index)
    }, [setActiveImgIndex])

    const deleteImageAtIndex = useCallback((index) => {
        fLog(TAG, 'deleteImageAtIndex index = ', index, "carouselData.length = ", carouselData.length);
        // let handler = photoUploadStateHandlers.find(handler => handler[0].pos == carouselData[index].pos)
        let [state, setStateFunction] = carouselData[index];
        setStateFunction(state => ({
            ...state, file: null, uploadPercent: 0, blogPhotosThumbnail: null, blogPhotosResized: null
        }))
        setImageChangeFlag(true);
        if (index == carouselData.length - 1) {
            // setTimeout(() => {
            if (carouselRef.current)
                carouselRef.current.snapToItem(index - 1)
            // setActiveImgIndex(index => index - 1)
            // }, 100)
        }

    }, [photoUploadStateHandlers, carouselData])

    const makeImageFirst = useCallback((index) => {
        let handler0 = carouselData[0]
        let handler1 = carouselData[1]
        let handlerIndex = carouselData[index]
        let state0 = handler0[0];
        let state1 = handler1[0];
        let pos0 = state0.pos;
        let pos1 = state1.pos;
        let setStateFunction0 = handler0[1];
        let setStateFunctionIndex = handlerIndex[1];

        setStateFunction0(state => ({
            ...state, pos: (pos0 + pos1) / 2
        }))
        setStateFunctionIndex(state => ({
            ...state, pos: pos0
        }))
        setImageChangeFlag(true);
        setTimeout(() => {
            if (carouselRef.current)
                carouselRef.current.snapToItem(0)
            setActiveImgIndex(0)
        }, 100)

    }, [photoUploadStateHandlers, carouselData])

    const onEditImagePress = useCallback(() => {
        if (editRBSheetRef.current)
            editRBSheetRef.current.open()
    }, [editRBSheetRef])

    const onMakeImageFirstPress = useCallback(() => {
        makeImageFirst(activeImgIndex);
        editRBSheetRef.current.close()
    }, [makeImageFirst, activeImgIndex])

    const onDeleteImagePress = useCallback(() => {
        deleteImageAtIndex(activeImgIndex);
        editRBSheetRef.current.close()
    }, [deleteImageAtIndex, activeImgIndex])

    const onCameraPress = useCallback(() => {
        if (mediaTypeRBSheetRef.current)
            mediaTypeRBSheetRef.current.close()
        setTimeout(() => {
            onAddImage(true);
        }, DELAY_FOR_BOTTOM_SHEET_TO_CLOSE)
    }, [onAddImage])

    const onAlbumPress = useCallback(() => {
        if (mediaTypeRBSheetRef.current)
            mediaTypeRBSheetRef.current.close()
        setTimeout(() => {
            onAddImage(false);
        }, DELAY_FOR_BOTTOM_SHEET_TO_CLOSE)
    }, [onAddImage])

    const onAddImagePress = useCallback(() => {
        if (mediaTypeRBSheetRef.current)
            mediaTypeRBSheetRef.current.open()
    }, [mediaTypeRBSheetRef])

    return <View style={PSStyles.image_gallery_container}>
        {carouselData.length > 0 && <Fragment>
            <Carousel
                nestedScrollEnabled={true}
                layout={"default"}
                ref={carouselRef}
                data={carouselData}
                sliderWidth={viewportWidth}
                itemWidth={viewportWidth}
                itemHeight={viewportWidth * 3 / 4}
                slideStyle={{ width: viewportWidth, height: viewportWidth * 3 / 4 }}
                sliderHeight={viewportWidth * 3 / 4}
                renderItem={renderItem}
                inactiveSlideScale={1}
                inactiveSlideOpacity={1}
                onSnapToItem={onSnapToItem}
            />
            <View style={PSStyles.index_indicator}>
                <PlainText style={PSStyles.index_indicator_text} text={(activeImgIndex + 1) + " / " + carouselData.length}></PlainText>
            </View>

            <TouchableOpacity style={PSStyles.edit_touch} onPress={onEditImagePress}>
                <PlainText style={PSStyles.edit_touch_text} text={trans("apps.action.editpicture", texts)}></PlainText>
                <Image source={ic_edit_image} style={PSStyles.ic_edit_image}></Image>
            </TouchableOpacity>
        </Fragment>}

        {carouselData.length == 0 && <Image source={img_add_image} style={PSStyles.img_add_image}></Image>}
        <FullWidthButton style={PSStyles.button_add_image} text={buttonText} onPress={onAddImagePress} isRoundCorner={true}></FullWidthButton>
        <RBSheet
            ref={editRBSheetRef}
            closeOnDragDown={true}
            closeOnPressMask={true}
            customStyles={{
                wrapper: {
                    backgroundColor: "#000000aa"
                },
                draggableIcon: {
                    backgroundColor: "#000"
                }
            }}
        >
            <View style={PSStyles.bottom_sheet}>
                <PlainText style={PSStyles.edit_picture_title} text={trans("apps.action.editpicture", texts)}></PlainText>
                <TouchableOpacity style={PSStyles.bottom_sheet_menu} onPress={onMakeImageFirstPress}>
                    <Image source={ic_bottom_sheet_set_main_pic} style={PSStyles.ic_bottom_sheet_set_main_pic}></Image>
                    <PlainText text={trans("apps.insertion.image.makemain", texts)}></PlainText>
                </TouchableOpacity>

                <TouchableOpacity style={PSStyles.bottom_sheet_menu} onPress={onDeleteImagePress}>
                    <Image source={ic_bottom_sheet_delete_black} style={PSStyles.ic_bottom_sheet_delete_black}></Image>
                    <PlainText text={trans("apps.insertion.image.delete", texts)}></PlainText>
                </TouchableOpacity>
            </View>
        </RBSheet>
        <RBSheet
            ref={mediaTypeRBSheetRef}
            closeOnDragDown={true}
            closeOnPressMask={true}
            customStyles={{
                wrapper: {
                    backgroundColor: "#000000aa"
                },
                draggableIcon: {
                    backgroundColor: "#000"
                }
            }}
        >
            <View style={PSStyles.bottom_sheet}>
                <PlainText style={PSStyles.edit_picture_title} text={trans("apps.message.addimage", texts)}></PlainText>
                <TouchableOpacity style={PSStyles.bottom_sheet_menu} onPress={onCameraPress}>
                    <Image source={ic_bottom_sheet_photo_camera_black} style={PSStyles.ic_bottom_sheet_photo_camera_black}></Image>
                    <PlainText text={trans("apps.action.takephoto", texts)}></PlainText>
                </TouchableOpacity>

                <TouchableOpacity style={PSStyles.bottom_sheet_menu} onPress={onAlbumPress}>
                    <Image source={ic_bottom_sheet_photo_library_black} style={PSStyles.ic_bottom_sheet_photo_library_black}></Image>
                    <PlainText text={trans("apps.action.choosefromalbum", texts)}></PlainText>
                </TouchableOpacity>
            </View>
        </RBSheet>
    </View>
}