
import {v4 as uuidv4} from 'uuid';

export default {
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    {
      name: 'categoryId',
      title: 'Category Id ',
      type: 'string',
      initialValue: () => uuidv4(),
    },
    {
      name: 'categoryName',
      title: 'Category Name',
      type: 'string',
    },
  ],
  preview: {
    select: {
      title: 'categoryName', // Use the title field as the display name
    }
  }
}
