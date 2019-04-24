cd android && ./gradlew assembleRelease
cd .. && mkdir -p build/
mv ./android/app/build/outputs/apk/release/*.apk ./build/
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore ./build/*.keystore ./build/*.apk hkufui
