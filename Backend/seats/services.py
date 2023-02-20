from .models import ExamTemplate, RoomData, Students
import random

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
    ckt_array = Students.objects.filter(ctype='C', year=2).values_list('registerno', 'dept','year')
    # it_stuff = Students.objects.filter(dept='it', year=1).values_list('registerno', 'dept','year')
    ckt_array = list(ckt_array) 
    nckt_array = Students.objects.filter(ctype='N', year=2).values_list('registerno', 'dept', 'year')
    nckt_array = list(nckt_array)
    # nckt_array = Students.objects.filter(ctype='N').order_by(Random(), 'dept').values_list('registerno', 'dept', 'year')
    # nckt_array = list(nckt_array) + list(it_stuff)

    # if "Model" in curr_template .template_exam_name:
    #     if abs(len(ckt_array)-len(nckt_array)) > 64:
    #         if len(ckt_array)>len(nckt_array):
    
    departments = Students.objects.filter(year=1).values_list('dept').distinct()
    departments = list(departments)

    # print("DEPARTMENTS", departments)
    
    ckt_array_boys = Students.objects.filter(ctype='C', gender="M", year=2).values_list('registerno', 'dept','year')
    ckt_array_boys = list(ckt_array_boys)
    nckt_array_boys = Students.objects.filter(ctype='N', gender="M", year=2).values_list('registerno', 'dept','year')
    nckt_array_boys = list(nckt_array_boys)
    ckt_array_girls = Students.objects.filter(ctype='C', gender="F", year=2).values_list('registerno', 'dept','year')
    ckt_array_girls = list(ckt_array_girls)
    nckt_array_girls = Students.objects.filter(ctype='N', gender="F", year=2).values_list('registerno', 'dept','year')
    nckt_array_girls = list(nckt_array_girls)
    print(ckt_array_girls)
    print(nckt_array_girls)

    main_building_array = Students.objects.filter( year=1, dept__in = ["cse", "it", "aids"]).values_list('registerno', 'dept','year')
    main_building_array = list(main_building_array)
    new_building_array = Students.objects.filter( year=1).values_list('registerno', 'dept','year').exclude(dept__in = ["cse", "it", "aids"])
    new_building_array = list(new_building_array)



        # # print("MAIN BUILDING ARRAY", main_building_array)
        # for i in range(len(main_building_array)):
        #     print("MAIN BUILDING",main_building_array[i])
        
        #     # print("NEW BUILDING ARRAY", new_building_array)
        # for i in range(len(new_building_array)):
        #     print("NEW BUILDING", new_building_array[i])



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

        random.shuffle(main_building_rooms)
        random.shuffle(new_building_rooms)
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
                # break
                f2 = 1
            room_dict[i] = curr_room
            print("CURRENT ROOM AT LAST", curr_room)
            curr_room = []

            if f2==1:
                break
        for i in room_dict:
            print("ROOOOM", i, room_dict[i])

    else:
        print("CHECK")
        if curr_template.boys_girls_separation:
            cb = 0
            cg = 0
            fb = 0
            fg = 0
            girls_rooms = []
            print("CHECK 1")
            for i in room:
                if curr_template.single_seater == True:
                    print("CHECK 2")
                    for j in range(curr_template.room_strength):
                        if cg>=len(ckt_array_girls) and cg>=len(nckt_array_girls):
                            fg = 1
                            break
                        try:
                            if ckt_array_girls[cg] and nckt_array_girls[cg]:
                                curr_room.append([ckt_array_girls[cg],0])
                                curr_room.append([nckt_array_girls[cg],0])
                            elif ckt_array_girls[cg]:
                                curr_room.append([ckt_array_girls[cg],0])
                            elif nckt_array_girls[cg]:
                                curr_room.append([nckt_array_girls[cg],0])
                            else:
                                break
                            cg+=1
                        except IndexError:
                            try:
                                if nckt_array_girls[cg]:
                                    curr_room.append([nckt_array_girls[cg],0])
                                else:
                                    break
                                cg+=1
                            except IndexError:
                                break
                        if cg>=len(ckt_array_girls) and cg>=len(nckt_array_girls):
                            fg = 1
                            break
                    if len(ckt_array_girls[cg:]) < 3:
                        print("LEFT OVER", cg)
                        print("YAYYY WE FOUND IT")
                        print("Length", len(ckt_array_girls[cg:]))
                        count = 0
                        for k in range(len(ckt_array_girls[cg:])):
                            curr_room.append([ckt_array_girls[cg+k],0])
                            count += 1
                        cg += count
                        # break
                        fg = 1
                    
                    room_dict[i] = curr_room
                    curr_room = []
                    # room.remove(i)
                    girls_rooms.append(i)
                    if fg==1:
                        break
                else:
                    print("CHECK 3")
                    
                    strength = curr_template.room_strength//2
                    for j in range(strength):
                        if cg>=len(ckt_array_girls) and cg>=len(nckt_array_girls):
                            fg = 1
                            break
                        try:
                            if ckt_array_girls[cg] and nckt_array_girls[cg]:
                                curr_room.append([ckt_array_girls[cg],nckt_array_girls[cg]])
                                # curr_room.append([nckt_array_girls[cg],0])
                            elif ckt_array_girls[cg]:
                                curr_room.append([ckt_array_girls[cg],0])
                            elif nckt_array_girls[cg]:
                                curr_room.append([0, nckt_array_girls[cg]])
                            else:
                                break
                            cg+=1
                        except IndexError:
                            try:
                                if nckt_array_girls[cg]:
                                    curr_room.append([0, nckt_array_girls[cg]])
                            except:
                                if ckt_array_girls[cg]:
                                    curr_room.append([ckt_array_girls[cg], 0])
                            cg+=1
                        if cg>=len(ckt_array_girls) and cg>=len(nckt_array_girls):
                            fg = 1
                            break
                    if len(ckt_array_girls[cg:]) < 3:
                        print("LEFT OVER", cg)
                        print("YAYYY WE FOUND IT")
                        print("Length", len(ckt_array_girls[cg:]))
                        count = 0
                        for k in range(len(ckt_array_girls[cg:])):
                            curr_room.append([ckt_array_girls[cg+k],0])
                            count += 1
                        cg += count
                        # break
                        fg = 1
                    room_dict[i] = curr_room
                    print(room_dict[i], i, len(room_dict[i]))
                    print()
                    # room.remove(i)
                    girls_rooms.append(i)
                    curr_room = []
                    if fg==1:
                        break
            for i in girls_rooms:
                room.remove(i)
            print("BOYS ROOMS", room)
            for i in room:
                if curr_template.single_seater == True:
                    for j in range(curr_template.room_strength):
                        if cb>=len(ckt_array_boys) and cb>=len(nckt_array_boys):
                            fb = 1
                            break
                        try:
                            if ckt_array_boys[cb] and nckt_array_boys[cb]:
                                curr_room.append([ckt_array_boys[cb],0])
                                # curr_room.append([nckt_array_boys[cb],0])
                            elif ckt_array_boys[cb]:
                                curr_room.append([ckt_array_boys[cb],0])
                            elif nckt_array_boys[cb]:
                                curr_room.append([nckt_array_boys[cb],0])
                            else:
                                break
                            cb+=1
                        except IndexError:
                            try:
                                if nckt_array_boys[cb]:
                                    curr_room.append([nckt_array_boys[cb],0])
                                else:
                                    break
                            except IndexError:
                                break
                            cb += 1
                        if cb>=len(ckt_array_boys) and cb>=len(nckt_array_boys):
                            fb = 1
                            break
                    room_dict[i] = curr_room
                    print(room_dict[i], i, len(room_dict[i]))
                    print("F", fb)
                    print()
                    curr_room = []
                    # room.remove(i)
                    if fb==1:
                        break
                else:
                    strength = curr_template.room_strength//2
                    for j in range(strength):
                        if cb>=len(ckt_array_boys) and cb>=len(nckt_array_boys):
                            fb = 1
                            break
                        try:
                            if ckt_array_boys[cb] and nckt_array_boys[cb]:
                                curr_room.append([ckt_array_boys[cb], nckt_array_boys[cb]])
                            elif ckt_array_boys[cb]:
                                curr_room.append([ckt_array_boys[cb], 0])
                            elif nckt_array_boys[cb]:
                                curr_room.append([0, nckt_array_boys[cb]])
                            else:
                                break
                            cb+=1
                        except IndexError:
                            try:
                                if nckt_array_boys[cb]:
                                    curr_room.append([0, nckt_array_boys[cb]])
                            except:
                                if ckt_array_boys[cb]:
                                    curr_room.append([ckt_array_boys[cb], 0])
                            cb+=1
                        if cb>=len(ckt_array_boys) and cb>=len(nckt_array_boys):
                            fb = 1
                            break

                    room_dict[i] = curr_room
                    print(room_dict[i], i, len(room_dict[i]))
                    print("F", fb)
                    print()

                    # room.remove(i)
                    curr_room = []
                    if f==1:
                        break

        else:
                
            for i in room:
                print("CHEKKK")
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
    # print("ROOM DICT", room_dict)
    for i in room_dict:
        print(i)
        for j in room_dict[i]:
            print(j)
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


