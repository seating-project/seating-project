import pstats
from tabulate import tabulate
import bs4
from sql import dept


print(dept)

def NoticeBoard(counts, ranges):

    CSEII = []
    CSEIII = []
    MECHIII = []
    MECHII = []

    tables = []
    for i in ranges:
        room = i
        for j in ranges[i]:
            if j == None:
                pass
            elif "CSE" in j and "2nd Year" in j:
                CSEII.append([j, i])

    print("NOTICE BOARD", counts)
    print("RANGES", ranges)
    print("CSEII", CSEII)
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
