/**
 * Created by 陈伟达 on 2017/8/21.
 */
import React, {Component} from 'react'
import {
    View,
    Text,
    StyleSheet,
    PermissionsAndroid,
    ToastAndroid,
    NativeModules,
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient';

export default class FlexPage extends Component {
    static navigationOptions = ({navigation}) => ({
       header:null
    });

    //TODO
    render() {
        return (
            <LinearGradient colors={['#ffffff', '#00a8a8', '#ffffff']} style={styles.container}>

                <Text style={styles.children} onPress={() => requestGeoPermission()}>Geolocation</Text>
                <Text style={styles.children} onPress={() => pickImage()}>Pick Image</Text>
                <Text style={styles.children} onPress={() => NativeModules.TestNativeModule.printNativeLog()}>Call Native Method</Text>
            </LinearGradient>
        );
    }
}

// TODO rn-android 相关的授权放到原生启动时候一次性获取
// TODO 在模拟器中请求授权(request)抛出异常
// java.lang.RuntimeException: Unable to resume activity {com.rndemo/com.rndemo.MainActivity}: java.lang.ArrayIndexOutOfBoundsException: length=0; index=0
// at android.app.ActivityThread.performResumeActivity(ActivityThread.java:3400)
// at android.app.ActivityThread.handleResumeActivity(ActivityThread.java:3440)
// at android.app.ActivityThread$H.handleMessage(ActivityThread.java:1510)
// at android.os.Handler.dispatchMessage(Handler.java:102)
// at android.os.Looper.loop(Looper.java:154)
// at android.app.ActivityThread.main(ActivityThread.java:6077)
// at java.lang.reflect.Method.invoke(Native Method)
// at com.android.internal.os.ZygoteInit$MethodAndArgsCaller.run(ZygoteInit.java:865)
// at com.android.internal.os.ZygoteInit.main(ZygoteInit.java:755)
// Caused by: java.lang.ArrayIndexOutOfBoundsException: length=0; index=0
// at com.facebook.react.modules.permissions.PermissionsModule$1.invoke(PermissionsModule.java:119)
// at com.facebook.react.modules.permissions.PermissionsModule.onRequestPermissionsResult(PermissionsModule.java:207)
// at com.facebook.react.ReactActivityDelegate$1.invoke(ReactActivityDelegate.java:211)
// at com.facebook.react.ReactActivityDelegate.onResume(ReactActivityDelegate.java:131)
// at com.facebook.react.ReactActivity.onResume(ReactActivity.java:66)
// at android.app.Instrumentation.callActivityOnResume(Instrumentation.java:1269)
// at android.app.Activity.performResume(Activity.java:6766)
// at android.app.ActivityThread.performResumeActivity(ActivityThread.java:3377)
// at android.app.ActivityThread.handleResumeActivity(ActivityThread.java:3440)
// at android.app.ActivityThread$H.handleMessage(ActivityThread.java:1510)
// at android.os.Handler.dispatchMessage(Handler.java:102)
// at android.os.Looper.loop(Looper.java:154)
// at android.app.ActivityThread.main(ActivityThread.java:6077)
// at java.lang.reflect.Method.invoke(Native Method)
// at com.android.internal.os.ZygoteInit$MethodAndArgsCaller.run(ZygoteInit.java:865)
// at com.android.internal.os.ZygoteInit.main(ZygoteInit.java:755)
async function requestGeoPermission() {
    try {
        // const granted = await PermissionsAndroid.request(
        //     PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        //     {
        //         'title': 'Cool Photo App Camera Permission',
        //         'message': 'Cool Photo App needs access to your camera ' +
        //         'so you can take awesome pictures.'
        //     }
        // );
        const granted = PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
        if (PermissionsAndroid.RESULTS.GRANTED === granted) {
            ToastAndroid.show('You can use Geolocation', ToastAndroid.SHORT);
        } else {
            ToastAndroid.show('You has no permission to use', ToastAndroid.SHORT);
        }
    } catch (err) {
        console.warn(err)
    }
}

function pickImage() {
    var ImagePicker = require('react-native-image-picker');

    // More info on all the options is below in the README...just some common use cases shown here
    var options = {
        title: 'Select Avatar',
        customButtons: [
            {name: 'fb', title: 'Choose Photo from Facebook'},
        ],
        storageOptions: {
            skipBackup: true,
            path: 'images'
        }
    };

    /**
     * The first arg is the options object for customization (it can also be null or omitted for default options),
     * The second arg is the callback which sends object: response (more info below in README)
     */
    ImagePicker.showImagePicker(options, (response) => {
        console.log('Response = ', response);

        if (response.didCancel) {
            console.log('User cancelled image picker');
        }
        else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
        }
        else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
        }
        else {
            let source = { uri: response.uri };

            // You can also display the image using data:
            // let source = { uri: 'data:image/jpeg;base64,' + response.data };

            this.setState({
                avatarSource: source
            });
        }
    });
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'row',
    },

    children:{
        flex:1,
        borderColor:'#AA0090',
        borderWidth:2,
        textAlign:'center',
        fontSize:20,
        justifyContent:'center',
        alignItems:'center',
    }
});
