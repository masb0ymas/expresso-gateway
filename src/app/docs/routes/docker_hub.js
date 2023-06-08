module.exports = {
  '/docker-hub': {
    get: {
      tags: ['Webhook - Docker Hub'],
      summary: 'Webhook Docker Hub',
      responses: {
        200: {
          description: 'Webhook Docker Hub',
        },
      },
    },
  },
  '/docker-hub/send-telegram': {
    post: {
      tags: ['Webhook - Docker Hub'],
      summary: 'Post to Telegram',
      parameters: [
        {
          in: 'query',
          name: 'chatId',
          required: true,
          schema: {
            type: 'string',
          },
          description: 'Chat ID Telegram',
        },
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                'push_data.tag': {
                  type: 'string',
                },
                'repository.name': {
                  type: 'string',
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: 'Post to Telegram',
        },
      },
    },
  },
  '/docker-hub/send-slack': {
    post: {
      tags: ['Webhook - Docker Hub'],
      summary: 'Post to Slack',
      parameters: [
        {
          in: 'query',
          name: 'channel',
          required: true,
          schema: {
            type: 'string',
          },
          description: 'Slack Channel',
        },
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                'push_data.tag': {
                  type: 'string',
                },
                'repository.name': {
                  type: 'string',
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: 'Post to Slack',
        },
      },
    },
  },
}
