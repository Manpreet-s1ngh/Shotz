import {v4 as uuidv4} from 'uuid'

export default {
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    {
      name: 'postId',
      title: 'Post Id',
      type: 'string',
      description: 'A unique identifier for the post ',
      initialValue: () => uuidv4(),
    },
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'The title of the post',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'string',
      description: 'Description for the image',
    },
    {
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{type: 'category'}],
      description: 'Defines the current category of the image',
    },
    {
      name: 'destination',
      title: 'Destination',
      type: 'url',
      description: 'For providing the external link',
    },
    {
      name: 'post',
      title: 'Post',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'The current images posted by the user',
    },
    {
      name: 'postedbBy',
      title: 'Posted By',
      type: 'reference',
      to: [{type: 'user'}],
      description: 'Details of the user who posted the image',
    },

    {
      name: 'postedDate',
      title: 'Posted Date',
      type: 'datetime',
      description: 'Date and time when the post was published',
    },
  ],
}
