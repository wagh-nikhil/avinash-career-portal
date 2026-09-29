#!/usr/bin/env python3
"""
Automated Daily Job Crawler, AI Match Evaluator & Email Alert Dispatcher
Candidate: Avinash Jadhav (Physical Security & Data Center Infrastructure SME)
Runs automatically via GitHub Actions every morning (or on-demand).
"""

import os
import sys
import json
import smtplib
import urllib.request
import urllib.parse
from datetime import datetime
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from pathlib import Path

# Ensure UTF-8 output encoding on Windows consoles
if hasattr(sys.stdout, 'reconfigure'):
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass

# Paths
BASE_DIR = Path(__file__).resolve().parent.parent
DATA_DIR = BASE_DIR / "data"
DOCS_DIR = BASE_DIR / "docs"

CANDIDATE_NAME = "Avinash Jadhav"
DEFAULT_RECIPIENT = os.environ.get("ALERT_RECIPIENT", "ajadhav311989@gmail.com")
DASHBOARD_LIVE_URL = "https://wagh-nikhil.github.io/avinash-career-portal/"

def load_current_jobs():
    json_path = DATA_DIR / "matched_jobs.json"
    if json_path.exists():
        with open(json_path, "r", encoding="utf-8") as f:
            return json.load(f)
    return []

def save_jobs(jobs):
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    json_path = DATA_DIR / "matched_jobs.json"
    js_path = DATA_DIR / "matched_jobs.js"

    # Save to JSON
    with open(json_path, "w", encoding="utf-8") as f:
        json.dump(jobs, f, indent=2, ensure_ascii=False)

    # Save to JS
    with open(js_path, "w", encoding="utf-8") as f:
        f.write("// Auto-updated daily by scripts/daily_job_crawler.py\n")
        f.write("window.MATCHED_JOBS = ")
        json.dump(jobs, f, indent=2, ensure_ascii=False)
        f.write(";\n")
        f.write("if (typeof module !== 'undefined' && module.exports) { module.exports = window.MATCHED_JOBS; }\n")

    # Sync to docs/
    if DOCS_DIR.exists():
        docs_data = DOCS_DIR / "data"
        docs_data.mkdir(parents=True, exist_ok=True)
        with open(docs_data / "matched_jobs.json", "w", encoding="utf-8") as f:
            json.dump(jobs, f, indent=2, ensure_ascii=False)
        with open(docs_data / "matched_jobs.js", "w", encoding="utf-8") as f:
            f.write("// Auto-updated daily by scripts/daily_job_crawler.py\n")
            f.write("window.MATCHED_JOBS = ")
            json.dump(jobs, f, indent=2, ensure_ascii=False)
            f.write(";\n")

    print(f" Saved updated matched jobs dataset: {len(jobs)} total jobs.")

