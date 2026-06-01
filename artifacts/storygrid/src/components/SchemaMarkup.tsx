export default function SchemaMarkup() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "serviceType": "Podcast Growth System",
        "provider": {
          "@type": "MediaBusiness",
          "name": "StoryGrid Media",
          "url": "https://storygridmedia.in/"
        },
        "description": "End-to-end studio setup guidance, multi-cam video editing, professional audio mixing & mastering, thumbnail design, and multi-platform distribution.",
        "offers": {
          "@type": "Offer",
          "description": "Ready in 14 Days setup and optimization."
        }
      },
      {
        "@type": "Service",
        "serviceType": "YouTube Management",
        "provider": {
          "@type": "MediaBusiness",
          "name": "StoryGrid Media",
          "url": "https://storygridmedia.in/"
        },
        "description": "Comprehensive channel strategy, script structuring, high-retention video editing, thumbnail A/B testing, and growth optimization."
      },
      {
        "@type": "Service",
        "serviceType": "Founder Brand Engine",
        "provider": {
          "@type": "MediaBusiness",
          "name": "StoryGrid Media",
          "url": "https://storygridmedia.in/"
        },
        "description": "Daily content systems, viral hook scripting, dynamic pacing visual editing, and multi-channel content repurposing."
      }
    ]
  };

  return (
    <script type="application/ld+json">
      {JSON.stringify(serviceSchema)}
    </script>
  );
}
