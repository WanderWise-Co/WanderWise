import csv
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException, NoSuchElementException
from time import sleep
import traceback
from random import randint
import pandas as pd
import numpy as np
import sys 
from datetime import datetime
import json
# Initialize the Chrome Driver
chrome_service = Service("C:\\Users\\Saicharan\\Documents\\chromedriver-win64\\chromedriver.exe" )
driver = webdriver.Chrome(service=chrome_service)
driver.get("https://www.agoda.com/en-in/")

# Define all possible features for consistent columns
all_features = [
    "Wheelchair accessible", "Internet services", "Wi-Fi in public areas",
    "Swimming pool [indoor]", "Garden", "Anti-viral cleaning products", "Breakfast takeaway service",
    "Cashless payment service", "Daily disinfection in all rooms", "Daily disinfection in common areas",
    "First aid kit", "Free face masks", "Guest rooms seal after sanitization", "Hand sanitizer",
    "Hot water linen and laundry washing", "Physical distancing of at least 1 meter",
    "Rooms sanitized between stays", "Sanitized kitchen and tableware items", "Shared stationery removed",
    "Staff trained in safety protocol", "Asian breakfast", "Bottle of water", "Breakfast [buffet]",
    "Western breakfast", "Air conditioning in public area", "Concierge", "Convenience store", "Daily housekeeping",
    "Doorman", "Elevator", "Facilities for disabled guests", "Invoice provided", "Safety deposit boxes",
    "Smoke-free property", "Xerox/fax in business center", "CCTV in common areas", "CCTV outside property",
    "Fire extinguisher", "Non-smoking rooms", "Pets allowed", "Security [24-hour]", "Smoke alarms",
    "Car park [free of charge]", "Car park [on-site]", "Rental car", "Accessible by elevator", "Accessible toilet",
    "Air conditioning", "Alarm clock", "Bathrobes", "Blackout curtains", "Closet", "Clothes rack", "Coffee/tea maker",
    "Complimentary tea", "Desk", "Electric kettle", "Free bottled water", "Free instant coffee", "Hair dryer",
    "Individual air conditioning", "In-room safe box", "Internet access – wireless", "Linens", "Non-smoking",
    "Private bathroom", "Refrigerator", "Satellite/cable channels", "Shower", "Slippers", "Smoke detector",
    "Socket near the bed", "Telephone", "Tile/marble flooring", "Toiletries", "Towels", "Trash cans", "Wake-up service",
    "Window"
]

# Scroll function
def scrollDown():
    try:
        # sleep(8)
        last_height = driver.execute_script("return document.body.scrollHeight")
        
        while True:
            driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
            sleep(2)  # Adjust the delay based on the website's loading speed
            
            new_height = driver.execute_script("return document.body.scrollHeight")
            if new_height == last_height:
                print("Reached the bottom of the page.")
                break
            
            last_height = new_height
    except Exception as e:
        print(f"Error while scrolling: {e}")

# Function to get hotel links
def getHotelLinks():
    sleep(5)
    scrollDown()
    sleep(7)
    
    try:
        links = driver.find_elements(By.XPATH, "//a[@class = 'PropertyCard__Link']")
        print(f"Found {len(links)} links.")
    except Exception as e:
        print(f"Error finding links: {e}")
        links = []
    
    sleep(5)

    for i in range(len(links)):
        try:
            link = links[i].get_property(name='href')
            print(f"Link {i + 1}: {link}")
            links[i] = link
        except Exception as e:
            print(f"Error extracting href from link {i + 1}: {e}")
    
    try:
        next_button = driver.find_element(By.XPATH, "//button[@id = 'paginationNext']")
    except NoSuchElementException:
        next_button = None

    return next_button, links

# Function to get hotel features data
def getHotelFeaturesData(hotel_id):
    try:
        hotel_name_element = WebDriverWait(driver, 15).until(
            EC.presence_of_element_located((By.XPATH, "//h2[@data-selenium='hotel-header-name']"))
        )
        hotel_name = hotel_name_element.text

        features = WebDriverWait(driver, 15).until(
            EC.presence_of_all_elements_located((By.XPATH, "//div[@data-element-name ='property-feature']"))
        )
        sleep(3)

        feature_dict = {
            "Hotel_Name": hotel_name,
            **{feature: np.nan for feature in all_features}
        }

        for feature in features:
            feature_text = feature.text
            if feature_text in feature_dict:
                feature_dict[feature_text] = 1.0

        return feature_dict
    except Exception as e:
        print("Error in getHotelFeaturesData:", traceback.format_exc())
        return {}

