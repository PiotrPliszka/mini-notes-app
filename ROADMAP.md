# Mini Notes App Roadmap

Roadmapa jest zaktualizowana pod aktualny stan repo, a nie tylko pod plan poczatkowy.

## 1. Cel projektu

Mini Notes App ma nauczyc:
- auth w praktyce
- pracy z `Django REST Framework`
- pracy z `React + Vite`
- filtrowania danych po zalogowanym uzytkowniku
- budowy pelnego CRUD od backendu do frontendu

Docelowo user:
- zaklada konto
- loguje sie
- pobiera swoje dane
- tworzy notatki
- edytuje swoje notatki
- usuwa swoje notatki
- widzi tylko swoje notatki

## 2. Stack

Frontend:
- `React 19`
- `Vite`
- `React Router`
- `Axios`
- `React Hot Toast`

Backend:
- `Django`
- `Django REST Framework`
- `Simple JWT`

Baza danych:
- `SQLite`

Tooling:
- `Docker`
- `Docker Compose`
- `ESLint`

## 3. Aktualny stan projektu

To jest stan faktyczny kodu na teraz.

Backend juz jest zrobiony w duzej czesci:
- projekt `Django` z katalogiem `config`
- aplikacje `users` i `notes`
- custom `User` oparty o `AbstractUser`
- model `Note`
- migracje
- konfiguracja `DRF`
- konfiguracja `JWT`
- konfiguracja `CORS`
- endpoint `register`
- endpoint `login`
- endpoint `refresh`
- endpoint `me`
- lista notatek zalogowanego usera
- tworzenie notatki przypisanej do `request.user`
- pobieranie, edycja i usuwanie tylko swoich notatek

Frontend jest jeszcze praktycznie nieruszony od strony logiki auth i notes.

## 4. Aktualne endpointy backendowe

Auth:
- `POST /api/auth/register/`
- `POST /api/auth/login/`
- `POST /api/auth/refresh/`
- `GET /api/auth/me/`

Notes:
- `GET /api/notes/`
- `POST /api/notes/`
- `GET /api/notes/<id>/`
- `PUT /api/notes/<id>/`
- `DELETE /api/notes/<id>/`

## 5. Aktualne modele

### User

Model:
- dziedziczy po `AbstractUser`
- `email` jest unikalny

W praktyce masz:
- `id`
- `username`
- `email`
- `password`
- `first_name`
- `last_name`
- pola systemowe Django auth

### Note

Pola:
- `id`
- `title`
- `content`
- `user`
- `created_at`
- `updated_at`

Relacja:
- jeden user ma wiele notatek
- jedna notatka nalezy do jednego usera

## 6. Aktualne serializery

Users:
- `RegisterSerializer`
- `UserSerializer`

Notes:
- `NoteSerializer`

Najwazniejsza zasada, ktora juz przerobilismy:
- serializer nie ma wystawiac wszystkiego z modelu
- serializer ma byc dopasowany do konkretnego use case

## 7. Aktualne widoki

Users:
- `UserCreateView`
- `UserMeView`
- gotowe widoki JWT z `Simple JWT`

Notes:
- `NoteListCreateView`
- `NoteDetailView`

Wazne:
- notatki sa filtrowane po `self.request.user`
- przy tworzeniu notatki backend ustawia `user=self.request.user`

## 8. Co jest juz ogarniete koncepcyjnie

Masz juz ogarniete:
- po co jest `RegisterSerializer`
- po co jest `UserSerializer`
- po co jest `NoteSerializer`
- roznice miedzy `create`, `validate`, `validate_<field>`
- po co jest `me`
- po co jest `refresh`
- dlaczego `confirm_password` jest tylko w serializerze
- dlaczego test jednego endpointu nie powinien zalezec od innego endpointu, jesli nie musi

## 9. Co jest jeszcze do zrobienia w backendzie

