import { AppHeader } from "../../components/app-header/AppHeader";
import { Avatar } from "../../components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Bell, CheckCircle, FileText } from "lucide-react";

export default function CompanyNotificationsPage() {

    const notifications = [
        {
            icon: <CheckCircle className="h-6 w-6 text-green-500" />,
            title: "Invitation Accepted: XYZ Institute",
            description: "XYZ Institute of Technology has accepted your invitation for a campus drive.",
            time: "1 day ago",
            read: false,
        },
        {
            icon: <FileText className="h-6 w-6 text-blue-500" />,
            title: "Offer Accepted: Ben Stone",
            description: "Ben Stone has accepted the offer for the SDE I role.",
            time: "2 days ago",
            read: false,
        },
        {
            icon: <Bell className="h-6 w-6 text-yellow-500" />,
            title: "Reminder: Drive at ABC College",
            description: "Your campus drive at ABC College of Engineering is scheduled for tomorrow.",
            time: "3 days ago",
            read: true,
        },
    ]

    return (
        <div className="flex min-h-screen w-full flex-col">
            <AppHeader title="Notifications" />
            <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline">Your Updates</CardTitle>
                        <CardDescription>Stay informed about invitation statuses and offer acceptances.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {notifications.map((notification, index) => (
                            <div key={index} className={`flex items-start gap-4 p-4 rounded-lg ${!notification.read ? "bg-secondary" : ""}`}>
                                <Avatar className="h-10 w-10 border">
                                    <div className="flex h-full w-full items-center justify-center">
                                      {notification.icon}
                                    </div>
                                </Avatar>
                                <div className="flex-grow">
                                    <p className="font-semibold">{notification.title}</p>
                                    <p className="text-sm text-muted-foreground">{notification.description}</p>
                                    <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                                </div>
                                {!notification.read && <div className="h-2 w-2 rounded-full bg-primary mt-2"></div>}
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </main>
        </div>
    );
}
