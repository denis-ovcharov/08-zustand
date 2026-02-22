"use client";
import NoteList from "../../../../components/NoteList/NoteList";
import Pagination from "../../../../components/Pagination/Pagination";
import css from "./page.module.css";
import { useState } from "react";
import Modal from "../../../../components/Modal/Modal";
import { Toaster } from "react-hot-toast";
import { useDebouncedCallback } from "use-debounce";
import SearchBox from "../../../../components/SearchBox/SearchBox";
import { useNotes } from "@/hooks/useNotes";
import EditNoteForm from "@/components/EditNoteForm/EditNoteFormForm";
import { Note, NoteTag } from "@/types/note";
import Link from "next/link";

type Props = {
  tag: NoteTag;
};

function NotesClient({ tag }: Props) {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  // type ModalType = "create" | "edit" | null;
  // const [isModalOpen, setIsModalOpen] = useState<ModalType>(null);
  // const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const { data, isSuccess } = useNotes(query, page, 9, tag);

  const updateQuery = useDebouncedCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setQuery(e.target.value);
      setPage(1);
    },
    1000,
  );

  const notes = data?.notes || [];
  const totalPages = data?.totalPages ?? 1;

  // const handleOpenCreateModal = () => {
  //   setIsModalOpen("create");
  // };

  // const handleOpenEditModal = (note: Note) => {
  //   setIsModalOpen("edit");
  //   setSelectedNote(note);
  // };

  // const handleCloseModal = () => {
  //   setIsModalOpen(null);
  // };

  return (
    <>
      <div className={css.app}>
        <header className={css.toolbar}>
          <SearchBox onSearch={updateQuery} />
          {totalPages > 1 && (
            <Pagination
              totalPages={totalPages}
              page={page}
              onPageChange={setPage}
            />
          )}
          <Link href={"/notes/action/create"} className={css.button}>
            Create note +
          </Link>
        </header>
        {notes.length > 0 && isSuccess && (
          <NoteList notes={notes} onEdit={() => {}} />
        )}
      </div>
      {/* {isModalOpen === "create" && (
        <Modal onClose={handleCloseModal}>
          <NoteForm onClose={handleCloseModal} />
        </Modal>
      )} */}
      {/* {isModalOpen === "edit" && selectedNote && (
        <Modal onClose={handleCloseModal}>
          <EditNoteForm note={selectedNote} onClose={handleCloseModal} />
        </Modal>
      )} */}
      <Toaster position="top-right" />
    </>
  );
}

export default NotesClient;
