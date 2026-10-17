import { useState } from "react";

/* ============================================================
   Vela Salud USA — Fase 0 (educación y navegación)
   Hub geográfico del universo Vela Salud
   React + Vite · un solo archivo · sin dependencias extra
   ============================================================ */

// TODO: reemplazar con el link real de Gumroad cuando Mi Cita Bilingüe esté publicada
const MI_CITA_URL = "/mi-cita.html";

const UNIVERSE = [
  { name: "Vela Venezuela", url: "https://velavenezuela.vercel.app" },
  { name: "Vela Fertility", url: "https://vela-fertility.vercel.app" },
  { name: "Vela ORL", url: "https://vela-orl-red.vercel.app" },
  { name: "Vela Matute Institute", url: "https://vela-matute-institute.vercel.app" },
];

const UI = {
  es: {
    nav: [
      ["donde", "¿A dónde voy?"],
      ["seguro", "Tu seguro"],
      ["derechos", "Tus derechos"],
      ["prevencion", "Prevención"],
      ["calor", "Trabajo y calor"],
      ["cita", "Tu cita"],
      ["nosotros", "Quiénes somos"],
    ],
    langBtn: "English",
    heroTitle: "Tu salud en Estados Unidos, explicada en tu idioma.",
    heroSub:
      "Información clara para familias hispanas del suroeste de Florida: a dónde ir, cuánto cuesta, qué derechos tienes y cómo prepararte para tu cita.",
    routerTitle: "¿Qué está pasando?",
    routerHint: "Elige la situación que más se parece a la tuya.",
    routerBack: "Elegir otra situación",
    seguroTitle: "Entiende tu seguro",
    seguroSub: "Las palabras que aparecen en tu tarjeta, tu factura y las cartas del seguro.",
    coberturaTitle: "Cómo conseguir cobertura",
    derechosTitle: "Tus derechos como paciente",
    derechosSub: "Puedes pedir estas cosas en voz alta. Están a tu favor.",
    prevTitle: "Chequeos de prevención para adultos",
    prevSub:
      "Recomendaciones generales para adultos sin síntomas, según el U.S. Preventive Services Task Force. Tu médico puede indicarte algo distinto según tu historia.",
    prevCols: ["Chequeo", "¿Para quién?"],
    calorTitle: "Trabajo y calor",
    calorSub:
      "En el campo, en la construcción y en los viveros, el calor de Florida es un riesgo real. Reconoce las señales a tiempo.",
    citaTitle: "Prepárate para tu cita",
    citaSub: "Una buena preparación te ayuda a aprovechar los pocos minutos con el médico.",
    miCitaTitle: "Mi Cita Bilingüe",
    miCitaText:
      "Escribe tus síntomas, medicinas y preguntas en español y llévalos a la consulta también en inglés.",
    miCitaBtn: "Conocer Mi Cita Bilingüe",
    nosotrosTitle: "Quiénes somos",
    universeTitle: "El universo Vela Salud",
    footer:
      "Vela Salud USA ofrece información educativa y orientación. No ofrecemos consultas médicas, diagnósticos ni recetas, y esta información no sustituye la atención de un profesional de salud. En una emergencia, llama al 911.",
  },
  en: {
    nav: [
      ["donde", "Where do I go?"],
      ["seguro", "Your insurance"],
      ["derechos", "Your rights"],
      ["prevencion", "Prevention"],
      ["calor", "Work & heat"],
      ["cita", "Your visit"],
      ["nosotros", "About us"],
    ],
    langBtn: "Español",
    heroTitle: "Your health in the United States, explained in your language.",
    heroSub:
      "Clear information for Hispanic families in Southwest Florida: where to go, what it costs, what your rights are and how to prepare for your visit.",
    routerTitle: "What's going on?",
    routerHint: "Pick the situation that's closest to yours.",
    routerBack: "Pick another situation",
    seguroTitle: "Understand your insurance",
    seguroSub: "The words on your card, your bill and your insurance letters.",
    coberturaTitle: "How to get coverage",
    derechosTitle: "Your rights as a patient",
    derechosSub: "You can ask for these things out loud. They work in your favor.",
    prevTitle: "Preventive checkups for adults",
    prevSub:
      "General recommendations for adults without symptoms, from the U.S. Preventive Services Task Force. Your doctor may advise something different based on your history.",
    prevCols: ["Checkup", "Who is it for?"],
    calorTitle: "Work and heat",
    calorSub:
      "In the fields, in construction and in nurseries, Florida heat is a real risk. Recognize the signs in time.",
    citaTitle: "Get ready for your visit",
    citaSub: "Good preparation helps you make the most of your few minutes with the doctor.",
    miCitaTitle: "Mi Cita Bilingüe",
    miCitaText:
      "Write your symptoms, medicines and questions in Spanish and bring them to your visit in English too.",
    miCitaBtn: "Learn about Mi Cita Bilingüe",
    nosotrosTitle: "About us",
    universeTitle: "The Vela Salud universe",
    footer:
      "Vela Salud USA provides educational information and guidance. We do not offer medical visits, diagnoses or prescriptions, and this information does not replace care from a health professional. In an emergency, call 911.",
  },
};

