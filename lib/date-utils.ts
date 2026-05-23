export function formatThaiDate(date: string | Date): string {
  const d = typeof date === "string" ? new Date(date) : date;
  // Ensure valid date
  if (isNaN(d.getTime())) return "-";
  // Thai locale with Buddhist Era year adjustment
  const formatter = new Intl.DateTimeFormat("th-TH", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  return formatter.format(d);
}
