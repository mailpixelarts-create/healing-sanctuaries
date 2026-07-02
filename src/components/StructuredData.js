/**
 * JSON-LD Structured Data
 * SEO authority for medical pages
 */
export function addStructuredData(data) {
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    "name": data.name,
    "description": data.description,
    "medicalAudience": {
      "@type": "PatientAudience",
      "audienceType": "Patient"
    },
    "publisher": {
      "@type": "Organization",
      "name": data.name
    },
    ...data
  });
  document.head.appendChild(script);
}
