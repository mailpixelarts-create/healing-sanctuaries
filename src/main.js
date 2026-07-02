import './styles/meta-layer.css';
import { initFirstTimeVisitor } from './components/Modal.js';
import { initOutcomeTracker } from './components/Tracker.js';
import { initSkepticsCorner } from './components/Skeptics.js';
import { initEmergencyReset } from './components/Emergency.js';
import { initDetoxMode } from './components/Detox.js';
import { initTranslation } from './components/Translation.js';
import { addStructuredData } from './components/StructuredData.js';

// Initialize all meta-layers
document.addEventListener('DOMContentLoaded', () => {
  initFirstTimeVisitor();
  initSkepticsCorner();
  initDetoxMode();
  initEmergencyReset();
  initOutcomeTracker();
  initTranslation();
  
  // Add structured data for homepage
  addStructuredData({
    name: 'Healing Sanctuaries',
    description: '14 unique cinematic healing modality websites with dark aesthetic'
  });
});

// Export for use in individual sanctuary pages
export { initOutcomeTracker, addStructuredData };
