import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, MessageSquare, Heart, Users, Award, Settings } from "lucide-react";
import Post from "@/components/Post";

export default function Profile() {
  const stats = [
    { icon: TrendingUp, label: "Bài viết", value: 42, color: "text-primary" },
    { icon: Users, label: "Bạn bè", value: 156, color: "text-info" },
    { icon: Heart, label: "Lượt thích", value: 1234, color: "text-destructive" },
    { icon: Award, label: "Phần thưởng", value: 5678, color: "text-warning" },
  ];

  const userPosts = [
    {
      author: "Bạn",
      avatar: "BN",
      content: "Đây là bài viết mẫu của tôi về crypto và blockchain! 🚀",
      timestamp: new Date(Date.now() - 3600000),
      likes: 24,
      comments: 8,
      shares: 5,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6">
        <div className="space-y-6">
          {/* Profile Header */}
          <Card className="border-primary/20">
            <div className="h-32 w-full rounded-t-lg bg-gradient-hero"></div>
            <CardContent className="relative pt-16">
              <Avatar className="absolute -top-16 left-6 h-32 w-32 border-4 border-card">
                <AvatarFallback className="bg-primary/10 text-primary text-4xl font-bold">
                  BN
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="space-y-2">
                  <h1 className="text-2xl font-heading font-bold">Người dùng mẫu</h1>
                  <p className="text-muted-foreground">@username</p>
                  <p className="max-w-md text-sm">
                    Crypto enthusiast | Web3 builder | NFT collector 🚀
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary" className="gap-1">
                      <Award className="h-3 w-3" />
                      Early Adopter
                    </Badge>
                    <Badge variant="secondary" className="gap-1">
                      <TrendingUp className="h-3 w-3" />
                      Active Member
                    </Badge>
                  </div>
                </div>
                <Button className="gap-2">
                  <Settings className="h-4 w-4" />
                  Chỉnh sửa
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index} className="border-primary/20">
                  <CardContent className="flex flex-col items-center justify-center py-6 text-center">
                    <Icon className={`h-8 w-8 ${stat.color}`} />
                    <p className="mt-2 text-2xl font-bold">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Content Tabs */}
          <Tabs defaultValue="posts" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="posts">Bài viết</TabsTrigger>
              <TabsTrigger value="media">Ảnh & Video</TabsTrigger>
              <TabsTrigger value="activity">Hoạt động</TabsTrigger>
            </TabsList>
            <TabsContent value="posts" className="mt-6 space-y-4">
              {userPosts.map((post, index) => (
                <Post key={index} {...post} />
              ))}
            </TabsContent>
            <TabsContent value="media" className="mt-6">
              <Card>
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground">Chưa có ảnh hoặc video nào</p>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="activity" className="mt-6">
              <Card>
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground">Chưa có hoạt động nào</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
