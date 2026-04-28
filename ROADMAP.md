# Mini Notes App

Projekt do nauki fullstacka i auth.

Cel aplikacji:
- uzytkownik zaklada konto
- loguje sie
- tworzy swoje notatki
- edytuje je
- usuwa je
- widzi tylko swoje dane

To bardzo dobry projekt na start, bo temat jest prosty, ale technicznie dotyka rzeczy, ktore wracaja prawie w kazdej wiekszej aplikacji:
- autoryzacja i uwierzytelnianie
- relacje w bazie danych
- CRUD
- ochrona endpointow i widokow
- praca na danych zalogowanego uzytkownika

## 1. Glowny cel projektu

Na koniec chcesz miec aplikacje, w ktorej:
- nowy uzytkownik moze sie zarejestrowac
- zarejestrowany uzytkownik moze sie zalogowac
- po zalogowaniu trafia do dashboardu
- moze dodawac notatki
- moze edytowac tylko swoje notatki
- moze usuwac tylko swoje notatki
- po odswiezeniu strony nadal jest zalogowany, jesli sesja/token nadal sa wazne
- niezalogowany uzytkownik nie widzi dashboardu ani notatek

## 2. Zakres MVP

Najpierw zrob wersje MVP, czyli najprostsza sensowna wersje.

MVP powinno zawierac:
- `register`
- `login`
- `logout`
- pobranie danych zalogowanego uzytkownika
- tworzenie notatki
- lista notatek zalogowanego uzytkownika
- edycja notatki
- usuwanie notatki
- ochrona tras na froncie
- ochrona endpointow na backendzie

Nie dodawaj na poczatku:
- wyszukiwarki
- tagow
- kategorii
- udostepniania notatek
- rich text editora
- drag and drop
- zaawansowanych rolek i permisji

Najpierw skoncz podstawy.

## 3. Czego sie nauczysz

Ten projekt uczy:
- jak dziala przeplyw `request -> backend -> baza -> frontend`
- jak przechowywac hasla bezpiecznie
- jak dziala logowanie przez `JWT` albo `session`
- jak ograniczac dostep do danych po `userId`
- jak organizowac backend i frontend
- jak obslugiwac formularze, bledy i loading state
- jak myslec o bezpieczenstwie juz od poczatku

## 4. Stack w tym projekcie

Na podstawie Twojego poprzedniego projektu zakladam, ze chcesz trzymac sie podobnego stacku:

Frontend:
- `React 19`
- `Vite`
- `React Router`
- `Axios`
- `React Hot Toast`

Backend:
- `Django`
- `Django REST Framework`

Baza danych:
- `SQLite` na start

Tooling:
- `ESLint`
- `Docker`
- `Docker Compose`

To jest bardzo sensowny wybor, bo:
- nie uczysz sie nowego stacku od zera
- mozesz skupic sie na auth i logice aplikacji
- masz juz punkt odniesienia z poprzedniego CRUD projektu

W tej roadmapie zakladam wlasnie ten stack:
- frontend w `React + Vite`
- backend API w `Django + DRF`
- baza `SQLite`

Jesli pozniej zechcesz, mozna to podmienic na `PostgreSQL`, ale na start `SQLite` w zupelnosci wystarczy.

## 5. Architektura aplikacji

Podziel to logicznie na 2 czesci:

Frontend:
- strony
- formularze
- routing
- przechowywanie stanu zalogowania
- wysylanie requestow do API

Backend:
- auth
- user
- notes
- middleware ochrony endpointow
- logika dostepu do danych

Przeplyw danych:
1. user rejestruje konto
2. backend tworzy uzytkownika w bazie
3. user loguje sie
4. backend zwraca token albo zaklada sesje
5. frontend zapisuje stan logowania
6. frontend wysyla requesty do endpointow notatek
7. backend sprawdza, kim jest user
8. backend zwraca tylko notatki tego usera

## 6. Modele danych

Minimalne modele:

### User

Pola:
- `id`
- `email`
- `passwordHash`
- `createdAt`
- `updatedAt`

Opcjonalnie pozniej:
- `name`

### Note

Pola:
- `id`
- `title`
- `content`
- `userId`
- `createdAt`
- `updatedAt`

Relacja:
- jeden `User` ma wiele `Note`
- jedna `Note` nalezy do jednego `User`

Przyklad relacji:
- `User 1 -> Note 1, Note 2, Note 3`
- `User 2 -> Note 4, Note 5`

## 7. Widoki na froncie

Minimalny zestaw widokow:

### Home

Zawartosc:
- krotki opis aplikacji
- przycisk `Register`
- przycisk `Login`

### Register

