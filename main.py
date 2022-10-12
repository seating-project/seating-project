# Program for sootha thechifying in exams (A joke, please give us OD😭 ) 

# Importing the required modules 🚀
from tabulate import tabulate
import bs4
from sql import GetStudents, dept, years
from allotment import Allotment
from tablestuff import CreateTable

# Getting the students from the database 🧑‍🎓
ckt_array, nckt_array = GetStudents()
room_dict = Allotment(ckt_array, nckt_array)

# Creating the table 📑
CreateTable(room_dict)
