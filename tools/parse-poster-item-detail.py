from bs4 import BeautifulSoup
import json
import requests
import time
import os
import re
import base64
from pathlib import Path



# Path to your input HTML file
HTML_FILE_PATH = "./detail"
PROCESS_TYPE = "top_selling"
IMG_FILE_PATH = "./pictures/detail"

def list_html_files(path):
    # List all files in the directory
    files = os.listdir(path)
    # Filter for .html files
    html_files = [f for f in files if f.endswith('.html')]
    return html_files

def generate_slug(text):
    # Convert to lowercase
    text = text.lower()
    # Replace spaces and special characters with hyphens
    text = re.sub(r'[^a-z0-9]+', '-', text)
    # Remove leading/trailing hyphens
    text = text.strip('-')
    return text

def save_base64_image(src_string, output_path):
    # Regular expression to extract mime type and base64 data
    pattern = r'data:image/(.*?);base64,(.*)'
    match = re.match(pattern, src_string)
    
    if not match:
        raise ValueError("Invalid base64 image src format")

    # Extract mime type (e.g., 'jpeg', 'png') and base64 data
    mime_type, base64_data = match.groups()
    
    # Map mime type to file extension
    extension_map = {
        'jpeg': '.jpg',
        'png': '.png',
        'gif': '.gif',
        'webp': '.webp'
    }
    extension = extension_map.get(mime_type, '.bin')  # Default to .bin if unknown
    
    # Decode base64 data to binary
    image_data = base64.b64decode(base64_data)
    
    # Ensure output path has the correct extension
    output_file = Path(output_path).with_suffix(extension)
    
    # Write binary data to file
    with open(output_file, 'wb') as f:
        f.write(image_data)
    
    return os.path.basename(output_file)

# Read the HTML content from the file
def parse_html_content(html_path, parsed_data):
    with open(html_path, "r", encoding="utf-8") as file:
        html_content = file.read()

    # Parse the HTML content
    soup = BeautifulSoup(html_content, "html.parser")
    sku_tag = soup.find("span", class_="pdp__sku")
    name_tag = soup.find("h1", class_="desktop-price1")
    desc_tag = soup.find("div", class_="pdp__description rte")
    info_tag = soup.find("div", class_="grid__item medium-up--5 pdp__credits")
    director_tag = None
    starring_tag = None
    writers_tag = None
    if info_tag:
        td_tag = info_tag.find_all("td")
        director_tag = td_tag[1]
        starring_tag = td_tag[3]
        writers_tag = td_tag[5]

    picture_tag = soup.find("picture", class_="picture")
    img_tag = picture_tag.find("img", class_="custom-img")

    # Save image
    img_file_name = generate_slug(name_tag.text) + "_" + sku_tag.text.strip().lower()
    # print(img_file_name)
    # print(img_tag['src'])
    image_path = save_base64_image(img_tag['src'], os.path.join(IMG_FILE_PATH, img_file_name))

    parsed_data.append({
        "id": sku_tag.text.strip() if sku_tag else None,
        "name": name_tag.text.strip() if name_tag else None,
        "desc": desc_tag.text.strip() if desc_tag else None,
        "director": director_tag.text.strip() if director_tag else None,
        "starring": starring_tag.text.strip() if starring_tag else None,
        "writers": writers_tag.text.strip() if writers_tag else None,
        "imagePath": image_path
    })


parsed_data = []

base_path = os.path.join(HTML_FILE_PATH, PROCESS_TYPE)
html_files = list_html_files(base_path)
for file in html_files:
    print("Processing: " + file)
    parse_html_content(os.path.join(base_path, file), parsed_data)

# Save JSON to a file
with open(Path(PROCESS_TYPE + "_detail").with_suffix(".json"), "w", encoding="utf-8") as out_file:
    json.dump(parsed_data, out_file, indent=2, ensure_ascii=False)
