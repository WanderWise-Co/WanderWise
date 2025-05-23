from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time
import json
import os
import datetime
import sys

# Function to scrape bus details based on the source, destination, and travel date input
bus_data = []
def scrape_Busses(srcplace, destplace, check_in_date):
    # Set up WebDriver service
    current_dir = os.path.dirname(os.path.realpath(__file__))
    driver_path = os.path.join(current_dir,  'resources', 'chromedriver-win64', 'chromedriver.exe')
    service = Service(driver_path)
    # chrome_service = Service("C:\\Users\\Saicharan\\Documents\\chromedriver-win64\\chromedriver.exe")
    driver = webdriver.Chrome(service=service)
    
    # Open Goibibo Bus page
    driver.get("https://www.goibibo.com/bus/")

    # Wait for the source input field and interact with it
    try:
        source_input = WebDriverWait(driver, 30).until(
            EC.presence_of_element_located((By.ID, "autosuggestBusSRPSrcHome"))
        )
        source_input.clear()
        source_input.send_keys(srcplace)
        print(f"Entering From: {srcplace}")

        # Wait for autocomplete suggestions and select the first suggestion
        time.sleep(2)
        suggestions_container = WebDriverWait(driver, 30).until(
            EC.presence_of_element_located((By.CSS_SELECTOR, 'div[role="listbox"]'))
        )
        time.sleep(2)
        first_suggestion = suggestions_container.find_element(By.TAG_NAME, 'li')
        first_suggestion.click()
        print(f"Selected the first suggestion for {srcplace}.")
    except Exception as e:
        print(f"Search bar not found: {e}")
        driver.quit()
        return None

    # Wait for the destination input field and interact with it
    try:
        destination_input = WebDriverWait(driver, 30).until(
            EC.presence_of_element_located((By.ID, "autosuggestBusSRPDestHome"))
        )
        destination_input.clear()
        destination_input.send_keys(destplace)
        print(f"Entering destination: {destplace}")
        
        suggestions_container = WebDriverWait(driver, 30).until(
            EC.presence_of_element_located((By.CSS_SELECTOR, 'div[role="option"]'))
        )
        time.sleep(2)
        first_suggestion = suggestions_container.find_element(By.TAG_NAME, 'li')
        first_suggestion.click()
        print(f"Selected the first suggestion for {destplace}.")
    except Exception as e:
        print(f"Search bar not found: {e}")
        driver.quit()
        return None

    # Click on the date field and select the check-in date
    try:
        # date_button = WebDriverWait(driver, 30).until(
        #     EC.element_to_be_clickable((By.CSS_SELECTOR, "input[placeholder='Pick a date']"))
        # )
        # date_button.click()
        # date_xpath = f"//li[span[text()='{check_in_date}']]"
        # desired_date = WebDriverWait(driver, 10).until(
        #     EC.element_to_be_clickable((By.XPATH, date_xpath))
        # )
        # desired_date.click()
        # print(f"Date '{check_in_date}' selected successfully.")
        date_button = WebDriverWait(driver, 30).until(
            EC.element_to_be_clickable((By.CSS_SELECTOR, "input[placeholder='Pick a date']"))
        )
        date_button.click()

        # Extract desired month and year from the input date
        import datetime
        desired_date = datetime.datetime.strptime(check_in_date, "%d-%m-%Y")
        desired_month_year = desired_date.strftime("%B %Y")
        desired_day = desired_date.strftime("%d")

        while True:
            # Find the visible month and year on the calendar
            visible_month_year = WebDriverWait(driver, 10).until(
                EC.presence_of_element_located(
                    (By.CSS_SELECTOR, "p.dcalendarstyles__MonthNamePara-sc-r2jz2t-3")
                )
            ).text

            if visible_month_year == desired_month_year:
                # Select the date
                date_xpath = f"//li[span[text()='{desired_day}']]"
                desired_date_element = WebDriverWait(driver, 10).until(
                    EC.element_to_be_clickable((By.XPATH, date_xpath))
                )
                desired_date_element.click()
                print(f"Date '{check_in_date}' selected successfully.")
                break
            else:
                # Determine whether to navigate left or right
                if desired_date > datetime.datetime.strptime(visible_month_year, "%B %Y"):
                    # Click the right arrow to go to the next month
                    next_button = WebDriverWait(driver, 10).until(
                        EC.element_to_be_clickable((By.CSS_SELECTOR,"div.dcalendarstyles__MonthChangeRightArrowDiv-sc-r2jz2t-16"))
                    )
                    next_button.click()
                else:
                    # Click the left arrow to go to the previous month
                    prev_button = WebDriverWait(driver, 10).until(
                        EC.element_to_be_clickable((By.CSS_SELECTOR,"div.dcalendarstyles__MonthChangeLeftArrowDiv-sc-r2jz2t-15"))
                    )
                    prev_button.click()
    except Exception as e:
        print(f"Failed to select travel date: {e}")
        driver.quit()
        return None

    # Click the search button to initiate the search
    try:
        search_button = WebDriverWait(driver, 30).until(
            EC.element_to_be_clickable((By.CSS_SELECTOR, "button[data-testid='searchBusBtn']"))
        )
        search_button.click()
        print("Search button clicked, searching for buses.")



        # vvimp
        results_page_url = driver.current_url #vvimp
        print(f"Results page URL: {results_page_url}")
        time.sleep(10)  # Wait to load results. Adjust based on network speed.
    except Exception as e:
        print(f"Failed to click search button: {e}")
        driver.quit()
        return None

    # Extract bus details
    try:
        bus_elements = WebDriverWait(driver, 30).until(
            EC.presence_of_all_elements_located((By.CSS_SELECTOR, 'div.SrpActiveCardstyles__ActivecardLayoutDiv-sc-yk1110-1.gEsavg'))
        )
        print(f"Found {len(bus_elements)} buses.")
        k = 0
        for bus in bus_elements:
            try:
                k += 1
                bus_name = bus.find_element(By.CSS_SELECTOR, 'p.SrpActiveCardstyles__BusBoldtxtPara-sc-yk1110-7.faoGPx').text
                bus_rating = bus.find_element(By.CSS_SELECTOR, 'span.SrpActiveCardstyles__BusReviewHighRatingSpan-sc-yk1110-13.jhDQoN').text
                departure_time = bus.find_element(By.CSS_SELECTOR, 'div.SrpActiveCardstyles__DepartureWrapperDiv-sc-yk1110-21.cOOMQi p.SrpActiveCardstyles__BusBoldtxtPara-sc-yk1110-7.faoGPx').text
                departure_location = bus.find_element(By.CSS_SELECTOR, 'div.SrpActiveCardstyles__DepartureWrapperDiv-sc-yk1110-21.cOOMQi p.SrpActiveCardstyles__BusNormaltxtPara-sc-yk1110-9.bSCbBM').get_attribute('title')
                arrival_time = bus.find_element(By.CSS_SELECTOR, 'div.SrpActiveCardstyles__ArrivalWrapperDiv-sc-yk1110-22.wgAPG p.SrpActiveCardstyles__BusBoldtxtPara-sc-yk1110-7.faoGPx').text
                arrival_location = bus.find_element(By.CSS_SELECTOR, 'div.SrpActiveCardstyles__ArrivalWrapperDiv-sc-yk1110-22.wgAPG p.SrpActiveCardstyles__DropPointtxtPara-sc-yk1110-0.dPPmfm').get_attribute('title')
                price = bus.find_element(By.CSS_SELECTOR, 'span.SrpActiveCardstyles__RupeetxtSpan-sc-yk1110-37.iIIlCN').text
                window_seats = bus.find_element(By.CSS_SELECTOR, 'p.SrpActiveCardstyles__TotalSeatsPara-sc-yk1110-19.jSsTUj span').text
                # total_seats = bus.find_element(By.CSS_SELECTOR, 'p.SrpActiveCardstyles__BusNormaltxtPara-sc-yk1110-9.bSCbBM').text
                # bus_link = bus.find_element(By.CSS_SELECTOR, 'a.SrpActiveCardstyles__BookBtn-sc-yk1110-48.gEcNWx').get_attribute('href')


                # Extract amenities using JavaScript click
                try:
                    amenities_link = bus.find_element(By.CSS_SELECTOR, 'a.SrpActiveCardstyles__BoadingElink-sc-yk1110-45.bQcslY')
                    # amenities_link = bus.find_element(By.CSS_SELECTOR, ' a.Tabsstyles__Tabs-sc-19uevla-1.dQCnuc.active')
                    driver.execute_script("arguments[0].scrollIntoView(true);", amenities_link)
                    time.sleep(1)
                    driver.execute_script("arguments[0].click();", amenities_link)
                    time.sleep(1)

                    amenities_tab = WebDriverWait(driver, 10).until(
                        EC.presence_of_element_located((By.CSS_SELECTOR, 'span[data-val="amenities_photos"]'))
                        # EC.presence_of_element_located((By.CSS_SELECTOR, 'span.Tabsstyles__SpanTabs-sc-19uevla-2.kSTbdg'))
                        # EC.presence_of_element_located((By.CSS_SELECTOR, 'a.Tabsstyles__Tabs-sc-19uevla-1.dQCnuc.active > span'))

                    )
                    #clicking hhide details  button
            #         hide_details_button = WebDriverWait(driver, 10).until(
            #         EC.presence_of_element_located(
            # (By.CSS_SELECTOR, '.DropArrowIcon-sc-175sk62-0.irXHlx')
    #     )
    # )
                    # driver.execute_script("arguments[0].click();", hide_details_button)
                    # time.sleep(3)
                    
                    driver.execute_script("arguments[0].scrollIntoView(true);", amenities_tab)
                    time.sleep(1)
                    driver.execute_script("arguments[0].click();", amenities_tab)
                    # time.sleep(8)

                    # Extract amenities after clicking the link
                    amenities_elements = WebDriverWait(driver, 10).until(
                        EC.presence_of_all_elements_located((By.CSS_SELECTOR, 'span.AmenitiesPhotosstyles__AmenitiesTxt-sc-r6z5vd-4.htilqA'))
                    )
                    amenities = [amenity.text for amenity in amenities_elements if amenity.text]
                except Exception as e:
                    print(f"Failed to extract amenities: {e}")
                    amenities = []

                bus_info = {
                    'bus_name': bus_name,
                    'rating': bus_rating,
                    'departure_time': departure_time,
                    'departure_location': departure_location,
                    'arrival_time': arrival_time,
                    'arrival_location': arrival_location,
                    'price': price,
                    'window_seats': window_seats,
                    # 'Total Seats Left': total_seats,
                    'Amenities': amenities,
                    # 'Bus Link': bus_link
                    }
                bus_data.append(bus_info)
                if k >= 10:
                    break
                # buses = driver.find_elements(By.CSS_SELECTOR, 'div.bus-card')  # Adjust selector for bus cards

                # for index, bus in enumerate(buses):
                #     try:
                #         print(f"Processing bus {index + 1} of {len(buses)}...")
                        
                #         # Find amenities link within this bus
                #         amenities_link = bus.find_element(By.CSS_SELECTOR, 'a.SrpActiveCardstyles__BoadingElink-sc-yk1110-45.bQcslY')
                #         driver.execute_script("arguments[0].scrollIntoView(true);", amenities_link)
                #         time.sleep(1)
                #         driver.execute_script("arguments[0].click();", amenities_link)
                #         time.sleep(3)

                #         # Verify and click on amenities tab
                #         amenities_tab = WebDriverWait(driver, 10).until(
                #             # EC.presence_of_element_located((By.CSS_SELECTOR, 'span[data-val="amenities_photos"]'))
                #             # EC.presence_of_element_located((By.CSS_SELECTOR, 'span[data-val="amenities_photos"]'))
                #         )
                #         driver.execute_script("arguments[0].scrollIntoView(true);", amenities_tab)
                #         time.sleep(1)
                #         driver.execute_script("arguments[0].click();", amenities_tab)
                #         time.sleep(8)

                #         # Extract amenities
                #         amenities_elements = WebDriverWait(driver, 10).until(
                #             EC.presence_of_all_elements_located((By.CSS_SELECTOR, 'span.AmenitiesPhotosstyles__AmenitiesTxt-sc-r6z5vd-4.htilqA'))
                #         )
                #         amenities = [amenity.text for amenity in amenities_elements if amenity.text]
                #         print(f"Bus {index + 1} amenities: {amenities}")

                #     except Exception as e:
                #         print(f"Failed to extract amenities for bus {index + 1}: {e}")
                #         amenities = []


            except Exception as inner_e:
                print(f"Failed to extract details for a bus: {inner_e}")
                
    except Exception as e:
        print(f"Failed to scrape bus details: {e}")
    finally:
        driver.quit()

    # Write the bus data to a JSON file
    output_dir = os.path.join(os.path.dirname(__file__), 'outputs')
    os.makedirs(output_dir, exist_ok=True)

    # Path to the JSON file
    output_file = os.path.join(output_dir, 'bus_data.json')


    print('writing bus data')
    timestamp = datetime.datetime.now().isoformat()

