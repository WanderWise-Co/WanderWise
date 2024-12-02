import json
import time
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import os
# Ask for user input for the destination
destination = "bangalore"

# Construct the URL with the destination
url = f"https://www.justdial.com/{destination}/Car-Rental-For-Self-Driven/nct-11276270"

# Set up the Selenium WebDriver (assuming you're using Chrome)
driver_path = "C:\\Users\\Saicharan\\Documents\\chromedriver-win64\\chromedriver.exe"  # Replace with the path to your chromedriver

# Use the Service class to specify the path to the chromedriver
service = Service(executable_path=driver_path)
driver = webdriver.Chrome(service=service)

# Open the website
driver.get(url)

# Give it some time to load the page
time.sleep(5)

# Try to close the pop-up by clicking the "X" button if it appears
try:
    close_button = driver.find_element(By.CLASS_NAME, "jsx-c18d0340df98cd9c.jdicon.white_close_icon")
    close_button.click()  # Click the close button
    print("Pop-up closed successfully.")
except Exception as e:
    print(f"Pop-up not found or error occurred: {e}")

# Use WebDriverWait to wait for the "Maybe Later" button to appear and click it
try:
    maybe_later_button = WebDriverWait(driver, 10).until(
        EC.element_to_be_clickable((By.XPATH, "//a[@aria-label='May be later']"))
    )
    maybe_later_button.click()  # Click the Maybe Later button
    print("Login/Sign-up pop-up skipped using 'Maybe Later'.")
except Exception as e:
    print(f"'Maybe Later' button not found or error occurred: {e}")

# Give it some time to load the page after skipping the login
time.sleep(5)

# Initialize an empty list to store car rental details
car_rentals = []

# Scrape car names, ratings, and links
try:
    car_names = driver.find_elements(By.CLASS_NAME, "jsx-915cb403736563fc.resultbox_title_anchor.line_clamp_1")
    ratings = driver.find_elements(By.CLASS_NAME, "jsx-915cb403736563fc.resultbox_totalrate.mr-6.font17.fw600.colorFFF")
    car_links = driver.find_elements(By.CSS_SELECTOR, "a.jsx-915cb403736563fc.slideshow-listing-card")

    # Check if we have the same number of names, ratings, and links
    if len(car_names) == len(ratings) == len(car_links):
        for i in range(len(car_names)):
            car_name = car_names[i].text
            rating = ratings[i].text.split()[0]  # Extract the rating value before the 'star' icon
            link = car_links[i].get_attribute('href')
            car_rentals.append({
                "car_name": car_name,
                "rating": rating,
                "link": link
            })
    else:
        print(f"Warning: Mismatch between the number of car names, ratings, and links. Names: {len(car_names)}, Ratings: {len(ratings)}, Links: {len(car_links)}")
except Exception as e:
    print(f"Error while scraping car details: {e}")

# Wait for the location and phone number elements to be present
wait = WebDriverWait(driver, 10)

try:
    location_elements = wait.until(
        EC.presence_of_all_elements_located((By.CLASS_NAME, "resultbox_address"))
    )
    phone_elements = wait.until(
        EC.presence_of_all_elements_located((By.CLASS_NAME, "callcontent"))
    )

    # Scrape location and phone numbers and append to the car rental details
    for index, (location_element, phone_element) in enumerate(zip(location_elements, phone_elements), start=1):
        # Extract location
        address_div = location_element.find_element(By.CLASS_NAME, "font15.fw400.color111")
        location = address_div.text

        # Extract phone number
        phone_number = phone_element.text

        # Add location and phone number to the car rental data
        if index <= len(car_rentals):
            car_rentals[index-1]["location"] = location
            car_rentals[index-1]["phone_number"] = phone_number
except Exception as e:
    print(f"Error while scraping location and phone number details: {e}")

# Store the data in a JSON file
# output_dir = os.path.join(os.path.dirname(__file__), 'outputs')
# os.makedirs(output_dir, exist_ok=True)
output_dir = os.path.join(os.path.dirname(__file__), 'outputs')  # Correctly resolve the 'outputs' directory
os.makedirs(output_dir, exist_ok=True)  # Ensure the directory exists

output_file_path = os.path.join(output_dir, "rental.json") 
try:
    with open(output_file_path, "w") as json_file:
        json.dump(car_rentals, json_file, indent=4)
    print("Car rental details have been saved to 'car_rentals.json'.")
except Exception as e:
    print(f"Error while saving data to JSON: {e}")

# Close the browser after scraping
driver.quit()