import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Heart, MessageSquare, Share2, MoreVertical } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";

interface PostProps {
  author: string;
  avatar: string;
  content: string;
  timestamp: Date;
  likes: number;
  comments: number;
  shares: number;
}

export default function Post({
  author,
  avatar,
  content,
  timestamp,
  likes,
  comments,
  shares,
}: PostProps) {
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
      </CardContent>
      <CardFooter className="flex items-center justify-between border-t pt-3">
        <div className="flex gap-1">
          <Button variant="ghost" size="sm" className="gap-2 hover:text-destructive">
            <Heart className="h-4 w-4" />
            <span className="text-xs">{likes}</span>
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
