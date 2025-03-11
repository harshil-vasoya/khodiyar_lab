import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Share2, User, Mail, Phone, Calendar, Gift, ChevronRight } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Sample data - in a real app, this would come from an API
const referrals = [
  {
    id: "ref-001",
    name: "Ankit Patel",
    date: "2023-11-05",
    status: "pending",
    email: "ankit.patel@example.com",
  },
  {
    id: "ref-002",
    name: "Meera Shah",
    date: "2023-10-20",
    status: "registered",
    email: "meera.shah@example.com",
  },
  {
    id: "ref-003",
    name: "Rahul Desai",
    date: "2023-09-10",
    status: "completed",
    email: "rahul.desai@example.com",
  },
]

export default function UserReferrals() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Referral Program</h2>
          <p className="text-muted-foreground">Refer friends and earn rewards</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-1 bg-gradient-to-br from-primary/10 to-primary/5">
          <CardHeader>
            <CardTitle>Your Rewards</CardTitle>
            <CardDescription>Track your referral rewards</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Gift className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">Reward Points</h4>
                  <p className="text-sm text-muted-foreground">Earn 100 points per referral</p>
                </div>
              </div>
              <div className="text-2xl font-bold">200</div>
            </div>

            <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                  <User className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h4 className="font-medium">Successful Referrals</h4>
                  <p className="text-sm text-muted-foreground">Friends who registered</p>
                </div>
              </div>
              <div className="text-2xl font-bold">2</div>
            </div>

            <Button className="w-full">
              Redeem Rewards
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Refer a Friend</CardTitle>
            <CardDescription>Invite your friends and family to Khodiyar Pathology and earn rewards</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="email">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="email">Email</TabsTrigger>
                <TabsTrigger value="whatsapp">WhatsApp</TabsTrigger>
              </TabsList>

              <TabsContent value="email" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="friend-name">Friend's Name</Label>
                  <div className="flex">
                    <div className="flex items-center justify-center rounded-l-md border border-r-0 bg-muted px-3">
                      <User className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <Input id="friend-name" placeholder="Enter name" className="rounded-l-none" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="friend-email">Friend's Email</Label>
                  <div className="flex">
                    <div className="flex items-center justify-center rounded-l-md border border-r-0 bg-muted px-3">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <Input id="friend-email" type="email" placeholder="Enter email" className="rounded-l-none" />
                  </div>
                </div>
                <Button type="submit" className="w-full">
                  <Share2 className="mr-2 h-4 w-4" />
                  Send Email Invitation
                </Button>
              </TabsContent>

              <TabsContent value="whatsapp" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="friend-phone">Friend's Phone Number</Label>
                  <div className="flex">
                    <div className="flex items-center justify-center rounded-l-md border border-r-0 bg-muted px-3">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <Input id="friend-phone" placeholder="Enter phone number" className="rounded-l-none" />
                  </div>
                </div>
                <Button type="submit" className="w-full bg-[#25D366] hover:bg-[#25D366]/90">
                  <Share2 className="mr-2 h-4 w-4" />
                  Send WhatsApp Invitation
                </Button>
              </TabsContent>
            </Tabs>

            <div className="mt-6 flex items-center justify-between p-4 bg-muted rounded-lg">
              <div className="text-sm">
                <span className="font-medium">Your Referral Link:</span>
              </div>
              <div className="flex gap-2">
                <Input value="https://khodiyarpathology.com/ref/user123" readOnly className="h-9 w-[240px] bg-white" />
                <Button variant="outline" size="sm" className="h-9">
                  Copy
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-bold">Referral History</h3>

        {referrals.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-10">
              <div className="rounded-full bg-primary/10 p-3 mb-4">
                <Share2 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-medium mb-2">No referrals yet</h3>
              <p className="text-muted-foreground mb-4 text-center">You haven't referred anyone yet.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {referrals.map((referral) => (
              <Card key={referral.id} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{referral.name}</CardTitle>
                      <CardDescription>{referral.email}</CardDescription>
                    </div>
                    <Badge
                      variant={
                        referral.status === "pending"
                          ? "outline"
                          : referral.status === "registered"
                            ? "secondary"
                            : "default"
                      }
                      className="capitalize"
                    >
                      {referral.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm">
                    <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>
                      Referred on{" "}
                      {new Date(referral.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                </CardContent>
                <CardFooter className="border-t bg-muted/20 px-6 py-4">
                  {referral.status === "pending" && (
                    <Button variant="outline" className="w-full">
                      Remind
                    </Button>
                  )}
                  {referral.status === "completed" && (
                    <div className="w-full text-center text-sm text-green-600 font-medium">
                      Reward points added to your account
                    </div>
                  )}
                  {referral.status === "registered" && (
                    <div className="w-full text-center text-sm text-muted-foreground">
                      Waiting for first appointment to earn rewards
                    </div>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

