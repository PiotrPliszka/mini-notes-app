# Mini Notes App - Project Overview

Mini Notes App to full-stack aplikacja do zarzadzania prywatnymi notatkami uzytkownika.

Glowny cel projektu:
- nauczyc sie implementacji auth w praktyce
- zrozumiec, jak laczy sie frontend z backendem API
- przejsc przez pelny CRUD na danych przypisanych do zalogowanego uzytkownika

## Opis projektu

Kazdy uzytkownik:
- zaklada konto
- loguje sie
- wylogowuje sie
- tworzy swoje notatki
- edytuje swoje notatki
- usuwa swoje notatki
- widzi tylko swoje dane

Aplikacja jest celowo prosta biznesowo. Nie chodzi tutaj o rozbudowany produkt, tylko o solidne przecwiczenie fundamentow, ktore pozniej wykorzystuje sie w wiekszych systemach.

## Co rozwija ten projekt

Projekt pozwala przepracowac:
- rejestracje i logowanie uzytkownika
- ochrone tras na froncie
- ochrone endpointow na backendzie
- prace z tokenem `JWT` albo sesja
- relacje `User -> Note`
- filtrowanie danych po zalogowanym uzytkowniku
- formularze, walidacje i obsluge bledow
- komunikacje `React <-> Django REST API`

## Stack projektu

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
- `SQLite`

Tooling:
- `ESLint`
- `Docker`
- `Docker Compose`

## Najwazniejsze funkcje

- rejestracja konta
- logowanie i odswiezanie tokena
- pobranie danych aktualnie zalogowanego uzytkownika
- dashboard z lista notatek
- tworzenie notatek
- edycja notatek
- usuwanie notatek
- blokada dostepu do cudzych danych

## Widoki frontendowe

- `Home`
- `Register`
- `Login`
- `Dashboard`
- `Add Note`
- `Edit Note`

## API backendowe

Przykladowe endpointy:
- `POST /api/auth/register/`
- `POST /api/auth/login/`
- `POST /api/auth/refresh/`
- `GET /api/auth/me/`
- `GET /api/notes/`
- `GET /api/notes/<id>/`
- `POST /api/notes/`
- `PUT /api/notes/<id>/`
- `DELETE /api/notes/<id>/`

## Dlaczego ten projekt jest dobry na nauke

- ma prosty temat i malo logiki biznesowej
- pozwala skupic sie na auth i bezpieczenstwie
- uczy pracy z backendem, baza danych i frontendem jednoczesnie
- bardzo przypomina realne mechanizmy z wiekszych aplikacji

## Cel koncowy

Na koniec projekt powinien dzialac tak:
- nowy uzytkownik rejestruje konto
- loguje sie do aplikacji
- moze odswiezyc token bez ponownego logowania
- przechodzi do chronionego dashboardu
- zarzadza swoimi notatkami
- nie ma dostepu do notatek innych uzytkownikow

To projekt nastawiony na nauke dobrych podstaw, a nie na ilosc funkcji.

## Aktualny status

Na ten moment backend jest juz w duzej czesci gotowy:
- custom `User`
- model `Note`
- `register`
- `login`
- `refresh`
- `me`
- CRUD notatek z filtrowaniem po zalogowanym userze

Najblizszy krok:
- domkniecie testow backendu
- potem frontend auth i frontend notes
