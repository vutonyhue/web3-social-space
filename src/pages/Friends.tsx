import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { UserPlus, Users } from "lucide-react";

export default function Friends() {
  const friendSuggestions = [
    { name: "Phạm Minh Anh", avatar: "PMA", mutual: 12, bio: "Crypto enthusiast | NFT collector" },
    { name: "Hoàng Hải Long", avatar: "HHL", mutual: 8, bio: "Blockchain developer" },
    { name: "Ngô Thu Hằng", avatar: "NTH", mutual: 5, bio: "DeFi trader" },
    { name: "Đỗ Quang Minh", avatar: "DQM", mutual: 15, bio: "Web3 builder" },
    { name: "Vũ Thị Lan", avatar: "VTL", mutual: 7, bio: "Crypto analyst" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Users className="h-6 w-6 text-primary" />
              Gợi Ý Kết Bạn
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {friendSuggestions.map((friend, index) => (
                <Card key={index} className="border-primary/20">
                  <CardContent className="flex flex-col items-center pt-6 text-center">
                    <Avatar className="h-20 w-20 border-4 border-primary/20">
                      <AvatarFallback className="bg-primary/10 text-primary text-xl font-bold">
                        {friend.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <h3 className="mt-4 font-semibold">{friend.name}</h3>
                    <p className="text-xs text-muted-foreground">
                      {friend.mutual} bạn chung
                    </p>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {friend.bio}
                    </p>
                    <Button className="mt-4 w-full gap-2 bg-primary hover:bg-primary-light">
                      <UserPlus className="h-4 w-4" />
                      Kết bạn
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
