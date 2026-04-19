# Ecoride Website API Integration Guide

This guide explains how to connect the new `ecoridemw.com` frontend built with Next.js App Router and TypeScript to an API hosted on another domain.

## 1. Environment Variables

Store your API base URL in an environment variable so that you can switch between local and production API targets without changing application code.

1.  Create a `.env.local` file in the root of the project:
    ```env
  NEXT_PUBLIC_API_BASE_URL=https://api.yourbackenddomain.com/v1
    ```
2.  In Next.js, variables prefixed with `NEXT_PUBLIC_` are exposed to browser-side code.

## 2. API Utility Configuration

Create a central utility file to handle external requests with the native `fetch` API. In this repo the service entry point lives in `src/services/api-client.ts`.

> [!TIP]
> Standardizing all API calls through a single utility file makes it easier to add features like authentication tokens or global error handlers later on.

```typescript
// src/services/api-client.ts

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? '';

interface RequestOptions extends RequestInit {
  data?: unknown;
}

export const apiFetch = async <T>(endpoint: string, options: RequestOptions = {}): Promise<T> => {
  const { data, headers, ...customConfig } = options;

  const config: RequestInit = {
    method: data ? 'POST' : 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    ...customConfig,
  };

  if (data) {
    config.body = JSON.stringify(data);
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

  if (!response.ok) {
    throw new Error(`API error: ${response.status} ${response.statusText}`);
  }

  return (await response.json()) as T;
};
```

## 3. Hooking up the API in a Component

You can import the helper wherever you need to interact with the backend. For example, a later contact or interest form could call it like this:

```typescript
// example usage in a client or server action wrapper
import React, { useState } from 'react';
import { apiFetch } from '@/services/api-client';

export const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await apiFetch<{ success: boolean }>('/contact', {
        method: 'POST',
        data: formData
      });
      alert('Message sent successfully!');
    } catch (error) {
      alert('Failed to send message.');
    }
  };

  return (
    // Your form JSX goes here, attaching handleSubmit to onSubmit event
  );
};
```

## 4. Dealing with CORS (Cross-Origin Resource Sharing)

Because the website and API may live on different domains, the browser will block requests unless the backend explicitly allows the website origin.

**On your backend server (e.g., Express.js, Django, Laravel):**
You must configure your CORS policy to allow requests originating from `https://ecoridemw.com`. 

Example configuring CORS in an Express.js/Node API:

```javascript
const cors = require('cors');

const corsOptions = {
  origin: ['https://ecoridemw.com', 'http://localhost:3003'],
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
```

## 5. Deployment Checks on Vercel

When deploying this frontend to Vercel:
1. Go to your project settings in Vercel.
2. Navigate to **Environment Variables**.
3. Add `NEXT_PUBLIC_API_BASE_URL` and set its value to the production backend URL.
4. Redeploy so the public client bundle receives the updated value.
