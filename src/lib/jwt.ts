export function decodeJwt(token: string): Record<string, unknown> | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) {
      return null;
    }

    const payload = parts[1];
    const decoded = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
    return JSON.parse(decoded);
  } catch (error) {
    console.error('Failed to decode JWT:', error);
    return null;
  }
}

export function getUserIdFromToken(token: string | null): string | null {
  if (!token) {
    return null;
  }

  const payload = decodeJwt(token);
  if (!payload) {
    return null;
  }

  return (
    (payload.user_id as string) ||
    (payload.sub as string) ||
    (payload.userId as string) ||
    (payload.id as string) ||
    null
  );
}
