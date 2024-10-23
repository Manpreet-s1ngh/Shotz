export default {
  name: 'user',
  title: 'User',
  type: 'document',
  fields: [
    {
      name: 'userId',
      title: 'UserId',
      type: 'string',
    },
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    {
      name: 'email',
      title: 'Email',
      type: 'email',
    },
    {
      name: 'profilePhoto',
      title: 'ProfilePhoto',
      type: 'url',
     
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        // source: 'name', // Automatically generate slug based on 'name'
        // maxLength: 90,
        source: (doc, context) => context.parent.name,
      },
    },
  ],
}