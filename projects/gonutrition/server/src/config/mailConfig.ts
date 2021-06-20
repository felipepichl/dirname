interface IMailConfig {
  driver: 'ethereal';

  defaults: {
    from: {
      email: string;
      name: string;
    };
  };
}

export default {
  driver: 'ethereal',

  defaults: {
    from: {
      email: '',
      name: '',
    },
  },
} as IMailConfig;