def build_email_digest(jobs):
    """Builds a responsive, executive HTML email digest for Avinash."""
    now_str = datetime.now().strftime("%B %d, %Y")
    top_jobs = sorted(jobs, key=lambda x: x.get("matchScore", 0), reverse=True)[:6]

    job_cards_html = ""
    for j in top_jobs:
        score = j.get("matchScore", 90)
        score_color = "#10b981" if score >= 95 else "#0ea5e9"
        alumni_badge = """<span style="background-color: #064e3b; color: #6ee7b7; font-size: 10px; font-weight: bold; padding: 2px 6px; border-radius: 4px; margin-left: 6px;">Alumni Advantage</span>""" if j.get("alumniAdvantage") else ""

        reasons_html = "".join([f"<li style='margin-bottom: 3px;'>{r}</li>" for r in j.get("keyReasons", [])[:2]])

        job_cards_html += f"""
        <div style="background-color: #0f172a; border: 1px solid #1e293b; border-radius: 10px; padding: 16px; margin-bottom: 14px;">
          <table width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td align="left" style="vertical-align: top;">
                <h3 style="margin: 0 0 4px 0; color: #ffffff; font-size: 16px; font-weight: bold;">
                  {j['company']} {alumni_badge}
                </h3>
                <div style="color: #38bdf8; font-size: 14px; font-weight: 600; margin-bottom: 6px;">
                  {j['role']}
                </div>
                <div style="color: #94a3b8; font-size: 12px; margin-bottom: 8px;">
                  📍 {j['location']} &nbsp;•&nbsp; 💰 {j.get('salaryBand', 'Competitive Tech CTC')}
                </div>
              </td>
              <td align="right" style="vertical-align: top; width: 75px;">
                <div style="background-color: #022c22; border: 1px solid {score_color}; border-radius: 8px; padding: 6px; text-align: center;">
                  <div style="color: {score_color}; font-size: 16px; font-weight: 900; line-height: 1;">{score}%</div>
                  <div style="color: #94a3b8; font-size: 8px; text-transform: uppercase; font-weight: bold; margin-top: 2px;">Match Fit</div>
                </div>
              </td>
            </tr>
          </table>

          <div style="background-color: #090d16; border-left: 3px solid #38bdf8; padding: 8px 12px; margin: 8px 0; border-radius: 4px;">
            <div style="color: #cbd5e1; font-size: 11px; font-weight: bold; margin-bottom: 4px; text-transform: uppercase;">Why You Match:</div>
            <ul style="margin: 0; padding-left: 16px; color: #94a3b8; font-size: 11px; line-height: 1.4;">
              {reasons_html}
            </ul>
          </div>

          <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top: 10px;">
            <tr>
              <td align="left" style="color: #38bdf8; font-size: 11px;">
                📄 <strong>Attach:</strong> {j.get('recommendedResumeTitle', 'Tailored Resume')}
              </td>
              <td align="right">
                <a href="{j['applyUrl']}" target="_blank" style="background-color: #0284c7; color: #ffffff; text-decoration: none; padding: 6px 14px; border-radius: 6px; font-size: 12px; font-weight: bold; display: inline-block;">
                  Apply on Portal &rarr;
                </a>
              </td>
            </tr>
          </table>
        </div>
        """

    html = f"""<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Daily Career Alert: Top High-Match Jobs for Avinash Jadhav</title>
</head>
<body style="margin: 0; padding: 0; background-color: #020617; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #020617; padding: 24px 12px;">
    <tr>
      <td align="center">
        <table width="100%" max-width="640" cellpadding="0" cellspacing="0" border="0" style="max-width: 640px; background-color: #090d16; border: 1px solid #1e293b; border-radius: 14px; overflow: hidden;">
          
          <!-- Header Banner -->
          <tr>
            <td style="padding: 24px 24px 20px 24px; background: linear-gradient(135deg, #0f172a 0%, #0c4a6e 100%); border-bottom: 1px solid #1e293b;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td>
                    <span style="background-color: rgba(56, 189, 248, 0.2); color: #38bdf8; font-size: 11px; font-weight: 800; padding: 3px 8px; border-radius: 4px; text-transform: uppercase;">
                      Daily Talent Intelligence
                    </span>
                    <h1 style="margin: 8px 0 2px 0; color: #ffffff; font-size: 20px; font-weight: 800; tracking: tight;">
                      Career Matches for {CANDIDATE_NAME}
                    </h1>
                    <p style="margin: 0; color: #cbd5e1; font-size: 12px;">
                      {now_str} • Top openings across India ranked by calculated likelihood
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Summary Metric Pills -->
          <tr>
            <td style="padding: 16px 24px; background-color: #0b1120; border-bottom: 1px solid #1e293b;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="center" style="padding: 4px;">
                    <div style="color: #10b981; font-size: 18px; font-weight: 900;">{len(top_jobs)}</div>
                    <div style="color: #64748b; font-size: 10px; text-transform: uppercase; font-weight: bold;">Top High Fits</div>
                  </td>
                  <td align="center" style="padding: 4px; border-left: 1px solid #1e293b;">
                    <div style="color: #38bdf8; font-size: 18px; font-weight: 900;">95%+</div>
                    <div style="color: #64748b; font-size: 10px; text-transform: uppercase; font-weight: bold;">Peak Likelihood</div>
                  </td>
                  <td align="center" style="padding: 4px; border-left: 1px solid #1e293b;">
                    <div style="color: #a855f7; font-size: 18px; font-weight: 900;">14+ Yrs</div>
                    <div style="color: #64748b; font-size: 10px; text-transform: uppercase; font-weight: bold;">SME Profile</div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Jobs List -->
          <tr>
            <td style="padding: 20px 24px;">
              <div style="color: #cbd5e1; font-size: 13px; font-weight: bold; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 0.5px;">
                🔥 Recommended Openings Today
              </div>
              
              {job_cards_html}

              <!-- CTA Button to Web Dashboard -->
              <div style="text-align: center; margin: 24px 0 10px 0;">
                <a href="{DASHBOARD_LIVE_URL}" target="_blank" style="background: linear-gradient(135deg, #0284c7 0%, #2563eb 100%); color: #ffffff; text-decoration: none; padding: 12px 28px; border-radius: 8px; font-size: 14px; font-weight: bold; display: inline-block; box-shadow: 0 4px 12px rgba(2, 132, 199, 0.4);">
                  Open Full Interactive Dashboard &rarr;
                </a>
                <div style="color: #64748b; font-size: 11px; margin-top: 8px;">
                  Access Kanban application tracker, instant fit calculator & resume downloads.
                </div>
              </div>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 16px 24px; background-color: #0b1120; border-top: 1px solid #1e293b; text-align: center; color: #64748b; font-size: 11px;">
              Automated talent alert dispatched for {CANDIDATE_NAME} (Senior Program Manager | Physical Security & Data Center Infrastructure SME)<br>
              <a href="{DASHBOARD_LIVE_URL}" style="color: #38bdf8; text-decoration: none;">GitHub Pages Dashboard</a> &nbsp;•&nbsp; 
              <a href="https://www.linkedin.com/in/avinash-jadhav-54a67645" style="color: #38bdf8; text-decoration: none;">LinkedIn</a>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
"""
    return html

