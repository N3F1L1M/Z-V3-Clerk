

import Typesense from 'typesense';

export const client = new Typesense.Client({
    'nodes': [{
      'host': process.env.TYPESENSE_HOST,   // For Typesense Cloud use xxx.a1.typesense.net
      'port': '443',                        // For Typesense Cloud use 443
      'protocol': 'https'                   // For Typesense Cloud use https
    }],
    'apiKey': process.env.TYPESENSE_API_KEY,
    'connectionTimeoutSeconds': 2
  })