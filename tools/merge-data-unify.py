from bs4 import BeautifulSoup
import json
import requests
import time
import os
import re
import base64
from pathlib import Path
import json


# Path to your input HTML file
JSON_FILE_PATH = "./"
IMG_FILE_PATH = "./pictures/thumb"


# Read data JSON to a file
item_list = []
item_map = {}

def list_json_files(path):
    # List all files in the directory
    files = os.listdir(path)
    # Filter for .html files
    json_files = [f for f in files if f.endswith('.json')]
    return json_files



json_files = list_json_files(JSON_FILE_PATH)
for file in json_files:
    print("Processing: " + file)
    category = Path(file).stem
    with open(file) as base_file:
      partial_item_list = json.load(base_file)
      for item in partial_item_list:
        #   print(item)
          id = item['id'];
          if id not in item_map:
            item_map[id] = item
            item_map[id]['category'] = []
          item_map[id]['category'].append(category)


item_list = sorted(item_map.values(), key=lambda item: item['name'])


# Save JSON to a file
with open("poster-unify.json", "w", encoding="utf-8") as out_file:
    json.dump(item_list, out_file, indent=2, ensure_ascii=False)