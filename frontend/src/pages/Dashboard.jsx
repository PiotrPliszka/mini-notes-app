import React from "react";
import { Link } from "react-router-dom";
import "./Dashboard.css";

export function Dashboard() {
  const demoNotes = [
    {
      id: 1,
      title: "Zrozumieć Django Auth",
      preview:
        "Kluczowe założenia do rejestracji i logowania użytkownika. Trzeba pamiętać o odpowiednim zabezpieczeniu endpointów...",
      date: "06 Maj 2026",
    },
    {
      id: 2,
      title: "Struktura danych",
      preview:
        "Relacja User -> Note jest niezbędna do prawidłowego filtrowania.",
      date: "05 Maj 2026",
    },
    {
      id: 3,
      title: "Deployment checklist",
      preview:
        "Sprawdzenie zmiennych środowiskowych, migracji, backupu bazy i monitoringu po wdrożeniu produkcyjnym.",
      date: "04 Maj 2026",
    },
    {
      id: 4,
      title: "Pomysły na UX",
      preview:
        "Dodanie szybkich akcji na karcie notatki, skrótów klawiaturowych oraz delikatnych animacji przy tworzeniu nowej notatki.",
      date: "03 Maj 2026",
    },
    {
      id: 5,
      title: "Krótka notatka",
      preview: "TODO: poprawić walidację formularza.",
      date: "02 Maj 2026",
    },
    {
      id: 6,
      title: "Research: markdown editor",
      preview:
        "Porównanie rozwiązań: TipTap, Slate i Lexical. Kryteria: wydajność, wsparcie pluginów, prostota integracji.",
      date: "01 Maj 2026",
    },
    {
      id: 7,
      title: "Plan sprintu",
      preview:
        "Priorytet 1: autoryzacja. Priorytet 2: filtrowanie notatek. Priorytet 3: paginacja i lazy loading.",
      date: "30 Kwi 2026",
    },
    {
      id: 8,
      title: "API edge cases",
      preview:
        "Obsługa timeoutów, 401 po wygaśnięciu tokena, retry przy 5xx oraz fallback UI dla pustej odpowiedzi.",
      date: "29 Kwi 2026",
    },
    {
      id: 9,
      title: "Długi tytuł testowy sprawdzający zachowanie karty przy większej ilości tekstu",
      preview:
        "To jest specjalnie dłuższa treść testowa, żeby sprawdzić zawijanie linii, wysokość kart i zachowanie sekcji z akcjami na różnych szerokościach ekranu.",
      date: "28 Kwi 2026",
    },
    {
      id: 10,
      title: "Notatka PL/EN",
      preview:
        "Sprawdzenie znaków diakrytycznych: ąćęłńóśźż oraz mixed content in English to validate typography rendering.",
      date: "27 Kwi 2026",
    },
  ];

  return (
    <div className="dashboard-page">
      <div className="dashboard-sidebar">
        <div className="dashboard-brand">MINI NOTES</div>
        <nav className="dashboard-sidebar-links">
          <Link to="/dashboard" className="dashboard-sidebar-link active">
            My Notes
          </Link>
          <span className="dashboard-sidebar-link">Favorites</span>
          <span className="dashboard-sidebar-link">Archived</span>
          <span className="dashboard-sidebar-link">Settings</span>
        </nav>
        <div className="dashboard-sidebar-footer">
          <div className="dashboard-user-info">admin@example.com</div>
          <button className="dashboard-logout-btn">Sign out</button>
        </div>
      </div>
      <main className="dashboard-main-content">
        <header className="dashboard-content-header">
          <h1>Your space.</h1>
          <button className="dashboard-new-note-btn">+ New note</button>
        </header>
        <div className="dashboard-notes-grid">
          {demoNotes.map((note) => (
            <article className="dashboard-note-card" key={note.id}>
              <h2 className="dashboard-note-title">{note.title}</h2>
              <p className="dashboard-note-preview">{note.preview}</p>
              <footer className="dashboard-note-footer">
                <span className="dashboard-note-date">{note.date}</span>
                <div className="dashboard-note-actions">
                  <button className="dashboard-note-action-btn">Edit</button>
                  <button className="dashboard-note-action-btn">Delete</button>
                </div>
              </footer>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}
