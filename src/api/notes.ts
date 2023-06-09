import { invoke } from "@tauri-apps/api"
import { createResource } from "solid-js"
import { notificationService } from "@hope-ui/solid"

export type NoteType = {
   id: number
   title: string
   body: string
   accent_color: string
   words_count: number
   created_at: string
   updated_at: string
   folder: number
   favorited: boolean
}

export const fetchNotes = async () => {
   const string_data: string = await invoke("notes_list")
   const notes: NoteType[] = await JSON.parse(string_data)
   return notes
}

const [data, { mutate, refetch }] = createResource(fetchNotes)

export async function createNote(title: string, body: string, folderId?: number) {
   try {
      const string_data: string = await invoke("note_create", {
         title,
         body,
         folder: folderId,
      })
      const newNote: NoteType = await JSON.parse(string_data)
      refetch()
      return { newNote, error: false }
   } catch (e: any) {
      console.log(e)
      return { error: e }
   }
}

export async function updateNote(id: number, title: string, body: string, wordCount:number) {
   try {
      const string_data: string = await invoke("update_note", {
         id,
         title,
         body,
         wordCount
      })

      const updated_data: NoteType = await JSON.parse(string_data)
      return { updated_data, error: false }
   } catch (e: any) {
      console.log(e)
      return { error: e }
   }
}

export async function updateNoteAccent(id: number, accentColor: string) {
   try {
      const string_data: string = await invoke("update_accent", {
         id,
         accentColor,
      })
      const updated_data = await JSON.parse(string_data)
      return { updated_data, error: false }
   } catch (e: any) {
      console.log(e)
      return { error: e }
   }
}

export async function deleteNote(id: number) {
   try {
      const string_data: string = await invoke("delete_note", { id })
      notificationService.show({
         status: "success",
         title: "Note deleted successfully",
      })
      refetch()
      return { string_data, error: false }
   } catch (e: any) {
      console.log(e)
      notificationService.show({
         status: "danger",
         title: "Couldn't delete the note",
      })
      return { error: e }
   }
}

export { data, refetch }
