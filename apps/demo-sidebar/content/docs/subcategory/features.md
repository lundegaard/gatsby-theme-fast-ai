---
title: Features
---

# Table of Contents

* [Introduction](#Introduction)
* [Smart Features](#Smart-Features)
    * [Behavior Category](#behavior-category)
    * [Data Category](#data-category)
    * [Device Category](#device-category)
    * [Fingerprint Category](#fingerprint-category)
    * [Location Category](#location-category)
    * [Person Category](#person-category)


# Introduction
Following documentation describes **Smart Features** - data points returned from Zoe.ai through [REST API](https://zoe.lundegaard.ai/docs/swagger-ui.html) in near real-time. Smart Features are divided into several categories. Following categories are used as prefix in Smart Feature names:

* `behavior_` - detailed data points about user's behavior on web page or within application (HTML form). Behavior category also includes user's behavior during several filled applications.
* `data_` - enriched basic data
* `device_` - features about user's device which are grabbed from standard or mobile website immediately after user's visit
* `fingeprint_` - category of several data points fingerprinting user's device in advanced way
* `location_` - data points derived from several location metrics
* `person_` - data points derived from personal information


Smart Features names can consist also suffix notation. Suffix denotes how given Smart Feature is being groupped. Following suffixes can be used:

* `_bn` - groupped according personal identificaiton number
* `_email` - groupped according email
* `_sa` - groupped by long term cookie
* `_said` - (nor no suffix) data are being groupped within one user session
* _df - groupped according device fingeprint
* _1w - groupped per 1 week
* _2d - groupped within 48 hours
* _max - maximum time based on cookie duration and/or data retention
* _mean - average metric
* _med - median metric
* _std - standard devition metric
* _count - total count metric



# Smart Features

## Behavior Category

|feature_name|type|description|sample_value|released_from|
|------------|----|-----------|------------|-------------|
|behavior_application_changes_count_bn_2d|INT|A number of changed fields between all applications that the user applied during the last two days. Typos in text fields are ignored (up to levenshtein distance of 2 - roughly 2 mistakes).|3|v2.00.0|
|behavior_application_changes_count_bn_1w|INT|A number of changed fields between all applications that the user applied during the last week. Typos in text fields are ignored (up to levenshtein distance of 2 - roughly 2 mistakes).|3|v2.07.0|
|behavior_application_changes_count_bn_1m|INT|A number of changed fields between all applications that the user applied during the last month. Typos in text fields are ignored (up to levenshtein distance of 2 - roughly 2 mistakes).|3|v2.07.0|
|behavior_application_changes_count_bn_1y|INT|A number of changed fields between all applications that the user applied during the last year. Typos in text fields are ignored (up to levenshtein distance of 2 - roughly 2 mistakes).|3|v2.07.0|
|behavior_application_changes_count_fields_bn_2d|JSON|The list of changed webdata fields and number of changes for last two days by birth number|"{"borrower_typeOfLiving":2}"|v2.02.0|
|behavior_application_changes_count_fields_sa_2d|JSON|The list of changed webdata fields and number of changes for last two days from this device.|"{"borrower_typeOfLiving":2}"|v2.02.0|
|behavior_application_changes_count_sa_2d|INT|A number of changed fields amongst all applications that were applied from this device during the last two days. Typos in text fields are ignored (up to levenshtein distance of 2 - roughly 2 mistakes).|3|v2.00.0|
|behavior_application_changes_count_sa_1w|INT|A number of changed fields amongst all applications that were applied from this device during the last week. Typos in text fields are ignored (up to levenshtein distance of 2 - roughly 2 mistakes).|3|v2.07.0|
|behavior_application_changes_count_sa_1m|INT|A number of changed fields amongst all applications that were applied from this device during the last month. Typos in text fields are ignored (up to levenshtein distance of 2 - roughly 2 mistakes).|3|v2.07.0|
|behavior_application_changes_count_sa_1y|INT|A number of changed fields amongst all applications that were applied from this device during the last year. Typos in text fields are ignored (up to levenshtein distance of 2 - roughly 2 mistakes).|3|v2.07.0|
|behavior_application_changes_detail_bn_2d|JSON|Changed values that user made between all applications that applied during the last two days. Typos in text fields are ignored (up to levenshtein distance of 2 - roughly 2 mistakes).|`{"income":[24000,30000,28000]}`|v2.00.0|
|behavior_application_changes_detail_sa_2d|JSON|Changed values between all applications that applied during the last two days from this device. Typos in text fields are ignored (up to levenshtein distance of 2 - roughly 2 mistakes).|"{"income":[24000,30000,28000]}"|v2.02.0|
|behavior_applications_count_all_max|INT|A number of all applications that are connected with current application by any kind of identifier (any of long-term cookie, birth number, name+surname, email, phone number).|5|v2.00.0|
|behavior_duration_form|LONG|Amount of time [ms] user spends in the form. (It's a duration between event finishedForm and first hit on first form page.|179123|v2.00.0|
|behavior_duration_web_said|LONG|Amount of time [ms] user spends in the website. It's a time of the last hit on the website subtracted from the first hit on the first page.|47|v2.00.0|
|behavior_emails_bn_max|JSON|List of the different email addresses that given user used for all applications.|"["email123@gmail.com","email456@gmail.com"]"|v2.04.1|
|behavior_emails_bn_1m|JSON|List of the different email addresses that given user used for applications in last month.|"["email123@gmail.com","email456@gmail.com"]"|v2.04.1|
|behavior_emails_count_bn_max|INT|A number of different email addresses that given user used for all applications.|2|v2.04.1|
|behavior_emails_count_bn_1m|INT|A number of different email addresses that given user used for applications in last month.|2|v2.04.1|
|behavior_emails_count_sa_max|INT|A number of different email addresses that were used for all applications from this device.|1|v2.04.1|
|behavior_emails_count_sa_1m|INT|A number of different email addresses that were used for applications in last month from this device|1|v2.04.1|
|behavior_emails_detail_bn_max|JSON|A map of all email addresses with their timestamp from given user|"{"1570172236952":"email123@gmail.com","1570172247408":"email456@gmail.com"}"|v2.04.1|
|behavior_emails_detail_sa_max|JSON|A map of all email addresses with their timestamp from this device|"{"1570172236952":"email123@gmail.com","1570172247408":"email456@gmail.com"}"|v2.04.1|
|behavior_emails_sa_max|JSON|List of of different email addresses that were used for all applications from this device|"["email123@gmail.com","email456@gmail.com"]"|v2.04.1|
|behavior_emails_sa_1m|JSON|List of different email addresses that were used for applications in last month from this device|"["email123@gmail.com","email456@gmail.com"]"|v2.04.1|
|behavior_events_count|INT|A number of events per form filling.|35|v2.00.0|
|behavior_events_count_said|INT|A number of events per session (excluding form events).|15|v2.00.0|
|behavior_landing_page|STRING|It's the very first page on the website that a user lands on.|https://www.loan-lender.com|v2.00.0|
|behavior_landing_page_raw|STRING|It's the very first page (with parameter in URL) on the website that a user lands on.|https://www.loan-lender.com/utm_source=google|v2.00.0|
|behavior_pages_visited_count_said|INT|A number of visited pages during the session.|5|v2.00.0|
|behavior_pages_visited_said|JSON|Visited pages during the user's session.|'/pages/list.php,/pages/list2.php'|v2.00.0|
|behavior_slider_move_count|INT|A number of a slider moves during the form filling.|3|v2.00.0|
|behavior_slider_move_time|LONG|The time [ms] that the user spends interacting with the slider during the form filling.|13245|v2.00.0|
|behavior_source|STRING|Source of the campaign identifies which site sent the traffic. For manual campaign tracking, it is the value of the utm_source campaign tracking parameter.|facebook|v2.00.0|
|behavior_source_campaign|STRING|The name of the campaign identifies a specific product promotion or strategy. For manual campaign tracking, it is the value of the utm_campaign campaign tracking parameter.||v2.00.0|
|behavior_source_content|STRING|The content identifies a specific ad. This parameter is used for A/B testing to differentiate ads or links that point to the same URL. For manual campaign tracking, it is the value of the utm_content campaign tracking parameter.|loans|v2.00.0|
|behavior_source_keyword|STRING|The word(s) used by users to reach your site from a search engine ( Google not providing this information). Derived from referral URL.|loan-lender|v2.00.0|
|behavior_source_medium|STRING|The type of referrals (e.g. cpc, banner, email). For manual campaign tracking, it is the value of the utm_medium campaign tracking parameter.|cpc|v2.00.0|
|behavior_source_referrer|STRING|The URL that referred traffic to the website.|https://www.google.com/|v2.00.0|
|behavior_source_referrer_raw|STRING|The URL with parameters that referred traffic to the website.|https://email.seznam.cz/?hp|v2.00.0|
|behavior_source_term|STRING|Identifies a specific search term. For manual campaign tracking, it is the value of the utm_term campaign tracking parameter.|loans|v2.00.0|
|behavior_timer_detail|JSON|The time [ms] measured by custom timers.|"{"terms1":235448, "about_us": 13987}"|v2.00.0|
|behavior_time_between_events_max|INT|The maximum amount of time [ms] between two consecutive events during the form filling.|121883|v2.00.0|
|behavior_time_between_events_mean|FLOAT|The average amount of time [ms] between two consecutive events during the form filling.|8738.744186|v2.00.0|
|behavior_time_between_events_min|INT|The minimum amount of time [ms] between two consecutive events during the form filling.|7|v2.00.0|
|behavior_timestamp_enter|LONG|The time of the first interaction with the form.|1566904347|v2.00.0|
|behavior_timestamp_enter_said|LONG|The time of the first interaction with the website.|1566904347|v2.00.0|
|behavior_timestamp_leave|LONG|The time of the last interaction with the form.|1566904347|v2.00.0|
|behavior_timestamp_leave_said|LONG|The time of the last interaction with the website.|1566904347|v2.00.0|
|behavior_typing_backspace_count_fields|JSON|A number of pressed backspace keys for every form field.|"{"marital_status":4}"|v2.00.0|
|behavior_typing_copy_count_fields|JSON|A number of a copy events for every form field. The event copies the current selection to the system clipboard.|"{"contacts_email":2}"|v2.00.0|
|behavior_typing_correcting_mistakes_count|INT|A number of correction of mistakes during form filling. It's a sum of all pressed delete and backspace keys.|1|v2.00.0|
|behavior_typing_correcting_mistakes_count_fields|JSON|A number of correction of mistakes during form filling for every input field. It's a sum of all pressed delete and backspace keys.|"{"another_regular_income":2}"|v2.00.0|
|behavior_typing_cut_count_fields|JSON|A number of a cut events for every form field. The event copies the current selection to the system clipboard and removes it from the document.|"{"email":1}"|v2.00.0|
|behavior_typing_delete_count_fields|JSON|A number of pressed delete keys for every form field.|"{"address":2}"|v2.00.0|
|behavior_typing_dwell_time_max|FLOAT|The maximum duration [ms] between pressing and releasing a single key.|138.0|v2.00.0|
|behavior_typing_dwell_time_max_fields|JSON|The maximum duration [ms] between pressing and releasing a single key for every input field in the form.|"{"borrower_monthly_expenditure_info_fees_for_services":55.0,"borrower_basic_information_surname":47.0}"|v2.00.0|
|behavior_typing_dwell_time_mean|FLOAT|The average duration [ms] between pressing and releasing a single key.|87.8|v2.00.0|
|behavior_typing_dwell_time_mean_fields|JSON|The average duration [ms] between pressing and releasing a single key for every input field in the form.|"{"borrower_monthly_expenditure_info_fees_for_services":55.0,"borrower_basic_information_surname":47.0}"|v2.00.0|
|behavior_typing_dwell_time_med|FLOAT|The median duration [ms] between pressing and releasing a single key.|101.5|v2.00.0|
|behavior_typing_dwell_time_med_fields|JSON|The median duration [ms] between pressing and releasing a single key for every input field in the form.|"{"borrower_monthly_expenditure_info_fees_for_services":55.0,"borrower_basic_information_surname":47.0}"|v2.00.0|
|behavior_typing_dwell_time_min|FLOAT|The minimum duration [ms] between pressing and releasing a single key.|53.0|v2.00.0|
|behavior_typing_dwell_time_min_fields|JSON|The minimum duration [ms] between pressing and releasing a single key for every input field in the form.|"{"borrower_monthly_expenditure_info_fees_for_services":55.0,"borrower_basic_information_surname":47.0}"|v2.00.0|
|behavior_typing_dwell_time_std|FLOAT|The standard deviation duration [ms] between pressing and releasing a single key.|21.0982|v2.00.0|
|behavior_typing_dwell_time_std_fields|JSON|The standard deviation of duration [ms] between pressing and releasing a single key for every input field in the form.|"{"borrower_monthly_expenditure_info_fees_for_services":3.85,"borrower_basic_information_surname":4.1}"|v2.00.0|
|behavior_typing_edits_count_fields|JSON|A number of edits per input (text) field.|"{"rent":2,"email":1}"|v2.00.0|
|behavior_typing_fields_typed_into_count|INT|A number of filled fields during the form filling.|14|v2.00.0|
|behavior_typing_flight_time_max|FLOAT|The maximum duration [ms] between pressing key1 and pressing key2.|138.0|v2.00.0|
|behavior_typing_flight_time_max_fields|JSON|The maximum duration [ms] between pressing key1 and pressing key2 for every input field in the form.|"{"borrower_monthly_expenditure_info_fees_for_services":55.0,"borrower_basic_information_surname":47.0}"|v2.00.0|
|behavior_typing_flight_time_mean|FLOAT|The average duration [ms] between pressing key1 and pressing key2.|87.8|v2.00.0|
|behavior_typing_flight_time_mean_fields|JSON|The average duration [ms] between pressing key1 and pressing key2 for every input field in the form.|"{"borrower_monthly_expenditure_info_fees_for_services":55.0,"borrower_basic_information_surname":47.0}"|v2.00.0|
|behavior_typing_flight_time_med|FLOAT|The median duration [ms] between pressing key1 and pressing key2.|101.5|v2.00.0|
|behavior_typing_flight_time_med_fields|JSON|The median duration [ms] between pressing key1 and pressing key2 for every input field in the form.|"{"borrower_monthly_expenditure_info_fees_for_services":55.1,"borrower_basic_information_surname":47.7}"|v2.00.0|
|behavior_typing_flight_time_min|FLOAT|The minimum duration [ms] between pressing key1 and pressing key2.|53.0|v2.00.0|
|behavior_typing_flight_time_min_fields|JSON|The minimum duration [ms] between pressing key1 and pressing key2 for every input field in the form.|"{"borrower_monthly_expenditure_info_fees_for_services":55.0,"borrower_basic_information_surname":47.0}"|v2.00.0|
|behavior_typing_flight_time_std|FLOAT|The standard deviation duration [ms] between pressing key1 and pressing key2.|21.0982|v2.00.0|
|behavior_typing_flight_time_std_fields|JSON|The standard deviation of duration [ms] between pressing key1 and pressing key2 for every input field in the form.|"{"borrower_monthly_expenditure_info_fees_for_services":6.8,"borrower_basic_information_surname":4.4}"|v2.00.0|
|behavior_typing_input_changes_count_fields|JSON|A number of input changes per field. It contains information about text fields, select boxes and other input elements.|"{"expenditures":1}"|v2.00.0|
|behavior_typing_interval_time_max|FLOAT|The maximum duration [ms] between releasing key1 and pressing key2.|138.0|v2.00.0|
|behavior_typing_interval_time_max_fields|JSON|The maximum duration [ms] between releasing key1 and pressing key2 for every input field in the form.|"{"borrower_monthly_expenditure_info_fees_for_services":55.0,"borrower_basic_information_surname":47.0}"|v2.00.0|
|behavior_typing_interval_time_mean|FLOAT|The average duration [ms] between releasing key1 and pressing key2.|87.8|v2.00.0|
|behavior_typing_interval_time_mean_fields|JSON|The average duration [ms] between releasing key1 and pressing key2 for every input field in the form.|"{"borrower_monthly_expenditure_info_fees_for_services":65.7,"borrower_basic_information_surname":78.3}"|v2.00.0|
|behavior_typing_interval_time_med|FLOAT|The median duration [ms] between releasing key1 and pressing key2.|101.5|v2.00.0|
|behavior_typing_interval_time_med_fields|JSON|The median duration [ms] between releasing key1 and pressing key2 for every input field in the form.|"{"borrower_monthly_expenditure_info_fees_for_services":55.0,"borrower_basic_information_surname":47.0}"|v2.00.0|
|behavior_typing_interval_time_min|FLOAT|The minimum duration [ms] between releasing key1 and pressing key2.|53.0|v2.00.0|
|behavior_typing_interval_time_min_fields|JSON|The minimum duration [ms] between releasing key1 and pressing key2 for every input field in the form.|"{"borrower_monthly_expenditure_info_fees_for_services":55.0,"borrower_basic_information_surname":47.0}"|v2.00.0|
|behavior_typing_interval_time_std|FLOAT|The standard deviation duration [ms] between releasing key1 and pressing key2.|21.0982|v2.00.0|
|behavior_typing_interval_time_std_fields|JSON|The standard deviation of duration [ms] between releasing key1 and pressing key2 for every input field in the form.|"{"borrower_monthly_expenditure_info_fees_for_services":10.3,"borrower_basic_information_surname":6.1}"|v2.00.0|
|behavior_typing_keypress_count_fields|JSON|A number of pressed keys for every input field in form.|"{"birth_number":10}"|v2.00.0|
|behavior_typing_latency_time_max|FLOAT|The maximum duration [ms] between pressing down of key1 and releasing key2.|138.0|v2.00.0|
|behavior_typing_latency_time_max_fields|JSON|The maximum duration [ms] between pressing down of key1 and releasing key2 for every input field in the form.|"{"borrower_monthly_expenditure_info_fees_for_services":55.0,"borrower_basic_information_surname":47.0}"|v2.00.0|
|behavior_typing_latency_time_mean|FLOAT|The average duration [ms] between pressing down of key1 and releasing key2.|87.8|v2.00.0|
|behavior_typing_latency_time_mean_fields|JSON|The average duration [ms] between pressing down of key1 and releasing key2 for every input field in the form.|"{"borrower_monthly_expenditure_info_fees_for_services":55.0,"borrower_basic_information_surname":47.0}"|v2.00.0|
|behavior_typing_latency_time_med|FLOAT|The median duration [ms] between pressing down of key1 and releasing key2.|101.5|v2.00.0|
|behavior_typing_latency_time_med_fields|JSON|The median duration [ms] between pressing down of key1 and releasing key2 for every input field in the form.|"{"borrower_monthly_expenditure_info_fees_for_services":55.0,"borrower_basic_information_surname":47.0}"|v2.00.0|
|behavior_typing_latency_time_min|FLOAT|The minimum duration [ms] between pressing down of key1 and releasing key2.|53.0|v2.00.0|
|behavior_typing_latency_time_min_fields|JSON|The minimum duration [ms] between pressing down of key1 and releasing key2 for every input field in the form.|"{"borrower_monthly_expenditure_info_fees_for_services":55.0,"borrower_basic_information_surname":47.0}"|v2.00.0|
|behavior_typing_latency_time_std|FLOAT|The standard deviation duration [ms] between pressing down of key1 and releasing key2.|21.0982|v2.00.0|
|behavior_typing_latency_time_std_fields|JSON|The standard deviation of duration [ms] between pressing down of key1 and releasing key2 for every input field in the form.|"{"borrower_monthly_expenditure_info_fees_for_services":15.1,"borrower_basic_information_surname":4.2}"|v2.00.0|
|behavior_typing_paste_count|INT|The user pastes some content in an element during the form filling.|3|v2.00.0|
|behavior_typing_paste_count_fields|JSON|A number of a paste event for every form field.|"{"email":1}"|v2.00.0|
|behavior_typing_speed|INT|A number of keystrokes per minute.|227|v2.00.0|
|behavior_typing_speed_fields|JSON|A number of keystrokes per minute for every input field in the form.|"{"birth_number":283}"|v2.00.0|
|behavior_typing_speed_max|INT|The maximum value of keystrokes per minute.|227|v2.00.0|
|behavior_typing_speed_mean|INT|The mean value of keystrokes per minute.|150|v2.00.0|
|behavior_typing_speed_med|INT|The median value of keystrokes per minute.|163|v2.00.0|
|behavior_typing_speed_min|INT|The minimum value of keystrokes per minute.|20|v2.00.0|
|behavior_typing_speed_std|FLOAT|The standard deviation value of keystrokes per minute.|227.6584|v2.00.0|
|behavior_typing_time_fields|JSON|A duration [ms] that user spends in the input field. Data is for every field in a form.|"{"address":944}"|v2.00.0|
|behavior_typing_time_max|INT|The maximum duration [ms] that user spends in the input field.|7763|v2.00.0|
|behavior_typing_time_mean|INT|The mean duration [ms] that user spends in the input field.|2833|v2.00.0|
|behavior_typing_time_med|INT|The median duration [ms] that user spends in the input field.|1702|v2.00.0|
|behavior_typing_time_min|INT|The minimum duration [ms] that user spends in the input field.|725|v2.00.0|
|behavior_typing_time_std|FLOAT|The standard deviation of duration [ms] that user spends in the input field.|2156.68|v2.00.0|
|behavior_typing_time_sum|INT|The sum of durations [ms] that user spends in the input fields.|25501|v2.00.0|
|behavior_typing_up_to_up_time_max|FLOAT|The maximum duration [ms] between releasing key1 and releasing key2.|138.0|v2.00.0|
|behavior_typing_up_to_up_time_max_fields|JSON|The maximum duration [ms] between releasing key1 and releasing key2 for every input field in the form.|"{"borrower_monthly_expenditure_info_fees_for_services":55.0,"borrower_basic_information_surname":47.0}"|v2.00.0|
|behavior_typing_up_to_up_time_mean|FLOAT|The average duration [ms] between releasing key1 and releasing key2.|87.8|v2.00.0|
|behavior_typing_up_to_up_time_mean_fields|JSON|The average duration [ms] between releasing key1 and releasing key2 for every input field in the form.|"{"borrower_monthly_expenditure_info_fees_for_services":55.0,"borrower_basic_information_surname":47.0}"|v2.00.0|
|behavior_typing_up_to_up_time_med|FLOAT|The median duration [ms] between releasing key1 and releasing key2.|101.5|v2.00.0|
|behavior_typing_up_to_up_time_med_fields|JSON|The median duration [ms] between releasing key1 and releasing key2 for every input field in the form.|"{"borrower_monthly_expenditure_info_fees_for_services":55.0,"borrower_basic_information_surname":47.0}"|v2.00.0|
|behavior_typing_up_to_up_time_min|FLOAT|The minimum duration [ms] between releasing key1 and releasing key2.|53.0|v2.00.0|
|behavior_typing_up_to_up_time_min_fields|JSON|The minimum duration [ms] between releasing key1 and releasing key2 for every input field in the form.|"{"borrower_monthly_expenditure_info_fees_for_services":55.0,"borrower_basic_information_surname":47.0}"|v2.00.0|
|behavior_typing_up_to_up_time_std|FLOAT|The standard deviation duration [ms] between releasing key1 and releasing key2.|21.0982|v2.00.0|
|behavior_typing_up_to_up_time_std_fields|JSON|The standard deviation of duration [ms] between releasing key1 and releasing key2 for every input field in the form.|"{"borrower_monthly_expenditure_info_fees_for_services":1.4,"borrower_basic_information_surname":1.8}"|v2.00.0|

## Data Category

|feature_name|type|description|sample_value|released_from|
|------------|----|-----------|------------|-------------|
|data_county_crime_index|FLOAT|Index of criminality, is derived from the overall level of crime in a given county.|0.73|v2.00.0|
|data_county_crime_rate|FLOAT|Number of crimes in given county during last year per 10k inhabitants.|10.7|v2.00.0|
|data_district_crime_index|FLOAT|Index of criminality, is derived from the overall level of crime in a given district.|0.32|v2.00.0|
|data_district_crime_rate|FLOAT|Number of crimes in given district during last year per 10k inhabitants.|43593|v2.00.0|


## Device Category

|feature_name|type|description|sample_value|released_from|
|------------|----|-----------|------------|-------------|
|device_browser|STRING|The name and version of the user's browser.|Firefox|v2.00.0|
|device_browser_do_not_track|BOOL|Indicating whether 'Do Not Track' is enabled in user's browsers. Do Not Track is a request to websites not to collect or track browsing data.|False|v2.00.0|
|device_category|STRING|The type of device: desktop, tablet, mobile or TV.|Desktop|v2.00.0|
|device_character_encoding|STRING|Browser character encoding.|UTF-8|v2.00.0|
|device_cookies_enabled|BOOL|Indicating whether cookies collecting is enabled in user's browsers.|True|v2.00.0|
|device_cpu|STRING|The type of device's processor.|Intel x86_64|v2.00.0|
|device_flash_version|STRING|The version of Flash supported by user's browser.|32.0.0|v2.00.0|
|device_ip_address|STRING|The user's IP address.|31.30.0.34|v2.00.0|
|device_isp|STRING|The internet service provider for current user.|Vodafone Czech Republic a.s.|v2.06.0|
|device_isp_country|STRING|Country of internet service provider|CZ|v2.06.0|
|device_java_enabled|BOOL|Indicating whether Java is enabled in user's browsers.|False|v2.00.0|
|device_language|STRING|The language of the user's browser in ISO code format.|cs-cz|v2.00.0|
|device_mobile_brand|STRING|The name of a mobile manufacturer.|Apple|v2.00.0|
|device_mobile_price|INT|Manufacturers suggested a retail price [EUR] at the release date of a device.|250|v2.00.0|
|device_mobile_release_date|STRING|Year the device was released.|2018|v2.00.0|
|device_mobile_screen_size|STRING|Physical size of mobile display in mm (height x width)|110.7 x 62.3|v2.02.1|
|device_mobile_size|STRING|Physical size of mobile device in mm (height x length x width)|143.7 x 70.9 x 11.3|v2.02.1|
|device_mobile_type|STRING|Mobile device model name.|Samsung S9|v2.00.0|
|device_mobile_weight|INT|Weight of mobile phone in grams|150|v2.02.1|
|device_net_name|STRING|The official network name to which the user is connected to.|CERBEROSNET|v2.06.0|
|device_operating_system|STRING|Name of the user's operating system and its version.|Windows 10|v2.00.0|
|device_operating_system_versions_behind_latest|INT|Number of major versions between user's OS and latest version. 0 == user is using latest OS|1|v2.02.0|
|device_orientation|STRING|Device orientation provides information about the physical orientation of the user's device.|portrait|v2.00.0|
|device_screen_color_depth|INT|Colour depth of the user's screen.|24|v2.00.0|
|device_screen_resolution|STRING|Resolution of user's screen.|1376x768|v2.00.0|
|device_screen_size_height|INT|Height of the user's device screen.|768|v2.00.0|
|device_screen_size_width|INT|Width of the user's device screen.|1366|v2.00.0|
|device_tor|BOOL|Indicating whether a user is using Tor. Tor is a software that allows users to browse the web anonymously.|True|v2.00.0|
|device_viewport_size_height|INT|Height of the browser's viewport.|657|v2.00.0|
|device_viewport_size_width|INT|Width of the browser's viewport.|360|v2.00.0|
|device_vpn|BOOL|Indicating whether a user is using VPN.|True|2.05.2|


## Fingerprint Category

|feature_name|type|description|sample_value|released_from|
|------------|----|-----------|------------|-------------|
|fingerprint_audio|STRING|Fingeprint using AudioContext API.|f0ac0b43e0d7766c92628478a6a4f6f07c9df645|2.08.0|
|fingerprint_browser|STRING|Browser fingerprint based on the device data.|1:31:0:1:en-us:UTF-8:-120|v2.03.0|
|fingerprint_canvas|STRING|Fingeprint using Canvas.|trRt578aBMM|2.08.0|
|fingerprint_cookie_sa|STRING|Session ID - long term cookie|SA1.5rxu3uFA.1569415431|v2.05.00|
|fingerprint_cookie_said|STRING|Session ID - short term cookie|SA1.boRbjOxO.1570457585|v2.05.00|
|fingerprint_fonts|STRING|Fingerprint of fonts installed on the system.|aETXZBRTVVb2|2.08.0|
|fingerprint_plugins|STRING|Fingerprint of plugins installed in the browser.|HJpbnRfamF2Y|2.08.0|
|fingerprint_screen|JSON|List of fingerprints calculated from screen resolutions used during the session.|"["1920x1080:1896x1000x23x0:24:2:1000x900","1920x1080:1896x1000x23x0:24:2:1890x1060","1080x1920:1057x1920x23x0:24:2:1050x1900"]"|v2.06.00|
|fingerprint_webgl|STRING|Fingerprint of webgl metadata and rendering image using WebGL.|FPVbnRfa57HEs|2.08.0|


## Location Category

|feature_name|type|description|sample_value|released_from|
|------------|----|-----------|------------|-------------|
|location_address_county|STRING|County derived from the provided user's contact address (or permanent if no contact address is given).|Vysocina|v2.00.0|
|location_address_district|STRING|District, derived from the provided user's contact address (or permanent if no contact address is given).|Teplice|v2.00.0|
|location_address_lat|FLOAT|The approximate latitude, derived from the provided user's contact address (or permanent if no contact address is given).|50.65|v2.00.0|
|location_address_lon|FLOAT|The approximate longitude, derived from the provided user's contact address (or permanent if no contact address is given).|14.45|v2.00.0|
|location_distance_address_and_geoip|INT|The approximate distance [km] between the provided contact address (or permanent if no contact address is given) and location derived from IP address.|45|v2.00.0|
|location_distance_to_district_statutory_city|INT|The approximate distance between the provided contact address (or permanent if no contact address is given) and district statutory city.|24|v2.00.0|
|location_geoip_city|STRING|User's city, derived from his IP address.|Praha|v2.00.0|
|location_geoip_lat|FLOAT|The approximate latitude of the user's location, derived from his IP address.|14.5104|v2.00.0|
|location_geoip_lon|FLOAT|The approximate longitude of the user's location, derived from his IP address.|50.0765|v2.00.0|
|location_time_zone|STRING|The time zone [UTC+offset] configured in user's browser.|UTC+02:00|v2.00.0|


## Person Category

|feature_name|type|description|sample_value|released_from|
|------------|----|-----------|------------|-------------|
|person_age_in_months|INT|Person's age in months, derived from birth number.|367|v2.00.0|
|person_date_of_birth|STRING|Person's date of birth, derived from birth number.|1985-03-24|v2.00.0|
|person_email_credible|INT|The level of quality of the user's email address. Range from 0 (worst - corrupted or disposable email) to 3 (best - contains part of name or surname).|3|v2.00.0|
|person_email_disposable_domain|BOOL|Indicates that the email address was found on the list of disposables and temporary domain address.|True|v2.00.0|
|person_gender|STRING|Person's gender derived from birth number.|male|v2.00.0|
|person_insolvency_isir|BOOL|Indicates that the person was found in the insolvency register.|False|v2.00.0|

Automatically generated on 01-31-2020
