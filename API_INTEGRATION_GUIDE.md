# EcoRide Website API Integration Guide

This guide explains how to connect your new `ecoridemw.com` frontend (React + TypeScript) to your existing API backend hosted on another domain.

## 1. Environment Variables

Store your API base URL in an environment variable so that you can easily switch between your local development server and your production API server.

1.  Create a `.env` file in the root of your `ecoride-website` project:
    ```env
    VITE_API_BASE_URL=https://api.yourbackenddomain.com/v1
    ```
2.  In Vite, variables prefixed with `VITE_` are automatically exposed to your client-side code via `import.meta.env`.

## 2. API Utility Configuration

Create a central utility file (e.g., `src/utils/api.ts`) to handle all external requests using the native `fetch` API. This ensures consistent headers and error handling.

> [!TIP]
> Standardizing all API calls through a single utility file makes it easier to add features like authentication tokens or global error handlers later on.

```typescript
// src/utils/api.ts

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface RequestOptions extends RequestInit {
  data?: any;
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

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Failed to fetch ${endpoint}:`, error);
    throw error;
  }
};
```

## 3. Hooking up the API in a Component

Now, you can import and use this utility wherever you need to interact with your external API. For example, to submit the Contact form:

```typescript
// example usage in src/sections/Contact.tsx
import React, { useState } from 'react';
import { apiFetch } from '../utils/api';

export const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // POST request to https://api.yourbackenddomain.com/v1/contact
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

Because your front end (`https://ecoridemw.com`) and your API are on different domains, the browser will likely block requests unless your backend server explicitly allows them.

**On your backend server (e.g., Express.js, Django, Laravel):**
You must configure your CORS policy to allow requests originating from `https://ecoridemw.com`. 

Example configuring CORS in an Express.js/Node API:

```javascript
const cors = require('cors');

const corsOptions = {
  origin: ['https://ecoridemw.com', 'http://localhost:5173'], // Add localhost for dev
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
```

## 5. Deployment Checks on Vercel

When deploying this frontend to Vercel:
1. Go to your project settings in Vercel.
2. Navigate to **Environment Variables**.
3. Add `VITE_API_BASE_URL` and set its value to your production backend URL.
4. Vercel will embed this URL during the build process, ensuring your live site connects to the correct API.
