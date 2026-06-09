export const runtime = 'nodejs';

function escapePdfText(text: string) {
  return text.replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)');
}

function buildResumePdf() {
  const lines = [
    'Vinayak Chauhan',
    'Cybersecurity Student | Blue Team & Forensics',
    '',
    'Focus',
    'Blue Team operations, SOC practices, threat detection, and incident response.',
    '',
    'Skills',
    'Wireshark, Nmap, Linux, Networking',
    '',
    'Learning',
    'TryHackMe labs, CTF practice, cybersecurity simulations, and technical reports.'
  ];

  const contentLines = [
    'BT',
    '/F1 20 Tf',
    '72 740 Td',
    ...lines.flatMap((line, index) => {
      const escapedLine = escapePdfText(line);
      if (index === 0) {
        return [`(${escapedLine}) Tj`];
      }

      return line === ''
        ? ['0 -18 Td']
        : ['0 -28 Td', `(${escapedLine}) Tj`];
    }),
    'ET'
  ];

  const contentStream = contentLines.join('\n');

  const objects = [
    '1 0 obj << /Type /Catalog /Pages 2 0 R >> endobj\n',
    '2 0 obj << /Type /Pages /Kids [3 0 R] /Count 1 >> endobj\n',
    '3 0 obj << /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >> endobj\n',
    `4 0 obj << /Length ${new TextEncoder().encode(contentStream).length} >> stream\n${contentStream}\nendstream endobj\n`,
    '5 0 obj << /Type /Font /Subtype /Type1 /BaseFont /Helvetica >> endobj\n'
  ];

  let pdf = '%PDF-1.4\n';
  const offsets = [0];

  for (const object of objects) {
    offsets.push(new TextEncoder().encode(pdf).length);
    pdf += object;
  }

  const xrefStart = new TextEncoder().encode(pdf).length;
  let xref = `xref\n0 ${objects.length + 1}\n`;
  xref += '0000000000 65535 f \n';
  for (let index = 1; index < offsets.length; index += 1) {
    xref += `${offsets[index].toString().padStart(10, '0')} 00000 n \n`;
  }
  xref += `trailer << /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefStart}\n%%EOF`;

  return new TextEncoder().encode(pdf + xref);
}

export async function GET() {
  const pdf = buildResumePdf();

  return new Response(pdf, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="Vinayak_Resume.pdf"'
    }
  });
}
