interface FetchOptions {
  // Другие свойства
}

interface FetchWithRetryOptions extends FetchOptions {
  tries?: number;
}

function fetchWithRetry(
  url: string,
  options: FetchWithRetryOptions = {},
): Promise<Response> {
  const { tries = 1, ...fetchOptions } = options;

  function onError(err: Error): Promise<Response> {
    const triesLeft = tries - 1;
    if (!triesLeft) {
      return Promise.reject(err);
    }

    return fetchWithRetry(url, { ...fetchOptions, tries: triesLeft });
  }

  return fetch(url, fetchOptions).catch(onError);
}
