export function setCookieJson(key: string, value: any) {
  document.cookie = `${encodeURIComponent(key)}=${encodeURIComponent(
    JSON.stringify(value)
  )}`;
}

export function getCookieJson(key: string): any {
  const keyValuePairs = document.cookie
    .split(";")
    .map((pair) => pair.split("="));
  const foundPair = keyValuePairs.find(([k]) => k.trim() === key);
  if (!foundPair) {
    return undefined;
  }
  const [, value] = foundPair;
  return JSON.parse(decodeURIComponent(value));
}
