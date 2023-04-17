from .models import *
import random
import datetime
from django.db.models.functions import Substr
from django.core import serializers
from django.db.models import IntegerField
import re


def Allotments(data):

    curr_template = data["exam_template"]
    print(data)

    dates = {}
    for i in data["time_table"]:
        for j in data["time_table"][i]:
            if j not in dates:
                dates[j] = [{i: data["time_table"][i][j]}]
            else:
                dates[j].append({i: data["time_table"][i][j]})
    print("Dates", dates)
    master_room_dict = {}

    exam_curr = Exams.objects.filter(exam_name=data["exam_name"])
    exam_curr = exam_curr[0]

    rooms_in_buildings = {}
    rooms_selected = curr_template.rooms.all()
    for b in list(curr_template.buildings.values_list('building_name', flat=True)):
        rooms_in_buildings[b] = []

    for r in rooms_selected:
        if r.room_building.building_name in rooms_in_buildings:
            rooms_in_buildings[r.room_building.building_name].append(r)

    # ? SAMPLE ROOMS_IN_BUILDINGS
    # {
    #     'Main Building': [<Rooms: 1>, <Rooms: 2>, <Rooms: 3>, <Rooms: 4>, <Rooms: 5>]
    # }

    #! All the parameters we need to look at
    # * - Different Buildings
    # * 1. Is single seater?
    # * 2. Boys girls separated?
    # * 3. Is alternate dept seated?
    # * 4. Is years together?
    # * 5. Is departments together?
    # * 6. Is phd?
    # * 7. Is m.e?
    # * 8. Is send whatsapp message?
    # * 9. Time to send whatsapp message?
    # * 10. Sets for which subjects?
    # * 11. No of sets?
    # * 12. Second column options?

    # ? SAMPLE DATES
    {
        'Sun Mar 05 2023 05:30:00 GMT+0530 (India Standard Time)': [{'it': 'CS3451'}, {'aids': 'AI6969'}, {'csbs': 'c'}, {'eee': 'd'}],
        'Mon Mar 06 2023 05:30:00 GMT+0530 (India Standard Time)': [{'it': 'e'}, {'aids': 'g'}, {'eee': 'h'}, {'cse': 'f'}],
        'Tue Mar 07 2023 05:30:00 GMT+0530 (India Standard Time)': [{'it': 'i'}, {'aids': 'k'}, {'csbs': 'l'}, {'eee': 'm'}, {'cse': 'j'}],
        'Wed Mar 08 2023 05:30:00 GMT+0530 (India Standard Time)': [{'it': 'n'}, {'aids': 'p'}, {'csbs': 'q'}, {'cse': 'o'}],
        'Thu Mar 09 2023 05:30:00 GMT+0530 (India Standard Time)': [{'it': 's'}, {'aids': 'u'}, {'csbs': 'v'}, {'eee': 'w'}, {'cse': 't'}],
        'Fri Mar 10 2023 05:30:00 GMT+0530 (India Standard Time)': [{'it': 'x'}, {'aids': 'z'}, {'csbs': '12'}, {'eee': '13'}, {'cse': 'y'}]
    }

    for date in dates:

        buildings_in_exam = exam_curr.departments

        # ? SAMPLE DEPARTMENTS_IN_EXAM
        test = {
            "Main Building": ["cse", "it", "aids", "csbs"],
            "New Building": ["ece", "eee", "mct", "mech", "civil", "bme"],
        }

        # 1. let us check if the exam contains only main building or more than that
        # 2. if it contains only main building then we can directly allot the rooms
        #

        # Psuedo Code
        # if is m.e.
        #     create a list of all the students
        #     start allocating rooms from list to the room mentioned
        #
        # if is phd
        #     create a list of all the students
        #     start allocating rooms from list to the room mentioned
        #
        # the me room is removed from other allotments
        # for each building
        #     if single seater
        #           create a list of all the students
        #           if alternate dept seated
        #               create a list of all the students from circuit branch
        #               create a list of all the students from non circuit branch
        #               start allocating rooms with two from each list - first circuit then non circuit
        #           else
        #               create a list of all the students
        #               start allocating rooms from list
        #     else
        #           if boys girls separation
        #               if years together
        #                   create a list of all the girls from year 1
        #                   create a list of all the girls from year 2
        #                   create a list of all the boys from year 1
        #                   create a list of all the boys from year 2
        #                   start allocating rooms with two from each list - first girls then boys
        #              #!else
        #                   create a list of all girls from circuit branch
        #                   create a list of all girls from non circuit branch
        #                   create a list of all boys from circuit branch
        #                   create a list of all boys from non circuit branch
        #                   start allocating rooms with two from each list - first girls then boys
        #          else
        #              if years together
        #                  create a list of all the students from year 1
        #                  create a list of all the students from year 2
        #                  start allocating rooms with two from each list
        #             #!else
        #                 create a list of all circuit students
        #                 create a list of all non circuit students
        #                 start allocating rooms with two from each list
        #           create a list of all circuit students
        #           create a list of all non circuit students
        #           start allocating rooms with two from each list
        #
        # MAIN_BUILDING_ROOMS_IN_ORDER = list(Rooms.objects.filter(room_building="New Building").annotate(room_number_int=Substr('room_number', 2, output_field=IntegerField())).order_by('room_number_int'))
        # MAIN_BUILDING_ROOMS_IN_ORDER.sort(key=lambda x: x.room_number_int)

        # NEW_BUILDING_ROOMS_IN_ORDER = list(Rooms.objects.filter(room_building="New Building").annotate(room_number_int=Substr('room_number', 3, output_field=IntegerField())).order_by('room_number_int'))
        # NEW_BUILDING_ROOMS_IN_ORDER.sort(key=lambda x: x.room_number_int)

        room_dict = {}
        ranges_dict = {}
        curr_room = []
        # ROOMS = list(curr_template.rooms.all())
        # MainBuildingRooms = list(curr_template.rooms.filter(room_building="Main Building").annotate(
        #     room_number_int=Substr('room_number', 2, output_field=IntegerField())).order_by('room_number_int'))

        # MainBuildingRooms.sort(key=lambda x: x.room_number_int)
        # NewBuildingRooms = list(curr_template.rooms.filter(room_building="New Building").annotate(
        #     room_number_int=Substr('room_number', 3, output_field=IntegerField())).order_by('room_number_int'))
        # NewBuildingRooms.sort(key=lambda x: x.room_number_int)
        MainBuildingRooms = list(
            curr_template.rooms.filter(room_building="Main Building"))
        MainBuildingRooms.sort(key=lambda x: (
            x.room_number[0], int(re.search(r'\d+', x.room_number).group(0))))

        NewBuildingRooms = list(
            curr_template.rooms.filter(room_building="New Building"))
        NewBuildingRooms.sort(key=lambda x: (x.room_number[0], int(
            re.search(r'\d+', x.room_number).group(0))))

        # ROOMS = MainBuildingRooms + NewBuildingRooms
        rooms_list_temp = ["F1", "F3", "F4", "F7", "F8", "F9", "F22", "S11", "F23", "S1", "S2", "S3", "S4", "S5", "S6", "S7", "S8", "S12", "S15", "S16", "S17", "S18", "S20", "S21", "S22", "S23","S24", "S26", "T21", "T22" ]
        
        ROOMS = []
        for room in rooms_list_temp:
            ROOMS.append(Rooms.objects.get(room_number=room))
        print("ROOMS", ROOMS)


        girls_room = []
        print("ROOMS", ROOMS)

        ckt_departments = []
        nckt_departments = []
        entire_department_list = list(Departments.objects.all())
        for dept in entire_department_list:
            if dept.ctype == "C":
                ckt_departments.append(dept)
            elif dept.ctype == "N":
                nckt_departments.append(dept)
        print("ckt_departments", ckt_departments)
        print("nckt_departments", nckt_departments)
        if exam_curr.is_me:
            cm = 0
            fm = 0
            me_guys = Students.objects.filter(degree="PG")
            me_guys = list(me_guys)
            for i in range(curr_template.room_strength):
                if cm >= len(me_guys):
                    fm = 1
                    break
                curr_room.append([me_guys[cm], 0])
                cm += 1
            room_dict[exam_curr.me_room.room_number] = curr_room
            curr_room = []
            ROOMS.remove(exam_curr.me_room.room_number)

        for building in buildings_in_exam:

            departments_currently = list(buildings_in_exam[building])
            if departments_currently == []:
                continue

            ckt_dept = []
            nckt_dept = []
            for dept in departments_currently:
                if Departments.objects.get(branch_short_name=dept) in ckt_departments:
                    ckt_dept.append(dept)
                elif Departments.objects.get(branch_short_name=dept) in nckt_departments:
                    nckt_dept.append(dept)
            print("CKT DEPT", ckt_dept)
            print("NCKT DEPT", nckt_dept)

            if curr_template.is_single_seater:

                if curr_template.is_alternate_dept_seated:

                    years = list(
                        exam_curr.years.values_list("year", flat=True))
                    ckt_array = []
                    nckt_array = []
                    for year in years:
                        ckt_array.extend(list(Students.objects.filter(ctype="C", department__in=ckt_dept, year=year).values_list(
                            "register_number", "department", "year", "gender")))
                        nckt_array.extend(list(Students.objects.filter(ctype="N", department__in=nckt_dept, year=year).values_list(
                            "register_number", "department", "year", "gender")))
                    # ckt_array = list(Students.objects.filter(ctype="C", department__in=ckt_dept).values_list("register_number", "department", "year", "gender", "name"))
                    # nckt_array = list(Students.objects.filter(ctype="N", department__in=nckt_dept).values_list("register_number", "department", "year", "gender", "name"))

                    c1c = 0
                    c1nc = 0
                    f1 = 0

                    for r in ROOMS:
                        print("ROOM", r)
                        # strength = curr_template.room_strength//2
                        # for i in range(strength):
                        #     if c1 >= len(ckt_array) and c1 >= len(nckt_array):
                        #         f1 = 1
                        #         break
                        #     try:
                        #         if ckt_array[c1] and nckt_array[c1]:
                        #             curr_room.append([ckt_array[c1], 0])
                        #             curr_room.append([nckt_array[c1], 0])
                        #         elif ckt_array[c1]:
                        #             curr_room.append([ckt_array[c1], 0])
                        #             curr_room.append([0,0])
                        #         elif nckt_array[c1]:
                        #             curr_room.append([nckt_array[c1], 0])
                        #             curr_room.append([0,0])
                        #         else:
                        #             break
                        #         c1 += 1
                        #     except:
                        #         try:
                        #             if ckt_array[c1]:
                        #                 curr_room.append([ckt_array[c1], 0])
                        #                 curr_room.append([0,0])
                        #         except:
                        #             if nckt_array[c1]:
                        #                 curr_room.append([nckt_array[c1], 0])
                        #                 curr_room.append([0,0])
                        #         c1 += 1

                        # Here we need to allocate the students in the room by each list alternating at a time. We need to refer the above commented code for reference.
                        # the above code has a problem where the room ends with even number itself, so we need to keep the alternation in continuation.
                        # for example, if we have 4 students in a room, then the first student will be from ckt, second from nckt, third from ckt and fourth from nckt.
                        # if we have 5 students in a room, then the first student will be from ckt, second from nckt, third from ckt, fourth from nckt and fifth from ckt.

                        # I think it's best to keep an alternation variable and keep it toggling between 0 and 1. If it's 0, then we need to take the student from ckt_array and if it's 1, then we need to take the student from nckt_array.

                        alternation = 0
                        for i in range(curr_template.room_strength):

                            if c1c >= len(ckt_array) and c1nc >= len(nckt_array):
                                f1 = 1
                                break
                            try:
                                if alternation == 0:
                                    curr_room.append([ckt_array[c1c], 0])
                                    c1c += 1
                                    alternation = 1
                                else:
                                    curr_room.append([nckt_array[c1nc], 0])
                                    c1nc += 1
                                    alternation = 0
                            except:
                                try:
                                    if alternation == 0 and c1nc > len(nckt_array):
                                        curr_room.append([ckt_array[c1c], 0])
                                        c1c += 1
                                    else:
                                        curr_room.append([nckt_array[c1nc], 0])
                                        c1nc += 1
                                        alternation = 0
                                except:
                                    if alternation == 0 and c1c > len(ckt_array):
                                        curr_room.append([nckt_array[c1nc], 0])
                                        c1nc += 1
                                    else:
                                        curr_room.append([ckt_array[c1c], 0])
                                        c1c += 1
                                        alternation = 1

                        room_dict[r.room_number] = curr_room
                        # print("room dict of ", r.room_number,
                        #       room_dict[r.room_number])
                        curr_room = []
                    master_room_dict[date] = room_dict
                else:
                    all_students = []
                    years = list(
                        exam_curr.years.values_list("year", flat=True))
                    for year in years:
                        all_students.extend(list(Students.objects.filter(year=year).values_list(
                            "register_number", "department", "year", "gender")))

                    c2 = 0
                    f2 = 0

                    for r in ROOMS:
                        for i in range(curr_template.room_strength):
                            if c2 >= len(all_students):
                                f2 = 1
                                break
                            curr_room.append([all_students[c2], 0])
                            c2 += 1
                        room_dict[r.room_number] = curr_room
                        curr_room = []

            else:
                if curr_template.is_boys_girls_separation:
                    # girls_room = []
                    if exam_curr.is_years_together:
                        years_students = {}
                        years = list(exam_curr.years.all(
                        ).values_list("year", flat=True))
                        for y in years:
                            if y==2:
                                years_students[str(y)+"M"] = list(Students.objects.filter(
                                    year=y, gender="M").values_list("register_number", "department", "year", "gender", "name"))
                                years_students[str(y)+"F"] = list(Students.objects.filter(
                                    year=y, gender="F").values_list("register_number", "department", "year", "gender", "name"))
                            if y==3:
                                years_students[str(y)+"M"] = list(Students.objects.filter(
                                    year=y, gender="M").exclude(department__in=["aids", "eee"]).values_list("register_number", "department", "year", "gender", "name"))
                                years_students[str(y)+"F"] = list(Students.objects.filter(
                                    year=y, gender="F").exclude(department__in=["aids", "eee"]).values_list("register_number", "department", "year", "gender", "name"))


                        # ckt_arrayREPEAT = []
                        # nckt_arrayREPEAT = []
                        # for year in years:
                        #     ckt_arrayREPEAT.extend(list(Students.objects.filter(ctype="C", department__in=ckt_dept, year=year, gender="M").values_list(
                        #         "register_number", "department", "year", "gender")))
                        #     nckt_arrayREPEAT.extend(list(Students.objects.filter(ctype="N", department__in=nckt_dept, year=year, gender="M").values_list(
                        #         "register_number", "department", "year", "gender")))


                        # print("YEARS STUDENTS", years_students)

                        c3b = 0
                        f3b = 0
                        c3g = 0
                        f3g = 0
                        c1cREPEAT = 0
                        c1ncREPEAT = 0
                        f1REPEAT = 0
                        for r in ROOMS:
                            changeDone = 0
                            # if r.room_number == "F23":
                            #     changeDone = 1
                            #     r = Rooms.objects.get(room_number="S11")
                            
                            strength = r.room_strength//2
                            # strength = curr_template.room_strength//2
                            for j in range(strength):
                                if c3g >= len(years_students["2F"]) and c3g >= len(years_students["3F"]):
                                    f3g = 1
                                    break
                                try:
                                    if years_students["2F"][c3g] and years_students["3F"][c3g]:
                                        curr_room.append(
                                            [years_students["2F"][c3g], years_students["3F"][c3g]])
                                    elif years_students["2F"][c3g]:
                                        curr_room.append(
                                            [years_students["2F"][c3g], 0])
                                    elif years_students["3F"][c3g]:
                                        curr_room.append(
                                            [years_students["3F"][c3g], 0])
                                    else:
                                        break
                                    # print("C3G",c3g)
                                    c3g += 1
                                except IndexError:
                                    try:
                                        if years_students["2F"][c3g]:
                                            curr_room.append(
                                                [years_students["2F"][c3g], 0])
                                        c3g += 1
                                    except:
                                        if years_students["3F"][c3g]:
                                            curr_room.append(
                                                [years_students["3F"][c3g], 0])
                                        c3g += 1
                                        # print("C3G", c3g)
                            # if len(years_students["2F"][c3g:]) < 3:
                            #     if c3g >= len(years_students["2F"]) and c3g >= len(years_students["3F"]):
                            #         f3g = 1
                            #         break
                            # if len(years_students["2F"][c3g:]) < 3:
                            #     print("LEFT OVER", c3g)
                            #     print("YAYYY WE FOUND IT")
                            #     print("Length", len(years_students[c3g:]))
                            #     count = 0
                            #     for k in range(len(years_students[c3g:])):
                            #         curr_room.append(
                            #             [years_students[c3g+k], 0])
                            #         count += 1
                            #     c3g += count
                            #     # break
                            #     f3g = 1
                            
                            room_dict[r.room_number] = curr_room
                            curr_room = []
                            # room.remove(i)
                            if changeDone == 0:
                                girls_room.append(r)

                            if c3g >= len(years_students["2F"]) and c3g >= len(years_students["3F"]):
                                f3g = 1
                                break

                            

                            if f3g == 1:
                                break
                        master_room_dict[date] = room_dict
                        
                        for gr in girls_room:
                        
                            ROOMS.remove(gr)

                        c1cREPEAT = c3b
                        c1ncREPEAT = c3b
                        flagForOnce = 0

                        for r in ROOMS:

                            
                            
                            if r.room_strength == 25:

                                if flagForOnce == 0:
                                    c1cREPEAT = c3b
                                    c1ncREPEAT = c3b
                                    flagForOnce = 1

                                alternationRepeat = 0
                                for i in range(r.room_strength):

                                    if c1cREPEAT >= len(years_students["2M"]) and c1ncREPEAT >= len(years_students["3M"]):
                                        f1REPEAT = 1
                                        break
                                    try:
                                        if alternationRepeat == 0:
                                            curr_room.append([years_students["2M"][c1cREPEAT], 0])
                                            c1cREPEAT += 1
                                            alternationRepeat = 1
                                        else:
                                            curr_room.append([years_students["3M"][c1ncREPEAT], 0])
                                            c1ncREPEAT += 1
                                            alternationRepeat = 0
                                    except:
                                        try:
                                            if alternationRepeat == 0 and c1ncREPEAT > len(years_students["3M"]):
                                                curr_room.append([years_students["2M"][c1cREPEAT], 0])
                                                c1cREPEAT += 1
                                            else:
                                                curr_room.append([years_students["3M"][c1ncREPEAT], 0])
                                                c1ncREPEAT += 1
                                                alternationRepeat = 0
                                        except:
                                            if alternationRepeat == 0 and c1cREPEAT > len(years_students["2M"]):
                                                curr_room.append([years_students["3M"][c1ncREPEAT], 0])
                                                c1ncREPEAT += 1
                                            else:
                                                curr_room.append([years_students["2M"][c1cREPEAT], 0])
                                                c1cREPEAT += 1
                                                alternationRepeat = 1


                            else:    

                                # if r.room_number == "S13":
                                #     r = Rooms.objects.get(room_number="F23")
                                strength = r.room_strength//2
                                # strength = curr_template.room_strength//2
                                for i in range(strength):
                                    if c3b >= len(years_students["2M"]) and c3b >= len(years_students["3M"]):
                                        f3b = 1
                                        break
                                    try:
                                        if years_students["2M"][c3b] and years_students["3M"][c3b]:
                                            curr_room.append(
                                                [years_students["2M"][c3b], years_students["3M"][c3b]])
                                        elif years_students["2M"][c3b]:
                                            curr_room.append(
                                                [years_students["2M"][c3b], 0])
                                        elif years_students["3M"][c3b]:
                                            curr_room.append(
                                                [years_students["3M"][c3b], 0])
                                        else:
                                            break
                                        c3b += 1
                                    except IndexError:
                                        try:
                                            if years_students["2M"][c3b]:
                                                curr_room.append(
                                                    [years_students["2M"][c3b], 0])
                                            c3b += 1
                                        except:
                                            if years_students["3M"][c3b]:
                                                curr_room.append(
                                                    [years_students["3M"][c3b], 0])

                                            c3b += 1

                                    if c3b >= len(years_students["2M"]) and c3b >= len(years_students["3M"]):
                                        f3b = 1
                                        break
                                # if len(years_students["2M"][c3b:]) < 3:
                                #     print("LEFT OVER", c3b)
                                #     print("YAYYY WE FOUND IT")
                                #     print("Length", len(years_students[c3b:]))
                                #     count = 0
                                #     for k in range(len(years_students[c3b:])):
                                #         curr_room.append(
                                #             [years_students[c3b+k], 0])
                                #         count += 1
                                #     c3b += count
                                #     # break
                                #     f3b = 1

                            room_dict[r.room_number] = curr_room
                            curr_room = []
                            # room.remove(i)
                            if f3b == 1:
                                break
                        master_room_dict[date] = room_dict
                    else:
                        # years_students = {}
                        students_to_be_put = {
                            "M-CKT": [],
                            "F-CKT": [],
                            "M-NCKT": [],
                            "F-NCKT": []
                        }

                        years = list(exam_curr.years.all(
                        ).values_list("year", flat=True))
                        for y in years:

                            # students_to_be_put["M-CKT"].extend(list(Students.objects.filter(
                            #     year=y, gender="M", ctype="C", department="aiml").values_list("register_number", "department", "year", "gender", "name")))
                            # students_to_be_put["M-CKT"].extend(list(Students.objects.filter(
                            #     year=y, gender="M", ctype="C", department__in=ckt_dept).values_list("register_number", "department", "year", "gender", "name").exclude(department__in=["aiml", "csbs"])))

                            # students_to_be_put["F-CKT"].extend(list(Students.objects.filter(
                            #     year=y, gender="F", ctype="C", department="aiml").values_list("register_number", "department", "year", "gender", "name")))
                            # students_to_be_put["F-CKT"].extend(list(Students.objects.filter(
                            #     year=y, gender="F", ctype="C", department__in=ckt_dept).values_list("register_number", "department", "year", "gender", "name").exclude(department__in=["aiml", "csbs"])))

                            # students_to_be_put["M-NCKT"].extend(list(Students.objects.filter(
                            #     year=y, gender="M", ctype="C", department="csbs").values_list("register_number", "department", "year", "gender", "name")))
                            # students_to_be_put["M-NCKT"].extend(list(Students.objects.filter(
                            #     year=y, gender="M", ctype="N", department__in=nckt_dept).values_list("register_number", "department", "year", "gender", "name").exclude(department__in=["aiml", "csbs"])))

                            # students_to_be_put["F-NCKT"].extend(list(Students.objects.filter(
                            #     year=y, gender="F", ctype="C", department="csbs").values_list("register_number", "department", "year", "gender", "name")))
                            # students_to_be_put["F-NCKT"].extend(list(Students.objects.filter(
                            #     year=y, gender="F", ctype="N", department__in=nckt_dept).values_list("register_number", "department", "year", "gender", "name").exclude(department__in=["aiml", "csbs"])))

                            students_to_be_put["M-NCKT"].extend(list(Students.objects.filter(
                                year=y, gender="M", ctype="N", department__in=["mech" ]).values_list("register_number", "department", "year", "gender", "name")))
                            students_to_be_put["F-NCKT"].extend(list(Students.objects.filter(
                                year=y, gender="F", ctype="N", department__in=["mech"]).values_list("register_number", "department", "year", "gender", "name")))
                            students_to_be_put["M-CKT"].extend(list(Students.objects.filter(
                                year=y, gender="M", ctype="N", department__in=["mct", "civil"]).values_list("register_number", "department", "year", "gender", "name")))
                            students_to_be_put["F-CKT"].extend(list(Students.objects.filter(
                                year=y, gender="F", ctype="N", department__in=["mct", "civil"]).values_list("register_number", "department", "year", "gender", "name")))

                        print("STUDENTS TO BE PUT", students_to_be_put, )
                        print("TOTAL ROOMS", ROOMS)
                        c4b = 0
                        f4b = 0
                        c4g = 0
                        f4g = 0
                        # girls_room = []
                        room_numbers_temp=["T2", "T3", "T4", "T6", "T1"]
                        ROOMS = list(Rooms.objects.filter(room_number__in=room_numbers_temp))
                        for r in ROOMS:
                            strength = 0
                            print("ROOM STRENGTH of",
                                  r.room_number, r.room_strength)
                            # if r.room_strength//2 < 30:
                            #     strength = r.room_strength//2
                            #     print("Corrected Strength", strength)
                            # else:
                            #     strength = curr_template.room_strength//2
                            #     print("Strength", strength)
                            strength = r.room_strength//2
                            for j in range(strength):
                                if c4g >= len(students_to_be_put["F-CKT"]) and c4g >= len(students_to_be_put["F-NCKT"]):
                                    f4g = 1
                                    break
                                try:
                                    if students_to_be_put["F-CKT"][c4g] and students_to_be_put["F-NCKT"][c4g]:
                                        curr_room.append(
                                            [students_to_be_put["F-CKT"][c4g], students_to_be_put["F-NCKT"][c4g]])
                                    elif students_to_be_put["F-CKT"][c4g]:
                                        curr_room.append(
                                            [students_to_be_put["F-CKT"][c4g], 0])
                                    elif students_to_be_put["F-NCKT"][c4g]:
                                        curr_room.append(
                                            [students_to_be_put["F-NCKT"][c4g], 0])
                                    else:
                                        break
                                    c4g += 1
                                except IndexError:
                                    try:
                                        if students_to_be_put["F-CKT"][c4g]:
                                            curr_room.append(
                                                [students_to_be_put["F-CKT"][c4g], 0])
                                    except:
                                        if students_to_be_put["F-NCKT"][c4g]:
                                            curr_room.append(
                                                [students_to_be_put["F-NCKT"][c4g], 0])
                                    c4g += 1

                                if c4g >= len(students_to_be_put["F-CKT"]) and c4g >= len(students_to_be_put["F-NCKT"]):
                                    f4g = 1
                                    break
                            if len(students_to_be_put["F-CKT"][c4g:]) < 3 and len(students_to_be_put["F-CKT"][c4g:]) != 0:
                                print("LEFT OVER", c4g)
                                print("YAYYY WE FOUND IT")
                                print("Length", len(
                                    students_to_be_put["F-CKT"][c4g:]))
                                count = 0
                                for k in range(len(students_to_be_put["F-CKT"][c4g:])):
                                    curr_room.append(
                                        [students_to_be_put["F-CKT"][c4g+k], 0])
                                    count += 1
                                c4g += count
                                # break
                                f4g = 1

                            room_dict[r.room_number] = curr_room
                            curr_room = []
                            # room.remove(i)
                            girls_room.append(r)
                            if f4g == 1:
                                break
                        print("GIRLS HAHA", girls_room)
                        print("TOTAL ROOMS", ROOMS)
                        if girls_room != []:

                            for gr in girls_room:
                                # if gr in ROOMS:
                                # print("roomie", list(Rooms.objects.filter(room_number=gr)))
                                ROOMS.remove(Rooms.objects.get(room_number=gr))
                                # ROOMS.remove(gr)
                        # print(students_to_be_put["M-CKT"])
                        print()
                        # print(students_to_be_put["M-NCKT"])
                        for r in ROOMS:

                            print("CURRENT ROOM IN BOYS", r.room_number)
                            # strength =
                            #  curr_template.room_strength//2
                            strength = 0
                            # if r.room_strength//2 < 30:
                            #     strength = r.room_strength//2
                            # else:
                            #     strength = curr_template.room_strength//2
                            strength = r.room_strength//2
                            print("STRENGTH", strength)
                            for i in range(strength):

                                # print("C4G", c4g)
                                if c4b >= len(students_to_be_put["M-CKT"]) and c4b >= len(students_to_be_put["M-NCKT"]):
                                    f4b = 1
                                    break
                                print("C4B", c4b, len(
                                    students_to_be_put["M-CKT"]), len(students_to_be_put["M-NCKT"]))
                                try:
                                    if students_to_be_put["M-CKT"][c4b] and students_to_be_put["M-NCKT"][c4b]:
                                        curr_room.append(
                                            [students_to_be_put["M-CKT"][c4b], students_to_be_put["M-NCKT"][c4b]])
                                    elif students_to_be_put["M-CKT"][c4b]:
                                        curr_room.append(
                                            [students_to_be_put["M-CKT"][c4b], 0])
                                    elif students_to_be_put["M-NCKT"][c4b]:
                                        curr_room.append(
                                            [students_to_be_put["M-NCKT"][c4b], 0])
                                    else:
                                        break
                                    c4b += 1
                                except IndexError:
                                    try:
                                        if students_to_be_put["M-NCKT"][c4b]:
                                            curr_room.append(
                                                [students_to_be_put["M-NCKT"][c4b], 0])
                                    except IndexError:
                                        if students_to_be_put["M-CKT"][c4b]:
                                            curr_room.append(
                                                [students_to_be_put["M-CKT"][c4b], 0])

                                    c4b += 1

                                if c4b >= len(students_to_be_put["M-CKT"]) and c4b >= len(students_to_be_put["M-NCKT"]):
                                    f4b = 1
                                    break
                            if len(students_to_be_put["M-CKT"][c4b:]) < 3 and len(students_to_be_put["M-CKT"][c4b:]) != 0:
                                print("LEFT OVER", c4b)
                                print("YAYYY WE FOUND IT")
                                print("Length", len(
                                    students_to_be_put["M-CKT"][c4b:]))
                                count = 0
                                for k in range(len(students_to_be_put["M-CKT"][c4b:])):
                                    curr_room.append(
                                        [students_to_be_put["M-CKT"][c4b+k], 0])
                                    count += 1
                                c4b += count
                                # break
                                f4b = 1

                            room_dict[r.room_number] = curr_room
                            curr_room = []
                            # room.remove(i)
                            if f4b == 1:
                                break
                        master_room_dict[date] = room_dict

                else:
                    if exam_curr.is_years_together:
                        years_students = {}
                        years = list(
                            exam_curr.years.values_list("year", flat=True))
                        for y in years:
                            years_students[y] = list(Students.objects.filter(
                                year=y).values_list("register_number", "department", "year", "gender", "name"))
                            # years_students[y] =
                        c5 = 0
                        f5 = 0
                        for r in curr_template.rooms:
                            strength = curr_template.room_strength//2
                            for i in range(strength):
                                if c5 >= len(years_students[2]) and c5 >= len(years_students[3]):
                                    f5 = 1
                                    break
                                try:
                                    if years_students[2][c5] and years_students[3][c5]:
                                        curr_room.append(
                                            [years_students[2][c5], years_students[3][c5]])

                                    elif years_students[2][c5]:
                                        curr_room.append(
                                            [years_students[2][c5], 0])
                                    elif years_students[3][c5]:
                                        curr_room.append(
                                            [years_students[3][c5], 0])
                                    else:
                                        break
                                    c5 += 1
                                except:
                                    try:
                                        if years_students[2][c5]:
                                            curr_room.append(
                                                [years_students[1][c5], 0])
                                    except:
                                        if years_students[3][c5]:
                                            curr_room.append(
                                                [years_students[2][c5], 0])
                                    c5 += 1
                            room_dict[r.room_number] = curr_room
                            curr_room = []
                            if f5 == 1:
                                break
                        master_room_dict[date] = room_dict
                    else:
                        students_to_be_put = {
                            "CKT": [],
                            "NCKT": [],
                        }

                        years = list(
                            exam_curr.years.values_list("year", flat=True))
                        for y in years:
                            students_to_be_put["CKT"].extend(Students.objects.filter(
                                year=y, ctype="C", department__in=ckt_dept).values_list("register_number", "department", "year", "gender", "name"))
                            students_to_be_put["NCKT"].extend(Students.objects.filter(
                                year=y, ctype="N", department__in=nckt_dept).values_list("register_number", "department", "year", "gender", "name"))

                        c6 = 0
                        f6 = 0
                        for r in curr_template.rooms:
                            strength = curr_template.room_strength//2
                            for i in range(strength):
                                if c6 >= len(students_to_be_put["CKT"]) and c6 >= len(students_to_be_put["NCKT"]):
                                    f6 = 1
                                    break
                                try:
                                    if students_to_be_put["CKT"][c6] and students_to_be_put["NCKT"][c6]:
                                        curr_room.append(
                                            [students_to_be_put["CKT"][c6], students_to_be_put["NCKT"][c6]])
                                    elif students_to_be_put["CKT"][c6]:
                                        curr_room.append(
                                            [students_to_be_put["CKT"][c6], 0])
                                    elif students_to_be_put["NCKT"][c6]:
                                        curr_room.append(
                                            [students_to_be_put["NCKT"][c6], 0])
                                    else:
                                        break
                                    c6 += 1
                                except:
                                    try:
                                        if students_to_be_put["CKT"][c6]:
                                            curr_room.append(
                                                [students_to_be_put["CKT"][c6], 0])
                                    except:
                                        if students_to_be_put["NCKT"][c6]:
                                            curr_room.append(
                                                [students_to_be_put["NCKT"][c6], 0])
                                    c6 += 1
                            room_dict[r.room_number] = curr_room
                            curr_room = []
                            if f6 == 1:
                                break
                        master_room_dict[date] = room_dict

        if exam_curr.is_phd:
            cp = 0
            fp = 0
            phd_guys = list(exam_curr.phd_students.values_list(
                "register_number", "department", "year", "gender"))

            # for i in range(exam_curr.me_room)
            for i in range(curr_template.room_strength):
                if cp >= len(phd_guys):
                    fp = 1
                    break
                curr_room.append([phd_guys[cp], 0])
                cp += 1
            room_dict[exam_curr.phd_room.room_number] = curr_room
            curr_room = []

            master_room_dict[date] = room_dict

    print("MASTER ROOM DICT")
    for i in master_room_dict:
        print()
        print(i)
        for j in master_room_dict[i]:
            print()
            print(j, "           ", master_room_dict[i][j])
            print("Length", len(master_room_dict[i][j]))

    master_room_ranges = {}
    if curr_template.is_boys_girls_separation:
        for date in dates:
            master_room_ranges[date] = {
                "Main Building": {
                    # "boys": {},
                    # "girls": {}
                },
                "New Building": {
                    # "boys": {},
                    # "girls": {}
                }
            }
    else:
        for date in dates:
            master_room_ranges[date] = {
                "Main Building": {},
                "New Building": {}
            }

        # print("MASTER ROOM RANGES")
        # print(master_room_ranges)

    for date in master_room_dict:
        for i in room_dict:
            # print("ROOM DICT", i)
            # print("GIRLSSS ROOMS", girls_room)
            if Rooms.objects.get(room_number=i).room_building.building_name == "Main Building":
                if curr_template.is_boys_girls_separation:

                    ranges_dict[i] = {
                        "boys": {},
                        "girls": {}
                    }
                    if Rooms.objects.get(room_number=i) in girls_room:
                        for j in room_dict[i]:
                            
                            if curr_template.is_single_seater:
                                if j[0] != 0:
                                    if (j[0][1] + " " + str(j[0][2])) not in ranges_dict[i]["girls"]:
                                        ranges_dict[i]["girls"][j[0]
                                                                [1] + " " + str(j[0][2])] = []
                                    ranges_dict[i]["girls"][j[0][1] +
                                                            " " + str(j[0][2])].append(j[0])
                            else:
                                if j[0] != 0:
                                    if (j[0][1] + " " + str(j[0][2])) not in ranges_dict[i]["girls"]:
                                        ranges_dict[i]["girls"][j[0]
                                                                [1] + " " + str(j[0][2])] = []
                                    ranges_dict[i]["girls"][j[0][1] +
                                                            " " + str(j[0][2])].append(j[0])
                                if j[1] != 0:
                                    if (j[1][1] + " " + str(j[1][2])) not in ranges_dict[i]["girls"]:
                                        ranges_dict[i]["girls"][j[1]
                                                                [1] + " " + str(j[1][2])] = []
                                    ranges_dict[i]["girls"][j[1][1] +
                                                            " " + str(j[1][2])].append(j[1])
                    else:
                        for j in room_dict[i]:
                            if curr_template.is_single_seater:
                                if j[0] != 0:
                                    if (j[0][1] + " " + str(j[0][2])) not in ranges_dict[i]["boys"]:
                                        ranges_dict[i]["boys"][j[0]
                                                               [1] + " " + str(j[0][2])] = []
                                    ranges_dict[i]["boys"][j[0][1] +
                                                           " " + str(j[0][2])].append(j[0])
                            else:
                                if j[0] != 0:
                                    if (j[0][1] + " " + str(j[0][2])) not in ranges_dict[i]["boys"]:
                                        ranges_dict[i]["boys"][j[0]
                                                               [1] + " " + str(j[0][2])] = []
                                    ranges_dict[i]["boys"][j[0][1] +
                                                           " " + str(j[0][2])].append(j[0])
                                if j[1] != 0:
                                    if (j[1][1] + " " + str(j[1][2])) not in ranges_dict[i]["boys"]:
                                        ranges_dict[i]["boys"][j[1]
                                                               [1] + " " + str(j[1][2])] = []
                                    ranges_dict[i]["boys"][j[1][1] +
                                                           " " + str(j[1][2])].append(j[1])

                else:
                    ranges_dict[i] = {}
                    for j in room_dict[i]:
                        if j[0] == 0:
                            continue
                        if (j[0][1] + " " + str(j[0][2])) not in ranges_dict[i]:
                            ranges_dict[i][j[0][1] + " " + str(j[0][2])] = []
                        ranges_dict[i][j[0][1] + " " +
                                       str(j[0][2])].append(j[0])
                master_room_ranges[date]["Main Building"] = ranges_dict
            else:
                if curr_template.is_boys_girls_separation:
                    ranges_dict[i] = {
                        "boys": {},
                        "girls": {}
                    }
                    if Rooms.objects.get(room_number=i) in girls_room:
                        for j in room_dict[i]:
                            if j[0] == 0:
                                continue
                            if (j[0][1] + " " + str(j[0][2])) not in ranges_dict[i]["girls"]:
                                ranges_dict[i]["girls"][j[0]
                                                        [1] + " " + str(j[0][2])] = []
                            ranges_dict[i]["girls"][j[0][1] +
                                                    " " + str(j[0][2])].append(j[0])
                    else:
                        print("CURRENT ROOM STUFF", i,  room_dict[i])
                        for j in room_dict[i]:
                            if j[0] != 0:
                                if (j[0][1] + " " + str(j[0][2])) not in ranges_dict[i]["boys"]:
                                    ranges_dict[i]["boys"][j[0]
                                                            [1] + " " + str(j[0][2])] = []
                                ranges_dict[i]["boys"][j[0][1] +
                                                        " " + str(j[0][2])].append(j[0])
                            if j[1] != 0:
                                if (j[1][1] + " " + str(j[1][2])) not in ranges_dict[i]["boys"]:
                                    ranges_dict[i]["boys"][j[1]
                                                            [1] + " " + str(j[1][2])] = []
                                ranges_dict[i]["boys"][j[1][1] +
                                                        " " + str(j[1][2])].append(j[1])
                else:
                    ranges_dict[i] = {}
                    for j in room_dict[i]:
                        if j[0] == 0:
                            continue
                        if (j[0][1] + " " + str(j[0][2])) not in ranges_dict[i]:
                            ranges_dict[i][j[0][1] + " " + str(j[0][2])] = []
                        ranges_dict[i][j[0][1] + " " +
                                       str(j[0][2])].append(j[0])
                master_room_ranges[date]["New Building"] = ranges_dict

    print("MASTER ROOM RANGES")
    # print(master_room_ranges)
    # print("MASTER ROOM DICT")
    # print(master_room_dict)
    # for i in master_room_ranges:
    #     print()
    #     print(i)
    #     for j in master_room_ranges[i]:
    #         print()
    #         print(j, "           ", master_room_ranges[i][j])
    #         print("Length", len(master_room_ranges[i][j]))

    # print(exam_curr)
    # try:
    #     i = room[(room.index(i)+1)]
    #     room = room[(room.index(i)):]
    # except:
    #     pass
    model = RoomData(rooms=master_room_dict,
                     ranges=master_room_ranges, exam=exam_curr)
    model.save()
    queryset = RoomData.objects.filter(exam=exam_curr)
