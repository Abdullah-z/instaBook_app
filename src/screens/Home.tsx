import React, {useCallback, useState, useEffect} from 'react';

import {useData, useTheme, useTranslation} from '../hooks/';
import {Block, Button, Image, Input, Product, Text} from '../components/';
import {
  View,
  ScrollView,
  Dimensions,
  StyleSheet,
  RefreshControl,
} from 'react-native';
import {HStack} from 'native-base/lib/typescript/components/primitives';
import Ionicons from '@expo/vector-icons/Ionicons';
import {Carousel} from 'react-native-snap-carousel';
import {Avatar} from 'native-base';
import Post from '../components/Post';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import CommonDataService from '../services/common-data-service';
import * as ImagePicker from 'expo-image-picker';
import {SERVICE_ROUTE} from '../services/endpoints';
import {FloatingAction} from 'react-native-floating-action';
import {Modal} from 'native-base';
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';

const Home = () => {
  const {userID} = useData();
  // console.log(userID);
  const {t} = useTranslation();
  const [tab, setTab] = useState<number>(0);
  const {following, trending} = useData();
  const [products, setProducts] = useState(following);
  const {assets, colors, fonts, gradients, sizes} = useTheme();
  const width = Dimensions.get('window').width;
  const isCarousel = React.useRef(null);
  const TOKEN_KEY = 'tokenkey123';
  const {token} = useData();
  const [feed, setFeed] = useState();
  // console.log('feed===>' + JSON.stringify(feed));
  const commonDataService = new CommonDataService();
  const [image, setImage] = useState([]);
  const [content, setContent] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [imageData, setImageData] = useState([]);

  // console.log(imageData);
  console.log('image' + image);

  const onRefresh = React.useCallback(() => {
    fetchFeed();
  }, []);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    // console.log(result);

    if (!result.canceled) {
      setImage((oldData) => [...oldData, result.assets[0].uri]);
    }
  };

  const NewPost = (data) => {
    commonDataService
      .executeApiCall(SERVICE_ROUTE.NEW_POST, {
        content: content,
        images: data,
      })
      .then((res) => {
        console.log(res.data);
        alert('Upload successful!');

        setImage([]);
      })
      .catch(function (error) {
        console.log(error);
        setImage([]);
      });
  };

  const uploadImage = async () => {
    let imgArr = [];

    image.map((index) => {
      const data = new FormData();
      data.append('file', {
        uri: index,
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
          // NewPost(result.public_id, result.url);
          // setImageData((oldData) => [
          //   ...oldData,
          //   {public_id: result.public_id, url: result.url},
          // ]);

          imgArr.push({public_id: result.public_id, url: result.url});
          console.log('---->' + imgArr);
        })
        .then(() => {
          console.log('IL:' + image.length + 'IAL:' + imgArr.length);

          image.length === imgArr.length ? NewPost(imgArr) : '';
        })

        .catch((error) => {
          console.error(error);
          alert('Upload failed.');
        });
    });
  };

  const saveData = async () => {
    try {
      await AsyncStorage.setItem(TOKEN_KEY, JSON.stringify(token));

      console.log('Data successfully saved');
    } catch (e) {
      console.log('Failed to save the data to the storage');
    }
  };

  const actions = [
    {
      text: 'New Post',
      icon: (
        <Ionicons
          // onPress={() => navigation.navigate('Comments')}
          name="create-outline"
          size={32}
          color="white"
          style={{margin: sizes.xs}}
        />
      ),
      name: 'New Post',
      position: 2,
    },
  ];

  useEffect(() => {
    saveData();
  }, []);

  const config = {
    headers: {
      Authorization: token,
      limit: 9,
    },
  };

  const fetchFeed = () => {
    commonDataService
      .fetchData(SERVICE_ROUTE.POSTS)
      .then((res) => {
        setFeed(res.data.posts);
      })
      .catch((err) => console.log(err.response.data));
  };

  useEffect(() => {
    fetchFeed();
  }, []);

  return (
    <>
      <ScrollView
        style={{marginTop: sizes.xs}}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <Modal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          size={'full'}>
          <Modal.Content maxWidth="400px">
            <Modal.CloseButton />
            <Modal.Header>New Post</Modal.Header>
            <Modal.Body>
              <Block row justify="center" align="center">
                <Input
                  style={{minWidth: '90%'}}
                  numberOfLines={3}
                  onChangeText={(text) => setContent(text)}
                />
                <Ionicons
                  onPress={() => pickImage()}
                  name="image-outline"
                  size={32}
                  color="gray"
                  style={{margin: sizes.xs}}
                />
              </Block>
              {image ? (
                image.map((index) => {
                  console.log(index);
                  return (
                    <Image
                      marginTop={sizes.xs}
                      source={{uri: index}}
                      style={{width: 100, height: 100}}
                      key={index}
                    />
                  );
                })
              ) : (
                <></>
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button
                width={'20%'}
                onPress={() => {
                  setShowModal(false), setImage([]);
                }}>
                <Text>Cancel</Text>
              </Button>
              <Button
                width={'20%'}
                onPress={() => {
                  uploadImage();
                  setShowModal(false);
                }}>
                <Text>Post</Text>
              </Button>
            </Modal.Footer>
          </Modal.Content>
        </Modal>

        {feed?.map((index, loop) => {
          return (
            <Post
              key={loop}
              data={index}
              isLiked={index.likes.find((e) => e._id === userID) ? true : false}
            />
          );
        })}
      </ScrollView>

      <FloatingAction
        actions={actions}
        onPressItem={() => setShowModal(true)}
      />
    </>
  );
};

const styles = StyleSheet.create({
  bottom: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
});

export default Home;
