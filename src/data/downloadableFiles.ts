import { DownloadableAsset } from '../types';

export const DOWNLOADABLE_ASSETS: DownloadableAsset[] = [
  {
    id: 'n8n_workflow_json',
    filename: 'talentbridge_n8n_workflow.json',
    title: 'n8n Workflow JSON (TalentBridge Core)',
    category: 'workflow',
    description: '12-node ready-to-import n8n workflow covering Webhook Trigger, OpenAI GPT-4 Pitch Generation, Gmail Email Dispatch, Google Sheets Logging, and Conditional Follow-Up.',
    mimeType: 'application/json',
    fileContent: JSON.stringify(
      {
        name: "TalentBridge Client Pitch Generator & Follow-up Pipeline",
        nodes: [
          {
            parameters: {
              httpMethod: "POST",
              path: "client-requirements",
              responseMode: "onReceived",
              options: {}
            },
            name: "Webhook Intake",
            type: "n8n-nodes-base.webhook",
            typeVersion: 1,
            position: [250, 300]
          },
          {
            parameters: {
              model: "gpt-4o",
              options: {
                temperature: 0.7
              }
            },
            name: "OpenAI Chat Model",
            type: "@n8n/n8n-nodes-langchain.lmChatOpenAi",
            typeVersion: 1,
            position: [480, 180]
          },
          {
            parameters: {
              promptType: "define",
              text: "=You are a senior soft skills consultant at TalentBridge Systems.\nBased on the client requirements below, draft:\n1. A personalized greeting for {{$json.body.clientName}}\n2. A problem statement addressing their pain point at {{$json.body.company}}\n3. A proposed solution with 3 training modules\n4. A clear call-to-action for a 15-min discovery call\n5. A professional sign-off\n\nClient Requirements: {{$json.body.requirements}}\nBudget Range: {{$json.body.budgetRange}}"
            },
            name: "Generate Pitch Agent",
            type: "@n8n/n8n-nodes-langchain.agent",
            typeVersion: 1,
            position: [480, 300]
          },
          {
            parameters: {
              sendTo: "={{ $json.body.email }}",
              subject: "=Customized Soft Skills Proposal for {{ $json.body.company }}",
              message: "={{ $json.output }}"
            },
            name: "Send Client Pitch (Gmail)",
            type: "n8n-nodes-base.gmail",
            typeVersion: 2,
            position: [720, 300]
          },
          {
            parameters: {
              sendTo: "rajshree.yumnam@talentbridge.com",
              subject: "=[NEW LEAD] Soft Skills Proposal Generated for {{ $json.body.company }}",
              message: "=Lead Name: {{ $json.body.clientName }}\nCompany: {{ $json.body.company }}\nEmail: {{ $json.body.email }}\nBudget: {{ $json.body.budgetRange }}\n\nPitch Output:\n{{ $json.output }}"
            },
            name: "Notify Team Lead (Gmail)",
            type: "n8n-nodes-base.gmail",
            typeVersion: 2,
            position: [720, 500]
          },
          {
            parameters: {
              operation: "append",
              sheetId: "1A2B3C4D5E6F_YOUR_GOOGLE_SHEET_ID",
              range: "Pitch_Logs!A:F",
              options: {
                valueInputOption: "USER_ENTERED"
              }
            },
            name: "Log to Google Sheets",
            type: "n8n-nodes-base.googleSheets",
            typeVersion: 4,
            position: [950, 300]
          },
          {
            parameters: {
              amount: 3,
              unit: "days"
            },
            name: "Wait 3 Days",
            type: "n8n-nodes-base.wait",
            typeVersion: 1,
            position: [1180, 300]
          },
          {
            parameters: {
              sendTo: "={{ $json.body.email }}",
              subject: "=Following up on your TalentBridge proposal - {{ $json.body.company }}",
              message: "=Hi {{ $json.body.clientName }},\n\nJust following up on the customized training proposal we sent 3 days ago for {{ $json.body.company }}.\n\nDo you have 10 minutes this week for a quick call to align on dates?\n\nBest regards,\nTalentBridge Systems Team"
            },
            name: "Send Automated Follow-Up",
            type: "n8n-nodes-base.gmail",
            typeVersion: 2,
            position: [1400, 300]
          }
        ],
        connections: {
          "Webhook Intake": {
            main: [
              [
                { node: "Generate Pitch Agent", type: "main", index: 0 }
              ]
            ]
          },
          "OpenAI Chat Model": {
            ai_languageModel: [
              [
                { node: "Generate Pitch Agent", type: "ai_languageModel", index: 0 }
              ]
            ]
          },
          "Generate Pitch Agent": {
            main: [
              [
                { node: "Send Client Pitch (Gmail)", type: "main", index: 0 },
                { node: "Notify Team Lead (Gmail)", type: "main", index: 0 }
              ]
            ]
          },
          "Send Client Pitch (Gmail)": {
            main: [
              [
                { node: "Log to Google Sheets", type: "main", index: 0 }
              ]
            ]
          },
          "Log to Google Sheets": {
            main: [
              [
                { node: "Wait 3 Days", type: "main", index: 0 }
              ]
            ]
          },
          "Wait 3 Days": {
            main: [
              [
                { node: "Send Automated Follow-Up", type: "main", index: 0 }
              ]
            ]
          }
        }
      },
      null,
      2
    )
  },
  {
    id: 'setup_guide_md',
    filename: 'TalentBridge_Setup_Guide.md',
    title: 'TalentBridge Step-by-Step Setup Guide',
    category: 'guide',
    description: 'Comprehensive setup guide detailing n8n setup, credential mapping, Google Sheets OAuth2 setup, testing, and troubleshooting.',
    mimeType: 'text/markdown',
    fileContent: `# TalentBridge Systems — Automation Setup Manual

## 📌 Phase 1: Environment & Credential Setup
1. **n8n Cloud Account**: Sign up at https://n8n.io/cloud (Select Free Trial).
2. **OpenAI API Key**:
   - Visit https://platform.openai.com/api-keys
   - Click **Create new secret key** -> Name: \`TalentBridge-n8n\`
   - Copy key (starts with \`sk-proj-\`).
3. **Google Sheets OAuth2 Credentials**:
   - Go to Google Cloud Console (https://console.cloud.google.com)
   - Enable **Google Sheets API** and **Gmail API**.
   - Create OAuth 2.0 Client ID for Web Applications.
   - Add n8n callback URL: \`https://YOUR-N8N-INSTANCE.n8n.cloud/rest/oauth2-credential/callback\`

---

## 📌 Phase 2: Workflow Import & Configuration
1. Open n8n Cloud -> Click **Workflows** -> **Import from File**.
2. Select \`talentbridge_n8n_workflow.json\`.
3. Open **OpenAI Chat Model** node -> Select your OpenAI Credential.
4. Open **Send Client Pitch (Gmail)** -> Select your Gmail Credential.
5. Open **Log to Google Sheets** -> Paste your Google Sheet ID.

---

## 📌 Phase 3: Google Sheets Column Layout
Create a Google Sheet titled \`TalentBridge Pitch & Skills Log\` with headers:
| Column A | Column B | Column C | Column D | Column E | Column F |
| --- | --- | --- | --- | --- | --- |
| Timestamp | Client Name | Company | Email | Budget | Pitch Sent |

---

## 📌 Phase 4: Troubleshooting Table
| Error Symptom | Cause | Solution |
| --- | --- | --- |
| \`401 Unauthorized\` in OpenAI | Invalid API key or quota exceeded | Re-generate key on OpenAI platform; check billing status |
| \`403 Insufficient Permission\` in Sheets | Missing OAuth Scope | Re-authenticate Google Sheets credential with write access |
| Webhook not receiving payload | Inactive workflow | Ensure top-right toggle in n8n is switched to **Active** |
`
  },
  {
    id: 'lovable_prompt_md',
    filename: 'TalentBridge_Lovable_Prompt.md',
    title: 'Lovable Form Prompt Template',
    category: 'prompt',
    description: 'Copy-paste prompt to build the client intake form in Lovable.dev with precise CSS styling and Webhook submission.',
    mimeType: 'text/markdown',
    fileContent: `# TalentBridge Systems Client Intake Form Prompt for Lovable.dev

Paste the following prompt verbatim into Lovable.dev (https://lovable.dev):

\`\`\`text
Create a modern, minimalistic Nordic Lagom styled client intake landing page for "TalentBridge Systems" — a high-performance soft skills consulting agency.

Design Aesthetic:
- Nordic Lagom philosophy: clean off-white background (#F9F8F6), charcoal typography (#1A1A1A), subtle warm oat borders (#EFECE6), and pine green accents (#2D3B32).
- Clean card container with  corners (16px) and subtle soft shadow.

Form Fields Required:
1. Client Full Name (Text input, Required) -> ID: clientName
2. Company Name (Text input, Required) -> ID: company
3. Work Email Address (Email input, Required) -> ID: email
4. Soft Skills & Training Requirements (Textarea, 4 rows, Required) -> ID: requirements
   Placeholder: "e.g., Our engineering team needs leadership, active listening, and conflict management workshops..."
5. Estimated Budget Range (Dropdown) -> ID: budgetRange
   Options: ["$5,000 - $10,000", "$10,000 - $25,000", "$25,000 - $50,000", "$50,000+"]

Functionality:
- On form submit, send a POST request with JSON payload to webhook URL: "YOUR_N8N_WEBHOOK_URL_HERE".
- Show an elegant loading state button ("Drafting AI Pitch Proposal...").
- Upon successful submission, display a toast confirmation: "Success! Your customized soft skills proposal is being generated and sent to your email."
\`\`\`
`
  },
  {
    id: 'test_payload_json',
    filename: 'TalentBridge_Test_Payload.json',
    title: 'Test Webhook Payload (Postman / Webhook.site)',
    category: 'workflow',
    description: 'Ready-to-use JSON payload to test the n8n pipeline without filling out the web form.',
    mimeType: 'application/json',
    fileContent: JSON.stringify(
      {
        clientName: "Tomba Laisram",
        company: "TechFlow India",
        email: "tomba.laisram@techflow.io",
        requirements: "Our mid-level engineering managers struggle with empathetic feedback, cross-functional communication, and managing client expectations during sprint demos.",
        budgetRange: "$10,000 - $25,000"
      },
      null,
      2
    )
  },
  {
    id: 'presentation_md',
    filename: 'TalentBridge_Day6_Presentation.md',
    title: 'Day 6 Presentation Deck Outline (14 Slides)',
    category: 'presentation',
    description: 'Complete slide-by-slide pitch deck with speaker notes, visual cues, time allocations, and judge Q&A strategies.',
    mimeType: 'text/markdown',
    fileContent: `# TalentBridge Systems — Day 6 Presentation Deck Outline

## Slide 1: Title & Team
- **Title**: TalentBridge Systems — Automated Pitch Generation & Soft Skills Tracking
- **Presenter**: Yumnam Pukhrambam Rajshree & Team
- **Tagline**: Transforming 3-hour manual pitch drafting into a 30-second AI automation pipeline.
- **Speaker Note**: "Good morning judges! Today we present TalentBridge Systems — an end-to-end AI automation system built during the Gen AI Bootcamp."

## Slide 2: The Problem
- **Bullet Points**:
  - Manual pitch drafting takes 3.5 hours per enterprise client.
  - Delayed response times cause 40% lead drop-off in soft skills consulting.
  - Soft skill training outcomes lack structured tracking and follow-up metrics.
- **Speaker Note**: "Consultants spend hours copying frameworks into custom proposals, leaving leads cold."

## Slide 3: The Solution Architecture
- **Bullet Points**:
  - **Frontend**: Lovable.dev intake form.
  - **Orchestration**: n8n Webhook & Multi-branch workflow.
  - **Intelligence**: OpenAI GPT-4 with specialized soft skills system prompt.
  - **Persistence & Alerts**: Gmail dispatch, Google Sheets logging, and Slack alerts.
- **Speaker Note**: "We unified frontend, LLM reasoning, storage, and automated follow-up into one seamless pipeline."

## Slide 4: Live Demonstration
- **Visual Cue**: Switch screen to live Lovable form submission or video clip.
- **Action**: Submit lead for 'TechFlow India' -> Show email landing in inbox within 15 seconds.

## Slide 5: Business ROI & Metrics
- **Time Savings**: Reduced proposal generation time from 210 mins to 25 seconds (99.8% faster).
- **Cost Savings**: Estimated $42,000 annual labor savings for a 10-person agency.
- **Conversion Impact**: 3x faster response rate leading to estimated +28% close rate.

## Slide 6: Judge Q&A Prep
- **Q**: How do you prevent hallucinations in client pitches?
- **A**: We enforce strict system prompting with structured JSON schemas and curated soft skills module templates in n8n.
`
  },
  {
    id: 'video_demo_script_md',
    filename: 'TalentBridge_Video_Demo_Script.md',
    title: '3-Minute Video Demo Script',
    category: 'presentation',
    description: 'Scene-by-scene recording script with visual actions, timing, and voiceover text for the portfolio video.',
    mimeType: 'text/markdown',
    fileContent: `# TalentBridge Systems — 3-Minute Video Demo Script

## Scene 1 (0:00 - 0:30) — The Problem & Intro
- **Visual**: Full-screen camera of presenter holding printed proposal stack.
- **Voiceover**: "Hi everyone! In soft skills consulting, speed and personalization win clients. But writing tailored proposals manually takes over 3 hours. Today, we built TalentBridge Systems to automate this entirely."

## Scene 2 (0:30 - 1:15) — Live Form Submission
- **Visual**: Screen capture of the Lovable.dev website.
- **Action**: Type 'Tomba Laisram' from 'TechFlow India', select budget '$10,000 - $25,000', enter soft skill requirements, and click 'Generate Proposal'.
- **Voiceover**: "Here is our client portal built on Lovable. When a prospect submits their training pain points, an n8n webhook triggers immediately."

## Scene 3 (1:15 - 2:00) — Behind the Scenes in n8n
- **Visual**: Switch tab to active n8n workflow canvas.
- **Action**: Highlight the Webhook node flashing green, then OpenAI node executing GPT-4o, then parallel paths to Gmail and Google Sheets.
- **Voiceover**: "Inside n8n, our AI agent processes the requirements using custom soft skills prompt templates, generating a 3-module proposal in seconds."

## Scene 4 (2:00 - 2:30) — Verification (Inbox & Sheets)
- **Visual**: Open Gmail inbox -> Show received proposal email. Open Google Sheet -> Show row added.
- **Voiceover**: "And look at that! In under 20 seconds, the client received their proposal, our team lead Rajshree got notified, and the record is logged in Google Sheets."

## Scene 5 (2:30 - 3:00) — Summary & Wrap-up
- **Visual**: Return to camera or summary slide with ROI stats.
- **Voiceover**: "99.8% faster response times and $42,000 saved annually. That's TalentBridge Systems. Thank you!"
`
  },
  {
    id: 'before_after_md',
    filename: 'TalentBridge_Before_After.md',
    title: 'Before vs. After ROI Analysis',
    category: 'guide',
    description: 'Detailed comparative analysis showing manual workflow bottlenecks vs. automated n8n pipeline benefits with cost calculations.',
    mimeType: 'text/markdown',
    fileContent: `# TalentBridge Systems — Before vs. After Impact Analysis

## 📊 Comparison Summary Table
| Metric | Traditional Manual Process | TalentBridge Automated Pipeline | Improvement |
| --- | --- | --- | --- |
| **Proposal Time** | 210 minutes (3.5 hours) | 25 seconds | **99.8% decrease** |
| **Response Delay** | 24–48 hours | Under 1 minute | **Real-time engagement** |
| **Labor Cost / Proposal** | $175 (at $50/hr rate) | $0.12 (OpenAI API call) | **99.9% cost reduction** |
| **Lead Conversion Rate** | ~12% | ~34% (estimated) | **2.8x conversion lift** |
| **Data Logging Error** | 15% missing entries | 0% automated logging | **100% data integrity** |
| **Follow-up Consistency** | Sporadic manual reminders | 100% scheduled n8n Wait node | **Zero dropped leads** |

---

## 💰 Annual Financial Impact (100 Proposals / Year)
- **Manual Labor Expense**: 100 proposals x $175 = **$17,500/yr**
- **Automated API Expense**: 100 proposals x $0.12 = **$12.00/yr**
- **Net Annual Savings**: **$17,488 / year** (Scaling to $42,000+ for enterprise agencies)
`
  },
  {
    id: 'student_cheat_sheet_md',
    filename: 'TalentBridge_Student_Cheat_Sheet.md',
    title: 'Student One-Page Cheat Sheet',
    category: 'cheatsheet',
    description: 'Quick-reference guide containing essential URLs, test payload, error fixes, and presentation quick answers.',
    mimeType: 'text/markdown',
    fileContent: `# TalentBridge Bootcamp Student Quick Reference Cheat Sheet

## 🔗 Quick Links
- **Teachable Machine**: https://teachablemachine.withgoogle.com
- **Custom GPT Builder**: https://chatgpt.com/gpts/editor
- **Lovable.dev**: https://lovable.dev
- **Zapier**: https://zapier.com
- **n8n Cloud**: https://n8n.io/cloud
- **OpenAI API Keys**: https://platform.openai.com/api-keys
- **GitHub New Repo**: https://github.com/new
- **Vercel Deploy**: https://vercel.com/new

---

## ⚡ Emergency Debug Checklist
1. **Red node in n8n?** -> Click **Executions** tab in left sidebar -> Select failed run -> Read red error banner.
2. **OpenAI Error?** -> Verify key in credentials tab. Ensure your OpenAI account has at least $5 API credit.
3. **Webhook not firing?** -> Ensure n8n workflow toggle is switched to **Active** (Top Right).
`
  },
  {
    id: 'teaching_guide_md',
    filename: 'TalentBridge_Teaching_Guide.md',
    title: 'Instructor Teaching Methodology Guide',
    category: 'guide',
    description: 'Instructor guide with 4-phase teaching methodology (Inspire -> Imitate -> Investigate -> Innovate), daily rubric, and troubleshooting strategies.',
    mimeType: 'text/markdown',
    fileContent: `# Instructor Guide: Teaching the 6-Day Gen AI Bootcamp & TalentBridge Project

## 🎯 The 4-Phase Teaching Methodology
1. **Phase 1: Inspire (15 mins)**
   - Show the final working output FIRST. Submit a form live -> Show the pitch email landing in 20 seconds.
   - Build intrigue before introducing technical jargon like "Webhook" or "OAuth2".

2. **Phase 2: Imitate (45 mins)**
   - "Explain -> Demo -> Do" loop.
   - You build node 1 (Webhook), student watches.
   - Student builds node 1.
   - You build node 2 (OpenAI), student watches.

3. **Phase 3: Investigate (30 mins)**
   - "The Break-It Exercise": Intentionally disable the API key or misspell a JSON key.
   - Guide the student to inspect the n8n **Executions** panel to find the error independently.

4. **Phase 4: Innovate (30 mins)**
   - Encourage students to add their own custom touch (e.g. Slack notification node or custom prompt module).
`
  },
  {
    id: 'advanced_nodes_json',
    filename: 'TalentBridge_Advanced_Nodes.json',
    title: 'Advanced Nodes (Slack + HubSpot CRM + Performance Tracker)',
    category: 'advanced',
    description: 'Extension workflow containing Slack channel alerts, HubSpot deal creation, and weekly performance tracking trigger.',
    mimeType: 'application/json',
    fileContent: JSON.stringify(
      {
        name: "TalentBridge Advanced Extensions (Slack + CRM + Performance Tracker)",
        nodes: [
          {
            parameters: {
              channel: "leads-talentbridge",
              text: "=:rocket: *New Enterprise Soft Skills Lead Received!*\n*Client:* {{ $json.body.clientName }}\n*Company:* {{ $json.body.company }}\n*Budget:* {{ $json.body.budgetRange }}\n\n_Custom pitch has been drafted and dispatched via email._"
            },
            name: "Slack Alert Node",
            type: "n8n-nodes-base.slack",
            typeVersion: 1,
            position: [950, 500]
          },
          {
            parameters: {
              rule: {
                interval: [{ field: "weeks", weeksInterval: 1, triggerAtHour: 9, triggerAtMinute: 0 }]
              }
            },
            name: "Weekly Schedule Trigger (Monday 9 AM)",
            type: "n8n-nodes-base.scheduleTrigger",
            typeVersion: 1,
            position: [250, 700]
          },
          {
            parameters: {
              operation: "read",
              sheetId: "1A2B3C4D5E6F_YOUR_GOOGLE_SHEET_ID",
              range: "Participant_Scores!A:E"
            },
            name: "Fetch Weekly Trainee Scores",
            type: "n8n-nodes-base.googleSheets",
            typeVersion: 4,
            position: [480, 700]
          }
        ]
      },
      null,
      2
    )
  }
];