const ROUTES = [
  {
    id: "911",
    urgent: true,
    q: {
      es: "Dolor de pecho, falta de aire, señales de derrame (cara caída, brazo débil, habla rara) o sangrado que no para",
      en: "Chest pain, trouble breathing, stroke signs (face drooping, arm weakness, slurred speech) or bleeding that won't stop",
    },
    a: { es: "Llama al 911 ahora.", en: "Call 911 now." },
    d: {
      es: "No manejes tú. La sala de emergencias tiene que evaluarte y estabilizarte aunque no tengas seguro ni puedas pagar en ese momento.",
      en: "Don't drive yourself. The emergency room must evaluate and stabilize you even if you have no insurance or can't pay right then.",
    },
    action: { label: { es: "Llamar al 911", en: "Call 911" }, href: "tel:911" },
  },
  {
    id: "988",
    urgent: true,
    q: {
      es: "Estoy pensando en hacerme daño o estoy pasando por una crisis emocional",
      en: "I'm thinking about hurting myself or I'm going through an emotional crisis",
    },
    a: { es: "Llama o envía un texto al 988.", en: "Call or text 988." },
    d: {
      es: "Es gratis, atiende las 24 horas y puedes pedir ayuda en español. Si hay peligro inmediato, llama al 911.",
      en: "It's free, open 24 hours and you can ask for help in Spanish. If there's immediate danger, call 911.",
    },
    action: { label: { es: "Llamar al 988", en: "Call 988" }, href: "tel:988" },
  },
  {
    id: "poison",
    urgent: true,
    q: {
      es: "Alguien tragó o tocó algo tóxico: medicinas, químicos de limpieza o pesticidas",
      en: "Someone swallowed or touched something toxic: medicines, cleaning chemicals or pesticides",
    },
    a: { es: "Llama a Poison Control: 1-800-222-1222.", en: "Call Poison Control: 1-800-222-1222." },
    d: {
      es: "Es gratis, atiende las 24 horas y tiene intérpretes. Ten a mano el envase del producto. Si la persona no respira, convulsiona o no despierta, llama al 911.",
      en: "It's free, open 24 hours and has interpreters. Keep the product container handy. If the person isn't breathing, is seizing or won't wake up, call 911.",
    },
    action: { label: { es: "Llamar a Poison Control", en: "Call Poison Control" }, href: "tel:18002221222" },
  },
  {
    id: "urgentcare",
    q: {
      es: "Necesito atención hoy, pero no es grave: fiebre, una cortada que quizá necesite puntos, un esguince, ardor al orinar",
      en: "I need care today, but it isn't serious: fever, a cut that may need stitches, a sprain, burning when I pee",
    },
    a: { es: "Ve a un urgent care.", en: "Go to an urgent care." },
    d: {
      es: "Atienden sin cita y suelen costar mucho menos que la sala de emergencias. Si los síntomas empeoran, llama al 911.",
      en: "They see you without an appointment and usually cost much less than the emergency room. If symptoms get worse, call 911.",
    },
  },
  {
    id: "clinic",
    q: {
      es: "Un chequeo, el control de mi diabetes o presión, o una receta que se me acaba",
      en: "A checkup, managing my diabetes or blood pressure, or a prescription that's running out",
    },
    a: {
      es: "Busca una clínica de atención primaria o un centro de salud comunitario.",
      en: "Look for a primary care clinic or a community health center.",
    },
    d: {
      es: "Los centros de salud comunitarios (FQHC) cobran según tus ingresos, tengas o no seguro. Tener un médico primario fijo evita muchas visitas a emergencias.",
      en: "Community health centers (FQHCs) charge based on your income, with or without insurance. Having a regular primary care doctor prevents many ER visits.",
    },
    action: {
      label: { es: "Buscar un centro de salud", en: "Find a health center" },
      href: "https://findahealthcenter.hrsa.gov/",
    },
  },
  {
    id: "211",
    q: {
      es: "No sé dónde buscar ayuda: comida, transporte a la cita, renta u otros servicios",
      en: "I don't know where to find help: food, a ride to my appointment, rent or other services",
    },
    a: { es: "Llama al 211.", en: "Call 211." },
    d: {
      es: "Te conecta con recursos de tu zona y puedes pedir que te atiendan en español.",
      en: "It connects you with resources in your area and you can ask for Spanish.",
    },
    action: { label: { es: "Llamar al 211", en: "Call 211" }, href: "tel:211" },
  },
];

