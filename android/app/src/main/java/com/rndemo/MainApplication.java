package com.rndemo;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.modules.network.OkHttpClientProvider;
import com.imagepicker.ImagePickerPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.facebook.soloader.SoLoader;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.rndemo.http.HttpClientProvider;
import com.rndemo.http.MainReactPackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
              new ImagePickerPackage(),
              new LinearGradientPackage(),
              new MyNativePackage(),
              new RNDeviceInfo(),
              new RNFetchBlobPackage()
      );
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    AppConfig.init(this);
    SoLoader.init(this, /* native exopackage */ false);
    OkHttpClientProvider.replaceOkHttpClient(HttpClientProvider.getOkHttpClient());
  }
}
