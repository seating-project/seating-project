# Program for seating arrangment in exams (please give us OD 😭) 

#!FINISH THE PROJECT ASAP 

# Importing the required modules 🚀
from sql import GetStudents
from allotment import Allotment
from tablestuff import CreateTable, returnRanges
from tablestuff import getTotalCount
from noticeboard import NoticeBoard

# Getting the students from the database 🧑‍🎓
ckt_array, nckt_array = GetStudents("M")
room_dict = Allotment(ckt_array, nckt_array)
CreateTable(room_dict)
totRange1 = returnRanges()
ckt_array, nckt_array = GetStudents("F")
room_dict = Allotment(ckt_array, nckt_array)
CreateTable(room_dict)
totRange2 = returnRanges()
countsOfAll = getTotalCount()
# totRange1.update(totRange2)
print("Roshan is a bad person", totRange1)

# Creating the table 📑

NoticeBoard(countsOfAll, returnRanges())