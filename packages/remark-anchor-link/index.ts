export function main() {
  return "Hello, World!";
}

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest;

  it("should return Hello, World!", () => {
    expect(main()).toBe("Hello, World!");
  });
}
