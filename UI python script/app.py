# from flask import Flask, render_template, request
# import pandas as pd

# app = Flask(__name__)


# @app.route("/", methods=["GET", "POST"])
# def index():

#     result = None
#     columns = []
#     error = None

#     if request.method == "POST":

#         file = request.files.get("csv_file")

#         if not file or file.filename == "":
#             error = "Please select a CSV file."

#         elif not file.filename.lower().endswith(".csv"):
#             error = "Please upload a CSV file only."

#         else:
#             try:
#                 # Read CSV
#                 df = pd.read_csv(file)

#                 # Check required columns
#                 required_columns = [
#                     "Search term",
#                     "Impr.",
#                     "Clicks",
#                     "Conversions",
#                     "Cost",
#                     "Conv. value"
#                 ]

#                 for column in required_columns:
#                     if column not in df.columns:
#                         error = f'Column "{column}" not found in CSV.'
#                         break

#                 if not error:

#                     result_data = {}

#                     # Go through every row
#                     for _, row in df.iterrows():

#                         term = str(row["Search term"])

#                         if term == "nan":
#                             continue

#                         term = term.lower().strip()

#                         if not term:
#                             continue

#                         # Remove punctuation
#                         words = (
#                             term
#                             .replace(",", "")
#                             .replace(".", "")
#                             .replace("!", "")
#                             .replace("?", "")
#                             .replace("(", "")
#                             .replace(")", "")
#                             .split()
#                         )

#                         # Same as:
#                         # if (words.length < 2) continue;
#                         if len(words) < 2:
#                             continue

#                         # Create consecutive two-word phrases
#                         for i in range(len(words) - 1):

#                             phrase = words[i] + " " + words[i + 1]

#                             # Create new phrase
#                             if phrase not in result_data:
#                                 result_data[phrase] = {
#                                     "Search Term": phrase,
#                                     "Impressions": 0,
#                                     "Clicks": 0,
#                                     "Conversions": 0,
#                                     "Cost": 0,
#                                     "Conversion Value": 0
#                                 }

#                             # Add metrics
#                             result_data[phrase]["Impressions"] += (
#                                 pd.to_numeric(row["Impr."], errors="coerce")
#                                 or 0
#                             )

#                             result_data[phrase]["Clicks"] += (
#                                 pd.to_numeric(row["Clicks"], errors="coerce")
#                                 or 0
#                             )

#                             result_data[phrase]["Conversions"] += (
#                                 pd.to_numeric(row["Conversions"], errors="coerce")
#                                 or 0
#                             )

#                             result_data[phrase]["Cost"] += (
#                                 pd.to_numeric(row["Cost"], errors="coerce")
#                                 or 0
#                             )

#                             result_data[phrase]["Conversion Value"] += (
#                                 pd.to_numeric(row["Conv. value"], errors="coerce")
#                                 or 0
#                             )

#                     # Convert result to list
#                     result = list(result_data.values())

#                     columns = [
#                         "Search Term",
#                         "Impressions",
#                         "Clicks",
#                         "Conversions",
#                         "Cost",
#                         "Conversion Value"
#                     ]

#             except Exception as e:
#                 error = f"Could not process the CSV: {e}"

#     return render_template(
#         "index.html",
#         result=result,
#         columns=columns,
#         error=error
#     )


# if __name__ == "__main__":
#     app.run(debug=True)













import streamlit as st
import pandas as pd
import re

st.title("Two Word CSV Analyzer")

# Upload CSV
file = st.file_uploader("Upload CSV file", type=["csv"])

if file is not None:

    try:
        # Read CSV
        df = pd.read_csv(file)

        # Required columns
        required_columns = [
            "Search term",
            "Impr.",
            "Clicks",
            "Conversions",
            "Cost",
            "Conv. value"
        ]

        # Check columns
        missing_columns = [
            col for col in required_columns
            if col not in df.columns
        ]

        if missing_columns:

            st.error(
                "Missing columns: " + ", ".join(missing_columns)
            )

        else:

            result = {}

            # Same logic as Apps Script
            for _, row in df.iterrows():

                term = str(row["Search term"]).lower().strip()

                if not term or term == "nan":
                    continue

                # Remove punctuation
                term = re.sub(r"[^\w\s]", "", term)

                # Split into words
                words = term.split()

                if len(words) < 2:
                    continue

                # Create two-word phrases
                for i in range(len(words) - 1):

                    phrase = words[i] + " " + words[i + 1]

                    # Create phrase
                    if phrase not in result:
                        result[phrase] = {
                            "Search Term": phrase,
                            "Impressions": 0,
                            "Clicks": 0,
                            "Conversions": 0,
                            "Cost": 0,
                            "Conversion Value": 0
                        }

                    # Add values
                    result[phrase]["Impressions"] += (
                        pd.to_numeric(row["Impr."], errors="coerce") or 0
                    )

                    result[phrase]["Clicks"] += (
                        pd.to_numeric(row["Clicks"], errors="coerce") or 0
                    )

                    result[phrase]["Conversions"] += (
                        pd.to_numeric(row["Conversions"], errors="coerce") or 0
                    )

                    result[phrase]["Cost"] += (
                        pd.to_numeric(row["Cost"], errors="coerce") or 0
                    )

                    result[phrase]["Conversion Value"] += (
                        pd.to_numeric(
                            row["Conv. value"],
                            errors="coerce"
                        ) or 0
                    )

            # Convert result to DataFrame
            result_df = pd.DataFrame(result.values())

            # Display result
            st.subheader("Result")

            if result_df.empty:

                st.warning("No two-word phrases found.")

            else:

                st.dataframe(
                    result_df,
                    use_container_width=True
                )

    except Exception as e:

        st.error(f"Could not process the CSV: {e}")