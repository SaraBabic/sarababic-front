'use server';

import { QUERIES } from '@framework/gql';

export const fetcher = async (config) => {
    // Get session for API calls (for Serverside Requests we need the session directly)
    const token = config?.token || process.env.API_TOKEN || null;
    const previewToken = config?.previewToken || null;
    const key = config?.key || null;
    const method = config?.method || 'POST';
    const variables = config?.variables || null;
    const headers = config?.headers || null;
    const query = QUERIES?.[key]?.query || config?.query || null;
    const resolver = QUERIES?.[key]?.resolver || null;
    const fetchOptions = {
        headers,
    };
    let url = process.env.API_URL;

    // Add preview token to request preview data
    if (previewToken) {
        url += `?token=${previewToken}`;
    }

    // Add auth header
    if (token) {
        fetchOptions.headers = {
            ...fetchOptions.headers,
            Authorization: `Bearer ${token}`,
        };
    }

    // Add default content-type header
    if (!fetchOptions?.headers?.['Content-Type']) {
        fetchOptions.headers = {
            ...fetchOptions.headers,
            'Content-Type': 'application/json',
        };
    }

    // Check if a valid path was returned
    if (query) {
        let responseRaw = null;
        let response = null;

        // Make the call to our API
        try {
            responseRaw = await fetch(url, {
                method,
                body: JSON.stringify({
                    query,
                    variables,
                }),
                ...fetchOptions,
            });

            response = await responseRaw.json();

            if (response?.errors?.length) {
                response?.errors?.map((error) => {
                    // console.error(error?.trace);
                    console.error(`Error for query "${key}" ::: `, {
                        debugMessage: error?.debugMessage,
                        message: error?.message,
                        extensions: error?.extensions,
                    });
                });
            }
        } catch (error) {
            console.error(`Error fetching data from API for query "${key}" ::: `, {
                response,
                responseRaw,
                error,
            });
        }

        // Check if the response data should be resolved before it is returned
        if (response && resolver) {
            return resolver(response, variables);
        }

        // Otherwise just return the response
        return response;
    } else {
        console.error('An error occurred while fetching the data. No url or query for data fetching provided.');
        // Attach extra info to the error object.
        return { notFound: true };
    }
};
