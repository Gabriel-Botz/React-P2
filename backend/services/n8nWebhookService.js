const N8N_WEBHOOK_URL = process.env.N8N_HELP_WEBHOOK_URL;

/**
 * Forward a message to the n8n webhook and return the response.
 * @param {string} message - The message to send to n8n
 * @returns {Promise<string>} The response message from n8n
 */
export async function forwardToN8n(message) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

  try {
    const response = await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`n8n webhook returned ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    
    // Expect n8n to return a response with a message field
    // If it returns something else, we'll try to extract a meaningful message
    if (data && typeof data === 'object') {
      // Try common response formats
      if (data.message) return data.message;
      if (data.reply) return data.reply;
      if (data.response) return data.response;
      if (data.text) return data.text;
      if (data.output) return data.output;
      // If it's an array, try to get the first message/output
      if (Array.isArray(data) && data.length > 0) {
        if (data[0].message) return data[0].message;
        if (data[0].output) return data[0].output;
        if (data[0].reply) return data[0].reply;
        if (data[0].response) return data[0].response;
        if (data[0].text) return data[0].text;
      }
    }
    
    // Fallback: return the raw response as string
    return JSON.stringify(data);
  } catch (error) {
    clearTimeout(timeoutId);
    
    if (error.name === 'AbortError') {
      throw new Error('N8N_TIMEOUT');
    }
    
    throw new Error(`N8N_UPSTREAM_ERROR: ${error.message}`);
  }
}