[('210421104156', 'cse', 2), ('210421106068', 'ece', 2)]
[('210421104157', 'cse', 2), ('210421106072', 'ece', 2)]
[('210421104159', 'cse', 2), ('210421106074', 'ece', 2)]
[('210421104160', 'cse', 2), ('210421106075', 'ece', 2)]
[('210421104162', 'cse', 2), ('210421106076', 'ece', 2)]
[('210421104163', 'cse', 2), ('210421106077', 'ece', 2)]
[('210421104164', 'cse', 2), ('210421106078', 'ece', 2)]
[('210421104165', 'cse', 2), ('210421106080', 'ece', 2)]
[('210421104166', 'cse', 2), ('210421106083', 'ece', 2)]
[('210421104167', 'cse', 2), ('210421106084', 'ece', 2)]
[('210421104168', 'cse', 2), ('210421106085', 'ece', 2)]
[('210421104169', 'cse', 2), ('210421106086', 'ece', 2)]
[('210421104171', 'cse', 2), ('210421106088', 'ece', 2)]
[('210421104172', 'cse', 2), ('210421106089', 'ece', 2)]
[('210421104173', 'cse', 2), ('210421106092', 'ece', 2)]
[('210421104175', 'cse', 2), ('210421106093', 'ece', 2)]
[('210421104176', 'cse', 2), ('210421106094', 'ece', 2)]
[('210421104177', 'cse', 2), ('210421106095', 'ece', 2)]
[('210421104179', 'cse', 2), ('210421106096', 'ece', 2)]
[('210421104180', 'cse', 2), ('210421106097', 'ece', 2)]
[('210421104181', 'cse', 2), ('210421106098', 'ece', 2)]
[('210421104182', 'cse', 2), ('210421106099', 'ece', 2)]
[('210421104183', 'cse', 2), ('210421106102', 'ece', 2)]
[('210421104184', 'cse', 2), ('210421106103', 'ece', 2)]
[('210421104185', 'cse', 2), ('210421106104', 'ece', 2)]
[('210421104187', 'cse', 2), ('210421106105', 'ece', 2)]
[('210421104188', 'cse', 2), ('210421106106', 'ece', 2)]
[('210421104301', 'cse', 2), ('210421106107', 'ece', 2)]
[('210421104302', 'cse', 2), ('210421106109', 'ece', 2)]
[('210421104304', 'cse', 2), ('210421106113', 'ece', 2)]
[('210421104305', 'cse', 2), ('210421106115', 'ece', 2)]
[('210421104306', 'cse', 2), ('210421106117', 'ece', 2)]
[('210421205002', 'it', 2), ('210421106118', 'ece', 2)]
[('210421205004', 'it', 2), ('210421106120', 'ece', 2)]
[('210421205005', 'it', 2), ('210421106121', 'ece', 2)]
[('210421205006', 'it', 2), ('210421106122', 'ece', 2)]
[('210421205007', 'it', 2), ('210421106123', 'ece', 2)]
[('210421205011', 'it', 2), ('210421106124', 'ece', 2)]
[('210421205012', 'it', 2), ('210421106301', 'ece', 2)]
[('210421205013', 'it', 2), ('210421106302', 'ece', 2)]
[('210421205014', 'it', 2), ('210421106303', 'ece', 2)]
[('210421205017', 'it', 2), ('210421106304', 'ece', 2)]
[('210421205018', 'it', 2), ('210421106305', 'ece', 2)]
[('210421205020', 'it', 2), ('210421114001', 'mech', 2)]
[('210421205023', 'it', 2), ('210421114002', 'mech', 2)]
[('210421205024', 'it', 2), ('210421114003', 'mech', 2)]
[('210421205025', 'it', 2), ('210421114004', 'mech', 2)]
[('210421205026', 'it', 2), ('210421114005', 'mech', 2)]
[('210421205027', 'it', 2), ('210421114006', 'mech', 2)]
[('210421205028', 'it', 2), ('210421114007', 'mech', 2)]
[('210421205029', 'it', 2), ('210421114009', 'mech', 2)]
[('210421205030', 'it', 2), ('210421114010', 'mech', 2)]
[('210421205031', 'it', 2), ('210421114011', 'mech', 2)]
[('210421205035', 'it', 2), ('210421114012', 'mech', 2)]
[('210421205036', 'it', 2), ('210421114013', 'mech', 2)]
[('210421205037', 'it', 2), ('210421114014', 'mech', 2)]
[('210421205038', 'it', 2), ('210421114015', 'mech', 2)]
[('210421205040', 'it', 2), ('210421114016', 'mech', 2)]
[('210421205041', 'it', 2), ('210421114017', 'mech', 2)]
[('210421205042', 'it', 2), ('210421114018', 'mech', 2)]