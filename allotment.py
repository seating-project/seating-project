def Allotment(ckt_array, nckt_array):

    class_array = ["F1","F2","F3","F4", "F5","F6"] # Room names
    curr_room = list()
    room_dict = dict()
    c = 0

    for i in class_array: 
        for j in range(30):
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

    print(room_dict)

    totalStrength = len(ckt_array) + len(nckt_array)
    print(totalStrength)

    return room_dict