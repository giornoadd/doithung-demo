'use client';

import { useState } from 'react';
import Link from 'next/link';
import { agents, AgentId, Agent } from './agents';

export default function PromptAdmin() {
    const [activeAgentId, setActiveAgentId] = useState<AgentId>('employee-interface');
    const [activeTab, setActiveTab] = useState('system-prompt');
    const [environment, setEnvironment] = useState('staging');

    const activeAgent = agents[activeAgentId];

    const generateYAML = () => {
        let yaml = '# Doi Tung Agent Prompt Configuration\n';
        yaml += `# Generated: ${new Date().toISOString()}\n\n`;
        yaml += 'version: "1.0"\n';
        yaml += `environment: ${environment}\n`;
        yaml += `last_updated: "${new Date().toISOString()}"\n\n`;
        yaml += 'agents:\n';

        for (const [key, agent] of Object.entries(agents)) {
            yaml += `  - id: ${key}\n`;
            yaml += `    name: "${agent.name}"\n`;
            yaml += `    file: ${agent.file}\n`;
            yaml += `    owner: "${agent.owner}"\n`;
            yaml += `    dependencies: "${agent.dependencies}"\n\n`;
        }
        return yaml;
    };

    const downloadYAML = () => {
        const yaml = generateYAML();
        const blob = new Blob([yaml], { type: 'text/yaml' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'doi-tung-agents.yaml';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    };

    return (
        <div className="min-h-screen flex flex-col bg-slate-950 text-white">
            <header className="border-b border-[#006A4E]/20 bg-slate-950">
                <div className="mx-auto max-w-6xl px-6 py-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-[#009688]/40 text-[#009688] text-sm font-medium hover:bg-[#009688]/10 transition">← Hub</Link>
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-xl bg-[#006A4E] text-white flex items-center justify-center font-semibold text-lg">DT</div>
                            <div className="space-y-1">
                                <p className="text-xs uppercase tracking-[0.35em] text-[#009688] font-semibold">Doi Tung Finance</p>
                                <h1 className="text-2xl font-semibold text-white">Agent Prompt Console</h1>
                                <p className="text-xs text-slate-400 max-w-3xl">บริหารจัดการ system prompt, persona, และ instruction ของ Agent แต่ละตัวในกระบวนการ Petty Cash Automation</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-3">
                        <button onClick={downloadYAML} className="px-4 py-2 rounded-xl border border-[#009688]/40 text-[#009688] text-sm font-medium hover:bg-[#009688]/10 transition">📄 Download YAML</button>
                        <button onClick={() => alert('Deploying...')} className="px-4 py-2 rounded-xl bg-[#009688] text-white text-sm font-semibold shadow-lg shadow-[#009688]/30 hover:bg-[#006A4E] transition">🚀 Deploy Update</button>
                    </div>
                </div>
            </header>

            <main className="flex-1 bg-slate-900/40">
                <section className="mx-auto max-w-6xl px-6 py-10 space-y-8">
                    <div className="grid gap-6 md:grid-cols-[320px_minmax(0,1fr)]">
                        <aside className="bg-slate-900/60 border border-slate-800 rounded-3xl p-5 backdrop-blur">
                            <div className="space-y-5">
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Agent Groups</p>
                                    <div className="mt-3 flex flex-col gap-2">
                                        {Object.keys(agents).map(agentId => (
                                            <button key={agentId} onClick={() => setActiveAgentId(agentId as AgentId)} className={`flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-semibold border transition ${activeAgentId === agentId ? 'bg-white/5 text-white border-[#009688]/30' : 'text-slate-300 border-transparent hover:border-slate-700 hover:bg-white/5'}`}>
                                                {agents[agentId as AgentId].name}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div className="border-t border-slate-800 pt-4 space-y-3">
                                    <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Environment</p>
                                    <div className="grid grid-cols-2 gap-3 text-xs">
                                        <button onClick={() => setEnvironment('staging')} className={`px-3 py-2 rounded-xl font-medium ${environment === 'staging' ? 'bg-[#009688]/20 border border-[#009688]/40 text-[#009688]' : 'border border-slate-700 text-slate-300 hover:bg-slate-800/80'}`}>staging</button>
                                        <button onClick={() => setEnvironment('production')} className={`px-3 py-2 rounded-xl font-medium ${environment === 'production' ? 'bg-[#009688]/20 border border-[#009688]/40 text-[#009688]' : 'border border-slate-700 text-slate-300 hover:bg-slate-800/80'}`}>production</button>
                                    </div>
                                </div>
                            </div>
                        </aside>
                        <section className="space-y-6">
                            <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 backdrop-blur card-shadow">
                                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                                    <div>
                                        <p className="text-xs uppercase tracking-[0.32em] text-[#009688] font-semibold">Active Agent</p>
                                        <h2 className="text-2xl font-semibold text-white flex items-center gap-2">{activeAgent.name} <span className="text-sm font-medium text-[#009688] bg-[#009688]/10 px-3 py-1 rounded-full border border-[#009688]/30">{activeAgent.badge}</span></h2>
                                    </div>
                                </div>
                                <div className="mt-5 grid gap-4 lg:grid-cols-[240px_minmax(0,1fr)]">
                                    <div className="space-y-4">
                                        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
                                            <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Persona & Role</p>
                                            <p className="mt-2 text-sm text-slate-200 leading-relaxed">{activeAgent.persona}</p>
                                        </div>
                                        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3 text-xs text-slate-400">
                                            <div className="flex items-center justify-between text-slate-300">
                                                <span>Last Edited</span>
                                                <span>9 Nov 2025 · 14:32</span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span>Owner</span>
                                                <span className="text-slate-300">{activeAgent.owner}</span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span>Dependencies</span>
                                                <span className="text-[#009688]">{activeAgent.dependencies}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="border border-slate-800 rounded-2xl overflow-hidden">
                                            <div className="flex items-center gap-3 border-b border-slate-800 bg-slate-900/60 px-4 py-3 text-xs font-semibold text-slate-400">
                                                <button onClick={() => setActiveTab('system-prompt')} className={`px-3 py-1.5 rounded-xl border ${activeTab === 'system-prompt' ? 'border-[#009688]/50 text-[#009688] bg-[#009688]/10' : 'border-transparent text-slate-500 hover:border-slate-700 hover:text-slate-300'}`}>System Prompt</button>
                                                <button onClick={() => setActiveTab('guardrails')} className={`px-3 py-1.5 rounded-xl border ${activeTab === 'guardrails' ? 'border-[#009688]/50 text-[#009688] bg-[#009688]/10' : 'border-transparent text-slate-500 hover:border-slate-700 hover:text-slate-300'}`}>Guardrails</button>
                                                <button onClick={() => setActiveTab('test-scenarios')} className={`px-3 py-1.5 rounded-xl border ${activeTab === 'test-scenarios' ? 'border-[#009688]/50 text-[#009688] bg-[#009688]/10' : 'border-transparent text-slate-500 hover:border-slate-700 hover:text-slate-300'}`}>Test Scenarios</button>
                                            </div>
                                            <div className="bg-slate-950/90 p-4 text-sm text-slate-200 font-mono leading-relaxed space-y-3">
                                                <p dangerouslySetInnerHTML={{ __html: activeAgent.systemPrompt }}></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </section>
            </main>
        </div>
    );
}