const GLOSSARY = [
  {
    t: "Premium",
    es: "Lo que pagas cada mes por tener el seguro, lo uses o no.",
    en: "What you pay every month to have insurance, whether you use it or not.",
  },
  {
    t: "Deductible",
    es: "Lo que pagas tú cada año antes de que el seguro empiece a pagar la mayoría de los servicios.",
    en: "What you pay each year before insurance starts paying for most services.",
  },
  {
    t: "Copay",
    es: "Una cantidad fija por un servicio. Por ejemplo, $25 por cada consulta.",
    en: "A fixed amount for a service. For example, $25 per doctor visit.",
  },
  {
    t: "Coinsurance",
    es: "El porcentaje que pagas tú después del deducible. Por ejemplo, 20% de la cuenta.",
    en: "The percentage you pay after your deductible. For example, 20% of the bill.",
  },
  {
    t: "Out-of-pocket maximum",
    es: "Lo máximo que pagarás en un año por servicios cubiertos. Después, el seguro paga el 100%.",
    en: "The most you'll pay in a year for covered services. After that, insurance pays 100%.",
  },
  {
    t: "In-network",
    es: "Médicos y hospitales que tienen contrato con tu seguro. Fuera de la red (out-of-network) te cuesta más.",
    en: "Doctors and hospitals with a contract with your insurance. Out-of-network costs you more.",
  },
  {
    t: "Referral",
    es: "El permiso de tu médico primario para ver a un especialista. Algunos planes lo exigen.",
    en: "Your primary doctor's approval to see a specialist. Some plans require it.",
  },
  {
    t: "Prior authorization",
    es: "La aprobación del seguro antes de ciertos estudios, medicinas o cirugías.",
    en: "Insurance approval before certain tests, medicines or surgeries.",
  },
  {
    t: "EOB (Explanation of Benefits)",
    es: "Una carta que explica lo que pagó el seguro. No es una factura: compárala con la factura que te llegue.",
    en: "A letter explaining what insurance paid. It isn't a bill: compare it with the bill you receive.",
  },
];

const COVERAGE = [
  {
    t: { es: "Marketplace (HealthCare.gov)", en: "Marketplace (HealthCare.gov)" },
    d: {
      es: "Florida usa el mercado federal. La inscripción abierta suele ir del 1 de noviembre al 15 de enero, y muchas familias califican para ayuda con el pago. Puedes pedir ayuda gratis a un navegador certificado.",
      en: "Florida uses the federal marketplace. Open enrollment usually runs from November 1 to January 15, and many families qualify for help paying. You can get free help from a certified navigator.",
    },
    href: "https://www.healthcare.gov/",
  },
  {
    t: { es: "Medicaid y Florida KidCare", en: "Medicaid and Florida KidCare" },
    d: {
      es: "Medicaid se solicita a través de ACCESS Florida (Departamento de Niños y Familias). KidCare ofrece cobertura de bajo costo para niños y adolescentes.",
      en: "Apply for Medicaid through ACCESS Florida (Department of Children and Families). KidCare offers low-cost coverage for children and teens.",
    },
    href: "https://www.floridakidcare.org/",
  },
  {
    t: { es: "Sin seguro", en: "No insurance" },
    d: {
      es: "Los centros de salud comunitarios cobran según tus ingresos. Antes de un servicio programado, pide un presupuesto por escrito (Good Faith Estimate).",
      en: "Community health centers charge based on your income. Before a scheduled service, ask for a written estimate (Good Faith Estimate).",
    },
    href: "https://findahealthcenter.hrsa.gov/",
  },
];

