import { TestResult } from "../types/testResult";

/**
 * Escapes HTML characters to prevent rendering problems in pre tags.
 */
function escapeHtml(text: string): string {
  if (!text) return "";
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/**
 * Opens a print-friendly document in a new window to invoke native PDF printing.
 * @param data TestResult data
 */
export function exportPDF(data: TestResult) {
  const printWindow = window.open("", "_blank");
  if (!printWindow) {
    alert("Please allow popups to export PDF documents.");
    return;
  }

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>TestGen AI - Generated Test Suite</title>
        <style>
          body {
            font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            color: #0f172a;
            padding: 30px;
            background-color: #ffffff;
            line-height: 1.6;
          }
          .header {
            border-bottom: 2px solid #e2e8f0;
            padding-bottom: 20px;
            margin-bottom: 30px;
          }
          .logo {
            font-size: 24px;
            font-weight: 800;
            color: #6366f1;
            margin-bottom: 5px;
          }
          .title {
            font-size: 28px;
            font-weight: 800;
            color: #0f172a;
            margin: 5px 0;
          }
          .meta {
            font-size: 12px;
            color: #64748b;
          }
          .section {
            margin-bottom: 35px;
            page-break-inside: avoid;
          }
          .section-title {
            font-size: 18px;
            font-weight: 700;
            color: #1e1b4b;
            border-bottom: 1px solid #cbd5e1;
            padding-bottom: 6px;
            margin-bottom: 12px;
          }
          pre {
            background-color: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            padding: 15px;
            font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
            font-size: 11px;
            white-space: pre-wrap;
            word-break: break-all;
            color: #334155;
            margin: 0;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="logo">TestGen AI</div>
          <h1 class="title">Generated Test Suite</h1>
          <div class="meta">Exported on ${new Date().toLocaleString()}</div>
        </div>

        <div class="section">
          <div class="section-title">1. Unit Tests</div>
          <pre>${escapeHtml(data.unitTests) || "No unit tests generated."}</pre>
        </div>

        <div class="section">
          <div class="section-title">2. Integration Tests</div>
          <pre>${escapeHtml(data.integrationTests) || "No integration tests generated."}</pre>
        </div>

        <div class="section">
          <div class="section-title">3. Edge Cases</div>
          <pre>${escapeHtml(data.edgeCases) || "No edge cases generated."}</pre>
        </div>

        <div class="section">
          <div class="section-title">4. Security Tests</div>
          <pre>${escapeHtml(data.securityTests) || "No security tests generated."}</pre>
        </div>

        <div class="section">
          <div class="section-title">5. Performance Tests</div>
          <pre>${escapeHtml(data.performanceTests) || "No performance tests generated."}</pre>
        </div>

        <script>
          window.onload = function() {
            setTimeout(function() {
              window.print();
              setTimeout(function() {
                window.close();
              }, 500);
            }, 300);
          };
        </script>
      </body>
    </html>
  `;

  printWindow.document.open();
  printWindow.document.write(htmlContent);
  printWindow.document.close();
}
