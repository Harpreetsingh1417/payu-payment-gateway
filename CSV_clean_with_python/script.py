
import pandas as pd


# ============================================================
# 1. LOAD DATA
# Loads the original order.csv file into a DataFrame.
# ============================================================

df = pd.read_csv("order.csv")

original_rows = len(df)


# ============================================================
# 2. REMOVE DUPLICATE ROWS
# Removes completely identical rows.
# Keeps the first occurrence.
# ============================================================

df.drop_duplicates(keep="first", inplace=True)

duplicates_removed = original_rows - len(df)


# ============================================================
# 3. CLEAN NUMERIC COLUMNS
# Converts Quantity and Unit_Price into numeric values.
# Invalid values become NaN.
#
# Commas are removed from Unit_Price first, so values like
# "1,250" can be converted to 1250.
# ============================================================

df["Quantity"] = pd.to_numeric(
    df["Quantity"],
    errors="coerce"
)

df["Unit_Price"] = pd.to_numeric(
    df["Unit_Price"]
      .astype(str)
      .str.replace(",", "", regex=False),
    errors="coerce"
)


# ============================================================
# 4. REMOVE MISSING VALUES
# Removes rows where any value required for our analysis
# is missing:
#
# Customer_Email
# Quantity
# Unit_Price
# Product_Category
# ============================================================

before_missing = len(df)

df.dropna(
    subset=[
        "Customer_Email",
        "Quantity",
        "Unit_Price",
        "Product_Category"
    ],
    inplace=True
)

missing_rows_removed = before_missing - len(df)


# ============================================================
# 5. STANDARDIZE ORDER_DATE
# Converts different date formats into datetime values.
# Invalid dates become NaT.
# ============================================================

df["Order_date"] = pd.to_datetime(
    df["Order_date"],
    errors="coerce",
    dayfirst=True
)


# ============================================================
# 6. REMOVE INVALID DATES
# Removes rows where Order_date could not be converted.
# ============================================================

before_dates = len(df)

df.dropna(
    subset=["Order_date"],
    inplace=True
)

invalid_dates_removed = before_dates - len(df)


# ============================================================
# 7. FORMAT ORDER_DATE
# Converts valid dates into YYYY-MM-DD format.
# ============================================================

df["Order_date"] = df["Order_date"].dt.strftime("%Y-%m-%d")


# ============================================================
# 8. RESET INDEX
# Creates a clean sequential index after removing rows.
# ============================================================

df.reset_index(drop=True, inplace=True)


# ============================================================
# 9. EXPORT CLEANED DATA
# Saves the cleaned dataset as orders_cleaned.csv.
# ============================================================

df.to_csv(
    "orders_cleaned.csv",
    index=False
)


# ============================================================
# 10. CALCULATE REVENUE
# Revenue for each order = Quantity × Unit_Price.
# ============================================================

df["Revenue"] = df["Quantity"] * df["Unit_Price"]


# ============================================================
# 11. CALCULATE REVENUE AND ORDERS PER CATEGORY
#
# Total_Revenue = sum of revenue for the category.
# Total_Orders  = number of orders in the category.
# ============================================================

category_summary = (
    df.groupby("Product_Category", as_index=False)
      .agg(
          Total_Revenue=("Revenue", "sum"),
          Total_Orders=("Order_Id", "count")
      )
      .sort_values(
          "Total_Revenue",
          ascending=False
      )
)


# ============================================================
# 12. PRINT CLEANING SUMMARY
# ============================================================

print("\n" + "=" * 60)
print("                 CLEANING SUMMARY")
print("=" * 60)

print(f"Original rows          : {original_rows}")
print(f"Duplicates removed     : {duplicates_removed}")
print(f"Missing rows removed   : {missing_rows_removed}")
print(f"Invalid dates removed  : {invalid_dates_removed}")
print(f"Final cleaned rows     : {len(df)}")


# ============================================================
# 13. PRINT CATEGORY SUMMARY
# ============================================================

print("\n" + "=" * 60)
print("           REVENUE & ORDERS BY CATEGORY")
print("=" * 60)

print(
    category_summary.to_string(
        index=False,
        formatters={
            "Total_Revenue": "{:,.2f}".format
        }
    )
)


# ============================================================
# 14. CONFIRM OUTPUT FILE
# ============================================================

print("\n" + "=" * 60)
print("Output file: orders_cleaned.csv")
print("=" * 60)