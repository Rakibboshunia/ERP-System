"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Database, UploadCloud } from "lucide-react"

export default function BackupSettingsPage() {
  return (
    <div className="grid gap-6">
      <Card className="border-border/50 shadow-sm border-rose-500/20 mt-0">
        <CardHeader>
          <CardTitle>Database Backup</CardTitle>
          <CardDescription>Download a full SQL/JSON dump of the ERP database.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-4 border rounded-lg bg-muted/10">
            <div>
              <p className="font-medium">Last Backup Generated</p>
              <p className="text-sm text-muted-foreground">Oct 16, 2026 at 03:00 AM (Auto-backup)</p>
            </div>
            <Button variant="secondary">Download Latest</Button>
          </div>
          <Button className="w-full mt-4"><Database className="w-4 h-4 mr-2" /> Generate Manual Backup Now</Button>
        </CardContent>
      </Card>

      <Card className="border-border/50 shadow-sm border-amber-500/20">
        <CardHeader>
          <CardTitle className="text-amber-500 flex items-center gap-2">Database Restore</CardTitle>
          <CardDescription>Upload a backup file to restore the system state. <strong className="text-rose-500">Warning: This will overwrite all current data!</strong></CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border-2 border-dashed border-amber-500/30 rounded-xl p-6 text-center">
            <UploadCloud className="w-8 h-8 mx-auto mb-2 text-amber-500/50" />
            <p className="font-medium">Upload .sql or .json backup file</p>
            <Button variant="outline" className="mt-4 border-amber-500/50 text-amber-600 hover:bg-amber-500/10">Browse File</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
