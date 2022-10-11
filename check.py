import pdfkit

options = {
    'page-size': 'Letter',
    'orientation': 'Landscape',
}
pdfkit.from_file('F1.html', 'F1.pdf', css='table.css' , options=options)