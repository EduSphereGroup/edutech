export interface PersonalizedModule {
  id: number;
  title: string;
  description: string;
  xpReward: number;
  orderIndex: number;
  grade: string;
  subject: string;
  lessons: PersonalizedLesson[];
}

export interface PersonalizedLesson {
  id: number;
  moduleId: number;
  title: string;
  content: string;
  xpReward: number;
  orderIndex: number;
  practicalActivity?: string;
  resources?: string[];
}

export const personalizedContent: Record<string, Record<string, PersonalizedModule[]>> = {
  // Educação Infantil
  infantil: {
    multidisciplinar: [
      {
        id: 101,
        title: "Tecnologia na Educação Infantil",
        description: "Aprenda a usar tecnologia de forma lúdica e educativa com crianças pequenas",
        xpReward: 200,
        orderIndex: 1,
        grade: "infantil",
        subject: "multidisciplinar",
        lessons: [
          {
            id: 1001,
            moduleId: 101,
            title: "Introdução à Tecnologia para Pequenos",
            content: "A tecnologia na educação infantil deve ser usada como ferramenta de apoio ao desenvolvimento integral da criança. Nesta idade, o foco está na exploração sensorial, criatividade e desenvolvimento da linguagem. Ferramentas como tablets educativos, jogos interativos simples e aplicativos de desenho podem estimular a coordenação motora e a criatividade.",
            xpReward: 50,
            orderIndex: 1,
            practicalActivity: "Crie uma atividade de desenho digital usando um aplicativo simples de pintura",
            resources: ["Toca Boca apps", "Duck Duck Moose apps", "PBS Kids Games"]
          },
          {
            id: 1002,
            moduleId: 101,
            title: "Contação de Histórias Digital",
            content: "Use ferramentas digitais para criar histórias interativas. Aplicativos como Book Creator permitem criar livros digitais com áudio, imagens e texto. Isso desenvolve a linguagem oral, escrita (pré-alfabetização) e criatividade das crianças.",
            xpReward: 75,
            orderIndex: 2,
            practicalActivity: "Grave uma história com as crianças usando o celular e crie um livro digital simples",
            resources: ["Book Creator", "StoryMapJS", "Flipgrid"]
          }
        ]
      }
    ]
  },

  // Fundamental I
  fundamental1: {
    portugues: [
      {
        id: 201,
        title: "Alfabetização Digital",
        description: "Ferramentas tecnológicas para apoiar o processo de alfabetização",
        xpReward: 250,
        orderIndex: 1,
        grade: "fundamental1",
        subject: "portugues",
        lessons: [
          {
            id: 2001,
            moduleId: 201,
            title: "Jogos de Alfabetização Online",
            content: "Explore plataformas como Wordwall, Kahoot Kids e Scratch Jr para criar atividades interativas de alfabetização. Estes jogos ajudam no reconhecimento de letras, formação de palavras e desenvolvimento da consciência fonológica de forma divertida e engajante.",
            xpReward: 60,
            orderIndex: 1,
            practicalActivity: "Crie um jogo de caça-palavras digital usando o Wordwall",
            resources: ["Wordwall", "Kahoot", "ABCmouse", "Starfall"]
          },
          {
            id: 2002,
            moduleId: 201,
            title: "Produção de Texto Digital",
            content: "Ensine as crianças a usar editores de texto simples para suas primeiras produções escritas. O Google Docs for Education oferece ferramentas de ditado por voz que podem ajudar crianças em processo de alfabetização a expressar suas ideias antes mesmo de dominarem completamente a escrita.",
            xpReward: 80,
            orderIndex: 2,
            practicalActivity: "Oriente os alunos a escrever uma pequena história usando o ditado por voz",
            resources: ["Google Docs", "Microsoft Word Online", "Storybird"]
          }
        ]
      }
    ],
    matematica: [
      {
        id: 202,
        title: "Matemática Lúdica Digital",
        description: "Use tecnologia para tornar a matemática mais visual e interativa",
        xpReward: 250,
        orderIndex: 1,
        grade: "fundamental1",
        subject: "matematica",
        lessons: [
          {
            id: 2003,
            moduleId: 202,
            title: "Manipulativos Virtuais",
            content: "Descubra como usar manipulativos virtuais para ensinar conceitos matemáticos básicos. Ferramentas como blocos de base 10 virtuais, ábacos digitais e contadores online ajudam as crianças a visualizar números e operações matemáticas de forma concreta.",
            xpReward: 70,
            orderIndex: 1,
            practicalActivity: "Use blocos virtuais para ensinar adição e subtração",
            resources: ["National Library of Virtual Manipulatives", "Math Playground", "IXL Math"]
          }
        ]
      }
    ]
  },

  // Fundamental II
  fundamental2: {
    ciencias: [
      {
        id: 301,
        title: "Laboratório Virtual de Ciências",
        description: "Experimentos e simulações digitais para o ensino de ciências",
        xpReward: 300,
        orderIndex: 1,
        grade: "fundamental2",
        subject: "ciencias",
        lessons: [
          {
            id: 3001,
            moduleId: 301,
            title: "Simulações PhET",
            content: "O PhET Interactive Simulations oferece simulações gratuitas de física, química, biologia e matemática. Estas ferramentas permitem que os alunos experimentem com conceitos científicos de forma segura e repetitiva, visualizando fenômenos que seriam impossíveis de observar em sala de aula tradicional.",
            xpReward: 80,
            orderIndex: 1,
            practicalActivity: "Use uma simulação de circuitos elétricos para ensinar eletricidade básica",
            resources: ["PhET Simulations", "Labster", "ExploreLearning Gizmos"]
          },
          {
            id: 3002,
            moduleId: 301,
            title: "Microscopia Virtual",
            content: "Explore o mundo microscópico usando microscópios virtuais e bancos de imagens de alta resolução. Sites como Virtual Microscope e Microscopy-UK oferecem acesso a imagens detalhadas de células, tecidos e microorganismos.",
            xpReward: 90,
            orderIndex: 2,
            practicalActivity: "Conduza uma 'aula de campo' virtual explorando diferentes tipos de células",
            resources: ["Virtual Microscope", "Microscopy-UK", "Cells Alive!"]
          }
        ]
      }
    ],
    historia: [
      {
        id: 302,
        title: "História Digital Interativa",
        description: "Ferramentas para tornar o ensino de história mais envolvente",
        xpReward: 280,
        orderIndex: 1,
        grade: "fundamental2",
        subject: "historia",
        lessons: [
          {
            id: 3003,
            moduleId: 302,
            title: "Linhas do Tempo Digitais",
            content: "Crie linhas do tempo interativas usando ferramentas como Timeline JS, Tiki-Toki ou Preceden. Estas ferramentas permitem adicionar imagens, vídeos e links, tornando os eventos históricos mais vívidos e compreensíveis para os alunos.",
            xpReward: 75,
            orderIndex: 1,
            practicalActivity: "Crie uma linha do tempo sobre a História do Brasil com imagens e vídeos",
            resources: ["Timeline JS", "Tiki-Toki", "Preceden", "Google Sites"]
          }
        ]
      }
    ]
  },

  // Ensino Médio
  medio: {
    fisica: [
      {
        id: 401,
        title: "Física Computacional",
        description: "Use simulações e modelagem para ensinar conceitos complexos de física",
        xpReward: 350,
        orderIndex: 1,
        grade: "medio",
        subject: "fisica",
        lessons: [
          {
            id: 4001,
            moduleId: 401,
            title: "Modelagem com GeoGebra",
            content: "O GeoGebra é uma ferramenta poderosa para visualizar conceitos de física. Você pode criar gráficos de movimento, simular ondas, demonstrar conceitos de óptica e muito mais. A capacidade de manipular variáveis em tempo real ajuda os alunos a entender as relações entre diferentes grandezas físicas.",
            xpReward: 90,
            orderIndex: 1,
            practicalActivity: "Crie uma simulação de movimento uniformemente variado no GeoGebra",
            resources: ["GeoGebra", "Algodoo", "Interactive Physics"]
          }
        ]
      }
    ],
    quimica: [
      {
        id: 402,
        title: "Química Virtual",
        description: "Laboratórios virtuais e simulações para química",
        xpReward: 350,
        orderIndex: 1,
        grade: "medio",
        subject: "quimica",
        lessons: [
          {
            id: 4002,
            moduleId: 402,
            title: "ChemSketch e Modelagem Molecular",
            content: "Use softwares de modelagem molecular como ChemSketch ou Avogadro para visualizar estruturas químicas em 3D. Isso ajuda os alunos a compreender geometria molecular, polaridade e interações intermoleculares de forma visual e interativa.",
            xpReward: 95,
            orderIndex: 1,
            practicalActivity: "Modele diferentes geometrias moleculares e explique suas propriedades",
            resources: ["ChemSketch", "Avogadro", "Jmol", "Virtual Chemistry Lab"]
          }
        ]
      }
    ]
  }
};

export const getPersonalizedModules = (grade: string, subject: string): PersonalizedModule[] => {
  return personalizedContent[grade]?.[subject] || [];
};

export const gradeNames: Record<string, string> = {
  infantil: "Educação Infantil",
  fundamental1: "Fundamental I",
  fundamental2: "Fundamental II",
  medio: "Ensino Médio",
  superior: "Ensino Superior",
  eja: "EJA"
};

export const subjectNames: Record<string, string> = {
  portugues: "Português",
  matematica: "Matemática",
  ciencias: "Ciências",
  historia: "História",
  geografia: "Geografia",
  ingles: "Inglês",
  artes: "Artes",
  educacao_fisica: "Educação Física",
  filosofia: "Filosofia",
  sociologia: "Sociologia",
  fisica: "Física",
  quimica: "Química",
  biologia: "Biologia",
  multidisciplinar: "Multidisciplinar"
};

export const difficultyNames: Record<string, string> = {
  facil: "Fácil",
  moderada: "Moderada",
  dificil: "Difícil",
  mista: "Mista"
};