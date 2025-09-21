
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'goal',
  title: 'Goal',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Goal Title',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Not Started', value: 'notStarted' },
          { title: 'In Progress', value: 'inProgress' },
          { title: 'Completed', value: 'completed' },
          { title: 'On Hold', value: 'onHold' },
        ],
        layout: 'dropdown',
      },
    }),
    defineField({
      name: 'dueDate',
      title: 'Due Date',
      type: 'date',
    }),
  ],
})
