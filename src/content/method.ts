import type { Lang } from '../i18n/ui';

export interface MethodStep {
  title: string;
  body: string;
}

export interface MethodCost {
  title: string;
  intro: string;
  items: Array<{ title: string; body: string }>;
  quote: string;
  nuanceTitle: string;
  nuance: string;
}

export interface MethodContent {
  eyebrow: string;
  headline: string;
  intro: string[];
  loop: {
    title: string;
    intro: string;
    steps: MethodStep[];
  };
  division: {
    title: string;
    intro: string;
    ai: { title: string; items: string[] };
    me: { title: string; items: string[] };
  };
  cost: MethodCost;
  claims: {
    title: string;
    body: string;
  };
  evidence: {
    title: string;
    body: string;
    link: string;
  };
  closing: {
    title: string;
    body: string;
    cta: string;
  };
}

export const method: Record<Lang, MethodContent> = {
  en: {
    eyebrow: 'How I work',
    headline: 'A specification first, then agents, then review',
    intro: [
      'I have been writing software for eighteen years. The tools changed; the order of operations did not. What follows is the process I actually run today, and the boundary I keep around it.',
    ],
    loop: {
      title: 'The loop',
      intro:
        'The same six steps whether the deliverable is a feature, a migration or a rebuild.',
      steps: [
        {
          title: 'Understand the problem',
          body: 'Before choosing anything: what has to be true when this is done, who depends on it, and what the actual constraint is. On ApiFuel the constraint turned out to be outbound concurrency, not request rate, and that single sentence changed the whole design.',
        },
        {
          title: 'Design the simplest solution that satisfies it',
          body: 'Every dependency, service and abstraction is a cost someone pays for years. It gets added when a requirement forces it, and the reasoning is written down so a future reader can challenge it.',
        },
        {
          title: 'Break the work into manageable tasks',
          body: 'Small enough that each one can be reviewed on its own and reversed on its own. A task that cannot be described in a sentence is not a task yet.',
        },
        {
          title: 'Write the specification, then implement against it',
          body: 'Spec-driven development: the requirements and acceptance criteria exist as text before code exists. That artifact is what later tells me whether the implementation is correct, instead of whether it looks reasonable.',
        },
        {
          title: 'Use specialized agents where they genuinely help',
          body: 'Exploration, mechanical refactors, test scaffolding, documentation drafts. Agents are useful precisely where the work is well specified, which is why step four has to come first.',
        },
        {
          title: 'Review, test, and take the result',
          body: 'Every diff is read. The tests are mine. Security, data handling and failure behaviour are checked by me, not asserted by a tool. Then it goes to production and I answer for it.',
        },
      ],
    },
    division: {
      title: 'What changes with AI, and what does not',
      intro: 'The honest split between what I delegate and what I keep.',
      ai: {
        title: 'Delegated to agents',
        items: [
          'Exploring an unfamiliar module and reporting what it found',
          'Mechanical changes across many files once the shape is decided',
          'First drafts of tests, documentation and boilerplate',
          'Comparing options when I already know what the criteria are',
        ],
      },
      me: {
        title: 'Kept, always',
        items: [
          'Deciding what gets built and what deliberately does not',
          'Data models, API contracts and anything other systems depend on',
          'Reading every diff before it lands',
          'Judgment on tradeoffs, failure modes and operational risk',
          'Owning what happens in production',
        ],
      },
    },
    cost: {
      title: 'What this actually costs in time',
      intro:
        'AI compresses the part that used to be typing. It does not compress the parts that decide whether the result is correct — and those are most of the schedule.',
      items: [
        {
          title: 'The specification comes first, and it is slow on purpose',
          body: 'Deciding what has to be true when this is done, what is explicitly out of scope, and how each requirement will be verified. If this part is wrong, generating code faster only produces the wrong result faster.',
        },
        {
          title: 'Every diff is read',
          body: 'Not skimmed because it compiled, and not accepted because a test went green. Data decisions, API contracts and security handling get read by hand, line by line.',
        },
        {
          title: 'Tests are written, reviewed and run',
          body: 'An agent can draft them. Accepting a test nobody read is worse than having no test at all, because it buys false confidence at exactly the moment you need real confidence.',
        },
        {
          title: 'Operational work does not accelerate',
          body: 'Backups, staging, post-deployment verification, rollback paths. That is calendar time, not keystroke time, and no model makes it shorter.',
        },
      ],
      quote:
        'Code that reaches production unreviewed is not faster. It is a deferred cost.',
      nuanceTitle: 'None of this has a fixed duration',
      nuance:
        'The cost scales with the complexity of the problem, not with the number of screens to build. The single biggest variable is how precisely the outcome can be stated: a requirement that keeps moving does not make generation slower, it makes the specification unbounded — and the specification is where the expensive part lives. That is why a client who knows what they want is worth more to the schedule than a faster tool.',
    },
    claims: {
      title: 'What I do not claim',
      body: 'Using AI does not make software correct, secure or maintainable. It changes how fast code is produced, and it changes nothing about whether that code is right. The difference is made by review, testing and operational experience — which is exactly why those are the parts I refuse to delegate.',
    },
    evidence: {
      title: 'You can check this instead of taking my word',
      body: 'The decisions behind this site are recorded as Architecture Decision Records, including the alternatives I rejected and why. They are public, dated and written before the code, not after.',
      link: 'Read the architecture decisions',
    },
    closing: {
      title: 'Want the details?',
      body: 'The CV has the trajectory; the projects page has the systems.',
      cta: 'Get in touch',
    },
  },

  es: {
    eyebrow: 'Cómo trabajo',
    headline: 'Primero la especificación, después los agentes, después la revisión',
    intro: [
      'Escribo software desde hace dieciocho años. Las herramientas cambiaron; el orden de las operaciones no. Lo que sigue es el proceso que efectivamente aplico hoy, y el límite que mantengo alrededor.',
    ],
    loop: {
      title: 'El ciclo',
      intro:
        'Los mismos seis pasos, sea el entregable una funcionalidad, una migración o una reconstrucción.',
      steps: [
        {
          title: 'Entender el problema',
          body: 'Antes de elegir nada: qué tiene que ser cierto cuando esto termine, quién depende de ello y cuál es la restricción real. En ApiFuel la restricción resultó ser la concurrencia saliente, no la tasa de peticiones, y esa sola frase cambió todo el diseño.',
        },
        {
          title: 'Diseñar la solución más simple que lo satisfaga',
          body: 'Cada dependencia, servicio y abstracción es un costo que alguien paga durante años. Se agrega cuando un requisito la obliga, y el razonamiento queda escrito para que un lector futuro pueda discutirlo.',
        },
        {
          title: 'Dividir el trabajo en tareas manejables',
          body: 'Lo bastante chicas como para revisar cada una por separado y revertirla por separado. Una tarea que no se puede describir en una frase todavía no es una tarea.',
        },
        {
          title: 'Escribir la especificación y después implementar contra ella',
          body: 'Desarrollo guiado por especificación: los requisitos y criterios de aceptación existen como texto antes de que exista el código. Ese artefacto es el que después me dice si la implementación es correcta, en lugar de si parece razonable.',
        },
        {
          title: 'Usar agentes especializados donde realmente ayudan',
          body: 'Exploración, refactors mecánicos, andamiaje de tests, borradores de documentación. Los agentes sirven justamente donde el trabajo está bien especificado, y por eso el paso cuatro tiene que ir primero.',
        },
        {
          title: 'Revisar, probar y hacerme cargo del resultado',
          body: 'Cada diff se lee. Los tests son míos. La seguridad, el manejo de datos y el comportamiento ante fallas los reviso yo, no los afirma una herramienta. Después va a producción y respondo por él.',
        },
      ],
    },
    division: {
      title: 'Qué cambia con la IA y qué no',
      intro: 'La división honesta entre lo que delego y lo que me quedo.',
      ai: {
        title: 'Delegado a agentes',
        items: [
          'Explorar un módulo desconocido y reportar qué encontró',
          'Cambios mecánicos en muchos archivos una vez decidida la forma',
          'Primeras versiones de tests, documentación y boilerplate',
          'Comparar opciones cuando ya sé cuáles son los criterios',
        ],
      },
      me: {
        title: 'Mío, siempre',
        items: [
          'Decidir qué se construye y qué deliberadamente no',
          'Modelos de datos, contratos de API y todo lo que otros sistemas consumen',
          'Leer cada diff antes de que entre',
          'Criterio sobre tradeoffs, modos de falla y riesgo operativo',
          'Hacerme cargo de lo que pasa en producción',
        ],
      },
    },
    cost: {
      title: 'Lo que esto cuesta en tiempo',
      intro:
        'La IA comprime la parte que antes era tipear. No comprime las partes que deciden si el resultado está bien — y esas son la mayor parte del calendario.',
      items: [
        {
          title: 'La especificación va primero, y es lenta a propósito',
          body: 'Definir qué tiene que ser cierto cuando esto termine, qué queda explícitamente fuera de alcance y cómo se va a verificar cada requisito. Si esta parte está mal, generar código más rápido solo produce el resultado equivocado más rápido.',
        },
        {
          title: 'Cada diff se lee',
          body: 'No se hojea porque compiló, ni se acepta porque un test dio verde. Las decisiones de datos, los contratos de API y el manejo de seguridad se leen a mano, línea por línea.',
        },
        {
          title: 'Los tests se escriben, se revisan y se corren',
          body: 'Un agente puede redactarlos. Aceptar un test que nadie leyó es peor que no tener ninguno, porque compra confianza falsa justo en el momento en que necesitás confianza real.',
        },
        {
          title: 'El trabajo operativo no se acelera',
          body: 'Backups, staging, verificación post-despliegue, rutas de rollback. Eso es tiempo de calendario, no de teclado, y ningún modelo lo acorta.',
        },
      ],
      quote:
        'El código que llega a producción sin revisar no es más rápido. Es un costo diferido.',
      nuanceTitle: 'Nada de esto tiene una duración fija',
      nuance:
        'El costo escala con la complejidad del problema, no con la cantidad de pantallas a construir. La variable más grande es con qué precisión se puede enunciar el resultado: un requisito que se mueve no hace más lenta la generación, vuelve ilimitada la especificación — y la especificación es donde vive la parte cara. Por eso un cliente que sabe lo que quiere vale más para el calendario que una herramienta más rápida.',
    },
    claims: {
      title: 'Lo que no afirmo',
      body: 'Usar IA no vuelve al software correcto, seguro ni mantenible. Cambia la velocidad con que se produce código, y no cambia nada sobre si ese código está bien. La diferencia la hacen la revisión, las pruebas y la experiencia operativa — que es exactamente por qué esas son las partes que me niego a delegar.',
    },
    evidence: {
      title: 'Podés verificarlo en lugar de creerme',
      body: 'Las decisiones detrás de este sitio están registradas como Architecture Decision Records, incluyendo las alternativas que descarté y por qué. Son públicas, están fechadas y se escribieron antes del código, no después.',
      link: 'Leer las decisiones de arquitectura',
    },
    closing: {
      title: '¿Querés los detalles?',
      body: 'El CV tiene la trayectoria; la página de proyectos tiene los sistemas.',
      cta: 'Ponerse en contacto',
    },
  },
};
