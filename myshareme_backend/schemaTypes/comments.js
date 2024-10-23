// schemas/comment.js
import { v4 as uuidv4 } from 'uuid';

export default {
  name: 'comment',
  title: 'Comment',
  type: 'document',
  fields: [
    {
      name: 'commentId',
      title: 'Comment ID',
      type: 'string',
      description: 'A unique identifier for the comment',
      initialValue: () => uuidv4(), // Use UUID to generate a unique comment ID
    },
    {
      name: 'post',
      title: 'Post',
      type: 'reference',
      to: [{ type: 'post' }], // Reference to the post this comment belongs to
      description: 'The post that this comment is associated with',
    },
    {
      name: 'user',
      title: 'User',
      type: 'reference',
      to: [{ type: 'user' }], // Reference to the user who made the comment
      description: 'The user who made the comment',
    },
    {
      name: 'content',
      title: 'Content',
      type: 'text',
      description: 'The content of the comment',
    },
    {
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      description: 'The date and time when the comment was created',
    },
  ],
}