const RIGHTS = [
  {
    t: { es: "Un intérprete gratis", en: "A free interpreter" },
    d: {
      es: "Los hospitales y clínicas que reciben fondos federales (la mayoría) deben ofrecerte un intérprete calificado sin costo. Pídelo al hacer la cita.",
      en: "Hospitals and clinics that receive federal funds (most of them) must offer you a qualified interpreter at no cost. Ask for one when you book.",
    },
  },
  {
    t: { es: "No usar a tus hijos como intérpretes", en: "Not using your children as interpreters" },
    d: {
      es: "No tienes que depender de familiares, y mucho menos de niños, para entender tu diagnóstico.",
      en: "You don't have to rely on family members, and especially not children, to understand your diagnosis.",
    },
  },
  {
    t: { es: "Atención en emergencias", en: "Emergency care" },
    d: {
      es: "La sala de emergencias debe evaluarte y estabilizarte aunque no tengas seguro ni dinero en ese momento.",
      en: "The emergency room must evaluate and stabilize you even if you have no insurance or money at that moment.",
    },
  },
  {
    t: { es: "Saber el precio antes", en: "Knowing the price first" },
    d: {
      es: "Si no tienes seguro o pagas de tu bolsillo, puedes pedir un Good Faith Estimate antes de un servicio programado.",
      en: "If you're uninsured or paying yourself, you can ask for a Good Faith Estimate before a scheduled service.",
    },
  },
  {
    t: { es: "Tu expediente médico", en: "Your medical records" },
    d: {
      es: "Puedes pedir copia de tus records. Generalmente deben entregártela en un plazo de 30 días.",
      en: "You can ask for a copy of your records. They generally must provide it within 30 days.",
    },
  },
  {
    t: { es: "Preguntar hasta entender", en: "Asking until you understand" },
    d: {
      es: "Antes de firmar un consentimiento, tienes derecho a que te expliquen en tu idioma qué te van a hacer, sus riesgos y tus alternativas.",
      en: "Before signing a consent form, you have the right to an explanation in your language of what will be done, its risks and your alternatives.",
    },
  },
];

const PREVENTION = [
  { t: { es: "Presión arterial", en: "Blood pressure" }, w: { es: "Todos los adultos desde los 18 años", en: "All adults 18 and older" } },
  {
    t: { es: "Diabetes y prediabetes", en: "Diabetes and prediabetes" },
    w: { es: "De 35 a 70 años, con sobrepeso u obesidad", en: "Ages 35 to 70 with overweight or obesity" },
  },
  { t: { es: "Cáncer de colon", en: "Colon cancer" }, w: { es: "De 45 a 75 años", en: "Ages 45 to 75" } },
  {
    t: { es: "Cáncer de mama (mamografía)", en: "Breast cancer (mammogram)" },
    w: { es: "Mujeres de 40 a 74 años, cada 2 años", en: "Women ages 40 to 74, every 2 years" },
  },
  {
    t: { es: "Cáncer de cuello uterino", en: "Cervical cancer" },
    w: { es: "Mujeres de 21 a 65 años", en: "Women ages 21 to 65" },
  },
  {
    t: { es: "Cáncer de pulmón", en: "Lung cancer" },
    w: {
      es: "De 50 a 80 años con 20 paquetes-año de cigarrillo, que fuman o dejaron en los últimos 15 años",
      en: "Ages 50 to 80 with a 20 pack-year history who smoke or quit within the past 15 years",
    },
  },
  { t: { es: "VIH", en: "HIV" }, w: { es: "Al menos una vez entre los 15 y 65 años", en: "At least once between ages 15 and 65" } },
  { t: { es: "Hepatitis C", en: "Hepatitis C" }, w: { es: "Una vez entre los 18 y 79 años", en: "Once between ages 18 and 79" } },
  { t: { es: "Depresión", en: "Depression" }, w: { es: "Todos los adultos", en: "All adults" } },
];

const HEAT = [
  {
    level: "watch",
    t: { es: "Agotamiento por calor", en: "Heat exhaustion" },
    signs: {
      es: "Sudor abundante, mareo, dolor de cabeza, náuseas, calambres, debilidad.",
      en: "Heavy sweating, dizziness, headache, nausea, cramps, weakness.",
    },
    do: {
      es: "Ve a la sombra, toma agua, quítate ropa de más y ponte paños fríos. Si no mejora en una hora o empeora, busca atención médica.",
      en: "Get into shade, drink water, remove extra clothing and use cool cloths. If it doesn't improve within an hour or gets worse, get medical care.",
    },
  },
  {
    level: "alarm",
    t: { es: "Golpe de calor", en: "Heat stroke" },
    signs: {
      es: "Confusión, desmayo, convulsiones, piel muy caliente, temperatura muy alta.",
      en: "Confusion, fainting, seizures, very hot skin, very high temperature.",
    },
    do: {
      es: "Llama al 911. Mientras llega la ayuda, enfría a la persona con agua y sombra.",
      en: "Call 911. While help is on the way, cool the person with water and shade.",
    },
  },
];

const HEAT_TIPS = {
  es: [
    "Toma agua seguido, aunque no tengas sed.",
    "Descansa en la sombra durante la jornada.",
    "Los primeros días de trabajo en el calor son los más peligrosos: el cuerpo necesita acostumbrarse.",
    "Si te expones a pesticidas: quítate la ropa contaminada, lávate con agua y jabón, enjuaga los ojos con agua limpia por 15 minutos y llama a Poison Control.",
  ],
  en: [
    "Drink water often, even if you're not thirsty.",
    "Rest in the shade during the workday.",
    "The first days of working in the heat are the most dangerous: your body needs time to adjust.",
    "If you're exposed to pesticides: remove contaminated clothing, wash with soap and water, rinse your eyes with clean water for 15 minutes and call Poison Control.",
  ],
};

