import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import HonorBoard from "@/components/HonorBoard";
import CreatePost from "@/components/CreatePost";
import Post from "@/components/Post";
import { Card, CardContent } from "@/components/ui/card";

export default function Feed() {
  const mockPosts = [
    {
      author: "Nguyễn Văn A",
      avatar: "NVA",
      content: "Hôm nay thị trường crypto tăng mạnh! Bitcoin đã vượt mốc $45,000 🚀 #Crypto #Bitcoin",
      timestamp: new Date(Date.now() - 3600000),
      likes: 24,
      comments: 8,
      shares: 5,
    },
    {
      author: "Trần Thị B",
      avatar: "TTB",
      content: "Vừa tham gia một dự án NFT mới rất thú vị! Ai có kinh nghiệm về NFT thì chia sẻ với mình nhé 🎨 #NFT #Web3",
      timestamp: new Date(Date.now() - 7200000),
      likes: 15,
      comments: 12,
      shares: 3,
    },
    {
      author: "Lê Văn C",
      avatar: "LVC",
      content: "Chia sẻ một số tips về DeFi farming cho người mới bắt đầu. Đừng quên DYOR (Do Your Own Research) nhé! 💡 #DeFi #CryptoTips",
      timestamp: new Date(Date.now() - 10800000),
      likes: 32,
      comments: 18,
      shares: 10,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-6">
        <div className="grid gap-6 lg:grid-cols-12">
          {/* Left Sidebar */}
          <aside className="hidden lg:col-span-3 lg:block">
            <Sidebar />
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-6">
            <div className="space-y-6">
              {/* Create Post */}
              <CreatePost />

              {/* Empty State or Posts */}
              {mockPosts.length === 0 ? (
                <Card className="border-dashed">
                  <CardContent className="flex min-h-[300px] flex-col items-center justify-center py-12 text-center">
                    <p className="mb-4 text-lg font-medium text-muted-foreground">
                      Chưa có bài viết nào. Hãy là người đầu tiên chia sẻ!
                    </p>
                  </CardContent>
                </Card>
              ) : (
                mockPosts.map((post, index) => (
                  <Post key={index} {...post} />
                ))
              )}
            </div>
          </main>

          {/* Right Sidebar - Honor Board */}
          <aside className="hidden lg:col-span-3 lg:block">
            <HonorBoard />
          </aside>
        </div>
      </div>
    </div>
  );
}
