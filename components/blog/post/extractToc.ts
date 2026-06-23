export type TocItem = { id: string; text: string; level: number };

export function extractToc(markdown: string): TocItem[] {
  const lines = markdown.split('\n');
  const items: TocItem[] = [];
  let inCode = false;

  for (const line of lines) {
    if (line.trim().startsWith('```')) {
      inCode = !inCode;
      continue;
    }
    if (inCode) continue;

    const m = line.match(/^(#{2,3})\s+(.+)/);
    if (m) {
      const level = m[1].length;
      const text = m[2].replace(/[*_`]/g, '').trim();
      const id = text
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-');
      items.push({ id, text, level });
    }
  }
  return items;
}