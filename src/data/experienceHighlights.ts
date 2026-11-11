// Highlights drawn from the existing experience descriptions and achievements.
interface ExperienceHighlight {
  value?: string;
  unit?: string;
  qualifier?: string;
  label: string;
  context: string;
  contributions: [string, string];
}
export const experienceHighlights: Record<string, ExperienceHighlight> = {
  "y-meadows": {
    value: "20", unit: "%", qualifier: "Approximately",
    label: "Less time to go live",
    context: "Helped reduce time-to-go-live by translating customer requirements into clear tasks and surfacing dependencies early.",
    contributions: ["Owned onboarding configuration and integration checks so customers entered UAT prepared.", "Built runbooks and configuration templates to make deployments repeatable and easier to support."],
  },
  "qalienai": {
    value: "3",
    label: "Media formats, one extraction pipeline",
    context: "Unified text extraction from images, audio, and video through OCR and speech recognition to support structured compliance assessments.",
    contributions: ["Connected OCR, speech recognition, and regulatory retrieval in one content analysis workflow.", "Added confidence scoring, fallback logic, and job orchestration for a multi-tenant SaaS platform."],
  },
  "gallox": {
    value: "40", unit: "%",
    label: "Less manual debugging time",
    context: "Built real-time dashboards and automated anomaly detection for semiconductor power device testing.",
    contributions: ["Automated characterization workflows for high-voltage MOSFETs and IGBTs.", "Combined multi-threaded data acquisition with visualization so engineers could identify issues earlier."],
  },
  "cornell-cals": {
    label: "Crop data into climate insights",
    context: "Built geospatial data pipelines to study patterns in agricultural greenhouse gas emissions.",
    contributions: ["Standardized crop emissions data from multiple sources using Python and GeoPandas.", "Applied clustering and predictive analysis, working with researchers to validate findings."],
  },
  "colentai": {
    value: "92", unit: "%",
    label: "Skill classification accuracy",
    context: "Built an automated skill taxonomy generator using TF-IDF, named entity recognition, and BERT embeddings.",
    contributions: ["Used semantic similarity to organize skills into a structured taxonomy.", "Developed API data acquisition pipelines and tuned language models to improve training workflows."],
  },
  "cardinality-ai": {
    label: "Raw data into model-ready inputs",
    context: "Built ingestion and transformation pipelines to prepare structured datasets for machine learning.",
    contributions: ["Used SQL window functions, CTEs, and stored procedures to organize large datasets.", "Applied MATLAB signal processing and spectral analysis to support data-driven policy recommendations."],
  },
};
