import React, {useState} from 'react';
import {Button, Image, View} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

const App = () => {
  const [image, setImage] = useState(null);
  console.log(image);

  const getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  };

  const pickImage = async () => {
    await getPermissionAsync();

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const uploadImage = async () => {
    const data = new FormData();
    data.append('file', {
      uri: image,
      type: 'image/jpeg',
      name: 'myImage',
    });
    data.append('upload_preset', 'dprkhzls');
    data.append('cloud_name', 'dcxgup2xo');

    fetch('https://api.cloudinary.com/v1_1/dcxgup2xo/image/upload', {
      method: 'POST',
      body: data,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        alert('Upload successful!');
        setImage(null);
      })
      .catch((error) => {
        console.error(error);
        alert('Upload failed.');
      });
  };

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && (
        <View>
          <Image source={{uri: image}} style={{width: 200, height: 200}} />
          <Button title="Upload" onPress={uploadImage} />
        </View>
      )}
    </View>
  );
};

export default App;
