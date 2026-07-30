import pandas as pd

# -----------------------------
# Read CSV File
# -----------------------------

df = pd.read_csv("raw_data.csv")

# -----------------------------
# Keep only Search Items with exactly 2 words
# -----------------------------

df = df[df["Search Items"].str.split().str.len() == 2]

# -----------------------------
# Split into First and Second Word
# -----------------------------

df["First Word"] = df["Search Items"].str.split().str[0]
df["Second Word"] = df["Search Items"].str.split().str[1]

# -----------------------------
# Group identical Search Items
# -----------------------------

result = (
    df.groupby("Search Items")
      .agg(
          First_Word=("First Word", "first"),
          Second_Word=("Second Word", "first"),
          Occurrences=("Search Items", "count"),
          Total_Clicks=("Clicks", "sum"),
          Average_Time=("Time Per Click (sec)", "mean")
      )
)

# -----------------------------
# Engagement Score
# -----------------------------

result["Engagement Score"] = (
    result["Total_Clicks"] *
    result["Average_Time"]
)

# -----------------------------
# Sort by Engagement Score
# -----------------------------

result = result.sort_values(
    by="Engagement Score",
    ascending=False
)

# -----------------------------
# Ranking
# -----------------------------

result["Rank"] = range(1, len(result) + 1)

# -----------------------------
# Save Result
# -----------------------------

result.reset_index().to_csv(
    "output.csv",
    index=False
)

print("Analysis Complete!")
print(result)