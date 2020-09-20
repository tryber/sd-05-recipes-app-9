export const FULL = 'FULL';

export function destravar(bool) {
  return { type: FULL, estado: bool };
}
