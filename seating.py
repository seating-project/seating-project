import mysql.connector
from tabulate import tabulate
import bs4

db = mysql.connector.connect(host="localhost", user="root", passwd="root")

nckt_array = [] # Array for circuit group students
ckt_array = [] # Array for non circuit group students
sample1 = []
sample2 = []
dept = {
        104:"CSE",
        114:"MECH",
        115:"MCT",
        205:"IT",
        }

cursor = db.cursor()

cursor.execute("USE secondthird")
cursor.execute("SELECT RegisterNo FROM cseii where Gender='M'")
cseData = cursor.fetchall()
sample1.extend(cseData)
cursor.execute("SELECT RegisterNo FROM itii where Gender='M'")
itData = cursor.fetchall()
sample1.extend(itData)
cursor.execute("SELECT RegisterNo FROM mechii where Gender='M'")
mechData = cursor.fetchall()
sample2.extend(mechData)
cursor.execute("SELECT RegisterNo FROM mctii where Gender='M'")
mctData = cursor.fetchall()
sample2.extend(mctData)

for i in sample1:
    ckt_array.append(i[0])
for i in sample2:
    nckt_array.append(i[0])

class_array = ["F1","F2","F3","F4", "F5","F6"] # Room names
curr_room = list()
room_dict = dict()
c = 0
# try:
for i in class_array: 
    for j in range(30):
        try:    
            if ckt_array[c] and nckt_array[c]:
                curr_room.append([nckt_array[c],ckt_array[c]])
            elif nckt_array[c]:
                curr_room.append([nckt_array[c],0])
            elif ckt_array [c]:
                curr_room.append([0,ckt_array[c]])
            else:
                break
            c += 1
        except IndexError:
            try:
                if nckt_array[c]:
                    curr_room.append([nckt_array[c],0])
            except:
                if ckt_array [c]:
                    curr_room.append([0,ckt_array[c]])
            c+=1

    room_dict[i] = curr_room
    curr_room = []

# except (IndexError):

#     room_dict[i] = curr_room
#     curr_room = []
#     print("Seats alloted!")
#     print(room_dict)

print(room_dict)

with open('table.css', 'w')  as f:
    
    f.write('''
    
        @import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@500&display=swap');
        
        #exam {
            margin-right: 36rem;
            font-family: 'Poppins', sans-serif;
            font-size: 2rem;
        }

        .header {
            font-family: 'Roboto', sans-serif;
            align-items: center;
            height: 100px;
        }

        .content {
            margin-top: 1rem;
            margin-left: 5rem;
        }

        .container {
            display: flex;
            
            margin-left: 2rem;
        }

        .range {
            
            margin-left: 10rem;
            
            width: 100%;
            font-size: 1.2rem;
            font-family: 'Roboto', sans-serif;
        }


        table, th, td {
            border: 1px solid black;
            border-collapse: collapse;
        }
        
        table {
            width: 100%;
            margin: 20px auto;
            padding: 10px;
        }

        td {
            padding: 20px;
            font-size: 18px;
            line-height: 1.5;
            text-align: center;
            width: 150px;
        }

        body {
            align-items: center;
            justify-content: center;
        }

        .logo {
            
            height: 60px;
            object-fit: cover;
        }

        .tables {
            display: flex;
            align-items: center;
            justify-content: center;
            justify-items: center;
            width: 50%
            height: 20vh;
            margin-left: 5%;
            margin-right: 45%;
        }

        tr {
            height: 80px;
        }

        .parts {
            display: flex;
            flex-direction: column;
            width: 50%
            margin-left: 25%;
            margin: 10rem;
            
        }

        ''')

ranges = []

totalStrength = len(ckt_array) + len(nckt_array)
print(totalStrength)
    
