LOCAL_PROPERTIES="./android/local.properties"

if [[ "$OSTYPE" == "darwin"* ]]; then
  # macOS case
  echo "sdk.dir = /Users/$USER/Library/Android/sdk" > $LOCAL_PROPERTIES
else
  # other linux environment
  echo "sdk.dir = /home/$USER/Android/Sdk" > $LOCAL_PROPERTIES
fi
