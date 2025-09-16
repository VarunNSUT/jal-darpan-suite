import { ArrowLeft, Send, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const suggestedQueries = [
  "Show me data for Punjab",
  "What is the projection for 2030?",
  "Best conservation practices",
  "Critical regions analysis"
];

const sampleConversation = [
  {
    type: "bot",
    message: "Hello! I'm AquaBot, your groundwater analysis assistant. How can I help you today?",
    timestamp: "10:30 AM"
  },
  {
    type: "user", 
    message: "What are the current groundwater levels in Punjab?",
    timestamp: "10:31 AM"
  },
  {
    type: "bot",
    message: "Based on the latest data, Punjab's average groundwater level is at 8.4 meters below surface. This represents a 33% decline from 2019 levels. The region is currently classified as 'critical' and requires immediate conservation measures.",
    timestamp: "10:31 AM"
  }
];

interface AquaBotProps {
  onBack: () => void;
}

export function AquaBot({ onBack }: AquaBotProps) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState(sampleConversation);

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const newUserMessage = {
      type: "user" as const,
      message: message.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, newUserMessage]);
    setMessage("");

    // Simulate bot response
    setTimeout(() => {
      const botResponse = {
        type: "bot" as const,
        message: "I'm processing your request. This is a demo version, but in the full app, I would analyze the latest groundwater data to provide you with accurate insights.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const handleSuggestedQuery = (query: string) => {
    setMessage(query);
  };

  return (
    <div className="flex flex-col h-full bg-gradient-background">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 pt-8 border-b border-border/20">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={onBack}
          className="text-foreground hover:bg-secondary"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-background" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-foreground">AquaBot</h1>
            <p className="text-xs text-success">● Online</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                msg.type === 'user'
                  ? 'bg-primary text-primary-foreground ml-4'
                  : 'bg-secondary text-secondary-foreground mr-4'
              }`}
            >
              <p className="text-sm">{msg.message}</p>
              <p className={`text-xs mt-1 opacity-70`}>
                {msg.timestamp}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Suggested Queries */}
      <div className="px-4 pb-4">
        <p className="text-sm text-muted-foreground mb-3">Suggested questions:</p>
        <div className="flex flex-wrap gap-2">
          {suggestedQueries.map((query, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              className="text-xs bg-secondary/50 border-border/50"
              onClick={() => handleSuggestedQuery(query)}
            >
              {query}
            </Button>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="p-4 border-t border-border/20 bg-card/50 backdrop-blur-sm">
        <div className="flex gap-2">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ask about groundwater data..."
            className="flex-1 bg-background border-border/50"
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <Button 
            onClick={handleSendMessage}
            size="icon"
            className="bg-gradient-primary hover:opacity-90 text-background"
            disabled={!message.trim()}
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}