import bs4
from sql import dept
from tabulate import tabulate

def CreateTable(room_dict):

    ranges = []
        
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
        count = [0,0]
        # timeTable = [["12th Oct", "Foundations of Data Science"], ["13th Oct", "Data Structures"], ["14th Oct", "Obejct Oriented Programming"], ["15th Oct", "Discrete Mathematics"], ["16th Oct", "Digital Principles and Computer Organization"]]
        # ExamTimeTable = bs4.BeautifulSoup(tabulate(timeTable, headers=["Date", "Subject"], tablefmt="html"))
        # basicSyntax.body.find_all("div", class_="parts")[0].append(ExamTimeTable)

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

                        count1 = ranges[1][0] - ranges[0][0] + 1
                        count2 = ranges[1][1] - ranges[0][1] + 1
                        print(count1)

                        subTable = []



                    
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

                            count1 = ranges[1][0] - ranges[0][0] + 1
                        
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