# Function to get hotel reviews
def getHotelReviews(hotel_name):
    reviews = []
    try:
        hotel_name_element = WebDriverWait(driver, 15).until(
            EC.presence_of_element_located((By.XPATH, "//h2[@data-selenium='hotel-header-name']"))
        )
        hotel_name = hotel_name_element.text
        user_ids = WebDriverWait(driver, 15).until(
            EC.presence_of_all_elements_located((By.XPATH, "//div[@data-info-type='reviewer-name']"))
        )
        ratings = WebDriverWait(driver, 15).until(
            EC.presence_of_all_elements_located((By.XPATH, "//div[@class = 'Review-comment-leftScore']"))
        )
        dates = WebDriverWait(driver, 15).until(
            EC.presence_of_all_elements_located((By.XPATH, "//div[@class = 'Review-statusBar-left']"))
        )

        for i in range(min(len(user_ids), len(ratings), len(dates))):
            try:
                user_id = user_ids[i].text
                rating = float(ratings[i].text)
                date = dates[i].text

                reviews.append({
                    "UserID": user_id,
                    "Rating": rating,
                    "Date": date,
                    "Hotel_Name": hotel_name
                })
            except Exception as inner_e:
                print(f"Error while processing review {i + 1} for {hotel_name}: {inner_e}")
                continue

        return reviews

    except Exception as e:
        print("Error in getHotelReviews:", traceback.format_exc())
        return []

# Function to search for hotels
def search_hotels(place, check_in_date, check_out_date):
    try:
        search_box = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.ID, "textInput"))
        )
        search_box.send_keys(place)
        sleep(2)
        
        first_suggestion = driver.find_element(By.CSS_SELECTOR, 'ul.AutocompleteList li.Suggestion[data-element-index="0"]')
        ActionChains(driver).move_to_element(first_suggestion).click().perform()
        sleep(2)

        try:
            check_in_element = WebDriverWait(driver, 10).until(
                EC.element_to_be_clickable((By.XPATH, f"//span[@data-selenium-date='{check_in_date}']"))
            )
            check_in_element.click()
        except Exception as e:
            print(f"Error selecting check-in date ({check_in_date}): {e}")
            raise

        try:
            check_out_element = WebDriverWait(driver, 10).until(
                EC.element_to_be_clickable((By.XPATH, f"//span[@data-selenium-date='{check_out_date}']"))
            )
            check_out_element.click()
        except Exception as e:
            print(f"Error selecting check-out date ({check_out_date}): {e}")
            raise

        apply_button = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.XPATH, "//button[@data-selenium='searchButton']"))
        )
        driver.execute_script("arguments[0].click();", apply_button)
        sleep(5)
        
    except Exception as e:
        print(f"Error during search: {e}")
        raise

# Function to handle tab switching
def handle_new_tab():
    driver.switch_to.window(driver.window_handles[-1])

# Main script
try:
    # place = "chennai"
    # check_in_date = "2024-12-28"
    # check_out_date = "2024-12-29"
    # place = sys.argv[2] if len(sys.argv)>2 else "mumbai"
    # check_in_date = sys.argv[3] if len(sys.argv) > 3 else "2024-12-28"
    # check_out_date = sys.argv[4] if len(sys.argv) > 3 else "2024-12-28"
    place = sys.argv[2] if len(sys.argv) > 2 else "mumbai"
    check_in_date = sys.argv[3] if len(sys.argv) > 3 else "2024-12-28"
    check_out_date = sys.argv[4] if len(sys.argv) > 4 else "2024-12-28"

    print(f"Place: {place}")
    print(f"Check-in Date: {check_in_date}")
    print(f"Check-out Date: {check_out_date}")
    
    search_hotels(place, check_in_date, check_out_date)
    
    handle_new_tab()
    
    features_data = []
    reviews_data = []
    hotel_id = 0
    counter = 0
    c = 0

    next_button, links = getHotelLinks()
    print(links)    
    while next_button is not None and counter < 5:
        if c>=10:break
        try:
            for link in links:
                driver.get(link)
                sleep(3)
                hotel_id += 1
                c += 1
                if c >= 10:
                    break

                hotel_features = getHotelFeaturesData(hotel_id)
                if hotel_features:
                    features_data.append(hotel_features)
                
                hotel_reviews = getHotelReviews(link)
                reviews_data.extend(hotel_reviews)
                
                print(f"Processed hotel {hotel_id}")
                print(c)

            next_button.click()
            if c==10:
                break
            counter += 1
            sleep(5)

            next_button, links = getHotelLinks()
            
        except Exception as e:
            print(f"Error in main loop: {e}")
            continue

    # Saving to CSV files
    df_features = pd.DataFrame(features_data)
    df_reviews = pd.DataFrame(reviews_data)

#    # Save features data to JSON
#     df_features.to_json("./outputs/hotel_features.json", orient='records', indent=4)

#     # Save reviews data to JSON
#     df_reviews.to_json("./outputs/hotel_reviews.json", orient='records', indent=4)
    timestamp = datetime.now().isoformat()
    features_json = {
        "timestamp": timestamp,
        "data": df_features.to_dict(orient='records')
    }
    with open("./outputs/hotel_features.json", "w", encoding="utf-8") as f:
        json.dump(features_json, f, indent=4, ensure_ascii=False)
    reviews_json = {
        "timestamp": timestamp,
        "data": df_reviews.to_dict(orient='records')
    }
    with open("./outputs/hotel_reviews.json", "w", encoding="utf-8") as f:
        json.dump(reviews_json, f, indent=4, ensure_ascii=False)
    print("Hotel data saved to CSV files.")
    
except Exception as e:
    print(f"Error in script execution: {e}")
finally:
    driver.quit()
