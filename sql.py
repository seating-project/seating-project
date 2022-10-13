from itertools import count
import mysql.connector
import random



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
        }
years = {
    21:"1st Year",
    20:"2nd Year",
    19:"3rd Year",
    18:"4th Year",
}

table_ids_ckt = ["cseii", "mechii", "mctii", "itii"]



def GetStudents():

    nckt_array = [] # Array for circuit group students
    ckt_array = [] # Array for non circuit group students
    sample1 = []
    sample2 = []

    db = mysql.connector.connect(host="localhost", user="root", passwd="root")
    cursor = db.cursor()

    cursor.execute("USE secondthird")
    cursor.execute("SELECT RegisterNo FROM itii where Gender='M'")
    cseData = cursor.fetchall()
    sample1.append(cseData)
    cursor.execute("SELECT RegisterNo FROM cseii where Gender='M'")
    itData = cursor.fetchall()
    sample1.append(itData)
    cursor.execute("SELECT RegisterNo FROM mctii where Gender='M'")
    mechData = cursor.fetchall()
    sample2.append(mechData)
    cursor.execute("SELECT RegisterNo FROM mechii where Gender='M'")
    mctData = cursor.fetchall()
    sample2.append(mctData)

    # random.shuffle(sample1)
    # random.shuffle(sample2)
    sample1 = [element for innerList in sample1 for element in innerList]
    sample2 = [element for innerList in sample2 for element in innerList]

    for i in sample1:
        ckt_array.append(i[0])
    for i in sample2:
        nckt_array.append(i[0])

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
