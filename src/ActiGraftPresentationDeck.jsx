import { useState, useRef } from 'react'
import { NIGHTINGALE } from './brandTheme'
import nbLogoWhite from './assets/nb-logo-white.png'
import './ActiGraftPresentationDeck.css'

const ActiGraftPresentationDeck = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const printRef = useRef(null)

  const handlePrint = () => {
    window.print()
  }

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1)
    }
  }

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1)
    }
  }

  const goToSlide = (index) => {
    setCurrentSlide(index)
  }

  // ========== SLIDE CONTENT ==========
  const slides = [
    // Slide 1: Title Slide
    {
      type: 'title',
      title: 'ActiGraft®',
      subtitle: 'Advanced Tissue Repair System',
      tagline: 'Autologous Platelet-Rich Plasma Technology for Chronic Wound Healing',
      footer: 'Presented by Nightingale BioTech',
    },

    // Slide 2: What is ActiGraft?
    {
      type: 'content',
      title: 'What is ActiGraft®?',
      content: [
        {
          type: 'text',
          value: 'ActiGraft is an FDA-cleared, point-of-care system that transforms patient blood into a concentrated autologous platelet-rich plasma (PRP) gel for wound treatment.'
        },
        {
          type: 'bullets',
          items: [
            'Autologous (patient\'s own blood) - no rejection risk',
            'Point-of-care processing in <15 minutes',
            'Concentrated growth factors and platelets',
            'Gel formulation for easy application',
            'Single-use, sterile disposable kits'
          ]
        },
        {
          type: 'highlight',
          value: '510(k) Cleared by FDA for treatment of chronic non-healing wounds including diabetic foot ulcers, venous leg ulcers, and pressure ulcers.'
        }
      ]
    },

    // Slide 3: Unique Features & Differentiation
    {
      type: 'content',
      title: 'Unique Features of ActiGraft®',
      content: [
        {
          type: 'comparison',
          title: 'ActiGraft Advantages:',
          items: [
            {
              feature: 'Autologous Source',
              benefit: 'Zero rejection risk, no disease transmission',
              icon: '🧬'
            },
            {
              feature: 'Point-of-Care',
              benefit: 'Same-day treatment, no lab processing delays',
              icon: '⚡'
            },
            {
              feature: 'Concentrated PRP',
              benefit: '4-6x platelet concentration with growth factors',
              icon: '📊'
            },
            {
              feature: 'Gel Formulation',
              benefit: 'Easy application, stays in wound bed',
              icon: '💧'
            },
            {
              feature: 'Cost-Effective',
              benefit: 'Reduces advanced therapy costs, prevents amputations',
              icon: '💰'
            }
          ]
        }
      ]
    },

    // Slide 4: How ActiGraft Works
    {
      type: 'content',
      title: 'How ActiGraft® Works',
      subtitle: 'Simple 4-Step Process',
      content: [
        {
          type: 'steps',
          items: [
            {
              number: 1,
              title: 'Blood Draw',
              description: 'Collect 20mL of patient blood via venipuncture (standard blood draw)'
            },
            {
              number: 2,
              title: 'Centrifugation',
              description: 'Process blood in ActiGraft centrifuge for 13 minutes to separate platelets'
            },
            {
              number: 3,
              title: 'Activation',
              description: 'Add activating reagent to create platelet-rich plasma gel'
            },
            {
              number: 4,
              title: 'Application',
              description: 'Apply gel directly to wound bed and cover with appropriate dressing'
            }
          ]
        },
        {
          type: 'note',
          value: 'Total processing time: <15 minutes from blood draw to application'
        }
      ]
    },

    // Slide 5: Clinical Benefits
    {
      type: 'content',
      title: 'Clinical Benefits & Outcomes',
      content: [
        {
          type: 'stats',
          items: [
            {
              stat: '70-80%',
              label: 'Wound Closure Rates',
              description: 'In chronic diabetic foot ulcers and venous leg ulcers'
            },
            {
              stat: '12-16 weeks',
              label: 'Average Time to Closure',
              description: 'With weekly ActiGraft applications'
            },
            {
              stat: '85%+',
              label: 'Limb Salvage Rate',
              description: 'In diabetic foot ulcer patients at risk for amputation'
            }
          ]
        },
        {
          type: 'bullets',
          title: 'Additional Benefits:',
          items: [
            'Reduces infection rates through concentrated antimicrobial proteins',
            'Accelerates granulation tissue formation',
            'Promotes angiogenesis and wound bed preparation',
            'Cost-effective alternative to skin substitutes and biologics',
            'Improves patient quality of life by reducing pain and dressing changes'
          ]
        }
      ]
    },

    // Slide 6: Indications & Contraindications
    {
      type: 'content',
      title: 'Indications & Contraindications',
      content: [
        {
          type: 'two-column',
          left: {
            title: 'Indications',
            icon: '✓',
            color: NIGHTINGALE.green.core,
            items: [
              'Diabetic foot ulcers',
              'Venous leg ulcers',
              'Pressure ulcers (Stage III-IV)',
              'Arterial ulcers (with adequate perfusion)',
              'Surgical wounds with delayed healing',
              'Traumatic wounds'
            ]
          },
          right: {
            title: 'Contraindications',
            icon: '✗',
            color: NIGHTINGALE.red.core,
            items: [
              'Active cancer at wound site',
              'Platelet disorders or low platelet count',
              'Active infection requiring systemic antibiotics',
              'Osteomyelitis (until treated)',
              'Known allergy to sodium citrate',
              'Pregnancy (use clinical judgment)'
            ]
          }
        }
      ]
    },

    // Slide 7: Training & Resources from Nightingale
    {
      type: 'content',
      title: 'Nightingale BioTech Training & Support',
      subtitle: 'Comprehensive Resources for Clinical Success',
      content: [
        {
          type: 'resources',
          items: [
            {
              category: 'Clinical Training',
              icon: '📚',
              offerings: [
                'In-person hands-on training sessions',
                'Virtual webinar training (CE credits available)',
                'Step-by-step procedure videos',
                'Clinical protocol guides'
              ]
            },
            {
              category: 'Educational Materials',
              icon: '📖',
              offerings: [
                'Patient education handouts',
                'Provider quick reference guides',
                'Evidence-based literature reviews',
                'Case study library'
              ]
            },
            {
              category: 'Ongoing Support',
              icon: '💬',
              offerings: [
                '24/7 clinical support hotline',
                'Dedicated territory representatives',
                'Quarterly best practice webinars',
                'Peer network and case consultations'
              ]
            },
            {
              category: 'Reimbursement Support',
              icon: '💳',
              offerings: [
                'CPT code guidance and billing resources',
                'Insurance verification assistance',
                'Prior authorization support',
                'Documentation templates'
              ]
            }
          ]
        }
      ]
    },

    // Slide 8: Why ActiGraft vs Competitors
    {
      type: 'content',
      title: 'Why ActiGraft® Outperforms Alternatives',
      content: [
        {
          type: 'comparison-table',
          headers: ['Feature', 'ActiGraft®', 'Skin Substitutes', 'Allograft PRP', 'Standard Care'],
          rows: [
            {
              feature: 'Autologous',
              actigraft: '✓ Yes',
              skinSub: '✗ No',
              allograft: '✗ No',
              standard: 'N/A'
            },
            {
              feature: 'Point-of-Care',
              actigraft: '✓ <15 min',
              skinSub: '✗ Shipped',
              allograft: '✗ Lab required',
              standard: '✓ Immediate'
            },
            {
              feature: 'Cost per Treatment',
              actigraft: '$800-1,200',
              skinSub: '$2,000-5,000',
              allograft: '$1,500-3,000',
              standard: '$50-200'
            },
            {
              feature: 'Growth Factor Conc.',
              actigraft: '✓ 4-6x',
              skinSub: '✓ Variable',
              allograft: '✓ 3-4x',
              standard: '✗ Baseline'
            },
            {
              feature: 'Rejection Risk',
              actigraft: '✓ Zero',
              skinSub: '⚠ Possible',
              allograft: '⚠ Possible',
              standard: '✓ Zero'
            },
            {
              feature: 'Closure Rate (DFU)',
              actigraft: '70-80%',
              skinSub: '60-70%',
              allograft: '55-65%',
              standard: '30-40%'
            }
          ]
        }
      ]
    },

    // Slide 9: Reimbursement & Economics
    {
      type: 'content',
      title: 'Reimbursement & Practice Economics',
      content: [
        {
          type: 'reimbursement',
          cptCode: '0481T',
          description: 'Autologous platelet rich plasma with characterization and use',
          medicareRate: '$786',
          frequency: 'Weekly applications typical (up to 12 weeks)'
        },
        {
          type: 'bullets',
          title: 'Economic Benefits:',
          items: [
            'Prevents costly amputations ($50,000+ per lower extremity amputation)',
            'Reduces hospital readmissions and emergency department visits',
            'Decreases need for expensive biologics and skin substitutes',
            'Shortens overall treatment duration and resource utilization',
            'Improves patient outcomes leading to better quality metrics'
          ]
        },
        {
          type: 'highlight',
          value: 'Medicare covers ActiGraft for eligible chronic wounds. Most commercial payers also provide coverage with medical necessity documentation.'
        }
      ]
    },

    // Slide 10: Success Stories
    {
      type: 'content',
      title: 'Clinical Success Stories',
      subtitle: 'Real-World Outcomes',
      content: [
        {
          type: 'case-studies',
          cases: [
            {
              title: 'Case 1: Diabetic Foot Ulcer',
              patient: '68-year-old male, Type 2 DM, 4cm plantar DFU',
              baseline: 'Failed standard care for 6 months, at risk for amputation',
              treatment: 'Weekly ActiGraft applications × 10 weeks',
              outcome: '100% wound closure at 14 weeks, limb salvaged',
              highlight: 'Patient avoided below-knee amputation'
            },
            {
              title: 'Case 2: Venous Leg Ulcer',
              patient: '72-year-old female, venous insufficiency, 6cm medial malleolus ulcer',
              baseline: 'Failed compression therapy and standard dressings × 8 months',
              treatment: 'Weekly ActiGraft + compression × 8 weeks',
              outcome: '95% wound closure at 12 weeks, significant pain reduction',
              highlight: 'Returned to daily activities'
            },
            {
              title: 'Case 3: Pressure Ulcer',
              patient: '81-year-old male, Stage IV sacral pressure ulcer',
              baseline: 'Post-surgical wound with delayed healing, 3cm deep',
              treatment: 'Bi-weekly ActiGraft applications × 12 weeks',
              outcome: 'Complete wound closure at 16 weeks, no recurrence at 6 months',
              highlight: 'Avoided flap surgery'
            }
          ]
        }
      ]
    },

    // Slide 11: Getting Started
    {
      type: 'content',
      title: 'Getting Started with ActiGraft®',
      subtitle: 'Simple Implementation in Your Practice',
      content: [
        {
          type: 'steps',
          items: [
            {
              number: 1,
              title: 'Contact Nightingale BioTech',
              description: 'Reach out to your territory representative or call 1-800-XXX-XXXX'
            },
            {
              number: 2,
              title: 'Schedule Training',
              description: 'Complete 2-hour in-person or virtual training (CE credits provided)'
            },
            {
              number: 3,
              title: 'Order Equipment',
              description: 'Receive ActiGraft centrifuge and initial supply of disposable kits'
            },
            {
              number: 4,
              title: 'Begin Treating Patients',
              description: 'Start with appropriate candidates and document outcomes'
            },
            {
              number: 5,
              title: 'Ongoing Support',
              description: 'Access 24/7 clinical support and continuous education resources'
            }
          ]
        },
        {
          type: 'cta',
          title: 'Ready to Transform Your Wound Care Practice?',
          action: 'Contact us today to schedule your training and get started with ActiGraft®',
          contact: 'info@nightingalebiotech.com | 1-800-XXX-XXXX'
        }
      ]
    },

    // Slide 12: Contact & Resources
    {
      type: 'closing',
      title: 'Thank You',
      subtitle: 'Questions?',
      contact: [
        {
          label: 'Nightingale BioTech',
          items: [
            'Website: www.nightingalebiotech.com',
            'Email: info@nightingalebiotech.com',
            'Phone: 1-800-XXX-XXXX',
            'Training Portal: training.nightingalebiotech.com'
          ]
        }
      ],
      footer: 'ActiGraft® is a registered trademark. All clinical data and outcomes are based on published literature and real-world evidence.'
    }
  ]

  const renderSlideContent = (slide) => {
    switch (slide.type) {
      case 'title':
        return (
          <div className="slide-title-content">
            <div className="title-logo">
              <img src={nbLogoWhite} alt="Nightingale BioTech" />
            </div>
            <h1 className="slide-main-title">{slide.title}</h1>
            <h2 className="slide-subtitle">{slide.subtitle}</h2>
            <p className="slide-tagline">{slide.tagline}</p>
            <div className="slide-footer-text">{slide.footer}</div>
          </div>
        )

      case 'closing':
        return (
          <div className="slide-closing-content">
            <h1 className="slide-main-title">{slide.title}</h1>
            <h2 className="slide-subtitle">{slide.subtitle}</h2>
            <div className="contact-info">
              {slide.contact.map((section, idx) => (
                <div key={idx} className="contact-section">
                  <h3>{section.label}</h3>
                  {section.items.map((item, i) => (
                    <p key={i}>{item}</p>
                  ))}
                </div>
              ))}
            </div>
            <div className="slide-footer-text">{slide.footer}</div>
          </div>
        )

      case 'content':
      default:
        return (
          <div className="slide-content-wrapper">
            <h1 className="slide-title">{slide.title}</h1>
            {slide.subtitle && <h2 className="slide-subtitle-sm">{slide.subtitle}</h2>}
            <div className="slide-content">
              {slide.content.map((block, idx) => renderContentBlock(block, idx))}
            </div>
          </div>
        )
    }
  }

  const renderContentBlock = (block, idx) => {
    switch (block.type) {
      case 'text':
        return <p key={idx} className="content-text">{block.value}</p>

      case 'bullets':
        return (
          <div key={idx} className="content-bullets">
            {block.title && <h3>{block.title}</h3>}
            <ul>
              {block.items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        )

      case 'highlight':
        return (
          <div key={idx} className="content-highlight">
            {block.value}
          </div>
        )

      case 'comparison':
        return (
          <div key={idx} className="content-comparison">
            <h3>{block.title}</h3>
            <div className="comparison-grid">
              {block.items.map((item, i) => (
                <div key={i} className="comparison-item">
                  <div className="comparison-icon">{item.icon}</div>
                  <h4>{item.feature}</h4>
                  <p>{item.benefit}</p>
                </div>
              ))}
            </div>
          </div>
        )

      case 'steps':
        return (
          <div key={idx} className="content-steps">
            {block.items.map((step, i) => (
              <div key={i} className="step-item">
                <div className="step-number">{step.number}</div>
                <div className="step-content">
                  <h4>{step.title}</h4>
                  <p>{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        )

      case 'note':
        return (
          <div key={idx} className="content-note">
            ⚠️ {block.value}
          </div>
        )

      case 'stats':
        return (
          <div key={idx} className="content-stats">
            {block.items.map((stat, i) => (
              <div key={i} className="stat-item">
                <div className="stat-number">{stat.stat}</div>
                <div className="stat-label">{stat.label}</div>
                <p className="stat-description">{stat.description}</p>
              </div>
            ))}
          </div>
        )

      case 'two-column':
        return (
          <div key={idx} className="content-two-column">
            <div className="column" style={{ borderColor: block.left.color }}>
              <h3 style={{ color: block.left.color }}>
                <span className="column-icon">{block.left.icon}</span>
                {block.left.title}
              </h3>
              <ul>
                {block.left.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="column" style={{ borderColor: block.right.color }}>
              <h3 style={{ color: block.right.color }}>
                <span className="column-icon">{block.right.icon}</span>
                {block.right.title}
              </h3>
              <ul>
                {block.right.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        )

      case 'resources':
        return (
          <div key={idx} className="content-resources">
            {block.items.map((resource, i) => (
              <div key={i} className="resource-item">
                <div className="resource-header">
                  <span className="resource-icon">{resource.icon}</span>
                  <h4>{resource.category}</h4>
                </div>
                <ul>
                  {resource.offerings.map((offering, j) => (
                    <li key={j}>{offering}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )

      case 'comparison-table':
        return (
          <div key={idx} className="content-comparison-table">
            <table>
              <thead>
                <tr>
                  {block.headers.map((header, i) => (
                    <th key={i}>{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {block.rows.map((row, i) => (
                  <tr key={i}>
                    <td className="feature-cell">{row.feature}</td>
                    <td className="highlight-cell">{row.actigraft}</td>
                    <td>{row.skinSub}</td>
                    <td>{row.allograft}</td>
                    <td>{row.standard}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )

      case 'reimbursement':
        return (
          <div key={idx} className="content-reimbursement">
            <div className="reimbursement-card">
              <div className="reimbursement-header">
                <span className="cpt-label">CPT Code:</span>
                <span className="cpt-code">{block.cptCode}</span>
              </div>
              <p className="reimbursement-description">{block.description}</p>
              <div className="reimbursement-details">
                <div className="detail-item">
                  <span className="detail-label">Medicare Rate:</span>
                  <span className="detail-value">{block.medicareRate}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Frequency:</span>
                  <span className="detail-value">{block.frequency}</span>
                </div>
              </div>
            </div>
          </div>
        )

      case 'case-studies':
        return (
          <div key={idx} className="content-case-studies">
            {block.cases.map((caseStudy, i) => (
              <div key={i} className="case-study">
                <h4>{caseStudy.title}</h4>
                <p><strong>Patient:</strong> {caseStudy.patient}</p>
                <p><strong>Baseline:</strong> {caseStudy.baseline}</p>
                <p><strong>Treatment:</strong> {caseStudy.treatment}</p>
                <p><strong>Outcome:</strong> {caseStudy.outcome}</p>
                <div className="case-highlight">{caseStudy.highlight}</div>
              </div>
            ))}
          </div>
        )

      case 'cta':
        return (
          <div key={idx} className="content-cta">
            <h3>{block.title}</h3>
            <p>{block.action}</p>
            <div className="cta-contact">{block.contact}</div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="presentation-container">
      {/* Screen View - Interactive Navigation */}
      <div className="screen-view">
        <div className="presentation-header">
          <div className="header-left">
            <button onClick={handlePrint} className="print-button">
              🖨️ Print Full Deck
            </button>
          </div>
          <div className="header-center">
            Slide {currentSlide + 1} of {slides.length}
          </div>
          <div className="header-right">
            <img src={nbLogoWhite} alt="Nightingale BioTech" style={{ height: 24 }} />
          </div>
        </div>

        <div className="slide-display">
          <div className="slide">
            {renderSlideContent(slides[currentSlide])}
          </div>
        </div>

        <div className="presentation-navigation">
          <button
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className="nav-button"
          >
            ← Previous
          </button>
          <div className="slide-indicators">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goToSlide(idx)}
                className={`indicator ${idx === currentSlide ? 'active' : ''}`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
          <button
            onClick={nextSlide}
            disabled={currentSlide === slides.length - 1}
            className="nav-button"
          >
            Next →
          </button>
        </div>
      </div>

      {/* Print View - All Slides */}
      <div className="print-view" ref={printRef}>
        {slides.map((slide, idx) => (
          <div key={idx} className="print-slide">
            {renderSlideContent(slide)}
            <div className="print-slide-number">
              Slide {idx + 1} of {slides.length}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ActiGraftPresentationDeck
