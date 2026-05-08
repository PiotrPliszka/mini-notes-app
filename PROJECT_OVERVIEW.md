# Mini Notes App - Project Overview

Mini Notes App to full-stack aplikacja do zarzadzania prywatnymi notatkami jednego uzytkownika.

Projekt jest robiony jako nauka:
- auth z `JWT`
- `Django REST Framework`
- `React + Vite`
- CRUD z filtrowaniem danych po zalogowanym userze

## O czym jest aplikacja

Kazdy uzytkownik:
- zaklada konto
- loguje sie
- pobiera swoje dane
- tworzy notatki
- edytuje swoje notatki
- usuwa swoje notatki
- widzi tylko swoje notatki

To nie ma byc duzy produkt biznesowy. To ma byc dobrze zrobiony projekt treningowy z sensownymi fundamentami.

## Stack

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

## Co juz dziala

Backend:
- custom `User`
- model `Note`
- `register`
- `login`
- `refresh`
- `me`
- CRUD notatek
- blokada dostepu do cudzych notatek
- podstawowe testy automatyczne auth i notes

Frontend:
- `HomePage`
- `RegisterPage`
- `LoginPage`
- `Dashboard`
- `AuthContext`
- `ProtectedRoute`
- logowanie z zapisem tokenow do `localStorage`
- pobieranie usera przez `me`
- pobieranie listy notatek
- dodawanie, edycja i usuwanie notatek z dashboardu

## Aktualne endpointy API

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

## Co jest jeszcze do dopracowania

Najwazniejsze rzeczy, ktore jeszcze sa do domkniecia:
- odpalic pelny backend test suite i potwierdzic, ze wszystko przechodzi razem
- dopracowac frontend auth flow po rejestracji
- dodac lepsza obsluge bledow i komunikatow
- rozwazyc automatyczny `refresh` tokena na froncie
- dopracowac UX i spojnosc interfejsu

## Najblizszy krok

Najbardziej sensowna kolejnosc od teraz:
1. potwierdzic backend testami
2. dopracowac frontend auth
3. dopracowac frontend notes
4. ogarnac UX i deployment
