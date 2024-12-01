from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.action_chains import ActionChains
import time
import pandas as pd
from datetime import datetime

# Configure the Selenium WebDriver
service = Service('C:\\Users\\shett\\Downloads\\chromedriver-win64\\chromedriver.exe')  # Replace with your ChromeDriver path
driver = None
try:
    driver = webdriver.Chrome(service=service)
    driver.maximize_window()
except Exception as e:
    print(f"Error initializing the WebDriver: {e}")
    exit(1)

# Retry function decorator
def retry(func, retries=3, delay=2):
    def wrapper(*args, **kwargs):
        for attempt in range(retries):
            try:
                return func(*args, **kwargs)
            except Exception as e:
                print(f"Attempt {attempt + 1} failed with error: {e}")
                time.sleep(delay)
        print(f"Failed to execute {func.__name__} after {retries} retries.")
        return None
    return wrapper

# Function to scroll down the page to load more hotels
@retry
def scroll_down():
    SCROLL_PAUSE_TIME = 2
    last_height = driver.execute_script("return document.body.scrollHeight")
    while True:
        driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
        time.sleep(SCROLL_PAUSE_TIME)
        new_height = driver.execute_script("return document.body.scrollHeight")
        if new_height == last_height:
            break
        last_height = new_height

# Function to search for hotels
@retry
def search_hotels(place, check_in_date, check_out_date):
    try:
        driver.get("https://www.agoda.com/en-in/")
        
        # Enter the place in the search box
        search_box = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.ID, "textInput"))
        )
        search_box.send_keys(place)
        time.sleep(2)
        
        # Select the first suggestion
        first_suggestion = driver.find_element(By.CSS_SELECTOR, 'ul.AutocompleteList li.Suggestion[data-element-index="0"]')
        ActionChains(driver).move_to_element(first_suggestion).click().perform()
        time.sleep(2)

        # # Select the check-in and check-out dates
        # check_in_element = WebDriverWait(driver, 10).until(
        #     EC.element_to_be_clickable((By.XPATH, f"//div[@aria-label='{check_in_date}']"))
        # )   
        # check_in_element.click()
        # check_out_element = WebDriverWait(driver, 10).until(
        #     EC.element_to_be_clickable((By.XPATH, f"//div[@aria-label='{check_out_date}']"))
        # )
        # check_out_element.click()
        # Select the check-in and check-out dates with error handling
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


        # Confirm the date selection
        apply_button = WebDriverWait(driver, 10).until(
            EC.element_to_be_clickable((By.XPATH, f"//button[@data-selenium='searchButton']"))
        )
        apply_button.click()
        time.sleep(5)
        
    except Exception as e:
        print(f"Error during search: {e}")
        raise

# Function to extract hotel details
@retry
def extract_hotels():
    hotels = []
    try:
        scroll_down()  # Ensure all hotels are loaded
        hotel_cards = driver.find_elements(By.CLASS_NAME, "Box__box___3fyWv")
        for card in hotel_cards:
            try:
                name = card.find_element(By.CLASS_NAME, "Typographystyled__TypographyStyled-sc-j18mtu-0").text
            except Exception:
                name = "N/A"
            try:
                price = card.find_element(By.CLASS_NAME, "Price__value___2iCoc").text
            except Exception:
                price = "N/A"
            try:
                rating = card.find_element(By.CLASS_NAME, "Typographystyled__TypographyStyled-sc-j18mtu-0").text
            except Exception:
                rating = "N/A"
            
            hotels.append({
                "Name": name,
                "Price": price,
                "Rating": rating,
            })
    except Exception as e:
        print(f"Error in extracting hotel details: {e}")
    return hotels

# Function to validate date input format and logic
def validate_date(date_str):
    try:
        date_obj = datetime.strptime(date_str, '%Y-%m-%d')
        return date_obj
    except ValueError:
        print(f"Invalid date format: {date_str}. Please enter in YYYY-MM-DD format.")
        return None

def validate_check_in_out_dates(check_in_date, check_out_date):
    check_in = validate_date(check_in_date)
    check_out = validate_date(check_out_date)
    
    if check_in and check_out:
        if check_out < check_in:
            print("Check-out date cannot be earlier than the check-in date.")
            return None, None
        return check_in, check_out
    return None, None

# Main script execution
place = input("Enter the place you want to search hotels for: ")
check_in_date = input("Enter the check-in date (YYYY-MM-DD): ")
check_out_date = input("Enter the check-out date (YYYY-MM-DD): ")

# Validate dates before proceeding
# check_in_date, check_out_date = validate_check_in_out_dates(check_in_date, check_out_date)

if check_in_date and check_out_date:
    try:
        search_hotels(place, check_in_date, check_out_date)
        hotel_data = extract_hotels()

        # Save to CSV
        if hotel_data:
            df = pd.DataFrame(hotel_data)
            output_file = f"agoda_hotels_{place}_{check_in_date.strftime('%Y-%m-%d')}_to_{check_out_date.strftime('%Y-%m-%d')}.csv"
            df.to_csv(output_file, index=False)
            print(f"Data saved to {output_file}")
        else:
            print("No hotels were found.")

    except Exception as e:
        print(f"An error occurred during execution: {e}")
else:
    print("Invalid dates provided. Please check your input.")

if driver:
    driver.quit()
