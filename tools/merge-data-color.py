from math import sqrt
from collections import Counter
import colorgram
import json
from PIL import Image, ImageFilter
from colormath.color_objects import sRGBColor, LabColor
from colormath.color_conversions import convert_color
from colormath.color_diff import delta_e_cie2000
import numpy
# numpy patch for colormath
def patch_asscalar(a):
    return a.item()

setattr(numpy, "asscalar", patch_asscalar)


# Step 1: Define your basic color palette
BASIC_COLORS = {
    "black": (0, 0, 0),
    "white": (255, 255, 255),
    "blue": (0, 0, 255),
    "brown": (150, 75, 0),
    "green": (0, 128, 0),
    "orange": (255, 165, 0),
    "pink": (255, 192, 203),
    "red": (255, 0, 0),
    "violet": (238, 130, 238),
    "yellow": (255, 255, 0),
    "gray": (128, 128, 128),
    "ocean blue": (0, 105, 148),        # Calm, expansive; a cool, natural blue
    "sky blue": (135, 206, 235),        # Light, hopeful; a pastel blue
    "crimson red": (178, 34, 34),       # Intense, passionate; a deep red
    "coral pink": (240, 128, 128),      # Warm, playful; a soft reddish-pink
    "emerald green": (0, 128, 0),       # Vibrant, natural; a lush green
    "olive green": (85, 107, 47),       # Earthy, subdued; a muted green
    "golden yellow": (255, 215, 0),     # Radiant, joyful; a warm gold
    "pastel yellow": (255, 245, 157),   # Gentle, uplifting; a soft yellow
    "tangerine orange": (255, 140, 0),  # Energetic, bold; a bright orange
    "peach orange": (255, 218, 185),      # Subtle, comforting; a pale orange
    "royal purple": (102, 0, 153),      # Regal, mysterious; a deep purple
    "lavender purple": (186, 85, 211),    # Dreamy, delicate; a light purple
    "chocolate brown": (139, 69, 19),   # Rich, grounding; a warm brown
    "storm gray": (70, 70, 70),         # Moody, neutral; a dark gray
    "silver gray": (192, 192, 192),     # Sleek, modern; a light gray
    "midnight black": (0, 0, 0),        # Powerful, enigmatic; true black
    "ivory white": (255, 255, 240),     # Pure, soft; a warm white
    "cosmic blue": (0, 139, 139),       # Futuristic, serene; a blue-green blend
}

# def color_distance(c1, c2):
#     """Calculate Euclidean distance between two RGB colors."""
#     return sqrt(sum((a - b) ** 2 for a, b in zip(c1, c2)))

def color_distance(c1, c2):
    """Calculate color difference in CIELAB space using Delta E."""
    # Convert RGB to sRGBColor
    rgb1 = sRGBColor(c1[0], c1[1], c1[2], is_upscaled=True)
    rgb2 = sRGBColor(c2[0], c2[1], c2[2], is_upscaled=True)
    
    # Convert to CIELAB
    lab1 = convert_color(rgb1, LabColor)
    lab2 = convert_color(rgb2, LabColor)
    
    # Calculate Delta E (perceptual difference)
    return delta_e_cie2000(lab1, lab2)

def closest_basic_color(rgb):
    """Find the closest basic color to the given RGB tuple."""
    return min(BASIC_COLORS, key=lambda name: color_distance(rgb, BASIC_COLORS[name]))

def extract_basic_color(img_path):

    img = Image.open(img_path).convert("RGB")
    img = img.resize((200, 300)).filter(ImageFilter.BLUR)  # Downscale and blur
    img.save("temp.jpg")
    colors = colorgram.extract("temp.jpg", 10)

    # colors = colorgram.extract(img_path, 10)
    
    # Sort by proportion (descending) and take top colors
    sorted_colors = sorted(colors, key=lambda c: c.proportion, reverse=True)
    
    # Map only the top colors to basic colors
    mapped_colors = []
    for c in sorted_colors[:5]:  # Consider top 5 to account for similar shades
        rgb = (c.rgb.r, c.rgb.g, c.rgb.b)
        basic = closest_basic_color(rgb)
        # print(f"Extracted RGB: {rgb}, Proportion: {c.proportion:.2%}, Mapped to: {basic}")
        # only accept 10% up
        if c.proportion > 0.1:
            mapped_colors.append((basic, c.proportion))
    
    # Aggregate by basic color, summing proportions
    color_weights = Counter()
    for color, proportion in mapped_colors:
        color_weights[color] += proportion
    
    # Get top 3 most common basic colors
    top_pick = [color for color, _ in color_weights.most_common(2)]
    # print("Top pick colors:", top_pick)

    top_basic = []
    for top in top_pick:
        top_basic.append(top.split(' ')[-1]);

    top_basic = list(set(top_basic))

    # print("Top basic colors:", top_basic)
    return top_basic

# Example usage


with open("poster-unify.json") as base_file:
  item_list = json.load(base_file)
  for item in item_list:
      thumbPath = item['thumbPath'];
      top3 = extract_basic_color("./pictures/thumb/" + thumbPath)
      print(thumbPath, top3)
      item['color'] = top3

# Save JSON to a file
with open("poster.json", "w", encoding="utf-8") as out_file:
    json.dump(item_list, out_file, indent=2, ensure_ascii=False)