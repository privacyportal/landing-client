<script>
  import { page } from '$app/stores';
  import FlexContainer from '$lib/components/common/FlexContainer.svelte';
  import GridContainer from '$lib/components/common/GridContainer.svelte';
  import ApiRequest from '$lib/components/documentation/ApiRequest.svelte';
  import SideBarGroup from './SideBarGroup.svelte';
  import Authentication from './Authentication.svelte';
  import Introduction from './Introduction.svelte';
  import { DOMAIN } from '$lib/modules/constants';

  const requests = [
    {
      name: 'Mail Relay',
      summary: 'Mail Relay api for managing privacy aliases',
      requests: [
        {
          id: 'get-addresses-new',
          name: 'New Alias Suggestion',
          path: '/addresses/new',
          method: 'GET',
          summary:
            'Returns a new Privacy Alias suggestion that would need to be created using a POST request before use. This step is not required unless you want to have the ability to modify the suggestion before creating the alias.',
          authorization: 'API Key Authentication',
          responses: {
            '200': {
              description: 'New Suggestion Returned',
              content: {
                'application/json': {
                  schema: [
                    {
                      name: 'address',
                      type: 'string',
                      description: 'suggested privacy alias'
                    }
                  ],
                  example: {
                    address: 'max.power.2000@pportal.io'
                  }
                }
              }
            },
            '400': {
              description: 'Upgrade to Enhanced Protection for more addresses.'
            }
          }
        },

        {
          id: 'create-address',
          name: 'Create New Alias',
          path: '/addresses/new',
          method: 'POST',
          summary: 'Creates a new Privacy Alias that forwards mail to the main mailbox.',
          authorization: 'API Key Authentication',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: [
                  {
                    name: 'label',
                    required: true,
                    type: 'string',
                    example: 'https://privacy-newsletter.example',
                    description: 'label for the Privacy Alias. When signing up to a website using the website URL is recommended for good interoperability with the browser extensions.'
                  },
                  {
                    name: 'address',
                    type: 'string',
                    example: 'max.power.2000@pportal.io',
                    description: 'If you have already requested an alias suggestion, you can pass it here. Otherwise a new alias will be created.'
                  },
                  {
                    name: 'note',
                    type: 'string',
                    example: 'used to sign up to the privacy newsletter',
                    description: 'You can add a note to your alias for future use.'
                  },
                  {
                    name: 'unique',
                    type: 'boolean',
                    example: 'true',
                    description:
                      'If unique is set to true, the server will only create an alias if no other alias exists under the same label. If a match is found, the server will simply return the existing alias.'
                  }
                ],
                example: {
                  label: 'https://website.example',
                  address: 'max.power.2000@pportal.io',
                  note: 'Alias used to create a website.example account',
                  unique: false
                }
              }
            }
          },
          responses: {
            '200': {
              description: 'Matching Privacy Alias Returned',
              content: {
                'application/json': {
                  schema: [
                    {
                      name: 'id',
                      type: 'string',
                      example: '32d3cf3c-0078-4ef4-867b-d3f8819913e0',
                      description: 'Unique identifier for the new alias'
                    },
                    {
                      name: 'label',
                      type: 'string',
                      example: 'https://privacy-newsletter.example',
                      description: 'Provided label for the new Privacy Alias.'
                    },
                    {
                      name: 'value',
                      type: 'string',
                      example: 'max.power.2000@pportal.io',
                      description: 'The Privacy Alias created.'
                    },
                    {
                      name: 'note',
                      type: 'string',
                      example: 'used to sign up to the privacy newsletter',
                      description: 'The Privacy Alias created.'
                    },
                    {
                      name: 'fwd_to',
                      type: 'string',
                      example: '66aa0d9b-8846-4db3-9b02-5bb9c16e04e3',
                      description: 'Id of the mailbox to which emails will be forwarded.'
                    },
                    {
                      name: 'created_at',
                      type: 'number',
                      example: 1715957381841,
                      description: 'Creation timestamp.'
                    },
                    {
                      name: 'updated_at',
                      type: 'number',
                      example: 1715957381841,
                      description: 'Last update timestamp.'
                    }
                  ]
                }
              }
            },
            '201': {
              description: 'New Privacy Alias Created',
              content: {
                'application/json': {
                  schema: [
                    {
                      name: 'id',
                      type: 'string',
                      example: '32d3cf3c-0078-4ef4-867b-d3f8819913e0',
                      description: 'Unique identifier for the new alias'
                    },
                    {
                      name: 'label',
                      type: 'string',
                      example: 'https://privacy-newsletter.example',
                      description: 'Provided label for the new Privacy Alias.'
                    },
                    {
                      name: 'value',
                      type: 'string',
                      example: 'max.power.2000@pportal.io',
                      description: 'The Privacy Alias created.'
                    },
                    {
                      name: 'note',
                      type: 'string',
                      example: 'used to sign up to the privacy newsletter',
                      description: 'The Privacy Alias created.'
                    },
                    {
                      name: 'fwd_to',
                      type: 'string',
                      example: '66aa0d9b-8846-4db3-9b02-5bb9c16e04e3',
                      description: 'Id of the mailbox to which emails will be forwarded.'
                    },
                    {
                      name: 'created_at',
                      type: 'number',
                      example: 1715957381841,
                      description: 'Creation timestamp.'
                    },
                    {
                      name: 'updated_at',
                      type: 'number',
                      example: 1715957381841,
                      description: 'Last update timestamp.'
                    }
                  ],
                  example: {
                    id: '32d3cf3c-0078-4ef4-867b-d3f8819913e0',
                    label: 'https://privacy-newsletter.example',
                    value: 'max.power.2000@pportal.io',
                    note: 'The Privacy Alias created.',
                    fwd_to: '66aa0d9b-8846-4db3-9b02-5bb9c16e04e3',
                    created_at: 1715957381841,
                    updated_at: 1715957381841
                  }
                }
              }
            },
            '400': {
              description: 'Upgrade to Enhanced Protection for more addresses.'
            }
          }
        }
      ]
    },
    {
      name: 'Privacy Portal Account',
      summary: 'APIs for managing your Privacy Portal Account',
      requests: [
        {
          id: 'get-api-key',
          name: 'API key Info',
          path: '/api-keys/{:key_id}',
          method: 'GET',
          summary: 'Returns the information of the current authentication key',
          authorization: 'API Key Authentication',
          pathParameters: [
            {
              name: 'key_id',
              required: true,
              type: 'string',
              example: '2c41e8c9-34ef-4465-8e0e-85cbbfd82779',
              description: 'Key ID (must match the Key used in the authorization header)'
            }
          ],
          responses: {
            '200': {
              description: 'Successfully returns the API Key information',
              content: {
                'application/json': {
                  schema: [
                    {
                      name: 'label',
                      type: 'string',
                      description: 'Key Label'
                    },
                    {
                      name: 'key',
                      type: 'string',
                      description: 'Key ID'
                    },
                    {
                      name: 'created_at',
                      type: 'number',
                      description: 'Key creation timestamp'
                    },
                    {
                      name: 'expires_at',
                      type: 'number',
                      description: 'Key expiration timestamp'
                    }
                  ],
                  example: {
                    label: 'Awesome App',
                    key: '<KEY_ID>',
                    created_at: 1715974583353,
                    expires_at: 1723750583353
                  }
                }
              }
            },
            '401': {
              description: 'Unauthorized'
            }
          }
        },
        {
          id: 'del-api-key',
          name: 'Delete API key',
          path: '/api-keys/{:key_id}',
          method: 'DELETE',
          summary: 'Deletes an API Key',
          authorization: 'API Key Authentication',
          pathParameters: [
            {
              name: 'key_id',
              required: true,
              type: 'string',
              example: '2c41e8c9-34ef-4465-8e0e-85cbbfd82779',
              description: 'Key ID (must match the Key used in the authorization header)'
            }
          ],
          responses: {
            '200': {
              description: 'Successfully returns the API Key information',
              content: {
                'application/json': {
                  schema: [
                    {
                      name: 'success',
                      type: 'boolean',
                      example: true,
                      description: 'returns true if successfully deleted'
                    }
                  ],
                  example: {
                    success: true
                  }
                }
              }
            },
            '400': {
              description: 'API key not found.'
            }
          }
        }
      ]
    },
    {
      name: 'OAUTH2 - Back Channel',
      summary: 'Sign In with Privacy Portal - back channel APIs used by Relying Parties',
      requests: [
        {
          id: 'oauth_token',
          name: 'Issue Access Token',
          path: '/oauth/token',
          method: 'POST',
          summary: 'OAUTH2 back-channel request called from Relying Parties to issue Access Tokens',
          authorization: 'Implicit Authentication',
          queryParams: {
            content: {
              'application/x-www-form-urlencoded': {
                schema: [
                  {
                    name: 'client_id',
                    required: true,
                    type: 'string',
                    description: 'Relying Party client_id created using the Privacy Portal app.'
                  },
                  {
                    name: 'client_secret',
                    type: 'string',
                    description: 'Relying Party client_secret created using the Privacy Portal app. Required for Confidential clients.'
                  },
                  {
                    name: 'grant_type',
                    required: true,
                    type: 'string',
                    example: 'authorization_code',
                    description: 'OAUTH2 grant type. Accepted values: "authorization_code" or "refresh_token".'
                  },
                  {
                    name: 'code',
                    type: 'string',
                    description: 'OAUTH2 authorization code received from authorization callback. This is required if the grant_type is "authorization_code".'
                  },
                  {
                    name: 'refresh_token',
                    type: 'string',
                    description: 'OAUTH2 refresh_token. This is required if the grant_type is "refresh_token".'
                  },
                  {
                    name: 'redirect_uri',
                    type: 'string',
                    description: 'The redirect_uri is used with "authorization_code" grant_type. It is required if the OAUTH2 app has more than one callback URLs.'
                  },
                  {
                    name: 'scope',
                    type: 'string',
                    example: 'openid name email',
                    description:
                      'The scope can be used with "refresh_token" grant_type. It allows you to Relying Parties to reduce the scope of requested Access Token when needed. You can get the full list of supported scopes at https://api.privacyportal.org/.well-known/openid-configuration'
                  },
                  {
                    name: 'code_verifier',
                    type: 'string',
                    description:
                      'PKCE code verifier is a high-entropy cryptographic random STRING with a minimum length of 43 characters and a maximum length of 128 characters. Allowed characters: [A-Z] / [a-z] / [0-9] / "-" / "." / "_" / "~".'
                  }
                ],
                example: {
                  client_id: '0388dc0d-5b11-4e0f-ae38-faed564fa9fe',
                  client_secret: '7e467f24-d2d8-4f9e-afe0-18d79de48818',
                  grant_type: 'authorization_code',
                  code: '92ec0c29-e4f7-4959-9509-94e455992eab',
                  redirect_uri: 'https://awesome-app.example/oauth/callback'
                }
              }
            }
          },
          requestBody: {
            content: {
              'application/json': {
                schema: [
                  {
                    name: 'client_id',
                    required: true,
                    type: 'string',
                    description: 'Relying Party client_id created using the Privacy Portal app.'
                  },
                  {
                    name: 'client_secret',
                    type: 'string',
                    description: 'Relying Party client_secret created using the Privacy Portal app. Required for Confidential clients.'
                  },
                  {
                    name: 'grant_type',
                    required: true,
                    type: 'string',
                    example: 'authorization_code',
                    description: 'OAUTH2 grant type. Accepted values: "authorization_code" or "refresh_token".'
                  },
                  {
                    name: 'code',
                    type: 'string',
                    description: 'OAUTH2 authorization code received from authorization callback. This is required if the grant_type is "authorization_code".'
                  },
                  {
                    name: 'refresh_token',
                    type: 'string',
                    description: 'OAUTH2 refresh_token. This is required if the grant_type is "refresh_token".'
                  },
                  {
                    name: 'redirect_uri',
                    type: 'string',
                    description: 'The redirect_uri is used with "authorization_code" grant_type. It is required if the OAUTH2 app has more than one callback URLs.'
                  },
                  {
                    name: 'scope',
                    type: 'string',
                    example: 'openid name email',
                    description:
                      'The scope can be used with "refresh_token" grant_type. It allows you to Relying Parties to reduce the scope of requested Access Token when needed. You can get the full list of supported scopes at https://api.privacyportal.org/.well-known/openid-configuration'
                  }
                ],
                example: {
                  client_id: '0388dc0d-5b11-4e0f-ae38-faed564fa9fe',
                  client_secret: '7e467f24-d2d8-4f9e-afe0-18d79de48818',
                  grant_type: 'authorization_code',
                  code: '92ec0c29-e4f7-4959-9509-94e455992eab',
                  redirect_uri: 'https://awesome-app.example/oauth/callback'
                }
              }
            }
          },
          responses: {
            '200': {
              description: 'OK',
              content: {
                'application/json': {
                  schema: [
                    {
                      name: 'access_token',
                      type: 'string',
                      description: 'This is the issued Access Token. You can use this token to call the Resource Service APIs in order to access the resources that the user has authorized you.'
                    },
                    {
                      name: 'token_type',
                      type: 'string',
                      description: 'Type of access_token. Currently only supports the type: "Bearer".'
                    },
                    {
                      name: 'id_token',
                      type: 'string',
                      description: 'This is the ID Token in JWT format. You MUST verify its signature against our JSON Web Keys (JWKs) published at: https://api.privacyportal.org/oauth/keys'
                    },
                    {
                      name: 'refresh_token',
                      type: 'string',
                      description: 'The refresh token is returned if the grant_type used was "authorization_code".'
                    },
                    {
                      name: 'expires',
                      type: 'number',
                      example: 86400,
                      description: 'The validity duration in seconds before the access token expires.'
                    }
                  ],
                  example: {
                    access_token: '<ACCESS_TOKEN>',
                    token_type: 'Bearer',
                    id_token: '<JWT_ID_TOKEN>',
                    refresh_token: '<REFRESH_TOKEN>',
                    expires: 86400
                  }
                }
              }
            },
            '400': {
              description: 'Missing or invalid parameters...',
              content: {
                'application/json': {
                  schema: [
                    {
                      name: 'error',
                      type: 'string',
                      example: 'invalid_client',
                      description: 'error code.'
                    },
                    {
                      name: 'error_description',
                      type: 'string',
                      example: 'App not found.',
                      description: 'error description.'
                    }
                  ],
                  example: {
                    error: 'invalid_client',
                    error_description: 'App not found.'
                  }
                }
              }
            }
          }
        },

        {
          id: 'oauth_revoke_token',
          name: 'Revoke Refresh Token',
          path: '/oauth/revoke',
          method: 'POST',
          summary: 'OAUTH2 back-channel request called from Relying Parties to revoke refresh tokens',
          authorization: 'Implicit Authentication',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: [
                  {
                    name: 'client_id',
                    required: true,
                    type: 'string',
                    description: 'Relying Party client_id created using the Privacy Portal app.'
                  },
                  {
                    name: 'client_secret',
                    type: 'string',
                    description: 'Relying Party client_secret created using the Privacy Portal app. Required for Confidential clients.'
                  },
                  {
                    name: 'refresh_token',
                    required: true,
                    type: 'string',
                    description: 'The refresh token to be revoked.'
                  }
                ],
                example: {
                  client_id: '0388dc0d-5b11-4e0f-ae38-faed564fa9fe',
                  client_secret: '7e467f24-d2d8-4f9e-afe0-18d79de48818',
                  refresh_token: '<REFRESH_TOKEN>'
                }
              }
            }
          },
          responses: {
            '200': {
              description: 'Refresh Token Revoked',
              content: {
                'application/json': {
                  schema: [
                    {
                      name: 'success',
                      type: 'boolean',
                      example: true,
                      description: 'Returns true when the refresh token is successfully revoked.'
                    }
                  ],
                  example: {
                    success: true
                  }
                }
              }
            },
            '400': {
              description: 'Invalid Refresh Token.',
              content: {
                'application/json': {
                  schema: [
                    {
                      name: 'error',
                      type: 'string',
                      example: 'invalid_request',
                      description: 'error code.'
                    },
                    {
                      name: 'error_description',
                      type: 'string',
                      example: 'Invalid Refresh Token.',
                      description: 'error description.'
                    }
                  ],
                  example: {
                    error: 'invalid_request',
                    error_description: 'Invalid Refresh Token.'
                  }
                }
              }
            }
          }
        }
      ]
    },

    {
      name: 'OAUTH2 - Resource Services',
      summary: 'Resource Services - authenticated with Access Tokens as authorization headers of type "Bearer"',
      requests: [
        {
          id: 'openid_userinfo',
          name: 'Get User Info',
          path: '/oauth/userinfo',
          method: 'GET',
          summary: 'Request to get OpenID user info.',
          authorization: 'Bearer Access Token',
          responses: {
            '200': {
              description: 'User Info Returned according to authorized scope',
              content: {
                'application/json': {
                  schema: [
                    {
                      name: 'sub',
                      type: 'string',
                      description: 'Client specific User ID.'
                    },
                    {
                      name: 'name',
                      type: 'string',
                      description: 'Name of user as provided by the user during the client authorization process. This is only provided if the scope contains "name".'
                    },
                    {
                      name: 'email',
                      type: 'string',
                      description: 'Privacy Alias assigned to this client. This is only provided if the scope contains "email".'
                    }
                  ],
                  example: {
                    sub: '54b0a404-9d83-4c8a-a9af-0628fc281340',
                    name: 'Max Power',
                    email: 'max.power.2000@pportal.io'
                  }
                }
              }
            },
            '401': {
              description: 'Unauthorized'
            }
          }
        },
        {
          id: 'new_api_key',
          name: 'Create API Key',
          path: '/api-keys/new',
          method: 'POST',
          summary: 'Creates a new API Key. Requires OAUTH2 scope "w:api_keys"',
          authorization: 'Bearer Access Token',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: [
                  {
                    name: 'label',
                    required: true,
                    type: 'string',
                    description: 'API Key label'
                  }
                ]
              }
            }
          },
          responses: {
            '201': {
              description: 'API Key created successfully.',
              content: {
                'application/json': {
                  schema: [
                    {
                      name: 'label',
                      type: 'string',
                      description: 'API Key label'
                    },
                    {
                      name: 'key',
                      type: 'string',
                      description: 'Key ID'
                    },
                    {
                      name: 'secret',
                      type: 'string',
                      description: 'Key Secret'
                    },
                    {
                      name: 'expires_at',
                      type: 'number',
                      description: 'Key expiration timestamp'
                    },
                    {
                      name: 'created_at',
                      type: 'number',
                      description: 'Key creation timestamp'
                    }
                  ],
                  example: {
                    label: 'Awesome App',
                    key: '<KEY_ID>',
                    secret: '<KEY_SECRET>',
                    expires_at: 1723750583353,
                    created_at: 1715974583353
                  }
                }
              }
            },
            '401': {
              description: 'Unauthorized'
            }
          }
        }
      ]
    },
    {
      name: 'OAUTH2 - OpenID',
      summary: 'Sign In with Privacy Portal - OpenID APIs',
      requests: [
        {
          id: 'oauth_jwks',
          name: 'Get JSON Web Keys',
          path: '/oauth/keys',
          method: 'GET',
          summary: 'OpenID JWK endpoint used to validate ID Tokens',
          authorization: 'Public',
          responses: {
            '200': {
              description: 'List of keys available returned.',
              content: {
                'application/json': {
                  schema: [
                    {
                      name: 'keys',
                      type: 'Array of JWK objects',
                      description: 'Returns an array of JSON Web Keys. Please use the "kid" provided as a claim in the id_token payload to find the corresponding JWK.'
                    }
                  ],
                  example: {
                    keys: [
                      {
                        key_ops: ['verify'],
                        ext: true,
                        kty: 'RSA',
                        n: 'zsrMUox6rNAFhggI0SVSYGARhUdIV-DwRCZosCihaGLK7yeJ-14R3Bjk5GsWRRDdTowJKGd5JOK9NNnQcI83xuHWPbN2JZmCmS3X6HGUFKZPF-CQYIMUd4eNOG0vxu2HT2FccTQUDvBdJyjjtL0aM9WSBXaF772DW67TKwLc_PMS_V4O_Zsp2RXCe30Yng9yRCAgsK40dRRoQrs8YHYg10CPl1n-UJXrF_oT-V2Rpz9Osw0rkZT4iOgUbo7wffcq_1xPaICTLhQKCZLVDYuYfpWXeidnPg8iVumFTdjGFX_oL1O8m-pSTG1-Yqj3gIS9Ry2eLwj1wiG2R4LplpUKkw',
                        e: 'AQAB',
                        alg: 'PS256',
                        kid: 'vL0j4YuT'
                      }
                    ]
                  }
                }
              }
            }
          }
        },
        {
          id: 'openid-config',
          name: 'Get OpenId Config',
          path: '/.well-known/openid-configuration',
          method: 'GET',
          summary: 'Get OpenID configuration using the ".well-known" standard endpoint',
          authorization: 'Public',
          responses: {
            '200': {
              description: 'OpenID config returned.',
              content: {
                'application/json': {
                  schema: [
                    {
                      name: 'issuer',
                      type: 'string',
                      description: 'OAUTH2 issuer URI.'
                    },
                    {
                      name: 'authorization_endpoint',
                      type: 'string',
                      description: 'OAUTH2 authorization URI.'
                    },
                    {
                      name: 'token_endpoint',
                      type: 'string',
                      description: 'OAUTH2 token URI.'
                    },
                    {
                      name: 'userinfo_endpoint',
                      type: 'string',
                      description: 'OpenID userinfo URI.'
                    },
                    {
                      name: 'jwks_uri',
                      type: 'string',
                      description: 'OpenID JWKS URI.'
                    },
                    {
                      name: 'response_types_supported',
                      type: 'string[]',
                      description: 'Array of supported response types.'
                    },
                    {
                      name: 'subject_types_supported',
                      type: 'string[]',
                      description: 'Subject types supported'
                    },
                    {
                      name: 'id_token_signing_alg_values_supported',
                      type: 'string[]',
                      description: 'id_token signing algorithms supported'
                    },
                    {
                      name: 'scopes_supported',
                      type: 'string[]',
                      description: 'OAUTH2 scopes supported'
                    },
                    {
                      name: 'token_endpoint_auth_methods_supported',
                      type: 'string[]',
                      description: 'Token endpoint authentication methods supported'
                    },
                    {
                      name: 'claims_supported',
                      type: 'string[]',
                      description: 'OAUTH2 Claims supported'
                    },
                    {
                      name: 'grant_types_supported',
                      type: 'string[]',
                      description: 'OAUTH2 grant types supported'
                    }
                  ]
                }
              }
            }
          }
        }
      ]
    }
  ];

  let bgColor = 'var(--dark-color)';
  let selected = selectFromUrl($page.url.hash);

  function handleInView(value) {
    selected = value;
  }

  function selectFromUrl(hash) {
    if (hash?.length) {
      let id = $page.url.hash.substring(1);
      for (const { name, requests: groupRequests } of requests) {
        if (groupRequests.findIndex((item) => item.id === id) !== -1) {
          return { group: name, id };
        }
      }
    } else {
      return undefined;
    }
  }
