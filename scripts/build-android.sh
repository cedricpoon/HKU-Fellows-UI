cd android && ./gradlew assembleRelease
cd .. && mkdir -p build/
mv ./android/app/build/outputs/apk/release/*.apk ./build/
