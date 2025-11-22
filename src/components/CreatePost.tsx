import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Image, Video, Smile } from "lucide-react";
import { useState } from "react";

export default function CreatePost() {
  const [content, setContent] = useState("");

  return (
    <Card className="border-primary/20 shadow-md">
      <CardContent className="space-y-4 pt-6">
        <Textarea
          placeholder="Bạn đang nghĩ gì?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="min-h-[100px] resize-none border-muted"
        />
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" className="gap-2 text-primary">
              <Image className="h-4 w-4" />
              <span className="hidden sm:inline">Ảnh</span>
            </Button>
            <Button variant="ghost" size="sm" className="gap-2 text-info">
              <Video className="h-4 w-4" />
              <span className="hidden sm:inline">Video</span>
            </Button>
            <Button variant="ghost" size="sm" className="gap-2 text-warning">
              <Smile className="h-4 w-4" />
              <span className="hidden sm:inline">Cảm xúc</span>
            </Button>
          </div>
          <Button className="bg-primary hover:bg-primary-light">
            Đăng bài
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