const VISIT_STEPS = {
  es: [
    "Pide un intérprete cuando hagas la cita.",
    "Lleva tus medicinas en una bolsa, o una lista con nombre y dosis.",
    "Escribe tus síntomas: cuándo empezaron, qué los mejora y qué los empeora.",
    "Elige tus tres preguntas más importantes y hazlas primero.",
    "Lleva tu identificación y tu tarjeta de seguro, si tienes.",
    "Al final, repite con tus palabras lo que te indicaron, para confirmar que entendiste.",
    "Pide las instrucciones por escrito, en español si es posible.",
  ],
  en: [
    "Ask for an interpreter when you book the appointment.",
    "Bring your medicines in a bag, or a list with names and doses.",
    "Write down your symptoms: when they started, what makes them better and what makes them worse.",
    "Pick your three most important questions and ask them first.",
    "Bring your ID and your insurance card, if you have one.",
    "At the end, repeat what you were told in your own words to confirm you understood.",
    "Ask for written instructions, in Spanish if possible.",
  ],
};

const ABOUT = {
  es: [
    "Vela Salud USA es el hub de Estados Unidos del universo Vela Salud. Nació para acompañar a las familias hispanas del suroeste de Florida, en comunidades donde faltan profesionales de salud y donde el idioma no debería ser una barrera para cuidarse.",
    "Fue fundada por la Dra. Guilliana Matute, médica formada en Venezuela (Universidad de Carabobo), que hoy avanza en el camino hacia la licencia médica en Estados Unidos.",
    "Por ahora, Vela Salud USA ofrece educación, orientación y herramientas. No ofrecemos consultas médicas, diagnósticos ni recetas.",
  ],
  en: [
    "Vela Salud USA is the United States hub of the Vela Salud universe. It was created to support Hispanic families in Southwest Florida, in communities with too few health professionals, where language shouldn't be a barrier to taking care of yourself.",
    "It was founded by Dr. Guilliana Matute, a physician trained in Venezuela (Universidad de Carabobo) who is currently working toward U.S. medical licensure.",
    "For now, Vela Salud USA offers education, guidance and tools. We do not offer medical visits, diagnoses or prescriptions.",
  ],
};

function Sail({ size = 30 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
      <path d="M15 3 L15 24 L4 24 Z" fill="var(--citrus)" />
      <path d="M17 6 C24 11 26 18 25 24 L17 24 Z" fill="var(--river)" />
      <path d="M3 27 C9 25 23 25 29 27" stroke="var(--river)" strokeWidth="2" fill="none" strokeLinecap="round" />
    </svg>
  );
}

