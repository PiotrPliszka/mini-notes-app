import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Dashboard.css";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";
import { formatDate } from "../components/FormatDate";
import toast from "react-hot-toast";

export function Dashboard() {
  // const demoNotes = [
  //   {
  //     id: 1,
  //     title: "Zrozumieć Django Auth",
  //     preview:
  //       "Kluczowe założenia do rejestracji i logowania użytkownika. Trzeba pamiętać o odpowiednim zabezpieczeniu endpointów...",
  //     date: "06 Maj 2026",
  //   },
  //   {
  //     id: 2,
  //     title: "Struktura danych",
  //     preview:
  //       "Relacja User -> Note jest niezbędna do prawidłowego filtrowania.",
  //     date: "05 Maj 2026",
  //   },
  //   {
  //     id: 3,
  //     title: "Deployment checklist",
  //     preview:
  //       "Sprawdzenie zmiennych środowiskowych, migracji, backupu bazy i monitoringu po wdrożeniu produkcyjnym.",
  //     date: "04 Maj 2026",
  //   },
  //   {
  //     id: 4,
  //     title: "Pomysły na UX",
  //     preview:
  //       "Dodanie szybkich akcji na karcie notatki, skrótów klawiaturowych oraz delikatnych animacji przy tworzeniu nowej notatki.",
  //     date: "03 Maj 2026",
  //   },
  //   {
  //     id: 5,
  //     title: "Krótka notatka",
  //     preview: "TODO: poprawić walidację formularza.",
  //     date: "02 Maj 2026",
  //   },
  //   {
  //     id: 6,
  //     title: "Research: markdown editor",
  //     preview:
  //       "Porównanie rozwiązań: TipTap, Slate i Lexical. Kryteria: wydajność, wsparcie pluginów, prostota integracji.",
  //     date: "01 Maj 2026",
  //   },
  //   {
  //     id: 7,
  //     title: "Plan sprintu",
  //     preview:
  //       "Priorytet 1: autoryzacja. Priorytet 2: filtrowanie notatek. Priorytet 3: paginacja i lazy loading.",
  //     date: "30 Kwi 2026",
  //   },
  //   {
  //     id: 8,
  //     title: "API edge cases",
  //     preview:
  //       "Obsługa timeoutów, 401 po wygaśnięciu tokena, retry przy 5xx oraz fallback UI dla pustej odpowiedzi.",
  //     date: "29 Kwi 2026",
  //   },
  //   {
  //     id: 9,
  //     title:
  //       "Długi tytuł testowy sprawdzający zachowanie karty przy większej ilości tekstu",
  //     preview:
  //       "To jest specjalnie dłuższa treść testowa, żeby sprawdzić zawijanie linii, wysokość kart i zachowanie sekcji z akcjami na różnych szerokościach ekranu.",
  //     date: "28 Kwi 2026",
  //   },
  //   {
  //     id: 10,
  //     title: "Notatka PL/EN",
  //     preview:
  //       "Sprawdzenie znaków diakrytycznych: ąćęłńóśźż oraz mixed content in English to validate typography rendering.",
  //     date: "27 Kwi 2026",
  //   },
  // ];
  const { logout, token } = useAuth();
  const navigate = useNavigate();
  const [user, setUser] = useState({ username: "", email: "" });
  const [notes, setNotes] = useState([]);
  const [noteToDelete, setNoteToDelete] = useState(null);
  const noteNameToBeDeleted = notes.find((movie) => movie.id === noteToDelete);

  useEffect(() => {
    const getUser = async () => {
      try {
        if (!token) return;
        const response = await api.get("auth/me/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.data) {
          setUser({
            username: response.data.username,
            email: response.data.email,
          });
        }
      } catch (error) {
        if (error.response) {
          console.error("Error data: ", error.response.data);
        } else {
          console.error("Error message", error.message);
        }
      }
    };
    getUser();
  }, [token]);

  useEffect(() => {
    const getNotes = async () => {
      try {
        const response = await api.get("notes/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log(response.data);
        setNotes(response.data);
      } catch (error) {
        if (error.response) {
          console.error("Error data: ", error.response.data);
        } else {
          console.error("Error message: ", error.message);
        }
      }
    };
    if (token) {
      getNotes();
    }
  }, [token]);

  function handleLogout() {
    navigate("/");
    logout();
  }

  async function noteDelete(noteId) {
    try {
      const response = await api.delete(`notes/${noteId}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("Sukces: ", response.data);
      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));
    } catch (error) {
      if (error.response) {
        console.error("Error data: ", error.response.data);
      } else {
        console.error("Error message: ", error.message);
      }
    } finally {
      toast.success("Succesfully deleted");
    }
  }

  function handleConfirmDelete() {
    if (noteToDelete) {
      noteDelete(noteToDelete);
      setNoteToDelete(null);
    }
  }

  function handleCancelDelete() {
    setNoteToDelete(null);
  }

  return (
    <div className="dashboard-page">
      <div className="dashboard-sidebar">
        <div className="dashboard-brand">MINI NOTES</div>
        <nav className="dashboard-sidebar-links">
          <Link to="/dashboard" className="dashboard-sidebar-link active">
            My Notes
          </Link>
          <span className="dashboard-sidebar-link">???</span>
          <span className="dashboard-sidebar-link">???</span>
          <span className="dashboard-sidebar-link">???</span>
        </nav>
        <div className="dashboard-sidebar-footer">
          <div className="dashboard-user-info">
            {user.username} | {user.email}
          </div>
          <button className="dashboard-logout-btn" onClick={handleLogout}>
            Sign out
          </button>
        </div>
      </div>
      <main className="dashboard-main-content">
        <header className="dashboard-content-header">
          <h1>Your space.</h1>
          <button className="dashboard-new-note-btn">+ New note</button>
        </header>
        <div className="dashboard-notes-grid">
          {notes.map((note) => (
            <article className="dashboard-note-card" key={note.id}>
              <h2 className="dashboard-note-title">{note.title}</h2>
              <p className="dashboard-note-preview">{note.content}</p>
              <footer className="dashboard-note-footer">
                <span className="dashboard-note-date">
                  {formatDate(note.created_at)}
                </span>
                <div className="dashboard-note-actions">
                  <button className="dashboard-note-action-btn">Edit</button>
                  <button
                    className="dashboard-note-action-btn"
                    onClick={(e) => {
                      e.preventDefault();
                      setNoteToDelete(note.id);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </footer>
            </article>
          ))}
        </div>
        {noteToDelete && (
          <div className="dialog-overlay">
            <div className="dialog-box">
              <h3>
                Are you sure you want to delete "{noteNameToBeDeleted.title}"?
              </h3>
              <p>This action cannot be undone</p>
            </div>
            <div className="dialog-actions">
              <button className="cancel-btn" onClick={handleCancelDelete}>
                Cancel
              </button>
              <button className="confirm-del-btn" onClick={handleConfirmDelete}>
                Yes, delete
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
