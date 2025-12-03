import { useEffect, useState } from "react";
import { Mail, MailOpen, Trash2, Clock, User } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

interface Message {
  id: string;
  name: string;
  email: string;
  subject: string | null;
  message: string;
  is_read: boolean | null;
  created_at: string;
}

const AdminMessages = () => {
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const { data, error } = await supabase
        .from("contact_messages")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setMessages(data || []);
    } catch (error) {
      console.error("Error fetching messages:", error);
      toast({
        title: "Error",
        description: "Failed to load messages.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const markAsRead = async (message: Message) => {
    if (message.is_read) return;

    try {
      const { error } = await supabase
        .from("contact_messages")
        .update({ is_read: true })
        .eq("id", message.id);

      if (error) throw error;
      
      setMessages(prev => prev.map(m => 
        m.id === message.id ? { ...m, is_read: true } : m
      ));
    } catch (error) {
      console.error("Error marking as read:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this message?")) return;

    try {
      const { error } = await supabase.from("contact_messages").delete().eq("id", id);
      if (error) throw error;

      toast({ title: "Success", description: "Message deleted successfully." });
      setSelectedMessage(null);
      fetchMessages();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to delete message.",
        variant: "destructive",
      });
    }
  };

  const openMessage = (message: Message) => {
    setSelectedMessage(message);
    markAsRead(message);
  };

  const unreadCount = messages.filter(m => !m.is_read).length;

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Messages</h1>
            <p className="text-muted-foreground">
              {unreadCount > 0 ? `${unreadCount} unread message${unreadCount > 1 ? 's' : ''}` : 'All messages read'}
            </p>
          </div>
        </div>

        {/* Messages List */}
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
          </div>
        ) : messages.length === 0 ? (
          <div className="glass rounded-xl p-12 text-center">
            <Mail className="mx-auto text-muted-foreground mb-4" size={48} />
            <p className="text-muted-foreground">No messages yet.</p>
            <p className="text-sm text-muted-foreground mt-2">
              Messages from your contact form will appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`glass rounded-xl p-4 cursor-pointer transition-all hover:shadow-glow ${
                  !message.is_read ? 'border-l-4 border-l-primary' : ''
                }`}
                onClick={() => openMessage(message)}
              >
                <div className="flex items-start gap-4">
                  <div className={`p-2 rounded-lg ${message.is_read ? 'bg-muted' : 'bg-primary/10'}`}>
                    {message.is_read ? (
                      <MailOpen className="text-muted-foreground" size={20} />
                    ) : (
                      <Mail className="text-primary" size={20} />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-4">
                      <h3 className={`font-semibold truncate ${!message.is_read ? 'text-foreground' : 'text-muted-foreground'}`}>
                        {message.name}
                      </h3>
                      <span className="text-xs text-muted-foreground whitespace-nowrap">
                        {format(new Date(message.created_at), 'MMM d, yyyy')}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">{message.email}</p>
                    {message.subject && (
                      <p className={`text-sm mt-1 truncate ${!message.is_read ? 'font-medium' : ''}`}>
                        {message.subject}
                      </p>
                    )}
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-1">
                      {message.message}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Message Dialog */}
        <Dialog open={!!selectedMessage} onOpenChange={(open) => !open && setSelectedMessage(null)}>
          <DialogContent className="max-w-2xl">
            {selectedMessage && (
              <>
                <DialogHeader>
                  <DialogTitle>{selectedMessage.subject || 'No Subject'}</DialogTitle>
                </DialogHeader>
                <div className="mt-4 space-y-4">
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <User size={16} className="text-muted-foreground" />
                      <span className="font-medium">{selectedMessage.name}</span>
                    </div>
                    <a 
                      href={`mailto:${selectedMessage.email}`}
                      className="text-primary hover:underline"
                    >
                      {selectedMessage.email}
                    </a>
                    <div className="flex items-center gap-2 text-muted-foreground ml-auto">
                      <Clock size={16} />
                      {format(new Date(selectedMessage.created_at), 'PPpp')}
                    </div>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-4">
                    <p className="whitespace-pre-wrap">{selectedMessage.message}</p>
                  </div>
                  <div className="flex gap-3 pt-4">
                    <Button variant="outline" asChild className="flex-1">
                      <a href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject || 'Your message'}`}>
                        Reply via Email
                      </a>
                    </Button>
                    <Button
                      variant="ghost"
                      className="text-destructive hover:text-destructive"
                      onClick={() => handleDelete(selectedMessage.id)}
                    >
                      <Trash2 size={18} />
                      Delete
                    </Button>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
};

export default AdminMessages;
