from allotment import class_array
from openpyxl import Workbook
wb = Workbook()

# grab the active worksheet
ws = wb.active

ws['A1'] = 42

ws.append([1, 2, 3])

# Save the file
wb.save("sample.xlsx")