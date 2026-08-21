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




// to print code count meaning
// from http import HTTPStatus

// log_file = "access_errors.log"

// status_counts = {}

// with open(log_file, "r") as file:
//     for line in file:
//         parts = line.split()

//         try:
//             status_code = int(parts[8])

//             if 400 <= status_code <= 599:
//                 status_counts[status_code] = status_counts.get(status_code, 0) + 1

//         except (ValueError, IndexError):
//             continue


// print("Code\tCount\tMeaning")
// print("-" * 45)

// for code in sorted(status_counts):
//     meaning = HTTPStatus(code).phrase
//     print(f"{code}\t{status_counts[code]}\t{meaning}")











// to print code and meaning
// from http import HTTPStatus

// log_file = "access_errors.log"

// print("\nCode\tMeaning")

// with open(log_file, "r") as file:
//     for line in file:
//         parts = line.split()

//         try:
//             status_code = int(parts[8])

//             if 400 <= status_code <= 599:
//                 meaning = HTTPStatus(status_code).phrase
//                 print(f"\n{status_code} : {meaning}")

//         except (ValueError, IndexError):
//             continue