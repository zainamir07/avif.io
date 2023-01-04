export async function getHeadings(source: string) {
  const headingLines = source.split("\n").filter((line) => line.match(/^##\s/));

  return headingLines.map((raw) => {
    const text = raw.replace(/^###*\s/, "");
    const href = text.replace(/\s/gi, "").toLowerCase();
    return { text, href: `#${href}` };
  });
}
