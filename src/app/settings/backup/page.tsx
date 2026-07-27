"use client"
import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Database, UploadCloud, Download, RefreshCw, AlertTriangle } from "lucide-react"
import { useStore } from "@/store/useStore"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import toast from "react-hot-toast"

export default function BackupSettingsPage() {
  const { lastBackupDate, triggerBackup } = useStore()
  const [isGenerating, setIsGenerating] = React.useState(false)
  const [isRestoreOpen, setIsRestoreOpen] = React.useState(false)
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null)
  const fileInputRef = React.useRef<HTMLInputElement>(null)

  const handleGenerateBackup = async () => {
    setIsGenerating(true)
    await new Promise(res => setTimeout(res, 2000))
    triggerBackup()
    setIsGenerating(false)
  }

  const handleDownload = () => {
    // Generate a sample JSON export of visible data
    const exportData = {
      exportedAt: new Date().toISOString(),
      source: "Enterprise ERP",
      version: "1.0",
      note: "This is a demonstration backup export."
    }
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `erp-backup-${Date.now()}.json`
    a.click()
    URL.revokeObjectURL(url)
    toast.success("Backup file downloaded!")
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (!file.name.endsWith(".json") && !file.name.endsWith(".sql")) {
        toast.error("Please upload a valid .json or .sql file.")
        return
      }
      setSelectedFile(file)
    }
  }

  const handleRestore = () => {
    if (!selectedFile) return
    toast.success(`Restore initiated from "${selectedFile.name}". System will reload.`)
    setIsRestoreOpen(false)
    setSelectedFile(null)
  }

  return (
    <div className="grid gap-6">
      {/* Backup Card */}
      <Card className="border-border/50 shadow-sm border-rose-500/20 mt-0">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Database Backup</CardTitle>
              <CardDescription>Download a full JSON dump of the ERP database.</CardDescription>
            </div>
            <Badge variant="outline" className="text-emerald-500 border-emerald-500/30 bg-emerald-500/5">
              Auto-backup ON
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg bg-muted/10">
            <div>
              <p className="font-medium">Last Backup Generated</p>
              <p className="text-sm text-muted-foreground">{lastBackupDate}</p>
            </div>
            <Button variant="secondary" onClick={handleDownload} className="flex items-center gap-2">
              <Download className="w-4 h-4" /> Download Latest
            </Button>
          </div>

          <Button
            className="w-full"
            onClick={handleGenerateBackup}
            disabled={isGenerating}
          >
            {isGenerating ? (
              <><RefreshCw className="w-4 h-4 mr-2 animate-spin" /> Generating Backup...</>
            ) : (
              <><Database className="w-4 h-4 mr-2" /> Generate Manual Backup Now</>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Restore Card */}
      <Card className="border-border/50 shadow-sm border-amber-500/20">
        <CardHeader>
          <CardTitle className="text-amber-500 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" /> Database Restore
          </CardTitle>
          <CardDescription>
            Upload a backup file to restore the system state.{" "}
            <strong className="text-rose-500">Warning: This will overwrite all current data!</strong>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <input
            ref={fileInputRef}
            type="file"
            accept=".json,.sql"
            className="hidden"
            onChange={handleFileSelect}
          />
          <div
            className="border-2 border-dashed border-amber-500/30 rounded-xl p-6 text-center cursor-pointer hover:bg-amber-500/5 transition-colors"
            onClick={() => fileInputRef.current?.click()}
            onDragOver={e => e.preventDefault()}
            onDrop={e => {
              e.preventDefault()
              const file = e.dataTransfer.files[0]
              if (file) {
                if (!file.name.endsWith(".json") && !file.name.endsWith(".sql")) {
                  toast.error("Please drop a valid .json or .sql file.")
                  return
                }
                setSelectedFile(file)
              }
            }}
          >
            <UploadCloud className="w-8 h-8 mx-auto mb-2 text-amber-500/50" />
            {selectedFile ? (
              <>
                <p className="font-medium text-amber-600">{selectedFile.name}</p>
                <p className="text-sm text-muted-foreground">{(selectedFile.size / 1024).toFixed(1)} KB — click to change</p>
              </>
            ) : (
              <>
                <p className="font-medium">Upload .sql or .json backup file</p>
                <p className="text-sm text-muted-foreground">or drag and drop here</p>
              </>
            )}
          </div>

          {selectedFile && (
            <Button
              variant="destructive"
              className="w-full mt-4"
              onClick={() => setIsRestoreOpen(true)}
            >
              Restore from "{selectedFile.name}"
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Restore Confirmation Dialog */}
      <Dialog open={isRestoreOpen} onOpenChange={setIsRestoreOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-rose-500">
              <AlertTriangle className="w-5 h-5" /> Confirm Database Restore
            </DialogTitle>
            <DialogDescription>
              This will <strong>overwrite all current data</strong> with the contents of{" "}
              <strong>{selectedFile?.name}</strong>. This action cannot be undone.
              Are you absolutely sure?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsRestoreOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleRestore}>Yes, Restore Now</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
