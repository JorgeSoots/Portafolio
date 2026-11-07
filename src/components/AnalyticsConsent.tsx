import { useEffect, useState } from "react";
import { Check, X } from "lucide-react";
import {
  getAnalyticsConsent,
  initializeAnalytics,
  isAnalyticsConfigured,
  setAnalyticsConsent,
} from "../lib/analytics";

export default function AnalyticsConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!isAnalyticsConfigured()) return;
    const consent = getAnalyticsConsent();
    if (consent === "granted") initializeAnalytics();
    else if (consent === null) setVisible(true);
  }, []);

  if (!visible || !isAnalyticsConfigured()) return null;

  return (
    <aside className="dc-analytics-consent" aria-label="Preferencias de medición">
      <div className="dc-analytics-consent-copy">
        <span>PRIVACY / ANALYTICS</span>
        <p>Este sitio puede medir visitas e interacciones para mejorar la experiencia. La medición solo se activa si la aceptas.</p>
      </div>
      <div className="dc-analytics-consent-actions">
        <button type="button" className="dc-analytics-accept" onClick={() => { setAnalyticsConsent("granted"); setVisible(false); }}>
          <Check size={14} /> Aceptar
        </button>
        <button type="button" className="dc-analytics-reject" onClick={() => { setAnalyticsConsent("denied"); setVisible(false); }}>
          <X size={14} /> Rechazar
        </button>
      </div>
    </aside>
  );
}
