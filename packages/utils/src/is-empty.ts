export function isEmpty(value: unknown): boolean {
  return (
    typeof value !== "number" && value != null && !Object.keys(value).length
  );
}
