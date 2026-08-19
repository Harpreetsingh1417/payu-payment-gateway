LOG_FILE = "access_errors.log"

total_rows = 0
error_count = 0

with open(LOG_FILE, "r", encoding="utf-8") as file:

    for line in file:

        if not line.strip():
            continue

        total_rows += 1

        # Split the log line to get the HTTP status code
        parts = line.split('"')

        status = int(parts[2].split()[0])

        # Check for 4xx and 5xx errors
        if 400 <= status <= 599:
            error_count += 1
            print(line.strip())


print("\n------------------------")
print("Total rows:", total_rows)
print("Total 4xx/5xx errors:", error_count)