function Router({ lang, ui }) {
  const [sel, setSel] = useState(null);
  const r = ROUTES.find((x) => x.id === sel);

  return (
    <div className="vsu-router" aria-live="polite">
      {!r ? (
        <>
          <h2 className="vsu-router-title">{ui.routerTitle}</h2>
          <p className="vsu-router-hint">{ui.routerHint}</p>
          <ul className="vsu-router-list">
            {ROUTES.map((x) => (
              <li key={x.id}>
                <button
                  className={"vsu-router-opt" + (x.urgent ? " is-urgent" : "")}
                  onClick={() => setSel(x.id)}
                >
                  {x.q[lang]}
                </button>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <div className={"vsu-router-answer" + (r.urgent ? " is-urgent" : "")}>
          <p className="vsu-router-q">{r.q[lang]}</p>
          <p className="vsu-router-a">{r.a[lang]}</p>
          <p className="vsu-router-d">{r.d[lang]}</p>
          {r.action && (
            <a
              className="vsu-btn"
              href={r.action.href}
              {...(r.action.href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}
            >
              {r.action.label[lang]}
            </a>
          )}
          <button className="vsu-link-btn" onClick={() => setSel(null)}>
            {ui.routerBack}
          </button>
        </div>
      )}
    </div>
  );
}

export default function App() {
  const [lang, setLang] = useState("es");
  const ui = UI[lang];

  return (
    <div className="vsu" lang={lang}>
      <style>{CSS}</style>

      <header className="vsu-header">
        <div className="vsu-wrap vsu-header-row">
          <a href="#top" className="vsu-brand">
            <Sail />
            <span>
              Vela Salud <strong>USA</strong>
            </span>
          </a>
          <button className="vsu-lang" onClick={() => setLang(lang === "es" ? "en" : "es")}>
            {ui.langBtn}
          </button>
        </div>
        <nav className="vsu-nav" aria-label="Secciones">
          <div className="vsu-wrap vsu-nav-row">
            {ui.nav.map(([id, label]) => (
              <a key={id} href={"#" + id}>
                {label}
              </a>
            ))}
          </div>
        </nav>
      </header>

      <main id="top">
        <section className="vsu-hero" id="donde">
          <div className="vsu-wrap vsu-hero-grid">
            <div className="vsu-hero-text">
              <h1>{ui.heroTitle}</h1>
              <p>{ui.heroSub}</p>
            </div>
            <Router lang={lang} ui={ui} />
          </div>
        </section>

        <section className="vsu-section" id="seguro">
          <div className="vsu-wrap">
            <h2>{ui.seguroTitle}</h2>
            <p className="vsu-lead">{ui.seguroSub}</p>
            <dl className="vsu-glossary">
              {GLOSSARY.map((g) => (
                <div key={g.t}>
                  <dt>{g.t}</dt>
                  <dd>{g[lang]}</dd>
                </div>
              ))}
            </dl>

            <h3>{ui.coberturaTitle}</h3>
            <div className="vsu-cover">
              {COVERAGE.map((c) => (
                <a key={c.href + c.t.es} className="vsu-cover-item" href={c.href} target="_blank" rel="noreferrer">
                  <strong>{c.t[lang]}</strong>
                  <span>{c.d[lang]}</span>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="vsu-section vsu-tint" id="derechos">
          <div className="vsu-wrap">
            <h2>{ui.derechosTitle}</h2>
            <p className="vsu-lead">{ui.derechosSub}</p>
            <ul className="vsu-rights">
              {RIGHTS.map((r) => (
                <li key={r.t.es}>
                  <strong>{r.t[lang]}</strong>
                  <p>{r.d[lang]}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="vsu-section" id="prevencion">
          <div className="vsu-wrap">
            <h2>{ui.prevTitle}</h2>
            <p className="vsu-lead">{ui.prevSub}</p>
            <div className="vsu-table-scroll">
              <table className="vsu-table">
                <thead>
                  <tr>
                    <th scope="col">{ui.prevCols[0]}</th>
                    <th scope="col">{ui.prevCols[1]}</th>
                  </tr>
                </thead>
                <tbody>
                  {PREVENTION.map((p) => (
                    <tr key={p.t.es}>
                      <th scope="row">{p.t[lang]}</th>
                      <td>{p.w[lang]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="vsu-section vsu-tint" id="calor">
          <div className="vsu-wrap">
            <h2>{ui.calorTitle}</h2>
            <p className="vsu-lead">{ui.calorSub}</p>
            <div className="vsu-heat">
              {HEAT.map((h) => (
                <div key={h.level} className={"vsu-heat-item is-" + h.level}>
                  <h3>{h.t[lang]}</h3>
                  <p className="vsu-heat-signs">{h.signs[lang]}</p>
                  <p>{h.do[lang]}</p>
                </div>
              ))}
            </div>
            <ul className="vsu-tips">
              {HEAT_TIPS[lang].map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="vsu-section" id="cita">
          <div className="vsu-wrap vsu-visit">
            <div>
              <h2>{ui.citaTitle}</h2>
              <p className="vsu-lead">{ui.citaSub}</p>
              <ol className="vsu-steps">
                {VISIT_STEPS[lang].map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ol>
            </div>
            <aside className="vsu-micita">
              <h3>{ui.miCitaTitle}</h3>
              <p>{ui.miCitaText}</p>
              <a className="vsu-btn" href={MI_CITA_URL}>
                {ui.miCitaBtn}
              </a>
            </aside>
          </div>
        </section>

        <section className="vsu-section vsu-about" id="nosotros">
          <div className="vsu-wrap">
            <h2>{ui.nosotrosTitle}</h2>
            {ABOUT[lang].map((p) => (
              <p key={p} className="vsu-about-p">
                {p}
              </p>
            ))}
            <h3>{ui.universeTitle}</h3>
            <ul className="vsu-universe">
              {UNIVERSE.map((u) => (
                <li key={u.url}>
                  <a href={u.url} target="_blank" rel="noreferrer">
                    {u.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>

      <footer className="vsu-footer">
        <div className="vsu-wrap">
          <p>{ui.footer}</p>
          <p className="vsu-copy">© 2026 Vela Salud USA · Dra. Guilliana Matute</p>
        </div>
      </footer>
    </div>
  );
}

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible:wght@400;700&family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,700;12..96,800&display=swap');

.vsu {
  --river: #0E4F4A;      /* Caloosahatchee: verde río profundo */
  --river-soft: #E3EFEC;
  --citrus: #F0A020;     /* naranja cítrico de LaBelle */
  --citrus-soft: #FDF1DA;
  --alarm: #B3261E;
  --ink: #17282A;
  --muted: #4B5E60;
  --paper: #FFFFFF;
  --line: #CFDDDA;
  font-family: 'Atkinson Hyperlegible', system-ui, sans-serif;
  color: var(--ink);
  background: var(--paper);
  line-height: 1.6;
  font-size: 17px;
}
.vsu *, .vsu *::before, .vsu *::after { box-sizing: border-box; }
.vsu h1, .vsu h2, .vsu h3 { font-family: 'Bricolage Grotesque', system-ui, sans-serif; line-height: 1.15; margin: 0; }
.vsu a { color: var(--river); }
.vsu :focus-visible { outline: 3px solid var(--citrus); outline-offset: 2px; border-radius: 4px; }
.vsu-wrap { max-width: 1100px; margin: 0 auto; padding: 0 20px; }

/* Header */
.vsu-header { position: sticky; top: 0; z-index: 10; background: var(--paper); border-bottom: 1px solid var(--line); }
.vsu-header-row { display: flex; align-items: center; justify-content: space-between; padding-top: 12px; padding-bottom: 8px; }
.vsu-brand { display: flex; align-items: center; gap: 10px; text-decoration: none; font-family: 'Bricolage Grotesque', sans-serif; font-size: 1.25rem; color: var(--ink) !important; }
.vsu-brand strong { color: var(--river); font-weight: 800; }
.vsu-lang { font: inherit; font-size: .95rem; padding: 6px 14px; border: 2px solid var(--river); border-radius: 999px; background: transparent; color: var(--river); cursor: pointer; }
.vsu-lang:hover { background: var(--river-soft); }
.vsu-nav { overflow-x: auto; }
.vsu-nav-row { display: flex; gap: 22px; padding-bottom: 10px; white-space: nowrap; }
.vsu-nav a { text-decoration: none; color: var(--muted); font-size: .95rem; padding: 4px 0; }
.vsu-nav a:hover { color: var(--river); text-decoration: underline; text-underline-offset: 4px; }
.vsu section { scroll-margin-top: 110px; }

/* Hero + router */
.vsu-hero { background: var(--river); color: #fff; padding: 56px 0 64px; }
.vsu-hero-grid { display: grid; grid-template-columns: 1fr; gap: 36px; align-items: start; }
@media (min-width: 900px) { .vsu-hero-grid { grid-template-columns: 1fr 1.1fr; gap: 56px; } }
.vsu-hero h1 { font-size: clamp(2.2rem, 5vw, 3.5rem); font-weight: 800; letter-spacing: -0.02em; max-width: 14ch; }
.vsu-hero-text p { font-size: 1.15rem; max-width: 46ch; opacity: .92; margin-top: 20px; }

.vsu-router { background: var(--paper); color: var(--ink); border-radius: 18px; padding: 26px; box-shadow: 0 0 0 6px var(--citrus); }
.vsu-router-title { font-size: 1.6rem; color: var(--river); }
.vsu-router-hint { color: var(--muted); margin: 6px 0 16px; }
.vsu-router-list { list-style: none; margin: 0; padding: 0; display: grid; gap: 10px; }
.vsu-router-opt { width: 100%; text-align: left; font: inherit; font-size: 1rem; line-height: 1.4; padding: 14px 16px; border: 2px solid var(--line); border-radius: 12px; background: var(--paper); color: var(--ink); cursor: pointer; }
.vsu-router-opt:hover { border-color: var(--river); background: var(--river-soft); }
.vsu-router-opt.is-urgent { border-left: 6px solid var(--alarm); }
.vsu-router-answer { animation: vsu-in .25s ease-out; }
.vsu-router-q { color: var(--muted); font-size: .95rem; margin: 0; }
.vsu-router-a { font-family: 'Bricolage Grotesque', sans-serif; font-size: 1.9rem; font-weight: 800; color: var(--river); margin: 10px 0; line-height: 1.15; }
.vsu-router-answer.is-urgent .vsu-router-a { color: var(--alarm); }
.vsu-router-d { margin: 0 0 18px; }
.vsu-link-btn { display: block; margin-top: 16px; font: inherit; background: none; border: none; padding: 0; color: var(--river); text-decoration: underline; text-underline-offset: 4px; cursor: pointer; }
@keyframes vsu-in { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }
@media (prefers-reduced-motion: reduce) { .vsu-router-answer { animation: none; } }

.vsu-btn { display: inline-block; background: var(--citrus); color: var(--ink) !important; font-weight: 700; text-decoration: none; padding: 12px 22px; border-radius: 999px; }
.vsu-btn:hover { filter: brightness(.95); }

/* Sections */
.vsu-section { padding: 64px 0; }
.vsu-tint { background: var(--river-soft); }
.vsu-section h2 { font-size: clamp(1.8rem, 3.5vw, 2.4rem); font-weight: 700; color: var(--river); }
.vsu-section h3 { font-size: 1.35rem; margin-top: 40px; margin-bottom: 14px; }
.vsu-lead { color: var(--muted); max-width: 62ch; margin: 10px 0 28px; }

.vsu-glossary { margin: 0; display: grid; grid-template-columns: 1fr; border-top: 1px solid var(--line); }
@media (min-width: 760px) { .vsu-glossary { grid-template-columns: 1fr 1fr; column-gap: 40px; } }
.vsu-glossary > div { padding: 16px 0; border-bottom: 1px solid var(--line); }
.vsu-glossary dt { font-weight: 700; color: var(--river); }
.vsu-glossary dd { margin: 4px 0 0; }

.vsu-cover { display: grid; gap: 14px; grid-template-columns: 1fr; }
@media (min-width: 860px) { .vsu-cover { grid-template-columns: repeat(3, 1fr); } }
.vsu-cover-item { display: block; text-decoration: none; color: var(--ink) !important; padding: 18px 20px; border: 2px solid var(--line); border-radius: 14px; }
.vsu-cover-item:hover { border-color: var(--river); }
.vsu-cover-item strong { display: block; color: var(--river); margin-bottom: 6px; }

.vsu-rights { list-style: none; padding: 0; margin: 0; display: grid; gap: 0 40px; grid-template-columns: 1fr; }
@media (min-width: 760px) { .vsu-rights { grid-template-columns: 1fr 1fr; } }
.vsu-rights li { padding: 18px 0 18px 18px; border-left: 4px solid var(--citrus); margin-bottom: 14px; background: var(--paper); border-radius: 0 12px 12px 0; padding-right: 18px; }
.vsu-rights p { margin: 4px 0 0; }

.vsu-table-scroll { overflow-x: auto; }
.vsu-table { width: 100%; max-width: 820px; border-collapse: collapse; }
.vsu-table th, .vsu-table td { text-align: left; padding: 12px 14px; border-bottom: 1px solid var(--line); vertical-align: top; }
.vsu-table thead th { color: var(--muted); font-weight: 400; font-size: .95rem; border-bottom: 2px solid var(--river); }
.vsu-table tbody th { font-weight: 700; width: 38%; }

.vsu-heat { display: grid; gap: 16px; grid-template-columns: 1fr; }
@media (min-width: 760px) { .vsu-heat { grid-template-columns: 1fr 1fr; } }
.vsu-heat-item { background: var(--paper); border-radius: 14px; padding: 22px; border-top: 6px solid var(--citrus); }
.vsu-heat-item.is-alarm { border-top-color: var(--alarm); }
.vsu-heat-item h3 { margin: 0 0 8px; }
.vsu-heat-item.is-alarm h3 { color: var(--alarm); }
.vsu-heat-signs { font-weight: 700; }
.vsu-tips { margin: 28px 0 0; padding-left: 1.2em; max-width: 70ch; }
.vsu-tips li { margin-bottom: 8px; }

.vsu-visit { display: grid; gap: 36px; grid-template-columns: 1fr; align-items: start; }
@media (min-width: 900px) { .vsu-visit { grid-template-columns: 1.4fr 1fr; } }
.vsu-steps { padding-left: 1.4em; margin: 0; }
.vsu-steps li { margin-bottom: 12px; padding-left: 6px; }
.vsu-steps li::marker { color: var(--river); font-weight: 700; }
.vsu-micita { background: var(--citrus-soft); border-radius: 18px; padding: 26px; }
.vsu-micita h3 { margin: 0 0 8px; color: var(--river); }
.vsu-micita p { margin: 0 0 18px; }

.vsu-about-p { max-width: 68ch; }
.vsu-universe { list-style: none; padding: 0; margin: 0; display: flex; flex-wrap: wrap; gap: 10px; }
.vsu-universe a { display: inline-block; padding: 8px 16px; border: 2px solid var(--river); border-radius: 999px; text-decoration: none; }
.vsu-universe a:hover { background: var(--river-soft); }

.vsu-footer { background: var(--ink); color: #E8EEED; padding: 36px 0; font-size: .95rem; }
.vsu-footer p { max-width: 75ch; margin: 0 0 10px; }
.vsu-copy { opacity: .75; }
`;
