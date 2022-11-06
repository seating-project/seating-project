from tabulate import tabulate
import bs4

dept = {
        104:"CSE",
        114:"MECH",
        115:"MCT",
        205:"IT",
        103:"CIVIL",
        105:"EEE",
        106:"ECE",
        243:"AIDS",
        121:"BME",
        244:"CSBS",
        }

years = {
    22:"1st Year",
    21:"2nd Year",
    19:"3rd Year",
    18:"4th Year",
}


def Attendance(Arr, DATES):
    dp = dept[int(str(Arr[0][1])[6:9])]
    yr = years[int(str(Arr[0][1])[4:6])]
    tableForAtt = []
    headers = headers = ["RegisterNo","Name", DATES[0][0], DATES[1][0], DATES[2][0], DATES[3][0], DATES[4][0], DATES[5][0]]
    for i in range(len(Arr)):
        if len(DATES)==5:
            # headers = ["SNO","RegisterNo", DATES[0][0], DATES[1][0], DATES[2][0], DATES[3][0], DATES[4][0]]
            tableForAtt.append([Arr[i][1], Arr[i][2], " ", " ", " ", " ", " "])
        elif len(DATES)==6:
            
            tableForAtt.append([Arr[i][1], Arr[i][2], " ", " ", " ", " ", " ", " "])

    with open('./attendance/attendance.html', 'r')  as f:
        AttSyntax = bs4.BeautifulSoup(f.read(), 'html.parser')
        check = tabulate(tableForAtt, headers=headers, tablefmt="html")
        TableDone = bs4.BeautifulSoup(check, 'html.parser')
        AttSyntax.body.find_all("div", class_="tables")[0].append(TableDone)
    print(dp + "DONE")
    with open('./attendance/' + dp + yr + 'attend.html', 'w') as f2:
        f2.write(str(AttSyntax.prettify()))


