import React, {useCallback, useState, useEffect} from 'react';

import {useData, useTheme, useTranslation} from '../hooks/';
import {Block, Button, Image, Input, Product, Text} from '../components/';
import {View, ScrollView, Dimensions} from 'react-native';
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

const Home = () => {
  const {userID} = useData();
  console.log(userID);
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
  console.log('feed===>' + JSON.stringify(feed));
  const commonDataService = new CommonDataService();
  const [image, setImage] = useState(null);

  console.log(image);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const imageUpload = async (images) => {
    let imgArr = [];
    for (const item of images) {
      const formData = new FormData();

      if (item.camera) {
        formData.append('file', item.camera);
      } else {
        formData.append('file', item);
      }

      formData.append('upload_preset', 'dprkhzls');
      formData.append('cloud_name', 'dcxgup2xo');

      const res = await fetch(
        'https://api.cloudinary.com/v1_1/dcxgup2xo/image/upload',
        {
          method: 'POST',
          body: formData,
        },
      );

      const data = await res.json();
      imgArr.push({public_id: data.public_id, url: data.secure_url});
    }
    return imgArr;
  };

  const handleProducts = useCallback(
    (tab: number) => {
      setTab(tab);
      setProducts(tab === 0 ? following : trending);
    },
    [following, trending, setTab, setProducts],
  );

  const saveData = async () => {
    try {
      await AsyncStorage.setItem(TOKEN_KEY, JSON.stringify(token));

      console.log('Data successfully saved');
    } catch (e) {
      console.log('Failed to save the data to the storage');
    }
  };

  useEffect(() => {
    saveData();
  }, []);

  const config = {
    headers: {
      Authorization: token,
      limit: 9,
    },
  };

  // const fetchFeed = () => {
  //   axios
  //     .get('http://172.16.1.125:8080/api/posts', config)
  //     .then((res) => {
  //       setFeed(res.data.posts);
  //     })
  //     .catch((err) => console.log(err));
  // };

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
      <ScrollView scrollEnabled={false}>
        <Block
          card
          marginHorizontal={sizes.xs}
          marginTop={sizes.xs}
          marginBottom={sizes.sm}>
          <Block
            align="center"
            style={{
              flexDirection: 'row',
            }}>
            <Input
              // value={newComment}
              variant="rounded"
              style={{minWidth: '85%'}}
              // placeholder={placeholderText}
              autoFocus
              marginRight={2}
              marginVertical={sizes.xs}
              // onChangeText={(value) => {
              //   setNewComment(value);
              // }}
            />
            <Ionicons
              name="paper-plane-outline"
              size={24}
              color="black"
              // onPress={() => {
              //   setComments((oldata) => [
              //     ...oldata,
              //     {
              //       __v: 0,
              //       _id: Math.random,
              //       content: newComment,
              //       createdAt: new Date(),
              //       likes: [],
              //       postId: '63be5da7e20a910d9c43ae91',
              //       postUserId: '63bd65b55b9a7559acd7533e',
              //       updatedAt: '2023-01-11T07:13:10.277Z',
              //       user: {
              //         __v: 0,
              //         _id: userID,
              //         address: '',
              //         avatar: avatar,
              //         createdAt: '2023-01-11T07:04:25.136Z',
              //         email: 'bill@gmail.com',
              //         followers: [Array],
              //         following: [Array],
              //         fullname: fullName,
              //         gender: 'male',
              //         mobile: '',
              //         role: 'user',
              //         saved: [Array],
              //         story: '',
              //         updatedAt: '2023-02-20T07:24:25.345Z',
              //         username: 'billgates',
              //         website: '',
              //       },
              //     },
              //   ]),
              //     setNewComment(''),
              //     isReplying ? PostReply(replyingID) : PostComment();
              // }}
            />
          </Block>
          <Button onPress={pickImage}>
            <Text>Image</Text>
          </Button>
        </Block>
      </ScrollView>
      <ScrollView style={{marginTop: sizes.xs}}>
        {/* <Block style={{flexDirection: 'row'}}>
        <Avatar
          bg="green.500"
          source={{
            uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
          }}
        />
        <Input placeholder="Regular" marginBottom={sizes.sm} />
      </Block> */}

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
    </>
  );
};

export default Home;
