
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'resume',
  title: 'Resume',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'e.g., My Latest Resume',
    }),
    defineField({
      name: 'file',
      title: 'Resume File',
      type: 'file',
      options: {
        accept: 'application/pdf',
      },
    }),
  ],
})
