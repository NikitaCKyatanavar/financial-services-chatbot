# backend/finbert_api.py
# Simple one-shot QA using HuggingFace pipeline and a small "knowledge base" context.
# Make sure to `pip install -r requirements.txt` in backend/ folder.

import sys
import json
import traceback
from transformers import pipeline

def main():
    try:
        # Load QA pipeline (this will download the model on first run)
        qa = pipeline("question-answering", model="deepset/roberta-base-squad2")

        # Knowledge context (expand as you like)
        context = """
A loan is a sum of money borrowed from a bank or financial institution that is expected to be paid back with interest.
A credit default swap (CDS) is a financial derivative that allows an investor to swap or offset their credit risk with that of another investor.
Phishing is a type of online scam where criminals send fake messages that appear to be from a trusted source.
Online banking security can be improved by using strong passwords, enabling two-factor authentication, and avoiding public Wi-Fi.
Fraud alerts notify customers of suspicious transactions or activity on their accounts.
An EMI (equated monthly installment) is the fixed payment amount made by a borrower to a lender at a specified date each calendar month.
"""

        # Read the question from command-line arguments (join in case of multiple args)
        if len(sys.argv) > 1:
            question = " ".join(sys.argv[1:])
        else:
            # fallback to interactive input
            question = input("Question: ")

        # run QA
        result = qa(question=question, context=context)

        answer = result.get("answer", "").strip()
        score = result.get("score", 0.0)

        # Basic sources mapping for bonus points
        sources = {
            "loan": "https://www.investopedia.com/terms/l/loan.asp",
            "credit default swap": "https://www.investopedia.com/terms/c/creditdefaultswap.asp",
            "cds": "https://www.investopedia.com/terms/c/creditdefaultswap.asp",
            "phishing": "https://www.investopedia.com/terms/p/phishing.asp",
            "fraud": "https://www.investopedia.com/terms/f/fraud.asp",
            "emi": "https://www.investopedia.com/terms/e/equated-monthly-installment.asp",
        }

        # Find first matching source key in the question
        source_url = None
        q_lower = question.lower()
        for key, url in sources.items():
            if key in q_lower:
                source_url = url
                break

        if source_url:
            answer += f"\n(Source: {source_url})"

        # Print answer — Node.js will capture stdout
        print(answer)

    except Exception as e:
        # Print error to stderr so Node can capture it
        traceback.print_exc()
        sys.exit(1)

if __name__ == "__main__":
    main()
