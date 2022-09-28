import mysql.connector
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

class_array = ["F1","F2","F3"] #Room names
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

# {"F1":[[2, 52], [3, 53]],"F2":[[2, 52], [3, 53]]}

# The structure should give output like this
# F1:
#     104: 210421104 001 - 30
#     102: 210421102 031 - 61 