# Program for seating arrangment in exams (A joke, please give us OD 😭) 

# Importing the required modules 🚀
from sql import GetStudents
from allotment import Allotment
from tablestuff import CreateTable

# Getting the students from the database 🧑‍🎓
ckt_array, nckt_array = GetStudents()
room_dict = Allotment(ckt_array, nckt_array)

# Creating the table 📑
CreateTable(room_dict)
