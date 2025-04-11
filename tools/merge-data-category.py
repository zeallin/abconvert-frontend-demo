from bs4 import BeautifulSoup
import json
import requests
import time
import os
import re
import base64
from pathlib import Path
import json


PROCESS_TYPE = "top_selling"


# Read data JSON to a file
item_list = []
item_detail_list = []

with open(Path(PROCESS_TYPE + "_base").with_suffix(".json")) as base_file:
  item_list = json.load(base_file)

with open(Path(PROCESS_TYPE + "_detail").with_suffix(".json")) as detail_file:
  item_detail_list = json.load(detail_file)

# make detail list as hash table
item_detail_map = {}

for item_detail in item_detail_list:
  item_detail_map[item_detail['id']] = item_detail

final_item_list = []

for item in item_list:
  if item['id'] in item_detail_map:
    item_detail = item_detail_map[item['id']]
    item['desc'] = item_detail['desc']
    item['imagePath'] = item_detail['imagePath']
    # print(item)
    final_item_list.append(item)
  else:
    print("Missing detail for:" + item['id'] + "," + item['name'])

# Save JSON to a file
with open(Path(PROCESS_TYPE).with_suffix(".json"), "w", encoding="utf-8") as out_file:
    json.dump(final_item_list, out_file, indent=2, ensure_ascii=False)