import React from 'react';
import InfoLayout from './InfoLayout';

export default function GdprPage({ onBack }) {
  return (
    <InfoLayout title="GDPR" onBack={onBack}>
      <p className="infoP">
        Här kommer vi lägga den riktiga integritetspolicyn och information om hur vi behandlar personuppgifter.
      </p>
      <p className="infoP">Just nu är detta en placeholder eftersom appen körs med mockdata.</p>
    </InfoLayout>
  );
}
