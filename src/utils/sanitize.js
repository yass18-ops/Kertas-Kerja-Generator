export const sanitizeName = (name) => {
  if (!name) return '';
  // Case-insensitive replacement of "Bin", "Binti", "b.", "bt."
  // Ensure we match whole words using word boundaries
  return name.replace(/\b(bin|binti|b\.|bt\.)\b/gi, '').replace(/\s+/g, ' ').trim();
};
