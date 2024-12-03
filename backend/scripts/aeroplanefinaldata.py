from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.action_chains import ActionChains
import time
from datetime import datetime
import json
import sys
import re
import os
# Initialize the browser
current_dir = os.path.dirname(os.path.realpath(__file__))
driver_path = os.path.join(current_dir,  'resources', 'chromedriver-win64', 'chromedriver.exe')
service = Service(driver_path)
# service = Service("D:\\WanderWise\\backend\\scripts\\resources\\chromedriver-win64\\chromedriver.exe") 
driver = webdriver.Chrome(service=service)
driver.maximize_window()

# Function to add delay
def delay(seconds):
    time.sleep(seconds)

# Define helper functions for month and day
def get_month_name(month):
    months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
              'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    return months[month - 1]
def get_day_of_week(date_obj):
    return date_obj.strftime("%A")[:3]
# def get_day_of_week(date_obj):
#     days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
#     return days[date_obj.weekday()]

# Function to extract flight details
def extract_flight_details(flight_element):
    try:
        flight_details = {}

        # Airline name
        airline_name = flight_element.find_element(By.CSS_SELECTOR, '.fw-500.fs-2.c-neutral-900').text
        flight_details['airline'] = airline_name

        # Flight number
        flight_number = flight_element.find_element(By.CSS_SELECTOR, '.fw-500.fs-2.c-neutral-900 + .fs-1.c-neutral-400.pt-1').text
        flight_details['flight_number'] = flight_number

        # Departure time
        departure_time = flight_element.find_element(
            By.CSS_SELECTOR, '.ow-tuple-container__details-a__time .ms-grid-column-1 .fs-5.fw-400.c-neutral-900'
        ).text
        flight_details['departure_time'] = departure_time

        # Arrival time
        # Adjusted selector based on HTML structure
        arrival_time = flight_element.find_element(
            By.CSS_SELECTOR, '.ow-tuple-container__details-a__time .ms-grid-column-1.flex-middle:nth-child(3) .fs-5.fw-400.c-neutral-900'
        ).text
        flight_details['arrival_time'] = arrival_time

        # Duration
        duration = flight_element.find_element(
            By.CSS_SELECTOR, '.ms-grid-column-3.ms-grid-row-1 .fs-2.fw-400.c-neutral-400'
        ).text
        flight_details['duration'] = duration

        # Stops
        stops = flight_element.find_element(
            By.CSS_SELECTOR, '.ms-grid-column-3.ms-grid-row-2 .fs-2.c-neutral-400'
        ).text
        flight_details['stops'] = stops

        # Price
        # price = flight_element.find_element(
        #     By.CSS_SELECTOR, '.ow-tuple-container__details__price .fs-5.fw-700.c-neutral-900'
        # ).text
        # flight_details['price'] = price
        price = flight_element.find_element(
        By.CSS_SELECTOR, '.ow-tuple-container__details__price .fs-5.fw-700.c-neutral-900'
    ).text

        # Remove non-numeric characters using regex
        price_numeric = re.sub(r'[^\d]', '', price)

        flight_details['price'] = price_numeric

        return flight_details

    except Exception as e:
        print("Error extracting flight details:", e)
        return None

