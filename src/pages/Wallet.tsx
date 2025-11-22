import Navbar from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Wallet as WalletIcon, ArrowUpRight, ArrowDownRight, History, Trophy } from "lucide-react";

export default function Wallet() {
  const transactions = [
    { type: "receive", amount: "+100 CAMLY", desc: "Phần thưởng bài viết", time: "2 giờ trước" },
    { type: "receive", amount: "+50 CAMLY", desc: "Phần thưởng bình luận", time: "5 giờ trước" },
    { type: "send", amount: "-30 CAMLY", desc: "Tặng quà bạn bè", time: "1 ngày trước" },
    { type: "receive", amount: "+200 CAMLY", desc: "Phần thưởng hàng tuần", time: "2 ngày trước" },
  ];

  const achievements = [
    { title: "Early Adopter", desc: "Tham gia từ đầu", reward: 500 },
    { title: "Active Member", desc: "Đăng 10 bài viết", reward: 200 },
    { title: "Social Butterfly", desc: "Có 100 bạn bè", reward: 300 },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-6">
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            {/* Wallet Balance */}
            <Card className="border-primary/20 bg-gradient-hero shadow-glow">
              <CardContent className="pt-6">
                <div className="text-center text-primary-foreground">
                  <WalletIcon className="mx-auto h-16 w-16 mb-4" />
                  <p className="text-sm opacity-90">Số dư ví</p>
                  <h1 className="text-5xl font-heading font-bold my-2">0 CAMLY</h1>
                  <p className="text-sm opacity-75">≈ $0.00 USD</p>
                  <div className="mt-6 flex gap-4 justify-center">
                    <Button variant="secondary" className="gap-2">
                      <ArrowDownRight className="h-4 w-4" />
                      Nhận
                    </Button>
                    <Button variant="secondary" className="gap-2">
                      <ArrowUpRight className="h-4 w-4" />
                      Gửi
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Transaction History */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <History className="h-5 w-5 text-primary" />
                  Lịch sử giao dịch
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {transactions.map((tx, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between rounded-lg border p-4 transition-colors hover:bg-muted"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-full ${
                          tx.type === "receive"
                            ? "bg-success/10 text-success"
                            : "bg-destructive/10 text-destructive"
                        }`}
                      >
                        {tx.type === "receive" ? (
                          <ArrowDownRight className="h-5 w-5" />
                        ) : (
                          <ArrowUpRight className="h-5 w-5" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{tx.desc}</p>
                        <p className="text-xs text-muted-foreground">{tx.time}</p>
                      </div>
                    </div>
                    <p
                      className={`font-semibold ${
                        tx.type === "receive" ? "text-success" : "text-destructive"
                      }`}
                    >
                      {tx.amount}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Achievements */}
          <div className="space-y-6">
            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-warning" />
                  Thành tích
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {achievements.map((achievement, index) => (
                  <Card key={index} className="border-primary/10">
                    <CardContent className="pt-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-semibold">{achievement.title}</h4>
                          <p className="text-sm text-muted-foreground">
                            {achievement.desc}
                          </p>
                        </div>
                        <Badge variant="secondary" className="ml-2">
                          +{achievement.reward}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>

            {/* How to earn */}
            <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5">
              <CardHeader>
                <CardTitle className="text-lg">Cách kiếm CAMLY</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p>• Đăng bài viết mới: +50 CAMLY</p>
                <p>• Bình luận: +10 CAMLY</p>
                <p>• Nhận reactions: +5 CAMLY</p>
                <p>• Kết bạn mới: +20 CAMLY</p>
                <p>• Đăng nhập hàng ngày: +30 CAMLY</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
