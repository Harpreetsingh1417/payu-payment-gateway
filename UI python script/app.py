from flask import Flask, render_template, request
import pandas as pd

app = Flask(__name__)


@app.route("/", methods=["GET", "POST"])
def index():

    result = None
    columns = []
    error = None

    if request.method == "POST":

        # Get the uploaded CSV file
        file = request.files.get("csv_file")

        # Check whether a file was selected
        if not file or file.filename == "":
            error = "Please select a CSV file."

        # Check file extension
        elif not file.filename.lower().endswith(".csv"):
            error = "Please upload a CSV file only."

        else:
            try:
                # Read CSV using pandas
                df = pd.read_csv(file)

                # Check whether Search Items column exists
                if "Search Items" not in df.columns:

                    error = 'The CSV must contain a column named "Search Items".'

                else:

                    # Count the number of words in each Search Items cell
                    word_count = (
                        df["Search Items"]
                        .fillna("")
                        .astype(str)
                        .str.strip()
                        .str.split(r"\s+")
                        .str.len()
                    )

                    # Keep COMPLETE rows where exactly 2 words are present
                    result_df = df[word_count == 2].copy()

                    # Get column names
                    columns = result_df.columns.tolist()

                    # Convert rows into dictionary format for HTML
                    result = result_df.fillna("").to_dict(
                        orient="records"
                    )

            except Exception as e:

                error = f"Could not process the CSV: {e}"

    return render_template(
        "index.html",
        result=result,
        columns=columns,
        error=error
    )


if __name__ == "__main__":
    app.run(debug=True)