Formularz:
- `email`
- `password`
- opcjonalnie `confirm password`

### Login

Formularz:
- `email`
- `password`

### Dashboard

Zawartosc:
- info o zalogowanym userze
- przycisk `Logout`
- lista notatek
- przycisk `Add Note`
- akcje `Edit` i `Delete` przy notatce

### Add Note

Formularz:
- `title`
- `content`

### Edit Note

Formularz:
- `title`
- `content`
- wczytanie danych istniejacej notatki

## 8. Endpointy backendowe

Przykladowe endpointy:

Auth:
- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/logout`
- `GET /api/auth/me`

Notes:
- `GET /api/notes`
- `GET /api/notes/:id`
- `POST /api/notes`
- `PUT /api/notes/:id`
- `DELETE /api/notes/:id`

## 9. Co powinien robic kazdy endpoint

### POST /api/auth/register

Powinien:
- przyjac `email` i `password`
- sprawdzic walidacje
- sprawdzic czy user juz istnieje
- zhashowac haslo
- zapisac usera w bazie
- zwrocic sukces

### POST /api/auth/login

Powinien:
- przyjac `email` i `password`
- znalezc usera
- porownac haslo z hashem
- wygenerowac token albo zalozyc sesje
- zwrocic dane potrzebne frontendowi

### POST /api/auth/logout

Powinien:
- usunac sesje albo po stronie frontu wyczyscic token
- zwrocic sukces

### GET /api/auth/me

Powinien:
- sprawdzic czy user jest zalogowany
- zwrocic dane aktualnego usera

### GET /api/notes

Powinien:
- zwrocic tylko notatki zalogowanego usera

### GET /api/notes/:id

Powinien:
- znalezc notatke po `id`
- sprawdzic czy nalezy do aktualnego usera
- jesli nie, zwrocic `403` albo `404`

### POST /api/notes

Powinien:
- utworzyc notatke przypisana do aktualnego usera

### PUT /api/notes/:id

Powinien:
- znalezc notatke
- sprawdzic wlasciciela
- zaktualizowac tylko jesli nalezy do usera

### DELETE /api/notes/:id

Powinien:
- znalezc notatke
- sprawdzic wlasciciela
- usunac tylko jesli nalezy do usera

## 10. Najwazniejsza zasada bezpieczenstwa

Nigdy nie ufaj frontendowi.

To znaczy:
- nie wystarczy schowac przycisku `Edit` albo `Delete`
- backend zawsze musi sprawdzic, do kogo nalezy zasob
- frontend moze byc zmanipulowany

Najwazniejsza zasada w tym projekcie:
- kazda operacja na notatce musi byc filtrowana po `userId`

Przyklad:
- user A nie moze pobrac notatki usera B nawet jesli zgadnie jej `id`

## 11. JWT czy session

Masz 2 sensowne opcje.

### Opcja 1: JWT

Plusy:
- popularne
- dobre do nauki
- latwo laczyc frontend i backend osobno

Minusy:
- trzeba uwazac, gdzie przechowujesz token
- trzeba lepiej rozumiec kwestie bezpieczenstwa

### Opcja 2: Session auth

Plusy:
- czesto prostsze i bezpieczniejsze w klasycznych appkach
- backend ma wieksza kontrole

Minusy:
- mniej intuicyjne na samym poczatku, jesli uczysz sie REST API oddzielnie

Na start polecam:
- `JWT`, jesli chcesz zrozumiec nowoczesny frontend + API
- `session`, jesli chcesz zrozumiec klasyczne logowanie bardziej serwerowo

Jesli nie wiesz co wybrac:
- wybierz `JWT`

## 12. Kolejnosc pracy krok po kroku

To jest najwazniejsza sekcja. Idz po kolei i nie skacz za bardzo miedzy warstwami.

### Etap 1: Zaplanuj aplikacje

Zrob:
- wypisz widoki
- wypisz endpointy
- wypisz modele
- zdecyduj `JWT` czy `session`
- wybierz baze danych

Cel etapu:
- masz jasny plan zanim zaczniesz kod

### Etap 2: Postaw backend

Zrob:
- inicjalizacja projektu `Django`
- stworzenie aplikacji, np. `notes`
- instalacja i konfiguracja `Django REST Framework`
- konfiguracja zmiennych srodowiskowych
- podlaczenie bazy danych
- przygotowanie modelu uzytkownika
- przygotowanie modelu `Note`

Cel etapu:
- backend dziala i laczy sie z baza

### Etap 3: Rejestracja uzytkownika

Zrob:
- endpoint `register`
- walidacja danych
- sprawdzanie duplikatu emaila
- hashowanie hasla przez mechanizmy `Django`
- zapis usera w bazie

Na co uwazac:
- nie zapisuj surowego hasla recznie
- sprawdzaj, czy email juz istnieje

Cel etapu:
- da sie zalozyc konto

### Etap 4: Logowanie uzytkownika

Zrob:
- endpoint `login`
- porownanie hasla przez system auth `Django`
- generowanie tokenu albo stworzenie sesji
- endpoint `me`

Na co uwazac:
- nie zwracaj `passwordHash`
- poprawnie obsluguj bledne dane logowania

Cel etapu:
- user moze sie zalogowac i backend umie rozpoznac, kto jest zalogowany

### Etap 5: Middleware auth

Zrob:
- middleware odczytujacy token albo sesje
- identyfikacja aktualnego usera
- odrzucanie niezalogowanych requestow

Cel etapu:
- masz mechanizm ochrony endpointow

### Etap 6: CRUD notatek na backendzie

Zrob:
- `POST /notes`
- `GET /notes`
- `GET /notes/:id`
- `PUT /notes/:id`
- `DELETE /notes/:id`

Na co uwazac:
- zawsze filtruj po `userId`
- nie pozwol edytowac cudzych notatek
- nie pozwol usuwac cudzych notatek

Cel etapu:
- backend notatek jest kompletny

### Etap 7: Testowanie backendu

Zrob:
- test rejestracji
- test logowania
- test pobrania profilu
- test tworzenia notatki
- test listy notatek
- test edycji wlasnej notatki
- test blokady edycji cudzej notatki
- test usuniecia wlasnej notatki

Mozesz testowac przez:
- `Postman`
- `Insomnia`
- `Thunder Client`
- testy `Django` / `DRF APITestCase`

Cel etapu:
- backend jest sprawdzony zanim podlaczysz frontend

### Etap 8: Postaw frontend

Zrob:
- inicjalizacja projektu frontendowego
- routing
- podstawowy layout
- widoki `Home`, `Register`, `Login`, `Dashboard`

Cel etapu:
- frontend ma strukture i strony

### Etap 9: Formularze auth na froncie

Zrob:
- formularz rejestracji
- formularz logowania
- wysylanie requestow do backendu
- obsluga bledow
- komunikaty sukcesu

Cel etapu:
- user moze sie zarejestrowac i zalogowac z UI

### Etap 10: Stan zalogowania

Zrob:
- przechowywanie usera
- przechowywanie tokenu albo opieranie sie o sesje
- odtwarzanie sesji po odswiezeniu
- pobieranie `me` przy starcie aplikacji

Cel etapu:
- frontend wie, czy user jest zalogowany

### Etap 11: Chronione trasy

Zrob:
- route guard dla dashboardu
- przekierowanie niezalogowanego usera na `login`
- ukrywanie ekranow auth dla zalogowanego usera, jesli chcesz

Cel etapu:
- user nie wejdzie do dashboardu bez logowania

### Etap 12: Widok notatek

Zrob:
- pobranie listy notatek
- render listy
- obsluga stanu pustego
- obsluga loadingu
- obsluga bledow

Cel etapu:
- dashboard pokazuje dane z backendu

### Etap 13: Dodawanie notatek

Zrob:
- formularz tworzenia notatki
- request `POST /notes`
- odswiezanie listy po dodaniu

Cel etapu:
- user moze dodac notatke przez UI

### Etap 14: Edycja notatek

Zrob:
- formularz edycji
- pobranie danych notatki
- request `PUT /notes/:id`

Cel etapu:
- user moze edytowac swoje notatki

### Etap 15: Usuwanie notatek

Zrob:
- przycisk `Delete`
- potwierdzenie usuniecia
- request `DELETE /notes/:id`
- aktualizacja listy po usunieciu

Cel etapu:
- user moze usuwac swoje notatki

### Etap 16: Sprzatanie i refactor

Zrob:
- uporzadkuj foldery
- wydziel komponenty
- wydziel serwisy API
- wydziel middleware
- popraw nazwy i czytelnosc kodu

Cel etapu:
- projekt jest czysty i latwy do rozwoju

### Etap 17: Walidacja i UX

Zrob:
- walidacja formularzy
- komunikaty bledow
- disabled state przy submit
- loading state
- puste stany
- potwierdzenia sukcesu

Cel etapu:
- aplikacja dziala przyjemniej i wyglada dojrzalej

### Etap 18: Deployment

Zrob:
- wrzuc backend
- wrzuc frontend
- ustaw zmienne srodowiskowe
- skonfiguruj baze produkcyjna

Cel etapu:
- aplikacja jest online

## 13. Sugerowana kolejnosc folderow

To tylko przyklad, nie jedyny poprawny uklad.

### Backend

```txt
backend/
  config/
  notes/
  users/
  manage.py
  requirements.txt
