
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'contactInfo',
  title: 'Contact Info',
  type: 'document',
  fields: [
    defineField({
      name: 'linkedin',
      title: 'LinkedIn Profile URL',
      type: 'url',
    }),
    defineField({
      name: 'github',
      title: 'GitHub Profile URL',
      type: 'url',
    }),
    defineField({
      name: 'email',
      title: 'Email Address',
      type: 'string',
    }),
  ],
})
