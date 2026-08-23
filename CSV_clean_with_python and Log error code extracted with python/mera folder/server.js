// import pandas as pd
// import re
// from collections import Counter

// df = pd.read_csv("search_terms.csv")

// def split_term(term):
//     term = str(term).lower()
//     term = re.sub(r"[^\w\s]", " ", term)
//     return term.split()

// result = pd.DataFrame({
//     "search_term": df["search_term"].apply(split_term)
// })

// pd.set_option("display.max_rows", None)
// pd.set_option("display.max_colwidth", None)

// print("\nSPLIT SEARCH TERMS")
// print("------------------")
// print(result.to_string(index=False))

// word_frequency = Counter()

// for words in result["search_term"]:
//     word_frequency.update(words)

// print("\nWORD COUNT TABLE")
// print("----------------")
// print(f"{'word':>15} {'count':>10}")

// for word, count in word_frequency.most_common():
//     print(f"{word:>15} {count:>10}")

// print("\nWORD FREQUENCY TABLE - TOP 15")
// print("------------------------------")
// print(f"{'word':>15} {'frequency':>10}")

// for word, frequency in word_frequency.most_common(15):
//     print(f"{word:>15} {frequency:>10}")

// click_weighted_frequency = Counter()

// for words, clicks in zip(result["search_term"], df["clicks"]):
//     for word in words:
//         click_weighted_frequency[word] += clicks

// print("\nCLICK-WEIGHTED TABLE")
// print("-------------------")
// print(f"{'word':>15} {'clicks':>10} {'rank':>6}")

// for rank, (word, clicks) in enumerate(
//     click_weighted_frequency.most_common(), start=1
// ):
//     print(f"{word:>15} {clicks:>10} {rank:>6}")