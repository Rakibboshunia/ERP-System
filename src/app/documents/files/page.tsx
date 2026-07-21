"use client"
import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { UploadCloud, Search, File, Trash2 } from "lucide-react"
import { useDocumentStore } from "@/store/useDocumentStore"
import { useAuth } from "@/contexts/auth-context"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

export default function FilesPage() {
  const { hasPermission } = useAuth()
  const canManage = hasPermission(["superadmin", "admin"])

  const files = useDocumentStore(state => state.files)
  const addFile = useDocumentStore(state => state.addFile)
  const deleteFile = useDocumentStore(state => state.deleteFile)

  const [isAddOpen, setIsAddOpen] = React.useState(false)
  const [formData, setFormData] = React.useState({
    name: "",
    size: "1.2 MB",
    type: "PDF",
    uploader: "Admin"
  })
  const [search, setSearch] = React.useState("")

  const handleAdd = () => {
    addFile({
      id: `DOC-${Math.floor(100 + Math.random() * 900)}`,
      name: formData.name,
      size: formData.size,
      type: formData.type,
      uploader: formData.uploader,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    })
    setIsAddOpen(false)
    setFormData({ name: "", size: "1.2 MB", type: "PDF", uploader: "Admin" })
  }

  const filteredFiles = files.filter(f => f.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="grid gap-6 mt-0">
      {canManage && (
        <Card className="border-border/50 shadow-sm border-dashed">
          <CardContent className="pt-6 flex flex-col items-center justify-center h-48 text-muted-foreground">
            <UploadCloud className="w-12 h-12 mb-4 opacity-50" />
            <p className="font-medium text-foreground">Drag & drop files here</p>
            <p className="text-sm mt-1 mb-4">or click to browse from your computer</p>
            <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
              <DialogTrigger asChild>
                <Button size="sm">Browse Files</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Upload File</DialogTitle>
                  <DialogDescription>Simulate uploading a new document.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">File Name</Label>
                    <Input id="name" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="col-span-3" placeholder="Document.pdf" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="type" className="text-right">Type</Label>
                    <Input id="type" value={formData.type} onChange={e => setFormData({ ...formData, type: e.target.value })} className="col-span-3" placeholder="PDF" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="uploader" className="text-right">Uploader</Label>
                    <Input id="uploader" value={formData.uploader} onChange={e => setFormData({ ...formData, uploader: e.target.value })} className="col-span-3" />
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={handleAdd}>Upload</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      )}
      <Card className="border-border/50 shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div><CardTitle>Uploaded Files</CardTitle><CardDescription>General company documents and shared files.</CardDescription></div>
            <div className="relative w-48">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search files..." className="pl-8" value={search} onChange={e => setSearch(e.target.value)} />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader><TableRow><TableHead>File Name</TableHead><TableHead>Type</TableHead><TableHead>Size</TableHead><TableHead>Uploaded By</TableHead><TableHead>Date</TableHead><TableHead className="text-right">Action</TableHead></TableRow></TableHeader>
            <TableBody>
              {filteredFiles.map(f => (
                <TableRow key={f.id}>
                  <TableCell className="font-medium flex items-center gap-2"><File className="w-4 h-4 text-muted-foreground" /> {f.name}</TableCell>
                  <TableCell><Badge variant="outline">{f.type}</Badge></TableCell>
                  <TableCell className="text-muted-foreground">{f.size}</TableCell>
                  <TableCell>{f.uploader}</TableCell>
                  <TableCell className="text-muted-foreground">{f.date}</TableCell>
                  <TableCell className="text-right flex items-center justify-end gap-2">
                    <Button variant="ghost" size="sm">Download</Button>
                    {canManage && (
                      <Button variant="ghost" size="icon" className="text-rose-500 hover:text-rose-600 hover:bg-rose-50" onClick={() => deleteFile(f.id)}><Trash2 className="w-4 h-4" /></Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
