export const wait = (delay: number): Promise<void> => {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
};

export async function client<T>(url: string): Promise<T> {
  await wait(500);

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch ${url} with status ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
}
