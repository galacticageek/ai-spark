import { BootcampModule, WorkflowNodeData, PresentationSlide } from '../types';

export const BOOTCAMP_MODULES: BootcampModule[] = [
  {
    id: 'day3',
    dayNumber: 3,
    title: 'Data Science, Teachable Machine & Custom GPTs',
    subtitle: 'No-Code AI Model Training & Custom Knowledge Base Assistants',
    description: 'Learn how to visually train vision machine learning models in your browser and build a custom GPT soft skills coaching assistant without writing code.',
    estimatedTime: '2.5 Hours',
    status: 'Completed',
    iconName: 'BrainCircuit',
    keyTakeaways: [
      'Train an image recognition model using Google Teachable Machine with webcam samples',
      'Export ML models to Tensorflow.js for web deployment',
      'Configure a Custom GPT with custom instructions, soft skills PDF frameworks, and action schemas'
    ],
    steps: [
      {
        id: 'd3-step1',
        stepNumber: 1,
        title: 'Open Teachable Machine & Create Image Project',
        description: 'Navigate to Google Teachable Machine and launch a standard image classification project.',
        clickPath: 'Browser -> teachablemachine.withgoogle.com -> Click "Get Started" -> Select "Image Project" -> Choose "Standard Image Model"',
        exactUrl: 'https://teachablemachine.withgoogle.com',
        interactiveType: 'teachable',
        tip: 'Ensure your webcam permissions are allowed when prompted by your browser.'
      },
      {
        id: 'd3-step2',
        stepNumber: 2,
        title: 'Capture Training Image Classes',
        description: 'Label Class 1 as "Confident Body Language" and Class 2 as "Nervous / Unprepared". Capture 50+ image frames for each gesture.',
        clickPath: 'Rename Class 1 -> Click "Webcam" -> Hold "Hold to Record" button for 50+ samples -> Add Class 2 -> Hold Record for 50+ samples',
        tip: 'Ensure varied lighting and small angle shifts for robust ML model accuracy.'
      },
      {
        id: 'd3-step3',
        stepNumber: 3,
        title: 'Train & Test the Model in Real-Time',
        description: 'Click "Train Model" and observe the live preview. Test gestures in front of your camera to verify confidence percentages.',
        clickPath: 'Click "Train Model" -> Wait 15-30s for Epochs -> Toggle Preview "ON" -> Perform gestures to test prediction bars',
        tip: 'Do not switch browser tabs during training or the background thread will pause.'
      },
      {
        id: 'd3-step4',
        stepNumber: 4,
        title: 'Export Tensorflow.js Model Link',
        description: 'Export your trained model as a shareable cloud link or downloadable code snippet.',
        clickPath: 'Click "Export Model" -> Select "Tensorflow.js" -> Click "Upload (shareable link)" -> Copy link',
        codeSnippet: `<script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@latest/dist/tf.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@teachablemachine/image@latest/dist/teachablemachine-image.min.js"></script>`,
        codeLanguage: 'html'
      },
      {
        id: 'd3-step5',
        stepNumber: 5,
        title: 'Build Custom Soft Skills Coach GPT',
        description: 'Go to ChatGPT GPT Editor and configure a custom assistant tailored to soft skills coaching for TalentBridge.',
        clickPath: 'Go to chatgpt.com/gpts/editor -> Click "Create a GPT" -> Go to "Configure" tab -> Upload Soft Skills Framework PDF',
        exactUrl: 'https://chatgpt.com/gpts/editor',
        interactiveType: 'gpt',
        codeSnippet: `System Instructions:
You are an expert Soft Skills Coach at TalentBridge Systems. Your goal is to analyze client requirements and trainee performance feedback.

Guidelines:
1. Provide constructive, empathetic evaluation on communication, leadership, and emotional intelligence.
2. Structure recommendations into 3 actionable training modules.
3. Tone: Professional, encouraging, and authoritative.`,
        codeLanguage: 'text'
      }
    ],
    quiz: {
      question: 'Why is it important to capture at least 50+ varied sample frames per class in Teachable Machine?',
      options: [
        'To increase the file size of the browser page',
        'To prevent overfitting and allow the neural network to generalize across different lighting/angles',
        'Because TensorFlow requires a minimum of 1,000 images to start',
        'It is purely optional and has no effect on accuracy'
      ],
      correctIndex: 1,
      explanation: 'Varied training data helps the ML model generalize better so it can accurately recognize gestures in different environments.'
    }
  },
  {
    id: 'day4',
    dayNumber: 4,
    title: 'Website Creation (Lovable) & Zapier Automation',
    subtitle: 'Prompt-Based Full Landing Pages & Instant Event Webhooks',
    description: 'Build an elegant client-facing web page using AI prompt site builder Lovable.dev, then hook submission events up to automated Zapier agent actions.',
    estimatedTime: '3 Hours',
    status: 'Completed',
    iconName: 'LayoutGrid',
    keyTakeaways: [
      'Prompt Lovable.dev to create responsive landing pages with custom form fields',
      'Connect web forms directly to POST HTTP endpoints',
      'Build Zapier Zaps triggered by Webhooks to auto-notify teams on Gmail/Slack'
    ],
    steps: [
      {
        id: 'd4-step1',
        stepNumber: 1,
        title: 'Open Lovable.dev & Start New Project',
        description: 'Launch Lovable.dev and create a clean, modern soft skills landing page using natural language prompts.',
        clickPath: 'Go to lovable.dev -> Click "New Project" -> Select "Build from scratch"',
        exactUrl: 'https://lovable.dev',
        interactiveType: 'lovable'
      },
      {
        id: 'd4-step2',
        stepNumber: 2,
        title: 'Paste TalentBridge Form Generation Prompt',
        description: 'Use our optimized prompt to generate the intake form containing clientName, company, email, requirements, and budget fields.',
        clickPath: 'In Lovable chat box -> Paste Prompt -> Click "Generate" -> Preview live design in canvas',
        interactiveType: 'copy_prompt',
        codeSnippet: `Create a modern Nordic Lagom client intake landing page for "TalentBridge Systems". 
Include fields for Client Name, Company, Work Email, Soft Skill Requirements, and Budget Range. 
Add a "Generate Proposal" button that POSTs JSON data to a webhook endpoint.`,
        codeLanguage: 'text'
      },
      {
        id: 'd4-step3',
        stepNumber: 3,
        title: 'Configure Webhook Submission Endpoint',
        description: 'Update the form submit handler in Lovable to send data to your automation webhook.',
        clickPath: 'Click Form Component -> Right Panel "Settings" -> Action URL -> Paste Webhook URL',
        tip: 'You can use a temporary catch hook on webhook.site or Zapier to inspect incoming JSON keys.'
      },
      {
        id: 'd4-step4',
        stepNumber: 4,
        title: 'Set up Zapier Auto-Responder Zap',
        description: 'Create a Zap with Webhooks by Zapier as trigger and Gmail/Slack as automated action.',
        clickPath: 'zapier.com -> Click "Create Zap" -> Trigger: "Webhooks by Zapier (Catch Hook)" -> Copy URL -> Action: Gmail "Send Email"',
        exactUrl: 'https://zapier.com',
        interactiveType: 'webhook'
      }
    ],
    quiz: {
      question: 'What is the primary advantage of connecting a Lovable web form to a Webhook instead of static email storage?',
      options: [
        'It makes the website load slower',
        'It allows real-time execution of downstream AI workflows, databases, and instant notification sequences',
        'Webhooks are the only way to style CSS buttons',
        'It eliminates the need for HTML'
      ],
      correctIndex: 1,
      explanation: 'Webhooks provide an instant, programmable data bridge that triggers AI logic, CRM updates, and email generation automatically.'
    }
  },
  {
    id: 'day5',
    dayNumber: 5,
    title: 'Core Project Stack: n8n + AI Agent + APIs (TalentBridge #13)',
    subtitle: 'Automated Client Pitch Generation & Soft Skills Tracking',
    description: 'The heartbeat of the bootcamp. Build an enterprise n8n workflow that ingests form requests, executes GPT-4 pitch drafting, dispatches emails, logs to Google Sheets, and schedules automated follow-up sequences.',
    estimatedTime: '4 Hours',
    status: 'In progress',
    iconName: 'Workflow',
    keyTakeaways: [
      'Set up n8n Webhook trigger nodes with POST method parameters',
      'Configure OpenAI Chat Model with system prompts and variable placeholders',
      'Parallelize Gmail notifications to clients and internal team leads',
      'Append records to Google Sheets via OAuth2 authentication',
      'Implement non-blocking Wait nodes for multi-day automated email follow-up sequences'
    ],
    steps: [
      {
        id: 'd5-step1',
        stepNumber: 1,
        title: 'Create n8n Cloud Account & New Workflow',
        description: 'Sign up for n8n Cloud and create a workflow named "TalentBridge-Pitch-Generator".',
        clickPath: 'Go to n8n.io/cloud -> Log in -> Workflows -> Click "+ Add Workflow" -> Rename to "TalentBridge-Pitch-Generator"',
        exactUrl: 'https://n8n.io/cloud',
        interactiveType: 'webhook'
      },
      {
        id: 'd5-step2',
        stepNumber: 2,
        title: 'Configure Webhook Trigger Node',
        description: 'Add a Webhook node set to POST method and test receiving raw JSON payloads.',
        clickPath: 'Click "+" on canvas -> Search "Webhook" -> Set HTTP Method: POST -> Path: "client-requirements" -> Copy Test Webhook URL',
        codeSnippet: `URL Path: client-requirements
HTTP Method: POST
Response Mode: On Received`,
        codeLanguage: 'text'
      },
      {
        id: 'd5-step3',
        stepNumber: 3,
        title: 'Attach OpenAI Chat Model & System Prompt Agent',
        description: 'Add an OpenAI Chat Model node and Agent node. Pass prompt templates with client variable parameters.',
        clickPath: 'Click "+" after Webhook -> Add "OpenAI Chat Model" -> Connect API Key -> Add "Agent" -> Write System Prompt',
        codeSnippet: `Prompt Template:
You are a senior soft skills consultant at TalentBridge Systems.
Based on the client requirements below, draft a 3-module proposal for {{ $json.body.company }}.

Client: {{ $json.body.clientName }}
Requirements: {{ $json.body.requirements }}
Budget: {{ $json.body.budgetRange }}`,
        codeLanguage: 'text',
        interactiveType: 'gpt'
      },
      {
        id: 'd5-step4',
        stepNumber: 4,
        title: 'Connect Dual Gmail Email Dispatch Nodes',
        description: 'Send personalized proposals to client emails and instant lead notification summaries to Team Lead Yumnam Pukhrambam Rajshree.',
        clickPath: 'Click "+" after OpenAI Agent -> Add "Gmail" node -> Operation: Send Email -> To: {{ $json.body.email }} -> Subject: "Your Soft Skills Proposal"',
        interactiveType: 'sheets'
      },
      {
        id: 'd5-step5',
        stepNumber: 5,
        title: 'Append Entry to Google Sheets & Activate Wait Node',
        description: 'Log lead details into Google Sheets, then add a 3-day Wait node for the follow-up sequence.',
        clickPath: 'Add "Google Sheets" node -> Operation: Append -> Sheet ID -> Map columns -> Add "Wait" node -> Duration: 3 Days -> Add Follow-up Gmail node',
        interactiveType: 'sheets'
      }
    ],
    quiz: {
      question: 'In n8n, how do you reference data sent from a Webhook POST body in a downstream Gmail or OpenAI node?',
      options: [
        'By using standard HTML tags like <h1>body</h1>',
        'By referencing the expression syntax {{ $json.body.fieldName }}',
        'By copying and pasting the static text manually',
        'By executing a Python compiler script'
      ],
      correctIndex: 1,
      explanation: 'n8n uses the {{ $json.body.variableName }} expression syntax to dynamically extract fields from incoming webhook JSON payloads.'
    }
  },
  {
    id: 'day6',
    dayNumber: 6,
    title: 'Presentation, GitHub & Vercel Deployment',
    subtitle: 'Public Portfolio Hosting, Pitch Deck & 3-Min Video Demo',
    description: 'Package your project into a public GitHub repository, deploy the frontend on Vercel, rehearse your 14-slide presentation, and record a video demo.',
    estimatedTime: '3 Hours',
    status: 'Not started',
    iconName: 'Presentation',
    keyTakeaways: [
      'Create a GitHub repository with formatted README architecture docs',
      'Deploy the Lovable landing page to Vercel with custom domain links',
      'Master the 14-slide presentation deck with speaker notes and ROI stats',
      'Record a polished 3-minute video demo explaining problem, workflow, and impact'
    ],
    steps: [
      {
        id: 'd6-step1',
        stepNumber: 1,
        title: 'Create GitHub Repository & Push Documentation',
        description: 'Create a public repository titled "talentbridge-n8n-project" and add the README documentation template.',
        clickPath: 'github.com/new -> Repository Name: "talentbridge-n8n-project" -> Public -> Add README.md -> Create',
        exactUrl: 'https://github.com/new',
        codeSnippet: `# TalentBridge Systems — Gen AI Bootcamp Project
Automated Client Pitch Generation & Soft Skills Performance Tracking

## Architecture
- Frontend: Lovable.dev
- Automation: n8n Cloud
- AI Reasoning: OpenAI GPT-4
- Persistence: Google Sheets
- Hosting: Vercel`,
        codeLanguage: 'markdown'
      },
      {
        id: 'd6-step2',
        stepNumber: 2,
        title: 'Deploy Frontend on Vercel',
        description: 'Import your GitHub repository into Vercel for instant cloud hosting.',
        clickPath: 'vercel.com/new -> Import Git Repository -> Select "talentbridge-n8n-project" -> Click Deploy -> Copy .vercel.app link',
        exactUrl: 'https://vercel.com/new'
      },
      {
        id: 'd6-step3',
        stepNumber: 3,
        title: 'Rehearse Day 6 Pitch Deck & ROI Stats',
        description: 'Review the 14-slide deck. Memorize core ROI figures ($42k annual savings, 99.8% time reduction).',
        interactiveType: 'presentation',
        tip: 'Practice keeping your demo under 3 minutes for max impact.'
      }
    ],
    quiz: {
      question: 'What is the most effective way to demonstrate an automated AI system during a live presentation?',
      options: [
        'Read 50 slides filled with small text',
        'Perform a live form submission, then immediately show the generated output landing in the target inbox or sheet',
        'Show screenshots without explaining what happens',
        'Avoid showing the working app entirely'
      ],
      correctIndex: 1,
      explanation: 'A live end-to-end demo showing input -> real-time automation -> output inbox landing creates immediate trust and excitement for judges.'
    }
  }
];

