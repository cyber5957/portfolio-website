from pathlib import Path

output = Path('resume.pdf')
text = 'Resume available upon request. Please contact via email.'
content = f'BT /F1 18 Tf 72 720 Td ({text}) Tj ET'.encode('latin-1')
objects = [
    b'1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n',
    b'2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n',
    b'3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>\nendobj\n',
    b'4 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n',
    b'5 0 obj\n<< /Length %d >>\nstream\n' % len(content) + content + b'\nendstream\nendobj\n'
]

pdf = b'%PDF-1.3\n'
positions = [len(pdf)]
for obj in objects:
    pdf += obj
    positions.append(len(pdf))
xref_start = len(pdf)
pdf += b'xref\n0 %d\n0000000000 65535 f \n' % (len(objects) + 1)
for pos in positions[:-1]:
    pdf += b'%010d 00000 n \n' % pos
pdf += b'trailer\n<< /Size %d /Root 1 0 R >>\nstartxref\n%d\n%%EOF\n' % (len(objects) + 1, xref_start)

output.write_bytes(pdf)
print('Created', output, 'size', output.stat().st_size)
