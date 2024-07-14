export const useAppLinks = () => {
  return useState('appLinks', () => ({
    calendar: {
      label: 'Календарь выхода аниме',
      icon: 'i-heroicons-calendar',
      to: { name: 'calendar' }
    },
    index: { label: 'Главная', icon: 'i-heroicons-home', to: { name: 'index' } },
    list: { label: 'Список аниме', icon: 'i-heroicons-list-bullet', to: { name: 'list' } },
    login: { label: 'Авторизация', to: { name: 'login' } }
  }));
};
