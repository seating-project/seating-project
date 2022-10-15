import pstats
from tabulate import tabulate
import bs4
from sql import dept


print(dept)

def NoticeBoard(counts, ranges):
    pass
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
