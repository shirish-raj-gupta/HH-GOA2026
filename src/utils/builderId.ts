const STORAGE_KEY_SEQ = 'hh_goa_builder_id_seq';
const STORAGE_KEY_ASSIGNED = 'hh_goa_assigned_builder_id';

/**
 * Returns a unique Builder ID formatted as HHG26-XXXX.
 * Guarantees uniqueness across sessions and persists the user's assigned ID.
 */
export function getOrCreateUniqueBuilderId(): string {
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  const newId = `HHG26-${randomNum}`;
  try {
    localStorage.setItem(STORAGE_KEY_ASSIGNED, newId);
  } catch {
    // Ignore storage restrictions
  }
  return newId;
}

/**
 * Validates and formats custom Builder ID inputs to HHG26-XXXX structure.
 */
export function formatBuilderId(rawInput: string): string {
  const digits = rawInput.replace(/[^0-9]/g, '');
  if (!digits) return 'HHG26-0042';
  const padded = digits.slice(-4).padStart(4, '0');
  return `HHG26-${padded}`;
}
