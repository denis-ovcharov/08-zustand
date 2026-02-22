import NoteForm from "@/components/NoteForm/NoteForm";
import css from "../../../../app/page.module.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "NoteHub",
  description: "NoteHub. Created by Denys Ovcharov",
  openGraph: {
    title: "NoteHub",
    description: "Created by Denys Ovcharov",
    url: "/",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function CreateNote() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm />
      </div>
    </main>
  );
}
