const store = new Map<string, any>();

export const checkThatBeWorks = async (): Promise<{ health: string }> => {
  if (store.has("/be")) {
    return store.get("/be");
  }
  const resp = await fetch("/be");
  if (resp.ok) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const data = await resp.json();
    store.set("/be", data);
    return data;
  } else {
    const error = store.set("/be", new Error("BE is not available"));
    throw error;
  }
};
