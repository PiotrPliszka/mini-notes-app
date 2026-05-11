import React, { use, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Dashboard.css";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";
import { formatDate } from "../components/FormatDate";
import toast from "react-hot-toast";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { NoteSkeleton } from "../components/NoteSkeleton";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

export function Dashboard() {
  const { logout, token } = useAuth();
  const navigate = useNavigate();

  const [user, setUser] = useState({ username: "", email: "" });
  const [notes, setNotes] = useState([]);

  const [noteToDelete, setNoteToDelete] = useState(null);
  const noteNameToBeDeleted = notes.find((note) => note.id === noteToDelete);

  const [handleAdd, setHandleAdd] = useState(false);
  const [noteToAdd, setNoteToAdd] = useState({ title: "", content: "" });

  const [handleNoteEdit, setHandleNoteEdit] = useState(false);
  const [noteToEdit, setNoteToEdit] = useState({
    id: "",
    title: "",
    content: "",
  });

  const [isUserLoading, setUserLoading] = useState(true);
  const [isNotesLoading, setIsNotesLoading] = useState(true);
  const [isAddingNote, setIsAddingNote] = useState(false);

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
      } finally {
        setUserLoading(false);
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
      } finally {
        setIsNotesLoading(false);
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

  function handleCancelAdd() {
    setHandleAdd(null);
  }

  async function noteAdd(e) {
    e.preventDefault();
    setIsAddingNote(true);
    try {
      const response = await api.post("notes/", noteToAdd, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotes((prevNotes) => [...prevNotes, response.data]);
      toast.success("Succesfully added note");
      setNoteToAdd({ title: "", content: "" });
      setHandleAdd(false);
    } catch (error) {
      if (error.response) {
        console.error(error.response.data);
      } else {
        console.error(error.message);
      }
    } finally {
      setIsAddingNote(false);
    }
  }

  function handleChangeAddForm(e) {
    setNoteToAdd({ ...noteToAdd, [e.target.name]: e.target.value });
  }

  function handleChangeEditForm(e) {
    setNoteToEdit({ ...noteToEdit, [e.target.name]: e.target.value });
  }

  function handleCancelEdit() {
    setHandleNoteEdit(false);
    setNoteToEdit({ title: "", content: "" });
  }

  async function fetchDataNote(idNote) {
    try {
      const response = await api.get(`notes/${idNote}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNoteToEdit({
        id: idNote,
        title: response.data.title,
        content: response.data.content,
      });
      console.log(response.data);
    } catch (error) {
      if (error.response) {
        console.error("Error data: ", error.response.data);
      } else {
        console.error("Error message: ", error.message);
      }
    }
  }

  async function editNoteData() {
    try {
      const id = noteToEdit.id;
      console.log(id);
      const response = await api.put(`notes/${id}/`, noteToEdit, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Success: ", response.data);
      setNotes((prevNotes) =>
        prevNotes.map((note) => (note.id === id ? response.data : note)),
      );
      setHandleNoteEdit(false);
      toast.success("Successfully updated note");
    } catch (error) {
      if (error.response) {
        console.error(error.response.data);
      } else {
        console.error(error.message);
      }
    }
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
            {isUserLoading ? (
              <Skeleton width="100%" />
            ) : (
              `${user.username} | ${user.email}`
            )}
          </div>
          <button className="dashboard-logout-btn" onClick={handleLogout}>
            Sign out
          </button>
        </div>
      </div>
      <main className="dashboard-main-content">
        <header className="dashboard-content-header">
          <h1>Your space.</h1>
          <button
            className="dashboard-new-note-btn"
            onClick={(e) => {
              e.preventDefault();
              setHandleAdd(true);
            }}
          >
            + New note
          </button>
        </header>
        <div className="dashboard-notes-grid">
          {isNotesLoading ? (
            Array(6)
              .fill(0)
              .map((_, i) => <NoteSkeleton key={i} />)
          ) : notes.length === 0 ? (
            <article className="empty-note-state">
              <h1>Add Some Notes B)</h1>
            </article>
          ) : (
            notes.map((note) => (
              <article className="dashboard-note-card" key={note.id}>
                <h2 className="dashboard-note-title">{note.title}</h2>
                <p className="dashboard-note-preview">{note.content}</p>
                <footer className="dashboard-note-footer">
                  <span className="dashboard-note-date">
                    {formatDate(note.created_at)}
                  </span>
                  <div className="dashboard-note-actions">
                    <button
                      className="dashboard-note-action-btn"
                      onClick={(e) => {
                        e.preventDefault();
                        setHandleNoteEdit(true);
                        fetchDataNote(note.id);
                      }}
                    >
                      Edit
                    </button>
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
            ))
          )}
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
        {handleAdd && (
          <div className="dialog-overlay">
            <div className="dialog-box">
              <form className="add-note-form" onSubmit={noteAdd}>
                <h3 className="add-note-form-title">Create new note</h3>
                <label htmlFor="note-title">Title</label>
                <input
                  id="note-title"
                  type="text"
                  name="title"
                  value={noteToAdd.title}
                  onChange={handleChangeAddForm}
                  placeholder="e.g. Sprint retrospective"
                  required
                />
                <label htmlFor="note-content">Description</label>
                <textarea
                  id="note-content"
                  type="text"
                  name="content"
                  value={noteToAdd.content}
                  onChange={handleChangeAddForm}
                  placeholder="Write your note..."
                  required
                />
                <div className="add-note-form-actions">
                  <button
                    type="button"
                    className="add-note-cancel-btn"
                    onClick={handleCancelAdd}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="add-note-submit-btn"
                    disabled={isAddingNote}
                  >
                    {isAddingNote ? (
                      <motion.span
                        className="submit-loader"
                        animate={{ rotate: 360 }}
                        transition={{
                          repeat: Infinity,
                          duration: 1,
                          ease: "linear",
                        }}
                      >
                        <Loader2 size={20} />
                      </motion.span>
                    ) : (
                      "Add note"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {handleNoteEdit && (
          <div className="dialog-overlay">
            <div className="dialog-box">
              <form
                className="add-note-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  editNoteData();
                }}
              >
                <h3 className="add-note-form-title">Edit note</h3>
                <label htmlFor="note-title">Title</label>
                <input
                  id="note-title"
                  type="text"
                  name="title"
                  value={noteToEdit.title}
                  onChange={handleChangeEditForm}
                  placeholder="e.g. Sprint retrospective"
                  required
                />
                <label htmlFor="note-content">Description</label>
                <textarea
                  id="note-content"
                  type="text"
                  name="content"
                  value={noteToEdit.content}
                  onChange={handleChangeEditForm}
                  placeholder="Write your note..."
                  required
                />
                <div className="add-note-form-actions">
                  <button
                    type="button"
                    className="add-note-cancel-btn"
                    onClick={handleCancelEdit}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="add-note-submit-btn">
                    Edit note
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
