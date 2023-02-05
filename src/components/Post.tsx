import {
  Actionsheet,
  Avatar,
  Box,
  HamburgerIcon,
  Menu,
  Pressable,
  useDisclose,
  View,
} from 'native-base';
import React from 'react';
import Block from './Block';
import Image from './Image';
import Text from './Text';
import Ionicons from '@expo/vector-icons/Ionicons';
import {useTheme} from '../hooks';
import {useNavigation} from '@react-navigation/native';
import {SliderBox} from 'react-native-image-slider-box';
import {l} from 'i18n-js';

export default function Post() {
  const {assets, colors, fonts, gradients, sizes} = useTheme();
  const {isOpen, onOpen, onClose} = useDisclose();
  const navigation = useNavigation();
  const images = [
    'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
    'https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?cs=srgb&dl=pexels-pixabay-268533.jpg&fm=jpg',
    'https://thumbs.dreamstime.com/b/beautiful-rain-forest-ang-ka-nature-trail-doi-inthanon-national-park-thailand-36703721.jpg',
    'https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?cs=srgb&dl=pexels-anjana-c-674010.jpg&fm=jpg',
  ];

  return (
    <Block card marginVertical={sizes.xs} marginHorizontal={sizes.xs}>
      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content>
          {/* <Box w="100%" h={60} px={4} justifyContent="center"></Box> */}
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
        {/* <Image
      source={assets.avatar1}
      style={{width: sizes.xl, height: sizes.xl, borderRadius: sizes.xl}}
    /> */}
        <Avatar
          bg="green.500"
          source={{
            uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
          }}
        />

        <Block style={{flexDirection: 'column'}}>
          <Text marginLeft={sizes.sm} p bold>
            User Name
          </Text>
          <Text marginLeft={sizes.sm}>2 days ago</Text>
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

      <Block align="center">
        <SliderBox
          images={images}
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
        {/* <Image
          resizeMode="cover"
          source={assets.carousel1}
          style={{width: '100%'}}
        /> */}
      </Block>
      <Block style={{flexDirection: 'row'}}>
        <Block>
          <Block style={{flexDirection: 'row'}}>
            <Ionicons
              name="heart-outline"
              size={32}
              color="red"
              style={{margin: sizes.xs}}
            />
            <Ionicons
              onPress={() => navigation.navigate('Comments')}
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
        <Text bold>5</Text>
        <Text>Likes </Text>

        <Text marginLeft={sizes.sm} bold>
          2
        </Text>
        <Text>Comments</Text>
      </Block>
    </Block>
  );
}
