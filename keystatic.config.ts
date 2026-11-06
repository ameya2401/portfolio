import { config, fields, collection } from '@keystatic/core';

export default config({
  storage: {
    kind: 'local',
  },
  collections: {
    posts: collection({
      label: 'Posts',
      slugField: 'title',
      path: 'content/blog/*/',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        date: fields.date({ label: 'Date', validation: { isRequired: true } }),
        tag: fields.text({ label: 'Tag', defaultValue: 'Design' }),
        excerpt: fields.text({ label: 'Excerpt', multiline: true }),
        readTime: fields.text({ label: 'Read Time', defaultValue: '3 min read' }),
        content: fields.document({
          label: 'Content',
          formatting: true,
          dividers: true,
          links: true,
          images: {
            directory: 'public/images/blog',
            publicPath: '/images/blog'
          }
        }),
      },
    }),
  },
});
