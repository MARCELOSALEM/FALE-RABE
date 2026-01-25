
import { ArabicLetter } from './types';

export const ALPHABET: ArabicLetter[] = [
  { 
    char: 'ا', name: 'Alif', trans: 'ā / a', desc: 'Vogal longa ou suporte. Não conecta à esquerda.',
    forms: { isolated: 'ا', initial: 'ا', medial: 'ـا', final: 'ـا' },
    example: { word: 'أب', meaning: 'Pai' }
  },
  { 
    char: 'ب', name: 'Ba', trans: 'b', desc: 'Como o "B" em bola. Ponto embaixo.',
    forms: { isolated: 'ب', initial: 'بـ', medial: 'ـبـ', final: 'ـب' },
    example: { word: 'بيت', meaning: 'Casa' }
  },
  { 
    char: 'ت', name: 'Ta', trans: 't', desc: 'Como o "T" em tatu. Dois pontos em cima.',
    forms: { isolated: 'ت', initial: 'تـ', medial: 'ـتـ', final: 'ـت' },
    example: { word: 'تفاح', meaning: 'Maçã' }
  },
  { 
    char: 'ث', name: 'Tha', trans: 'th', desc: 'Interdental (como "think"). Três pontos em cima.',
    forms: { isolated: 'ث', initial: 'ثـ', medial: 'ـثـ', final: 'ـث' },
    example: { word: 'ثعبان', meaning: 'Cobra' }
  },
  { 
    char: 'ج', name: 'Jim', trans: 'j / g', desc: 'Como o "J" ou "G". Ponto no meio/baixo.',
    forms: { isolated: 'ج', initial: 'جـ', medial: 'ـجـ', final: 'ـج' },
    example: { word: 'جمل', meaning: 'Camelo' }
  },
  { 
    char: 'ح', name: 'Ha', trans: 'ḥ', desc: 'H forte, sussurrado do fundo da garganta. Sem pontos.',
    forms: { isolated: 'ح', initial: 'حـ', medial: 'ـحـ', final: 'ـح' },
    example: { word: 'حليب', meaning: 'Leite' }
  },
  { 
    char: 'خ', name: 'Kha', trans: 'kh', desc: 'Raspado na garganta (como o "R" carioca). Ponto em cima.',
    forms: { isolated: 'خ', initial: 'خـ', medial: 'ـخـ', final: 'ـخ' },
    example: { word: 'خبز', meaning: 'Pão' }
  },
  { 
    char: 'د', name: 'Dal', trans: 'd', desc: 'Como o "D". Não conecta à esquerda.',
    forms: { isolated: 'د', initial: 'د', medial: 'ـد', final: 'ـد' },
    example: { word: 'دب', meaning: 'Urso' }
  },
  { 
    char: 'ذ', name: 'Dhal', trans: 'dh', desc: 'Interdental sonoro (como "this"). Ponto em cima.',
    forms: { isolated: 'ذ', initial: 'ذ', medial: 'ـذ', final: 'ـذ' },
    example: { word: 'ذهب', meaning: 'Ouro' }
  },
  { 
    char: 'ر', name: 'Ra', trans: 'r', desc: 'R vibrado. Não conecta à esquerda.',
    forms: { isolated: 'ر', initial: 'ر', medial: 'ـر', final: 'ـر' },
    example: { word: 'رجل', meaning: 'Homem' }
  },
  { 
    char: 'ز', name: 'Zay', trans: 'z', desc: 'Como o "Z". Ponto em cima. Não conecta à esquerda.',
    forms: { isolated: 'ز', initial: 'ز', medial: 'ـز', final: 'ـز' },
    example: { word: 'زيتون', meaning: 'Azeitona' }
  },
  { 
    char: 'س', name: 'Sin', trans: 's', desc: 'Como o "S". Três dentes.',
    forms: { isolated: 'س', initial: 'سـ', medial: 'ـسـ', final: 'ـس' },
    example: { word: 'سماء', meaning: 'Céu' }
  },
  { 
    char: 'ش', name: 'Shin', trans: 'sh', desc: 'Como "X" ou "CH". Três pontos em cima.',
    forms: { isolated: 'ش', initial: 'شـ', medial: 'ـشـ', final: 'ـش' },
    example: { word: 'شمس', meaning: 'Sol' }
  },
  { 
    char: 'ص', name: 'Sad', trans: 'ṣ', desc: 'S enfático. Forma ovalada.',
    forms: { isolated: 'ص', initial: 'صـ', medial: 'ـصـ', final: 'ـص' },
    example: { word: 'صندوق', meaning: 'Caixa' }
  },
  { 
    char: 'ض', name: 'Dad', trans: 'ḍ', desc: 'D enfático. Igual ao Sad, mas com ponto.',
    forms: { isolated: 'ض', initial: 'ضـ', medial: 'ـضـ', final: 'ـض' },
    example: { word: 'ضوء', meaning: 'Luz' }
  },
  { 
    char: 'ط', name: 'Ta (Enfático)', trans: 'ṭ', desc: 'T enfático. Haste vertical.',
    forms: { isolated: 'ط', initial: 'طـ', medial: 'ـطـ', final: 'ـط' },
    example: { word: 'طير', meaning: 'Pássaro' }
  },
  { 
    char: 'ظ', name: 'Za', trans: 'ẓ', desc: 'Z enfático. Igual ao Ta, mas com ponto.',
    forms: { isolated: 'ظ', initial: 'ظـ', medial: 'ـظـ', final: 'ـظ' },
    example: { word: 'ظل', meaning: 'Sombra' }
  },
  { 
    char: 'ع', name: 'Ayn', trans: 'ʿ', desc: 'Som gutural profundo. Olho aberto.',
    forms: { isolated: 'ع', initial: 'عـ', medial: 'ـعـ', final: 'ـع' },
    example: { word: 'عين', meaning: 'Olho' }
  },
  { 
    char: 'غ', name: 'Ghayn', trans: 'gh', desc: 'Como "R" francês. Igual Ayn, com ponto.',
    forms: { isolated: 'غ', initial: 'غـ', medial: 'ـغـ', final: 'ـغ' },
    example: { word: 'غابة', meaning: 'Floresta' }
  },
  { 
    char: 'ف', name: 'Fa', trans: 'f', desc: 'Como o "F". Cabeça redonda com um ponto.',
    forms: { isolated: 'ف', initial: 'فـ', medial: 'ـفـ', final: 'ـف' },
    example: { word: 'فيل', meaning: 'Elefante' }
  },
  { 
    char: 'ق', name: 'Qaf', trans: 'q', desc: 'K profundo. Dois pontos.',
    forms: { isolated: 'ق', initial: 'قـ', medial: 'ـقـ', final: 'ـق' },
    example: { word: 'قمر', meaning: 'Lua' }
  },
  { 
    char: 'ك', name: 'Kaf', trans: 'k', desc: 'Como o "C". Muda de forma drasticamente no início.',
    forms: { isolated: 'ك', initial: 'كـ', medial: 'ـكـ', final: 'ـك' },
    example: { word: 'كتاب', meaning: 'Livro' }
  },
  { 
    char: 'ل', name: 'Lam', trans: 'l', desc: 'Como o "L".',
    forms: { isolated: 'ل', initial: 'لـ', medial: 'ـلـ', final: 'ـل' },
    example: { word: 'ليل', meaning: 'Noite' }
  },
  { 
    char: 'م', name: 'Mim', trans: 'm', desc: 'Como o "M".',
    forms: { isolated: 'م', initial: 'مـ', medial: 'ـمـ', final: 'ـم' },
    example: { word: 'مدرسه', meaning: 'Escola' }
  },
  { 
    char: 'ن', name: 'Nun', trans: 'n', desc: 'Como o "N". Um ponto em cima.',
    forms: { isolated: 'ن', initial: 'نـ', medial: 'ـنـ', final: 'ـن' },
    example: { word: 'نار', meaning: 'Fogo' }
  },
  { 
    char: 'ه', name: 'Ha', trans: 'h', desc: 'H suave. Muda muito de forma.',
    forms: { isolated: 'ه', initial: 'هـ', medial: 'ـهـ', final: 'ـه' },
    example: { word: 'هلال', meaning: 'Crescente' }
  },
  { 
    char: 'و', name: 'Waw', trans: 'w / ū', desc: 'Como "U" ou "W". Não conecta à esquerda.',
    forms: { isolated: 'و', initial: 'و', medial: 'ـو', final: 'ـو' },
    example: { word: 'ولد', meaning: 'Menino' }
  },
  { 
    char: 'ي', name: 'Ya', trans: 'y / ī', desc: 'Como "I" ou "Y". Dois pontos embaixo no início/meio.',
    forms: { isolated: 'ي', initial: 'يـ', medial: 'ـيـ', final: 'ـي' },
    example: { word: 'يد', meaning: 'Mão' }
  }
];
