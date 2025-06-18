// src/AdoptionProcess.js
import React, { useState } from "react"
import "./AdoptionProcess.css"

function AdoptionProcess() {
  const [openFAQ, setOpenFAQ] = useState(null)

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index)
  }

  const faqs = [
    {
      question: "Do I need to pay to adopt?",
      answer: "Some adoptions may involve a small fee to support pet care, but many are free. Details are listed with each pet."
    },
    {
      question: "Can I return a pet if it doesn’t work out?",
      answer: "We offer a grace period where you can return the pet if it's not the right fit. Our priority is their well-being."
    },
    {
      question: "How long does the process take?",
      answer: "It typically takes 2-5 days depending on the pet owner’s response and verification steps."
    }
  ]

  return (
    <div className="adoption-process">
      <h2>🐾 Our Adoption Process</h2>
      <p className="intro">We make sure each pet is matched with a loving and responsible home. Here's how it works:</p>

      <div className="process-steps">
        {/* Your existing 5 steps here */}
      </div>

      <h2>🗣️ What Our Users Say</h2>
      <div className="testimonials">
        <div className="testimonial">
          <p>“Adopting Luna was the best decision ever! The platform made it so easy and transparent.”</p>
          <span>- Miriam W.</span>
        </div>
        <div className="testimonial">
          <p>“I loved how ethical and smooth the process was. PetZone really cares.”</p>
          <span>- John O.</span>
        </div>
      </div>

      <h2>❓ Frequently Asked Questions</h2>
      <div className="faq-section">
        {faqs.map((item, index) => (
          <div
            key={index}
            className={`faq-item ${openFAQ === index ? "open" : ""}`}
            onClick={() => toggleFAQ(index)}
          >
            <div className="faq-question">{item.question}</div>
            {openFAQ === index && <div className="faq-answer">{item.answer}</div>}
          </div>
        ))}
      </div>
    </div>
  )
}

export default AdoptionProcess
