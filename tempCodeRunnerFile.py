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
            if nckt_array[c]:
                curr_room.append([nckt_array[c],0])
            if ckt_array [c]:
                curr_room.append([0,ckt_array[c]])
            c+=1

    room_dict[i] = curr_room
    curr_room = []
