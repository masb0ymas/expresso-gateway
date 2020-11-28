module.exports = {
  '/register': {
    post: {
      tags: ['Auth'],
      summary: 'Create New Account',
      requestBody: {
        required: true,
        content: {
          'application/x-www-form-urlencoded': {
            schema: {
              type: 'object',
              properties: {
                fullName: {
                  type: 'string',
                },
                email: {
                  type: 'string',
                },
                newPassword: {
                  type: 'string',
                },
                confirmNewPassword: {
                  type: 'string',
                },
                phone: {
                  type: 'string',
                },
              },
              required: [
                'fullName',
                'email',
                'newPassword',
                'confirmNewPassword',
                'phone',
              ],
            },
          },
        },
      },
      responses: {
        200: {
          description: 'Create New Account',
        },
      },
    },
  },
  '/login': {
    post: {
      tags: ['Auth'],
      summary: 'Login Your Account',
      requestBody: {
        required: true,
        content: {
          'application/x-www-form-urlencoded': {
            schema: {
              type: 'object',
              properties: {
                email: {
                  type: 'string',
                },
                password: {
                  type: 'string',
                },
              },
              required: ['email', 'password'],
            },
          },
        },
      },
      responses: {
        200: {
          description: 'Login Your Account',
        },
      },
    },
  },
  '/profile': {
    get: {
      tags: ['Auth'],
      summary: 'Get Profile',
      produces: ['application/json'],
      security: [
        {
          auth_token: [],
        },
      ],
      responses: {
        200: {
          description: 'Get Profile',
        },
      },
    },
  },
  '/refresh-token': {
    post: {
      tags: ['Auth'],
      summary: 'Get Refresh Token',
      produces: ['application/json'],
      security: [
        {
          auth_token: [],
        },
      ],
      requestBody: {
        required: true,
        content: {
          'application/x-www-form-urlencoded': {
            schema: {
              type: 'object',
              properties: {
                email: {
                  type: 'string',
                },
                refreshToken: {
                  type: 'string',
                },
              },
              required: ['email', 'refreshToken'],
            },
          },
        },
      },
      responses: {
        200: {
          description: 'Logout',
        },
      },
    },
  },
  '/logout': {
    post: {
      tags: ['Auth'],
      summary: 'Logout',
      produces: ['application/json'],
      security: [
        {
          auth_token: [],
        },
      ],
      requestBody: {
        required: true,
        content: {
          'application/x-www-form-urlencoded': {
            schema: {
              type: 'object',
              properties: {
                UserId: {
                  type: 'string',
                },
              },
              required: ['UserId'],
            },
          },
        },
      },
      responses: {
        200: {
          description: 'Logout',
        },
      },
    },
  },
}
