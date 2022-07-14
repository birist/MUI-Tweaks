import os
import csv
from os import listdir
from zipfile import ZipFile
import xml.etree.ElementTree as ET

with open('HEPA.csv', 'w', newline='') as csvfile:
    fieldnames = ['Device', 'Point', 'Output Range High']
    writer = csv.DictWriter(csvfile, fieldnames=fieldnames)

    writer.writeheader()

def getFromCaf(fileName):
    with ZipFile(fileName, 'r') as zip_ref:
        zip_ref.extractall()

    tree = ET.parse(fileName + '.xml')
    root = tree.getroot()

    DeviceName = None

    for objectA in root[0]:
        if objectA.get('id') == "2390":
            DeviceName = objectA[0][0].text

    for object in root:
           for property in object:
                propertyString = property[0][0].text
                if type(propertyString) is str:
                    if "P1" in propertyString or "P2" in propertyString or "PT" in propertyString or "PB" in propertyString or "PP" in propertyString:
                        for pTwo in object:
                            pTwoAtr = pTwo.get('id')
                            if pTwoAtr == "1296":
                               with open('HEPA.csv', 'a', newline='') as csvfile:
                                    fieldnames = ['Device', 'Point', 'Output Range High']
                                    writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
                                    writer.writerow({'Device': DeviceName, 'Point': propertyString, 'Output Range High': pTwo[0][0].text})

    os.remove(fileName + '.xml')



for file in listdir():
    if '.caf' in file:
        getFromCaf(file)

print("Complete")

