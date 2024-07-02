import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { IMovie } from '@/types/IMovie'
import type IUser from '@/types/IUser'


export const useAppStore = defineStore('global-store', () => {

  // Для смены страницы общих жанров на определенный
  const isGenreOpened = ref<boolean>(false)

  // Записываем какой фильм открыт
  const activeMovie = ref<IMovie | null>(null)

  // Меняем при открытии определенного филдьма с любого места
  const isOpenedMovie = ref<boolean>(false)
  function openMovie(movie: IMovie): void {
    activeMovie.value = movie;
    isOpenedMovie.value = true;
    localStorage.setItem('currentMovie', JSON.stringify(movie))
}


  const clientWidth = document.documentElement.clientWidth;

  // Открываем модальное окно
  const isModalOpen = ref<boolean>(false)

  // Тип модального окна
  const modalType = ref<string>('login')

  // Авторизирован или нет
  const isAuthorised = ref<boolean>(false)
  // Пользователь
  const currentUser = ref<IUser | null>(null)

  const isTrailerOpen = ref<boolean>(false)

  function openModal(): void  {
    isModalOpen.value = true
  }

  // ПРоверка размера окна
  const width = ref<number>(document.documentElement.offsetWidth) ;
  const checkWidth = () => {
    width.value = document.documentElement.offsetWidth;
  }

  const currentPath = ref<string>('')

  function setCurrentPath(path: string): void {
    currentPath.value = path
    localStorage.setItem('path', currentPath.value)
  }


  // Закрытие модального
  function closeModal(): void  {
    isModalOpen.value = false
    modalType.value = 'login'
  }

  const authError = ref<boolean>(false)

  // Функция смены текста кнопки модального
  function modalSecondPress(): void {
    authError.value = false
    if(modalType.value === 'login') {
      modalType.value = 'register'
    } else {
      modalType.value = 'login'
    }
  }

  // Запрос аккаунта на сервер
  async function showAcc() {
  const response = await fetch('https://cinemaguide.skillbox.cc/profile', {credentials: 'include'})
  const data: IUser = await response.json()
  currentUser.value = Object.assign({}, data)
  localStorage.setItem('currentUser', JSON.stringify(currentUser.value))
}

  // Добавлять в избранное
  async function addFavorite(nr: number) {
    await fetch('https://cinemaguide.skillbox.cc/favorites', {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify({
      id: String(nr)
    }),
    headers: {
        "Content-Type": "application/json",
      }
    })
    showAcc()
  }

  async function removeFavorite(id:number) {
    await fetch('https://cinemaguide.skillbox.cc/favorites/' + id, {
      method: 'DELETE',
      credentials: 'include'
    })
    showAcc()
  }

  async function closeAccount() {
    await fetch('https://cinemaguide.skillbox.cc/auth/logout', {
      credentials: 'include',
    })
    isAuthorised.value = false
    currentUser.value = null
    localStorage.removeItem('currentUser')
  }





  return { isGenreOpened, activeMovie, openMovie, isOpenedMovie, isModalOpen, isTrailerOpen, modalType, authError,
    currentUser,  isAuthorised, openModal, closeModal, modalSecondPress, showAcc, addFavorite,
     removeFavorite, closeAccount, clientWidth, checkWidth, width, currentPath, setCurrentPath
     }
})
