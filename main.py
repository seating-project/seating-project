# Program for seating arrangment in exams (please give us OD 😭) 

#! FINISH THE PROJECT ASAP 

# Importing the required modules 🚀
from sql import GetStudents
from allotment import Allotment
from tablestuff import CreateTable, returnRanges
from tablestuff import getTotalCount, getBoysAndGirlsCount, getBoysAndGirlsRange
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
countsOfBoysAndGirls = getBoysAndGirlsCount()
print("Boys and girls lmao", countsOfBoysAndGirls)
# totRange1.update(totRange2)
rangesSeparate = getBoysAndGirlsRange()
print("Roshan is a bad person", rangesSeparate)

# Creating the table 📑
print("BOYS: ", countsOfBoysAndGirls[0])
print("GIRLS: ", countsOfBoysAndGirls[1])  
print("BOYS Range: ", rangesSeparate[0]) 
print("GIRLS Range: ", rangesSeparate[1]) 
# NoticeBoard(countsOfAll, returnRanges())
NoticeBoard(countsOfBoysAndGirls[0], rangesSeparate[0])
NoticeBoard(countsOfBoysAndGirls[1], rangesSeparate[1])