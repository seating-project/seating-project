nckt_array = [i for i in range(1,51)] # Array for circuit group students
ckt_array = [i for i in range(51,101)] # Array for non circuit group students
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
except(IndexError):
    room_dict[i] = curr_room
    curr_room = []
    print("Seats alloted!")
    print(room_dict)

# {"F1":[[2, 52], [3, 53]],"F2":[[2, 52], [3, 53]]}

# The structure should give output like this
# F1:
#     104: 210421104 001 - 30
#     102: 210421102 031 - 61 