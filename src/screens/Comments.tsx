import {Avatar, HamburgerIcon, Input, Menu, Pressable, View} from 'native-base';
import React from 'react';
import {ScrollView} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import {useTheme} from '../hooks';
import {Block, Image, Text} from '../components';

export default function Comments() {
  const {assets, colors, fonts, gradients, sizes} = useTheme();
  return (
    <>
      <View flex={1}>
        <ScrollView>
          <Block card marginVertical={sizes.xs} marginHorizontal={sizes.xs}>
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
                <Menu
                  w="190"
                  trigger={(triggerProps) => {
                    return (
                      <Pressable
                        accessibilityLabel="More options menu"
                        {...triggerProps}>
                        <Ionicons
                          name="ellipsis-horizontal"
                          size={24}
                          color="black"
                          style={{margin: sizes.xs}}
                        />
                      </Pressable>
                    );
                  }}>
                  <Menu.Item>Edit</Menu.Item>
                  <Menu.Item>Delete</Menu.Item>
                  <Menu.Item>Copy Link</Menu.Item>
                  <Menu.Item>Report</Menu.Item>
                </Menu>
              </Block>
            </Block>

            <Block>
              <Image
                resizeMode="cover"
                source={assets.carousel1}
                style={{width: '100%'}}
              />
            </Block>
            <Block style={{flexDirection: 'row'}}>
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

          {/* Comment Section */}

          <Block card marginHorizontal={sizes.xs} marginBottom={90}>
            <Block style={{flexDirection: 'row'}}>
              <Avatar
                size={'xs'}
                bg="green.500"
                source={{
                  uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
                }}
              />
              <Block marginLeft={sizes.xs} style={{flexDirection: 'column'}}>
                <Block
                  card
                  color={colors.light}
                  style={{flexDirection: 'column'}}>
                  <Block style={{flexDirection: 'row'}}>
                    <Text marginLeft={sizes.xs} bold>
                      UserName
                    </Text>
                    <Text marginLeft={sizes.sm} color={colors.gray}>
                      12h
                    </Text>
                    <Block style={{alignItems: 'flex-end'}}>
                      <Menu
                        w="190"
                        trigger={(triggerProps) => {
                          return (
                            <Pressable
                              accessibilityLabel="More options menu"
                              {...triggerProps}>
                              <Ionicons
                                name="ellipsis-horizontal"
                                size={18}
                                color="black"
                                style={{margin: sizes.xs}}
                              />
                            </Pressable>
                          );
                        }}>
                        <Menu.Item>Edit</Menu.Item>
                        <Menu.Item>Delete</Menu.Item>
                      </Menu>
                    </Block>
                  </Block>
                  <Text marginLeft={sizes.xs}>
                    Technology is transforming people’s needs and expectations
                    for communication. Many users want or need to receive
                    reliable, timely alerts and notifications, even when they
                    aren’t actively using an application. On mobile devices,
                    push notifications serve this purpose. They look like any
                    other alert on the device to inform users of messages or
                    events, but they only reach users who’ve installed the
                    application.
                  </Text>
                </Block>
                <Block style={{flexDirection: 'row'}}>
                  <Text bold>Like</Text>
                  <Text marginLeft={sizes.sm} bold>
                    Reply
                  </Text>
                  <Block style={{alignItems: 'flex-end'}}>
                    <Block style={{flexDirection: 'row'}}>
                      <Text bold>5</Text>
                      <Text>Likes</Text>
                    </Block>
                  </Block>
                </Block>

                <Block marginTop={sizes.sm} style={{flexDirection: 'row'}}>
                  <Avatar
                    size={'xs'}
                    bg="green.500"
                    source={{
                      uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
                    }}
                  />
                  <Block
                    marginLeft={sizes.xs}
                    card
                    color={colors.light}
                    style={{flexDirection: 'column'}}>
                    <Block style={{flexDirection: 'row'}}>
                      <Text marginLeft={sizes.xs} bold>
                        UserName
                      </Text>
                      <Text marginLeft={sizes.sm} color={colors.gray}>
                        12h
                      </Text>
                      <Block style={{alignItems: 'flex-end'}}>
                        <Menu
                          w="190"
                          trigger={(triggerProps) => {
                            return (
                              <Pressable
                                accessibilityLabel="More options menu"
                                {...triggerProps}>
                                <Ionicons
                                  name="ellipsis-horizontal"
                                  size={18}
                                  color="black"
                                  style={{margin: sizes.xs}}
                                />
                              </Pressable>
                            );
                          }}>
                          <Menu.Item>Edit</Menu.Item>
                          <Menu.Item>Delete</Menu.Item>
                        </Menu>
                      </Block>
                    </Block>
                    <Text marginLeft={sizes.xs}>What?</Text>
                  </Block>
                </Block>
                <Block marginLeft={sizes.md} style={{flexDirection: 'row'}}>
                  <Text bold>Like</Text>
                  <Text marginLeft={sizes.sm} bold>
                    Reply
                  </Text>
                  <Block style={{alignItems: 'flex-end'}}>
                    <Block style={{flexDirection: 'row'}}>
                      <Text bold>5</Text>
                      <Text>Likes</Text>
                    </Block>
                  </Block>
                </Block>
              </Block>
            </Block>
          </Block>
        </ScrollView>
        <Block
          style={{
            backgroundColor: '#fff',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
          }}>
          <Block
            margin={sizes.sm}
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Input
              width={'95%'}
              variant="rounded"
              placeholder="Add Comment"
              autoFocus
              marginRight={2}
            />
            <Ionicons name="paper-plane-outline" size={24} color="black" />
          </Block>
        </Block>
      </View>
    </>
  );
}