# Prepare the data with timestamp
    data_to_save = {
        "timestamp": timestamp,
        "bus_data": bus_data
    }

    # Save the data to JSON
    with open('./outputs/bus_data.json', 'w', encoding="utf-8") as json_file:
        json.dump(data_to_save, json_file, ensure_ascii=False, indent=4)
    # with open('./outputs/bus_data.json', 'w', encoding="utf-8") as json_file:
    #     json.dump(bus_data, json_file, ensure_ascii=False, indent=4)

    print("Bus data successfully written to 'bus_data.json'.")

# Example Usage
# srcplace = input("Enter source: ")
# destplace = input("Enter destination: ")
# check_in_date = input("Enter travel date (dd): ")
# srcplace = 'banglore'
# destplace = 'shimoga'
# check_in_date = 29
today = datetime.datetime.today()
srcplace = sys.argv[1] if len(sys.argv) > 1 else "banglore"
destplace = sys.argv[2] if len(sys.argv)>2 else "mumbai"
check_in_date = sys.argv[3] if len(sys.argv) > 3 else today.strftime("%B")
print(check_in_date)
# check_in_date = int(sys.argv[4]) if len(sys.argv) > 4 else today.day
print(srcplace,destplace,check_in_date)
scrape_Busses(srcplace, destplace, check_in_date)