for i in room_dict:
    print(i)
    with open('check.html', 'r')  as f:
        basicSyntax = bs4.BeautifulSoup(f.read(), 'html.parser')
        cssLink = basicSyntax.new_tag("link", rel="stylesheet", type="text/css", href="table.css")
        basicSyntax.head.append(cssLink)
        room = basicSyntax.new_tag("h1", align="center")
        room.string = "Room " + i
        basicSyntax.body.find_all("div", class_="room")[0].append(room)
        exam = basicSyntax.new_tag("h1", align="center", id="exam")
        exam.string = "Internal Assessment - I"
        basicSyntax.body.find_all("div", class_="header")[0].append(exam)

    table = []
    tableCounter = 0
    tableIndex = 0
    maxTables = 30
    row = []
    snakeRow = 0
    currdept1 = ""
    currdept2 = ""
    changedDept = 0
    rowCount = 1

    for k in room_dict[i]:
        if str(k[0])[6:9] != currdept1 or str(k[1])[6:9] != currdept2:
            # prev = room_dict[i].index(k)-1
            # ranges.append(room_dict[i][prev])
            if str(k[0])[6:9] != currdept1:
                changedDept = 1
            else :
                changedDept = 2
            if currdept1 != "" and currdept2 != "":
                prev = room_dict[i].index(k)-1
                ranges.append(room_dict[i][prev])   
                
            ranges.append(k)
            currdept1 = str(k[0])[6:9]
            currdept2 = str(k[1])[6:9]
        if tableIndex == 0:
            if ranges[len(ranges)-1] == k:
                pass
            else:
                ranges.append(k)
        if tableIndex >= maxTables:
            continue
        singleTable = ''''''

        try:
            singleTable += dept[int(currdept1)] + str(k[0])[9:] + " " +  dept[int(currdept2)] + str(k[1])[9:]
        except:
            try:
                singleTable += dept[int(currdept1)]  + str(k[0])[9:]
            except:
                singleTable += dept[int(currdept2)] + str(k[1])[9:]
            
        table.append([singleTable])
        row.append([singleTable])
        tableCounter += 1
        tableIndex += 1
        if tableCounter == 6:
            print(table)
            if snakeRow % 2 == 0:
                tableStuff = bs4.BeautifulSoup(tabulate(row, headers=["Row %s" % (rowCount)] ,tablefmt='html'), 'html.parser')
                rowCount+=1
            else:
                tableStuff = bs4.BeautifulSoup(tabulate(row[::-1], headers=["Row %s" % (rowCount)], tablefmt='html'), 'html.parser')
                rowCount+=1
            snakeRow += 1
            #tableStuff.td.replace_with("and", tableStuff.new_tag('br'))

    # with open(i+'.html', 'r') as f:
    #     soup = bs4.BeautifulSoup(f, 'html.parser')
            basicSyntax.body.find_all("div", class_="tables")[0].append(tableStuff)

            if room_dict[i].index(k) == len(room_dict[i]) - 1:
                ranges.append(k)
                print("Range: ",ranges)

                if len(ranges) == 2:
                                    
                    ranges1Tag = basicSyntax.new_tag("p")
                    print(str(ranges[0][0])[6:9])
                    ranges1Tag.string = dept[int(str(ranges[0][0])[6:9])] + ": " + str(ranges[0][0]) + " to " + str(ranges[1][0])
                    print(ranges1Tag)
                    ranges2Tag = basicSyntax.new_tag("p")
                    print(str(ranges[0][0])[6:9])
                    ranges2Tag.string = dept[int(str(ranges[0][1])[6:9])] + ": " + str(ranges[0][1]) + " to " + str(ranges[1][1])
                    print(ranges2Tag)
                    
                    basicSyntax.body.find_all("div", class_="range")[0].append(ranges1Tag)
                    basicSyntax.body.find_all("div", class_="range")[0].append(ranges2Tag)
                
                if len(ranges) != 2:
                    ranges3Tag = basicSyntax.new_tag("p")
                    
                    if changedDept == 1:
                        ranges1Tag = basicSyntax.new_tag("p")
                        print(str(ranges[0][0])[6:9])
                        ranges1Tag.string = dept[int(str(ranges[0][0])[6:9])] + ": " + str(ranges[0][0]) + " to " + str(ranges[1][0])
                        print(ranges1Tag)
                        ranges2Tag = basicSyntax.new_tag("p")
                        print(str(ranges[0][0])[6:9])
                        ranges2Tag.string = dept[int(str(ranges[0][1])[6:9])] + ": " + str(ranges[0][1]) + " to " + str(ranges[3][1])
                        print(ranges2Tag)
                        print(str(ranges[2][0])[6:9])
                        try:
                            ranges3Tag.string = dept[int(str(ranges[2][0])[6:9])] + ": " + str(ranges[2][0]) + " to " + str(ranges[3][0])
                        except:
                            ranges2Tag.string = dept[int(str(ranges[0][1])[6:9])] + ": " + str(ranges[0][1]) + " to " + str(ranges[3][1])
                        print(ranges3Tag)
                        basicSyntax.body.find_all("div", class_="range")[0].append(ranges1Tag)
                        basicSyntax.body.find_all("div", class_="range")[0].append(ranges2Tag)
                        basicSyntax.body.find_all("div", class_="range")[0].append(ranges3Tag)
                    
                    if changedDept == 2:

                        ranges1Tag = basicSyntax.new_tag("p")
                        print(str(ranges[0][0])[6:9])
                        ranges1Tag.string = dept[int(str(ranges[0][0])[6:9])] + ": " + str(ranges[0][0]) + " to " + str(ranges[3][0])
                        print(ranges1Tag)
                        ranges2Tag = basicSyntax.new_tag("p")
                        print(str(ranges[0][0])[6:9])
                        ranges2Tag.string = dept[int(str(ranges[0][1])[6:9])] + ": " + str(ranges[0][1]) + " to " + str(ranges[1][1])
                        print(ranges2Tag)
                        print(str(ranges[2][1])[6:9])
                        try:
                            ranges3Tag.string = dept[int(str(ranges[2][1])[6:9])] + ": " + str(ranges[2][1]) + " to " + str(ranges[3][1])
                        except:
                            ranges1Tag.string = dept[int(str(ranges[0][0])[6:9])] + ": " + str(ranges[0][0]) + " to " + str(ranges[3][0])

                        print(ranges3Tag)
                        basicSyntax.body.find_all("div", class_="range")[0].append(ranges1Tag)
                        basicSyntax.body.find_all("div", class_="range")[0].append(ranges2Tag)
                        basicSyntax.body.find_all("div", class_="range")[0].append(ranges3Tag)

            # if len(room_dict[i]) < maxTables:
            #    for j in range(maxTables - len(room_dict[i])):
            #     
                ranges = []
            
            with open(i+'.html', 'w') as f2:
                f2.write(str(basicSyntax.prettify()))
            tableCounter = 0
            row = []
        
        #if 
    

# {"F1":[[2, 52], [3, 53]],"F2":[[2, 52], [3, 53]]}

# The structure should give output like this
# F1:
#     104: 210421104 001 - 30
#     102: 210421102 031 - 61 
