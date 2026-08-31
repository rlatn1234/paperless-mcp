import { z } from "zod";
import type { DocumentNote } from "../../paperless/types.js";
import { defineTool } from "../registry.js";
import { requireConfirm } from "../shared/guards.js";
import { output, renderTable } from "../shared/responses.js";
import { confirmShape, documentIdShape } from "../shared/schemas.js";

function renderNotes(notes: DocumentNote[]): string {
  return renderTable(
    ["note id", "created", "author", "note"],
    notes.map((note) => [
      note.id,
      note.created?.slice(0, 19).replace("T", " "),
      typeof note.user === "object" ? (note.user?.username ?? note.user?.id) : note.user,
      note.note,
    ]),
    "This document has no notes.",
  );
}

export const documentNotesListTool = defineTool({
  name: "document_notes_list",
  title: "List document notes",
  description:
    "Read the free-text notes attached to a document — the running commentary people leave about it (why it was kept, what still needs doing). Note ids come from here and are required to delete one.",
  toolset: "core",
  inputSchema: documentIdShape,
  annotations: { readOnlyHint: true, openWorldHint: true },
  handler: async (args: { id: number }, context) => {
    const notes = await context.api.documents.notes(args.id);
    return output(renderNotes(notes), notes);
  },
});

export const documentNoteAddTool = defineTool({
  name: "document_note_add",
  title: "Add a document note",
  description:
    "Attach a note to a document. Use it to record context that does not belong in a tag or title — a decision, a follow-up, or why the metadata looks unusual.",
  toolset: "core",
  inputSchema: {
    ...documentIdShape,
    note: z.string().min(1).describe("Note text to attach."),
  },
  annotations: {
    readOnlyHint: false,
    destructiveHint: false,
    idempotentHint: false,
    openWorldHint: true,
  },
  handler: async (args: { id: number; note: string }, context) => {
    const notes = await context.api.documents.addNote(args.id, args.note);
    return output(`Added a note to document ${args.id}.\n\n${renderNotes(notes)}`, notes);
  },
});

export const documentNoteDeleteTool = defineTool({
  name: "document_note_delete",
  title: "Delete a document note",
  description:
    "Permanently remove one note from a document. Notes are not recoverable, so quote the note back to the user before calling this with confirm=true.",
  toolset: "core",
  inputSchema: {
    ...documentIdShape,
    note_id: z.number().int().describe("Note id from document_notes_list."),
    ...confirmShape,
  },
  annotations: {
    readOnlyHint: false,
    destructiveHint: true,
    idempotentHint: true,
    openWorldHint: true,
  },
  handler: async (args: { id: number; note_id: number; confirm?: boolean }, context) => {
    requireConfirm(
      args.confirm,
      "delete this note",
      `Note ${args.note_id} on document ${args.id} would be permanently removed.`,
    );
    const notes = await context.api.documents.deleteNote(args.id, args.note_id);
    return output(
      `Deleted note ${args.note_id} from document ${args.id}.\n\n${renderNotes(notes)}`,
      notes,
    );
  },
});
