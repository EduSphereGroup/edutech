export interface User {
  id: number;
  username: string;
  xp: number;
  level: number;
  createdAt: string;
}

export interface Module {
  id: number;
  title: string;
  description: string;
  xpReward: number;
  orderIndex: number;
}

export interface Lesson {
  id: number;
  moduleId: number;
  title: string;
  content: string;
  xpReward: number;
  orderIndex: number;
}

export interface Badge {
  id: number;
  name: string;
  description: string;
  icon: string;
  criteria: string;
  xpRequirement: number;
}

export interface UserProgress {
  userId: number;
  moduleId?: number;
  lessonId?: number;
  completed: boolean;
  completedAt?: string;
}

export interface UserBadge {
  userId: number;
  badgeId: number;
  earned: boolean;
  earnedAt?: string;
}

export const mockModules: Module[] = [
  {
    id: 1,
    title: "Introdução ao Canva para Educação",
    description: "Aprenda os fundamentos do Canva para Educação e como criar conteúdo visual impressionante para sua sala de aula",
    xpReward: 150,
    orderIndex: 1
  },
  {
    id: 2,
    title: "Criando Apresentações Interativas",
    description: "Domine a arte de criar apresentações envolventes que cativam seus alunos",
    xpReward: 200,
    orderIndex: 2
  },
  {
    id: 3,
    title: "Gestão Digital da Sala de Aula",
    description: "Descubra ferramentas e técnicas para uma gestão eficaz da sala de aula digital",
    xpReward: 250,
    orderIndex: 3
  },
  {
    id: 4,
    title: "Ferramentas de Avaliação e Feedback",
    description: "Aprenda a usar ferramentas digitais para avaliação de alunos e fornecimento de feedback significativo",
    xpReward: 300,
    orderIndex: 4
  }
];

