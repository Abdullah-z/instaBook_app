import React, {useCallback, useState} from 'react';

import {useData, useTheme, useTranslation} from '../hooks/';
import {Block, Button, Image, Input, Product, Text} from '../components/';
import {View, ScrollView} from 'react-native';
import {HStack} from 'native-base/lib/typescript/components/primitives';
import Ionicons from '@expo/vector-icons/Ionicons';

const Home = () => {
  const {t} = useTranslation();
  const [tab, setTab] = useState<number>(0);
  const {following, trending} = useData();
  const [products, setProducts] = useState(following);
  const {assets, colors, fonts, gradients, sizes} = useTheme();

  const handleProducts = useCallback(
    (tab: number) => {
      setTab(tab);
      setProducts(tab === 0 ? following : trending);
    },
    [following, trending, setTab, setProducts],
  );

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
    <ScrollView>
      <Block card margin={sizes.sm}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: sizes.xs,
          }}>
          <Image
            source={assets.avatar1}
            style={{width: sizes.xl, height: sizes.xl, borderRadius: sizes.s}}
          />
          <Text marginLeft={sizes.sm} p bold>
            User Name
          </Text>
        </View>

        <Block marginBottom={sizes.xxl}>
          <Image
            resizeMode="cover"
            source={assets.carousel1}
            style={{width: '100%'}}
          />
          {/* <Text p secondary marginTop={sizes.sm}>
          Private Room • 1 Guests • 1 Sofa
        </Text>
        <Text h4 marginVertical={sizes.s}>
          Single room in center
        </Text>
        <Text p lineHeight={26}>
          As Uber works through a huge amount of internal management turmoil,
          the company is also consolidating.
        </Text> */}
          <View style={{flexDirection: 'row'}}>
            <Ionicons
              name="heart-outline"
              size={32}
              color="red"
              style={{margin: sizes.xs}}
            />
            <Ionicons
              name="chatbubble-outline"
              size={32}
              color="black"
              style={{margin: sizes.xs}}
            />
          </View>
        </Block>
      </Block>
    </ScrollView>
  );
};

export default Home;
