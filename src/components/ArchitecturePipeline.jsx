import { useState } from 'react';
import { SITE } from '../content';

export function ArchitecturePipeline() {
  const [selectedNode, setSelectedNode] = useState(SITE.architectureNodes[2]); // Core engine by default
  const [activeTab, setActiveTab] = useState('diagram'); // diagram or security

  return (
    <section className="section rule vercel-grid-bg" id="architecture">
      <div className="wrap">
        <div className="head">
          <div className="tech-coord-tag">
            <span className="plus-cross">+</span>
            <span>SPEC: 0x4829 // DISTRIBUTED ARCHITECTURE</span>
            <span className="plus-cross">+</span>
          </div>
          <h2 className="h2 grad rv" style={{ '--d': 1 }}>Engineered for sub-50ms latency & zero data loss</h2>
          <p className="lede rv" style={{ '--d': 2 }}>
            Vercel-level precision meets mission-critical transactional integrity. Every ERPsol deployment runs on an event-driven architecture designed to scale seamlessly.
          </p>
        </div>

        {/* View Mode Toggle */}
        <div className="arch-controls rv" style={{ '--d': 3 }}>
          <div className="arch-toggle-group">
            <button
              className={`arch-toggle-btn ${activeTab === 'diagram' ? 'active' : ''}`}
              onClick={() => setActiveTab('diagram')}
            >
              <span>System Topology</span>
            </button>
            <button
              className={`arch-toggle-btn ${activeTab === 'security' ? 'active' : ''}`}
              onClick={() => setActiveTab('security')}
            >
              <span>Security, SLA & Governance</span>
            </button>
          </div>
          <span className="arch-uptime-pill">
            <span className="pulse-dot" />
            99.99% HIGH-AVAILABILITY CLUSTER
          </span>
        </div>

        {activeTab === 'diagram' ? (
          <div className="arch-diagram-wrap rv" style={{ '--d': 4 }}>
            {/* Visual Grid of Architecture Nodes */}
            <div className="arch-nodes-grid">
              {SITE.architectureNodes.map((node, idx) => (
                <div
                  key={node.id}
                  className={`arch-node-card spot ${selectedNode.id === node.id ? 'active' : ''}`}
                  onClick={() => setSelectedNode(node)}
                >
                  <div className="node-corner-cross top-left">+</div>
                  <div className="node-corner-cross top-right">+</div>
                  <div className="node-corner-cross bottom-left">+</div>
                  <div className="node-corner-cross bottom-right">+</div>

                  <div className="node-top-bar">
                    <span className="node-index">0{idx + 1}</span>
                    <span className="node-latency">{node.latency}</span>
                  </div>

                  <h4 className="node-name">{node.name}</h4>
                  <p className="node-role">{node.role}</p>

                  <div className="node-tech-stack">
                    <code>{node.tech}</code>
                  </div>

                  <div className="node-footer">
                    <span className="node-status-dot" />
                    <span>Active Telemetry</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Selected Node Deep Dive Panel */}
            <div className="arch-inspect-panel">
              <div className="inspect-header">
                <span className="inspect-label">Selected Subsystem Telemetry:</span>
                <span className="inspect-node-title">{selectedNode.name}</span>
              </div>
              <div className="inspect-details-grid">
                <div className="inspect-col">
                  <span className="inspect-k">Primary Role</span>
                  <span className="inspect-v">{selectedNode.role}</span>
                </div>
                <div className="inspect-col">
                  <span className="inspect-k">Core Technologies</span>
                  <span className="inspect-v">{selectedNode.tech}</span>
                </div>
                <div className="inspect-col">
                  <span className="inspect-k">Target Latency / SLA</span>
                  <span className="inspect-v text-accent">{selectedNode.latency}</span>
                </div>
                <div className="inspect-col">
                  <span className="inspect-k">Failover Protocol</span>
                  <span className="inspect-v">Multi-AZ Hot Standby (&lt; 2s Recovery)</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Enterprise Security & Governance View */
          <div className="arch-security-grid rv" style={{ '--d': 4 }}>
            <div className="security-card spot">
              <div className="sec-icon">🛡️</div>
              <h4>SOC 2 Type II & ISO 27001</h4>
              <p>
                Strict role-based access control (RBAC), end-to-end TLS 1.3 encryption, automated secret rotation via AWS KMS / HashiCorp Vault, and annual third-party penetration testing.
              </p>
              <ul className="sec-list">
                <li>Automated security compliance evidence generation</li>
                <li>Single sign-on (SSO) with Okta, Azure AD & Google Workspace</li>
                <li>Multi-factor authentication (MFA) enforcement across all roles</li>
              </ul>
            </div>

            <div className="security-card spot">
              <div className="sec-icon">⚡</div>
              <h4>Double-Entry Immutability & Audit Logs</h4>
              <p>
                Every transaction, inventory adjustment, and approval event is permanently written to an immutable append-only event log with cryptographic hashing.
              </p>
              <ul className="sec-list">
                <li>Point-in-time state recovery to any second in history</li>
                <li>Comprehensive audit trail for external financial audits</li>
                <li>Zero-tampering ledger integrity guaranteed by architecture</li>
              </ul>
            </div>

            <div className="security-card spot">
              <div className="sec-icon">🌐</div>
              <h4>Sovereign Cloud & Air-Gapped Options</h4>
              <p>
                Deploy into dedicated enterprise VPCs (AWS GovCloud, Azure Government, Google Cloud) or fully on-premise air-gapped environments for defense and medical compliance.
              </p>
              <ul className="sec-list">
                <li>Your data never leaves your chosen geographic boundaries</li>
                <li>Custom data retention and GDPR right-to-be-forgotten pipelines</li>
                <li>Zero vendor lock-in with standard PostgreSQL & Docker containers</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