export const mockLessons: Lesson[] = [
  // Module 1 lessons
  {
    id: 1,
    moduleId: 1,
    title: "O que é o Canva para Educação?",
    content: "O Canva para Educação é uma plataforma de design poderosa e gratuita criada especificamente para educadores e estudantes. Ela fornece acesso a milhares de modelos, imagens e elementos de design que podem ajudá-lo a criar materiais educacionais com aparência profissional em minutos. Desde apresentações e cartazes até planilhas e infográficos, o Canva torna o design acessível a todos, independentemente de suas habilidades técnicas.",
    xpReward: 50,
    orderIndex: 1
  },
  {
    id: 2,
    moduleId: 1,
    title: "Configurando sua Conta de Educador",
    content: "Criar sua conta do Canva para Educação é simples e gratuito. Visite canva.com/education e inscreva-se com seu e-mail escolar. Você precisará verificar seu status de educador, o que normalmente leva de 1 a 2 dias úteis. Uma vez aprovado, você terá acesso a recursos premium, armazenamento ilimitado e a capacidade de criar turmas para seus alunos.",
    xpReward: 25,
    orderIndex: 2
  },
  {
    id: 3,
    moduleId: 1,
    title: "Navegando pela Interface do Canva",
    content: "A interface do Canva é projetada para ser intuitiva e amigável. O painel principal mostra seus designs recentes, modelos e pastas. O editor de design apresenta uma interface de arrastar e soltar com ferramentas para texto, imagens, formas e muito mais. Aprenda a usar a função de pesquisa para encontrar modelos e elementos específicos, e descubra como organizar seu trabalho com pastas e equipes.",
    xpReward: 75,
    orderIndex: 3
  },
  // Module 2 lessons
  {
    id: 4,
    moduleId: 2,
    title: "Escolhendo o Modelo Certo",
    content: "Selecionar o modelo perfeito é crucial para criar apresentações eficazes. Considere seu público, assunto e objetivos da apresentação. O Canva oferece modelos para vários contextos educacionais: slides de aula, apresentações de alunos, reuniões de pais e muito mais. Procure modelos com hierarquia clara, fontes legíveis e esquemas de cores apropriados para seu conteúdo.",
    xpReward: 60,
    orderIndex: 1
  },
  {
    id: 5,
    moduleId: 2,
    title: "Adicionando Elementos Interativos",
    content: "Torne suas apresentações envolventes com elementos interativos. Adicione botões clicáveis, vídeos incorporados e transições animadas. Use os recursos de animação do Canva para revelar conteúdo progressivamente, mantendo os alunos focados. Aprenda a incorporar enquetes, questionários e outras ferramentas interativas que incentivam a participação dos alunos e tornam o aprendizado mais dinâmico.",
    xpReward: 80,
    orderIndex: 2
  },
  {
    id: 6,
    moduleId: 2,
    title: "Compartilhamento e Colaboração",
    content: "O Canva facilita o compartilhamento de suas apresentações e a colaboração com colegas. Aprenda diferentes opções de compartilhamento: links somente para visualização, acesso de edição e modo de apresentação. Descubra como colaborar em tempo real com outros educadores, deixar comentários e sugestões, e manter o controle de versão de seus documentos compartilhados.",
    xpReward: 60,
    orderIndex: 3
  },
  // Module 3 lessons
  {
    id: 7,
    moduleId: 3,
    title: "Sistemas de Organização Digital",
    content: "A gestão eficaz da sala de aula digital começa com a organização. Aprenda a criar estruturas de pastas para diferentes disciplinas, níveis de ensino e tipos de projeto. Descubra convenções de nomenclatura que tornam os arquivos fáceis de encontrar e explore soluções de armazenamento em nuvem que mantêm seus materiais acessíveis de qualquer lugar.",
    xpReward: 70,
    orderIndex: 1
  },
  {
    id: 8,
    moduleId: 3,
    title: "Ferramentas de Colaboração Estudantil",
    content: "Promova a colaboração com ferramentas digitais que permitem aos alunos trabalhar juntos de forma eficaz. Aprenda sobre documentos compartilhados, quadros virtuais e ferramentas de gerenciamento de projetos projetadas para educação. Entenda como configurar projetos em grupo, monitorar o progresso e facilitar o feedback entre pares em ambientes digitais.",
    xpReward: 90,
    orderIndex: 2
  },
  {
    id: 9,
    moduleId: 3,
    title: "Cidadania Digital e Segurança",
    content: "Ensinar cidadania digital é essencial no mundo conectado de hoje. Aprenda a educar os alunos sobre segurança online, comportamento digital apropriado e uso responsável da tecnologia. Descubra recursos para ensinar sobre privacidade, prevenção de cyberbullying e avaliação crítica de informações online.",
    xpReward: 90,
    orderIndex: 3
  },
  // Module 4 lessons
  {
    id: 10,
    moduleId: 4,
    title: "Ferramentas de Avaliação Formativa",
    content: "Descubra ferramentas digitais que tornam a avaliação formativa perfeita e eficaz. Aprenda sobre enquetes em tempo real, bilhetes de saída e verificações rápidas que fornecem feedback imediato sobre a compreensão dos alunos. Explore plataformas que permitem respostas anônimas e visualização instantânea de dados para informar suas decisões de ensino.",
    xpReward: 80,
    orderIndex: 1
  },
  {
    id: 11,
    moduleId: 4,
    title: "Criando Rubricas Digitais",
    content: "As rubricas digitais simplificam o processo de avaliação e fornecem expectativas claras para os alunos. Aprenda a criar rubricas abrangentes que podem ser compartilhadas com os alunos antes das tarefas, usadas para avaliação por pares e facilmente aplicadas durante a correção. Descubra ferramentas que permitem feedback multimídia e comentários detalhados.",
    xpReward: 100,
    orderIndex: 2
  },
  {
    id: 12,
    moduleId: 4,
    title: "Fornecendo Feedback Significativo",
    content: "O feedback eficaz é oportuno, específico e acionável. Aprenda técnicas para fornecer feedback em áudio e vídeo que parece mais pessoal do que comentários escritos. Descubra como usar ferramentas de anotação, gravação de tela e documentos colaborativos para dar aos alunos feedback detalhado e construtivo que promove o crescimento.",
    xpReward: 120,
    orderIndex: 3
  }
];

export const mockBadges: Badge[] = [
  {
    id: 1,
    name: "Primeiros Passos",
    description: "Complete sua primeira aula",
    icon: "star",
    criteria: "complete_first_lesson",
    xpRequirement: 0
  },
  {
    id: 2,
    name: "Mestre do Módulo",
    description: "Complete seu primeiro módulo",
    icon: "trophy",
    criteria: "complete_first_module",
    xpRequirement: 0
  },
  {
    id: 3,
    name: "Novato em Design",
    description: "Ganhe 500 XP",
    icon: "paintbrush",
    criteria: "earn_xp",
    xpRequirement: 500
  },
  {
    id: 4,
    name: "Explorador Tech",
    description: "Complete 5 aulas",
    icon: "compass",
    criteria: "complete_lessons",
    xpRequirement: 0
  },
  {
    id: 5,
    name: "Campeão do Aprendizado",
    description: "Ganhe 1000 XP",
    icon: "award",
    criteria: "earn_xp",
    xpRequirement: 1000
  },
  {
    id: 6,
    name: "Educador Mestre",
    description: "Complete todos os módulos",
    icon: "graduation-cap",
    criteria: "complete_all_modules",
    xpRequirement: 0
  }
];