# Main script execution
try:
    # Navigate to Cleartrip
    driver.get("https://www.cleartrip.com/")

    # Close the pop-up if it exists
    try:
        WebDriverWait(driver, 10).until(
            EC.element_to_be_clickable((By.CSS_SELECTOR, '.sc-aXZVg .dXdrGF svg'))
        ).click()
        print("Pop-up closed.")
    except:
        print("No pop-up to close.")

    # Fill in "Where from?"
    from_input = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.CSS_SELECTOR, 'input[placeholder="Where from?"]'))
    )
    from_input.send_keys("Bangalore")
    delay(1)
    from_airport = WebDriverWait(driver, 10).until(
        EC.element_to_be_clickable((By.CSS_SELECTOR, '.airportList li:first-child'))
    )
    from_airport.click()
    print("Selected 'From' airport: Bangalore")

    # Fill in "Where to?"
    to_input = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.CSS_SELECTOR, 'input[placeholder="Where to?"]'))
    )
    to_input.send_keys("Mumbai")
    delay(1)
    to_airport = WebDriverWait(driver, 10).until(
        EC.element_to_be_clickable((By.CSS_SELECTOR, '.airportList li:first-child'))
    )
    to_airport.click()
    print("Selected 'To' airport: Mumbai")

    # Select the date
    date_picker = WebDriverWait(driver, 10).until(
        EC.element_to_be_clickable((By.CSS_SELECTOR, 'div.fromDiv'))
    )
    date_picker.click()
    print("Date picker opened.")
    today = datetime.today()
    month = sys.argv[1] if len(sys.argv) > 1 else today.strftime("%B")
    date = int(sys.argv[2]) if len(sys.argv) > 2 else int(today.day)
    year=2025
    print(month,date)

    # # Define target month and date
    # target_month = "November"
    # target_year = 2024
    # target_date = 26

    # # Navigate to the target month
    # while True:
    #     current_month_element = WebDriverWait(driver, 10).until(
    #         EC.presence_of_element_located((By.CSS_SELECTOR, '.DayPicker-Caption'))
    #     ).text
    #     print(f"Current Month Displayed: {current_month_element}")
    #     current_month, current_year_display = current_month_element.split(" ")
    #     if current_month == target_month and int(current_year_display) == target_year:
    #         break
    #     else:
    #         next_month_button = WebDriverWait(driver, 10).until(
    #             EC.element_to_be_clickable((By.CSS_SELECTOR, '.DayPicker-NavButton--next'))
    #         )
    #         next_month_button.click()
    #         delay(0.5)

    # # Calculate aria-label for the target date
    # # Example aria-label format: "Mon Nov 25 2024"
    # date_obj = datetime(target_year, datetime.strptime(target_month, "%B").month, target_date)
    # day_of_week = get_day_of_week(date_obj)
    # month_abbr = get_month_name(date_obj.month)
    # aria_label = f"{day_of_week} {month_abbr} {target_date} {target_year}"
    # print(f"Target aria-label for date selection: {aria_label}")

    # # Select the date
    # date_selector = f'[aria-label="{aria_label}"]'
    # date_element = WebDriverWait(driver, 10).until(
    #     EC.element_to_be_clickable((By.CSS_SELECTOR, date_selector))
    # )
    # date_element.click()
    # print(f"Selected date: {aria_label}")

    # month = "December"
    # date = 27
    # month = "December"
    # date = 10
    today = datetime.today()
    month = sys.argv[1] if len(sys.argv) > 1 else today.strftime("%B")
    date = int(sys.argv[2]) if len(sys.argv) > 2 else today.day
    year = int(sys.argv[3]) if len(sys.agrv) >3 else today.year

    while True:
        current_month_element = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.CSS_SELECTOR, '.DayPicker-Caption'))
        ).text
        print(f"Current Month: {current_month_element}")
        current_month = current_month_element.split(" ")[0]

        if current_month == month:
            break
        else:
            next_month_button = WebDriverWait(driver, 10).until(
                EC.element_to_be_clickable((By.CSS_SELECTOR, "svg[data-testid='rightArrow']"))
            )
            next_month_button.click()
            delay(0.5)

    # target_date = f"2025-{get_month_name(12)}-{date}"
    # day_of_week = get_day_of_week(time.strptime(target_date, "%Y-%b-%d"))
    # aria_label = f"{day_of_week} {get_month_name(12)} {date} 2025"
    # print(f"Target aria-label: {aria_label}")
    # target_date = f"2025-{get_month_name(12)}-{date}"
    # parsed_date = datetime.strptime(target_date, "%Y-%b-%d")
    # day_of_week = get_day_of_week(parsed_date)
    # aria_label = f"{day_of_week} {get_month_name(12)} {date} 2024"
    target_date = f"{year}-{month}-{date}"
   
    date_obj = datetime(year, datetime.strptime(month, "%B").month,date)
    mon1=month[:3]
    day_of_week = get_day_of_week(date_obj)
    aria_label = f"{day_of_week} {mon1} {date} {year}"
    print(f"Target aria-label: {aria_label}")

    date_selector = f'[aria-label="{aria_label}"]'
    date_element = WebDriverWait(driver, 10).until(
        EC.element_to_be_clickable((By.CSS_SELECTOR, date_selector))
    )
    date_element.click()
    print(f"Clicked on the date: {aria_label}")

    # Click the search button
    search_button = WebDriverWait(driver, 10).until(
        EC.element_to_be_clickable((By.CSS_SELECTOR, 'div.sc-aXZVg.ibOtJI.flex.flex-row.flex-between > button'))
    )
    search_button.click()
    print("Search button clicked.")

    # Wait for flight results to load
    flights = WebDriverWait(driver, 30).until(
        EC.presence_of_all_elements_located((By.CSS_SELECTOR, '[data-testid="tupple"]'))
    )
    print(f"Number of flights found: {len(flights)}")
    print(flights)

    # Extract details for all flights
    all_flight_details = []
    for idx, flight in enumerate(flights, start=1):
        print(f"Extracting details for flight {idx}")
        details = extract_flight_details(flight)
        if details:
            print(f"Flight {idx}: {details}")  # Print each flight's details
            all_flight_details.append(details)
        else:
            print(f"Flight {idx}: Details could not be extracted.")

    # Print all the scraped details before writing to file
    print("\nAll Scraped Flight Details:")
    print(json.dumps(all_flight_details, indent=4, ensure_ascii=False))

    # Save the details to a JSON file
    
    # if all_flight_details:
    #     try:
    #         # Open the file with utf-8 encoding
    #         with open('./outputs/flights.json', 'w', encoding='utf-8') as json_file:
    #             # Dump the flight details into the JSON file with proper formatting
    #             json.dump(all_flight_details, json_file, indent=4, ensure_ascii=False)
    #             print("Flight details have been saved to 'flights.json'.")
    #     except Exception as e:
    #         print(f"Error saving flight details: {e}")
    # else:
    #     print("No flight details found.")
    if all_flight_details:
        try:
            # Get the current timestamp
            timestamp = datetime.now().isoformat()

            # Prepare the JSON structure with the timestamp
            data_to_save = {
                "timestamp": timestamp,
                "flights": all_flight_details
            }

            # Open the file with utf-8 encoding and save the JSON
            with open('./outputs/flights.json', 'w', encoding='utf-8') as json_file:
                json.dump(data_to_save, json_file, indent=4, ensure_ascii=False)
                print("Flight details have been saved to 'flights.json'.")
        except Exception as e:
            print(f"Error saving flight details: {e}")
    else:
        print("No flight details found.")

    # with open('./outputs/flights.json', 'w', encoding='utf-8') as json_file:
    #     json.dump(all_flight_details, json_file, indent=4, ensure_ascii=False)

    # print(json.dumps(all_flight_details, indent=4, ensure_ascii=False))
    # sys.stdout.flush() 
    print("Flight details have been saved to 'flights.json'.")

except Exception as e:
    print("An error occurred:", e)

finally:
    # Close the browser
    driver.quit()
    print("Browser closed.")
#######################################################3333
# import json

# # Example flight data
# data = [
#     {
#         "flight_id": 1234,
#         "departure": "JFK",
#         "destination": "LAX",
#         "status": "On Time"
#     },
#     {
#         "flight_id": 5678,
#         "departure": "SFO",
#         "destination": "ORD",
#         "status": "Delayed"
#     }
# ]

# # Print data to console to verify it's generated correctly
# print("Generated data:", data)

# # Path to the output file
# file_path = 'D:/WanderWise/backend/scripts/outputs/flights.json'

# try:
#     with open(file_path, 'w') as f:
#         json.dump(data, f, indent=4)
#     print("Data written successfully to flights.json")
# except Exception as e:
#     print(f"Error writing to file: {e}")
