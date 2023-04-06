import {Avatar, HamburgerIcon, Input, Menu, Pressable, View} from 'native-base';
import React, {useEffect, useState} from 'react';
import {ScrollView} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import {useData, useTheme} from '../hooks';
import {Block, Image, Text} from '../components';
import moment from 'moment';
import {SliderBox} from 'react-native-image-slider-box';
import CommonDataService from '../services/common-data-service';
import {SERVICE_ROUTE} from '../services/endpoints';

const commonDataService = new CommonDataService();

export default function Comments({route}) {
  const {assets, colors, fonts, gradients, sizes} = useTheme();
  const {data, carousel} = route.params;
  const [replyComments, setReplyComments] = useState();
  const [comments, setComments] = useState();
  const [newComment, setNewComment] = useState('');
  const {userID, fullName, avatar} = useData();
  const [placeholderText, setPlaceholderText] = useState('Add Comment');
  const [isReplying, setIsReplying] = useState(false);
  const [replyingID, setReplyingID] = useState();

  // console.log(data._id);
  // console.log(isReplying);

  useEffect(() => {
    const newReply = data.comments.filter((cm) => cm.reply);
    setReplyComments(newReply);
    setComments(data?.comments);
  }, []);

  const PostComment = () => {
    commonDataService
      .executeApiCall(SERVICE_ROUTE.NEW_COMMENT, {
        content: newComment,
        postUserId: userID,
        postId: data._id,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const PostReply = (commID) => {
    commonDataService
      .executeApiCall(SERVICE_ROUTE.NEW_COMMENT, {
        content: newComment,
        postUserId: userID,
        postId: data._id,
        reply: commID,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

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
                  uri: data?.user.avatar,
                }}
              />

              <Block style={{flexDirection: 'column'}}>
                <Text marginLeft={sizes.sm} p bold>
                  {data?.user.fullname}
                </Text>
                <Text marginLeft={sizes.sm}>
                  {moment(data.createdAt).fromNow()}
                </Text>
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
                  ImageComponentStyle={{
                    borderRadius: 15,
                    width: '97%',
                    marginTop: 5,
                  }}
                  imageLoadingColor="#2196F3"
                />
              ) : (
                <></>
              )}
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
              <Text bold>{data?.likes.length}</Text>
              <Text marginLeft={3}>Likes </Text>

              <Text marginLeft={sizes.sm} bold>
                {data?.comments.length}
              </Text>
              <Text marginLeft={3}>Comments</Text>
            </Block>
          </Block>

          {/* Comment Section */}

          {comments?.length > 0 ? (
            <Block card marginHorizontal={sizes.xs} marginBottom={90}>
              {comments?.map((index) => {
                return (
                  <>
                    {!index.reply ? (
                      <>
                        <Block
                          marginBottom={sizes.xs}
                          style={{flexDirection: 'row'}}>
                          <Avatar
                            size={'xs'}
                            bg="green.500"
                            source={{
                              uri: index?.user.avatar,
                            }}
                          />
                          <Block
                            marginLeft={sizes.xs}
                            style={{flexDirection: 'column'}}>
                            <Block
                              card
                              color={colors.light}
                              style={{flexDirection: 'column'}}>
                              <Block style={{flexDirection: 'row'}}>
                                <Text marginLeft={sizes.xs} bold>
                                  {index?.user.fullname}
                                </Text>
                                <Text marginLeft={sizes.sm} color={colors.gray}>
                                  {moment(index.createdAt).fromNow()}
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
                              <Text marginLeft={sizes.xs}>{index.content}</Text>
                            </Block>
                            <Block style={{flexDirection: 'row'}}>
                              <Text bold>Like</Text>
                              <Text
                                marginLeft={sizes.sm}
                                bold
                                onPress={() => (
                                  setPlaceholderText(
                                    `Reply to ${index.user.fullname}`,
                                  ),
                                  setIsReplying(true),
                                  setReplyingID(index._id)
                                )}>
                                Reply
                              </Text>
                              <Block style={{alignItems: 'flex-end'}}>
                                <Block style={{flexDirection: 'row'}}>
                                  <Text bold>{index.likes.length}</Text>
                                  <Text marginLeft={3}>Likes</Text>
                                </Block>
                              </Block>
                            </Block>
                          </Block>
                        </Block>
                        {replyComments?.map((loop) => {
                          return (
                            <>
                              {loop?.reply === index._id ? (
                                <Block
                                  marginLeft={sizes.md}
                                  style={{flexDirection: 'row'}}>
                                  <Avatar
                                    size={'xs'}
                                    bg="green.500"
                                    source={{
                                      uri: loop?.user.avatar,
                                    }}
                                  />
                                  <Block
                                    marginLeft={sizes.xs}
                                    marginBottom={sizes.xs}
                                    style={{flexDirection: 'column'}}>
                                    <Block
                                      card
                                      color={colors.light}
                                      style={{flexDirection: 'column'}}>
                                      <Block style={{flexDirection: 'row'}}>
                                        <Text marginLeft={sizes.xs} bold>
                                          {loop?.user.fullname}
                                        </Text>
                                        <Text
                                          marginLeft={sizes.sm}
                                          color={colors.gray}>
                                          {moment(loop.createdAt).fromNow()}
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
                                        {loop?.content}
                                      </Text>
                                    </Block>
                                    <Block style={{flexDirection: 'row'}}>
                                      <Text bold>Like</Text>
                                      <Text marginLeft={sizes.sm} bold>
                                        Reply
                                      </Text>
                                      <Block style={{alignItems: 'flex-end'}}>
                                        <Block style={{flexDirection: 'row'}}>
                                          <Text bold>{loop.likes.length}</Text>
                                          <Text marginLeft={3}>Likes</Text>
                                        </Block>
                                      </Block>
                                    </Block>
                                  </Block>
                                </Block>
                              ) : (
                                <></>
                              )}
                            </>
                          );
                        })}
                      </>
                    ) : (
                      <></>
                    )}
                  </>
                );
              })}
            </Block>
          ) : (
            <Text center marginBottom={90}>
              No Comments
            </Text>
          )}
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
              value={newComment}
              variant="rounded"
              placeholder={placeholderText}
              autoFocus
              marginRight={2}
              onChangeText={(value) => {
                setNewComment(value);
              }}
            />
            <Ionicons
              name="paper-plane-outline"
              size={24}
              color="black"
              onPress={() => {
                setComments((oldata) => [
                  ...oldata,
                  {
                    __v: 0,
                    _id: Math.random,
                    content: newComment,
                    createdAt: new Date(),
                    likes: [],
                    postId: '63be5da7e20a910d9c43ae91',
                    postUserId: '63bd65b55b9a7559acd7533e',
                    updatedAt: '2023-01-11T07:13:10.277Z',
                    user: {
                      __v: 0,
                      _id: userID,
                      address: '',
                      avatar: avatar,
                      createdAt: '2023-01-11T07:04:25.136Z',
                      email: 'bill@gmail.com',
                      followers: [Array],
                      following: [Array],
                      fullname: fullName,
                      gender: 'male',
                      mobile: '',
                      role: 'user',
                      saved: [Array],
                      story: '',
                      updatedAt: '2023-02-20T07:24:25.345Z',
                      username: 'billgates',
                      website: '',
                    },
                  },
                ]),
                  setNewComment(''),
                  isReplying ? PostReply(replyingID) : PostComment();
              }}
            />
          </Block>
        </Block>
      </View>
    </>
  );
}
