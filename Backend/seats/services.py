from .models import ExamTemplate, RoomData, Students, Exam
import random
import datetime


def Allotments(data):
    curr_template = data["template"]
    # print(data["template"].room_strength)
    print(data)
    # RoomData.objects.all().delete()


    # print("DATA of dates", data["timetable"])

    # dates = [date for dept in data["timetable"].values() for date in dept.keys()]
    # dates = list(set(dates))
    # date_temp = []
    # date_format = '%a %b %d %Y %H:%M:%S GMT%z (%Z)'
    # for i in dates:
    #     date_temp.append(datetime.datetime.strptime(i, date_format))
    # dates = date_temp
    # dates.sort()
    # print("Corrected Dates", dates)

    dates = {}
    for i in data["timetable"]:
        for j in data["timetable"][i]:
            if j not in dates:
                dates[j] = [{i:data["timetable"][i][j]}]
            else:
                dates[j].append({i:data["timetable"][i][j]})
    print(dates)
    master_room_dict = {}
    for date in dates: 

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
        all_students = Students.objects.filter(
            year=1).values_list('registerno', 'dept')
        all_students = list(all_students)
        # ckt_array = Students.objects.filter(ctype='C').order_by(Random(), 'dept').values_list('registerno', 'dept','year')
        ckt_array = Students.objects.filter(
            ctype='C', year=2).values_list('registerno', 'dept', 'year', 'gender')
        # it_stuff = Students.objects.filter(dept='it', year=1).values_list('registerno', 'dept','year')
        ckt_array = list(ckt_array)
        nckt_array = Students.objects.filter(
            ctype='N', year=2).values_list('registerno', 'dept', 'year', 'gender')
        nckt_array = list(nckt_array)
        # nckt_array = Students.objects.filter(ctype='N').order_by(Random(), 'dept').values_list('registerno', 'dept', 'year')
        # nckt_array = list(nckt_array) + list(it_stuff)

        # if "Model" in curr_template .template_exam_name:
        #     if abs(len(ckt_array)-len(nckt_array)) > 64:
        #         if len(ckt_array)>len(nckt_array):

        departments = Students.objects.filter(
            year=1).values_list('dept').distinct()
        departments = list(departments)

        # print("DEPARTMENTS", departments)

        ckt_array_boys = Students.objects.filter(
            ctype='C', gender="M", year=2).values_list('registerno', 'dept', 'year', 'gender')
        ckt_array_boys = list(ckt_array_boys)
        nckt_array_boys = Students.objects.filter(
            ctype='N', gender="M", year=2).values_list('registerno', 'dept', 'year', 'gender')
        nckt_array_boys = list(nckt_array_boys)
        ckt_array_girls = Students.objects.filter(
            ctype='C', gender="F", year=2).values_list('registerno', 'dept', 'year', 'gender')
        ckt_array_girls = list(ckt_array_girls)
        nckt_array_girls = Students.objects.filter(
            ctype='N', gender="F", year=2).values_list('registerno', 'dept', 'year', 'gender')
        nckt_array_girls = list(nckt_array_girls)
        print(ckt_array_girls)
        print(nckt_array_girls)

        main_building_array = Students.objects.filter(year=1, degree="UG", dept__in=[
                                                    "cse", "it", "aids"]).values_list('registerno', 'dept', 'year', 'gender')
        main_building_array = list(main_building_array)
        new_building_array = Students.objects.filter(year=1, degree="UG").values_list(
            'registerno', 'dept', 'year').exclude(dept__in=["cse", "it", "aids"])
        new_building_array = list(new_building_array)

        meguys = Students.objects.filter(
            degree="PG").values_list('registerno', 'dept', 'year', 'gender')

        phdguys = Students.objects.filter(
            degree="PhD").values_list('registerno', 'dept', 'year', 'gender')
        # pg_students =

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

        if "Model" in data["name"] or "Semester" in data["name"]:
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


            # Divide the array into 4 parts
            # part_size = len(main_building_rooms) // 5
            # parts = [main_building_rooms[i:i+part_size] for i in range(0, len(main_building_rooms), part_size)]
            # # Randomize each part separately
            # for i in range(len(parts)):
            #     parts[i] = random.sample(parts[i], len(parts[i]))
            # # Flatten the parts back into a single array
            # main_building_rooms = [item for part in parts for item in part]
            # # Print the randomized array
            # print(main_building_rooms)


            # part_size = len(new_building_rooms) // 8
            # parts = [new_building_rooms[i:i+part_size] for i in range(0, len(new_building_rooms), part_size)]
            # # Randomize each part separately
            # for i in range(len(parts)):
            #     parts[i] = random.sample(parts[i], len(parts[i]))
            # # Flatten the parts back into a single array
            # new_building_rooms = [item for part in parts for item in part]
            # # Print the randomized array
            # new_building_rooms.remove("EH27")
            # print(new_building_rooms)


            main_building_rooms = ["T3", "T6", "T4", "T9", "T7", "T8", "T10", "T14", "T15", "T16", "T18", "T17", "T20", "MT1","T21", "MT4", "MT2", "MT3", "MT5"]
            new_building_rooms = ["EH3","EH2","EH1","EH6", "EH5","EH4","EH9", "EH8", "EH7","EH12", "EH11", "EH10", "EH15", "EH14", "EH13", "EH16", "EH17", "EH18", "EH21", "EH19", "EH20", "EH22", "EH23", "EH24", "EH25", "EH26"  ]
            # random.shuffle(main_building_rooms)
            # random.shuffle(new_building_rooms)
            last_room = ""  
            for i in main_building_rooms:
                print(curr_template.room_strength)
                for j in range(curr_template.room_strength):
                    if c1 >= len(main_building_array):
                        f1 = 1
                        break
                    curr_room.append([main_building_array[c1], 0])
                    c1 += 1
                room_dict[i] = curr_room
                last_room = i
                curr_room = []
                if f1 == 1:
                    break
            c2 = 0
            f2 = 0
            
            for i in new_building_rooms:
                print(i)
                for j in range(curr_template.room_strength):
                    if c2 >= len(new_building_array):
                        f2 = 1
                        break
                    curr_room.append([new_building_array[c2], 0])
                    c2 += 1
                print("CURRENT Allotment", curr_room)
                if len(new_building_array[c2:]) < 3:
                    print("LEFT OVER", c2)
                    print("YAYYY WE FOUND IT")
                    print("Length", len(new_building_array[c2:]))
                    count = 0
                    for k in range(len(new_building_array[c2:])):
                        curr_room.append([new_building_array[c2+k], 0])
                        count += 1
                    c2 += count
                    # break
                    f2 = 1
                room_dict[i] = curr_room
                
                print("CURRENT ROOM AT LAST", curr_room)
                curr_room = []

                if f2 == 1:
                    break
            cm = 0
            fm = 0
            for j in range(curr_template.room_strength):
                if cm >= len(meguys):
                    fm = 1
                    break
                curr_room.append([meguys[cm], 0])
                cm += 1

            room_dict["EH27"] = curr_room
            curr_room = []

            cp = 0
            fp = 0
            for j in range(curr_template.room_strength):
                if cp >= len(phdguys):
                    fp = 1
                    break
                curr_room.append([phdguys[cp], 0])
                cp += 1
            room_dict[last_room].extend(curr_room)
            curr_room = []

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
        print("ROOM DICT", room_dict)
        for i in room_dict:
            print(i)
            for j in room_dict[i]:
                print(j)
        master_room_dict[date] = room_dict
    master_room_ranges = {}
    for date in master_room_dict:
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
        master_room_ranges[date] = ranges_dict

    exam_curr = Exam.objects.filter(name=data["name"])
    exam_curr = exam_curr[0]        
    print(exam_curr)
    try:
        i = room[(room.index(i)+1)]
        room = room[(room.index(i)):]
    except:
        pass
    model = RoomData(rooms=master_room_dict, ranges=master_room_ranges, exam=exam_curr)
    model.save()
    queryset = RoomData.objects.all()