</script>

<svelte:head>
  <link rel="canonical" href={`https://${DOMAIN}/developers`} />
</svelte:head>

<GridContainer template_columns="max(15vw, 180px) 1fr" mobile_template_columns="1fr" padding="50px 0px 0px 0px">
  <div>
    <FlexContainer globalClass={['sidebar']} height="calc(100vh - 131px)" width="max(15vw, 180px)" column nomobile autooverflow>
      <FlexContainer column bgColor="var(--new-layer-color)" margin="0.5rem" padding="2rem 1rem" gap="0.5rem">
        <h4 class="no-margin">API Documentation</h4>
        <span class="xs"><strong>Hello Developers!</strong><br />Please use Github Issues to suggest any improvements to our API documentation.<br />Happy coding!</span>
      </FlexContainer>
      {#each requests as { name, requests }}
        <SideBarGroup {selected} {name} {requests} />
      {/each}
    </FlexContainer>
  </div>
  <FlexContainer column nooverflowX nooverflowY>
    <GridContainer width="100%" align_items="stretch" template_columns="1fr 1fr" mobile_template_columns="1fr" gap="1rem">
      <Introduction />
      <FlexContainer {bgColor} nomobile />
    </GridContainer>
    <GridContainer width="100%" align_items="stretch" template_columns="1fr 1fr" mobile_template_columns="1fr" gap="1rem">
      <Authentication />
      <FlexContainer {bgColor} nomobile />
    </GridContainer>
    {#each requests as { name, summary, requests }}
      <GridContainer width="100%" align_items="stretch" template_columns="1fr 1fr" mobile_template_columns="1fr" gap="1rem">
        <FlexContainer column padding="2rem 0.5rem 0rem 1.5rem" gap="0.5rem">
          <h2 class="no-margin">{name}</h2>
          {#if summary}
            <span>{summary}</span>
          {/if}
        </FlexContainer>
        <FlexContainer {bgColor} nomobile />
      </GridContainer>
      {#each requests as request}
        <ApiRequest {bgColor} handleInView={() => handleInView({ group: name, id: request.id })} {...request} />
      {/each}
    {/each}
  </FlexContainer>
</GridContainer>

<style>
  :global(.sidebar) {
    position: fixed;
    top: 50px;
  }

  h2 {
    font-size: 2rem;
    font-weight: 900;
  }
</style>
