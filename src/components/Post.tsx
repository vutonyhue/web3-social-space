import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Heart, MessageSquare, Share2, MoreVertical, Play } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";
import { useState } from "react";

interface MediaItem {
  type: "image" | "video";
  url: string;
}

interface PostProps {
  author: string;
  avatar: string;
  content: string;
  timestamp: Date;
  likes: number;
  comments: number;
  shares: number;
  media?: MediaItem[];
}

export default function Post({
  author,
  avatar,
  content,
  timestamp,
  likes,
  comments,
  shares,
  media,
}: PostProps) {
  const [liked, setLiked] = useState(false);

  const renderMedia = () => {
    if (!media || media.length === 0) return null;

    const gridClass =
      media.length === 1
        ? "grid-cols-1"
        : media.length === 2
        ? "grid-cols-2"
        : media.length === 3
        ? "grid-cols-3"
        : "grid-cols-2";

    return (
      <div className={`grid gap-2 ${gridClass} mt-3`}>
        {media.map((item, index) => (
          <div
            key={index}
            className="relative aspect-square overflow-hidden rounded-lg bg-muted"
          >
            {item.type === "image" ? (
              <img
                src={item.url}
                alt={`Media ${index + 1}`}
                className="h-full w-full object-cover transition-transform hover:scale-105"
              />
            ) : (
              <div className="group relative h-full w-full">
                <video
                  src={item.url}
                  className="h-full w-full object-cover"
                  controls
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 transition-opacity group-hover:bg-black/20">
                  <Play className="h-12 w-12 text-white" />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <Card className="shadow-md transition-all hover:shadow-lg">
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-3">
        <div className="flex items-center gap-3">
          <Avatar className="h-12 w-12 border-2 border-primary/20">
            <AvatarFallback className="bg-primary/10 text-primary font-semibold">
              {avatar}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold">{author}</p>
            <p className="text-xs text-muted-foreground">
              {formatDistanceToNow(timestamp, { addSuffix: true, locale: vi })}
            </p>
          </div>
        </div>
        <Button variant="ghost" size="icon">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="pb-3">
        <p className="whitespace-pre-wrap text-sm leading-relaxed">{content}</p>
        {renderMedia()}
      </CardContent>
      <CardFooter className="flex items-center justify-between border-t pt-3">
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="sm"
            className={`gap-2 transition-colors ${
              liked ? "text-destructive" : "hover:text-destructive"
            }`}
            onClick={() => setLiked(!liked)}
          >
            <Heart className={`h-4 w-4 ${liked ? "fill-current" : ""}`} />
            <span className="text-xs">{likes + (liked ? 1 : 0)}</span>
          </Button>
          <Button variant="ghost" size="sm" className="gap-2 hover:text-info">
            <MessageSquare className="h-4 w-4" />
            <span className="text-xs">{comments}</span>
          </Button>
          <Button variant="ghost" size="sm" className="gap-2 hover:text-primary">
            <Share2 className="h-4 w-4" />
            <span className="text-xs">{shares}</span>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
