/**
 * Formats ISO date string or date string to "DD MMM YYYY" (e.g., "07 Oct 2026")
 */
export const formatNoteDate = (isoOrDateStr?: string): string => {
  if (!isoOrDateStr) return '—';
  try {
    const d = new Date(isoOrDateStr);
    if (isNaN(d.getTime())) return isoOrDateStr;
    const day = String(d.getDate()).padStart(2, '0');
    const month = d.toLocaleString('en-US', { month: 'short' });
    const year = d.getFullYear();
    return `${day} ${month} ${year}`;
  } catch {
    return isoOrDateStr;
  }
};
