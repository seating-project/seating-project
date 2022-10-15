from itertools import count
import mysql.connector
import random
from attendance import Attendance


time_table = {'CSE':[['FDS',17],['DS',18],[]]}

# dict_values([[['FDS', 17], ['DS', 18], []]])

# dates = []
# valstemp = list(time_table.values())[0]
# for i in valstemp:
#     for j in i:
#         dates.append(j[1])

# dates = set()
# for i in time_table.values():
#     for j in i:
#         dates.add(j[1])
    
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
    21:"1st Year",
    20:"2nd Year",
    19:"3rd Year",
    18:"4th Year",
}

# table_ids_ckt = ["cseii", "mechii", "mctii", "itii"]

ARRAYS = []

ALLTABLEARRAYS = []

DATES = []

def GetStudents(Gender):

    G = ""
    if Gender == "M" or Gender == "Male":
        G = "M"
    else:
        G = "F" 
    nckt_array = [] # Array for circuit group students
    ckt_array = [] # Array for non circuit group students
    sample1 = []
    sample2 = []

    db = mysql.connector.connect(host="localhost", user="root", passwd="root")
    cursor = db.cursor()

    #arrangment stuff
    cursor.execute("USE secondthird")

    stmt = "SELECT RegisterNo FROM itii where Gender='%s'" % (G)
    print(stmt)
    cursor.execute("SELECT RegisterNo FROM itii where Gender='%s'" % (G))
    cseData = cursor.fetchall()
    sample1.append(cseData)
    cursor.execute("SELECT RegisterNo FROM cseii where Gender='%s'" % (G))
    itData = cursor.fetchall()
    sample1.append(itData)
    cursor.execute("SELECT RegisterNo FROM mctii where Gender='%s'" % (G))
    mechData = cursor.fetchall()
    sample2.append(mechData)
    cursor.execute("SELECT RegisterNo FROM mechii where Gender='%s'" % (G))
    mctData = cursor.fetchall()
    sample2.append(mctData)

    #Attendance stuff

    tableNames = ["cseii", "mechii", "mctii", "itii"]
    cursor.execute("USE secondthird")

    for a in range(len(tableNames)):
        cursor.execute("SELECT SNo, RegisterNo, Name FROM  %s" % (tableNames[a]))
        ARRAYS.append(cursor.fetchall())
    
    # cursor.execute("SELECT SNo, RegisterNo, Name FROM mechii")
    # MECHARRAY = cursor.fetchall()
    # cursor.execute("SELECT SNo, RegisterNo, Name FROM mctii")
    # MCTARRAY = cursor.fetchall()
    # cursor.execute("SELECT SNo, RegisterNo, Name FROM itii")
    # ITARRAY = cursor.fetchall()


    #Time table stuff
    cursor.execute("USE secondthird")
    cursor.execute("SELECT Date from timetable")
    DATES = cursor.fetchall()

    for b in ARRAYS:
        Attendance(b, DATES)

    # random.shuffle(sample1)
    # random.shuffle(sample2)
    sample1 = [element for innerList in sample1 for element in innerList]
    sample2 = [element for innerList in sample2 for element in innerList]

    for i in sample1:
        ckt_array.append(i[0])
    for i in sample2:
        nckt_array.append(i[0])
    print(ckt_array, nckt_array)
    return ckt_array, nckt_array

def displayCount(countDict):

    deptsInRoomIds = [i for i in countDict.keys()]
    db = mysql.connector.connect(host="localhost", user="root", passwd="root")
    cursor = db.cursor()

    cursor.execute("USE secondthird")
    values = []
    for i in deptsInRoomIds:
        try:
            cursor.execute("SELECT " + dept[int(i)].lower() + " from timetable where date='15.10.22'")
            values.append([cursor.fetchall()[0][0], countDict[i]])
        except ValueError:
            pass
    return values
