import { invoke } from "@tauri-apps/api"
import { createResource } from "solid-js"
import { notificationService } from "@hope-ui/solid"
import { refetch as refetchNotes } from "~/api/notes"

export type FolderType = {
   id: number
   title: string
   created_at: string
   updated_at: string
}

export const fetchFolders = async () => {
   const string_data: string = await invoke("folders_list")
   const folder: FolderType[] = await JSON.parse(string_data)
   return folder
}

const [folders, { mutate, refetch }] = createResource(fetchFolders)

export async function createFolder(title: string) {
   try {
      const string_data: string = await invoke("create_folder", { title })
      const newFolder: FolderType = await JSON.parse(string_data)
      refetch()
      return { newFolder, error: false }
   } catch (e: any) {
      console.log(e)
      return { error: e }
   }
}

export async function updateFolder(id: number, title: string) {
   try {
      const string_data: string = await invoke("update_folder", { id, title })
      const updated_data: FolderType = await JSON.parse(string_data)
      refetch()
      return { updated_data, error: false }
   } catch (e: any) {
      console.log(e)
      return { error: e }
   }
}

export async function deleteFolder(id: number) {
   try {
      const string_data: string = await invoke("delete_folder", { id })
      notificationService.show({
         status: "success",
         title: "Folder deleted successfully",
      })
      refetch()
      refetchNotes()
      return { string_data, error: false }
   } catch (e: any) {
      console.log(e)
      notificationService.show({
         status: "danger",
         title: "Couldn't delete folder",
      })
      return { error: e }
   }
}

export { folders, refetch }
