import { Accessor } from "solid-js"
import { FilterNotesType } from "~/context/store"
import { NoteType } from "~/api/notes"

export const bakedNotes = (notes: NoteType[], filter_notes: FilterNotesType, search: Accessor<string>) => {
   const filtered = notes.filter((n) => (filter_notes.inFolder ? n : n.folder == null))

   const sorted = filtered.sort((a, b) => {
      let du1 = new Date(a.updated_at).valueOf()
      let du2 = new Date(b.updated_at).valueOf()
      let dc1 = new Date(a.created_at).valueOf()
      let dc2 = new Date(b.created_at).valueOf()

      switch (filter_notes.sort) {
         case "edited_asc":
            return du1 - du2

         case "edited_desc":
            return du2 - du1

         case "created_asc":
            return dc1 - dc2

         case "created_desc":
            return dc2 - dc1

         default:
            return 0
      }
   })

   const searched = notes.filter((n) => n.title.toLowerCase().includes(search().toLowerCase()))

   return search().length > 0 ? searched : sorted
}

type OrderT = "asc" | "desc"
type ParamT = "created_at" | "updated_at"

export const sortNotesByDate = (notes?: NoteType[], order: OrderT = "desc", param: ParamT = "updated_at") => {
   const sorted = notes?.sort((a, b) => {
      const asc = new Date(a[param]).valueOf() - new Date(b[param]).valueOf()
      const desc = new Date(b[param]).valueOf() - new Date(a[param]).valueOf()

      return order == "asc" ? asc : desc
   })

   return sorted
}
