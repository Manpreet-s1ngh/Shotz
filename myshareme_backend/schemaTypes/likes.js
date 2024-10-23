import {v4 as uuidv4} from 'uuid'

export default {
  name: 'likes',
  title: 'Likes',
  type: 'document',
  fields: [
    {
      name: 'likeId',
      title: 'Like Id ',
      type: 'string',
      initialValue: () => uuidv4(),
      description: 'Unique Id for the like ',
    },
    {
      name: 'post',
      title: 'Post',
      type: 'reference',
      to: [{type: 'post'}],
      description: 'The post on which the user has liked',
    },
    {
      name: 'user',
      title: 'User',
      type: 'reference',
      to: [{type: 'user'}],
      description: 'The user which has liked the photo',
    },
    {
      name: 'likedAt',
      title: 'Liked At',
      type: 'datetime',
      description: 'The time when the post was liked by the user',
    },
  ],
}
