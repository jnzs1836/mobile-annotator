package com.persong.ktwzj.aiaugmentedar;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
//import wikitu

public class GlassActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        NativeStartupConfiguration startupConfiguration = new NativeStartupConfiguration();
        startupConfiguration.setLicenseKey(WikitudeSDKConstants.WIKITUDE_SDK_KEY);
        wikitudeSDK.onCreate(getApplicationContext(), startupConfiguration);

    }
}