export const WORKFLOW_NODES: WorkflowNodeData[] = [
  {
    id: 'webhook',
    name: '1. Webhook Intake',
    type: 'trigger',
    icon: 'Webhook',
    subtitle: 'POST Endpoint Receiver',
    description: 'Receives POST JSON requests submitted from the Lovable client form with zero latency.',
    exactPath: 'Click "+" -> Search "Webhook" -> Set HTTP Method to POST -> Path: "client-requirements"',
    inputs: {
      clientName: 'String (e.g. Tomba Laisram)',
      company: 'String (e.g. TechFlow India)',
      email: 'String (e.g. tomba@techflow.io)',
      requirements: 'String (Soft skills pain points)',
      budgetRange: 'String ($10k - $25k)'
    },
    outputs: {
      body: 'Contains raw JSON payload parsed into n8n data flow context'
    },
    jsonSnippet: `"parameters": {
  "httpMethod": "POST",
  "path": "client-requirements",
  "responseMode": "onReceived"
}`,
    troubleshooting: [
      'If test fails, check if n8n workflow is set to "Active" mode.',
      'Ensure Content-Type is "application/json" in HTTP request headers.'
    ]
  },
  {
    id: 'openai',
    name: '2. OpenAI GPT-4 Chat Model',
    type: 'ai',
    icon: 'Sparkles',
    subtitle: 'LLM Reasoning Engine',
    description: 'Generates structured 3-module soft skills consulting proposals based on client pain points.',
    exactPath: 'Click "+" -> Search "OpenAI" -> Add "Chat Model" -> Connect OpenAI Credential -> Select "gpt-4o"',
    inputs: {
      model: 'gpt-4o',
      temperature: '0.7',
      prompt: 'System prompt + variables {{ $json.body.requirements }}'
    },
    outputs: {
      output: '3-paragraph custom soft skills proposal with solution modules and CTA'
    },
    jsonSnippet: `"parameters": {
  "model": "gpt-4o",
  "prompt": "You are a senior soft skills consultant..."
}`,
    troubleshooting: [
      '401 Unauthorized: Check API key validity on platform.openai.com/api-keys.',
      '429 Rate Limit: Verify billing status or credit balance.'
    ]
  },
  {
    id: 'gmail_client',
    name: '3. Send Client Pitch (Gmail)',
    type: 'action',
    icon: 'Mail',
    subtitle: 'External Email Dispatch',
    description: 'Emails the AI-generated proposal directly to the prospect email address.',
    exactPath: 'Click "+" -> Search "Gmail" -> Send Email -> To: {{ $json.body.email }}',
    inputs: {
      to: '{{ $json.body.email }}',
      subject: 'Customized Soft Skills Proposal for {{ $json.body.company }}',
      body: '{{ $json.output }}'
    },
    outputs: {
      messageId: 'Unique Gmail Message ID string'
    },
    jsonSnippet: `"parameters": {
  "sendTo": "={{ $json.body.email }}",
  "subject": "=Customized Proposal for {{ $json.body.company }}"
}`,
    troubleshooting: [
      'Check spam folder if email does not appear immediately.',
      'Verify OAuth2 credentials in n8n Connections tab.'
    ]
  },
  {
    id: 'gmail_team',
    name: '4. Notify Team Lead (Gmail)',
    type: 'notification',
    icon: 'BellRing',
    subtitle: 'Internal Alert Channel',
    description: 'Notifies Team Lead Yumnam Pukhrambam Rajshree with complete lead breakdown.',
    exactPath: 'Click "+" -> Search "Gmail" -> Send Email -> To: rajshree.yumnam@talentbridge.com',
    inputs: {
      to: 'rajshree.yumnam@talentbridge.com',
      subject: '[NEW LEAD] Soft Skills Proposal Generated',
      body: 'Lead breakdown + full pitch string'
    },
    outputs: {
      status: 'Sent'
    },
    jsonSnippet: `"parameters": {
  "sendTo": "rajshree.yumnam@talentbridge.com",
  "subject": "=[NEW LEAD] {{ $json.body.company }}"
}`,
    troubleshooting: [
      'Can be replaced or paired with Slack notification node.'
    ]
  },
  {
    id: 'sheets',
    name: '5. Log to Google Sheets',
    type: 'db',
    icon: 'Table',
    subtitle: 'Persistent Data Record',
    description: 'Appends a new row to Google Sheets tracking timestamp, client details, budget, and pitch status.',
    exactPath: 'Click "+" -> Search "Google Sheets" -> Operation: Append -> Select Sheet ID',
    inputs: {
      Timestamp: '={{ $now }}',
      ClientName: '={{ $json.body.clientName }}',
      Company: '={{ $json.body.company }}',
      Email: '={{ $json.body.email }}',
      Budget: '={{ $json.body.budgetRange }}',
      PitchSent: 'Yes'
    },
    outputs: {
      updatedRows: '1'
    },
    jsonSnippet: `"parameters": {
  "operation": "append",
  "sheetId": "1A2B3C4D5E6F_YOUR_SHEET_ID"
}`,
    troubleshooting: [
      'Verify exact header names in Row 1 match n8n field mappings.',
      'Check OAuth permissions for Google Sheets API.'
    ]
  },
  {
    id: 'wait_node',
    name: '6. Wait 3 Days & Follow Up',
    type: 'condition',
    icon: 'Clock',
    subtitle: 'Multi-Day Sequence Timer',
    description: 'Pauses workflow execution for 3 days before sending an automated follow-up email if no reply is logged.',
    exactPath: 'Click "+" -> Search "Wait" -> Amount: 3 -> Unit: Days -> Connect to Gmail Follow-up node',
    inputs: {
      amount: '3',
      unit: 'days'
    },
    outputs: {
      resumed: 'true'
    },
    jsonSnippet: `"parameters": {
  "amount": 3,
  "unit": "days"
}`,
    troubleshooting: [
      'n8n Cloud maintains execution state even during server restarts.'
    ]
  }
];

