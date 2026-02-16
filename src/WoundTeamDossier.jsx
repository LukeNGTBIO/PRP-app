import React, { useState, useEffect } from 'react';
import './WoundTeamDossier.css';
import sandyDeimundImg from './assets/sandy-deimund.png';
import vladimirChachanidzeImg from './assets/vladimir-chachanidze.png';

const WoundTeamDossier = () => {
  // Collapsible state for org chart branches
  const [collapsed, setCollapsed] = useState({
    director: false,
    clinical: false,
  });

  // Notes state (persisted in localStorage)
  const [notes, setNotes] = useState({
    sandy: '',
    tonya: '',
    vladimir: '',
    general: '',
  });

  // Load notes from localStorage on mount
  useEffect(() => {
    const savedNotes = localStorage.getItem('woundTeamNotes');
    if (savedNotes) {
      try {
        setNotes(JSON.parse(savedNotes));
      } catch (e) {
        console.error('Error loading saved notes:', e);
      }
    }
  }, []);

  // Save notes to localStorage on change
  useEffect(() => {
    localStorage.setItem('woundTeamNotes', JSON.stringify(notes));
  }, [notes]);

  const handleNoteChange = (key, value) => {
    setNotes(prev => ({ ...prev, [key]: value }));
  };

  const toggleCollapse = (key) => {
    setCollapsed(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // Personnel data (centralized)
  const personnel = [
    {
      id: 'tonya',
      name: 'Tonya Rountree, MSN, RN',
      role: 'Wound Care Director / Clinical Manager',
      imageUrl: 'https://media.licdn.com/dms/image/sync/v2/D5627AQEKN2PoyJjzgg/articleshare-shrink_800/B56ZjOAgc9HMAM-/0/1755802896799?e=2147483647&v=beta&t=pvwETNbiUIbrdBXbfwdz0KFy9s5srqZryLQ_aXWb-Ow',
      background: 'MSN Executive Leadership (2020); Leads diabetes education classes; 2025 NightinGala nominee; Featured in blogs/news on chronic wounds.',
      drivers: 'Prevention & accessible education; Operational efficiency; Community impact; Nutrition & resilience focus.',
      rapport: 'Compliment diabetes class innovations; Co-sponsor education series; Provide nutrition materials; Support RN training/recruitment.',
      opener: 'Tonya, your diabetes class adaptations are making real impact—excited to support your prevention goals.',
    },
    {
      id: 'sandy',
      name: 'Sondra "Sandy" Deimund, FNP, CWS',
      role: 'Lead Nurse Practitioner & Certified Wound Specialist (Primary KOL)',
      imageUrl: sandyDeimundImg,
      background: '20+ years in wound care; "Power of One" Award (2010); NAWC Preceptor; Co-author 2018 DFU education paper; Featured in Methodist media on HBO & limb salvage.',
      drivers: 'Limb salvage mission (prevent amputations in Shelby County); Patient education & empowerment; Data-driven innovation; Precepting legacy.',
      rapport: 'Reference her 2018 paper/media; Co-host NAWC webinars; Joint abstracts/posters; Sponsor community diabetes events.',
      opener: 'Sandy, your 2018 DFU paper brilliantly highlighted provider training gaps—it\'s guided our work at Nightingale.',
    },
    {
      id: 'vladimir',
      name: 'Dr. Vladimir Chachanidze, MD',
      role: 'Infectious Disease Specialist (Key Collaborator)',
      imageUrl: vladimirChachanidzeImg,
      background: 'Board-certified ID; Expertise in cellulitis, osteomyelitis; Frequently praised in patient testimonials for limb-saving outcomes.',
      drivers: 'Complex infection management; Collaborative limb preservation; Patient gratitude in tough cases.',
      rapport: 'Reference patient "saved my leg" stories; Joint protocols on infected wounds; Co-data tracking for infection resolution.',
      opener: 'Dr. Chachanidze, patients praise your infection expertise—ActiGraft complements osteomyelitis cases.',
    },
  ];

  return (
    <div className="dossier-container">
      <header className="dossier-header">
        <div className="header-gradient" />
        <h1>Methodist North Wound Healing & Limb Preservation Team</h1>
        <p className="prepared-for">Prepared for Nightingale Biotech Leadership | February 16, 2026</p>
        <p className="objective">
          Interactive strategic dossier with collapsible org chart, detailed personnel profiles, and persistent note-taking for relationship management and follow-up tracking.
        </p>
      </header>

      {/* Center Visuals */}
      <section className="center-visuals">
        <h2>Center & Clinical Capabilities</h2>
        <div className="gallery-grid">
          <div className="gallery-item">
            <img src="https://www.oswegohealth.org/media/a9343602536c4cf5806b0e9e40e4d772/wound-care-nurse-patient-in-chamber.jpg" alt="Hyperbaric Oxygen Therapy" />
            <p>Hyperbaric Oxygen Therapy (HBO) – 2 Monoplace Chambers</p>
          </div>
          <div className="gallery-item">
            <img src="https://bestcare.org/sites/default/files/styles/featured_media/public/best_care_today/featured_image/MJEH_Wound_Clinic_Cover.jpg.webp?itok=BXjuvRbZ" alt="Wound Center Team" />
            <p>Multidisciplinary Wound Care Team Environment</p>
          </div>
          <div className="gallery-item">
            <img src="https://www.methodisthealth.org/images/careers/image-cards/locations/north_hospital_location_image.png" alt="Methodist North Hospital" />
            <p>Methodist North Hospital – Memphis, TN</p>
          </div>
        </div>
      </section>

      {/* Interactive Collapsible Org Chart */}
      <section className="org-chart-section">
        <h2>Team Structure & Hierarchy</h2>
        <p className="org-subtitle">Click nodes to expand/collapse branches • Visualize reporting relationships and collaboration points</p>

        <div className="tree">
          <ul>
            <li>
              <div
                className="node director clickable"
                onClick={() => toggleCollapse('director')}
              >
                <span className="toggle-icon">{collapsed.director ? '▶' : '▼'}</span>
                <img src={personnel.find(p => p.id === 'tonya').imageUrl} alt="Tonya Rountree" className="tree-headshot" />
                <strong>Tonya Rountree, MSN, RN</strong>
                <span className="node-role">Wound Care Director</span>
                <span className="node-desc">Operations, Education, Diabetes Classes</span>
              </div>

              {!collapsed.director && (
                <ul>
                  <li>
                    <div
                      className="node clinical-lead clickable"
                      onClick={() => toggleCollapse('clinical')}
                    >
                      <span className="toggle-icon">{collapsed.clinical ? '▶' : '▼'}</span>
                      <img src={personnel.find(p => p.id === 'sandy').imageUrl} alt="Sandy Deimund" className="tree-headshot" />
                      <strong>Sandy Deimund, FNP, CWS</strong>
                      <span className="node-role">Lead NP / Clinical KOL</span>
                      <span className="node-desc">Patient Care, HBO, Limb Salvage</span>
                    </div>

                    {!collapsed.clinical && (
                      <ul>
                        <li>
                          <div className="node specialist">
                            <img src={personnel.find(p => p.id === 'vladimir').imageUrl} alt="Dr. Chachanidze" className="tree-headshot" />
                            <strong>Dr. Vladimir Chachanidze, MD</strong>
                            <span className="node-role">Infectious Disease</span>
                            <span className="node-desc">Cellulitis, Osteomyelitis, Complex Infections</span>
                          </div>
                        </li>
                        <li>
                          <div className="node specialist generic">
                            <strong>Vascular Surgery / Podiatry</strong>
                            <span className="node-desc">PAD Management, Revascularization</span>
                          </div>
                        </li>
                        <li>
                          <div className="node specialist generic">
                            <strong>Endocrinology</strong>
                            <span className="node-desc">Diabetes Management</span>
                          </div>
                        </li>
                        <li>
                          <div className="node specialist generic">
                            <strong>Nutrition / Dermatology / Plastics</strong>
                            <span className="node-desc">Holistic Wound Support</span>
                          </div>
                        </li>
                      </ul>
                    )}
                  </li>

                  <li>
                    <div className="node support">
                      <strong>Hyperbaric Oxygen (HBO) Staff</strong>
                      <span className="node-desc">2 Monoplace Chambers, Refractory Cases</span>
                    </div>
                  </li>

                  <li>
                    <div className="node support">
                      <strong>Support Nursing & Rehab Team</strong>
                      <span className="node-desc">Daily Care, Patient Education, Follow-up</span>
                    </div>
                  </li>
                </ul>
              )}
            </li>
          </ul>
        </div>

        <div className="notes-section general-notes">
          <label>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
            General Team / Org Chart Notes:
          </label>
          <textarea
            value={notes.general}
            onChange={(e) => handleNoteChange('general', e.target.value)}
            placeholder="Track general team observations, potential new contacts (vascular/podiatry), collaboration opportunities..."
            rows="4"
          />
        </div>
      </section>

      {/* Personnel Cards */}
      <section className="personnel-cards">
        <h2>Key Personnel Profiles & Rapport Strategy</h2>
        <p className="section-subtitle">Detailed backgrounds, professional drivers, and actionable engagement tactics</p>

        <div className="cards-grid">
          {personnel.map(person => (
            <div key={person.id} className="person-card">
              <div className="card-header">
                <img src={person.imageUrl} alt={person.name} className="headshot" />
                <div className="card-title">
                  <h3>{person.name}</h3>
                  <p className="role">{person.role}</p>
                </div>
              </div>

              <details className="accordion">
                <summary>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 16v-4M12 8h.01" />
                  </svg>
                  View Full Profile & Rapport Strategy
                </summary>
                <div className="details-content">
                  <div className="detail-section">
                    <h4>Background & Accomplishments</h4>
                    <p>{person.background}</p>
                  </div>

                  <div className="detail-section">
                    <h4>Professional Drivers & Values</h4>
                    <p>{person.drivers}</p>
                  </div>

                  <div className="detail-section">
                    <h4>Rapport-Building Ideas</h4>
                    <p>{person.rapport}</p>
                  </div>

                  <div className="detail-section opener">
                    <h4>Sample Conversation Opener</h4>
                    <p className="quote">"{person.opener}"</p>
                  </div>
                </div>
              </details>

              <div className="notes-section">
                <label>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                  </svg>
                  Follow-Up Notes & Interaction Log:
                </label>
                <textarea
                  value={notes[person.id]}
                  onChange={(e) => handleNoteChange(person.id, e.target.value)}
                  placeholder={`Track interactions with ${person.name.split(' ')[0]}... (e.g., "Called 2/20 - interested in co-hosting diabetes webinar, follow up 3/5")`}
                  rows="4"
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Team-Wide Strategies */}
      <section className="strategies-section">
        <h2>Team-Wide Value Creation Strategies</h2>
        <div className="strategies-grid">
          <div className="strategy-card">
            <div className="strategy-icon">🎓</div>
            <h3>Value Lunch-and-Learn</h3>
            <p>70% celebrate their clinical wins, 30% ActiGraft demo tied to HBO/infection protocols/education initiatives</p>
          </div>

          <div className="strategy-card">
            <div className="strategy-icon">🤝</div>
            <h3>Community Sponsorship</h3>
            <p>Co-sponsor Memphis diabetes awareness events; Co-create Methodist Facebook/LinkedIn content</p>
          </div>

          <div className="strategy-card">
            <div className="strategy-icon">🏆</div>
            <h3>Internal Leverage</h3>
            <p>Position Methodist North as "ActiGraft Center of Excellence" (vs. South campus)</p>
          </div>

          <div className="strategy-card">
            <div className="strategy-icon">💪</div>
            <h3>Morale Boosters</h3>
            <p>"Limb Saver" branded swag, burnout prevention resources, team celebration sponsorship</p>
          </div>
        </div>
      </section>

      <footer className="dossier-footer">
        <div className="footer-gradient" />
        <p>
          <strong>Strategic Positioning:</strong> ActiGraft enhances HBO therapy outcomes, supports DFU education initiatives, and complements infection management protocols.
          Focus on helping the team "look great and win" through genuine value creation.
        </p>
        <p className="footer-note">
          All notes are saved locally in your browser and persist across sessions for ongoing relationship management.
        </p>
      </footer>
    </div>
  );
};

export default WoundTeamDossier;
