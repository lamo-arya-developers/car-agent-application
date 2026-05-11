import React from 'react';
import InfoLayout from './InfoLayout';
import signupImg from '../images/guide/signup.png';
import kopprofileImg from '../images/guide/kopprofile.png';
import analyseImg from '../images/guide/analyse.png';
import noRegImg from '../images/guide/ej-regnr.png';
import analysedImg from '../images/guide/analysed.png';
import logo from '../images/Logo_no_background.png';

export default function GuidePage({ onBack }) {
  return (
    <InfoLayout title="Guide" onBack={onBack}>
      <p className="infoP guideIntro">
        Här är en snabb guide som visar hur Bilköpshjälpen fungerar, steg för steg.
      </p>

      <div className="guideSteps">
        <div className="guideStepCard">
          <div className="guideStepHeader">
            <div className="guideStepNum">1</div>
            <div className="guideStepTitle">Skapa konto och logga in</div>
          </div>
          <p className="guideStepText">
            Första steget är att du skapar konto och loggar in.
          </p>
          <div className="guideImgWrap">
            <img className="guideImg" src={signupImg} alt="Skapa konto och logga in" />
            <div className="guideCaption">Steg 1, inloggning</div>
          </div>
        </div>

        <div className="guideStepCard">
          <div className="guideStepHeader">
            <div className="guideStepNum">2</div>
            <div className="guideStepTitle">Fyll i din köpsprofil</div>
          </div>
          <p className="guideStepText">
            Efter det fyller du i din köpsprofil. Det gör du en gång, men du kan alltid gå tillbaka och ändra om dina
            behov skulle förändras.
          </p>
          <p className="guideStepText">
            Informationen används längre fram och hjälper vår AI att utgå från din köpsprofil vid all analys.
          </p>
          <div className="guideImgWrap">
            <img className="guideImg" src={kopprofileImg} alt="Köpsprofil" />
            <div className="guideCaption">Steg 2, köpsprofil</div>
          </div>
        </div>

        <div className="guideStepCard">
          <div className="guideStepHeader">
            <div className="guideStepNum">3</div>
            <div className="guideStepTitle">Välj registreringsnummer eller fyll i själv</div>
          </div>
          <p className="guideStepText">
            Därefter kommer du till analys-steget. Om du har registreringsnummer använder du det.
          </p>
          <p className="guideStepText">
            Då hämtar vi fakta om bilen från våra underleverantörer, till exempel besiktningar, motorvolym, bränsle,
            typ av växellåda och om det är automat, typ av automatlåda, mätarställning och mer.
          </p>
          <div className="guideImgWrap">
            <img className="guideImg" src={analyseImg} alt="Analys med registreringsnummer" />
            <div className="guideCaption">Steg 3A, analys med registreringsnummer</div>
          </div>

          <p className="guideStepText">
            Om bilen inte har registreringsnummer, eller om det inte syns, klickar du på att du inte har
            registreringsnummer och fyller i specifikationerna snabbt själv.
          </p>
          <div className="guideImgWrap">
            <img className="guideImg" src={noRegImg} alt="Ingen registreringsnummer, fyll i själv" />
            <div className="guideCaption">Steg 3B, fyll i själv när regnummer saknas</div>
          </div>
        </div>

        <div className="guideStepCard">
          <div className="guideStepHeader">
            <div className="guideStepNum">4</div>
            <div className="guideStepTitle">Analysera bilen</div>
          </div>
          <p className="guideStepText">
            Sista steget är att du klickar på analys och analyserar bilen. Du får fram om bilen matchar dina behov eller
            inte, och om ja eller nej, varför. Du får styrkor och svagheter, viktiga frågor att ställa säljaren, risker
            och mycket mer.
          </p>
          <p className="guideStepText">
            En analys som kan ta mycket längre tid att göra manuellt kan du göra på cirka en minut.
          </p>
          <div className="guideImgWrap">
            <img className="guideImg" src={analysedImg} alt="Analysresultat" />
            <div className="guideCaption">Steg 4, resultatet av analysen</div>
          </div>
        </div>
      </div>

      <div className="guideOutro">
        <p className="infoP">
          Att köpa bil är en upplevelse och för många en dröm. Ett fel val kan omvandla den fina drömmen till en
          mardröm. Vi vill att du ska hålla dig till drömmen och njuta av din bil som är perfekt för dina behov.
        </p>
        <div className="guideLogoWrap">
          <img className="guideLogo" src={logo} alt="bilköpshjälpen" />
        </div>
      </div>
    </InfoLayout>
  );
}
