from .models import ExamTemplate, RoomData, Students


def Allotments(data):
    curr_template = data["template"]
    # print(data["template"].room_strength)
    
    RoomData.objects.all().delete()

    # room = ['F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12', 'F13', 'F14', 'F15', 'F16']
    room = curr_template.rooms["rooms"]
    # def rotateArray(a,d):
    #     temp = []
    #     n=len(a)
    #     for i in range(d,n):
    #         temp.append(a[i])
    #     i = 0
    #     for i in range (0,d):
    #         temp.append(a[i])
    #     a=temp.copy()
    #     return a
    # ro = rotateArray(room, random.randint(0,5))
    # room = ro
    all_depts = Students.objects.filter(year=1).values_list('dept')
    all_depts = list(all_depts)
    all_students = Students.objects.filter(year=1).values_list('registerno', 'dept')
    all_students = list(all_students)
    # ckt_array = Students.objects.filter(ctype='C').order_by(Random(), 'dept').values_list('registerno', 'dept','year')
    ckt_array = Students.objects.filter(ctype='C', year=1).values_list('registerno', 'dept','year')
    # it_stuff = Students.objects.filter(dept='it', year=1).values_list('registerno', 'dept','year')
    ckt_array = list(ckt_array) 
    nckt_array = Students.objects.filter(ctype='N', year=1).values_list('registerno', 'dept', 'year')
    # nckt_array = Students.objects.filter(ctype='N').order_by(Random(), 'dept').values_list('registerno', 'dept', 'year')
    # nckt_array = list(nckt_array) + list(it_stuff)

    # if "Model" in curr_template .template_exam_name:
    #     if abs(len(ckt_array)-len(nckt_array)) > 64:
    #         if len(ckt_array)>len(nckt_array):
    
    
    main_building_array = Students.objects.filter( year=1, dept__in = ["cse", "it", "aids"]).values_list('registerno', 'dept','year')
    main_building_array = list(main_building_array)
    new_building_array = Students.objects.filter( year=1).values_list('registerno', 'dept','year').exclude(dept__in = ["cse", "it", "aids"])
    new_building_array = list(new_building_array)


    # print("MAIN BUILDING ARRAY", main_building_array)
    for i in range(len(main_building_array)):
        print("MAIN BUILDING",main_building_array[i])
    
        # print("NEW BUILDING ARRAY", new_building_array)
    for i in range(len(new_building_array)):
        print("NEW BUILDING", new_building_array[i])



    ranges_dict = {}
    room_dict = {}
    curr_room = []
    c = 0
    f = 0
    depts = []
    
    if "Model" in data["name"]:
        pass
        main_building_rooms = []
        new_building_rooms = []
        for i in room:
            if "F" in i or "T" in i or "S" in i or "MT" in i:
                main_building_rooms.append(i)
        print("MAIN BUILDING ROOMS", main_building_rooms)
        for i in room: 
            if "EH" in i:
                new_building_rooms.append(i)
        print("NEW BUILDING ROOMS", new_building_rooms)

        room = main_building_rooms + new_building_rooms
        c1 = 0
        f1 = 0
        for i in main_building_rooms:
            print(curr_template.room_strength)
            for j in range(curr_template.room_strength):
                if c1>=len(main_building_array):
                    f1 = 1
                    break
                curr_room.append([main_building_array[c1],0])
                c1+=1
            room_dict[i] = curr_room
            curr_room = []
            if f1==1:
                break
        c2 = 0
        f2 = 0
        for i in new_building_rooms:
            print(i)
            for j in range(curr_template.room_strength):
                if c2>=len(new_building_array):
                    f2 = 1
                    break
                curr_room.append([new_building_array[c2],0])
                c2+=1
            print("CURRENT Allotment", curr_room)
            if len(new_building_array[c2:]) < 3:
                print("LEFT OVER", c2)
                print("YAYYY WE FOUND IT")
                print("Length", len(new_building_array[c2:]))
                count = 0
                for k in range(len(new_building_array[c2:])):
                    curr_room.append([new_building_array[c2+k],0])
                    count += 1
                c2 += count
                break
            room_dict[i] = curr_room
            curr_room = []
            if f2==1:
                break
        for i in room_dict:
            print("ROOOOM", i, room_dict[i])

    else:
        for i in room:

            if curr_template.single_seater == True:

                for j in range(curr_template.room_strength):
                    if c>=len(ckt_array) and c>=len(nckt_array):
                        f = 1
                        break
                    try:
                        if ckt_array[c] and nckt_array[c]:
                            curr_room.append([ckt_array[c],0])

                            # curr_room.append([nckt_array[c],0])
                        elif ckt_array[c]:
                            # if "Model" in curr_template.template_exam_name:

                            curr_room.append([ckt_array[c],0])
                        elif nckt_array[c]:
                            curr_room.append([nckt_array[c],0])
                        else:
                            break
                        c+=1
                    except IndexError:
                        try:
                            if nckt_array[c]:
                                curr_room.append([nckt_array[c],0])
                        except:
                            if ckt_array[c]:
                                curr_room.append([ckt_array[c],0])
                        c+=1
            else:
                strength = curr_template.room_strength//2
                for j in range(strength):
                    if c>=len(ckt_array) and c>=len(nckt_array):
                        f = 1
                        break
                    try:
                        if ckt_array[c] and nckt_array[c]:
                            curr_room.append([ckt_array[c], nckt_array[c]])
                        elif ckt_array[c]:
                            curr_room.append([ckt_array[c], 0])
                        elif nckt_array[c]:
                            curr_room.append([0, nckt_array[c]])
                        else:
                            break
                        c+=1
                    except IndexError:
                        try:
                            if nckt_array[c]:
                                curr_room.append([0, nckt_array[c]])
                        except:
                            if ckt_array[c]:
                                curr_room.append([ckt_array[c], 0])
                        c+=1

                
            room_dict[i] = curr_room
            curr_room = []
            if f == 1:
                break
        print()
        print("ROOM DICT", room_dict)
        # for i in room_dict:
        #     print(i)
        #     for j in room_dict[i]:
        #         print(j)
    for i in room_dict:
        ranges_dict[i] = {}

        if curr_template.single_seater == True:
            for j in room_dict[i]:
                if j[0] == 0:
                    continue
                if (j[0][1] + " " + str(j[0][2])) not in ranges_dict[i]:
                    ranges_dict[i][j[0][1] + " " + str(j[0][2])] = []
                ranges_dict[i][j[0][1] + " " + str(j[0][2])].append(j[0])
        else:
            for j in room_dict[i]:
                if j[0] == 0:
                    continue
                if (j[0][1] + " " + str(j[0][2])) not in ranges_dict[i]:
                    ranges_dict[i][j[0][1] + " " + str(j[0][2])] = []
                ranges_dict[i][j[0][1] + " " + str(j[0][2])].append(j[0])
        
            for j in room_dict[i]:
                if j[1] == 0:
                    continue
                if (j[1][1] + " " + str(j[1][2])) not in ranges_dict[i]:
                    ranges_dict[i][j[1][1] + " " + str(j[1][2])] = []
                ranges_dict[i][j[1][1] + " " + str(j[1][2])].append(j[1])
    # print(ranges_dict)  
    print()

            

    try:
        i = room[(room.index(i)+1)]
        room = room[(room.index(i)):]
    except:
        pass
    model = RoomData(rooms=room_dict, ranges=ranges_dict)
    model.save()
    queryset = RoomData.objects.all()