```

### Frontend

```txt
frontend/
  src/
    components/
    pages/
    layouts/
    routes/
    api/
    context/
    hooks/
    utils/
    App.jsx
    main.jsx
```

## 14. Minimalna logika auth

W `Django + DRF` masz dwie bardzo sensowne drogi:
- `session auth`
- `JWT`

Na start do nauki SPA z osobnym frontendem najczesciej wybiera sie `JWT`, np. przez `djangorestframework-simplejwt`.

Flow z `JWT` moze wygladac tak:

1. user loguje sie przez `POST /api/auth/login`
2. backend zwraca `access token` i opcjonalnie `refresh token`
3. frontend zapisuje token
4. frontend wysyla token w naglowku `Authorization: Bearer ...`
5. DRF sprawdza token
6. backend rozpoznaje `request.user`
7. endpoint filtruje dane po `request.user`

Przykladowa idea:
- tworzysz notatke z `user=request.user`
- pobierasz notatki przez `Note.objects.filter(user=request.user)`

Jesli wybierzesz `session auth`, flow jest podobny z punktu widzenia usera, ale backend utrzymuje sesje i frontend wysyla ciasteczka.

Do tego projektu polecam:
- `JWT`, jesli chcesz cwiczyc nowoczesny frontend + osobne API
- `session auth`, jesli chcesz prostszy model po stronie backendu

Jesli nie wiesz co wybrac:
- wybierz `JWT`

## 15. Najczestsze bledy w takim projekcie

Uwazaj szczegolnie na to:
- przechowywanie zwyklego hasla zamiast hasha
- brak sprawdzania wlasciciela notatki
- brak walidacji danych wejsciowych
- brak obslugi bledow HTTP
- wrzucanie calej logiki do jednego pliku
- mieszanie logiki auth z logika notatek
- zapominanie o `loading` i `error state` na froncie
- robienie zbyt wielu ficzerow zanim MVP dziala
- brak poprawnej konfiguracji `permission classes` w DRF
- filtrowanie notatek tylko na froncie zamiast na backendzie
- wystawienie endpointu `NoteDetail` bez sprawdzenia wlasciciela

## 16. Co testowac recznie

Lista kontrolna:
- czy rejestracja dziala
- czy nie da sie zalozyc dwoch kont na ten sam email
- czy login dziala poprawnie
- czy bledne haslo zwraca blad
- czy niezalogowany user nie wejdzie do dashboardu
- czy da sie dodac notatke
- czy po odswiezeniu notatka nadal jest na liscie
- czy da sie edytowac notatke
- czy da sie usunac notatke
- czy user A nie widzi notatek usera B
- czy user A nie moze usunac notatki usera B przez reczny request

## 17. Rozszerzenia po MVP

Dopiero po skonczeniu podstaw mozesz dodac:
- wyszukiwarke notatek
- paginacje
- tagi
- przypinanie notatek
- sortowanie
- profil uzytkownika
- reset hasla
- potwierdzenie emaila
- dark mode
- testy automatyczne
- refresh token flow
- pagination w DRF

## 18. Jak pracowac, zeby sie nie zakopac

Dobra kolejnosc myslenia:
- najpierw backend auth
- potem backend notes
- potem testy endpointow
- potem frontend auth
- potem frontend notes
- potem dopieszczanie

Dobra zasada:
- nie buduj 10 rzeczy naraz
- skoncz jedna mala rzecz end-to-end
- dopiero potem bierz kolejna

Przyklad dobrego tempa:
1. dzis rejestracja
2. potem login
3. potem `me`
4. potem `GET /notes`
5. potem `POST /notes`
6. potem `PUT /notes`
7. potem `DELETE /notes`
8. potem frontend

W Twoim stacku warto myslec tez tak:
- najpierw modele i serializery
- potem widoki i endpointy
- potem permissiony
- potem frontend pod gotowe API

## 19. Plan pracy w praktyce

Jesli chcesz robic to sensownie i bez chaosu, to ten plan jest bardzo dobry:

### Tydzien 1
- setup backendu
- baza danych
- model usera
- register
- login
- me

### Tydzien 2
- middleware auth
- model note
- CRUD notatek
- testowanie backendu

### Tydzien 3
- setup frontendu
- register page
- login page
- auth state
- protected routes

### Tydzien 4
- dashboard
- add note
- edit note
- delete note
- poprawki UX

Oczywiscie mozesz to zrobic szybciej albo wolniej. Chodzi tylko o spokojna kolejnosc.

## 20. Definition of done

Projekt uznaj za skonczony, kiedy:
- mozna zalozyc konto
- mozna sie zalogowac i wylogowac
- dashboard jest chroniony
- user widzi tylko swoje notatki
- user moze tworzyc, edytowac i usuwac swoje notatki
- backend odrzuca proby dostepu do cudzych danych
- frontend obsluguje loading i bledy
- aplikacja dziala lokalnie od poczatku do konca

## 21. Co robic, gdy utkniesz

Kiedy cos nie dziala, sprawdzaj po kolei:
1. czy frontend wysyla dobry request
2. czy endpoint backendu w ogole sie odpala
3. czy middleware auth przepuszcza request
4. czy dane trafiaja do bazy
5. czy odpowiedz ma dobry status i JSON

Najczesciej problem siedzi w jednym z tych miejsc:
- zly endpoint
- brak tokenu
- zly naglowek `Authorization`
- bledny `userId`
- blad w zapytaniu do bazy
- frontend zaklada inny shape odpowiedzi niz backend zwraca
- serializer nie przyjmuje takich danych, jak myslisz
- `permission_classes` blokuje request
- `request.user` jest anonimowy, bo auth nie jest poprawnie podpiete

## 22. Jak to rozpisac konkretnie w Django + DRF

Bardzo sensowny uklad startowy:

### Backend

1. stworz projekt `Django`
2. dodaj aplikacje `users`
3. dodaj aplikacje `notes`
4. skonfiguruj `rest_framework`
5. zdecyduj, czy robisz osobny custom user model od razu

Najbezpieczniej na nauke:
- jesli nie potrzebujesz wielu dodatkowych pol usera, mozesz zostac przy domyslnym userze `Django`
- jesli chcesz od razu robic to bardziej przyszlosciowo, zrob custom user model na poczatku projektu, nie pozniej

Do modelu `Note` wystarczy:
- `title`
- `content`
- `user`
- `created_at`
- `updated_at`

Potem:
1. serializer rejestracji
2. serializer logowania
3. serializer notatki
4. widoki auth
5. widoki notatek
6. routing API
7. permissiony

### Frontend

Najprostszy uklad:
- `src/api/axios.js`
- `src/context/AuthContext.jsx`
- `src/routes/ProtectedRoute.jsx`
- `src/pages/Home.jsx`
- `src/pages/Register.jsx`
- `src/pages/Login.jsx`
- `src/pages/Dashboard.jsx`
- `src/pages/AddNote.jsx`
- `src/pages/EditNote.jsx`

Kolejnosc pracy:
1. podlaczyc `axios`
2. zrobic `register`
3. zrobic `login`
4. zapisac auth state
5. zrobic `me`
6. zrobic protected route
7. zrobic liste notatek
8. zrobic add/edit/delete

## 23. Twoja checklista

Mozesz odhaczac to po kolei:

- [ ] wybrac stack
- [ ] zdecydowac `JWT` czy `session`
- [ ] postawic backend
- [ ] podlaczyc baze danych
- [ ] stworzyc model `User`
- [ ] stworzyc model `Note`
- [ ] zrobic `register`
- [ ] zrobic `login`
- [ ] zrobic `logout`
- [ ] zrobic `me`
- [ ] napisac middleware auth
- [ ] zrobic `GET /notes`
- [ ] zrobic `GET /notes/:id`
- [ ] zrobic `POST /notes`
- [ ] zrobic `PUT /notes/:id`
- [ ] zrobic `DELETE /notes/:id`
- [ ] przetestowac endpointy
- [ ] postawic frontend
- [ ] zrobic routing
- [ ] zrobic `Register`
- [ ] zrobic `Login`
- [ ] zrobic auth state
- [ ] zrobic protected routes
- [ ] zrobic dashboard
- [ ] wyswietlic liste notatek
- [ ] dodawac notatki
- [ ] edytowac notatki
- [ ] usuwac notatki
- [ ] dopracowac bledy i loading
- [ ] wdrozyc aplikacje

## 24. O czym pamietac

Ten projekt nie ma byc wielki. Ma nauczyc Cie podstaw dobrze.

Jesli zrobisz porzadnie:
- auth
- ochrone endpointow
- relacje user -> notes
- CRUD
- frontend pod API

to zrobisz bardzo dobry krok do przodu.

Najwazniejsze:
- nie spiesz sie
- rob male kroki
- testuj kazdy etap
- nie dokladaj ficzerow, dopoki MVP nie dziala

Powodzenia. Ten projekt jest serio bardzo dobry na nauke, jesli zrobisz go porzadnie.
