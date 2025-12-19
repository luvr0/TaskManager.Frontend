type TokenSubscriber = (token: string | null) => void;
interface LogoutListener {
  (): void;
}

let inMemoryAccessToken: string | null = null;
const tokenSubscribers = new Set<TokenSubscriber>();
const logoutSubscribers = new Set<LogoutListener>();

export function getAccessToken(): string | null {
  return inMemoryAccessToken;
}

export function setAccessToken(token: string | null): void {
  inMemoryAccessToken = token;
  tokenSubscribers.forEach((listener) => listener(token));
}

export function subscribeToAccessToken(listener: TokenSubscriber): () => void {
  tokenSubscribers.add(listener);
  return () => tokenSubscribers.delete(listener);
}

export function onForcedLogout(listener: LogoutListener): () => void {
  logoutSubscribers.add(listener);
  return () => logoutSubscribers.delete(listener);
}

export function emitForcedLogout(): void {
  logoutSubscribers.forEach((listener) => listener());
}

export function resetTokenStore(): void {
  inMemoryAccessToken = null;
  tokenSubscribers.clear();
  logoutSubscribers.clear();
}
