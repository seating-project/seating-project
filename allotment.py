class_array = ["F1","F2","F3","F4", "F5","F6","F7","F8","F9","F10","F11","S1","S2","S3","S4","S5"]
def Allotment(ckt_array, nckt_array):
    global class_array
     # Room names
    curr_room = list()
    room_dict = dict()
    c = 0
    f = 0
    for i in class_array: 
        for j in range(30):
            if c>=len(ckt_array) and c>=len(nckt_array):
                f = 1
                break
            try:    
                if ckt_array[c] and nckt_array[c]:
                    curr_room.append([nckt_array[c],ckt_array[c]])
                elif nckt_array[c]:
                    curr_room.append([nckt_array[c],0])
                elif ckt_array [c]:
                    curr_room.append([0,ckt_array[c]])
                else:
                    break
                c += 1
            except IndexError:
                try:
                    if nckt_array[c]:
                        curr_room.append([nckt_array[c],0])
                except:
                    if ckt_array [c]:
                        curr_room.append([0,ckt_array[c]])
                c+=1

        room_dict[i] = curr_room
        curr_room = []
        if f == 1:
            break

        
    
    print("ROOMS: ", room_dict)

    totalStrength = len(ckt_array) + len(nckt_array)
    print("hiii",class_array)
    class_array = class_array[(class_array.index(i)+1):]
    return room_dict