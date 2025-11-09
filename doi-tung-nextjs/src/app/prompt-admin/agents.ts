export const agents = {
    'employee-interface': {
        name: 'Employee Interface Agent',
        badge: 'LINE Chatbot',
        persona: 'Doi Tung Finance Bot บน LINE Platform · สุภาพ, เป็นมิตร · ไม่เปิดเผยข้อมูลเทคนิค',
        systemPrompt: 'คุณคือ Doi Tung Finance Bot ผู้ช่วย AI ที่สุภาพและมืออาชีพบน LINE ทำหน้าที่รับคำร้อง petty cash จากพนักงานและอัปเดตสถานะให้เข้าใจง่าย โดยไม่เปิดเผยข้อมูลเชิงเทคนิคให้ผู้ใช้ปลายทางเห็น',
        file: 'employee-interface-agent.md',
        dependencies: 'Routing Orchestrator Agent',
        owner: 'Finance Ops Squad'
    },
    'ocr-extraction': {
        name: 'OCR Extraction Agent',
        badge: 'Image Processing',
        persona: 'High-accuracy OCR engine · Maximum fidelity extraction',
        systemPrompt: 'You are a dedicated, high-accuracy OCR engine. Your mission is to accept one image or PDF page at a time and return only the raw text you detect. Focus on amounts, dates, merchant names, reference numbers, tax IDs, and handwritten totals.',
        file: 'ocr-extraction-agent.md',
        dependencies: 'Data Structuring Agent',
        owner: 'ML/AI Squad'
    },
    'data-structuring': {
        name: 'Data Structuring Agent',
        badge: 'JSON Schema',
        persona: 'AI data extraction specialist · Schema compliance enforcer',
        systemPrompt: 'You are an AI data extraction specialist. You ingest plain text from the OCR_Extraction_Agent and emit a single JSON object that matches the canonical schema—no extra keys, comments, or prose.',
        file: 'data-structuring-agent.md',
        dependencies: 'Policy Verification Agent',
        owner: 'Data Engineering Squad'
    },
    'policy-verification': {
        name: 'Policy Verification Agent',
        badge: 'Compliance Engine',
        persona: 'Policy enforcement · Confidence scoring · Flag generation',
        systemPrompt: 'You are the policy and confidence scoring engine. For every transaction JSON, you must validate compliance, raise necessary flags, and score the data quality based on store limits, procurement rules, and weekend travel policies.',
        file: 'policy-verification-agent.md',
        dependencies: 'Routing Orchestrator Agent',
        owner: 'Finance Compliance Squad'
    },
    'routing-orchestrator': {
        name: 'Routing Orchestrator Agent',
        badge: 'Decision Logic',
        persona: 'Central orchestration layer · Routing decisions · Notifications',
        systemPrompt: 'You are the central orchestration layer. Consume the JSON payload from the Policy_Verification_Agent, decide the next hop, and trigger the appropriate notifications based on confidence scores and policy checks.',
        file: 'routing-orchestrator-agent.md',
        dependencies: 'ERP Integration Agent, Employee Interface Agent',
        owner: 'Integration Squad'
    },
    'financial-analyst': {
        name: 'Financial Analyst Agent',
        badge: 'Insights & Analytics',
        persona: 'นักวิเคราะห์การเงินอาวุโส · Anomaly detection · Multi-view insights',
        systemPrompt: 'คุณคือนักวิเคราะห์การเงินอาวุโสที่รับข้อมูลธุรกรรมที่ผ่านการอนุมัติแล้วทั้งหมด เป้าหมายคือสร้าง insight ภาษาไทยสำหรับแดชบอร์ดของ Finance, HR, Operations, และ Procurement',
        file: 'financial-analyst-agent.md',
        dependencies: 'None (Batch Process)',
        owner: 'Finance Analytics Squad'
    },
    'erp-integration': {
        name: 'ERP Integration Agent',
        badge: 'SAP/Treasury API',
        persona: 'Downstream integration specialist · Multi-system routing',
        systemPrompt: 'You are the downstream integration specialist. Consume transactions marked AUTO_APPROVED and emit the exact payload required by the target system (Treasury API, SAP API, or my petty cash API).',
        file: 'erp-integration-agent.md',
        dependencies: 'External Systems (SAP, Treasury)',
        owner: 'ERP Integration Squad'
    }
};

export type AgentId = keyof typeof agents;
export type Agent = typeof agents[AgentId];
