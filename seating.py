import mysql.connector
from tabulate import tabulate
import bs4

db = mysql.connector.connect(host="localhost", user="root", passwd="root")

nckt_array = [] # Array for circuit group students
ckt_array = [] # Array for non circuit group students
sample1 = []
sample2 = []

cursor = db.cursor()

cursor.execute("USE secondthird")
cursor.execute("SELECT RegisterNo FROM cseii where Gender='M'")
cseData = cursor.fetchall()
sample1.extend(cseData)
cursor.execute("SELECT RegisterNo FROM mechii where Gender='M'")
mechData = cursor.fetchall()
sample2.extend(mechData)

for i in sample1:
    ckt_array.append(i[0])
for i in sample2:
    nckt_array.append(i[0])

class_array = ["F1","F2","F3"] # Room names
curr_room = list()
room_dict = dict()
c = 0
try:
    for i in class_array: 
        for j in range(30):
            if ckt_array[c] and nckt_array[c]:
                curr_room.append([nckt_array[c],ckt_array[c]])
            elif nckt_array[c]:
                curr_room.append([nckt_array[c],0])
            elif ckt_array [c]:
                curr_room.append([0,ckt_array[c]])
            else:
                break
            c += 1
        room_dict[i] = curr_room
        curr_room = []

except (IndexError):
    
    room_dict[i] = curr_room
    curr_room = []
    print("Seats alloted!")
    print(room_dict)

print(room_dict)

with open('table.css', 'w')  as f:
    f.write('''table, th, td {
        border: 1px solid black;
        border-collapse: collapse;
        }
        
        table {
            width: 100%;
            margin: 20px auto;
        }

        td {
            padding: 10px;
            font-size: 20px;
            line-height: 1.5;
            text-align: center;
        }

        body {
            align-items: center;
            justify-content: center;
        }

        .logo {
            margin: 50px;
            height: 60px;
            object-fit: cover;
        }

        .tables {
            display: flex;
            align-items: center;
            justify-content: center;
            justify-items: center;
            width: 50%
            height: 100vh;
            margin-left: 20%;
            margin-right: 20%;
        }
        ''')



for i in room_dict:
    print(i)
    with open('check.html', 'r')  as f:
        basicSyntax = bs4.BeautifulSoup(f.read(), 'html.parser')
        cssLink = basicSyntax.new_tag("link", rel="stylesheet", type="text/css", href="table.css")
        basicSyntax.head.append(cssLink)

    table = []
    tableCounter = 0
    tableIndex = 0
    maxTables = 30
    row = []
    for k in room_dict[i]:
        
        if tableIndex >= maxTables:
            continue
        singleTable = ''''''
        singleTable += str(k[0]) + " "  + str(k[1])
        table.append([singleTable])
        row.append([singleTable])
        tableCounter += 1
        tableIndex += 1
        if tableCounter == 5:
            print(table)
            tableStuff = bs4.BeautifulSoup(tabulate(row, tablefmt='html'), 'html.parser')
            #tableStuff.td.replace_with("and", tableStuff.new_tag('br'))

    # with open(i+'.html', 'r') as f:
    #     soup = bs4.BeautifulSoup(f, 'html.parser')

    
    
    
            basicSyntax.body.div.append(tableStuff)
            with open(i+'.html', 'w') as f2:
                f2.write(str(basicSyntax.prettify()))
            tableCounter = 0
            row = []



# {"F1":[[2, 52], [3, 53]],"F2":[[2, 52], [3, 53]]}

# The structure should give output like this
# F1:
#     104: 210421104 001 - 30
#     102: 210421102 031 - 61 