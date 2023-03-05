import {
  Actionsheet,
  Avatar,
  Box,
  Divider,
  HamburgerIcon,
  Menu,
  Pressable,
  useDisclose,
  View,
} from 'native-base';
import React, {useCallback, useEffect, useState} from 'react';
import Block from './Block';
import Image from './Image';
import Text from './Text';
import Ionicons from '@expo/vector-icons/Ionicons';
import {useData, useTheme} from '../hooks';
import {useNavigation} from '@react-navigation/native';
import {SliderBox} from 'react-native-image-slider-box';
import {l} from 'i18n-js';
import axios from 'axios';
import moment from 'moment';

export default function Post(props) {
  const {assets, colors, fonts, gradients, sizes} = useTheme();
  const {isOpen, onOpen, onClose} = useDisclose();
  const navigation = useNavigation();
  const [carousel, setCarousel] = useState();
  const {userID} = useData();

  let Tempcarousel = [];

  useEffect(() => {
    props.data.images.map((index) => {
      Tempcarousel.push(index.url);
    });
    setCarousel(Tempcarousel);
  }, []);

  return (
    <Block card marginVertical={sizes.xs} marginHorizontal={sizes.xs}>
      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content>
          <Actionsheet.Item>Edit</Actionsheet.Item>
          <Actionsheet.Item>Delete</Actionsheet.Item>
          <Actionsheet.Item>Copy Link</Actionsheet.Item>
          <Actionsheet.Item>Report</Actionsheet.Item>
        </Actionsheet.Content>
      </Actionsheet>
      <Block
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: sizes.xs,
        }}>
        <Avatar
          bg="green.500"
          source={{
            uri: props.data.user.avatar,
          }}
        />

        <Block style={{flexDirection: 'column'}}>
          <Text marginLeft={sizes.sm} p bold>
            {props.data.user.fullname}
          </Text>
          <Text marginLeft={sizes.sm}>
            {moment(props.data.createdAt).fromNow()}
          </Text>
        </Block>
        <Block style={{alignItems: 'flex-end'}}>
          <Ionicons
            name="ellipsis-horizontal-circle-outline"
            size={32}
            color="black"
            style={{margin: sizes.xs}}
            onPress={onOpen}
          />
        </Block>
      </Block>

      <Text p>{props.data.content}</Text>
      <Block align="center">
        {carousel ? (
          <SliderBox
            images={carousel}
            sliderBoxHeight={400}
            onCurrentImagePressed={(index) =>
              console.warn(`image ${index} pressed`)
            }
            autoplay={false}
            dotColor="#FFEE58"
            inactiveDotColor="#90A4AE"
            paginationBoxVerticalPadding={20}
            resizeMethod={'resize'}
            resizeMode={'cover'}
            paginationBoxStyle={{
              position: 'absolute',
              bottom: 0,
              padding: 0,
              alignItems: 'center',
              alignSelf: 'center',
              justifyContent: 'center',
              paddingVertical: 10,
            }}
            dotStyle={{
              width: 10,
              height: 10,
              borderRadius: 5,
              marginHorizontal: 0,
              padding: 0,
              margin: 0,
              backgroundColor: 'rgba(128, 128, 128, 0.92)',
            }}
            ImageComponentStyle={{borderRadius: 15, width: '97%', marginTop: 5}}
            imageLoadingColor="#2196F3"
          />
        ) : (
          <></>
        )}
      </Block>
      <Block style={{flexDirection: 'row'}}>
        <Block>
          <Block style={{flexDirection: 'row'}}>
            <Ionicons
              name={props.isLiked ? 'heart' : 'heart-outline'}
              size={32}
              color="red"
              style={{margin: sizes.xs}}
            />
            <Ionicons
              onPress={() =>
                navigation.navigate('Comments', {
                  data: props.data,
                  carousel: carousel,
                })
              }
              name="chatbubble-outline"
              size={32}
              color="black"
              style={{margin: sizes.xs}}
            />
          </Block>
        </Block>
        <Block align="flex-end">
          <Ionicons
            onPress={() => navigation.navigate('Comments')}
            name="bookmark-outline"
            size={32}
            color="black"
            style={{margin: sizes.xs}}
          />
        </Block>
      </Block>

      <Block style={{flexDirection: 'row'}}>
        <Text bold>{props.data.likes.length}</Text>
        <Text marginLeft={2}>Likes </Text>

        <Text marginLeft={sizes.sm} bold>
          {props.data.comments.length}
        </Text>
        <Text marginLeft={2}>Comments</Text>
      </Block>
    </Block>
  );
}
