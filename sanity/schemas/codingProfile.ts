
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'codingProfile',
  title: 'Coding Profile',
  type: 'document',
  fields: [
    defineField({
      name: 'platform',
      title: 'Platform',
      type: 'string',
      options: {
        list: [
          { title: 'LeetCode', value: 'leetcode' },
          { title: 'CodeChef', value: 'codechef' },
          { title: 'Smart Interviews', value: 'smartInterviews' },
          { title: 'HackerRank', value: 'hackerrank' },
          { title: 'Other', value: 'other' },
        ],
        layout: 'dropdown',
      },
    }),
    defineField({
      name: 'username',
      title: 'Username',
      type: 'string',
    }),
    defineField({
      name: 'url',
      title: 'Profile URL',
      type: 'url',
    }),
  ],
})
