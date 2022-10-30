from doctest import master
from tokenize import Single
import bs4
from sql import dept, years
from tabulate import tabulate
# from common import Common
from sql import displayCount

TotalRoomCount = {}
BoysAndGirlsRoomCount = []

def getBoysAndGirlsCount():
    return BoysAndGirlsRoomCount

def getBoysAndGirlsRange():
    return BoysAndGirlsRanges

def getTotalCount():
    return TotalRoomCount

def returnRanges():
    return masterRanges

masterRanges = {}
BoysAndGirlsRanges = []
def CreateTable(room_dict):
    # global TotalRoomCount
    # TotalRoomCount = {}
    global masterRanges
    
    ranges = []
    SingleTotalCount = {}
    SingleTotalRanges = {}
    for i in room_dict:
        print(i)
        with open('./rooms/basicStructure.html', 'r')  as f:
            basicSyntax = bs4.BeautifulSoup(f.read(), 'html.parser')
            cssLink = basicSyntax.new_tag("link", rel="stylesheet", type="text/css", href="table.css")
            basicSyntax.head.append(cssLink)
            room = basicSyntax.new_tag("h1", align="center")
            room.string = "Room " + i
            basicSyntax.body.find_all("div", class_="room")[0].append(room)
            exam = basicSyntax.new_tag("h1", align="center", id="exam")
            exam.string = "Internal Assessment - I"
            basicSyntax.body.find_all("div", class_="header")[0].append(exam)

        table = []             # Table for the html file
        tableCounter = 0       # Counter for the table in a row
        tableIndex = 0         # Index for the table for the whole room
        maxTables = 30         # Maximum number of tables in a room
        row = []               # Temporary row for the table
        snakeRow = 0           # if 0, row is normal, if 1, row is reversed
        currdept1 = ""         # Current department of the first student
        currdept2 = ""         # Current department of the second student
        changedDept = 0        # If 1, the first dept changed, if 2, the second dept changed 
        changedYear = 0            
        changedBothDept = [] 
        changedBothYears = []  # If both changes, first changing student value appended to the list
        rowCount = 1           # Maximum number of rows in a room
        deptChange = False     # If true, dept changed
        countDict = {}         # Count of students in a room dept wise
        curryear1 = ""
        curryear2 = ""

        for k in room_dict[i]:                 #Traversing through the rooms array       k = [210421104067, 210421114068]
            
            if str(k[0])[6:9] != currdept1 or str(k[1])[6:9] != currdept2: #Checks if the department has changed
                # prev = room_dict[i].index(k)-1
                # ranges.append(room_dict[i][prev])
                deptChange = True
                if str(k[0])[6:9] != currdept1:  #Checks if the first department has changed
                    changedDept = 1
                    changedBothDept.append(1)
                    
                else:
                    changedDept = 2
                    changedBothDept.append(2)
                  
                if currdept1 != "" and currdept2 != "":
                    prev = room_dict[i].index(k)-1
                    ranges.append(room_dict[i][prev])   
                    
                ranges.append(k)                             #[[210421114101, 210421104144], [210421114120, 210421104172], [0, 210421104173], [0, 210421104185]]
                currdept1 = str(k[0])[6:9]
                currdept2 = str(k[1])[6:9]
                if curryear1 == "":
                    curryear1 = str(k[0])[4:6]
                if curryear2 == "":
                    curryear2 = str(k[1])[4:6]

                if currdept1+"-"+curryear1 not in countDict:
                    countDict[currdept1+"-"+curryear1] = 0
                if currdept2+"-"+curryear2 not in countDict:
                    countDict[currdept2+"-"+curryear2] = 0

            if str(k[0])[4:6] != curryear1 or str(k[1])[4:6] != curryear2:
                print("SED")
                if str(k[0])[4:6] != curryear1:
                    changedYear = 1
                    changedBothYears.append(1)
                    curryear1 = str(k[0])[4:6]
                else:
                    changedYear = 2
                    changedBothYears.append(2)
                    curryear2 = str(k[1])[4:6]
                
                # curryear1 = str(k[0])[4:6]
                # curryear2 = str(k[1])[4:6]

            if currdept1+"-"+curryear1 == "-" or currdept2+"-"+curryear2 == "-" or currdept1+"-"+curryear1 == "-"+curryear1 or currdept2+"-"+curryear2 == "-"+curryear2:
                print("LONELY BOI IN TABLE")
                if str(k[0]) == "0" or str(k[1]) == "0":
                    if str(k[0]) == "0":
                        countDict[currdept2+"-"+curryear2] += 1
                    else:
                        countDict[currdept1+"-"+curryear1] += 1
            else:
                print(currdept1+"-"+curryear1, currdept2+"-"+curryear2)
                countDict[currdept1+"-"+curryear1] += 1
                countDict[currdept2+"-"+curryear2] += 1
            if tableIndex == 0:
                if ranges[len(ranges)-1] == k:
                    pass
                else:
                    ranges.append(k)
            if tableIndex > maxTables:
                # if len(row) != 0:
                    
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
            print("SINGLE TABLE: ", singleTable, row)
            tableCounter += 1
            tableIndex += 1

            if tableCounter == 6 or tableIndex == maxTables or tableIndex==len(room_dict[i]):

                if tableIndex == maxTables:
                    tableStuff = bs4.BeautifulSoup(tabulate(row,headers=["Row %s" % (rowCount)], tablefmt="html"), 'html.parser')
                    
                    # if ranges[0][0]==0 and ranges[1][0]==0:
                    #     ranges1Tag = basicSyntax.new_tag("p")
                    #     ranges1Tag.string = dept[int(str(ranges[0][1])[6:9])] + ": " + str(ranges[0][1]) + " to " + str(ranges[1][1])
                    #     basicSyntax.body.find_all("div", class_="range")[0].append(ranges1Tag)
                    #     masterRanges[i] = [ranges1Tag.string]
                    
                    # elif ranges[0][1]==0 and ranges[1][1]==0:
                    #     ranges1Tag = basicSyntax.new_tag("p")
                    #     ranges1Tag.string = dept[int(str(ranges[0][0])[6:9])] + ": " + str(ranges[0][0]) + " to " + str(ranges[1][0])
                    #     basicSyntax.body.find_all("div", class_="range")[0].append(ranges1Tag)
                    #     masterRanges[i] = [ranges1Tag.string]
                if len(row) == len(room_dict[i]):
                    tableStuff = bs4.BeautifulSoup(tabulate(row,headers=["Row %s" % (rowCount)], tablefmt="html"), 'html.parser')

                elif snakeRow % 2 == 0:
                    tableStuff = bs4.BeautifulSoup(tabulate(row, headers=["Row %s" % (rowCount)] ,tablefmt='html'), 'html.parser')
                    rowCount+=1
                else:
                    tableStuff = bs4.BeautifulSoup(tabulate(row[::-1], headers=["Row %s" % (rowCount)], tablefmt='html'), 'html.parser')
                    rowCount+=1
                snakeRow += 1
                
                basicSyntax.body.find_all("div", class_="tables")[0].append(tableStuff)
                print(tableStuff)
                print(len(room_dict) - 1)
                print(room_dict[i].index(k))

                if room_dict[i].index(k) == len(room_dict[i]) - 1:
                    ranges.append(k)
                    print("Range: ",ranges)
                    
                    if ranges[0][0]==0 and ranges[1][0]==0:
                        ranges1Tag = basicSyntax.new_tag("p")
                        ranges1Tag.string = dept[int(str(ranges[0][1])[6:9])] + " " + years[int(str(ranges[0][1])[4:6])] + ": " + str(ranges[0][1]) + " to " + str(ranges[1][1])
                        basicSyntax.body.find_all("div", class_="range")[0].append(ranges1Tag)
                        masterRanges[i] = [ranges1Tag.string]
                        SingleTotalRanges[i] = [ranges1Tag.string]
                        print("GOPAL",masterRanges[i])
                    
                    elif ranges[0][1]==0 and ranges[1][1]==0:
                        ranges1Tag = basicSyntax.new_tag("p")
                        ranges1Tag.string = dept[int(str(ranges[0][0])[6:9])] + " " + years[int(str(ranges[0][0])[4:6])] + ": " + str(ranges[0][0]) + " to " + str(ranges[1][0])
                        basicSyntax.body.find_all("div", class_="range")[0].append(ranges1Tag)
                        masterRanges[i] = [ranges1Tag.string]
                        SingleTotalRanges[i] = [ranges1Tag.string]
                        print("GOPAL",masterRanges[i])

                    elif len(ranges) == 2:

                        ranges1Tag = basicSyntax.new_tag("p")
                        print(str(ranges[0][0])[6:9])
                        ranges1Tag.string = dept[int(str(ranges[0][0])[6:9])] + " " + years[int(str(ranges[0][0])[4:6])] + ": " + str(ranges[0][0]) + " to " + str(ranges[1][0])
                        print(ranges1Tag)
                        ranges2Tag = basicSyntax.new_tag("p")
                        print(str(ranges[0][0])[6:9])
                        ranges2Tag.string = dept[int(str(ranges[0][1])[6:9])] + " " + years[int(str(ranges[0][1])[4:6])] + ": " + str(ranges[0][1]) + " to " + str(ranges[1][1])
                        print(ranges2Tag)
                        
                        basicSyntax.body.find_all("div", class_="range")[0].append(ranges1Tag)
                        basicSyntax.body.find_all("div", class_="range")[0].append(ranges2Tag)
                        masterRanges[i] = [ranges1Tag.string, ranges2Tag.string]
                        SingleTotalRanges[i] = [ranges1Tag.string, ranges2Tag.string]
                        print("GOPAL",masterRanges[i])

                    elif len(ranges) == 4:

                        ranges3Tag = basicSyntax.new_tag("p")
                        if changedDept == 1:
                            ranges1Tag = basicSyntax.new_tag("p")
                            print(str(ranges[0][0])[6:9])
                            ranges1Tag.string = dept[int(str(ranges[0][0])[6:9])] + " " + years[int(str(ranges[0][0])[4:6])] + ": " + str(ranges[0][0]) + " to " + str(ranges[1][0])
                            print(ranges1Tag)
                            ranges2Tag = basicSyntax.new_tag("p")
                            print(str(ranges[0][0])[6:9])
                            ranges2Tag.string = dept[int(str(ranges[0][1])[6:9])] + " " + years[int(str(ranges[0][1])[4:6])] + ": " + str(ranges[0][1]) + " to " + str(ranges[3][1])
                            print(ranges2Tag)
                            print(str(ranges[2][0])[6:9])
                            try:
                                ranges3Tag.string = dept[int(str(ranges[2][0])[6:9])] + " " + years[int(str(ranges[2][0])[4:6])] + ": " + str(ranges[2][0]) + " to " + str(ranges[3][0])
                            except:
                                ranges2Tag.string = dept[int(str(ranges[0][1])[6:9])] + " " + years[int(str(ranges[0][1])[4:6])] + ": " + str(ranges[0][1]) + " to " + str(ranges[3][1])
                            print(ranges3Tag)
                            basicSyntax.body.find_all("div", class_="range")[0].append(ranges1Tag)
                            basicSyntax.body.find_all("div", class_="range")[0].append(ranges2Tag)
                            basicSyntax.body.find_all("div", class_="range")[0].append(ranges3Tag)
                            masterRanges[i] = [ranges1Tag.string , ranges2Tag.string, ranges3Tag.string]
                            SingleTotalRanges[i] = [ranges1Tag.string , ranges2Tag.string, ranges3Tag.string]
                            print("GOPAL",masterRanges[i])
                        if changedDept == 2:

                            ranges1Tag = basicSyntax.new_tag("p")
                            print(str(ranges[0][0])[6:9])
                            ranges1Tag.string = dept[int(str(ranges[0][0])[6:9])] + " " + years[int(str(ranges[0][0])[4:6])] + ": " + str(ranges[0][0]) + " to " + str(ranges[3][0])
                            print(ranges1Tag)
                            ranges2Tag = basicSyntax.new_tag("p")
                            print(str(ranges[0][0])[6:9])
                            ranges2Tag.string = dept[int(str(ranges[0][1])[6:9])] + " " + years[int(str(ranges[0][1])[4:6])] + ": " + str(ranges[0][1]) + " to " + str(ranges[1][1])
                            print(ranges2Tag)
                            print(str(ranges[2][1])[6:9])
                            try:
                                ranges3Tag.string = dept[int(str(ranges[2][1])[6:9])] + " " + years[int(str(ranges[2][1])[4:6])] + ": " + str(ranges[2][1]) + " to " + str(ranges[3][1])
                            except:
                                ranges1Tag.string = dept[int(str(ranges[0][0])[6:9])] + " " + years[int(str(ranges[0][0])[4:6])] + ": " + str(ranges[0][0]) + " to " + str(ranges[3][0])
                            print(ranges3Tag)
                            basicSyntax.body.find_all("div", class_="range")[0].append(ranges1Tag)
                            basicSyntax.body.find_all("div", class_="range")[0].append(ranges2Tag)
                            basicSyntax.body.find_all("div", class_="range")[0].append(ranges3Tag)
                            masterRanges[i] = [ranges1Tag.string , ranges2Tag.string, ranges3Tag.string]
                            SingleTotalRanges[i] = [ranges1Tag.string , ranges2Tag.string, ranges3Tag.string]
                            print("GOPAL",masterRanges[i])

                    elif len(ranges) == 6:
                        print("FOPAL")
                        print(changedBothDept)
                        ranges3Tag = basicSyntax.new_tag("p")
                        ranges4Tag = basicSyntax.new_tag("p")

                        # if ranges[0]==ranges[1]:
                        #     ranges1Tag = basicSyntax.new_tag("p")
                        #     ranges1Tag.string = dept[int(str(ranges[0][0])[6:9])] + " " + years[int(str(ranges[0][0])[4:6])] + ": " + str(ranges[0][0])
                        #     ranges2Tag = basicSyntax.new_tag("p")
                        #     ranges2Tag.string = dept[int(str(ranges[0][1])[6:9])] + " " + years[int(str(ranges[0][1])[4:6])] + ": " + str(ranges[0][1]) + " to " + str(ranges[3][1])
                        #     ranges3Tag.string = dept[int(str(ranges[2][1])[6:9])] + " " + years[int(str(ranges[2][1])[4:6])] + ": " + str(ranges[2][1]) + " to " + str(ranges[5][1])
                        #     ranges4Tag.string = dept[int(str(ranges[4][0])[6:9])] + " " + years[int(str(ranges[4][0])[4:6])] + ": " + str(ranges[4][0]) + " to " + str(ranges[5][0])
                        #     basicSyntax.body.find_all("div", class_="range")[0].append(ranges1Tag)
                        #     basicSyntax.body.find_all("div", class_="range")[0].append(ranges2Tag)
                        #     basicSyntax.body.find_all("div", class_="range")[0].append(ranges3Tag)
                        #     basicSyntax.body.find_all("div", class_="range")[0].append(ranges4Tag)
                        #     masterRanges[i] = [ranges1Tag.string , ranges2Tag.string, ranges3Tag.string, ranges4Tag.string]
                        if changedBothDept == []:

                            print("FOPAL")
                            print(changedDept)
                            print("ranges first", ranges[0], ranges[1])

                            if changedDept == 1:
                                
                                if ranges[0][0]==ranges[1][0] and ranges[0][1]==ranges[1][1]:
                                    ranges1Tag = basicSyntax.new_tag("p")
                                    ranges1Tag.string = dept[int(str(ranges[0][0])[6:9])] + " " + years[int(str(ranges[0][0])[4:6])] + ": " + str(ranges[0][0])
                                    ranges2Tag = basicSyntax.new_tag("p")
                                    ranges2Tag.string = dept[int(str(ranges[0][1])[6:9])] + " " + years[int(str(ranges[0][1])[4:6])] + ": " + str(ranges[0][1]) + " to " + str(ranges[3][1])
                                    ranges3Tag.string = dept[int(str(ranges[2][0])[6:9])] + " " + years[int(str(ranges[2][0])[4:6])] + ": " + str(ranges[2][0]) + " to " + str(ranges[5][0])
                                    ranges4Tag.string = dept[int(str(ranges[4][1])[6:9])] + " " + years[int(str(ranges[4][1])[4:6])] + ": " + str(ranges[4][1]) + " to " + str(ranges[5][1])
                                    basicSyntax.body.find_all("div", class_="range")[0].append(ranges1Tag)
                                    basicSyntax.body.find_all("div", class_="range")[0].append(ranges2Tag)
                                    basicSyntax.body.find_all("div", class_="range")[0].append(ranges3Tag)
                                    basicSyntax.body.find_all("div", class_="range")[0].append(ranges4Tag)
                                    masterRanges[i] = [ranges1Tag.string , ranges2Tag.string, ranges3Tag.string, ranges4Tag.string]
                                    SingleTotalRanges[i] = [ranges1Tag.string , ranges2Tag.string, ranges3Tag.string, ranges4Tag.string]
                                    print("FOPAL",masterRanges[i])

                                else:
                                    ranges1Tag = basicSyntax.new_tag("p")
                                    ranges1Tag.string = dept[int(str(ranges[0][0])[6:9])] + " " + years[int(str(ranges[0][0])[4:6])] + ": " + str(ranges[0][0])
                                    ranges2Tag = basicSyntax.new_tag("p")
                                    ranges2Tag.string = dept[int(str(ranges[0][1])[6:9])] + " " + years[int(str(ranges[0][1])[4:6])] + ": " + str(ranges[0][1]) + " to " + str(ranges[3][1])
                                    ranges3Tag.string = dept[int(str(ranges[2][1])[6:9])] + " " + years[int(str(ranges[2][1])[4:6])] + ": " + str(ranges[2][1]) + " to " + str(ranges[5][1])
                                    ranges4Tag.string = dept[int(str(ranges[4][0])[6:9])] + " " + years[int(str(ranges[4][0])[4:6])] + ": " + str(ranges[4][0]) + " to " + str(ranges[5][0])
                                    basicSyntax.body.find_all("div", class_="range")[0].append(ranges1Tag)
                                    basicSyntax.body.find_all("div", class_="range")[0].append(ranges2Tag)
                                    basicSyntax.body.find_all("div", class_="range")[0].append(ranges3Tag)
                                    basicSyntax.body.find_all("div", class_="range")[0].append(ranges4Tag)
                                    masterRanges[i] = [ranges1Tag.string , ranges2Tag.string, ranges3Tag.string, ranges4Tag.string]
                                    SingleTotalRanges[i] = [ranges1Tag.string , ranges2Tag.string, ranges3Tag.string, ranges4Tag.string]
                                    print("GOPAL",masterRanges[i])

                            if changedDept == 2:
                                if ranges[0][0]==ranges[1][0] and ranges[0][1]==ranges[1][1]:
                                    ranges1Tag = basicSyntax.new_tag("p")
                                    ranges1Tag.string = dept[int(str(ranges[0][0])[6:9])] + " " + years[int(str(ranges[0][0])[4:6])] + ": " + str(ranges[0][0])
                                    ranges2Tag = basicSyntax.new_tag("p")
                                    ranges2Tag.string = dept[int(str(ranges[0][1])[6:9])] + " " + years[int(str(ranges[0][1])[4:6])] + ": " + str(ranges[0][1]) + " to " + str(ranges[3][1])
                                    ranges3Tag.string = dept[int(str(ranges[2][0])[6:9])] + " " + years[int(str(ranges[2][0])[4:6])] + ": " + str(ranges[2][0]) + " to " + str(ranges[5][0])
                                    ranges4Tag.string = dept[int(str(ranges[4][1])[6:9])] + " " + years[int(str(ranges[4][1])[4:6])] + ": " + str(ranges[4][1]) + " to " + str(ranges[5][1])
                                    basicSyntax.body.find_all("div", class_="range")[0].append(ranges1Tag)
                                    basicSyntax.body.find_all("div", class_="range")[0].append(ranges2Tag)
                                    basicSyntax.body.find_all("div", class_="range")[0].append(ranges3Tag)
                                    basicSyntax.body.find_all("div", class_="range")[0].append(ranges4Tag)
                                    masterRanges[i] = [ranges1Tag.string , ranges2Tag.string, ranges3Tag.string, ranges4Tag.string]
                                    SingleTotalRanges[i] = [ranges1Tag.string , ranges2Tag.string, ranges3Tag.string, ranges4Tag.string]
                                    print("GOPAL",masterRanges[i])

                                else:
                                    ranges1Tag = basicSyntax.new_tag("p")
                                    ranges1Tag.string = dept[int(str(ranges[0][0])[6:9])] + " " + years[int(str(ranges[0][0])[4:6])] + ": " + str(ranges[0][0]) + " to " + str(ranges[1][0])
                                    ranges2Tag = basicSyntax.new_tag("p")
                                    ranges2Tag.string = dept[int(str(ranges[2][0])[6:9])] + " " + years[int(str(ranges[2][0])[4:6])] + ": " + str(ranges[2][0]) + " to " + str(ranges[3][0])
                                    ranges3Tag.string = dept[int(str(ranges[4][0])[6:9])] + " " + years[int(str(ranges[4][0])[4:6])] + ": " + str(ranges[4][0]) + " to " + str(ranges[5][0])
                                    ranges4Tag.string = dept[int(str(ranges[0][1])[6:9])] + " " + years[int(str(ranges[0][1])[4:6])] + ": " + str(ranges[0][1]) + " to " + str(ranges[1][1])
                                    basicSyntax.body.find_all("div", class_="range")[0].append(ranges1Tag)
                                    basicSyntax.body.find_all("div", class_="range")[0].append(ranges2Tag)
                                    basicSyntax.body.find_all("div", class_="range")[0].append(ranges3Tag)
                                    basicSyntax.body.find_all("div", class_="range")[0].append(ranges4Tag)
                                    masterRanges[i] = [ranges1Tag.string , ranges2Tag.string, ranges3Tag.string, ranges4Tag.string]
                                    SingleTotalRanges[i] = [ranges1Tag.string , ranges2Tag.string, ranges3Tag.string, ranges4Tag.string]
                                    print("GOPAL",masterRanges[i])

                        elif changedBothDept[0] == 1 or changedBothYears[0] == 1:

                            if ranges[0]==ranges[1]:
                                ranges1Tag = basicSyntax.new_tag("p")
                                ranges1Tag.string = dept[int(str(ranges[0][0])[6:9])] + " " + years[int(str(ranges[0][0])[4:6])] + ": " + str(ranges[0][0])
                                ranges2Tag = basicSyntax.new_tag("p")
                                ranges2Tag.string = dept[int(str(ranges[0][1])[6:9])] + " " + years[int(str(ranges[0][1])[4:6])] + ": " + str(ranges[0][1]) + " to " + str(ranges[3][1])
                                ranges3Tag.string = dept[int(str(ranges[2][0])[6:9])] + " " + years[int(str(ranges[2][0])[4:6])] + ": " + str(ranges[2][0]) + " to " + str(ranges[5][0])
                                ranges4Tag.string = dept[int(str(ranges[4][1])[6:9])] + " " + years[int(str(ranges[4][1])[4:6])] + ": " + str(ranges[4][1]) + " to " + str(ranges[5][1])
                                basicSyntax.body.find_all("div", class_="range")[0].append(ranges1Tag)
                                basicSyntax.body.find_all("div", class_="range")[0].append(ranges2Tag)
                                basicSyntax.body.find_all("div", class_="range")[0].append(ranges3Tag)
                                basicSyntax.body.find_all("div", class_="range")[0].append(ranges4Tag)
                                masterRanges[i] = [ranges1Tag.string , ranges2Tag.string, ranges3Tag.string, ranges4Tag.string]
                                SingleTotalRanges[i] = [ranges1Tag.string , ranges2Tag.string, ranges3Tag.string, ranges4Tag.string]

                            elif str(ranges[0][0])[6:9] == str(ranges[5][0])[6:9] and str(ranges[0][0])[4:6] == str(ranges[5][0])[4:6]:
                                ranges1Tag = basicSyntax.new_tag("p")
                                ranges1Tag.string = dept[int(str(ranges[0][0])[6:9])] + " " + years[int(str(ranges[0][0])[4:6])] + ": " + str(ranges[0][0]) + " to " + str(ranges[5][0])
                                ranges2Tag = basicSyntax.new_tag("p")
                                ranges2Tag.string = dept[int(str(ranges[0][1])[6:9])] + " " + years[int(str(ranges[0][1])[4:6])] + ": " + str(ranges[0][1]) + " to " + str(ranges[1][1])
                                ranges3Tag.string = dept[int(str(ranges[2][1])[6:9])] + " " + years[int(str(ranges[2][1])[4:6])] + ": " + str(ranges[2][1]) + " to " + str(ranges[3][1])
                                
                                basicSyntax.body.find_all("div", class_="range")[0].append(ranges1Tag)
                                basicSyntax.body.find_all("div", class_="range")[0].append(ranges2Tag)
                                basicSyntax.body.find_all("div", class_="range")[0].append(ranges3Tag)
                                if ranges[4][0] != 0 and ranges[4][1] != 0:
                                    ranges4Tag.string = dept[int(str(ranges[4][1])[6:9])] + " " + years[int(str(ranges[4][1])[4:6])] + ": " + str(ranges[4][1]) + " to " + str(ranges[5][1])
                                    basicSyntax.body.find_all("div", class_="range")[0].append(ranges4Tag)
                                    masterRanges[i] = [ranges1Tag.string , ranges2Tag.string, ranges3Tag.string, ranges4Tag.string]
                                    SingleTotalRanges[i] = [ranges1Tag.string , ranges2Tag.string, ranges3Tag.string, ranges4Tag.string]
                                    continue
                                masterRanges[i] = [ranges1Tag.string , ranges2Tag.string, ranges3Tag.string]
                                SingleTotalRanges[i] = [ranges1Tag.string , ranges2Tag.string, ranges3Tag.string]
                                print("Hey", masterRanges[i])

                            elif str(ranges[0][1])[6:9] == str(ranges[5][1])[6:9] and str(ranges[0][1])[4:6] == str(ranges[5][1])[4:6]:
                                ranges1Tag = basicSyntax.new_tag("p")
                                ranges1Tag.string = dept[int(str(ranges[0][1])[6:9])] + " " + years[int(str(ranges[0][1])[4:6])] + ": " + str(ranges[0][1]) + " to " + str(ranges[5][1])
                                ranges2Tag = basicSyntax.new_tag("p")
                                ranges2Tag.string = dept[int(str(ranges[0][0])[6:9])] + " " + years[int(str(ranges[0][0])[4:6])] + ": " + str(ranges[0][0]) + " to " + str(ranges[1][0])
                                ranges3Tag.string = dept[int(str(ranges[2][0])[6:9])] + " " + years[int(str(ranges[2][0])[4:6])] + ": " + str(ranges[2][0]) + " to " + str(ranges[3][0])
                                
                                basicSyntax.body.find_all("div", class_="range")[0].append(ranges1Tag)
                                basicSyntax.body.find_all("div", class_="range")[0].append(ranges2Tag)
                                basicSyntax.body.find_all("div", class_="range")[0].append(ranges3Tag)
                                if ranges[4][0] != 0 and ranges[4][1] != 0:
                                    ranges4Tag.string = dept[int(str(ranges[4][0])[6:9])] + " " + years[int(str(ranges[4][0])[4:6])] + ": " + str(ranges[4][0]) + " to " + str(ranges[5][0])
                                    basicSyntax.body.find_all("div", class_="range")[0].append(ranges4Tag)
                                    masterRanges[i] = [ranges1Tag.string , ranges2Tag.string, ranges3Tag.string, ranges4Tag.string]
                                    SingleTotalRanges[i] = [ranges1Tag.string , ranges2Tag.string, ranges3Tag.string, ranges4Tag.string]
                                    continue
                                masterRanges[i] = [ranges1Tag.string , ranges2Tag.string, ranges3Tag.string]
                                SingleTotalRanges[i] = [ranges1Tag.string , ranges2Tag.string, ranges3Tag.string]
                                print("Hey", masterRanges[i])

                            else:
                                ranges1Tag = basicSyntax.new_tag("p")
                                ranges1Tag.string = dept[int(str(ranges[0][0])[6:9])] + " " + years[int(str(ranges[0][0])[4:6])] + ": " + str(ranges[0][0]) + " to " + str(ranges[3][0])
                                ranges2Tag = basicSyntax.new_tag("p")
                                ranges2Tag.string = dept[int(str(ranges[0][1])[6:9])] + " " + years[int(str(ranges[0][1])[4:6])] + ": " + str(ranges[0][1]) + " to " + str(ranges[1][1])
                                ranges3Tag.string = dept[int(str(ranges[2][1])[6:9])] + " " + years[int(str(ranges[2][1])[4:6])] + ": " + str(ranges[2][1]) + " to " + str(ranges[5][1])
                                ranges4Tag.string = dept[int(str(ranges[4][0])[6:9])] + " " + years[int(str(ranges[4][0])[4:6])] + ": " + str(ranges[4][0]) + " to " + str(ranges[5][0])
                                basicSyntax.body.find_all("div", class_="range")[0].append(ranges1Tag)
                                basicSyntax.body.find_all("div", class_="range")[0].append(ranges2Tag)
                                basicSyntax.body.find_all("div", class_="range")[0].append(ranges3Tag)
                                basicSyntax.body.find_all("div", class_="range")[0].append(ranges4Tag)
                                masterRanges[i] = [ranges1Tag.string , ranges2Tag.string, ranges3Tag.string, ranges4Tag.string]
                                SingleTotalRanges[i] = [ranges1Tag.string , ranges2Tag.string, ranges3Tag.string, ranges4Tag.string]
                                print("GOPAL 01",masterRanges[i])
                            
                        elif changedBothDept[0] == 2 or changedBothYears[0] == 2:

                            if ranges[0]==ranges[1]:
                                ranges1Tag = basicSyntax.new_tag("p")
                                ranges1Tag.string = dept[int(str(ranges[0][0])[6:9])] + " " + years[int(str(ranges[0][0])[4:6])] + ": " + str(ranges[0][0])
                                ranges2Tag = basicSyntax.new_tag("p")
                                ranges2Tag.string = dept[int(str(ranges[0][1])[6:9])] + " " + years[int(str(ranges[0][1])[4:6])] + ": " + str(ranges[0][1]) + " to " + str(ranges[3][1])
                                ranges3Tag.string = dept[int(str(ranges[2][1])[6:9])] + " " + years[int(str(ranges[2][1])[4:6])] + ": " + str(ranges[2][1]) + " to " + str(ranges[5][1])
                                ranges4Tag.string = dept[int(str(ranges[4][0])[6:9])] + " " + years[int(str(ranges[4][0])[4:6])] + ": " + str(ranges[4][0]) + " to " + str(ranges[5][0])
                                basicSyntax.body.find_all("div", class_="range")[0].append(ranges1Tag)
                                basicSyntax.body.find_all("div", class_="range")[0].append(ranges2Tag)
                                basicSyntax.body.find_all("div", class_="range")[0].append(ranges3Tag)
                                basicSyntax.body.find_all("div", class_="range")[0].append(ranges4Tag)
                                masterRanges[i] = [ranges1Tag.string , ranges2Tag.string, ranges3Tag.string, ranges4Tag.string]
                                SingleTotalRanges[i] = [ranges1Tag.string , ranges2Tag.string, ranges3Tag.string, ranges4Tag.string]
                            
                            elif str(ranges[0][0])[6:9] == str(ranges[5][0])[6:9] and str(ranges[0][0])[4:6] == str(ranges[5][0])[4:6]:
                                ranges1Tag = basicSyntax.new_tag("p")
                                ranges1Tag.string = dept[int(str(ranges[0][0])[6:9])] + " " + years[int(str(ranges[0][0])[4:6])] + ": " + str(ranges[0][0]) + " to " + str(ranges[5][0])
                                ranges2Tag = basicSyntax.new_tag("p")
                                ranges2Tag.string = dept[int(str(ranges[0][1])[6:9])] + " " + years[int(str(ranges[0][1])[4:6])] + ": " + str(ranges[0][1]) + " to " + str(ranges[1][1])
                                ranges3Tag.string = dept[int(str(ranges[2][1])[6:9])] + " " + years[int(str(ranges[2][1])[4:6])] + ": " + str(ranges[2][1]) + " to " + str(ranges[3][1])
                                
                                basicSyntax.body.find_all("div", class_="range")[0].append(ranges1Tag)
                                basicSyntax.body.find_all("div", class_="range")[0].append(ranges2Tag)
                                basicSyntax.body.find_all("div", class_="range")[0].append(ranges3Tag)
                                if ranges[4][0] != 0 and ranges[4][1] != 0:
                                    ranges4Tag.string = dept[int(str(ranges[4][1])[6:9])] + " " + years[int(str(ranges[4][1])[4:6])] + ": " + str(ranges[4][1]) + " to " + str(ranges[5][1])
                                    basicSyntax.body.find_all("div", class_="range")[0].append(ranges4Tag)
                                    masterRanges[i] = [ranges1Tag.string , ranges2Tag.string, ranges3Tag.string, ranges4Tag.string]
                                    SingleTotalRanges[i] = [ranges1Tag.string , ranges2Tag.string, ranges3Tag.string, ranges4Tag.string]
                                    continue
                                masterRanges[i] = [ranges1Tag.string , ranges2Tag.string, ranges3Tag.string]
                                SingleTotalRanges[i] = [ranges1Tag.string , ranges2Tag.string, ranges3Tag.string]
                                print("Hey", masterRanges[i])

                            elif str(ranges[0][1])[6:9] == str(ranges[5][1])[6:9] and str(ranges[0][1])[4:6] == str(ranges[5][1])[4:6]:
                                ranges1Tag = basicSyntax.new_tag("p")
                                ranges1Tag.string = dept[int(str(ranges[0][1])[6:9])] + " " + years[int(str(ranges[0][1])[4:6])] + ": " + str(ranges[0][1]) + " to " + str(ranges[5][1])
                                ranges2Tag = basicSyntax.new_tag("p")
                                ranges2Tag.string = dept[int(str(ranges[0][0])[6:9])] + " " + years[int(str(ranges[0][0])[4:6])] + ": " + str(ranges[0][0]) + " to " + str(ranges[1][0])
                                ranges3Tag.string = dept[int(str(ranges[2][0])[6:9])] + " " + years[int(str(ranges[2][0])[4:6])] + ": " + str(ranges[2][0]) + " to " + str(ranges[3][0])
                                
                                basicSyntax.body.find_all("div", class_="range")[0].append(ranges1Tag)
                                basicSyntax.body.find_all("div", class_="range")[0].append(ranges2Tag)
                                basicSyntax.body.find_all("div", class_="range")[0].append(ranges3Tag)
                                if ranges[4][0] != 0 and ranges[4][1] != 0:
                                    ranges4Tag.string = dept[int(str(ranges[4][0])[6:9])] + " " + years[int(str(ranges[4][0])[4:6])] + ": " + str(ranges[4][0]) + " to " + str(ranges[5][0])
                                    basicSyntax.body.find_all("div", class_="range")[0].append(ranges4Tag)
                                    masterRanges[i] = [ranges1Tag.string , ranges2Tag.string, ranges3Tag.string, ranges4Tag.string]
                                    SingleTotalRanges[i] = [ranges1Tag.string , ranges2Tag.string, ranges3Tag.string, ranges4Tag.string]
                                    continue
                                masterRanges[i] = [ranges1Tag.string , ranges2Tag.string, ranges3Tag.string]
                                SingleTotalRanges[i] = [ranges1Tag.string , ranges2Tag.string, ranges3Tag.string]
                                print("Hey", masterRanges[i])
                            
                            else:
                                    
                                ranges1Tag = basicSyntax.new_tag("p")
                                ranges1Tag.string = dept[int(str(ranges[0][0])[6:9])] + " " + years[int(str(ranges[0][0])[4:6])] + ": " + str(ranges[0][0]) + " to " + str(ranges[1][0])
                                ranges2Tag = basicSyntax.new_tag("p")
                                ranges2Tag.string = dept[int(str(ranges[0][1])[6:9])] + " " + years[int(str(ranges[0][1])[4:6])] + ": " + str(ranges[0][1]) + " to " + str(ranges[3][1])
                                ranges3Tag.string = dept[int(str(ranges[2][0])[6:9])] + " " + years[int(str(ranges[2][0])[4:6])] + ": " + str(ranges[2][0]) + " to " + str(ranges[5][0])
                                ranges4Tag.string = dept[int(str(ranges[0][1])[6:9])] + " " + years[int(str(ranges[0][1])[4:6])] + ": " + str(ranges[4][1]) + " to " + str(ranges[5][1])
                                basicSyntax.body.find_all("div", class_="range")[0].append(ranges1Tag)
                                basicSyntax.body.find_all("div", class_="range")[0].append(ranges2Tag)
                                basicSyntax.body.find_all("div", class_="range")[0].append(ranges3Tag)
                                basicSyntax.body.find_all("div", class_="range")[0].append(ranges4Tag)
                                masterRanges[i] = [ranges1Tag.string , ranges2Tag.string, ranges3Tag.string, ranges4Tag.string]
                                SingleTotalRanges[i] = [ranges1Tag.string , ranges2Tag.string, ranges3Tag.string, ranges4Tag.string]
                                print("GOPAL 00",masterRanges[i])

                    ranges = []
                    counts = displayCount(countDict)
                    print("COUNTS OF ONE TIME: ",counts)
                    subjects = """"""
                    c = """"""
                    for l in counts:
                        subjects += l[0] + "\n"
                        c += str(l[1]) + "\n"
                    print(subjects)
                    print(c)
                    countsTable = [["15.10.22", subjects, c]]
                    countsTableinHTML = bs4.BeautifulSoup(tabulate(countsTable, headers=["Date", "Subject Code/Name", "Count"],  tablefmt="html"), "html.parser")
                    countsTableinHTML.find_all("td")[0].string
                    basicSyntax.body.find_all("div", class_="parts")[0].append(countsTableinHTML)

                with open('./rooms/'+i+'.html', 'w') as f2:
                    f2.write(str(basicSyntax.prettify()))
                tableCounter = 0
                changedBothDept = []
                row = []
                
        TotalRoomCount[i] = countDict
        print("count dict at the end", countDict)
        SingleTotalCount[i] = countDict
    BoysAndGirlsRanges.append(SingleTotalRanges)
        
        # Common(TotalRoomCount)
    

    print("THE TOTAL ROOM COUNT OF ONE TIME:", SingleTotalCount)
    BoysAndGirlsRoomCount.append(SingleTotalCount)
    TotalCounts = {}

    
            