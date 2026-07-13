export type PublicConfig = {
  companyName: string;
  domain: string;
  corporateEmail: string;
  phone: string;
  address: string;
  logo: string;
  slogan: string;
  social: {
    linkedin: string;
    instagram: string;
    youtube: string;
    x: string;
  };
  entities: {
    foundation: string;
    bibliotecaViva: string;
    albatour: string;
  };
  seo: {
    defaultTitle: string;
    defaultDescription: string;
  };
};

export const publicConfig: PublicConfig = {
  companyName: 'ReproOrigen XXI',
  domain: 'https://reproorigen21.com',
  corporateEmail: 'contacto@reproorigen21.com',
  phone: '+34 960 000 000',
  address: 'Comunidad Valenciana, Espana',
  logo: '/favicon.svg',
  slogan: 'El Origen que Despierta.',
  social: {
    linkedin: 'https://www.linkedin.com/company/reproorigenxxi',
    instagram: 'https://www.instagram.com/reproorigenxxi',
    youtube: 'https://www.youtube.com/@reproorigenxxi',
    x: 'https://x.com/reproorigenxxi'
  },
  entities: {
    foundation: 'Fundación ReproOrigen XXI',
    bibliotecaViva: 'Biblioteca Viva',
    albatour: 'Albatour'
  },
  seo: {
    defaultTitle: 'ReproOrigen XXI',
    defaultDescription: 'Ecosistema de tecnologia, IA y colaboracion para empresas, personas y territorios.'
  }
};
