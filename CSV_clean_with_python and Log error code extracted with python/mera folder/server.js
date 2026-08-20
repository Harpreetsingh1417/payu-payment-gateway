// import re

// log_file = "access_errors.log"

// count_4xx = 0
// count_5xx = 0

// with open(log_file, "r") as file:
//     for line in file:
//         match = re.search(r'" (\d{3}) ', line)

//         if match:
//             status_code = match.group(1)

//             if status_code.startswith("4"):
//                 count_4xx += 1

//             elif status_code.startswith("5"):
//                 count_5xx += 1

// print("Total 4xx errors:", count_4xx)
// print("Total 5xx errors:", count_5xx)
// print("Total errors:", count_4xx + count_5xx)


// create a .env and put: 
// API_KEY=mock_api_key_123
// API_SECRET=mock_secret_456

// create a .gitignore and put:
// .env
// venv/
// __pycache__/



// import os
// from dotenv import load_dotenv

// load_dotenv()

// api_key = os.getenv("API_KEY")
// api_secret = os.getenv("API_SECRET")

// count_4xx = 0
// count_5xx = 0

// with open("access_errors.log", "r") as file:
//     for line in file:
//         parts = line.split()

//         try:
//             status_code = int(parts[-1])
//         except (ValueError, IndexError):
//             continue

//         if 400 <= status_code <= 499:
//             count_4xx += 1

//         elif 500 <= status_code <= 599:
//             count_5xx += 1

// print("Error Summary")
// print("Total 4xx errors:", count_4xx)
// print("Total 5xx errors:", count_5xx)