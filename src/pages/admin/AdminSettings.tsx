import { useEffect, useState } from "react";
import { Upload, FileText, Save, Trash2, ExternalLink } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Settings {
  cv_url: string;
  site_title: string;
  site_description: string;
  contact_email: string;
  contact_phone: string;
  linkedin_url: string;
}

const AdminSettings = () => {
  const { toast } = useToast();
  const [settings, setSettings] = useState<Settings>({
    cv_url: "",
    site_title: "",
    site_description: "",
    contact_email: "",
    contact_phone: "",
    linkedin_url: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const { data, error } = await supabase
        .from("site_settings")
        .select("key, value");

      if (error) throw error;

      const settingsObj: Record<string, string> = {};
      data?.forEach((item) => {
        settingsObj[item.key] = item.value || "";
      });

      setSettings({
        cv_url: settingsObj.cv_url || "",
        site_title: settingsObj.site_title || "",
        site_description: settingsObj.site_description || "",
        contact_email: settingsObj.contact_email || "",
        contact_phone: settingsObj.contact_phone || "",
        linkedin_url: settingsObj.linkedin_url || "",
      });
    } catch (error) {
      console.error("Error fetching settings:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const updates = Object.entries(settings).map(([key, value]) => ({
        key,
        value,
        updated_at: new Date().toISOString(),
      }));

      for (const update of updates) {
        const { error } = await supabase
          .from("site_settings")
          .upsert(update, { onConflict: "key" });

        if (error) throw error;
      }

      toast({ title: "Success", description: "Settings saved successfully." });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to save settings.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(file.type)) {
      toast({
        title: "Invalid File",
        description: "Please upload a PDF or Word document.",
        variant: "destructive",
      });
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: "File Too Large",
        description: "Please upload a file smaller than 10MB.",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    try {
      const fileName = `cv-${Date.now()}.${file.name.split('.').pop()}`;

      const { data, error } = await supabase.storage
        .from("documents")
        .upload(fileName, file, { upsert: true });

      if (error) throw error;

      const { data: urlData } = supabase.storage
        .from("documents")
        .getPublicUrl(fileName);

      setSettings(prev => ({ ...prev, cv_url: urlData.publicUrl }));
      
      // Save to database
      await supabase
        .from("site_settings")
        .upsert({ key: "cv_url", value: urlData.publicUrl });

      toast({ title: "Success", description: "CV uploaded successfully." });
    } catch (error: any) {
      toast({
        title: "Upload Failed",
        description: error.message || "Failed to upload CV.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeleteCV = async () => {
    if (!confirm("Are you sure you want to delete the CV?")) return;

    try {
      // Extract filename from URL
      const urlParts = settings.cv_url.split('/');
      const fileName = urlParts[urlParts.length - 1];

      await supabase.storage.from("documents").remove([fileName]);
      
      await supabase
        .from("site_settings")
        .upsert({ key: "cv_url", value: "" });

      setSettings(prev => ({ ...prev, cv_url: "" }));
      toast({ title: "Success", description: "CV deleted successfully." });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to delete CV.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-8 max-w-2xl">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground">
            Manage your portfolio settings and CV.
          </p>
        </div>

        {/* CV Upload */}
        <div className="glass rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <FileText className="text-primary" size={24} />
            CV / Resume
          </h2>
          
          {settings.cv_url ? (
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                <FileText className="text-primary" size={32} />
                <div className="flex-1">
                  <p className="font-medium">CV Uploaded</p>
                  <p className="text-sm text-muted-foreground">
                    Your CV is available for download
                  </p>
                </div>
                <div className="flex gap-2">
                  <a href={settings.cv_url} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="sm">
                      <ExternalLink size={16} />
                      View
                    </Button>
                  </a>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-destructive hover:text-destructive"
                    onClick={handleDeleteCV}
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              </div>
              <div className="relative">
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  disabled={isUploading}
                />
                <Button variant="outline" className="w-full" disabled={isUploading}>
                  <Upload size={18} />
                  {isUploading ? "Uploading..." : "Upload New CV"}
                </Button>
              </div>
            </div>
          ) : (
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
              <FileText className="mx-auto text-muted-foreground mb-4" size={48} />
              <p className="text-muted-foreground mb-4">
                Upload your CV to allow visitors to download it
              </p>
              <div className="relative inline-block">
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  disabled={isUploading}
                />
                <Button variant="hero" disabled={isUploading}>
                  <Upload size={18} />
                  {isUploading ? "Uploading..." : "Upload CV"}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-3">
                Supported: PDF, DOC, DOCX (Max 10MB)
              </p>
            </div>
          )}
        </div>

        {/* Site Settings */}
        <div className="glass rounded-xl p-6 space-y-6">
          <h2 className="text-xl font-semibold">Site Information</h2>
          
          <div>
            <label className="text-sm font-medium mb-2 block">Site Title</label>
            <Input
              value={settings.site_title}
              onChange={(e) => setSettings({ ...settings, site_title: e.target.value })}
              placeholder="Your Name"
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Description</label>
            <Input
              value={settings.site_description}
              onChange={(e) => setSettings({ ...settings, site_description: e.target.value })}
              placeholder="Software Engineer & Developer"
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Contact Email</label>
            <Input
              type="email"
              value={settings.contact_email}
              onChange={(e) => setSettings({ ...settings, contact_email: e.target.value })}
              placeholder="email@example.com"
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Contact Phone</label>
            <Input
              value={settings.contact_phone}
              onChange={(e) => setSettings({ ...settings, contact_phone: e.target.value })}
              placeholder="+251..."
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">LinkedIn URL</label>
            <Input
              value={settings.linkedin_url}
              onChange={(e) => setSettings({ ...settings, linkedin_url: e.target.value })}
              placeholder="https://linkedin.com/in/..."
            />
          </div>

          <Button
            variant="hero"
            className="w-full"
            onClick={handleSave}
            disabled={isSaving}
          >
            <Save size={18} />
            {isSaving ? "Saving..." : "Save Settings"}
          </Button>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminSettings;
