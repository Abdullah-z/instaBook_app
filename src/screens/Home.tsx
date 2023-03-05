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
    // <Block>
    //   {/* search input */}
    //   <Block color={colors.card} flex={0} padding={sizes.padding}>
    //     <Input search placeholder={t('common.search')} />
    //   </Block>

    //   {/* toggle products list */}
    //   <Block
    //     row
    //     flex={0}
    //     align="center"
    //     justify="center"
    //     color={colors.card}
    //     paddingBottom={sizes.sm}>
    //     <Button onPress={() => handleProducts(0)}>
    //       <Block row align="center">
    //         <Block
    //           flex={0}
    //           radius={6}
    //           align="center"
    //           justify="center"
    //           marginRight={sizes.s}
    //           width={sizes.socialIconSize}
    //           height={sizes.socialIconSize}
    //           gradient={gradients?.[tab === 0 ? 'primary' : 'secondary']}>
    //           <Image source={assets.extras} color={colors.white} radius={0} />
    //         </Block>
    //         <Text p font={fonts?.[tab === 0 ? 'medium' : 'normal']}>
    //           {t('home.following')}
    //         </Text>
    //       </Block>
    //     </Button>
    //     <Block
    //       gray
    //       flex={0}
    //       width={1}
    //       marginHorizontal={sizes.sm}
    //       height={sizes.socialIconSize}
    //     />
    //     <Button onPress={() => handleProducts(1)}>
    //       <Block row align="center">
    //         <Block
    //           flex={0}
    //           radius={6}
    //           align="center"
    //           justify="center"
    //           marginRight={sizes.s}
    //           width={sizes.socialIconSize}
    //           height={sizes.socialIconSize}
    //           gradient={gradients?.[tab === 1 ? 'primary' : 'secondary']}>
    //           <Image
    //             radius={0}
    //             color={colors.white}
    //             source={assets.documentation}
    //           />
    //         </Block>
    //         <Text p font={fonts?.[tab === 1 ? 'medium' : 'normal']}>
    //           {t('home.trending')}
    //         </Text>
    //       </Block>
    //     </Button>
    //   </Block>

    //   {/* products list */}
    //   <Block
    //     scroll
    //     paddingHorizontal={sizes.padding}
    //     showsVerticalScrollIndicator={false}
    //     contentContainerStyle={{paddingBottom: sizes.l}}>
    //     <Block row wrap="wrap" justify="space-between" marginTop={sizes.sm}>
    //       {products?.map((product) => (
    //         <Product {...product} key={`card-${product?.id}`} />
    //       ))}
    //     </Block>
    //   </Block>
    // </Block>
    <>
      <ScrollView>
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