export const PRESENTATION_SLIDES: PresentationSlide[] = [
  {
    slideNumber: 1,
    category: 'Title & Vision',
    title: 'TalentBridge Systems — Automated Pitch Generation & Soft Skills Tracking',
    bullets: [
      'Team Lead: Yumnam Pukhrambam Rajshree',
      'Gen AI Bootcamp Final Project #13',
      'Goal: Streamline soft skills consulting client acquisition with end-to-end AI automation'
    ],
    speakerNotes: 'Good morning judges! Today we present TalentBridge Systems — a complete AI automation pipeline that transforms hours of manual proposal drafting into a 25-second intelligent workflow.',
    visualCue: 'Show TalentBridge logo and high-contrast Nordic design banner.',
    timeAllocation: '0:20'
  },
  {
    slideNumber: 2,
    category: 'The Problem',
    title: 'The High Cost of Manual Proposal Drafting',
    bullets: [
      '3.5 Hours required per customized enterprise soft skills proposal',
      '40% Lead drop-off rate due to delayed proposal delivery (24-48 hrs)',
      'Zero standardized tracking for soft skills performance outcomes'
    ],
    speakerNotes: 'Consultants spend over 3 hours researching client pain points and copy-pasting training modules. By the time proposals arrive, hot leads have gone cold.',
    visualCue: 'Display comparative stat badge: 210 mins manual vs. 25 secs AI.',
    timeAllocation: '0:30'
  },
  {
    slideNumber: 3,
    category: 'System Architecture',
    title: 'Full-Stack AI Automation Pipeline',
    bullets: [
      'Frontend Portal: Lovable.dev intake form',
      'Automation Engine: n8n Cloud Webhook & Workflows',
      'Cognitive Model: OpenAI GPT-4o with soft skills domain prompts',
      'Storage & Communication: Gmail, Google Sheets, Slack, and scheduled Wait nodes'
    ],
    speakerNotes: 'Here is our end-to-end architecture. Data flows smoothly from Lovable form -> n8n Webhook -> GPT-4o reasoning -> Dual Gmail dispatch -> Google Sheets persistence -> Follow-up timer.',
    visualCue: 'Show interactive 6-node flow diagram on screen.',
    timeAllocation: '0:40'
  },
  {
    slideNumber: 4,
    category: 'Live Demonstration',
    title: 'Real-Time Intake to Inbox Dispatch',
    bullets: [
      'Client: Tomba Laisram (TechFlow India)',
      'Requirements: Mid-level engineering feedback & communication',
      'Execution Speed: 22 seconds end-to-end'
    ],
    speakerNotes: 'Let us run a live lead right now! Watch how the moment we hit submit on Lovable, the proposal arrives in Priya inbox, Rajshree gets alerted, and Google Sheets logs the lead.',
    visualCue: 'Switch to live screen or 45-sec video clip of form submission and email inbox landing.',
    timeAllocation: '0:50'
  },
  {
    slideNumber: 5,
    category: 'Business ROI & Math',
    title: 'Quantified Impact & Cost Reduction',
    bullets: [
      'Time Savings: 99.8% faster proposal delivery (210 mins -> 25 secs)',
      'Labor Cost Savings: $17,488 annually for 100 proposals ($42,000+ for enterprise agencies)',
      'Conversion Rate Impact: Estimated 2.8x increase in closed deals'
    ],
    speakerNotes: 'The financial math is compelling. Writing 100 proposals manually costs $17,500 in labor. With our AI pipeline, API cost is just $12. That is over $17,400 saved per 100 pitches.',
    visualCue: 'Display ROI metric card with $42K savings highlighting.',
    timeAllocation: '0:30'
  },
  {
    slideNumber: 6,
    category: 'Anticipated Q&A Prep',
    title: 'Judge Defense & Technical Safeguards',
    bullets: [
      'Q: How do you prevent hallucinated training modules?',
      'A: We enforce strict system prompting with structured JSON schemas and curated soft skills frameworks.',
      'Q: What happens if an API fails?',
      'A: n8n error workflow triggers instant team lead alert and retries execution automatically.'
    ],
    speakerNotes: 'We built strict safeguards. System prompts enforce curated soft skill frameworks, and n8n handles automatic error retries.',
    visualCue: 'Show Q&A strategy matrix card.',
    timeAllocation: '0:30'
  }
];
