# 🚀 TestGen AI – AI-Powered Test Case Generation Agent

TestGen AI is a state-of-the-art test case generator designed to create high-coverage test suites instantly. Utilizing the power of **Google Gemini API**, TestGen AI scans your source code, requirements specs, or API endpoints to construct standard, copy-paste ready assertions spanning multiple testing frameworks (Jest, Mocha, PyTest, Supertest, Cypress, Playwright, etc.).

---

## ⚡ Live Deployments

* **Frontend Dashboard**: [https://ai-test-case-generation-agent.vercel.app](https://ai-test-case-generation-agent.vercel.app)
* **Backend API Gateway**: [https://ai-test-case-generation-agent-5gnq.vercel.app](https://ai-test-case-generation-agent-5gnq.vercel.app)

---

## ✨ Features

- **Unit Assertion Builder**: Builds standard assertions verifying method behaviors, success states, and input checks.
- **Integration Pipelines**: Simulates multi-step workflow logic covering databases, API routers, and services.
- **Vulnerability Scanner**: Tests boundary validation checks, SQL Injection safety, cross-site scripting risks, and headers.
- **Edge Cases & Boundaries**: Verifies empty payloads, zero limits, null pointer references, and extreme sizing.
- **Performance Benchmarking**: Sets expectations for response latencies, payload throughput, and limits.
- **Dark Mode UI**: Sleek, glassmorphism-based web interface built with Next.js, featuring glowing mesh gradients, progressive thinking sequences, and copyable results blocks.

---

## 🛠️ Technology Stack

### Frontend ([`frontend/`](file:///c:/AI%20Test%20Case%20Generation%20Agent/frontend))
- **Core Framework**: React 19 & Next.js 15 (App Router)
- **Styling**: Tailwind CSS & Vanilla CSS transitions
- **Icons**: Lucide React
- **Client Routing**: Next.js App Router static optimization

### Backend ([`backend/`](file:///c:/AI%20Test%20Case%20Generation%20Agent/backend))
- **Core Environment**: Node.js (ES Modules)
- **Routing Framework**: Express.js
- **AI Core**: Google Gemini SDK (`@google/generative-ai`)
- **Security & Utilities**: CORS, dotenv, nodemon

---

## 📁 Repository Structure

```text
├── backend/                  # Node.js & Express REST API
│   ├── controllers/          # Request handlers
│   ├── middleware/           # CORS & error boundary filters
│   ├── routes/               # API Router endpoints
│   ├── services/             # Gemini API generation logic
│   ├── utils/                # Prompt template utilities
│   ├── server.js             # Main server entrypoint
│   └── vercel.json           # Vercel backend serverless routing
│
└── frontend/                 # Next.js SPA Web Client
    ├── app/                  # Route layouts, pages (Home, Privacy, Terms)
    ├── components/           # UI Elements (Hero, InputArea, Loading, ResultSection, Footer, etc.)
    ├── hooks/                # Custom React hooks (useGenerate API caller)
    ├── public/               # Static assets & dynamic SVG logos
    └── tailwind.config.ts    # Styling theme configuration
```

---

## ⚙️ Local Development Setup

Follow these steps to run the application locally on your computer.

### Prerequisites
- Node.js (v18 or higher)
- npm package manager
- A **Google Gemini API Key** (Get one from [Google AI Studio](https://aistudio.google.com))

---

### Step 1: Configure & Start the Backend

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install the backend dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend/` directory:
   ```env
   PORT=5000
   GEMINI_API_KEY=your_gemini_api_key_here
   GEMINI_MODEL=gemini-1.5-flash
   ```
4. Start the backend development server:
   ```bash
   npm run dev
   ```
   *The backend will boot up on [http://localhost:5000](http://localhost:5000).*

---

### Step 2: Configure & Start the Frontend

1. Navigate to the frontend directory:
   ```bash
   cd ../frontend
   ```
2. Install the frontend dependencies:
   ```bash
   npm install
   ```
3. Create a `.env.local` file in the `frontend/` directory to configure endpoints:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000
   ```
4. Run the frontend development server:
   ```bash
   npm run dev
   ```
   *Open [http://localhost:3000](http://localhost:3000) in your browser to view the TestGen AI dashboard.*

---

## 🔌 API Documentation

### 1. Health Status
Check the status of the server.
* **Endpoint**: `GET /health`
* **Response**:
  ```json
  {
    "status": "OK",
    "timestamp": "2026-05-25T08:52:00.000Z"
  }
  ```

### 2. Generate Test Suite
Send specifications/code and receive a fully generated, multi-category test suite.
* **Endpoint**: `POST /api/generate`
* **Headers**: `Content-Type: application/json`
* **Body**:
  ```json
  {
    "prompt": "Create an integration test suite for a node.js Express user register route that checks email validations and password hash storage."
  }
  ```
* **Response**:
  ```json
  {
    "unitTests": "...",
    "integrationTests": "...",
    "edgeCases": "...",
    "securityTests": "...",
    "performanceTests": "..."
  }
  ```

---

## 📞 Administrator & Contact Details

- **Admin Name**: **Vijayapandian T**
- **Email Support**: [vijayapandian112007@gmail.com](mailto:vijayapandian112007@gmail.com)
- **GitHub Profile**: [https://github.com/VIJAYAPANDIANT](https://github.com/VIJAYAPANDIANT)
- **Git Repository**: [https://github.com/VIJAYAPANDIANT/AI-Test-Case-Generation-Agent.git](https://github.com/VIJAYAPANDIANT/AI-Test-Case-Generation-Agent.git)
