import pstats
from tabulate import tabulate
import bs4
from sql import dept

reverseDept = {
    "CSE":'104',
    "MECH":'114',
    "MCT":'115',
    "IT":'205',
    "CIVIL":'103',
    "EEE":'105',
    "ECE":'106',
    "AIDS":'243',
    "BME":'121',
    "CSBS":'244',
}

print(dept)

file = "BOYS"
def NoticeBoard(counts, ranges):
    global file
    CSEII = [["II", "CSE"]]
    CSEIII = [["III", "CSE"]]
    MECHIII = [["III", "MECH"]]
    MECHII = [["II", "MECH"]]

    with open("./noticeboardcopys/noticeboard.html", "r") as f:
        data = bs4.BeautifulSoup(f, 'html.parser')

    tables = []
    for i in ranges:
        room = i
        for j in ranges[i]:
            if j == None:
                pass
            elif "CSE" in j and "2nd Year" in j:
                print(counts[i])
                CSEII.append([j, i, counts[i][reverseDept[j.split()[0]]+"-21"]])
            elif "CSE" in j and "3rd Year" in j:
                CSEIII.append([j, i, counts[i][reverseDept[j.split()[0]]+"-19"]])
            elif "MECH" in j and "2nd Year" in j:
                MECHII.append([j, i, counts[i][reverseDept[j.split()[0]]+"-21"]])
            elif "MECH" in j and "3rd Year" in j:
                MECHIII.append([j, i, counts[i][reverseDept[j.split()[0]]+"-19"]])
    ALLDepts = [CSEII, CSEIII, MECHII, MECHIII]    
    print("NOTICE BOARD", counts)
    print("RANGES", ranges)
    print("CSEII", CSEII)
    for k in ALLDepts:

        String = """"""
        RollNoList = []
        RoomList = []
        CountList = []


        for l in range(1, len(k)):
            String += f"""{k[l][0]}\n"""
            RollNoList.append(k[l][0])
        RoomString = """"""
        for l in range(1, len(k)):
            RoomString += f"""{k[l][1]}\n"""
            RoomList.append(k[l][1])
        CountString = """"""
        for l in range(1, len(k)):
            CountString += f"""{k[l][2]}\n"""
            CountList.append(k[l][2])
        if String=="":
            continue
        # tabless = [k[0], ["", String, RoomString, CountString]]
        tabless = [k[0], ["", RollNoList, RoomList, CountList]]
        tab = tabulate(tabless, headers=["Year", "Department", "Room", "Count"], tablefmt="html")
        tabForHTML = bs4.BeautifulSoup(tab, 'html.parser')
        print(tab)
        data.find_all("div", class_="entiretable")[0].append(tabForHTML)

    with open ("./noticeboardcopys/notice"+file+".html", "w") as f2:
        f2.write(str(data.prettify()))
    file = "GIRLS"
# print(countsOfAll)

def tableMate(data, headers):
    check = tabulate(data, headers=headers, tablefmt="html")
    TableDone = bs4.BeautifulSoup(check, 'html.parser')
    # data.find_all("div", class_="tables")[0].append(TableDone)
    return TableDone

# data = [["F1","CSE001 - CSE031"],]
# titles = ["Rooms", "Roll numbers"]
# table = tableMate(data, titles)
# with open("noticeboard.html",'w') as f:
#     f.write(table.prettify())
