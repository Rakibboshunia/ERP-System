"use client"
import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MessageSquare, Plus, Trash2 } from "lucide-react"
import { useCRMStore } from "@/store/useCRMStore"
import { useAuth } from "@/contexts/auth-context"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

export default function NotesPage() {
  const { hasPermission } = useAuth()
  const canManageCRM = hasPermission(["superadmin", "admin", "sales_manager"])

  const notes = useCRMStore((state) => state.notes)
  const addNote = useCRMStore((state) => state.addNote)
  const deleteNote = useCRMStore((state) => state.deleteNote)

  const [isAddOpen, setIsAddOpen] = React.useState(false)
  const [formData, setFormData] = React.useState({
    client: "",
    author: "Sales Rep",
    text: "",
  })

  const handleAdd = () => {
    addNote({
      id: `N-${Math.floor(100 + Math.random() * 900)}`,
      client: formData.client,
      author: formData.author,
      text: formData.text,
      date: "Just now",
    })
    setIsAddOpen(false)
    setFormData({ client: "", author: "Sales Rep", text: "" })
  }

  return (
    <Card className="border-border/50 shadow-sm mt-0">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Customer Notes</CardTitle>
            <CardDescription>Activity logs and interactions with clients.</CardDescription>
          </div>
          {canManageCRM && (
            <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
              <DialogTrigger asChild>
                <Button size="sm"><Plus className="w-4 h-4 mr-1" />Add Note</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Customer Note</DialogTitle>
                  <DialogDescription>Log a new interaction note for a client.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="client" className="text-right">Client</Label>
                    <Input id="client" value={formData.client} onChange={e => setFormData({ ...formData, client: e.target.value })} className="col-span-3" placeholder="Wayne Enterprises" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="author" className="text-right">Author</Label>
                    <Input id="author" value={formData.author} onChange={e => setFormData({ ...formData, author: e.target.value })} className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="text" className="text-right">Note</Label>
                    <Textarea id="text" value={formData.text} onChange={e => setFormData({ ...formData, text: e.target.value })} className="col-span-3" placeholder="Enter note details..." />
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={handleAdd}>Save Note</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {notes.map((note) => (
            <div key={note.id} className="p-4 border rounded-xl bg-muted/10 relative group">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-primary" />
                  <span className="font-semibold text-sm">{note.client}</span>
                  <span className="text-xs text-muted-foreground px-2">—</span>
                  <span className="text-xs text-muted-foreground">{note.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">{note.date}</span>
                  {canManageCRM && (
                    <Button variant="ghost" size="icon" className="h-6 w-6 text-rose-500 opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => deleteNote(note.id)}>
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  )}
                </div>
              </div>
              <p className="text-sm pl-6">{note.text}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
