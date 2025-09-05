export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { message } = req.body;
  const userQuestion = message.toLowerCase();

  // 📚 Expanded Financial FAQ
  const faq = {
    "what is loan": {
      answer:
        "A loan is money borrowed from a bank or lender. You repay it with interest in monthly installments.",
      source: "https://www.investopedia.com/terms/l/loan.asp",
    },
    "what is saving account": {
      answer:
        "A savings account is a safe place in a bank to keep money. You earn a small interest on the balance.",
      source: "https://www.investopedia.com/terms/s/savingsaccount.asp",
    },
    "what is phishing scam": {
      answer:
        "Phishing is when scammers send fake emails, SMS, or websites to trick you into sharing passwords or bank details.",
      source: "https://www.investopedia.com/terms/p/phishing.asp",
    },
    "how can i secure my online banking": {
      answer:
        "Use strong passwords, enable 2FA, never share OTP, avoid public Wi-Fi, and check the website address before logging in.",
      source:
        "https://www.rbi.org.in/Scripts/BS_PressReleaseDisplay.aspx?prid=47334",
    },
    "what is credit default swap": {
      answer:
        "A credit default swap (CDS) is like loan insurance. If a borrower fails to pay, the CDS provider pays the lender.",
      source: "https://www.investopedia.com/terms/c/creditdefaultswap.asp",
    },
    "what is fraud alert": {
      answer:
        "A fraud alert is a flag on your credit report asking banks to verify your identity before giving new credit in your name.",
      source: "https://www.investopedia.com/terms/f/fraud-alert.asp",
    },
    "what is credit card": {
      answer:
        "A credit card lets you borrow money for purchases. You must pay back within due date or pay interest.",
      source: "https://www.investopedia.com/terms/c/creditcard.asp",
    },
    "what is debit card": {
      answer:
        "A debit card lets you spend money directly from your bank account for purchases or cash withdrawals.",
      source: "https://www.investopedia.com/terms/d/debitcard.asp",
    },
    "what is net banking": {
      answer:
        "Net banking lets you access your bank account online to transfer money, pay bills, and check balance.",
      source: "https://www.investopedia.com/terms/o/onlinebanking.asp",
    },
    "what is upi": {
      answer:
        "UPI (Unified Payments Interface) allows instant money transfer between bank accounts using a mobile app.",
      source: "https://www.npci.org.in/what-we-do/upi",
    },
    "what is mutual fund": {
      answer:
        "A mutual fund collects money from many investors and invests it in stocks, bonds, or other assets.",
      source: "https://www.investopedia.com/terms/m/mutualfund.asp",
    },
    "what is sip": {
      answer:
        "A Systematic Investment Plan (SIP) lets you invest a fixed amount regularly in a mutual fund scheme.",
      source: "https://www.investopedia.com/terms/s/systematicinvestmentplan.asp",
    },
    "what is emi": {
      answer:
        "EMI (Equated Monthly Installment) is the fixed amount you pay every month to repay a loan.",
      source: "https://www.investopedia.com/terms/e/equated_monthly_installment_emi.asp",
    },
    "what is interest rate": {
      answer:
        "An interest rate is the percentage charged by a lender on the money you borrow.",
      source: "https://www.investopedia.com/terms/i/interestrate.asp",
    },
    "what is inflation": {
      answer:
        "Inflation is the rise in prices of goods and services over time, reducing the purchasing power of money.",
      source: "https://www.investopedia.com/terms/i/inflation.asp",
    },
    "what is atm": {
      answer:
        "ATM (Automated Teller Machine) allows you to withdraw or deposit cash and check balance using a card.",
      source: "https://www.investopedia.com/terms/a/atm.asp",
    },
    "what is kyc": {
      answer:
        "KYC (Know Your Customer) is the process where banks verify your identity before opening an account.",
      source: "https://www.investopedia.com/terms/k/know-your-customer-kyc.asp",
    },
    "what is neft": {
      answer:
        "NEFT (National Electronic Funds Transfer) is an Indian payment system to transfer money between banks.",
      source: "https://www.rbi.org.in/scripts/FAQView.aspx?Id=60",
    },
    "what is rtgs": {
      answer:
        "RTGS (Real-Time Gross Settlement) is a system where money is transferred instantly between banks for large amounts.",
      source: "https://www.rbi.org.in/scripts/FAQView.aspx?Id=65",
    },
    "what is imps": {
      answer:
        "IMPS (Immediate Payment Service) allows instant money transfer 24x7 through banks and mobile apps.",
      source: "https://www.npci.org.in/what-we-do/imps-product-overview",
    },
  };

  // Match user's question
  const found = Object.keys(faq).find((q) => userQuestion.includes(q));

  if (found) {
    return res.status(200).json({
      answer: `${faq[found].answer}\n\n(Source: ${faq[found].source})`,
    });
  } else {
    return res.status(200).json({
      answer:
        "Sorry, I don't have an answer for that yet. Please try a different question like 'what is credit card' or 'what is EMI'.",
    });
  }
}
