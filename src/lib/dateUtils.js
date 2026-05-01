// Small, dependency-free date helpers.
// Centralised so any component that needs "today" / "this year" gets a
// consistent value and we never hard-code the year anywhere.

export function getCurrentYear() {
  return new Date().getFullYear();
}

export function getCurrentISODate() {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

export function getCurrentTime24() {
  const d = new Date();
  const hh = String(d.getHours()).padStart(2, '0');
  const mm = String(d.getMinutes()).padStart(2, '0');
  return `${hh}:${mm}`;
}
