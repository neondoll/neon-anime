export default function () {
  return useState('appLinks', () => ({
    calendar: { label: 'Календарь выхода аниме', icon: 'i-heroicons-calendar', to: '/calendar' },
    index: { label: 'Главная', icon: 'i-heroicons-home', to: '/' },
    list: { label: 'Список аниме', icon: 'i-heroicons-list-bullet', to: '/list' },
    login: { label: 'Авторизация', to: '/login' }
  }))
}