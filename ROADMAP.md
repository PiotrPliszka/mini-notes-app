# Mini Notes App Roadmap

Roadmapa jest zaktualizowana pod obecny stan kodu w repo.

## 1. Cel projektu

Projekt ma nauczyc:
- auth w praktyce
- pracy z `Django REST Framework`
- pracy z `React + Vite`
- budowy API i frontendu, ktore razem ogarniaja prywatne notatki usera

Docelowy flow:
- user rejestruje konto
- user loguje sie
- frontend zapisuje tokeny
- frontend pobiera `me`
- user zarzadza tylko swoimi notatkami

## 2. Co jest zrobione

### Backend

- skonfigurowany `Django`
- skonfigurowany `DRF`
- skonfigurowany `Simple JWT`
- skonfigurowany `CORS`
- custom `User`
- model `Note`
- migracje
- `register`
- `login`
- `refresh`
- `me`
- `GET /api/notes/`
- `POST /api/notes/`
- `GET /api/notes/<id>/`
- `PUT /api/notes/<id>/`
- `DELETE /api/notes/<id>/`
- filtrowanie notatek po `request.user`
- przypisywanie wlasciciela notatki po stronie backendu
- podstawowe testy auth
- podstawowe testy notes

### Frontend

- routing
- `HomePage`
- `RegisterPage`
- `LoginPage`
- `Dashboard`
- `AuthContext`
- `ProtectedRoute`
- axios client
- logowanie z zapisem `access` i `refresh`
- pobieranie usera przez `me`
- pobieranie listy notatek
- dodawanie notatek
- edycja notatek
- usuwanie notatek
- podstawowy system stylow i design tokens

## 3. Aktualny stan projektu

Backend:
- funkcjonalnie jest bardzo blisko domkniecia MVP
- wymaga jeszcze potwierdzenia jednym pelnym runem testow

Frontend:
- auth i dashboard juz dzialaja w podstawowej wersji
- nadal sa rzeczy do dopracowania w UX i flow

## 4. Aktualne modele

### User

- dziedziczy po `AbstractUser`
- `email` jest unikalny

### Note

- `title`
- `content`
- `user`
- `created_at`
- `updated_at`

## 5. Aktualne endpointy

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

## 6. Aktualne testy backendu

### Users tests

Masz juz napisane:
- `test_create_account`
- `test_login`
- `test_me`
- `test_refresh`

### Notes tests

Masz juz napisane:
- lista notatek wymaga auth
- tworzenie notatki wymaga auth
- user widzi tylko swoje notatki
- notatka tworzy sie z `request.user`
- user moze pobrac swoja notatke
- user nie moze pobrac cudzej notatki
- user moze edytowac swoja notatke
- user nie moze edytowac cudzej notatki
- user moze usunac swoja notatke
- user nie moze usunac cudzej notatki

Najblizszy krok backendowy:
- odpalic `python manage.py test`

## 7. Co jest jeszcze do dopracowania

### Backend

- uruchomic pelny test suite
- ewentualnie dodac kilka testow walidacji
- ewentualnie lekko posprzatac importy i drobiazgi

### Frontend auth

- dopracowac flow po rejestracji
- zdecydowac, czy po rejestracji user ma byc od razu logowany
- dodac lepsze komunikaty bledow i sukcesu
- ogarnac lepszy stan ladowania formularzy

### Frontend notes

- dopracowac UX dashboardu
- dodac lepsze empty states
- dodac lepsze error states
- rozwazyc bardziej modularny podzial komponentow

### Token flow

- przemyslec automatyczny `refresh` tokena po stronie frontu
- przemyslec zachowanie po wygasnieciu `access tokena`

## 8. Najblizszy sensowny plan

Najbardziej sensowna kolejnosc od teraz:

1. uruchomic pelny backend test suite
2. poprawic ewentualne bledy z test runa
3. dopracowac frontend auth
4. dopracowac dashboard i notatki
5. domknac UX
6. przygotowac deployment

## 9. Checklista

- [x] wybrac stack
- [x] skonfigurowac backend
- [x] skonfigurowac frontend
- [x] skonfigurowac `JWT`
- [x] stworzyc custom `User`
- [x] stworzyc model `Note`
- [x] zrobic migracje
- [x] zrobic `register`
- [x] zrobic `login`
- [x] zrobic `refresh`
- [x] zrobic `me`
- [x] zrobic CRUD notatek
- [x] zabezpieczyc notatki po userze
- [x] sprawdzic endpointy recznie
- [x] napisac podstawowe testy auth
- [x] napisac podstawowe testy notes
- [x] zrobic frontend auth pages
- [x] zrobic `AuthContext`
- [x] zrobic `ProtectedRoute`
- [x] zrobic podstawowy dashboard
- [x] podlaczyc notes do dashboardu
- [ ] odpalic pelny backend test suite
- [ ] dopracowac auth UX
- [ ] dopracowac notes UX
- [ ] ogarnac automatyczny refresh tokena albo jasny fallback
- [ ] wdrozyc aplikacje

## 10. Definition of done

Projekt bedzie sensownie domkniety, kiedy:
- backend przejdzie testy reczne i automatyczne
- frontend pozwoli sie zarejestrowac i zalogowac bez chaosu
- frontend bedzie poprawnie czytal `me`
- user bedzie widzial tylko swoje notatki
- user bedzie mogl tworzyc, edytowac i usuwac notatki z UI
- token flow bedzie przewidywalny po odswiezeniu strony