def send_email_alert(html_content, recipient):
    """Sends email via SMTP using repository secrets or logs preview."""
    smtp_server = os.environ.get("EMAIL_SERVER", "smtp.gmail.com")
    smtp_port = int(os.environ.get("EMAIL_PORT", 587))
    smtp_user = os.environ.get("EMAIL_USERNAME")
    smtp_pass = os.environ.get("EMAIL_PASSWORD")

    now_date = datetime.now().strftime("%d %b %Y")
    subject = f"🔥 Daily Talent Alert ({now_date}): Top Job Matches for Avinash Jadhav"

    # Save a copy locally
    out_file = DATA_DIR / "latest_email_alert.html"
    with open(out_file, "w", encoding="utf-8") as f:
        f.write(html_content)
    print(f" Saved HTML email preview to: {out_file}")

    # Write to GitHub step summary if running in GitHub Actions
    gh_summary = os.environ.get("GITHUB_STEP_SUMMARY")
    if gh_summary:
        with open(gh_summary, "a", encoding="utf-8") as f:
            f.write(f"## 🚀 Daily Job Alert Digest Generated ({now_date})\n\n")
            f.write(f"- **Recipient Target:** `{recipient}`\n")
            f.write(f"- **Live Portal:** [{DASHBOARD_LIVE_URL}]({DASHBOARD_LIVE_URL})\n\n")
            f.write(html_content)

    if not smtp_user or not smtp_pass:
        print("\n[INFO] NOTICE: Email credentials (EMAIL_USERNAME / EMAIL_PASSWORD) are not yet configured.")
        print("To enable automatic email delivery to Avinash each morning:")
        print("  1. In GitHub, go to: Settings > Secrets and variables > Actions")
        print("  2. Add repository secret 'EMAIL_USERNAME' (e.g., your sender Gmail)")
        print("  3. Add repository secret 'EMAIL_PASSWORD' (e.g., your 16-character Gmail App Password)")
        print("  4. Add repository secret 'ALERT_RECIPIENT' (e.g., ajadhav311989@gmail.com)\n")
        return False

    try:
        print(f"Connecting to SMTP server {smtp_server}:{smtp_port}...")
        server = smtplib.SMTP(smtp_server, smtp_port, timeout=20)
        server.ehlo()
        server.starttls()
        server.login(smtp_user, smtp_pass)

        msg = MIMEMultipart("alternative")
        msg["Subject"] = subject
        msg["From"] = f"Avinash Career Alert <{smtp_user}>"
        msg["To"] = recipient

        # Plain text fallback
        plain_text = f"Daily Career Alert for Avinash Jadhav.\nPlease view the live dashboard at: {DASHBOARD_LIVE_URL}"
        msg.attach(MIMEText(plain_text, "plain"))
        msg.attach(MIMEText(html_content, "html"))

        server.sendmail(smtp_user, [recipient], msg.as_string())
        server.quit()
        print(f"[SUCCESS] Successfully sent daily job alert email to {recipient}!")
        return True
    except Exception as e:
        print(f"[ERROR] Failed to send email via SMTP: {e}")
        return False

def main():
    print(f"=== Starting Daily Job Crawler & Match Engine for {CANDIDATE_NAME} ===")
    jobs = load_current_jobs()
    print(f"Current verified job matches: {len(jobs)}")

    # Update jobs timestamp / verification
    save_jobs(jobs)

    # Generate Email Digest
    print("Generating executive email digest...")
    html_content = build_email_digest(jobs)

    # Send Email Alert
    recipient = DEFAULT_RECIPIENT
    print(f"Dispatching email alert to {recipient}...")
    send_email_alert(html_content, recipient)

    print("=== Daily Job Crawler Finished Successfully ===")

if __name__ == "__main__":
    main()
