import React, {useCallback, useEffect, useState} from 'react';
import {Platform, Linking} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/core';

import {Block, Button, Image, Text} from '../components/';
import {useData, useTheme, useTranslation} from '../hooks/';
import CommonDataService from '../services/common-data-service';
import {SERVICE_ROUTE} from '../services/endpoints';
import axios from 'axios';
import {FlatList} from 'native-base';

const isAndroid = Platform.OS === 'android';
const commonDataService = new CommonDataService();
const Profile = () => {
  const {user} = useData();
  const {t} = useTranslation();
  const navigation = useNavigation();
  const {assets, colors, sizes} = useTheme();
  const {userData} = useData();
  const {userID} = useData();
  const {token} = useData();
  const [userPosts, setUserPosts] = useState(null);
  console.log(userPosts);

  const IMAGE_SIZE = (sizes.width - (sizes.padding + sizes.sm) * 2) / 3;
  const IMAGE_VERTICAL_SIZE =
    (sizes.width - (sizes.padding + sizes.sm) * 2) / 2;
  const IMAGE_MARGIN = (sizes.width - IMAGE_SIZE * 3 - sizes.padding * 2) / 2;
  const IMAGE_VERTICAL_MARGIN =
    (sizes.width - (IMAGE_VERTICAL_SIZE + sizes.sm) * 2) / 2;

  const handleSocialLink = useCallback(
    (type: 'twitter' | 'dribbble') => {
      const url =
        type === 'twitter'
          ? `https://twitter.com/${user?.social?.twitter}`
          : `https://dribbble.com/${user?.social?.dribbble}`;

      try {
        Linking.openURL(url);
      } catch (error) {
        alert(`Cannot open URL: ${url}`);
      }
    },
    [user],
  );

  const link = 'http://172.16.1.74:8080/' + SERVICE_ROUTE.USER_POSTS + userID;

  console.log(link);

  // const fetchUserPosts = () => {
  //   commonDataService.fetchData(url).then((res) => {
  //     console.log(res);
  //   });
  // };

  const config = {
    headers: {
      Authorization: token,
      limit: 9,
    },
  };
  const url = link;

  const fetchUserPosts = () => {
    axios
      .get(url, config)
      .then((res) => {
        let data = JSON.stringify(res.data.posts);
        let data2 = JSON.parse(data);
        setUserPosts(data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchUserPosts();
  }, []);

  return (
    <Block safe marginTop={sizes.md}>
      <Block
        scroll
        paddingHorizontal={sizes.s}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: sizes.padding}}>
        <Block flex={0}>
          <Image
            background
            resizeMode="cover"
            padding={sizes.sm}
            paddingBottom={sizes.l}
            radius={sizes.cardRadius}
            source={{uri: userData.avatar}}>
            <Button
              row
              flex={0}
              justify="flex-start"
              onPress={() => navigation.goBack()}>
              <Image
                radius={0}
                width={10}
                height={18}
                color={colors.white}
                source={assets.arrow}
                transform={[{rotate: '180deg'}]}
              />
              <Text p white marginLeft={sizes.s}>
                {t('profile.title')}
              </Text>
            </Button>
            <Block flex={0} align="center">
              {/* <Image
                width={128}
                height={128}
                marginBottom={sizes.sm}
                source={{uri: userData.avatar}}
              /> */}
              <Text h5 center white>
                {userData?.fullname}
              </Text>
              <Text p center white>
                @{userData?.username}
              </Text>
              <Block row marginVertical={sizes.m}>
                <Button
                  white
                  outlined
                  shadow={false}
                  radius={sizes.m}
                  onPress={() => {
                    alert(`Follow ${user?.name}`);
                  }}>
                  <Block
                    justify="center"
                    radius={sizes.m}
                    paddingHorizontal={sizes.m}
                    color="rgba(255,255,255,0.2)">
                    <Text white bold transform="uppercase">
                      {t('common.follow')}
                    </Text>
                  </Block>
                </Button>
                <Button
                  shadow={false}
                  radius={sizes.m}
                  marginHorizontal={sizes.sm}
                  color="rgba(255,255,255,0.2)"
                  outlined={String(colors.white)}
                  onPress={() => handleSocialLink('twitter')}>
                  <Ionicons
                    size={18}
                    name="logo-twitter"
                    color={colors.white}
                  />
                </Button>
                <Button
                  shadow={false}
                  radius={sizes.m}
                  color="rgba(255,255,255,0.2)"
                  outlined={String(colors.white)}
                  onPress={() => handleSocialLink('dribbble')}>
                  <Ionicons
                    size={18}
                    name="logo-dribbble"
                    color={colors.white}
                  />
                </Button>
              </Block>
            </Block>
          </Image>

          {/* profile: stats */}
          <Block
            flex={0}
            radius={sizes.sm}
            shadow={!isAndroid} // disabled shadow on Android due to blur overlay + elevation issue
            marginTop={-sizes.l}
            marginHorizontal="8%"
            color="rgba(255,255,255,0.2)">
            <Block
              row
              blur
              flex={0}
              intensity={100}
              radius={sizes.sm}
              overflow="hidden"
              tint={colors.blurTint}
              justify="space-evenly"
              paddingVertical={sizes.sm}
              renderToHardwareTextureAndroid>
              <Block align="center">
                <Text h5>{user?.stats?.posts}</Text>
                <Text>{t('profile.posts')}</Text>
              </Block>
              <Block align="center">
                <Text h5>{userData?.followers.length}</Text>
                <Text>{t('profile.followers')}</Text>
              </Block>
              <Block align="center">
                <Text h5>{userData?.following.length}</Text>
                <Text>{t('profile.following')}</Text>
              </Block>
            </Block>
          </Block>

          {/* profile: about me */}
          <Block paddingHorizontal={sizes.sm}>
            <Text h5 semibold marginBottom={sizes.s} marginTop={sizes.sm}>
              {t('profile.aboutMe')}
            </Text>
            <Text p lineHeight={26}>
              {user?.about}
            </Text>
          </Block>

          {/* profile: photo album */}
          <Block paddingHorizontal={sizes.sm} marginTop={sizes.s}>
            <Block row align="center" justify="space-between">
              <Text h5 semibold>
                {t('common.album')}
              </Text>
              <Button>
                <Text p primary semibold>
                  {t('common.viewall')}
                </Text>
              </Button>
            </Block>
            <Block
              style={{flexDirection: 'row'}}
              justify="space-between"
              wrap="wrap">
              {userPosts?.map((index) => {
                index.images.map((loop) => {
                  return (
                    <Image
                      resizeMode="cover"
                      source={{uri: loop.url}}
                      marginBottom={IMAGE_VERTICAL_MARGIN}
                      style={{
                        height: IMAGE_VERTICAL_SIZE,
                        width: IMAGE_VERTICAL_SIZE,
                      }}
                    />
                  );
                });
              })}

              {/* <Image
                        resizeMode="cover"
                        source={JSON.stringify(index.images)}
                        marginBottom={IMAGE_VERTICAL_MARGIN}
                        style={{
                          height: IMAGE_VERTICAL_SIZE,
                          width: IMAGE_VERTICAL_SIZE,
                        }}
                      /> */}
            </Block>
          </Block>
        </Block>
      </Block>
    </Block>
  );
};

export default Profile;