Backend nie jest jeszcze domkniety w 100%, bo brakuje:
- porzadnych testow automatycznych
- ewentualnego drobnego sprzatania importow i struktury

Najblizsze backendowe zadania:

### Auth tests

Do napisania:
- `test_create_account`
- `test_login`
- `test_refresh`
- `test_me_requires_auth`
- `test_me_returns_current_user`

### Notes tests

Do napisania:
- lista notatek wymaga auth
- user widzi tylko swoje notatki
- tworzenie notatki przypisuje `request.user`
- user nie moze pobrac cudzej notatki
- user nie moze edytowac cudzej notatki
- user nie moze usunac cudzej notatki

## 10. Jak myslec o testach

Najwazniejsza zasada:
- test ma sprawdzac jedna rzecz

Przyklad:
- `test_create_account` testuje endpoint rejestracji
- `test_login` testuje endpoint logowania
- `test_me` testuje endpoint `me`

To znaczy:
- jesli testujesz `login`, user moze byc przygotowany bezposrednio w bazie przez `create_user(...)`
- nie musisz w tescie `login` robic calego flow `register`

Najprostszy model myslenia:
- to, co jest przedmiotem testu, odpalasz przez endpoint
- to, co jest tylko setupem, mozesz przygotowac w bazie

## 11. Co dalej po backendzie

Po domknieciu testow backendu:

1. frontend auth
- strona `Register`
- strona `Login`
- zapis tokenow
- pobieranie `me`
- protected routes

2. frontend notes
- lista notatek
- dodawanie notatek
- edycja notatek
- usuwanie notatek

3. UX
- loading state
- error state
- toasty
- puste stany

## 12. Frontend routes do zrobienia

Planowany minimalny zestaw:
- `/`
- `/register`
- `/login`
- `/dashboard`
- `/notes/:id/edit`

## 13. Najblizszy sensowny plan

Najlepsza kolejnosc od teraz:

1. domknac testy backendu
2. upewnic sie, ze auth i notes sa stabilne
3. przejsc do frontendu auth
4. przejsc do frontendu notes
5. dopracowac UX

## 14. Aktualna checklista

- [x] wybrac stack
- [x] postawic backend
- [x] skonfigurowac `Django`
- [x] skonfigurowac `DRF`
- [x] skonfigurowac `JWT`
- [x] skonfigurowac `CORS`
- [x] stworzyc custom `User`
- [x] stworzyc model `Note`
- [x] zrobic migracje
- [x] zrobic `register`
- [x] zrobic `login`
- [x] zrobic `refresh`
- [x] zrobic `me`
- [x] zrobic `GET /api/notes/`
- [x] zrobic `POST /api/notes/`
- [x] zrobic `GET /api/notes/<id>/`
- [x] zrobic `PUT /api/notes/<id>/`
- [x] zrobic `DELETE /api/notes/<id>/`
- [x] sprawdzic backend recznie przez Thunder Client
- [ ] domknac testy automatyczne auth
- [ ] domknac testy automatyczne notes
- [ ] zaczac frontend auth
- [ ] zrobic frontend notes
- [ ] dopracowac UX
- [ ] wdrozyc aplikacje

## 15. Definition of done

Projekt bedzie sensownie domkniety, kiedy:
- backend przejdzie testy reczne i automatyczne
- frontend pozwoli sie zarejestrowac i zalogowac
- frontend bedzie pokazywal dane z `me`
- user zobaczy tylko swoje notatki
- user bedzie mogl tworzyc, edytowac i usuwac swoje notatki z UI
- flow auth bedzie dzialal po odswiezeniu strony

## 16. Najwazniejsza rzecz na teraz

Na ten moment nie potrzebujesz juz rozbudowywac backendu o nowe ficzery.

Najbardziej sensowny krok:
- nauczyc sie testow na tym, co juz zrobiles

To domknie backend i da Ci mocny fundament pod frontend.
