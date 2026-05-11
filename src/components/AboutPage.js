import React from 'react';
import InfoLayout from './InfoLayout';
import arya from '../images/co_founder/arya.png';
import lamo from '../images/co_founder/lamo.png';

export default function AboutPage({ onBack, onContact, onGoToAnalysis }) {
  return (
    <InfoLayout title="Om oss" onBack={onBack}>
      <div className="aboutArticle">
        <p className="aboutLead">Varje år säljs över en miljon begagnade bilar i Sverige.</p>

        <p className="infoP">
          För många är bilköpet en av de största privata affärerna man gör, men samtidigt en av de mest osäkra.
        </p>

        <p className="infoP">
          Priser varierar kraftigt, annonser kan vara missvisande och dolda problem upptäcks ofta först efter köpet.
          Många köpare saknar tid, erfarenhet eller verktyg för att göra en trygg bedömning innan affären genomförs.
        </p>

        <p className="infoP">
          Det var därför vi skapade <strong>Bilköpshjälpen</strong>.
        </p>

        <p className="infoP">
          Vi använder teknik, dataanalys och strukturerad granskning för att hjälpa privatpersoner fatta bättre beslut vid
          bilköp. Vår tjänst gör det enklare att förstå om en bil är rimligt prissatt, vilka risker som kan finnas och vad
          som bör kontrolleras innan köp.
        </p>

        <h2 className="aboutH2">Vårt mål</h2>
        <p className="infoP">Att ge vanliga bilköpare samma informationsfördel som professionella aktörer.</p>
        <p className="infoP">
          Vi vill minska risken för felköp, onödiga kostnader och osäkra affärer, och göra bilköp tryggare, smartare och
          mer transparenta.
        </p>

        <h2 className="aboutH2">Vad vi hjälper dig med</h2>
        <ul className="aboutList">
          <li>Vi analyserar den specifika bilen du är intresserad av</li>
          <li>Vi bedömer hur väl bilen passar dina behov och förväntningar</li>
          <li>Vi identifierar bilens viktigaste styrkor och svagheter</li>
          <li>Vi lyfter risker och saker du bör känna till innan köp</li>
          <li>Vi tar fram en anpassad checklista med frågor till säljaren</li>
          <li>Vi hjälper dig förstå om bilen är rätt val för just dig</li>
        </ul>
      </div>

      <h2 className="aboutH2">Grundarna</h2>
      <div className="aboutFounders">
        <div className="aboutFounderCard">
          <img className="aboutFounderPhoto" src={arya} alt="Porträtt på Arya Eisa" />
          <div>
            <div className="aboutFounderName">Arya Eisa</div>
            <div className="aboutFounderRole">Medgrundare, Dataingenjör</div>
            <div className="aboutFounderBio">Specialiserad på dataanalys, automatisering och digitala beslutsstöd.</div>
          </div>
        </div>

        <div className="aboutFounderCard">
          <img className="aboutFounderPhoto" src={lamo} alt="Porträtt på Lamo Kouravand" />
          <div>
            <div className="aboutFounderName">Lamo Kouravand</div>
            <div className="aboutFounderRole">Medgrundare, Solution Architect & AI-expert</div>
            <div className="aboutFounderBio">Specialiserad på systemdesign, tekniklösningar och användarupplevelse.</div>
          </div>
        </div>
      </div>

      <div className="aboutArticle">
        <h2 className="aboutH2">Varför vi gör detta</h2>
        <p className="infoP">Vi tror att bilköp inte ska bygga på tur. Det ska bygga på fakta.</p>

        <h2 className="aboutH2">Nästa steg</h2>
        <p className="infoP">Analysera en bil idag och fatta ett tryggare beslut innan du köper.</p>
      </div>

      <div className="aboutCta">
        <div className="aboutCtaRow">
          {typeof onGoToAnalysis === 'function' ? (
            <button className="aboutCtaBtn" type="button" onClick={onGoToAnalysis}>
              Analysera en bil
            </button>
          ) : null}
          <button className="aboutCtaBtn aboutCtaBtn--ghost" type="button" onClick={onContact}>
            Kontakta oss
          </button>
        </div>
      </div>
    </InfoLayout>
  );
}
