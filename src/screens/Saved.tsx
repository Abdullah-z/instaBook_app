import {View, Text, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useData, useTheme} from '../hooks';
import {Block, Image} from '../components';

export default function Saved() {
  const [savedPosts, setSavedPosts] = useState();
  const {token} = useData();
  const {assets, colors, sizes} = useTheme();

  const IMAGE_SIZE = (sizes.width - (sizes.padding + sizes.sm) * 2) / 3;
  const IMAGE_VERTICAL_SIZE =
    (sizes.width - (sizes.padding + sizes.sm) * 2) / 2;
  const IMAGE_MARGIN = (sizes.width - IMAGE_SIZE * 3 - sizes.padding * 2) / 2;
  const IMAGE_VERTICAL_MARGIN =
    (sizes.width - (IMAGE_VERTICAL_SIZE + sizes.sm) * 2) / 2;

  console.log(savedPosts);

  const config = {
    headers: {
      Authorization: token,
      limit: 9,
    },
  };

  const fetchSavedPosts = () => {
    axios
      .get('http://172.16.1.74:8080/api/getSavePosts', config)
      .then((res) => {
        setSavedPosts(res.data.savePosts);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchSavedPosts();
  }, []);

  return (
    <ScrollView>
      <Block
        style={{flexDirection: 'row'}}
        justify="space-between"
        margin={sizes.sm}
        wrap="wrap">
        {savedPosts?.map((index) => {
          return (
            <Image
              key={index._id}
              resizeMode="cover"
              source={{uri: index.images[0].url}}
              marginBottom={IMAGE_VERTICAL_MARGIN}
              style={{
                height: IMAGE_VERTICAL_SIZE,
                width: IMAGE_VERTICAL_SIZE,
              }}
            />
          );
        })}
      </Block>
    </ScrollView>
  );
}
